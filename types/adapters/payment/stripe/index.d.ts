/**
     * Generated TypeScript definitions for Stripe Payment Processing
     * Generated from: adapters/payment/stripe/adapter.json
     */

/**
     * Parameters for the Stripe Payment Processing adapter
     */
export interface StripePaymentParams {
  /**
   * Default currency for payments
   */
  currency?: 'usd' | 'eur' | 'gbp' | 'cad' | 'aud' | 'jpy';
  /**
   * Stripe mode (test or live)
   */
  mode?: 'test' | 'live';
  /**
   * Enable webhook handling
   */
  webhooks?: boolean;
  /**
   * Enable Stripe Dashboard integration
   */
  dashboard?: boolean;
}

/**
     * Features for the Stripe Payment Processing adapter
     */
export interface StripePaymentFeatures {
  /**
   * Process single payments with Stripe Checkout and Payment Intents
   */
  'one-time-payments'?: boolean;
  /**
   * Handle recurring payments and subscription lifecycle
   */
  subscriptions?: boolean;
  /**
   * Multi-party payments for marketplace applications
   */
  marketplace?: boolean;
  /**
   * Generate and manage invoices automatically
   */
  invoicing?: boolean;
}