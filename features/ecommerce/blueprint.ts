import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const ecommerceCoreBlueprint: Blueprint = {
  id: 'ecommerce-core',
  name: 'E-commerce Core',
  description: 'Complete e-commerce business logic - 100% UI agnostic, works with any UI library',
  version: '1.0.0',
  actions: [
    // Products Management (HEADLESS!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/products/use-products.ts',
      template: 'templates/use-products.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/products/use-product-categories.ts',
      template: 'templates/use-product-categories.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/products/use-product-search.ts',
      template: 'templates/use-product-search.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/products/use-product-reviews.ts',
      template: 'templates/use-product-reviews.ts.tpl'
    },
    
    // Shopping Cart (HEADLESS!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/cart/use-cart.ts',
      template: 'templates/use-cart.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/cart/use-cart-items.ts',
      template: 'templates/use-cart-items.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/cart/use-cart-calculations.ts',
      template: 'templates/use-cart-calculations.ts.tpl'
    },
    
    // Orders Management (HEADLESS!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/orders/use-orders.ts',
      template: 'templates/use-orders.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/orders/use-order-tracking.ts',
      template: 'templates/use-order-tracking.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/orders/use-order-history.ts',
      template: 'templates/use-order-history.ts.tpl'
    },
    
    // Checkout Process (HEADLESS!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/checkout/use-checkout.ts',
      template: 'templates/use-checkout.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/checkout/use-shipping.ts',
      template: 'templates/use-shipping.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/checkout/use-payment.ts',
      template: 'templates/use-payment.ts.tpl'
    },
    
    // Customer Management (HEADLESS!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/customers/use-customers.ts',
      template: 'templates/use-customers.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/customers/use-customer-profiles.ts',
      template: 'templates/use-customer-profiles.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/customers/use-customer-addresses.ts',
      template: 'templates/use-customer-addresses.ts.tpl'
    },
    
    // Inventory Management (HEADLESS!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/inventory/use-inventory.ts',
      template: 'templates/use-inventory.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/inventory/use-stock-levels.ts',
      template: 'templates/use-stock-levels.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/inventory/use-inventory-alerts.ts',
      template: 'templates/use-inventory-alerts.ts.tpl'
    },
    
    // Analytics & Reporting (HEADLESS!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/analytics/use-sales-analytics.ts',
      template: 'templates/use-sales-analytics.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/analytics/use-customer-analytics.ts',
      template: 'templates/use-customer-analytics.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/analytics/use-product-analytics.ts',
      template: 'templates/use-product-analytics.ts.tpl'
    },
    
    // API Service Layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/ecommerce/api.ts',
      template: 'templates/ecommerce-api.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/ecommerce/types.ts',
      template: 'templates/ecommerce-types.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/ecommerce/utils.ts',
      template: 'templates/ecommerce-utils.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/ecommerce/validation.ts',
      template: 'templates/ecommerce-validation.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/ecommerce/constants.ts',
      template: 'templates/ecommerce-constants.ts.tpl'
    }
  ]
};

export default ecommerceCoreBlueprint;
