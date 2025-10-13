import { BlueprintAction, BlueprintActionType, MergedConfiguration, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

/**
 * Dynamic Sentry Core Adapter Blueprint
 * 
 * Provides only the most basic, universal Sentry types and utilities that are shared everywhere.
 * This is a tech-agnostic core that provides shared functionality.
 * Framework-specific implementations are handled by Connectors.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core is always generated (tech-agnostic utilities only)
  actions.push(...generateCoreActions(config));
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('performance')) {
    actions.push(...generatePerformanceActions());
  }
  
  if (config.activeFeatures.includes('alerts')) {
    actions.push(...generateAlertsActions());
  }
  
  if (config.activeFeatures.includes('enterprise')) {
    actions.push(...generateEnterpriseActions());
  }
  
  return actions;
}

// ============================================================================
// CORE SENTRY FEATURES (Tech-Agnostic Only)
// ============================================================================

function generateCoreActions(config: MergedConfiguration): BlueprintAction[] {
  return [
    // NO PACKAGE INSTALLATION - This is handled by Connectors
    // Core types and utilities only
    
    // Sentry types (universal)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/sentry-types.ts',
      template: 'templates/sentry-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Error handling utilities (tech-agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/error-utils.ts',
      template: 'templates/error-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Monitoring utilities (tech-agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/monitoring-utils.ts',
      template: 'templates/monitoring-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Environment configuration (universal)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/environment-config.ts',
      template: 'templates/environment-config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// PERFORMANCE FEATURES (Optional)
// ============================================================================

function generatePerformanceActions(): BlueprintAction[] {
  return [
    // Performance utilities (tech-agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/performance-utils.ts',
      template: 'templates/performance-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Web Vitals (universal)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/web-vitals.ts',
      template: 'templates/web-vitals.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Performance tracking utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/performance-tracking.ts',
      template: 'templates/performance-tracking.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// ALERTS FEATURES (Optional)
// ============================================================================

function generateAlertsActions(): BlueprintAction[] {
  return [
    // Alert utilities (tech-agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/alert-utils.ts',
      template: 'templates/alert-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Dashboard utilities (universal)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/dashboard-utils.ts',
      template: 'templates/dashboard-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Notification utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/notification-utils.ts',
      template: 'templates/notification-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// ENTERPRISE FEATURES (Optional)
// ============================================================================

function generateEnterpriseActions(): BlueprintAction[] {
  return [
    // Enterprise utilities (tech-agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/enterprise-utils.ts',
      template: 'templates/enterprise-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Custom metrics utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/custom-metrics.ts',
      template: 'templates/custom-metrics.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Advanced dashboard utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/advanced-dashboard.ts',
      template: 'templates/advanced-dashboard.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}