import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/infrastructure/tanstack-query-nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // Create QueryClient configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}query/client.ts',
      template: 'templates/query-client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create QueryProvider component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}query/QueryProvider.tsx',
      template: 'templates/query-provider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create SSR utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}query/ssr.ts',
      template: 'templates/query-ssr.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create error boundary
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}query/ErrorBoundary.tsx',
      template: 'templates/query-error-boundary.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create query keys utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}query/keys.ts',
      template: 'templates/query-keys.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Wrap app layout with QueryProvider
    {
      type: BlueprintActionType.ENHANCE_FILE,
      path: '${paths.apps.web.src}app/layout.tsx',
      modifier: ModifierType.JSX_CHILDREN_WRAPPER,
      params: {
        providers: [
          {
            component: 'QueryProvider',
            import: {
              name: 'QueryProvider',
              from: '@/lib/query/QueryProvider'
            },
            props: {
              enableDevtools: 'process.env.NODE_ENV === \'development\''
            }
          }
        ],
        targetElement: 'body'
      }
    }
  ];
}