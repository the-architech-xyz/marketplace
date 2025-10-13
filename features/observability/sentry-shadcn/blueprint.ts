import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Sentry Shadcn UI Dashboard Feature Blueprint
 * 
 * Provides user-facing monitoring dashboard using Shadcn UI components.
 * Transforms Sentry backend data into a beautiful, accessible UI.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/observability/sentry-shadcn'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core dashboard is always generated
  actions.push(...generateDashboardActions(config));
  
  // Optional features based on configuration
  if (features.errorBrowser) {
    actions.push(...generateErrorBrowserActions());
  }
  
  // NOTE: Performance and Alerts UI components are handled by the monitoring/shadcn feature
  // This connector only provides Sentry-specific monitoring dashboard and error browser
  
  return actions;
}

// ============================================================================
// CORE DASHBOARD (Always Generated)
// ============================================================================

function generateDashboardActions(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Main monitoring dashboard page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/monitoring/page.tsx',
      template: 'templates/pages/monitoring-dashboard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Monitoring overview component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/monitoring-overview.tsx',
      template: 'templates/components/monitoring-overview.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Monitoring stats cards
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/monitoring-stats.tsx',
      template: 'templates/components/monitoring-stats.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Custom hook for monitoring data
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}hooks/use-monitoring-data.ts',
      template: 'templates/hooks/use-monitoring-data.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Monitoring types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}types/monitoring.ts',
      template: 'templates/types/monitoring.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// ERROR BROWSER (Optional)
// ============================================================================

function generateErrorBrowserActions(): BlueprintAction[] {
  return [
    // Errors page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/monitoring/errors/page.tsx',
      template: 'templates/pages/errors-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Error list component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/error-list.tsx',
      template: 'templates/components/error-list.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Error details dialog
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/error-details-dialog.tsx',
      template: 'templates/components/error-details-dialog.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Error filters
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/error-filters.tsx',
      template: 'templates/components/error-filters.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// NOTE: Performance and Alerts UI components have been removed
// These are now handled by the monitoring/shadcn feature module
// ============================================================================
