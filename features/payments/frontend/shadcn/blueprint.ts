/**
 * Payments Frontend Implementation: Shadcn/ui
 * 
 * Complete payment management system with Stripe integration, subscriptions, and billing
 * Uses template-based component generation for maintainability
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/payments/frontend/shadcn'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (features.subscriptions) {
    actions.push(...generateSubscriptionsActions());
  }
  
  if (features.invoicing) {
    actions.push(...generateInvoicingActions());
  }
  
  if (features.webhooks) {
    actions.push(...generateWebhooksActions());
  }
  
  if (features.analytics) {
    actions.push(...generateAnalyticsActions());
  }
  
  return actions;
}

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@stripe/stripe-js',
        '@stripe/react-stripe-js',
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'lucide-react',
        'date-fns'
      ]
    },

    // Core payment components (only existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PaymentForm.tsx',
      template: 'templates/PaymentForm.tsx.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/CheckoutForm.tsx',
      template: 'templates/CheckoutForm.tsx.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PaymentStatus.tsx',
      template: 'templates/PaymentStatus.tsx.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PaymentMethodSelector.tsx',
      template: 'templates/PaymentMethodSelector.tsx.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PricingCard.tsx',
      template: 'templates/PricingCard.tsx.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/RefundDialog.tsx',
      template: 'templates/RefundDialog.tsx.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Payment pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}payments/page.tsx',
      template: 'templates/payments-dashboard.tsx.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}checkout/page.tsx',
      template: 'templates/checkout-page.tsx.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Payment utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}payments/payment-types.ts',
      template: 'templates/payment-types.ts.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}payments/payment-utils.ts',
      template: 'templates/payment-utils.ts.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Payment hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}payments/use-payments.ts',
      template: 'templates/use-payments.ts.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

function generateSubscriptionsActions(): BlueprintAction[] {
  return [
    // Subscription components (existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/SubscriptionCard.tsx',
      template: 'templates/SubscriptionCard.tsx.tpl',
      context: { 
        features: ['subscriptions'],
        hasSubscriptions: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Subscription pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}subscriptions/page.tsx',
      template: 'templates/subscriptions-page.tsx.tpl',
      context: { 
        features: ['subscriptions'],
        hasSubscriptions: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Subscription hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}payments/use-subscriptions.ts',
      template: 'templates/use-subscriptions.ts.tpl',
      context: { 
        features: ['subscriptions'],
        hasSubscriptions: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

function generateInvoicingActions(): BlueprintAction[] {
  return [
    // Invoice components (existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/InvoiceCard.tsx',
      template: 'templates/InvoiceCard.tsx.tpl',
      context: { 
        features: ['invoicing'],
        hasInvoicing: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Invoice pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}invoices/page.tsx',
      template: 'templates/invoices-page.tsx.tpl',
      context: { 
        features: ['invoicing'],
        hasInvoicing: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Invoice hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}payments/use-invoices.ts',
      template: 'templates/use-invoices.ts.tpl',
      context: { 
        features: ['invoicing'],
        hasInvoicing: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

function generateWebhooksActions(): BlueprintAction[] {
  return [
    // Note: These templates don't exist yet, so we'll comment them out
    // TODO: Create these templates when webhooks feature is implemented
    /*
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/WebhookHandler.tsx',
      template: 'templates/WebhookHandler.tsx.tpl',
      context: { 
        features: ['webhooks'],
        hasWebhooks: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
    */
  ];
}

function generateAnalyticsActions(): BlueprintAction[] {
  return [
    // Analytics components (existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PaymentAnalytics.tsx',
      template: 'templates/PaymentAnalytics.tsx.tpl',
      context: { 
        features: ['analytics'],
        hasAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Transaction table
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/TransactionTable.tsx',
      template: 'templates/TransactionTable.tsx.tpl',
      context: { 
        features: ['analytics'],
        hasAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Transaction pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}transactions/page.tsx',
      template: 'templates/transactions-page.tsx.tpl',
      context: { 
        features: ['analytics'],
        hasAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}