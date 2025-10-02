/**
 * Web3 Disconnect Hook
 * 
 * Standardized wallet disconnection hook for Web3
 * EXTERNAL API IDENTICAL ACROSS ALL BLOCKCHAIN PROVIDERS - Features work with ANY blockchain!
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { web3Api } from '@/lib/web3/api';

// Disconnect wallet
export function useDisconnectWallet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => web3Api.disconnectWallet(),
    onSuccess: () => {
      // Clear all Web3-related cache
      queryClient.removeQueries({ queryKey: queryKeys.web3.all() });
      
      // Reset to initial state
      queryClient.setQueryData(queryKeys.web3.status(), {
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
      });
      
      queryClient.setQueryData(queryKeys.web3.wallet(), null);
    },
    onError: (error) => {
      console.error('Failed to disconnect wallet:', error);
    },
  });
}

// Force disconnect (clear all data)
export function useForceDisconnect() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => web3Api.disconnectWallet(),
    onSuccess: () => {
      // Clear all Web3-related cache
      queryClient.removeQueries({ queryKey: queryKeys.web3.all() });
      
      // Clear localStorage/sessionStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('web3-wallet');
        localStorage.removeItem('web3-account');
        localStorage.removeItem('web3-chainId');
        sessionStorage.removeItem('web3-session');
      }
    },
    onError: (error) => {
      console.error('Failed to force disconnect:', error);
    },
  });
}