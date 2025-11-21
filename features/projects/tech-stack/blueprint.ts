/**
 * Projects Feature Technology Stack Blueprint
 * 
 * Technology-agnostic stack layer (types, schemas, hooks, stores)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/projects/tech-stack'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const featureName = params?.featureName || 'projects';
  const featurePath = params?.featurePath || 'projects';
  
  const actions: BlueprintAction[] = [];
  
  // Install tech-stack layer dependencies
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: [
      'zod',
      '@tanstack/react-query',
      'zustand',
      'immer'
    ]
  });
  
  // Types - Re-exported from contract
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: `\${paths.packages.shared.src}${featurePath}/types.ts`,
    template: 'templates/types.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Schemas - Zod validation
  if (params?.hasSchemas !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: `\${paths.packages.shared.src}${featurePath}/schemas.ts`,
      template: 'templates/schemas.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }
  
  // Hooks - TanStack Query
  if (params?.hasHooks !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: `\${paths.packages.shared.src}${featurePath}/hooks.ts`,
      template: 'templates/hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }
  
  // Stores - Zustand
  if (params?.hasStores !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: `\${paths.packages.shared.src}${featurePath}/stores.ts`,
      template: 'templates/stores.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }
  
  // Index file
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: `\${paths.packages.shared.src}${featurePath}/index.ts`,
    template: 'templates/index.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}

