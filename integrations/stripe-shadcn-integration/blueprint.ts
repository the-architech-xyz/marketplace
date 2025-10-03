import { Blueprint } from '@thearchitech.xyz/types';

const stripeShadcnIntegrationBlueprint: Blueprint = {
  id: 'stripe-shadcn-integration',
  name: 'Stripe Shadcn Integration',
  description: 'Technical bridge connecting Stripe and Shadcn/ui - configures payment utilities and styling',
  version: '2.0.0',
  actions: [
    // Configure Tailwind for payment components
    {
      type: 'ENHANCE_FILE',
      path: 'tailwind.config.js',
      modifier: 'ts-module-enhancer',
      params: {
        wrapperFunction: 'withPaymentConfig',
        wrapperImport: {
          name: 'withPaymentConfig',
          from: './lib/payment/tailwind-config',
          isDefault: false
        },
        wrapperOptions: {
          paymentStyles: true,
          paymentUtilities: true
        }
      }
    },
    // Create payment-specific Tailwind configuration
    {
      type: 'CREATE_FILE',
      path: 'src/lib/payment/tailwind-config.ts',
      template: 'templates/tailwind-config.ts.tpl'
    },
    // Create payment utility functions
    {
      type: 'CREATE_FILE',
      path: 'src/lib/payment/utils.ts',
      template: 'templates/payment-utils.ts.tpl'
    },
    // Create payment component utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/payment/component-utils.ts',
      template: 'templates/component-utils.ts.tpl'
    },
    // Create payment styling constants
    {
      type: 'CREATE_FILE',
      path: 'src/lib/payment/styles.ts',
      template: 'templates/payment-styles.ts.tpl'
    }
  ]
};

export const blueprint = stripeShadcnIntegrationBlueprint;