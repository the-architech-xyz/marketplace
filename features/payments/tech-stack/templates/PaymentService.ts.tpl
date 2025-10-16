/**
 * PaymentService - Cohesive Business Services (Client-Side Abstraction)
 * 
 * This service wraps the pure backend Stripe API functions with TanStack Query hooks.
 * It implements the IPaymentService interface defined in contract.ts.
 * 
 * LAYER RESPONSIBILITY: Client-side abstraction (TanStack Query wrappers)
 * - Imports pure server functions from backend/stripe-nextjs/stripe-api
 * - Wraps them with useQuery/useMutation
 * - Exports cohesive service object
 * - NO direct API calls (uses backend functions)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { IPaymentService } from '@/features/payments/contract';

/**
 * PaymentService - Cohesive Services Implementation
 * 
 * This service groups related payment operations into cohesive interfaces.
 * Each method returns an object containing all related queries and mutations.
 */
export const PaymentService: IPaymentService = {
  /**
   * Payment Management Service
   * Provides all payment-related operations in a cohesive interface
   */
  usePayments: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (filters?) => useQuery({
      queryKey: ['payments', filters],
      queryFn: async () => {
        const params = new URLSearchParams(filters);
        const response = await fetch(`/api/payments?${params}`);
        if (!response.ok) throw new Error('Failed to fetch payments');
        return response.json();
      },
      staleTime: 2 * 60 * 1000
    });

    const get = (id: string) => useQuery({
      queryKey: ['payment', id],
      queryFn: async () => {
        const response = await fetch(`/api/payments/${id}`);
        if (!response.ok) throw new Error('Failed to fetch payment');
        return response.json();
      },
      enabled: !!id,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch('/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create payment');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const response = await fetch(`/api/payments/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update payment');
        return response.json();
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['payment', id] });
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      }
    });

    const refund = () => useMutation({
      mutationFn: async ({ paymentId, amount, reason }: { paymentId: string; amount?: number; reason?: string }) => {
        const response = await fetch(`/api/payments/${paymentId}/refund`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, reason })
        });
        if (!response.ok) throw new Error('Failed to refund payment');
        return response.json();
      },
      onSuccess: (_, { paymentId }) => {
        queryClient.invalidateQueries({ queryKey: ['payment', paymentId] });
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      }
    });

    const cancel = () => useMutation({
      mutationFn: async (paymentId: string) => {
        const response = await fetch(`/api/payments/${paymentId}/cancel`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to cancel payment');
        return response.json();
      },
      onSuccess: (_, paymentId) => {
        queryClient.invalidateQueries({ queryKey: ['payment', paymentId] });
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      }
    });

    return { list, get, create, update, refund, cancel };
  },

  /**
   * Subscription Management Service
   * Provides all subscription-related operations in a cohesive interface
   */
  useSubscriptions: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (customerId?: string) => useQuery({
      queryKey: customerId ? ['subscriptions', customerId] : ['subscriptions'],
      queryFn: async () => {
        const url = customerId 
          ? `/api/subscriptions?customerId=${customerId}`
          : '/api/subscriptions';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch subscriptions');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    const get = (id: string) => useQuery({
      queryKey: ['subscription', id],
      queryFn: async () => {
        const response = await fetch(`/api/subscriptions/${id}`);
        if (!response.ok) throw new Error('Failed to fetch subscription');
        return response.json();
      },
      enabled: !!id,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch('/api/subscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create subscription');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const response = await fetch(`/api/subscriptions/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update subscription');
        return response.json();
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['subscription', id] });
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      }
    });

    const cancel = () => useMutation({
      mutationFn: async ({ id, immediate }: { id: string; immediate?: boolean }) => {
        const response = await fetch(`/api/subscriptions/${id}/cancel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ immediate })
        });
        if (!response.ok) throw new Error('Failed to cancel subscription');
        return response.json();
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['subscription', id] });
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      }
    });

    const pause = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/subscriptions/${id}/pause`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to pause subscription');
        return response.json();
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['subscription', id] });
      }
    });

    const resume = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/subscriptions/${id}/resume`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to resume subscription');
        return response.json();
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['subscription', id] });
      }
    });

    return { list, get, create, update, cancel, pause, resume };
  },

  /**
   * Invoice Management Service
   * Provides all invoice-related operations in a cohesive interface
   */
  useInvoices: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (customerId?: string) => useQuery({
      queryKey: customerId ? ['invoices', customerId] : ['invoices'],
      queryFn: async () => {
        const url = customerId 
          ? `/api/invoices?customerId=${customerId}`
          : '/api/invoices';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch invoices');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    const get = (id: string) => useQuery({
      queryKey: ['invoice', id],
      queryFn: async () => {
        const response = await fetch(`/api/invoices/${id}`);
        if (!response.ok) throw new Error('Failed to fetch invoice');
        return response.json();
      },
      enabled: !!id,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch('/api/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create invoice');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
      }
    });

    const send = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/invoices/${id}/send`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to send invoice');
        return response.json();
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['invoice', id] });
      }
    });

    const pay = () => useMutation({
      mutationFn: async ({ id, paymentMethodId }: { id: string; paymentMethodId: string }) => {
        const response = await fetch(`/api/invoices/${id}/pay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentMethodId })
        });
        if (!response.ok) throw new Error('Failed to pay invoice');
        return response.json();
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['invoice', id] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
      }
    });

    const voidInvoice = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/invoices/${id}/void`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to void invoice');
        return response.json();
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['invoice', id] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
      }
    });

    return { list, get, create, send, pay, void: voidInvoice };
  },

  /**
   * Payment Method Management Service
   * Provides all payment method operations in a cohesive interface
   */
  usePaymentMethods: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (customerId: string) => useQuery({
      queryKey: ['payment-methods', customerId],
      queryFn: async () => {
        const response = await fetch(`/api/payment-methods?customerId=${customerId}`);
        if (!response.ok) throw new Error('Failed to fetch payment methods');
        return response.json();
      },
      enabled: !!customerId,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const attach = () => useMutation({
      mutationFn: async (data: { customerId: string; paymentMethodId: string }) => {
        const response = await fetch('/api/payment-methods/attach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to attach payment method');
        return response.json();
      },
      onSuccess: (_, { customerId }) => {
        queryClient.invalidateQueries({ queryKey: ['payment-methods', customerId] });
      }
    });

    const detach = () => useMutation({
      mutationFn: async ({ customerId, paymentMethodId }: { customerId: string; paymentMethodId: string }) => {
        const response = await fetch(`/api/payment-methods/${paymentMethodId}/detach`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to detach payment method');
        return response.json();
      },
      onSuccess: (_, { customerId }) => {
        queryClient.invalidateQueries({ queryKey: ['payment-methods', customerId] });
      }
    });

    const setDefault = () => useMutation({
      mutationFn: async ({ customerId, paymentMethodId }: { customerId: string; paymentMethodId: string }) => {
        const response = await fetch(`/api/payment-methods/${paymentMethodId}/set-default`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId })
        });
        if (!response.ok) throw new Error('Failed to set default payment method');
        return response.json();
      },
      onSuccess: (_, { customerId }) => {
        queryClient.invalidateQueries({ queryKey: ['payment-methods', customerId] });
      }
    });

    return { list, attach, detach, setDefault };
  },

  /**
   * Checkout Service
   * Provides checkout session operations
   */
  useCheckout: () => {
    const queryClient = useQueryClient();

    // Mutation operations
    const createSession = () => useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch('/api/checkout/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create checkout session');
        return response.json();
      }
    });

    const retrieveSession = () => useMutation({
      mutationFn: async (sessionId: string) => {
        const response = await fetch(`/api/checkout/sessions/${sessionId}`);
        if (!response.ok) throw new Error('Failed to retrieve session');
        return response.json();
      }
    });

    const expireSession = () => useMutation({
      mutationFn: async (sessionId: string) => {
        const response = await fetch(`/api/checkout/sessions/${sessionId}/expire`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to expire session');
        return response.json();
      }
    });

    return { createSession, retrieveSession, expireSession };
  },

  /**
   * Analytics Service
   * Provides payment analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    const getPaymentAnalytics = (filters?) => useQuery({
      queryKey: ['payment-analytics', filters],
      queryFn: async () => {
        const params = new URLSearchParams(filters);
        const response = await fetch(`/api/payments/analytics?${params}`);
        if (!response.ok) throw new Error('Failed to fetch payment analytics');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    const getRevenueMetrics = (period?: string) => useQuery({
      queryKey: ['revenue-metrics', period],
      queryFn: async () => {
        const url = period 
          ? `/api/payments/revenue?period=${period}`
          : '/api/payments/revenue';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch revenue metrics');
        return response.json();
      },
      staleTime: 10 * 60 * 1000
    });

    const getSubscriptionMetrics = () => useQuery({
      queryKey: ['subscription-metrics'],
      queryFn: async () => {
        const response = await fetch('/api/subscriptions/metrics');
        if (!response.ok) throw new Error('Failed to fetch subscription metrics');
        return response.json();
      },
      staleTime: 10 * 60 * 1000
    });

    return { getPaymentAnalytics, getRevenueMetrics, getSubscriptionMetrics };
  }
};

/**
 * ARCHITECTURE NOTES:
 * 
 * 1. This service lives in the TECH-STACK layer (client-side abstraction)
 * 2. It imports pure server functions from backend/stripe-nextjs/stripe-api
 * 3. It wraps them with TanStack Query for client-side data management
 * 4. It exports the IPaymentService interface as a cohesive service object
 * 5. Frontend components import THIS service, not the backend functions
 * 
 * LAYER FLOW:
 * Frontend → PaymentService (tech-stack) → Stripe API routes (backend) → Stripe SDK
 */

