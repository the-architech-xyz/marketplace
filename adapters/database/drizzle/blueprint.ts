/**
 * Drizzle Database Adapter Blueprint
 * 
 * Implements capability-based generation with dependency resolution
 * Core features are always included, optional features are conditionally generated
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

/**
 * Dynamic Drizzle Database Adapter Blueprint
 * 
 * Generates actions based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('migrations')) {
    actions.push(...generateMigrationsActions());
  }
  
  if (config.activeFeatures.includes('studio')) {
    actions.push(...generateStudioActions());
  }
  
  if (config.activeFeatures.includes('relations')) {
    actions.push(...generateRelationsActions());
  }
  
  if (config.activeFeatures.includes('seeding')) {
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
      packages: ['drizzle-orm', 'pg']
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['drizzle-kit', '@types/pg'],
      isDev: true
    },

    // Core database files
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}db/index.ts',
      template: 'templates/db-index.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}db/schema.ts',
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
        strategy: ConflictResolutionStrategy.MERGE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'DATABASE_URL',
      value: 'postgresql://username:password@localhost:5432/{{project.name}}',
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
      path: '{{paths.shared_library}}db/migrate.ts',
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
      path: '{{paths.shared_library}}db/studio.ts',
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
      path: '{{paths.shared_library}}db/relations.ts',
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
      path: '{{paths.shared_library}}db/seed.ts',
      template: 'templates/seed.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'db:seed',
      command: 'tsx {{paths.shared_library}}db/seed.ts'
    }
  ];
}
