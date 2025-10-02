import { Blueprint } from '@thearchitech.xyz/types';

const paymentManagementNextjsShadcnBlueprint: Blueprint = {
  id: 'payment-management-nextjs-shadcn',
  name: 'Payment Management (Next.js + Shadcn)',
  description: 'Complete payment management system with Next.js and Shadcn/ui',
  version: '1.0.0',
  actions: [
    // Create Stripe payment form component (CONSUMES: stripe-nextjs hooks)
    {
      type: 'CREATE_FILE',
      path: 'src/components/payment/stripe-payment-form.tsx',
      template: 'templates/stripe-payment-form.tsx.tpl',
      condition: '{{#if feature.parameters.features.paymentForms}}'
    },
    // Create subscription card component
    {
      type: 'CREATE_FILE',
      path: 'src/components/payment/subscription-card.tsx',
      template: 'templates/subscription-card.tsx.tpl',
      condition: '{{#if feature.parameters.features.subscriptionCards}}'
    },
    // Create invoice table component
    {
      type: 'CREATE_FILE',
      path: 'src/components/payment/invoice-table.tsx',
      template: 'templates/invoice-table.tsx.tpl',
      condition: '{{#if feature.parameters.features.invoiceTables}}'
    },
    // Create pricing card component
    {
      type: 'CREATE_FILE',
      path: 'src/components/payment/pricing-card.tsx',
      template: 'templates/pricing-card.tsx.tpl',
      condition: '{{#if feature.parameters.features.pricingCards}}'
    },
    // Create payment dashboard
    {
      type: 'CREATE_FILE',
      path: 'src/components/payment/PaymentDashboard.tsx',
      template: 'templates/PaymentDashboard.tsx.tpl'
    },
    // Create billing page
    {
      type: 'CREATE_FILE',
      path: 'src/app/billing/page.tsx',
      template: 'templates/billing-page.tsx.tpl'
    },
    // Create subscription page
    {
      type: 'CREATE_FILE',
      path: 'src/app/subscription/page.tsx',
      template: 'templates/subscription-page.tsx.tpl'
    }
  ]
};

export default paymentManagementNextjsShadcnBlueprint;
