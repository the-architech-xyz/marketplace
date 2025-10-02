/**
 * Web3 Balance Hook
 * 
 * Standardized balance hook for Web3
 * EXTERNAL API IDENTICAL ACROSS ALL BLOCKCHAIN PROVIDERS - Features work with ANY blockchain!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { web3Api } from '@/lib/web3/api';
import type { Balance, TokenBalance, BalanceFilter } from '@/lib/web3/types';

// Get native balance
export function useBalance(address?: string) {
  return useQuery({
    queryKey: queryKeys.web3.balance(address),
    queryFn: () => web3Api.getBalance(address),
    enabled: !!address,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Get token balance
export function useTokenBalance(address?: string, tokenAddress?: string) {
  return useQuery({
    queryKey: queryKeys.web3.tokenBalance(address, tokenAddress),
    queryFn: () => web3Api.getTokenBalance(address, tokenAddress),
    enabled: !!address && !!tokenAddress,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// Get all token balances
export function useTokenBalances(address?: string, filters?: BalanceFilter) {
  return useQuery({
    queryKey: queryKeys.web3.tokenBalances(address, filters),
    queryFn: () => web3Api.getTokenBalances(address, filters),
    enabled: !!address,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get balance history
export function useBalanceHistory(address?: string, timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.web3.balanceHistory(address, timeRange),
    queryFn: () => web3Api.getBalanceHistory(address, timeRange),
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get balance summary
export function useBalanceSummary(address?: string) {
  return useQuery({
    queryKey: queryKeys.web3.balanceSummary(address),
    queryFn: () => web3Api.getBalanceSummary(address),
    enabled: !!address,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get portfolio value
export function usePortfolioValue(address?: string) {
  return useQuery({
    queryKey: queryKeys.web3.portfolioValue(address),
    queryFn: () => web3Api.getPortfolioValue(address),
    enabled: !!address,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get portfolio performance
export function usePortfolioPerformance(address?: string, timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.web3.portfolioPerformance(address, timeRange),
    queryFn: () => web3Api.getPortfolioPerformance(address, timeRange),
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get balance alerts
export function useBalanceAlerts(address?: string) {
  return useQuery({
    queryKey: queryKeys.web3.balanceAlerts(address),
    queryFn: () => web3Api.getBalanceAlerts(address),
    enabled: !!address,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Create balance alert
export function useCreateBalanceAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (alert: any) => web3Api.createBalanceAlert(alert),
    onSuccess: (_, { address }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.web3.balanceAlerts(address) });
    },
    onError: (error) => {
      console.error('Failed to create balance alert:', error);
    },
  });
}

// Get balance insights
export function useBalanceInsights(address?: string) {
  return useQuery({
    queryKey: queryKeys.web3.balanceInsights(address),
    queryFn: () => web3Api.getBalanceInsights(address),
    enabled: !!address,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get balance trends
export function useBalanceTrends(address?: string, timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.web3.balanceTrends(address, timeRange),
    queryFn: () => web3Api.getBalanceTrends(address, timeRange),
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Refresh balance
export function useRefreshBalance() {
  const queryClient = useQueryClient();
  
  return {
    refresh: (address?: string) => {
      if (address) {
        queryClient.invalidateQueries({ queryKey: queryKeys.web3.balance(address) });
        queryClient.invalidateQueries({ queryKey: queryKeys.web3.tokenBalances(address) });
        queryClient.invalidateQueries({ queryKey: queryKeys.web3.balanceSummary(address) });
        queryClient.invalidateQueries({ queryKey: queryKeys.web3.portfolioValue(address) });
      } else {
        queryClient.invalidateQueries({ queryKey: queryKeys.web3.balance() });
        queryClient.invalidateQueries({ queryKey: queryKeys.web3.tokenBalances() });
        queryClient.invalidateQueries({ queryKey: queryKeys.web3.balanceSummary() });
        queryClient.invalidateQueries({ queryKey: queryKeys.web3.portfolioValue() });
      }
    },
  };
}