/**
 * RevenueCat Webhook Connector Blueprint
 * 
 * Generates Next.js API route for RevenueCat webhook handling.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/revenuecat-webhook'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Generate webhook API route - BACKEND API (resolves to apps.api.routes or apps.web.app/api)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}revenuecat/webhook/route.ts',
    template: 'templates/webhook-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  return actions;
}

