/**
 * Payments Frontend Implementation: Shadcn/ui
 * 
 * Complete payment management system with Stripe integration, subscriptions, and billing
 * Uses UI marketplace templates via convention-based loading (`ui/...` prefix)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

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
        'lucide-react',
        'date-fns',
        'framer-motion'
      ]
    },

    // Core payment components (only existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}payments/PaymentForm.tsx',
      template: 'ui/payments/PaymentForm.tsx.tpl',
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
      path: '${paths.apps.web.components}payments/CheckoutForm.tsx',
      template: 'ui/payments/CheckoutForm.tsx.tpl',
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
      path: '${paths.apps.web.components}payments/PaymentStatus.tsx',
      template: 'ui/payments/PaymentStatus.tsx.tpl',
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
      path: '${paths.apps.web.components}payments/PaymentMethodSelector.tsx',
      template: 'ui/payments/PaymentMethodSelector.tsx.tpl',
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
      path: '${paths.apps.web.components}payments/PricingCard.tsx',
      template: 'ui/payments/PricingCard.tsx.tpl',
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
      path: '${paths.apps.web.components}payments/RefundDialog.tsx',
      template: 'ui/payments/RefundDialog.tsx.tpl',
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Payment pages - Shared Routes (auto-generates wrappers for web + mobile)
    // NOTE: PaymentsPage.tsx.tpl doesn't exist yet in UI marketplaces
    // TODO: Create PaymentsPage.tsx.tpl in marketplace-tamagui and marketplace-shadcn
    // Temporarily commented out until template is created
    /*
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}routes/payments/PaymentsPage.tsx',
      template: 'ui/payments/PaymentsPage.tsx.tpl',
      sharedRoutes: {
        enabled: true,
        routePath: 'payments',
        componentName: 'PaymentsPage'
      },
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    */

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}routes/payments/CheckoutPage.tsx',
      template: 'ui/payments/CheckoutPage.tsx.tpl',
      sharedRoutes: {
        enabled: true,
        routePath: 'checkout',
        componentName: 'CheckoutPage'
      },
      context: { 
        features: ['core'],
        hasPaymentForms: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },


    // Payment Utils - Using core marketplace template (not UI-specific) - utilities are framework-agnostic
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}payments/payment-utils.ts',
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

    // Payment hooks are now generated by tech-stack layer
    // Removed duplicate hook generation to avoid conflicts

    // Analytics components (always generate - used by dashboard)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}payments/PaymentAnalytics.tsx',
      template: 'ui/payments/PaymentAnalytics.tsx.tpl',
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
      path: '${paths.apps.web.components}payments/TransactionTable.tsx',
      template: 'ui/payments/TransactionTable.tsx.tpl',
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
      path: '${paths.apps.web.components}payments/SubscriptionCard.tsx',
      template: 'ui/payments/SubscriptionCard.tsx.tpl',
      context: { 
        features: ['subscriptions'],
        hasSubscriptions: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Subscription pages - Shared Routes (auto-generates wrappers for web + mobile)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}routes/payments/SubscriptionsPage.tsx',
      template: 'ui/payments/SubscriptionsPage.tsx.tpl',
      sharedRoutes: {
        enabled: true,
        routePath: 'subscriptions',
        componentName: 'SubscriptionsPage'
      },
      context: { 
        features: ['subscriptions'],
        hasSubscriptions: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Subscription hooks are now generated by tech-stack layer
    // Removed duplicate hook generation to avoid conflicts
  ];
}

function generateInvoicingActions(): BlueprintAction[] {
  return [
    // Invoice components (existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}payments/InvoiceCard.tsx',
      template: 'ui/payments/InvoiceCard.tsx.tpl',
      context: { 
        features: ['invoicing'],
        hasInvoicing: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Invoice pages - Shared Routes (auto-generates wrappers for web + mobile)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}routes/payments/InvoicesPage.tsx',
      template: 'ui/payments/InvoicesPage.tsx.tpl',
      sharedRoutes: {
        enabled: true,
        routePath: 'invoices',
        componentName: 'InvoicesPage'
      },
      context: { 
        features: ['invoicing'],
        hasInvoicing: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Invoice hooks are now generated by tech-stack layer
    // Removed duplicate hook generation to avoid conflicts
  ];
}

function generateWebhooksActions(): BlueprintAction[] {
  return [
    // Note: These templates don't exist yet, so we'll comment them out
    // TODO: Create these templates when webhooks feature is implemented
    /*
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}payments/WebhookHandler.tsx',
      template: 'ui/payments/WebhookHandler.tsx.tpl',
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
    // Transaction pages - Shared Routes (auto-generates wrappers for web + mobile)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}routes/payments/TransactionsPage.tsx',
      template: 'ui/payments/TransactionsPage.tsx.tpl',
      sharedRoutes: {
        enabled: true,
        routePath: 'transactions',
        componentName: 'TransactionsPage'
      },
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