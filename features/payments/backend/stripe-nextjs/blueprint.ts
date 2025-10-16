import { BlueprintAction, BlueprintActionType, ModifierType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/payments/backend/stripe-nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // Create Stripe API client (pure server-side functions)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}payments/backend/stripe-nextjs/stripe-api.ts',
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