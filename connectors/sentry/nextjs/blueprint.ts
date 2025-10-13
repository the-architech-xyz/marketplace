import { BlueprintAction, BlueprintActionType, MergedConfiguration, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

/**
 * Dynamic Sentry Next.js Connector Blueprint
 * 
 * Implements Sentry specifically for the Next.js framework.
 * Handles the complexity of Next.js integration with @sentry/nextjs.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core Next.js integration is always generated
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
// CORE NEXT.JS SENTRY INTEGRATION (Always Generated)
// ============================================================================

function generateCoreActions(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Install Next.js-specific Sentry packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@sentry/nextjs']
    },
    
    // Sentry client configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}sentry.client.config.ts',
      template: 'templates/sentry.client.config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Sentry server configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}sentry.server.config.ts',
      template: 'templates/sentry.server.config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Sentry edge configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}sentry.edge.config.ts',
      template: 'templates/sentry.edge.config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Next.js Sentry config wrapper utility
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}lib/monitoring/next-sentry-config.ts',
      template: 'templates/next-sentry-config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // API route for Sentry testing
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/test-sentry.ts',
      template: 'templates/test-sentry-api.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Error page with Sentry integration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}error.tsx',
      template: 'templates/error-page.tsx.tpl',
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
    // Performance monitoring setup for Next.js
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/nextjs-performance.ts',
      template: 'templates/nextjs-performance.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Web Vitals integration for Next.js
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/nextjs-web-vitals.ts',
      template: 'templates/nextjs-web-vitals.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Performance monitoring middleware
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}middleware.ts',
      template: 'templates/performance-middleware.ts.tpl',
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
    // Alert configuration for Next.js
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/nextjs-alerts.ts',
      template: 'templates/nextjs-alerts.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Dashboard integration for Next.js
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}dashboard/sentry/page.tsx',
      template: 'templates/sentry-dashboard.tsx.tpl',
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
    // Enterprise features for Next.js
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/nextjs-enterprise.ts',
      template: 'templates/nextjs-enterprise.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Custom metrics for Next.js
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}monitoring/nextjs-custom-metrics.ts',
      template: 'templates/nextjs-custom-metrics.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}
