import { BlueprintAction, BlueprintActionType, MergedConfiguration, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

/**
 * Dynamic Sentry React Connector Blueprint
 * 
 * Implements Sentry specifically for pure React applications (Vite, CRA, etc.).
 * Handles React-specific integration with @sentry/react.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core React integration is always generated
  actions.push(...generateCoreActions(config));
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('performance')) {
    actions.push(...generatePerformanceActions());
  }
  
  if (config.activeFeatures.includes('error-boundary')) {
    actions.push(...generateErrorBoundaryActions());
  }
  
  return actions;
}

// ============================================================================
// CORE REACT SENTRY INTEGRATION (Always Generated)
// ============================================================================

function generateCoreActions(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Install React-specific Sentry packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@sentry/react']
    },
    
    // Sentry client configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}lib/monitoring/sentry-config.ts',
      template: 'templates/sentry-config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Sentry initialization
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}lib/monitoring/sentry-init.ts',
      template: 'templates/sentry-init.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // React profiler integration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}lib/monitoring/profiler.tsx',
      template: 'templates/profiler.tsx.tpl',
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
    // Performance monitoring setup for React
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}lib/monitoring/performance.ts',
      template: 'templates/performance.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Web Vitals integration for React
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}lib/monitoring/web-vitals.ts',
      template: 'templates/web-vitals.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// ERROR BOUNDARY FEATURES (Optional)
// ============================================================================

function generateErrorBoundaryActions(): BlueprintAction[] {
  return [
    // Sentry Error Boundary (React component)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/error-boundary.tsx',
      template: 'templates/error-boundary.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Fallback error UI (React component)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.source_root}}components/monitoring/error-fallback.tsx',
      template: 'templates/error-fallback.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}
