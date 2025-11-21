import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic A/B Testing-Vercel-NextJS Connector Blueprint
 * 
 * Enhances A/B testing adapter with Next.js-specific implementations:
 * - Next.js Middleware for variant assignment
 * - Vercel Edge Config integration
 * - React components for displaying variants
 * - React hooks for accessing variants
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/analytics/ab-vercel-nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [
    // Install @vercel/edge-config for Edge Config access
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@vercel/edge-config'],
      isDev: false
    },

  ];

  // Create middleware for variant assignment
  if (params?.middleware !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.middleware}ab-testing.ts',
      template: 'templates/middleware.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Create Edge Config client
  if (params?.edgeConfig !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ab-testing/edge-config.ts',
      template: 'templates/edge-config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Create React hooks
  if (params?.hooks !== false) {
    actions.push(
      {
        type: BlueprintActionType.CREATE_FILE,
        path: '${paths.packages.shared.src.hooks}use-experiment.ts',
        template: 'templates/use-experiment.ts.tpl',
        conflictResolution: {
          strategy: ConflictResolutionStrategy.SKIP,
          priority: 0
        }
      },
      {
        type: BlueprintActionType.CREATE_FILE,
        path: '${paths.packages.shared.src.hooks}use-variant.ts',
        template: 'templates/use-variant.ts.tpl',
        conflictResolution: {
          strategy: ConflictResolutionStrategy.SKIP,
          priority: 0
        }
      }
    );
  }

  // Create React components
  if (params?.components !== false) {
    actions.push(
      {
        type: BlueprintActionType.CREATE_FILE,
        path: '${paths.apps.web.components}ab-testing/Experiment.tsx',
        template: 'templates/experiment-component.tsx.tpl',
        conflictResolution: {
          strategy: ConflictResolutionStrategy.SKIP,
          priority: 0
        }
      },
      {
        type: BlueprintActionType.CREATE_FILE,
        path: '${paths.apps.web.components}ab-testing/Variant.tsx',
        template: 'templates/variant-component.tsx.tpl',
        conflictResolution: {
          strategy: ConflictResolutionStrategy.SKIP,
          priority: 0
        }
      }
    );
  }

  // Create setup documentation
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.workspace.docs}ab-testing-setup.md',
    template: 'templates/setup-guide.md.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  return actions;
}

