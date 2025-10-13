/**
 * Stripe NextJS Drizzle Connector
 * 
 * Server-side API routes for Stripe payments with NextJS and Drizzle
 */

export interface ConnectorsStripeNextjsDrizzleParams {
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

export interface ConnectorsStripeNextjsDrizzleFeatures {

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
export declare const ConnectorsStripeNextjsDrizzleArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsStripeNextjsDrizzleCreates = typeof ConnectorsStripeNextjsDrizzleArtifacts.creates[number];
export type ConnectorsStripeNextjsDrizzleEnhances = typeof ConnectorsStripeNextjsDrizzleArtifacts.enhances[number];
