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
  webhooks?: boolean;

  /** Enable Stripe Dashboard integration */
  dashboard?: boolean;
}

export interface PaymentStripeFeatures {}

// 🚀 Auto-discovered artifacts
export declare const PaymentStripeArtifacts: {
  creates: [
    '{{paths.payment_config}}/stripe.ts',
    '{{paths.payment_config}}/client.ts',
    '{{paths.payment_config}}/INTEGRATION_GUIDE.md'
  ],
  enhances: [],
  installs: [
    { packages: ['stripe', '@stripe/stripe-js'], isDev: false }
  ],
  envVars: [
    { key: 'STRIPE_SECRET_KEY', value: 'sk_test_...', description: 'Stripe secret key for server-side operations' },
    { key: 'STRIPE_PUBLISHABLE_KEY', value: 'pk_test_...', description: 'Stripe publishable key for client-side operations' },
    { key: 'STRIPE_WEBHOOK_SECRET', value: 'whsec_...', description: 'Stripe webhook secret for webhook verification' },
    { key: 'STRIPE_BASIC_PRICE_ID', value: 'price_...', description: 'Stripe price ID for basic plan' },
    { key: 'STRIPE_PRO_PRICE_ID', value: 'price_...', description: 'Stripe price ID for pro plan' },
    { key: 'STRIPE_ENTERPRISE_PRICE_ID', value: 'price_...', description: 'Stripe price ID for enterprise plan' },
    { key: 'APP_URL', value: '{{env.APP_URL}}', description: 'Application URL for Stripe redirects' },
    { key: 'STRIPE_PUBLISHABLE_KEY', value: 'pk_test_...', description: 'Public Stripe publishable key for client-side' }
  ]
};

// Type-safe artifact access
export type PaymentStripeCreates = typeof PaymentStripeArtifacts.creates[number];
export type PaymentStripeEnhances = typeof PaymentStripeArtifacts.enhances[number];
