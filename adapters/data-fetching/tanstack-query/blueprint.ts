/**
 * TanStack Query Blueprint
 * 
 * The Golden Core data fetching adapter - provides powerful data synchronization
 * with caching, background updates, and optimistic updates for React applications
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const tanstackQueryBlueprint: Blueprint = {
  id: 'tanstack-query-setup',
  name: 'TanStack Query Setup',
  description: 'Complete TanStack Query setup with best practices and TypeScript support',
  version: '5.0.0',
  actions: [
    // Install TanStack Query
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
      template: 'templates/QueryProvider.tsx.tpl'
    },
    // Create Query Client Configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/query-client.ts',
      template: 'templates/query-client.ts.tpl'
    },
    // Create Standard Query Hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-query.ts',
      template: 'templates/use-query.ts.tpl'
    },
    // Create Standard Mutation Hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-mutation.ts',
      template: 'templates/use-mutation.ts.tpl'
    },
    // Create Infinite Query Hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-infinite-query.ts',
      template: 'templates/use-infinite-query.ts.tpl',
      condition: '{{#if module.features.infinite}}'
    },
    // Create Optimistic Update Utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/optimistic-updates.ts',
      template: 'templates/optimistic-updates.ts.tpl',
      condition: '{{#if module.features.optimistic}}'
    },
    // Create Offline Support
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/offline-support.ts',
      template: 'templates/offline-support.ts.tpl',
      condition: '{{#if module.features.offline}}'
    },
    // Create Query Keys Factory
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/query-keys.ts',
      template: 'templates/query-keys.ts.tpl'
    },
    // Create Error Boundary for Queries
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/QueryErrorBoundary.tsx',
      template: 'templates/QueryErrorBoundary.tsx.tpl'
    },
    // Create Loading States
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/QueryLoading.tsx',
      template: 'templates/QueryLoading.tsx.tpl'
    },
    // Add TypeScript Types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/types/query.ts',
      template: 'templates/query-types.ts.tpl'
    },
    // Create Query Invalidation Utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-query-invalidation.ts',
      template: 'templates/query-invalidation.ts.tpl'
    }
  ]
};

export default tanstackQueryBlueprint;
