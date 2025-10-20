/**
 * Stripe Configuration - Next.js + Drizzle Connector
 * 
 * Extends base Stripe configuration with organization billing features.
 * Base Stripe configuration comes from the adapter.
 * This connector adds Next.js + Drizzle specific features like:
 * - Organization billing configuration
 * - Pricing plans (seat-based, usage-based)
 * - Additional seat pricing
 */

// Import base Stripe configuration from adapter
import { STRIPE_CONFIG as BASE_STRIPE_CONFIG } from '@/lib/payment/stripe';

// Re-export base config
export { STRIPE_CONFIG } from '@/lib/payment/stripe';

// Organization billing configuration (connector-specific)
export const ORGANIZATION_BILLING_CONFIG = {
  enabled: process.env.ENABLE_ORGANIZATION_BILLING === 'true',
  seatBasedPricing: process.env.ENABLE_SEAT_BILLING === 'true',
  usageBasedPricing: process.env.ENABLE_USAGE_BILLING === 'true',
  trialDays: 14,
  gracePeriodDays: 7,
};

// Pricing plans (connector-specific)
export const STRIPE_PLANS = {
  starter: {
    id: process.env.STRIPE_PRICE_STARTER_MONTHLY!,
    name: 'Starter',
    amount: 2900, // $29/month
    currency: BASE_STRIPE_CONFIG.currency,
    interval: 'month' as const,
    seats: 5,
    features: ['basic_ui', 'code_generation'],
  },
  pro: {
    id: process.env.STRIPE_PRICE_PRO_MONTHLY!,
    name: 'Pro',
    amount: 7900, // $79/month
    currency: BASE_STRIPE_CONFIG.currency,
    interval: 'month' as const,
    seats: 25,
    features: ['advanced_ui', 'code_generation', 'analytics'],
  },
  enterprise: {
    id: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY!,
    name: 'Enterprise',
    amount: 29900, // $299/month
    currency: BASE_STRIPE_CONFIG.currency,
    interval: 'month' as const,
    seats: -1, // Unlimited
    features: ['all_features', 'priority_support', 'dedicated_account_manager'],
  },
};

// Additional seat pricing (connector-specific)
export const ADDITIONAL_SEAT_PRICE = {
  id: process.env.STRIPE_PRICE_ADDITIONAL_SEAT_MONTHLY!,
  name: 'Additional Seat',
  amount: 500, // $5/seat/month
  currency: BASE_STRIPE_CONFIG.currency,
  interval: 'month' as const,
};

// Combined configuration for convenience
export const stripeConfig = {
  ...BASE_STRIPE_CONFIG,
  organizationBilling: ORGANIZATION_BILLING_CONFIG,
  plans: STRIPE_PLANS,
  additionalSeatPrice: ADDITIONAL_SEAT_PRICE,
};
