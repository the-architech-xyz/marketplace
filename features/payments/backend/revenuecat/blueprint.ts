/**
 * RevenueCat Backend Connector Blueprint
 * 
 * Minimal webhook handler that syncs RevenueCat subscription data
 * to the standardized payment infrastructure, enabling seamless integration
 * with auth, emailing, and analytics capabilities.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'payments/backend/revenuecat'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Generate webhook route handler
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.api.root}/revenuecat/webhook/route.ts',
    template: 'templates/webhook-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate webhook processor (syncs to database)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}revenuecat/webhook-processor.ts',
    template: 'templates/webhook-processor.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate user mapping utility
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}revenuecat/user-mapper.ts',
    template: 'templates/user-mapper.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  return actions;
}

