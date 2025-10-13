/**
 * Stripe Server-Side Client
 * 
 * Initializes the server-side Stripe client with proper configuration.
 * This is used by all API routes for Stripe operations.
 */

import Stripe from 'stripe';
import { STRIPE_CONFIG } from './config';

// Initialize Stripe with server-side secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  appInfo: {
    name: '<%= project.name %>',
    version: '1.0.0',
  },
});

// Stripe client configuration
export const stripeConfig = {
  ...STRIPE_CONFIG,
  // Server-side specific configuration
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  // Organization billing configuration
  organizationBilling: {
    enabled: process.env.ENABLE_ORGANIZATION_BILLING === 'true',
    seatBasedPricing: process.env.ENABLE_SEAT_BILLING === 'true',
    usageBasedPricing: process.env.ENABLE_USAGE_BILLING === 'true',
  },
  // Pricing configuration
  plans: {
    starter: {
      id: process.env.STRIPE_PRICE_STARTER_MONTHLY!,
      amount: 2900, // $29/month
      seats: 5,
      features: ['basic_ui', 'code_generation'],
    },
    pro: {
      id: process.env.STRIPE_PRICE_PRO_MONTHLY!,
      amount: 7900, // $79/month
      seats: 25,
      features: ['advanced_ui', 'code_generation', 'analytics'],
    },
    enterprise: {
      id: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY!,
      amount: 29900, // $299/month
      seats: -1, // Unlimited
      features: ['all_features', 'priority_support'],
    },
  },
  // Additional seat pricing
  additionalSeatPrice: {
    id: process.env.STRIPE_PRICE_ADDITIONAL_SEAT_MONTHLY!,
    amount: 500, // $5/seat/month
  },
};

// Export Stripe client for use in API routes
export default stripe;
