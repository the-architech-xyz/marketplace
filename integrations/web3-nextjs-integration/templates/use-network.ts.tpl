/**
 * Web3 Network Hook
 * 
 * Standardized network hook for Web3
 * EXTERNAL API IDENTICAL ACROSS ALL BLOCKCHAIN PROVIDERS - Features work with ANY blockchain!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { web3Api } from '@/lib/web3/api';
import type { Network } from '@/lib/web3/types';

// Get all networks
export function useNetworks() {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getNetworks(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get current network
export function useCurrentNetwork() {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getCurrentNetwork(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get network info by chain ID
export function useNetworkInfo(chainId: number) {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getNetworkInfo(chainId),
    enabled: !!chainId,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Switch network
export function useSwitchNetwork() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (chainId: number) => web3Api.switchNetwork(chainId),
    onSuccess: () => {
      // Invalidate network-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.networks() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.status() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.balance() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.tokens() });
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
    mutationFn: (network: Network) => web3Api.addNetwork(network),
    onSuccess: () => {
      // Invalidate networks query
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.networks() });
    },
    onError: (error) => {
      console.error('Failed to add network:', error);
    },
  });
}

// Get supported networks
export function useSupportedNetworks() {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getNetworks().then(networks => 
      networks.filter(network => network.isSupported)
    ),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get testnet networks
export function useTestnetNetworks() {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getNetworks().then(networks => 
      networks.filter(network => network.isTestnet)
    ),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get mainnet networks
export function useMainnetNetworks() {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getNetworks().then(networks => 
      networks.filter(network => !network.isTestnet)
    ),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Check if network is supported
export function useIsNetworkSupported(chainId: number) {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getNetworkInfo(chainId).then(network => network.isSupported),
    enabled: !!chainId,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get network by name
export function useNetworkByName(name: string) {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getNetworks().then(networks => 
      networks.find(network => network.name.toLowerCase() === name.toLowerCase())
    ),
    enabled: !!name,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get network statistics
export function useNetworkStats(chainId: number) {
  return useQuery({
    queryKey: queryKeys.web3.networks(),
    queryFn: () => web3Api.getNetworkInfo(chainId).then(network => ({
      chainId: network.chainId,
      name: network.name,
      isTestnet: network.isTestnet,
      isSupported: network.isSupported,
      blockExplorer: network.blockExplorer,
      nativeCurrency: network.nativeCurrency,
    })),
    enabled: !!chainId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}