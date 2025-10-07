/**
 * Prettier Blueprint
 * 
 * Golden Core code formatting with Prettier for consistent code style
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const prettierBlueprint: Blueprint = {
  id: 'prettier-golden-core-setup',
  name: 'Prettier Golden Core Setup',
  description: 'Complete Prettier setup with best practices for code formatting',
  version: '3.0.0',
  actions: [
    // Install Prettier and plugins
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['prettier'],
      isDev: true
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['prettier-plugin-tailwindcss'],
      isDev: true,
      condition: '{{#if module.parameters.plugins}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['prettier-plugin-sort-imports'],
      isDev: true,
      condition: '{{#if module.parameters.plugins}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['prettier-plugin-organize-imports'],
      isDev: true,
      condition: '{{#if module.parameters.plugins}}'
    },
    // Create Prettier configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.prettierrc',
      template: 'templates/.prettierrc.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.prettierignore',
      template: 'templates/.prettierignore.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    // Prettier scripts are handled by core-scripts adapter
    // Only add Prettier-specific scripts that aren't covered by core
    // Create Prettier utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'scripts/format-all.js',
      template: 'templates/format-all.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'scripts/format-staged.js',
      template: 'templates/format-staged.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    // Create Prettier configuration for specific file types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'prettier.config.js',
      template: 'templates/prettier.config.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    }
  ]
};

export default prettierBlueprint;
