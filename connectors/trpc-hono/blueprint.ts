/**
 * tRPC Hono Connector Blueprint
 * 
 * Integrates tRPC server with Hono backend.
 * Creates:
 * - tRPC router in packages/api (monorepo) or shared location
 * - Hono handler for tRPC endpoints
 * - Context creation for tRPC
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/trpc-hono'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const transformer = params?.transformer || 'superjson';
  const trpcPath = params?.path || '/trpc';
  
  const actions: BlueprintAction[] = [];

  // Install tRPC server packages
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['@trpc/server']
  });

  // Install transformer if specified
  if (transformer === 'superjson') {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['superjson']
    });
  } else if (transformer === 'devalue') {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['devalue']
    });
  }

  // Generate tRPC router in packages/api (for monorepo) or shared location
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}/trpc/router.ts',
    template: 'templates/router.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate tRPC context creation
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}/trpc/context.ts',
    template: 'templates/context.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate tRPC initialization (with transformer)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}/trpc/init.ts',
    template: 'templates/init.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate Hono handler for tRPC
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.api.root}/trpc/handler.ts',
    template: 'templates/handler.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate integration guide (template file with instructions)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.api.root}/trpc/INTEGRATION.md',
    template: 'templates/integration-guide.md.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  return actions;
}

