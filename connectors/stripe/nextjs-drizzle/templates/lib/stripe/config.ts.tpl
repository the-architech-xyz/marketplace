/**
 * Stripe Configuration
 * 
 * Centralized configuration for Stripe integration.
 * This file contains all Stripe-related configuration constants.
 */

export const STRIPE_CONFIG = {
  // API Configuration
  apiVersion: '2024-06-20' as const,
  
  // Environment Configuration
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  
  // Application URLs
  successUrl: process.env.APP_URL + '/payment/success',
  cancelUrl: process.env.APP_URL + '/payment/cancel',
  returnUrl: process.env.APP_URL + '/payment/return',
  
  // Currency and Locale
  currency: '<%= context.currency %>' || 'usd',
  locale: 'en',
  
  // Payment Configuration
  paymentMethods: ['card', 'bank_transfer'],
  captureMethod: 'automatic' as const,
  
  // Subscription Configuration
  subscriptionBehavior: 'default_incomplete' as const,
  paymentSettings: {
    saveDefaultPaymentMethod: 'on_subscription' as const,
  },
  
  // Webhook Configuration
  webhookTolerance: 300, // 5 minutes
  webhookEvents: [
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'customer.subscription.trial_will_end',
    'invoice.paid',
    'invoice.payment_failed',
    'invoice.payment_action_required',
    'invoice.finalized',
    'customer.updated',
    'customer.deleted',
    'payment_method.attached',
    'payment_method.detached',
    'charge.dispute.created',
  ],
  
  // Organization Billing Configuration
  organizationBilling: {
    enabled: process.env.ENABLE_ORGANIZATION_BILLING === 'true',
    seatBasedPricing: process.env.ENABLE_SEAT_BILLING === 'true',
    usageBasedPricing: process.env.ENABLE_USAGE_BILLING === 'true',
    trialDays: 14,
    gracePeriodDays: 7,
  },
  
  // Rate Limiting
  rateLimit: {
    enabled: true,
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
  },
  
  // Error Handling
  errorHandling: {
    logErrors: true,
    notifyOnError: process.env.NODE_ENV === 'production',
    retryAttempts: 3,
  },
};
