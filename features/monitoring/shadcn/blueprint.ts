/**
 * Monitoring Frontend Implementation: Shadcn/ui
 * 
 * Complete monitoring and observability system with real-time metrics, alerts, and logging
 * Uses template-based component generation for maintainability
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/monitoring/shadcn'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (features.performance) {
    actions.push(...generatePerformanceActions());
  }
  
  if (features.analytics) {
    actions.push(...generateAnalyticsActions());
  }
  
  return actions;
}

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'recharts',
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'date-fns',
        'lucide-react',
        'react-error-boundary',
        'framer-motion'
      ]
    },

    // Core monitoring components (only existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}monitoring/MonitoringDashboard.tsx',
      template: 'templates/MonitoringDashboard.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}monitoring/SystemStatus.tsx',
      template: 'templates/SystemStatus.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}monitoring/HealthCheck.tsx',
      template: 'templates/HealthCheck.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}monitoring/ErrorBoundary.tsx',
      template: 'templates/ErrorBoundary.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}monitoring/MetricsCard.tsx',
      template: 'templates/MetricsCard.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}monitoring/AlertCard.tsx',
      template: 'templates/AlertCard.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}monitoring/LogViewer.tsx',
      template: 'templates/LogViewer.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Monitoring pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}monitoring/page.tsx',
      template: 'templates/monitoring-dashboard.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}monitoring/alerts/page.tsx',
      template: 'templates/alerts-page.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}monitoring/logs/page.tsx',
      template: 'templates/logs-page.tsx.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Monitoring utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}monitoring/monitoring-types.ts',
      template: 'templates/monitoring-types.ts.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}monitoring/monitoring-utils.ts',
      template: 'templates/monitoring-utils.ts.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Monitoring hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.hooks}monitoring/use-monitoring.ts',
      template: 'templates/use-monitoring.ts.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.hooks}monitoring/use-metrics.ts',
      template: 'templates/use-metrics.ts.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.hooks}monitoring/use-alerts.ts',
      template: 'templates/use-alerts.ts.tpl',
      context: { 
        features: ['core'],
        hasMonitoring: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

function generatePerformanceActions(): BlueprintAction[] {
  return [
    // Performance components (existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}monitoring/PerformanceChart.tsx',
      template: 'templates/PerformanceChart.tsx.tpl',
      context: { 
        features: ['performance'],
        hasPerformance: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}monitoring/RealTimeMetrics.tsx',
      template: 'templates/RealTimeMetrics.tsx.tpl',
      context: { 
        features: ['performance'],
        hasPerformance: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Performance pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}monitoring/performance/page.tsx',
      template: 'templates/performance-page.tsx.tpl',
      context: { 
        features: ['performance'],
        hasPerformance: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

function generateAnalyticsActions(): BlueprintAction[] {
  return [
    // Analytics pages (existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}monitoring/analytics/page.tsx',
      template: 'templates/analytics-page.tsx.tpl',
      context: { 
        features: ['analytics'],
        hasAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}