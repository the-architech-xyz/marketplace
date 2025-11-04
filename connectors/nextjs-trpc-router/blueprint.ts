/**
 * Next.js tRPC Router Connector Blueprint
 * 
 * Generates tRPC router in the correct location based on project structure:
 * - Single app: src/server/trpc/router.ts
 * - Monorepo: packages/api/src/router.ts
 * 
 * Also generates the Next.js API route handler.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/nextjs-trpc-router'>
): BlueprintAction[] {
  // For now, assume single app structure
  // TODO: Add monorepo detection logic
  const isMonorepo = false;
  
  const actions: BlueprintAction[] = [];

  // Determine router location
  const routerPath = isMonorepo
    ? '${paths.api}/src/router.ts'
    : '${paths.server}/trpc/router.ts';

  // Generate tRPC router
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: routerPath,
    template: isMonorepo ? 'templates/monorepo-router.ts.tpl' : 'templates/router.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate Next.js API route handler
  const apiRoutePath = isMonorepo
    ? '${paths.web}/app/api/trpc/[trpc]/route.ts'
    : '${paths.app}/api/trpc/[trpc]/route.ts';

  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: apiRoutePath,
    template: 'templates/api-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  return actions;
}

