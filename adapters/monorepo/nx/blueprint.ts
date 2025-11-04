/**
 * Nx Monorepo Adapter Blueprint
 * 
 * Sets up Nx for monorepo management with advanced dev tools and code generation.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'monorepo/nx'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install Nx
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['nx', '@nx/workspace'],
    isDev: true
  });

  // Generate nx.json configuration
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: 'nx.json',
    template: 'templates/nx.json.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Generate .nxignore
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '.nxignore',
    template: 'templates/nxignore.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Add Nx scripts to package.json
  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'build',
    command: 'nx run-many -t build'
  });

  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'dev',
    command: 'nx run-many -t dev'
  });

  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'lint',
    command: 'nx run-many -t lint'
  });

  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'test',
    command: 'nx run-many -t test'
  });

  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'affected:build',
    command: 'nx affected -t build'
  });

  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'graph',
    command: 'nx graph'
  });

  return actions;
}

