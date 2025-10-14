/**
 * Dynamic TanStack Query Blueprint
 * 
 * Generates TanStack Query data fetching based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic TanStack Query Blueprint
 * 
 * Generates TanStack Query data fetching based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'data-fetching/tanstack-query'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (params.devtools) {
    actions.push(...generateDevtoolsActions());
  }
  
  if (features.infinite) {
    actions.push(...generateInfiniteActions());
  }
  
  if (features.optimistic) {
    actions.push(...generateOptimisticActions());
  }
  
  if (features.offline) {
    actions.push(...generateOfflineActions());
  }
  
  return actions;
}

// ============================================================================
// CORE TANSTACK QUERY FEATURES (Always Generated)
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tanstack/react-query'],
      isDev: false
    },
    // Create Query Client Provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/providers/QueryProvider.tsx',
      template: 'templates/QueryProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create Query Client Configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}query-client.ts',
      template: 'templates/query-client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create Standard Query Hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-query.ts',
      template: 'templates/use-query.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create Standard Mutation Hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-mutation.ts',
      template: 'templates/use-mutation.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create Query Keys Factory
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}query-keys.ts',
      template: 'templates/query-keys.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create Error Boundary for Queries
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}QueryErrorBoundary.tsx',
      template: 'templates/QueryErrorBoundary.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create Loading States
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}QueryLoading.tsx',
      template: 'templates/QueryLoading.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Add TypeScript Types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.types}}query.ts',
      template: 'templates/query-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create Query Invalidation Utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-query-invalidation.ts',
      template: 'templates/query-invalidation.ts.tpl',
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
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tanstack/react-query-devtools'],
      isDev: true
    }
  ];
}

// ============================================================================
// INFINITE QUERY FEATURES (Optional)
// ============================================================================

function generateInfiniteActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-infinite-query.ts',
      template: 'templates/use-infinite-query.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// OPTIMISTIC UPDATE FEATURES (Optional)
// ============================================================================

function generateOptimisticActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}optimistic-updates.ts',
      template: 'templates/optimistic-updates.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// OFFLINE SUPPORT FEATURES (Optional)
// ============================================================================

function generateOfflineActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}offline-support.ts',
      template: 'templates/offline-support.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}
