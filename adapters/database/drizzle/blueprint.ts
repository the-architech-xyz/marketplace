/**
 * Drizzle Database Adapter Blueprint
 * 
 * Implements capability-based generation with dependency resolution
 * Core features are always included, optional features are conditionally generated
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic Drizzle Database Adapter Blueprint
 * 
 * Generates actions based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'database/drizzle'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated (with provider-specific logic)
  actions.push(...generateCoreActions(params));
  
  // Optional features based on configuration
  if (features.migrations) {
    actions.push(...generateMigrationsActions());
  }
  
  if (features.studio) {
    actions.push(...generateStudioActions());
  }
  
  if (features.relations) {
    actions.push(...generateRelationsActions());
  }
  
  if (features.seeding) {
    actions.push(...generateSeedingActions());
  }
  
  return actions;
}

// ============================================================================
// CORE DATABASE FEATURES (Always Generated)
// ============================================================================

function generateCoreActions(params: any): BlueprintAction[] {
  const provider = params?.provider || 'local';
  const databaseType = params?.databaseType || 'postgresql';
  const isNeon = provider === 'neon';
  const isSQLite = databaseType === 'sqlite';
  
  const actions: BlueprintAction[] = [];
  
  // Install packages based on database type and provider
  if (isSQLite) {
    // SQLite uses better-sqlite3
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-orm', 'better-sqlite3']
    });
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@types/better-sqlite3'],
      isDev: true
    });
  } else if (isNeon) {
    // Neon uses serverless driver
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-orm', '@neondatabase/serverless']
    });
  } else {
    // Standard PostgreSQL
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-orm', 'postgres']
    });
  }
  
  // Dev dependencies
  if (!isSQLite) {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-kit', '@types/pg'],
      isDev: true
    });
  } else {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-kit'],
      isDev: true
    });
  }

  // Core database files - use provider/database-specific template
  let dbIndexTemplate = 'templates/db-index.ts.tpl';
  if (isSQLite) {
    dbIndexTemplate = 'templates/db-index-sqlite.ts.tpl';
  } else if (isNeon) {
    dbIndexTemplate = 'templates/db-index-neon.ts.tpl';
  }
  
  // Use database_library for database modules (targets packages/database/lib/)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.database.src}db/index.ts',
    template: dbIndexTemplate,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.database.src}db/schema.ts',
    template: 'templates/schema.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  // Core configuration
  let drizzleConfigTemplate = 'templates/drizzle.config.ts.tpl';
  if (isSQLite) {
    drizzleConfigTemplate = 'templates/drizzle.config-sqlite.ts.tpl';
  }
  
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.database.root}drizzle.config.ts',
    template: drizzleConfigTemplate,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 0
    }
  });
  
  // Environment variable
  if (isSQLite) {
    actions.push({
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'DATABASE_PATH',
      value: './local.db',
      description: 'SQLite database file path'
    });
  } else {
    const defaultUrl = isNeon 
      ? 'postgresql://user:password@host.neon.tech/dbname?sslmode=require'
      : 'postgresql://username:password@localhost:5432/${project.name}';
      
    actions.push({
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'DATABASE_URL',
      value: defaultUrl,
      description: 'Database connection string'
    });
  }

  // Core scripts
  actions.push({
    type: BlueprintActionType.ADD_SCRIPT,
    name: 'db:generate',
    command: 'drizzle-kit generate'
  });
  
  return actions;
}

// ============================================================================
// MIGRATIONS FEATURES (Optional)
// ============================================================================

function generateMigrationsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}db/migrate.ts',
      template: 'templates/migrate.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:migrate',
      command: 'drizzle-kit migrate'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:push',
      command: 'drizzle-kit push'
    }
  ];
}

// ============================================================================
// STUDIO FEATURES (Optional)
// ============================================================================

function generateStudioActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}db/studio.ts',
      template: 'templates/studio.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:studio',
      command: 'drizzle-kit studio'
    }
  ];
}

// ============================================================================
// RELATIONS FEATURES (Optional)
// ============================================================================

function generateRelationsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}db/relations.ts',
      template: 'templates/relations.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// SEEDING FEATURES (Optional)
// ============================================================================

function generateSeedingActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@faker-js/faker'],
      isDev: true
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}db/seed.ts',
      template: 'templates/seed.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:seed',
      command: 'tsx ${paths.packages.database.src}db/seed.ts'
    }
  ];
}
