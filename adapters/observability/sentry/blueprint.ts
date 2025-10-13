import { BlueprintAction, BlueprintActionType, MergedConfiguration, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

/**
 * Dynamic Sentry Core Adapter Blueprint
 * 
 * Provides only the most basic, universal Sentry types and utilities that are shared everywhere.
 * This is a tech-agnostic core that provides shared functionality.
 * Framework-specific implementations are handled by Connectors.
 * 
 * NOTE: Only includes actions with existing templates.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Core Sentry client configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/sentry/client.ts',
      template: 'templates/client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Core Sentry server configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/sentry/server.ts',
      template: 'templates/server.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Core Sentry configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/sentry/config.ts',
      template: 'templates/config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Core Sentry analytics
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/sentry/analytics.ts',
      template: 'templates/analytics.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Core Sentry performance
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/sentry/performance.ts',
      template: 'templates/performance.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
    
    // NOTE: All other actions removed due to missing templates
    // Advanced features are handled by other modules (sentry-nextjs, monitoring, etc.)
  ];
}