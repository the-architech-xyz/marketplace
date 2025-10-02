/**
 * Payment Methods Hook
 * 
 * Standardized hook for managing payment methods
 * EXTERNAL API IDENTICAL ACROSS ALL PAYMENT PROVIDERS - Features work with ANY payment service!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { stripeApi } from '@/lib/stripe/api';
import type { PaymentMethod, StripeError } from '@/lib/stripe/types';

// Get payment methods
export function usePaymentMethods(customerId?: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethods({ customerId }),
    queryFn: () => stripeApi.getPaymentMethods(customerId),
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get payment method by ID
export function usePaymentMethod(paymentMethodId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethod(paymentMethodId),
    queryFn: () => stripeApi.getPaymentMethod(paymentMethodId),
    enabled: !!paymentMethodId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Attach payment method
export function useAttachPaymentMethod() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ paymentMethodId, customerId }: { paymentMethodId: string; customerId: string }) => 
      stripeApi.attachPaymentMethod(paymentMethodId, customerId),
    onSuccess: (paymentMethod: PaymentMethod) => {
      // Invalidate payment methods
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.paymentMethods() });
      
      // Update specific payment method in cache
      queryClient.setQueryData(
        queryKeys.stripe.paymentMethod(paymentMethod.id),
        paymentMethod
      );
    },
    onError: (error: StripeError) => {
      console.error('Attach payment method failed:', error);
    },
  });
}

// Detach payment method
export function useDetachPaymentMethod() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (paymentMethodId: string) => stripeApi.detachPaymentMethod(paymentMethodId),
    onSuccess: (_, paymentMethodId) => {
      // Remove payment method from cache
      queryClient.removeQueries({ queryKey: queryKeys.stripe.paymentMethod(paymentMethodId) });
      
      // Invalidate payment methods list
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.paymentMethods() });
    },
    onError: (error: StripeError) => {
      console.error('Detach payment method failed:', error);
    },
  });
}

// Update payment method
export function useUpdatePaymentMethod() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ paymentMethodId, updates }: { paymentMethodId: string; updates: any }) => 
      stripeApi.updatePaymentMethod(paymentMethodId, updates),
    onSuccess: (paymentMethod: PaymentMethod) => {
      // Update payment method in cache
      queryClient.setQueryData(
        queryKeys.stripe.paymentMethod(paymentMethod.id),
        paymentMethod
      );
      
      // Invalidate payment methods list
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.paymentMethods() });
    },
    onError: (error: StripeError) => {
      console.error('Update payment method failed:', error);
    },
  });
}

// Set default payment method
export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ customerId, paymentMethodId }: { customerId: string; paymentMethodId: string }) => 
      stripeApi.setDefaultPaymentMethod(customerId, paymentMethodId),
    onSuccess: (customer) => {
      // Invalidate customer and payment methods
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.customer(customer.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.paymentMethods() });
    },
    onError: (error: StripeError) => {
      console.error('Set default payment method failed:', error);
    },
  });
}

// Get payment method types
export function usePaymentMethodTypes() {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodTypes(),
    queryFn: () => stripeApi.getPaymentMethodTypes(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

// Get payment method configuration
export function usePaymentMethodConfiguration() {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodConfiguration(),
    queryFn: () => stripeApi.getPaymentMethodConfiguration(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get payment method statistics
export function usePaymentMethodStats(customerId?: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodStats({ customerId }),
    queryFn: () => stripeApi.getPaymentMethodStats(customerId),
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get payment method usage
export function usePaymentMethodUsage(paymentMethodId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodUsage(paymentMethodId),
    queryFn: () => stripeApi.getPaymentMethodUsage(paymentMethodId),
    enabled: !!paymentMethodId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get payment method transactions
export function usePaymentMethodTransactions(paymentMethodId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodTransactions(paymentMethodId),
    queryFn: () => stripeApi.getPaymentMethodTransactions(paymentMethodId),
    enabled: !!paymentMethodId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get payment method fraud data
export function usePaymentMethodFraudData(paymentMethodId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodFraudData(paymentMethodId),
    queryFn: () => stripeApi.getPaymentMethodFraudData(paymentMethodId),
    enabled: !!paymentMethodId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get payment method risk score
export function usePaymentMethodRiskScore(paymentMethodId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodRiskScore(paymentMethodId),
    queryFn: () => stripeApi.getPaymentMethodRiskScore(paymentMethodId),
    enabled: !!paymentMethodId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get payment method compliance
export function usePaymentMethodCompliance(paymentMethodId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodCompliance(paymentMethodId),
    queryFn: () => stripeApi.getPaymentMethodCompliance(paymentMethodId),
    enabled: !!paymentMethodId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get payment method verification
export function usePaymentMethodVerification(paymentMethodId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodVerification(paymentMethodId),
    queryFn: () => stripeApi.getPaymentMethodVerification(paymentMethodId),
    enabled: !!paymentMethodId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Verify payment method
export function useVerifyPaymentMethod() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ paymentMethodId, verificationData }: { paymentMethodId: string; verificationData: any }) => 
      stripeApi.verifyPaymentMethod(paymentMethodId, verificationData),
    onSuccess: (paymentMethod: PaymentMethod) => {
      // Update payment method in cache
      queryClient.setQueryData(
        queryKeys.stripe.paymentMethod(paymentMethod.id),
        paymentMethod
      );
      
      // Invalidate payment methods list
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.paymentMethods() });
    },
    onError: (error: StripeError) => {
      console.error('Verify payment method failed:', error);
    },
  });
}

// Get payment method disputes
export function usePaymentMethodDisputes(paymentMethodId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodDisputes(paymentMethodId),
    queryFn: () => stripeApi.getPaymentMethodDisputes(paymentMethodId),
    enabled: !!paymentMethodId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get payment method refunds
export function usePaymentMethodRefunds(paymentMethodId: string) {
  return useQuery({
    queryKey: queryKeys.stripe.paymentMethodRefunds(paymentMethodId),
    queryFn: () => stripeApi.getPaymentMethodRefunds(paymentMethodId),
    enabled: !!paymentMethodId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
