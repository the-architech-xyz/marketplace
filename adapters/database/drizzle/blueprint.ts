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
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
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

function generateCoreActions(): BlueprintAction[] {
  return [
    // Install core packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-orm', 'postgres']
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-kit', '@types/pg'],
      isDev: true
    },

    // Core database files
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}db/index.ts',
      template: 'templates/db-index.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}db/schema.ts',
      template: 'templates/schema.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },

    // Core configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'drizzle.config.ts',
      template: 'templates/drizzle.config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'DATABASE_URL',
      value: 'postgresql://username:password@localhost:5432/${project.name}',
      description: 'Database connection string'
    },

    // Core scripts
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:generate',
      command: 'drizzle-kit generate'
    }
  ];
}

// ============================================================================
// MIGRATIONS FEATURES (Optional)
// ============================================================================

function generateMigrationsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}db/migrate.ts',
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
      path: '${paths.shared_library}db/studio.ts',
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
      path: '${paths.shared_library}db/relations.ts',
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
      path: '${paths.shared_library}db/seed.ts',
      template: 'templates/seed.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:seed',
      command: 'tsx ${paths.shared_library}db/seed.ts'
    }
  ];
}
