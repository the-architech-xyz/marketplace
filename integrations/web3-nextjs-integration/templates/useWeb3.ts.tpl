import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { web3Core, Web3Error, type Address, type Hash } from '@/lib/web3/core';
import { NETWORKS, type SupportedChain } from '@/lib/web3/config';

// Web3 state interface
export interface Web3State {
  isConnected: boolean;
  address: Address | null;
  balance: string | null;
  chainId: number | null;
  isLoading: boolean;
  error: string | null;
}

// Hook for Web3 state management
export function useWeb3() {
  const [state, setState] = useState<Web3State>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isLoading: false,
    error: null,
  });

  const queryClient = useQueryClient();

  // Connect wallet
  const connectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await web3Core.initializeWallet();
      const address = await web3Core.getAccount();
      
      if (address) {
        const balance = await web3Core.getBalance(address);
        const chain = web3Core.getCurrentChain();
        
        setState(prev => ({
          ...prev,
          isConnected: true,
          address,
          balance,
          chainId: chain.id,
          isLoading: false,
        }));
      }
    } catch (error) {
      const errorMessage = error instanceof Web3Error ? error.message : 'Failed to connect wallet';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setState({
      isConnected: false,
        address: null,
        balance: null,
        chainId: null,
      isLoading: false,
      error: null,
      });
  }, []);

  // Switch chain
  const switchChain = useCallback(async (chainId: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await web3Core.switchChain(chainId);
      const chain = Object.values(NETWORKS).find(network => network.id === chainId);
      
      if (chain && state.address) {
        const balance = await web3Core.getBalance(state.address);
        setState(prev => ({
          ...prev,
          chainId,
          balance,
          isLoading: false,
        }));
      }
    } catch (error) {
      const errorMessage = error instanceof Web3Error ? error.message : 'Failed to switch chain';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, [state.address]);

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    if (!state.address) return;
    
    try {
      const balance = await web3Core.getBalance(state.address);
      setState(prev => ({ ...prev, balance }));
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  }, [state.address]);

  // Listen for account changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      };

      const handleChainChanged = (chainId: string) => {
      const newChainId = parseInt(chainId, 16);
      switchChain(newChainId);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
  }, [connectWallet, disconnectWallet, switchChain]);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    switchChain,
    refreshBalance,
  };
}

// Hook for balance query
export function useBalance(address: Address | null) {
  return useQuery({
    queryKey: ['balance', address],
    queryFn: async () => {
      if (!address) return null;
      return await web3Core.getBalance(address);
    },
    enabled: !!address,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

// Hook for block number query
export function useBlockNumber() {
  return useQuery({
    queryKey: ['blockNumber'],
    queryFn: async () => {
      return await web3Core.getBlockNumber();
    },
    refetchInterval: 12000, // Refetch every 12 seconds
  });
}

// Hook for gas price query
export function useGasPrice() {
  return useQuery({
    queryKey: ['gasPrice'],
    queryFn: async () => {
      return await web3Core.getGasPrice();
    },
    refetchInterval: 60000, // Refetch every minute
  });
}

// Hook for sending transactions
export function useSendTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: {
      to: Address;
      value?: bigint;
      data?: \