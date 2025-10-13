/**
 * Payments Backend (Stripe + NextJS)
 * 
 * Payment processing backend implementation using Stripe and NextJS
 */

export interface FeaturesPaymentsBackendStripeNextjsParams {

  /** Stripe webhook handlers for payment events */
  webhooks?: any;

  /** Stripe Checkout integration for payments */
  checkout?: any;

  /** Subscription management and billing */
  subscriptions?: any;

  /** Invoice generation and management */
  invoices?: any;

  /** Refund processing and management */
  refunds?: any;

  /** Payment methods management */
  paymentMethods?: any;

  /** Payment analytics and reporting */
  analytics?: any;

  /** Organization-level billing features */
  organizationBilling?: any;
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
