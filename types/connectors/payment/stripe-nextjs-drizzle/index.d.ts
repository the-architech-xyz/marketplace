/**
 * Stripe NextJS Drizzle Connector
 * 
 * Server-side API routes for Stripe payments with NextJS and Drizzle
 */

export interface ConnectorsPaymentStripeNextjsDrizzleParams {
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

export interface ConnectorsPaymentStripeNextjsDrizzleFeatures {

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
export declare const ConnectorsPaymentStripeNextjsDrizzleArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsPaymentStripeNextjsDrizzleCreates = typeof ConnectorsPaymentStripeNextjsDrizzleArtifacts.creates[number];
export type ConnectorsPaymentStripeNextjsDrizzleEnhances = typeof ConnectorsPaymentStripeNextjsDrizzleArtifacts.enhances[number];
