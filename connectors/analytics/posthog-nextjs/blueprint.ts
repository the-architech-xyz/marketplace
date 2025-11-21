import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic PostHog-NextJS Connector Blueprint
 * 
 * Enhances PostHog adapter with NextJS-specific optimizations and integrations.
 * This connector enhances the core PostHog adapter instead of duplicating functionality.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/analytics/posthog-nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [
    // Note: posthog-js is already installed by the adapter
    // React bindings are included in posthog-js
    
    // Create PostHogProvider component - ALL FRONTEND (PostHog works on React Native)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.frontend.components}analytics/PostHogProvider.tsx',
      template: 'templates/provider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Create main PostHog hook
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.hooks}use-posthog.ts',
      template: 'templates/use-posthog.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];

  // Add analytics hook if event tracking is enabled
  if (params?.eventTracking !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.hooks}use-analytics.ts',
      template: 'templates/use-analytics.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });

    // Add pageview tracking hook
    if (params?.capturePageviews !== false) {
      actions.push({
        type: BlueprintActionType.CREATE_FILE,
        path: '${paths.packages.shared.src.hooks}use-pageview.ts',
        template: 'templates/use-pageview.ts.tpl',
        conflictResolution: {
          strategy: ConflictResolutionStrategy.SKIP,
          priority: 0
        }
      });
    }
  }

  // Add feature flags hook if enabled
  if (params?.featureFlags === true) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.hooks}use-feature-flags.ts',
      template: 'templates/use-feature-flags.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Add experiments hook if enabled
  if (params?.experiments === true) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.hooks}use-experiments.ts',
      template: 'templates/use-experiments.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Add middleware if enabled
  if (params?.middleware === true) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.middleware}posthog.ts',
      template: 'templates/middleware.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Add layout integration template (for manual integration)
  if (params?.provider !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.workspace.docs}posthog-integration.md',
      template: 'templates/layout-integration.md.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  return actions;
}

