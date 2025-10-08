/**
 * PaymentService - Cohesive Business Hook Services Implementation
 * 
 * This service implements the IPaymentService interface using Stripe and TanStack Query.
 * It provides cohesive business services that group related functionality.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  IPaymentService, 
  Payment, Subscription, Invoice, PaymentMethodData, PaymentIntent, Refund, PaymentAnalytics,
  CreatePaymentData, CreateSubscriptionData, CreateInvoiceData, UpdatePaymentData, UpdateSubscriptionData, PaymentFilters
} from '@/features/payments/contract';
import { stripeClient } from '@/lib/stripe/client';

/**
 * PaymentService - Main service implementation
 * 
 * This service provides all payment-related operations through cohesive business services.
 * Each service method returns an object containing all related queries and mutations.
 */
export const PaymentService: IPaymentService = {
  /**
   * Payment Management Service
   * Provides all payment-related operations in a cohesive interface
   */
  usePayments: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (filters?: PaymentFilters) => useQuery({
      queryKey: ['payments', filters],
      queryFn: async () => {
        const response = await fetch('/api/payments', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to fetch payments');
        return response.json() as Payment[];
      }
    });

    const get = (id: string) => useQuery({
      queryKey: ['payment', id],
      queryFn: async () => {
        const response = await fetch(`/api/payments/${id}`);
        if (!response.ok) throw new Error('Failed to fetch payment');
        return response.json() as Payment;
      },
      enabled: !!id
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: CreatePaymentData) => {
        const response = await fetch('/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create payment');
        return response.json() as Payment;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdatePaymentData }) => {
        const response = await fetch(`/api/payments/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update payment');
        return response.json() as Payment;
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['payments'] });
        queryClient.invalidateQueries({ queryKey: ['payment', id] });
      }
    });

    const delete = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/payments/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete payment');
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['payments'] });
        queryClient.removeQueries({ queryKey: ['payment', id] });
      }
    });

    const refund = () => useMutation({
      mutationFn: async ({ paymentId, amount }: { paymentId: string; amount?: number }) => {
        const response = await fetch(`/api/payments/${paymentId}/refund`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount })
        });
        if (!response.ok) throw new Error('Failed to refund payment');
        return response.json() as Refund;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      }
    });

    return { list, get, create, update, delete, refund };
  },

  /**
   * Subscription Management Service
   * Provides all subscription-related operations in a cohesive interface
   */
  useSubscriptions: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (customerId?: string) => useQuery({
      queryKey: ['subscriptions', customerId],
      queryFn: async () => {
        const response = await fetch(`/api/subscriptions${customerId ? `?customerId=${customerId}` : ''}`);
        if (!response.ok) throw new Error('Failed to fetch subscriptions');
        return response.json() as Subscription[];
      }
    });

    const get = (id: string) => useQuery({
      queryKey: ['subscription', id],
      queryFn: async () => {
        const response = await fetch(`/api/subscriptions/${id}`);
        if (!response.ok) throw new Error('Failed to fetch subscription');
        return response.json() as Subscription;
      },
      enabled: !!id
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: CreateSubscriptionData) => {
        const response = await fetch('/api/subscriptions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create subscription');
        return response.json() as Subscription;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateSubscriptionData }) => {
        const response = await fetch(`/api/subscriptions/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update subscription');
        return response.json() as Subscription;
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        queryClient.invalidateQueries({ queryKey: ['subscription', id] });
      }
    });

    const cancel = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/subscriptions/${id}/cancel`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to cancel subscription');
        return response.json() as Subscription;
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        queryClient.invalidateQueries({ queryKey: ['subscription', id] });
      }
    });

    return { list, get, create, update, cancel };
  },

  /**
   * Invoice Management Service
   * Provides all invoice-related operations in a cohesive interface
   */
  useInvoices: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (customerId?: string) => useQuery({
      queryKey: ['invoices', customerId],
      queryFn: async () => {
        const response = await fetch(`/api/invoices${customerId ? `?customerId=${customerId}` : ''}`);
        if (!response.ok) throw new Error('Failed to fetch invoices');
        return response.json() as Invoice[];
      }
    });

    const get = (id: string) => useQuery({
      queryKey: ['invoice', id],
      queryFn: async () => {
        const response = await fetch(`/api/invoices/${id}`);
        if (!response.ok) throw new Error('Failed to fetch invoice');
        return response.json() as Invoice;
      },
      enabled: !!id
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: CreateInvoiceData) => {
        const response = await fetch('/api/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create invoice');
        return response.json() as Invoice;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const response = await fetch(`/api/invoices/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update invoice');
        return response.json() as Invoice;
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
        queryClient.invalidateQueries({ queryKey: ['invoice', id] });
      }
    });

    return { list, get, create, update };
  },

  /**
   * Payment Method Management Service
   * Provides all payment method-related operations in a cohesive interface
   */
  usePaymentMethods: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (customerId?: string) => useQuery({
      queryKey: ['payment-methods', customerId],
      queryFn: async () => {
        const response = await fetch(`/api/payment-methods${customerId ? `?customerId=${customerId}` : ''}`);
        if (!response.ok) throw new Error('Failed to fetch payment methods');
        return response.json() as PaymentMethodData[];
      }
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch('/api/payment-methods', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create payment method');
        return response.json() as PaymentMethodData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const response = await fetch(`/api/payment-methods/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update payment method');
        return response.json() as PaymentMethodData;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      }
    });

    const delete = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/payment-methods/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete payment method');
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      }
    });

    return { list, create, update, delete };
  },

  /**
   * Checkout Service
   * Provides payment session and checkout operations
   */
  useCheckout: () => {
    const queryClient = useQueryClient();

    // Mutation operations
    const createSession = () => useMutation({
      mutationFn: async (data: CreatePaymentData) => {
        const response = await fetch('/api/checkout/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create checkout session');
        return response.json() as PaymentIntent;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payments'] });
      }
    });

    const createPortalSession = () => useMutation({
      mutationFn: async (customerId: string) => {
        const response = await fetch('/api/checkout/portal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId })
        });
        if (!response.ok) throw new Error('Failed to create portal session');
        return response.json() as { url: string };
      }
    });

    return { createSession, createPortalSession };
  },

  /**
   * Analytics Service
   * Provides payment analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    const getAnalytics = () => useQuery({
      queryKey: ['payment-analytics'],
      queryFn: async () => {
        const response = await fetch('/api/analytics');
        if (!response.ok) throw new Error('Failed to fetch payment analytics');
        return response.json() as PaymentAnalytics;
      }
    });

    return { getAnalytics };
  }
};