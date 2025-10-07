/**
 * Drizzle Base Blueprint
 * 
 * Sets up Drizzle ORM with minimal configuration
 * Advanced features are available as separate features
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const drizzleBlueprint: Blueprint = {
  id: 'drizzle-base-setup',
  name: 'Drizzle Base Setup',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-orm', 'pg']
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-kit', '@types/pg'],
      isDev: true
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/db/index.ts',
      template: 'templates/db-index.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/db/schema.ts',
      template: 'templates/schema.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'drizzle.config.ts',
      template: 'templates/drizzle.config.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.MERGE,
        priority: 0
      }},
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'DATABASE_URL',
      value: 'postgresql://username:password@localhost:5432/{{project.name}}',
      description: 'Database connection string'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'db:generate',
      command: 'drizzle-kit generate'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'db:migrate',
      command: 'drizzle-kit migrate'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'db:studio',
      command: 'drizzle-kit studio'
    }
  ]
};
