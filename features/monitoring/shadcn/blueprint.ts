import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const blueprint: Blueprint = {
  id: 'feature:monitoring/shadcn',
  name: 'Monitoring Feature (Shadcn)',
  description: 'Complete application monitoring solution using Shadcn components',
  version: '1.0.0',
  actions: [
    // Monitoring Pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/monitoring/page.tsx',
      template: 'templates/monitoring-dashboard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/monitoring/analytics/page.tsx',
      template: 'templates/analytics-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/monitoring/alerts/page.tsx',
      template: 'templates/alerts-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/monitoring/logs/page.tsx',
      template: 'templates/logs-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/monitoring/performance/page.tsx',
      template: 'templates/performance-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Monitoring Components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/MonitoringDashboard.tsx',
      template: 'templates/MonitoringDashboard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/MetricsCard.tsx',
      template: 'templates/MetricsCard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/AlertCard.tsx',
      template: 'templates/AlertCard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/LogViewer.tsx',
      template: 'templates/LogViewer.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/PerformanceChart.tsx',
      template: 'templates/PerformanceChart.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/SystemStatus.tsx',
      template: 'templates/SystemStatus.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/AlertSettings.tsx',
      template: 'templates/AlertSettings.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/HealthCheck.tsx',
      template: 'templates/HealthCheck.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/RealTimeMetrics.tsx',
      template: 'templates/RealTimeMetrics.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}monitoring/ErrorBoundary.tsx',
      template: 'templates/ErrorBoundary.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Monitoring Hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}hooks/use-monitoring.ts',
      template: 'templates/use-monitoring.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}hooks/use-alerts.ts',
      template: 'templates/use-alerts.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}hooks/use-metrics.ts',
      template: 'templates/use-metrics.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Monitoring Types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}types/monitoring.ts',
      template: 'templates/monitoring-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Monitoring Utils
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}utils/monitoring-utils.ts',
      template: 'templates/monitoring-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};
