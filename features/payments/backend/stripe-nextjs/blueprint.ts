import { BlueprintAction, BlueprintActionType, ModifierType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Create the main PaymentService that implements IPaymentService
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}services/PaymentService.ts',
      template: 'templates/PaymentService.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create Stripe API client
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.payment_config}}api.ts',
      template: 'templates/stripe-api.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create Stripe types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.payment_config}}types.ts',
      template: 'templates/stripe-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create API routes for payment intents
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api_routes}}payments/create-payment-intent/route.ts',
      template: 'templates/create-payment-intent-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create API routes for subscriptions
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api_routes}}subscriptions/create/route.ts',
      template: 'templates/create-subscription-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create API routes for portal sessions
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api_routes}}payments/create-portal-session/route.ts',
      template: 'templates/create-portal-session-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    
    // Create webhooks route
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api_routes}}webhooks/stripe/route.ts',
      template: 'templates/webhooks-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}