import { BlueprintAction, BlueprintActionType, ModifierType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

/**
 * Dynamic Sentry-NextJS Connector Blueprint
 * 
 * Enhances Sentry adapter with NextJS-specific optimizations and integrations.
 * This connector enhances the core Sentry adapter instead of duplicating functionality.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Install Next.js specific Sentry package
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@sentry/nextjs'],
      isDev: false
    },
    
    // Create NextJS-specific Sentry configuration files
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}sentry.client.config.ts',
      template: 'templates/sentry-api.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}sentry.server.config.ts',
      template: 'templates/sentry-api.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}sentry.edge.config.ts',
      template: 'templates/sentry-api.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.middleware}}sentry.ts',
      template: 'templates/sentry-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Create NextJS-specific monitoring hooks using existing templates
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-sentry.ts',
      template: 'templates/use-sentry.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-error-tracking.ts',
      template: 'templates/use-error-tracking.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-performance-monitoring.ts',
      template: 'templates/use-performance-monitoring.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-user-feedback.ts',
      template: 'templates/use-user-feedback.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}