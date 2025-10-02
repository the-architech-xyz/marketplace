/**
 * Create Payment Hook
 * 
 * Standardized hook for creating payments
 * EXTERNAL API IDENTICAL ACROSS ALL PAYMENT PROVIDERS - Features work with ANY payment service!
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { stripeApi } from '@/lib/stripe/api';
import type { CreatePaymentData, PaymentIntent, StripeError } from '@/lib/stripe/types';

// Create payment intent
export function useCreatePaymentIntent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePaymentData) => stripeApi.createPaymentIntent(data),
    onSuccess: (paymentIntent: PaymentIntent) => {
      // Invalidate payment intents
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.paymentIntents() });
      
      // Add the new payment intent to cache
      queryClient.setQueryData(
        queryKeys.stripe.paymentIntent(paymentIntent.id),
        paymentIntent
      );
    },
    onError: (error: StripeError) => {
      console.error('Create payment intent failed:', error);
    },
  });
}

// Create payment method
export function useCreatePaymentMethod() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createPaymentMethod(data),
    onSuccess: (paymentMethod) => {
      // Invalidate payment methods
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.paymentMethods() });
    },
    onError: (error: StripeError) => {
      console.error('Create payment method failed:', error);
    },
  });
}

// Create setup intent
export function useCreateSetupIntent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createSetupIntent(data),
    onSuccess: (setupIntent) => {
      // Invalidate setup intents
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.setupIntents() });
    },
    onError: (error: StripeError) => {
      console.error('Create setup intent failed:', error);
    },
  });
}

// Create checkout session
export function useCreateCheckoutSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createCheckoutSession(data),
    onSuccess: (session) => {
      // Invalidate checkout sessions
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.checkoutSessions() });
    },
    onError: (error: StripeError) => {
      console.error('Create checkout session failed:', error);
    },
  });
}

// Create payment link
export function useCreatePaymentLink() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createPaymentLink(data),
    onSuccess: (paymentLink) => {
      // Invalidate payment links
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.paymentLinks() });
    },
    onError: (error: StripeError) => {
      console.error('Create payment link failed:', error);
    },
  });
}

// Create refund
export function useCreateRefund() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createRefund(data),
    onSuccess: (refund) => {
      // Invalidate refunds
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.refunds() });
      
      // Invalidate payment intents to refresh status
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.paymentIntents() });
    },
    onError: (error: StripeError) => {
      console.error('Create refund failed:', error);
    },
  });
}

// Create dispute
export function useCreateDispute() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createDispute(data),
    onSuccess: (dispute) => {
      // Invalidate disputes
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.disputes() });
    },
    onError: (error: StripeError) => {
      console.error('Create dispute failed:', error);
    },
  });
}

// Create invoice
export function useCreateInvoice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createInvoice(data),
    onSuccess: (invoice) => {
      // Invalidate invoices
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.invoices() });
    },
    onError: (error: StripeError) => {
      console.error('Create invoice failed:', error);
    },
  });
}

// Create invoice item
export function useCreateInvoiceItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createInvoiceItem(data),
    onSuccess: (invoiceItem) => {
      // Invalidate invoice items
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.invoiceItems() });
    },
    onError: (error: StripeError) => {
      console.error('Create invoice item failed:', error);
    },
  });
}

// Create tax rate
export function useCreateTaxRate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createTaxRate(data),
    onSuccess: (taxRate) => {
      // Invalidate tax rates
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.taxRates() });
    },
    onError: (error: StripeError) => {
      console.error('Create tax rate failed:', error);
    },
  });
}

// Create coupon
export function useCreateCoupon() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createCoupon(data),
    onSuccess: (coupon) => {
      // Invalidate coupons
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.coupons() });
    },
    onError: (error: StripeError) => {
      console.error('Create coupon failed:', error);
    },
  });
}

// Create promotion code
export function useCreatePromotionCode() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createPromotionCode(data),
    onSuccess: (promotionCode) => {
      // Invalidate promotion codes
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.promotionCodes() });
    },
    onError: (error: StripeError) => {
      console.error('Create promotion code failed:', error);
    },
  });
}

// Create price
export function useCreatePrice() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createPrice(data),
    onSuccess: (price) => {
      // Invalidate prices
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.prices() });
    },
    onError: (error: StripeError) => {
      console.error('Create price failed:', error);
    },
  });
}

// Create product
export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createProduct(data),
    onSuccess: (product) => {
      // Invalidate products
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.products() });
    },
    onError: (error: StripeError) => {
      console.error('Create product failed:', error);
    },
  });
}

// Create subscription
export function useCreateSubscription() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createSubscription(data),
    onSuccess: (subscription) => {
      // Invalidate subscriptions
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.subscriptions() });
    },
    onError: (error: StripeError) => {
      console.error('Create subscription failed:', error);
    },
  });
}

// Create subscription item
export function useCreateSubscriptionItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createSubscriptionItem(data),
    onSuccess: (subscriptionItem) => {
      // Invalidate subscription items
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.subscriptionItems() });
    },
    onError: (error: StripeError) => {
      console.error('Create subscription item failed:', error);
    },
  });
}

// Create customer
export function useCreateCustomer() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createCustomer(data),
    onSuccess: (customer) => {
      // Invalidate customers
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.customers() });
    },
    onError: (error: StripeError) => {
      console.error('Create customer failed:', error);
    },
  });
}

// Create customer portal session
export function useCreateCustomerPortalSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => stripeApi.createCustomerPortalSession(data),
    onSuccess: (session) => {
      // Invalidate customer portal sessions
      queryClient.invalidateQueries({ queryKey: queryKeys.stripe.customerPortalSessions() });
    },
    onError: (error: StripeError) => {
      console.error('Create customer portal session failed:', error);
    },
  });
}
