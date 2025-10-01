/**
 * Stripe Shadcn Integration
 * 
 * Complete Stripe integration with Shadcn/ui components for payments, subscriptions, and billing management
 */

export interface StripeShadcnIntegrationParams {

  /** One-time payment forms and processing */
  basicPayments: boolean;

  /** Recurring subscription management and billing */
  subscriptions: boolean;

  /** Invoice generation, management, and display */
  invoicing: boolean;

  /** Pricing display and comparison components */
  pricing: boolean;

  /** Payment method management and selection */
  paymentMethods: boolean;

  /** Transaction and billing history display */
  billingHistory: boolean;

  /** Advanced subscription management interface */
  subscriptionManagement: boolean;

  /** Stripe webhook handling and processing */
  webhooks: boolean;

  /** Coupon and discount code management */
  coupons: boolean;

  /** Tax calculation and management */
  taxes: boolean;

  /** Refund processing and management */
  refunds: boolean;

  /** Payment and subscription analytics */
  analytics: boolean;

  /** Test payment processing and validation */
  testing: boolean;

  /** Support for multiple currencies */
  multiCurrency: boolean;

  /** Mobile-optimized payment components */
  mobilePayments: boolean;

  /** WCAG AA compliant payment components */
  accessibility: boolean;

  /** Custom theming and branding support */
  theming: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const StripeShadcnIntegrationArtifacts: {
  creates: [
    'src/components/payment/stripe-payment-form.tsx',
    'src/components/payment/subscription-card.tsx',
    'src/components/payment/invoice-table.tsx',
    'src/components/payment/pricing-card.tsx'
  ],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type StripeShadcnIntegrationCreates = typeof StripeShadcnIntegrationArtifacts.creates[number];
export type StripeShadcnIntegrationEnhances = typeof StripeShadcnIntegrationArtifacts.enhances[number];
