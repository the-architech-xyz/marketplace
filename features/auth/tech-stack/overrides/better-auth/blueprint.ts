/**
 * Better Auth SDK Override Blueprint
 * 
 * Replaces standard TanStack Query hooks with Better Auth SDK hooks
 * Same interface, Better Auth implementation
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '@thearchitech.xyz/marketplace/types';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/auth/tech-stack/overrides/better-auth'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install Better Auth dependencies
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['better-auth']
  });

  // Override hooks with Better Auth SDK
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/auth/hooks.ts',
    template: 'templates/hooks.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 2 // Higher than tech-stack default (priority: 1)
    }
  });

  // Better Auth client
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/auth/better-auth-client.ts',
    template: 'templates/client.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 2
    }
  });

  return actions;
}
