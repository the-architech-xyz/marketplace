/**
 * Stripe Payment Processing Blueprint - Schema-Driven Version
 * 
 * Sets up complete Stripe integration for payments and subscriptions
 * Creates payment components, API routes, and webhook handling
 */

import { defineBlueprint, type BlueprintSchema } from '@thearchitech.xyz/types';

// Define schema for the Stripe blueprint
const schema: BlueprintSchema = {
  parameters: {
    webhookEndpoint: {
      type: 'string',
      default: '/api/payment/webhook',
      description: 'Endpoint path for Stripe webhooks'
    },
    environment: {
      type: 'string',
      enum: ['test', 'production'] as const,
      default: 'test',
      description: 'Stripe environment to use'
    },
    appUrl: {
      type: 'string',
      default: 'http://localhost:3000',
      description: 'Application URL for Stripe redirects'
    }
  },
  features: {
    subscriptions: {
      type: 'boolean',
      default: true,
      description: 'Enable subscription payment support'
    },
    oneTimePayments: {
      type: 'boolean',
      default: true,
      description: 'Enable one-time payment support'
    },
    webhooks: {
      type: 'boolean',
      default: true,
      description: 'Enable webhook handling'
    },
    customerPortal: {
      type: 'boolean',
      default: false,
      description: 'Enable Stripe Customer Portal integration'
    }
  }
};

// Create the schema-driven blueprint
export const blueprint = defineBlueprint({
  id: 'stripe-payment-setup',
  name: 'Stripe Payment Processing Setup',
  description: 'Complete Stripe integration for payments and subscriptions with TypeScript support',
  schema,
  actions: (params) => [
    // Install required packages
    {
      type: 'INSTALL_PACKAGES',
      packages: ['stripe', '@stripe/stripe-js']
    },
    // Add development scripts
    {
      type: 'ADD_SCRIPT',
      name: 'stripe:listen',
      command: `stripe listen --forward-to ${params.appUrl}${params.webhookEndpoint}`
    },
    {
      type: 'ADD_SCRIPT',
      name: 'stripe:test',
      command: 'stripe trigger payment_intent.succeeded'
    },
    // Create core Stripe files
    {
      type: 'CREATE_FILE',
      path: '{{paths.payment_config}}/stripe.ts',
      template: 'adapters/payment/stripe/templates/stripe.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: '{{paths.payment_config}}/client.ts',
      template: 'adapters/payment/stripe/templates/client.ts.tpl'
    },
    // Add environment variables
    {
      type: 'ADD_ENV_VAR',
      key: 'STRIPE_SECRET_KEY',
      value: params.environment === 'test' ? 'sk_test_...' : 'sk_live_...',
      description: 'Stripe secret key for server-side operations'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'STRIPE_PUBLISHABLE_KEY',
      value: params.environment === 'test' ? 'pk_test_...' : 'pk_live_...',
      description: 'Stripe publishable key for client-side operations'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'STRIPE_WEBHOOK_SECRET',
      value: 'whsec_...',
      description: 'Stripe webhook secret for webhook verification'
    },
    // Add subscription-specific environment variables if enabled
    ...(params.subscriptions ? [
      {
        type: 'ADD_ENV_VAR' as const,
        key: 'STRIPE_BASIC_PRICE_ID',
        value: 'price_...',
        description: 'Stripe price ID for basic plan'
      },
      {
        type: 'ADD_ENV_VAR' as const,
        key: 'STRIPE_PRO_PRICE_ID',
        value: 'price_...',
        description: 'Stripe price ID for pro plan'
      },
      {
        type: 'ADD_ENV_VAR' as const,
        key: 'STRIPE_ENTERPRISE_PRICE_ID',
        value: 'price_...',
        description: 'Stripe price ID for enterprise plan'
      }
    ] : []),
    // Add application URL for redirects
    {
      type: 'ADD_ENV_VAR',
      key: 'APP_URL',
      value: params.appUrl,
      description: 'Application URL for Stripe redirects'
    },
    // Add customer portal configuration if enabled
    ...(params.customerPortal ? [
      {
        type: 'ADD_ENV_VAR' as const,
        key: 'STRIPE_CUSTOMER_PORTAL_URL',
        value: 'https://billing.stripe.com/p/login/...',
        description: 'Stripe Customer Portal URL'
      }
    ] : []),
    // Add integration guide
    {
      type: 'CREATE_FILE',
      path: '{{paths.payment_config}}/INTEGRATION_GUIDE.md',
      template: 'adapters/payment/stripe/templates/INTEGRATION_GUIDE.md.tpl'
    }
  ]
});