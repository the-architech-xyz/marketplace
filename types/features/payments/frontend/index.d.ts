/**
 * Payments Frontend (Shadcn)
 * 
 * Payment processing UI using Shadcn components
 */

export interface FeaturesPaymentsFrontendParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential payment functionality (forms, checkout, transactions) */
    core?: boolean;

    /** Enable checkout UI components */
    checkout?: boolean;

    /** Subscription management and billing */
    subscriptions?: boolean;

    /** Invoice generation and management */
    invoices?: boolean;

    /** Payment methods management UI */
    paymentMethods?: boolean;

    /** Billing portal UI */
    billingPortal?: boolean;

    /** Invoice generation and management */
    invoicing?: boolean;

    /** Payment webhook handling */
    webhooks?: boolean;

    /** Payment analytics and reporting */
    analytics?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesPaymentsFrontendFeatures {

  /** Essential payment functionality (forms, checkout, transactions) */
  core: boolean;

  /** Enable checkout UI components */
  checkout: boolean;

  /** Subscription management and billing */
  subscriptions: boolean;

  /** Invoice generation and management */
  invoices: boolean;

  /** Payment methods management UI */
  paymentMethods: boolean;

  /** Billing portal UI */
  billingPortal: boolean;

  /** Invoice generation and management */
  invoicing: boolean;

  /** Payment webhook handling */
  webhooks: boolean;

  /** Payment analytics and reporting */
  analytics: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesPaymentsFrontendArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesPaymentsFrontendCreates = typeof FeaturesPaymentsFrontendArtifacts.creates[number];
export type FeaturesPaymentsFrontendEnhances = typeof FeaturesPaymentsFrontendArtifacts.enhances[number];
