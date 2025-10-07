/**
 * Stripe Payment Processing Blueprint
 * 
 * Sets up complete Stripe integration for payments and subscriptions
 * Creates payment components, API routes, and webhook handling
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const stripeBlueprint: Blueprint = {
  id: 'stripe-payment-setup',
  name: 'Stripe Payment Processing Setup',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['stripe', '@stripe/stripe-js']
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'stripe:listen',
      command: 'stripe listen --forward-to {{env.APP_URL}}/api/payment/webhook'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'stripe:test',
      command: 'stripe trigger payment_intent.succeeded'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.payment_config}}/stripe.ts',
      template: 'templates/stripe.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.payment_config}}/client.ts',
      template: 'templates/client.ts.tpl'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'STRIPE_SECRET_KEY',
      value: 'sk_test_...',
      description: 'Stripe secret key for server-side operations'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'STRIPE_PUBLISHABLE_KEY',
      value: 'pk_test_...',
      description: 'Stripe publishable key for client-side operations'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'STRIPE_WEBHOOK_SECRET',
      value: 'whsec_...',
      description: 'Stripe webhook secret for webhook verification'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'STRIPE_BASIC_PRICE_ID',
      value: 'price_...',
      description: 'Stripe price ID for basic plan'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'STRIPE_PRO_PRICE_ID',
      value: 'price_...',
      description: 'Stripe price ID for pro plan'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'STRIPE_ENTERPRISE_PRICE_ID',
      value: 'price_...',
      description: 'Stripe price ID for enterprise plan'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'APP_URL',
      value: '{{env.APP_URL}}',
      description: 'Application URL for Stripe redirects'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'STRIPE_PUBLISHABLE_KEY',
      value: 'pk_test_...',
      description: 'Public Stripe publishable key for client-side'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.payment_config}}/webhook-verification.ts',
      template: 'templates/webhook-verification.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api_routes}}/payment/webhook/route.ts',
      template: 'templates/webhook-route.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.payment_config}}/INTEGRATION_GUIDE.md',
      template: 'templates/INTEGRATION_GUIDE.md.tpl'
    }
  ]
};
