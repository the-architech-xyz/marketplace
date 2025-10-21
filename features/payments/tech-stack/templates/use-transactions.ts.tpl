'use client';

/**
 * Transaction Hooks
 * 
 * Provides convenient hooks for transaction operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Transaction, CreateTransactionData, UpdateTransactionData } from '../contract';

export interface UseTransactionsOptions {
  customerId?: string;
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  enabled?: boolean;
}

export interface UseTransactionsReturn {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  fetchTransactions: () => void;
  exportTransactions: (format: 'json' | 'csv' | 'pdf') => Promise<void>;
}

export function useTransactions(options: UseTransactionsOptions = {}): UseTransactionsReturn {
  const { customerId, status, dateRange, enabled = true } = options;
  const queryClient = useQueryClient();

  const { data: transactions = [], isLoading, error, refetch } = useQuery({
    queryKey: ['transactions', { customerId, status, dateRange }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (customerId) params.append('customerId', customerId);
      if (status) params.append('status', status);
      if (dateRange) {
        params.append('startDate', dateRange.start.toISOString());
        params.append('endDate', dateRange.end.toISOString());
      }

      const response = await fetch(`/api/transactions?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      return response.json();
    },
    enabled,
  });

  const exportTransactions = async (format: 'json' | 'csv' | 'pdf') => {
    const params = new URLSearchParams();
    params.append('format', format);
    if (customerId) params.append('customerId', customerId);
    if (status) params.append('status', status);
    if (dateRange) {
      params.append('startDate', dateRange.start.toISOString());
      params.append('endDate', dateRange.end.toISOString());
    }

    const response = await fetch(`/api/transactions/export?${params}`);
    if (!response.ok) {
      throw new Error('Failed to export transactions');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return {
    transactions,
    isLoading,
    error: error as Error | null,
    fetchTransactions: () => refetch(),
    exportTransactions,
  };
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: async () => {
      const response = await fetch(`/api/transactions/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transaction');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionData) => {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTransactionData }) => {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction', variables.id] });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}


