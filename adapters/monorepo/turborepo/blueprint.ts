/**
 * Turborepo Monorepo Adapter Blueprint
 * 
 * Sets up Turborepo for monorepo management with intelligent caching and task orchestration.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'monorepo/turborepo'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install Turborepo
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['turbo'],
    isDev: true
  });

  // Generate turbo.json configuration
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: 'turbo.json',
    template: 'templates/turbo.json.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate root package.json for monorepo
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: 'package.json',
    template: 'templates/root-package.json.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.MERGE,
      priority: 0
    }
  });

  // Add turbo scripts to package.json
  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'build',
    command: 'turbo build'
  });

  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'dev',
    command: 'turbo dev'
  });

  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'lint',
    command: 'turbo lint'
  });

  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'test',
    command: 'turbo test'
  });

  return actions;
}

