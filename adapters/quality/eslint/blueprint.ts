/**
 * ESLint Blueprint
 * 
 * Golden Core code linting with ESLint for JavaScript and TypeScript
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const eslintBlueprint: Blueprint = {
  id: 'eslint-golden-core-setup',
  name: 'ESLint Golden Core Setup',
  description: 'Complete ESLint setup with best practices for JavaScript and TypeScript',
  version: '8.0.0',
  actions: [
    // Install ESLint and core packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint'],
      isDev: true
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@typescript-eslint/parser', '@typescript-eslint/eslint-plugin'],
      isDev: true,
      condition: '{{#if module.parameters.typescript}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
      isDev: true,
      condition: '{{#if module.parameters.react}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-config-next'],
      isDev: true,
      condition: '{{#if module.parameters.nextjs}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-node'],
      isDev: true,
      condition: '{{#if module.parameters.nodejs}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-jsx-a11y'],
      isDev: true,
      condition: '{{#if module.parameters.accessibility}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-import', 'eslint-plugin-import-resolver-typescript'],
      isDev: true,
      condition: '{{#if module.parameters.imports}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-prettier', 'eslint-config-prettier'],
      isDev: true,
      condition: '{{#if module.parameters.format}}'
    },
    // Create ESLint configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.eslintrc.js',
      template: 'templates/.eslintrc.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.eslintignore',
      template: 'templates/.eslintignore.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create TypeScript ESLint configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'eslint.config.ts',
      template: 'templates/eslint.config.ts.tpl',
      condition: '{{#if module.parameters.typescript}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.MERGE,
        priority: 0
      }},
    // ESLint scripts are handled by core-scripts adapter
    // Only add ESLint-specific scripts that aren't covered by core
    // Create ESLint rules configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'eslint-rules.js',
      template: 'templates/eslint-rules.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create ESLint utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.scripts}}lint-staged.js',
      template: 'templates/lint-staged.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.scripts}}eslint-fix.js',
      template: 'templates/eslint-fix.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }}
  ]
};

export default eslintBlueprint;
