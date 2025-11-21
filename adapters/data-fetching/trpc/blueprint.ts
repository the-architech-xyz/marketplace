/**
 * tRPC Data-Fetching Adapter Blueprint
 * 
 * Sets up end-to-end typesafe APIs with tRPC.
 * tRPC wraps TanStack Query for React hooks.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'data-fetching/trpc'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const actions: BlueprintAction[] = [];

  // Install tRPC packages
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: [
      '@trpc/client',
      '@trpc/react-query',
      '@trpc/server'
    ]
  });

  // Install transformer if specified
  if (params.transformer === 'superjson') {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['superjson']
    });
  } else if (params.transformer === 'devalue') {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['devalue']
    });
  }

  // Generate tRPC client setup
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}trpc/client.ts',
    template: 'templates/client.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate tRPC React hooks
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}trpc/react.tsx',
    template: 'templates/react.tsx.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate tRPC Provider component
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}trpc/Provider.tsx',
    template: 'templates/Provider.tsx.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate server-side tRPC client (for SSR)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}trpc/server.ts',
    template: 'templates/server.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  return actions;
}


