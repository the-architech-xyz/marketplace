/**
 * Core Scripts Blueprint
 * 
 * Centralized script management for consistent, lean package.json scripts
 * Eliminates redundancy and provides a single source of truth for common scripts
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const coreScriptsBlueprint: Blueprint = {
  id: 'core-scripts-setup',
  name: 'Core Scripts Setup',
  description: 'Centralized script management for consistent package.json scripts',
  version: '1.0.0',
  actions: [
    // Core development scripts
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'dev',
      command: 'next dev'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'build',
      command: 'next build'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'start',
      command: 'next start'
    },
    
    // Quality scripts (consolidated)
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'lint',
      command: 'eslint . --ext .js,.jsx,.ts,.tsx --max-warnings 0'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'lint:fix',
      command: 'eslint . --ext .js,.jsx,.ts,.tsx --fix'
    },
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
    
    // Testing scripts
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test',
      command: 'vitest'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:run',
      command: 'vitest run'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:coverage',
      command: 'vitest run --coverage'
    },
    
    // Database scripts (unified)
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:generate',
      command: '{{#if module.parameters.databaseType "drizzle"}}drizzle-kit generate{{else if module.parameters.databaseType "prisma"}}prisma generate{{/if}}',
      condition: '{{#if module.parameters.database}}'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:migrate',
      command: '{{#if module.parameters.databaseType "drizzle"}}drizzle-kit migrate{{else if module.parameters.databaseType "prisma"}}prisma migrate dev{{/if}}',
      condition: '{{#if module.parameters.database}}'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:studio',
      command: '{{#if module.parameters.databaseType "drizzle"}}drizzle-kit studio{{else if module.parameters.databaseType "prisma"}}prisma studio{{/if}}',
      condition: '{{#if module.parameters.database}}'
    },
    
    // Utility scripts
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'clean',
      command: 'rm -rf .next dist node_modules/.cache'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'type-check',
      command: 'tsc --noEmit'
    },
    
    // Pre-commit hook
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'pre-commit',
      command: 'npm run lint && npm run format:check && npm run type-check'
    },
    
    // CI script
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'ci',
      command: 'npm run lint && npm run format:check && npm run type-check && npm run test:run'
    }
  ]
};

export default coreScriptsBlueprint;
