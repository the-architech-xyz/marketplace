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
  const actions: BlueprintAction[] = [];

  // Generate tRPC router - BACKEND SERVER (resolves to apps.api.src or apps.web.server)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.server}trpc/router.ts',
    template: 'templates/router.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate Next.js API route handler - BACKEND API (resolves to apps.api.routes or apps.web.app/api)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}trpc/[trpc]/route.ts',
    template: 'templates/api-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  return actions;
}

