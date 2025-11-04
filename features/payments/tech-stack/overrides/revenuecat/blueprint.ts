/**
 * RevenueCat SDK Override Blueprint
 * 
 * Replaces standard TanStack Query hooks with RevenueCat SDK hooks
 * Same interface, RevenueCat implementation
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/payments/tech-stack/overrides/revenuecat'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install RevenueCat dependencies
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['@revenuecat/purchases-react-native']
  });

  // Override hooks with RevenueCat SDK
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/payments/hooks.ts',
    template: 'templates/hooks.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 2 // Higher than tech-stack default (priority: 1)
    }
  });

  // RevenueCat client
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/payments/revenuecat-client.ts',
    template: 'templates/client.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 2
    }
  });

  return actions;
}