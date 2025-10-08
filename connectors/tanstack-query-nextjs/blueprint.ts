import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const blueprint: Blueprint = {
  id: 'connector:tanstack-query-nextjs',
  name: 'TanStack Query NextJS Connector',
  description: 'TanStack Query setup and configuration for NextJS applications',
  version: '1.0.0',
  actions: [
    // Create QueryClient configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}query/client.ts',
      template: 'templates/query-client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create QueryProvider component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}query/QueryProvider.tsx',
      template: 'templates/query-provider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create SSR utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}query/ssr.ts',
      template: 'templates/query-ssr.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create error boundary
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}query/ErrorBoundary.tsx',
      template: 'templates/query-error-boundary.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create query keys utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}query/keys.ts',
      template: 'templates/query-keys.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};