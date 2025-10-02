/**
 * Web3 Transaction Hook
 * 
 * Standardized transaction hook for Web3
 * EXTERNAL API IDENTICAL ACROSS ALL BLOCKCHAIN PROVIDERS - Features work with ANY blockchain!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { web3Api } from '@/lib/web3/api';
import type { Transaction, TransactionOptions } from '@/lib/web3/types';

// Get transactions
export function useTransactions(address?: string, filters?: any) {
  return useQuery({
    queryKey: queryKeys.web3.transactions(address, filters),
    queryFn: () => web3Api.getTransactions(address, filters),
    enabled: !!address,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Get transaction by hash
export function useTransaction(hash: string) {
  return useQuery({
    queryKey: queryKeys.web3.transactions(hash),
    queryFn: () => web3Api.getTransaction(hash),
    enabled: !!hash,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Send transaction
export function useSendTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (transaction: TransactionOptions) => web3Api.sendTransaction(transaction),
    onSuccess: (transaction: Transaction) => {
      // Add transaction to cache
      queryClient.setQueryData(
        queryKeys.web3.transactions(transaction.hash),
        transaction
      );
      
      // Invalidate transactions list
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.transactions() });
      
      // Invalidate balance
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.balance() });
    },
    onError: (error) => {
      console.error('Failed to send transaction:', error);
    },
  });
}

// Estimate gas
export function useEstimateGas() {
  return useMutation({
    mutationFn: (transaction: Partial<TransactionOptions>) => web3Api.estimateGas(transaction),
    onError: (error) => {
      console.error('Failed to estimate gas:', error);
    },
  });
}

// Get transaction status
export function useTransactionStatus(hash: string) {
  return useQuery({
    queryKey: queryKeys.web3.transactions(hash),
    queryFn: () => web3Api.getTransactionStatus(hash),
    enabled: !!hash,
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 5 * 1000, // Refetch every 5 seconds
  });
}

// Get transaction history
export function useTransactionHistory(address?: string, timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.web3.transactions(address, { timeRange }),
    queryFn: () => web3Api.getTransactionHistory(address, timeRange),
    enabled: !!address,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Wait for transaction confirmation
export function useWaitForTransaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (hash: string) => {
      return new Promise<Transaction>((resolve, reject) => {
        const checkStatus = async () => {
          try {
            const status = await web3Api.getTransactionStatus(hash);
            if (status.status === 'confirmed') {
              const transaction = await web3Api.getTransaction(hash);
              resolve(transaction);
            } else if (status.status === 'failed') {
              reject(new Error('Transaction failed'));
            } else {
              // Still pending, check again in 2 seconds
              setTimeout(checkStatus, 2000);
            }
          } catch (error) {
            reject(error);
          }
        };
        checkStatus();
      });
    },
    onSuccess: (transaction: Transaction) => {
      // Update transaction in cache
      queryClient.setQueryData(
        queryKeys.web3.transactions(transaction.hash),
        transaction
      );
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.transactions() });
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.balance() });
    },
    onError: (error) => {
      console.error('Failed to wait for transaction:', error);
    },
  });
}

// Get pending transactions
export function usePendingTransactions(address?: string) {
  return useQuery({
    queryKey: queryKeys.web3.transactions(address, { status: 'pending' }),
    queryFn: () => web3Api.getTransactions(address, { status: 'pending' }),
    enabled: !!address,
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 5 * 1000, // Refetch every 5 seconds
  });
}

// Get transaction insights
export function useTransactionInsights(address?: string) {
  return useQuery({
    queryKey: queryKeys.web3.transactions(address, { insights: true }),
    queryFn: () => web3Api.getTransactions(address, { insights: true }),
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}