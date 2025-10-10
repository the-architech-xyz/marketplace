import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  return [
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
  ];
}