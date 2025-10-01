/**
 * Stripe Next.js Integration
 * 
 * Complete Next.js integration for Stripe with API routes, webhooks, and payment processing
 */

export interface StripeNextjsIntegrationParams {

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

  /** Next.js API routes for Stripe operations */
  apiRoutes: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const StripeNextjsIntegrationArtifacts: {
  creates: [
    'src/app/api/stripe/webhooks/route.ts',
    'src/app/api/stripe/create-payment-intent/route.ts',
    'src/app/api/stripe/create-subscription/route.ts',
    'src/app/api/stripe/create-portal-session/route.ts'
  ],
  enhances: [
    { path: 'src/lib/payment/stripe.ts' },
    { path: 'src/lib/payment/client.ts' }
  ],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type StripeNextjsIntegrationCreates = typeof StripeNextjsIntegrationArtifacts.creates[number];
export type StripeNextjsIntegrationEnhances = typeof StripeNextjsIntegrationArtifacts.enhances[number];
