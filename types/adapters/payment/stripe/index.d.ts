/**
 * Stripe Payment Processing
 * 
 * Complete payment processing with Stripe including subscriptions and one-time payments
 */

export interface PaymentStripeParams {

  /** Default currency for payments */
  currency?: any;

  /** Stripe mode (test or live) */
  mode?: any;

  /** Enable webhook handling */
  webhooks?: any;

  /** Enable Stripe Dashboard integration */
  dashboard?: any;
}

export interface PaymentStripeFeatures {}

// 🚀 Auto-discovered artifacts
export declare const PaymentStripeArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type PaymentStripeCreates = typeof PaymentStripeArtifacts.creates[number];
export type PaymentStripeEnhances = typeof PaymentStripeArtifacts.enhances[number];
