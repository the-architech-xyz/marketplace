/**
 * Payments Backend (Stripe + NextJS)
 * 
 * Payment processing backend implementation using Stripe and NextJS
 */

export interface FeaturesPaymentsBackendStripeNextjsParams {

  /** Stripe webhook handlers for payment events */
  webhooks: boolean;

  /** Stripe Checkout integration for payments */
  checkout: boolean;

  /** Subscription management and billing */
  subscriptions: boolean;

  /** Invoice generation and management */
  invoices: boolean;

  /** Refund processing and management */
  refunds: boolean;
}

export interface FeaturesPaymentsBackendStripeNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesPaymentsBackendStripeNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesPaymentsBackendStripeNextjsCreates = typeof FeaturesPaymentsBackendStripeNextjsArtifacts.creates[number];
export type FeaturesPaymentsBackendStripeNextjsEnhances = typeof FeaturesPaymentsBackendStripeNextjsArtifacts.enhances[number];
