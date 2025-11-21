import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic PostHog Core Adapter Blueprint
 * 
 * Provides only the most basic, universal PostHog types and utilities that are shared everywhere.
 * This is a tech-agnostic core that provides shared functionality.
 * Framework-specific implementations are handled by Connectors.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'observability/posthog'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [
    // Install PostHog packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['posthog-js'],
      isDev: false
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['posthog-node'],
      isDev: false
    },

    // Core PostHog client configuration (browser)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}analytics/posthog/client.ts',
      template: 'templates/client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Core PostHog server configuration (Node.js)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}analytics/posthog/server.ts',
      template: 'templates/server.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Core PostHog configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}analytics/posthog/config.ts',
      template: 'templates/config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Core PostHog analytics API
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}analytics/posthog/analytics.ts',
      template: 'templates/analytics.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];

  // Add event tracking if enabled
  if (features?.eventTracking !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}analytics/posthog/event-tracking.ts',
      template: 'templates/event-tracking.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    });
  }

  // Add user tracking if enabled
  if (features?.core !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}analytics/posthog/user-tracking.ts',
      template: 'templates/user-tracking.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    });
  }

  // Add session replay if enabled
  if (features?.sessionReplay === true) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}analytics/posthog/session-replay.ts',
      template: 'templates/session-replay.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    });
  }

  // Add feature flags if enabled
  if (features?.featureFlags === true) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}analytics/posthog/feature-flags.ts',
      template: 'templates/feature-flags.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    });
  }

  // Add experiments if enabled
  if (features?.experiments === true) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}analytics/posthog/experiments.ts',
      template: 'templates/experiments.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    });
  }

  return actions;
}


