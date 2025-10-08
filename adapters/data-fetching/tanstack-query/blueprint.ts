/**
 * TanStack Query Blueprint
 * 
 * The Golden Core data fetching adapter - provides powerful data synchronization
 * with caching, background updates, and optimistic updates for React applications
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const tanstackQueryBlueprint: Blueprint = {
  id: 'tanstack-query-setup',
  name: 'TanStack Query Setup',
  description: 'Complete TanStack Query setup with best practices and TypeScript support',
  version: '5.0.0',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tanstack/react-query'],
      isDev: false
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tanstack/react-query-devtools'],
      isDev: true,
      condition: '{{#if module.parameters.devtools}}'
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
    // Create Infinite Query Hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-infinite-query.ts',
      template: 'templates/use-infinite-query.ts.tpl',
      condition: '{{#if module.features.infinite}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      },
    },
    // Create Optimistic Update Utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}optimistic-updates.ts',
      template: 'templates/optimistic-updates.ts.tpl',
      condition: '{{#if module.features.optimistic}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create Offline Support
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}offline-support.ts',
      template: 'templates/offline-support.ts.tpl',
      condition: '{{#if module.features.offline}}',
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
  ]
};

export default tanstackQueryBlueprint;
