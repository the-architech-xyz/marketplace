/**
 * Main Web3 Hook
 * 
 * Standardized main Web3 hook for blockchain interactions
 * EXTERNAL API IDENTICAL ACROSS ALL BLOCKCHAIN PROVIDERS - Features work with ANY blockchain!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { web3Api } from '@/lib/web3/api';
import type { Web3Config, Web3Status, WalletInfo } from '@/lib/web3/types';

// Main Web3 hook - returns connection status and wallet info
export function useWeb3() {
  const queryClient = useQueryClient();
  
  // Get Web3 configuration
  const configQuery = useQuery({
    queryKey: queryKeys.web3.config(),
    queryFn: () => web3Api.getConfig(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
  
  // Get Web3 status
  const statusQuery = useQuery({
    queryKey: queryKeys.web3.status(),
    queryFn: () => web3Api.getStatus(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Get wallet info
  const walletQuery = useQuery({
    queryKey: queryKeys.web3.wallet(),
    queryFn: () => web3Api.getWalletInfo(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
  
  const isLoading = configQuery.isLoading || statusQuery.isLoading || walletQuery.isLoading;
  const error = configQuery.error || statusQuery.error || walletQuery.error;
  
  return {
    // Configuration
    config: configQuery.data || null,
    isConfigLoading: configQuery.isLoading,
    configError: configQuery.error,
    
    // Status
    status: statusQuery.data || null,
    isStatusLoading: statusQuery.isLoading,
    statusError: statusQuery.error,
    
    // Wallet
    wallet: walletQuery.data || null,
    isWalletLoading: walletQuery.isLoading,
    walletError: walletQuery.error,
    
    // Combined status
    isLoading,
    error,
    isConnected: statusQuery.data?.isConnected || false,
    isDisconnected: !statusQuery.data?.isConnected && !isLoading,
    
    // Actions
    refetch: () => {
      configQuery.refetch();
      statusQuery.refetch();
      walletQuery.refetch();
    },
    
    // Invalidate Web3 data
    invalidate: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.all() });
    },
  };
}

// Web3 connection status hook
export function useWeb3Status() {
  const { isConnected, isLoading, error } = useWeb3();
  
  return {
    isConnected,
    isLoading,
    error,
    isDisconnected: !isConnected && !isLoading,
  };
}

// Web3 loading hook
export function useWeb3Loading() {
  const { isLoading } = useWeb3();
  
  return isLoading;
}

// Web3 error hook
export function useWeb3Error() {
  const { error } = useWeb3();
  
  return error;
}

// Get Web3 networks
export function useWeb3Networks() {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getNetworks(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get Web3 tokens
export function useWeb3Tokens() {
  return useQuery({
    queryKey: queryKeys.web3.tokens(),
    queryFn: () => web3Api.getTokens(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get Web3 transactions
export function useWeb3Transactions(address?: string) {
  return useQuery({
    queryKey: queryKeys.web3.transactions(address),
    queryFn: () => web3Api.getTransactions(address),
    enabled: !!address,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Web3 refresh hook
export function useWeb3Refresh() {
  const { refetch } = useWeb3();
  
  return {
    refresh: refetch,
  };
}