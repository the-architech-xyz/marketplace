/**
 * Synap Capture Tech-Stack Blueprint
 * 
 * Generates tech-stack layer (schemas, hooks, stores) for Synap Capture
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/synap/capture/tech-stack'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const featureName = params.featureName || 'synap-capture';
  const featurePath = params.featurePath || 'synap-capture';
  
  const actions: BlueprintAction[] = [];
  
  // Types (re-export from contract)
  if (params.hasTypes !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: `\${paths.packages.shared.src}${featurePath}/types.ts`,
      template: 'templates/types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }
  
  // Schemas
  if (params.hasSchemas !== false) {
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
  
  // Hooks
  if (params.hasHooks !== false) {
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
  
  // Stores
  if (params.hasStores !== false) {
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
  
  // Index
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



