/**
 * Web3 Connect Hook
 * 
 * Standardized wallet connection hook for Web3
 * EXTERNAL API IDENTICAL ACROSS ALL BLOCKCHAIN PROVIDERS - Features work with ANY blockchain!
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { web3Api } from '@/lib/web3/api';
import type { ConnectOptions, WalletInfo } from '@/lib/web3/types';

// Connect wallet
export function useConnectWallet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (options?: ConnectOptions) => web3Api.connectWallet(options),
    onSuccess: (walletInfo: WalletInfo) => {
      // Update wallet info in cache
      queryClient.setQueryData(queryKeys.web3.wallet(), walletInfo);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.status() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.balance() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.transactions() });
    },
    onError: (error) => {
      console.error('Failed to connect wallet:', error);
    },
  });
}

// Connect with specific wallet
export function useConnectWithWallet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ walletType, options }: { walletType: string; options?: ConnectOptions }) => 
      web3Api.connectWithWallet(walletType, options),
    onSuccess: (walletInfo: WalletInfo) => {
      // Update wallet info in cache
      queryClient.setQueryData(queryKeys.web3.wallet(), walletInfo);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.status() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.balance() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.transactions() });
    },
    onError: (error) => {
      console.error('Failed to connect with wallet:', error);
    },
  });
}

// Switch network
export function useSwitchNetwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (chainId: number) => web3Api.switchNetwork(chainId),
    onSuccess: () => {
      // Invalidate network-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.status() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.networks() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.balance() });
    },
    onError: (error) => {
      console.error('Failed to switch network:', error);
    },
  });
}

// Add network
export function useAddNetwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (network: any) => web3Api.addNetwork(network),
    onSuccess: () => {
      // Invalidate networks query
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.networks() });
    },
    onError: (error) => {
      console.error('Failed to add network:', error);
    },
  });
}

// Request permissions
export function useRequestPermissions() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (permissions: string[]) => web3Api.requestPermissions(permissions),
    onSuccess: () => {
      // Invalidate status query
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.status() });
    },
    onError: (error) => {
      console.error('Failed to request permissions:', error);
    },
  });
}

// Check if wallet is installed
export function useIsWalletInstalled(walletType: string) {
  return useQuery({
    queryKey: queryKeys.web3.walletInstalled(walletType),
    queryFn: () => web3Api.isWalletInstalled(walletType),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get available wallets
export function useAvailableWallets() {
  return useQuery({
    queryKey: queryKeys.web3.availableWallets(),
    queryFn: () => web3Api.getAvailableWallets(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get connection status
export function useConnectionStatus() {
  return useQuery({
    queryKey: queryKeys.web3.connectionStatus(),
    queryFn: () => web3Api.getConnectionStatus(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}