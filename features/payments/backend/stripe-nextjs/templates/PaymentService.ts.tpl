/**
 * PaymentService - Pure TanStack Query Implementation
 * 
 * This service implements the IPaymentService interface using pure TanStack Query hooks.
 * All server-side logic is handled by the Stripe-NextJS-Drizzle connector.
 * This service only makes HTTP calls to API endpoints.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  IPaymentService, 
  Payment, Subscription, Invoice, PaymentMethodData, PaymentIntent, Refund, PaymentAnalytics,
  CreatePaymentData, CreateSubscriptionData, CreateInvoiceData, UpdatePaymentData, UpdateSubscriptionData, PaymentFilters
} from '@/features/payments/contract';

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
  },

  /**
   * Organization Billing Service
   * Provides organization-level billing operations
   */
  useOrganizationBilling: (orgId: string) => {
    const queryClient = useQueryClient();

    // Subscription Management
    const subscription = useQuery({
      queryKey: ['organization-subscription', orgId],
      queryFn: async () => {
        const response = await fetch(`/api/organizations/${orgId}/subscriptions`);
        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error('Failed to fetch organization subscription');
        }
        return response.json();
      },
      enabled: !!orgId
    });

    const createSubscription = useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch(`/api/organizations/${orgId}/subscriptions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create organization subscription');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['organization-subscription', orgId] });
      }
    });

    const updateSubscription = useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch(`/api/organizations/${orgId}/subscriptions`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update organization subscription');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['organization-subscription', orgId] });
      }
    });

    const cancelSubscription = useMutation({
      mutationFn: async (cancelAtPeriodEnd: boolean = true) => {
        const response = await fetch(`/api/organizations/${orgId}/subscriptions?cancelAtPeriodEnd=${cancelAtPeriodEnd}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to cancel organization subscription');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['organization-subscription', orgId] });
      }
    });

    // Seat Management
    const seats = useQuery({
      queryKey: ['organization-seats', orgId],
      queryFn: async () => {
        const response = await fetch(`/api/organizations/${orgId}/seats`);
        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error('Failed to fetch organization seats');
        }
        return response.json();
      },
      enabled: !!orgId
    });

    const updateSeats = useMutation({
      mutationFn: async (seats: number) => {
        const response = await fetch(`/api/organizations/${orgId}/seats`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seats })
        });
        if (!response.ok) throw new Error('Failed to update organization seats');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['organization-seats', orgId] });
        queryClient.invalidateQueries({ queryKey: ['organization-subscription', orgId] });
      }
    });

    // Usage Tracking
    const usage = useQuery({
      queryKey: ['organization-usage', orgId],
      queryFn: async () => {
        const response = await fetch(`/api/organizations/${orgId}/usage`);
        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error('Failed to fetch organization usage');
        }
        return response.json();
      },
      enabled: !!orgId
    });

    const trackUsage = useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch(`/api/organizations/${orgId}/usage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to track organization usage');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['organization-usage', orgId] });
      }
    });

    // Billing Info
    const billingInfo = useQuery({
      queryKey: ['organization-billing-info', orgId],
      queryFn: async () => {
        const response = await fetch(`/api/organizations/${orgId}/billing`);
        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error('Failed to fetch organization billing info');
        }
        return response.json();
      },
      enabled: !!orgId
    });

    const updateBillingInfo = useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch(`/api/organizations/${orgId}/billing`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update organization billing info');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['organization-billing-info', orgId] });
      }
    });

    // Invoices
    const invoices = useQuery({
      queryKey: ['organization-invoices', orgId],
      queryFn: async () => {
        const response = await fetch(`/api/organizations/${orgId}/invoices`);
        if (!response.ok) throw new Error('Failed to fetch organization invoices');
        return response.json();
      },
      enabled: !!orgId
    });

    const downloadInvoice = async (invoiceId: string): Promise<Blob> => {
      const response = await fetch(`/api/organizations/${orgId}/invoices/${invoiceId}/download`);
      if (!response.ok) throw new Error('Failed to download invoice');
      return response.blob();
    };

    // Customer Portal
    const createPortalSession = async (): Promise<{ url: string }> => {
      const response = await fetch(`/api/organizations/${orgId}/billing/portal`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to create portal session');
      return response.json();
    };

    return {
      subscription,
      createSubscription,
      updateSubscription,
      cancelSubscription,
      seats,
      updateSeats,
      usage,
      trackUsage,
      billingInfo,
      updateBillingInfo,
      invoices,
      downloadInvoice,
      createPortalSession
    };
  },

  /**
   * Team Usage Service
   * Provides team-level usage tracking
   */
  useTeamUsage: (orgId: string, teamId: string) => {
    const queryClient = useQueryClient();

    const usage = useQuery({
      queryKey: ['team-usage', orgId, teamId],
      queryFn: async () => {
        const response = await fetch(`/api/organizations/${orgId}/teams/${teamId}/usage`);
        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error('Failed to fetch team usage');
        }
        return response.json();
      },
      enabled: !!orgId && !!teamId
    });

    const trackUsage = useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch(`/api/organizations/${orgId}/teams/${teamId}/usage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to track team usage');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['team-usage', orgId, teamId] });
        queryClient.invalidateQueries({ queryKey: ['organization-usage', orgId] });
      }
    });

    return {
      usage,
      trackUsage
    };
  }
};