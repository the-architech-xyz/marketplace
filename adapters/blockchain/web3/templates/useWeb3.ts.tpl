import { useQuery } from '@tanstack/react-query';
import { web3Core, Web3Error, type Address, type Hash } from '@/lib/web3/core';
import { NETWORKS, type SupportedChain } from '@/lib/web3/config';

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
    retry: 3,
    retryDelay: 1000,
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
    retry: 3,
    retryDelay: 1000,
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
    retry: 3,
    retryDelay: 1000,
  });
}

// Hook for block query
export function useBlock(blockNumber: bigint | null) {
  return useQuery({
    queryKey: ['block', blockNumber],
    queryFn: async () => {
      if (!blockNumber) return null;
      return await web3Core.getBlock(blockNumber);
    },
    enabled: !!blockNumber,
    retry: 3,
    retryDelay: 1000,
  });
}

// Hook for transaction query
export function useTransaction(hash: Hash | null) {
  return useQuery({
    queryKey: ['transaction', hash],
    queryFn: async () => {
      if (!hash) return null;
      return await web3Core.getTransaction(hash);
    },
    enabled: !!hash,
    retry: 3,
    retryDelay: 1000,
  });
}

// Hook for current chain info
export function useCurrentChain() {
  return useQuery({
    queryKey: ['currentChain'],
    queryFn: async () => {
      return web3Core.getCurrentChain();
    },
    staleTime: Infinity, // Chain info doesn't change during session
  });
}

// Hook for supported networks
export function useSupportedNetworks() {
  return useQuery({
    queryKey: ['supportedNetworks'],
    queryFn: async () => {
      return NETWORKS;
    },
    staleTime: Infinity, // Networks don't change
  });
}

// Type exports
export type { Address, Hash };
