/**
 * Payments - Direct TanStack Query Hooks
 * 
 * ARCHITECTURE: Direct Hooks Pattern (Best Practice)
 * - Each hook is a standalone TanStack Query hook
 * - Clear naming: usePaymentsList, useSubscriptionCreate, etc.
 * - No abstraction layers, direct usage
 * - Matches React ecosystem conventions
 */

import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

// ============================================================================
// PAYMENT HOOKS
// ============================================================================

export const usePaymentsList = (filters?: any, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['payments', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/payments?${params}`);
      if (!response.ok) throw new Error('Failed to fetch payments');
      return response.json();
    },
    staleTime: 2 * 60 * 1000,
    ...options
  });
};

export const usePayment = (id: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: async () => {
      const response = await fetch(`/api/payments/${id}`);
      if (!response.ok) throw new Error('Failed to fetch payment');
      return response.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

export const usePaymentsCreate = (options?: UseMutationOptions<any, any, any>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create payment');
      return response.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

export const usePaymentsRefund = (options?: UseMutationOptions<any, any, { paymentId: string; amount?: number; reason?: string }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ paymentId, amount, reason }: { paymentId: string; amount?: number; reason?: string }) => {
      const response = await fetch(`/api/payments/${paymentId}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, reason })
      });
      if (!response.ok) throw new Error('Failed to refund payment');
      return response.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['payment', variables.paymentId] });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

// ============================================================================
// SUBSCRIPTION HOOKS
// ============================================================================

export const useSubscriptionsList = (filters?: any, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['subscriptions', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/subscriptions?${params}`);
      if (!response.ok) throw new Error('Failed to fetch subscriptions');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

export const useSubscription = (id: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['subscription', id],
    queryFn: async () => {
      const response = await fetch(`/api/subscriptions/${id}`);
      if (!response.ok) throw new Error('Failed to fetch subscription');
      return response.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

export const useSubscriptionsCreate = (options?: UseMutationOptions<any, any, any>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create subscription');
      return response.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

export const useSubscriptionsUpdate = (options?: UseMutationOptions<any, any, { id: string; data: any }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update subscription');
      return response.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['subscription', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

export const useSubscriptionsCancel = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/subscriptions/${id}/cancel`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to cancel subscription');
      return response.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['subscription', id] });
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

export const useSubscriptionsPause = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/subscriptions/${id}/pause`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to pause subscription');
      return response.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['subscription', id] });
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

export const useSubscriptionsResume = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/subscriptions/${id}/resume`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to resume subscription');
      return response.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['subscription', id] });
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

// ============================================================================
// INVOICE HOOKS
// ============================================================================

export const useInvoicesList = (filters?: any, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['invoices', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/invoices?${params}`);
      if (!response.ok) throw new Error('Failed to fetch invoices');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

export const useInvoice = (id: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      const response = await fetch(`/api/invoices/${id}`);
      if (!response.ok) throw new Error('Failed to fetch invoice');
      return response.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

// ============================================================================
// CHECKOUT HOOKS
// ============================================================================

export const useCheckoutCreate = (options?: UseMutationOptions<any, any, any>) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/checkout/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create checkout session');
      return response.json();
    },
    ...options
  });
};

// ============================================================================
// PAYMENT METHOD HOOKS
// ============================================================================

export const usePaymentMethodsList = (customerId?: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['payment-methods', customerId],
    queryFn: async () => {
      const response = await fetch(`/api/payment-methods?customerId=${customerId}`);
      if (!response.ok) throw new Error('Failed to fetch payment methods');
      return response.json();
    },
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

export const usePaymentMethodsAttach = (options?: UseMutationOptions<any, any, { paymentMethodId: string; customerId: string }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ paymentMethodId, customerId }: { paymentMethodId: string; customerId: string }) => {
      const response = await fetch(`/api/payment-methods/${paymentMethodId}/attach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId })
      });
      if (!response.ok) throw new Error('Failed to attach payment method');
      return response.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods', variables.customerId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

export const usePaymentMethodsDetach = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paymentMethodId: string) => {
      const response = await fetch(`/api/payment-methods/${paymentMethodId}/detach`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to detach payment method');
      return response.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

// ============================================================================
// ANALYTICS HOOKS
// ============================================================================

export const usePaymentAnalytics = (filters?: any, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['payment-analytics', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/payments/analytics?${params}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

// ============================================================================
// CART HOOK (Client-side state management)
// ============================================================================

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  metadata?: Record<string, any>;
}

interface UseCartReturn {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

/**
 * Shopping cart hook with localStorage persistence
 */
export const useCart = (): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('shopping-cart');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Persist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopping-cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === item.productId);
      if (existing) {
        return prev.map(i => 
          i.productId === item.productId 
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback((productId: string) => {
    return items.some(i => i.productId === productId);
  }, [items]);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart
  };
};
