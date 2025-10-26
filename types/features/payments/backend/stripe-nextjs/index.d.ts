/**
 * Payments Backend (Stripe + Next.js)
 * 
 * Complete payments backend with Stripe integration for Next.js, including organization billing, subscriptions, and usage tracking
 */

export interface FeaturesPaymentsBackendStripeNextjsParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable organization-level billing features */
    organizationBilling?: boolean;

    /** Enable seat-based billing */
    seats?: boolean;

    /** Enable usage-based billing */
    usage?: boolean;

    /** Enable Stripe webhook handling */
    webhooks?: boolean;

    /** Enable seat-based billing */
    seatManagement?: boolean;

    /** Enable usage-based billing tracking */
    usageTracking?: boolean;
  };
}

export interface FeaturesPaymentsBackendStripeNextjsFeatures {

  /** Enable organization-level billing features */
  organizationBilling: boolean;

  /** Enable seat-based billing */
  seats: boolean;

  /** Enable usage-based billing */
  usage: boolean;

  /** Enable Stripe webhook handling */
  webhooks: boolean;

  /** Enable seat-based billing */
  seatManagement: boolean;

  /** Enable usage-based billing tracking */
  usageTracking: boolean;
}

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
