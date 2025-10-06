/**
 * Prettier Blueprint
 * 
 * Golden Core code formatting with Prettier for consistent code style
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

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
      template: 'templates/.prettierrc.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.prettierrc.js',
      template: 'templates/.prettierrc.js.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.prettierignore',
      template: 'templates/.prettierignore.tpl'
    },
    // Create Prettier scripts
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'format',
      command: 'prettier --write .'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'format:check',
      command: 'prettier --check .'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'format:staged',
      command: 'prettier --write --list-different'
    },
    // Create Prettier utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'scripts/format-all.js',
      template: 'templates/format-all.js.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'scripts/format-staged.js',
      template: 'templates/format-staged.js.tpl'
    },
    // Create Prettier configuration for specific file types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'prettier.config.js',
      template: 'templates/prettier.config.js.tpl'
    }
  ]
};

export default prettierBlueprint;
