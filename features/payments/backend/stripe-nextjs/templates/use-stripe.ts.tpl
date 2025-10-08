/**
 * Stripe Hook
 * 
 * Standardized Stripe hook for payment operations
 * EXTERNAL API IDENTICAL ACROSS ALL PAYMENT PROVIDERS - Features work with ANY payment service!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { stripeApi } from '@/lib/stripe/api';
import type { StripeConfig, PaymentIntent, StripeError } from '@/lib/stripe/types';

// Main Stripe hook - returns Stripe configuration and client
export function useStripe() {
  const queryClient = useQueryClient();
  
  // Get Stripe configuration
  const configQuery = useQuery({
    queryKey: queryKeys.stripe.config(),
    queryFn: () => stripeApi.getConfig(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
  
  // Get Stripe client
  const clientQuery = useQuery({
    queryKey: queryKeys.stripe.client(),
    queryFn: () => stripeApi.getClient(),
    enabled: !!configQuery.data,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
  
  const isLoading = configQuery.isLoading || clientQuery.isLoading;
  const error = configQuery.error || clientQuery.error;
  
  return {
    // Configuration
    config: configQuery.data || null,
    isConfigLoading: configQuery.isLoading,
    configError: configQuery.error,
    
    // Client
    client: clientQuery.data || null,
    isClientLoading: clientQuery.isLoading,
    clientError: clientQuery.error,
    
    // Combined status
    isLoading,
    error,
    isReady: !!configQuery.data && !!clientQuery.data,
    
    // Actions
    refetch: () => {
      configQuery.refetch();
      clientQuery.refetch();
    },
    
    // Invalidate Stripe data
    invalidate: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.all() });
    },
  };
}

// Stripe configuration hook
export function useStripeConfig() {
  const { config, isConfigLoading, configError } = useStripe();
  
  return {
    config,
    isLoading: isConfigLoading,
    error: configError,
    isReady: !!config,
  };
}

// Stripe client hook
export function useStripeClient() {
  const { client, isClientLoading, clientError } = useStripe();
  
  return {
    client,
    isLoading: isClientLoading,
    error: clientError,
    isReady: !!client,
  };
}

// Stripe ready state hook
export function useStripeReady() {
  const { isReady, isLoading, error } = useStripe();
  
  return {
    isReady,
    isLoading,
    error,
  };
}

// Stripe error hook
export function useStripeError() {
  const { error } = useStripe();
  
  return error;
}

// Stripe loading hook
export function useStripeLoading() {
  const { isLoading } = useStripe();
  
  return isLoading;
}

// Stripe refresh hook
export function useStripeRefresh() {
  const { refetch } = useStripe();
  
  return {
    refresh: refetch,
  };
}

// Initialize Stripe
export function useInitializeStripe() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (config?: Partial<StripeConfig>) => stripeApi.initialize(config),
    onSuccess: (result) => {
      // Update config and client in cache
      queryClient.setQueryData(queryKeys.stripe.config(), result.config);
      queryClient.setQueryData(queryKeys.stripe.client(), result.client);
    },
    onError: (error: StripeError) => {
      console.error('Initialize Stripe failed:', error);
    },
  });
}

// Get Stripe capabilities
export function useStripeCapabilities() {
  return useQuery({
    queryKey: queryKeys.stripe.capabilities(),
    queryFn: () => stripeApi.getCapabilities(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

// Get Stripe status
export function useStripeStatus() {
  return useQuery({
    queryKey: queryKeys.stripe.status(),
    queryFn: () => stripeApi.getStatus(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get Stripe webhooks
export function useStripeWebhooks() {
  return useQuery({
    queryKey: queryKeys.stripe.webhooks(),
    queryFn: () => stripeApi.getWebhooks(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Create Stripe webhook
export function useCreateStripeWebhook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (webhook: any) => stripeApi.createWebhook(webhook),
    onSuccess: () => {
      // Invalidate webhooks
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.webhooks() });
    },
    onError: (error: StripeError) => {
      console.error('Create Stripe webhook failed:', error);
    },
  });
}

// Update Stripe webhook
export function useUpdateStripeWebhook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ webhookId, updates }: { webhookId: string; updates: any }) => 
      stripeApi.updateWebhook(webhookId, updates),
    onSuccess: () => {
      // Invalidate webhooks
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.webhooks() });
    },
    onError: (error: StripeError) => {
      console.error('Update Stripe webhook failed:', error);
    },
  });
}

// Delete Stripe webhook
export function useDeleteStripeWebhook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (webhookId: string) => stripeApi.deleteWebhook(webhookId),
    onSuccess: () => {
      // Invalidate webhooks
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.webhooks() });
    },
    onError: (error: StripeError) => {
      console.error('Delete Stripe webhook failed:', error);
    },
  });
}

// Test Stripe webhook
export function useTestStripeWebhook() {
  return useMutation({
    mutationFn: (webhookId: string) => stripeApi.testWebhook(webhookId),
    onError: (error: StripeError) => {
      console.error('Test Stripe webhook failed:', error);
    },
  });
}

// Get Stripe events
export function useStripeEvents(filters?: any) {
  return useQuery({
    queryKey: queryKeys.stripe.events(filters || {}),
    queryFn: () => stripeApi.getEvents(filters),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get Stripe event by ID
export function useStripeEvent(eventId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.event(eventId),
    queryFn: () => stripeApi.getEvent(eventId),
    enabled: !!eventId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get Stripe logs
export function useStripeLogs(filters?: any) {
  return useQuery({
    queryKey: queryKeys.stripe.logs(filters || {}),
    queryFn: () => stripeApi.getLogs(filters),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get Stripe metrics
export function useStripeMetrics(filters?: any) {
  return useQuery({
    queryKey: queryKeys.stripe.metrics(filters || {}),
    queryFn: () => stripeApi.getMetrics(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
