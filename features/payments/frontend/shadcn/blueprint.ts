import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const blueprint: Blueprint = {
  id: 'feature:payments/shadcn',
  name: 'Payments Feature (Shadcn)',
  description: 'Complete payment processing solution with beautiful UI using Shadcn components and cohesive PaymentService',
  version: '2.0.0',
  actions: [
    // Payment Pages - Updated to use PaymentService
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/payments/page.tsx',
      template: 'templates/payments-dashboard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/payments/checkout/page.tsx',
      template: 'templates/checkout-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/payments/invoices/page.tsx',
      template: 'templates/invoices-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/payments/subscriptions/page.tsx',
      template: 'templates/subscriptions-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/payments/transactions/page.tsx',
      template: 'templates/transactions-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Payment Components - Updated to use PaymentService
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PaymentForm.tsx',
      template: 'templates/PaymentForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PaymentMethodSelector.tsx',
      template: 'templates/PaymentMethodSelector.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/CheckoutForm.tsx',
      template: 'templates/CheckoutForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/InvoiceCard.tsx',
      template: 'templates/InvoiceCard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/SubscriptionCard.tsx',
      template: 'templates/SubscriptionCard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/TransactionTable.tsx',
      template: 'templates/TransactionTable.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PaymentStatus.tsx',
      template: 'templates/PaymentStatus.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PricingCard.tsx',
      template: 'templates/PricingCard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/PaymentAnalytics.tsx',
      template: 'templates/PaymentAnalytics.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}payments/RefundDialog.tsx',
      template: 'templates/RefundDialog.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Payment Hooks - Updated to use PaymentService
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-payments.ts',
      template: 'templates/use-payments.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-subscriptions.ts',
      template: 'templates/use-subscriptions.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-invoices.ts',
      template: 'templates/use-invoices.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Payment Types and Utils
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.payment_config}}types.ts',
      template: 'templates/payment-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.payment_config}}utils.ts',
      template: 'templates/payment-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};