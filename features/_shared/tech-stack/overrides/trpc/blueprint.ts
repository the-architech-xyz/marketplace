/**
 * Shared tRPC Override Blueprint
 * 
 * Dynamically generates tRPC hooks for any feature
 * Replaces TanStack Query hooks with tRPC hooks
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '@thearchitech.xyz/marketplace/types';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/_shared/tech-stack/overrides/trpc'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install tRPC dependencies
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: [
      '@trpc/client',
      '@trpc/server',
      '@trpc/react-query'
    ]
  });

  // Generate tRPC hooks for each feature
  const features = ['payments', 'auth', 'emailing', 'ai-chat', 'teams-management'];
  
  for (const feature of features) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: `\${paths.lib}/${feature}/hooks.ts`,
      template: 'templates/hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2 // Higher than tech-stack default (priority: 1)
      },
      context: {
        feature,
        routerPath: config.parameters?.routerPath || '${paths.lib}/trpc/router.ts'
      }
    });
  }

  return actions;
}