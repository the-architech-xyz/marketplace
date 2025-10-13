import { BlueprintAction, BlueprintActionType, MergedConfiguration, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

/**
 * Sentry Shadcn UI Dashboard Feature Blueprint
 * 
 * Provides user-facing monitoring dashboard using Shadcn UI components.
 * Transforms Sentry backend data into a beautiful, accessible UI.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core dashboard is always generated
  actions.push(...generateDashboardActions(config));
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('errorBrowser')) {
    actions.push(...generateErrorBrowserActions());
  }
  
  if (config.activeFeatures.includes('performance')) {
    actions.push(...generatePerformanceActions());
  }
  
  if (config.activeFeatures.includes('alerts')) {
    actions.push(...generateAlertsActions());
  }
  
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
// PERFORMANCE DASHBOARD (Optional)
// ============================================================================

function generatePerformanceActions(): BlueprintAction[] {
  return [
    // Performance page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/monitoring/performance/page.tsx',
      template: 'templates/pages/performance-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Performance chart component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/performance-chart.tsx',
      template: 'templates/components/performance-chart.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Web Vitals card
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/web-vitals-card.tsx',
      template: 'templates/components/web-vitals-card.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// ALERTS CONFIGURATION (Optional)
// ============================================================================

function generateAlertsActions(): BlueprintAction[] {
  return [
    // Alerts configuration page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/monitoring/alerts/page.tsx',
      template: 'templates/pages/alerts-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Alert configuration form
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/alert-config-form.tsx',
      template: 'templates/components/alert-config-form.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Alert rules list
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/alert-rules-list.tsx',
      template: 'templates/components/alert-rules-list.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}
