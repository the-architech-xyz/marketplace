/**
 * Zustand State Management Adapter Blueprint
 * 
 * Generates Zustand state management based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic Zustand State Management Blueprint
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'state/zustand'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (params.persistence) {
    actions.push(...generatePersistenceActions());
  }
  
  if (params.devtools) {
    actions.push(...generateDevtoolsActions());
  }
  
  if (params.immer) {
    actions.push(...generateImmerActions());
  }
  
  return actions;
}

// ============================================================================
// CORE STATE MANAGEMENT (Always Generated)
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    // Install core package
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['zustand']
    },

    // Core store files
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}create-store.ts',
      template: 'templates/create-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}index.ts',
      template: 'templates/index.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}store-types.ts',
      template: 'templates/store-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}use-store.ts',
      template: 'templates/use-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.providers}}StoreProvider.tsx',
      template: 'templates/StoreProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },

    // Example stores
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}use-app-store.ts',
      template: 'templates/use-app-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}use-ui-store.ts',
      template: 'templates/use-ui-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// PERSISTENCE FEATURES (Optional)
// ============================================================================

function generatePersistenceActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}middleware/persistence.ts',
      template: 'templates/persistence.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// DEVTOOLS FEATURES (Optional)
// ============================================================================

function generateDevtoolsActions(): BlueprintAction[] {
  return [
    // Note: zustand/middleware is part of the main zustand package, not a separate package
    // The middleware is imported from 'zustand/middleware' but installed as part of 'zustand'
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}middleware/devtools.ts',
      template: 'templates/middleware.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// IMMER FEATURES (Optional)
// ============================================================================

function generateImmerActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['immer']
    }
    // Immer integration is handled in middleware.ts template via conditional rendering
  ];
}
