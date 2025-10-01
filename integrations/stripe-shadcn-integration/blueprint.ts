import { Blueprint } from '@thearchitech.xyz/types';

const stripeShadcnIntegrationBlueprint: Blueprint = {
  id: 'stripe-shadcn-integration',
  name: 'Stripe Shadcn Integration',
  description: 'Complete Stripe integration with Shadcn/ui components for payments, subscriptions, and billing management',
  version: '2.0.0',
  actions: [
    // Create Stripe payment form component
    {
      type: 'CREATE_FILE',
      path: 'src/components/payment/stripe-payment-form.tsx',
      condition: '{{#if integration.features.paymentForms}}',
      template: 'templates/stripe-payment-form.tsx.tpl'
    },

    // Create subscription card component
    {
      type: 'CREATE_FILE',
      path: 'src/components/payment/subscription-card.tsx',
      condition: '{{#if integration.features.subscriptionCards}}',
      template: 'templates/subscription-card.tsx.tpl'
    },

    // Create invoice table component
    {
      type: 'CREATE_FILE',
      path: 'src/components/payment/invoice-table.tsx',
      condition: '{{#if integration.features.invoiceTables}}',
      template: 'templates/invoice-table.tsx.tpl'
    },

    // Create pricing card component
    {
      type: 'CREATE_FILE',
      path: 'src/components/payment/pricing-card.tsx',
      condition: '{{#if integration.features.pricingCards}}',
      template: 'templates/pricing-card.tsx.tpl'
    }
  ]
};

export const blueprint = stripeShadcnIntegrationBlueprint;
