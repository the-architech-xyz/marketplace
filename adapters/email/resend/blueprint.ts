import { BlueprintAction, BlueprintActionType, MergedConfiguration, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

/**
 * Dynamic Resend Email Adapter Blueprint
 * 
 * Generates tech-agnostic email functionality with Resend.
 * Core features are always included, optional features are conditionally generated.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions(config));
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('templates')) {
    actions.push(...generateTemplatesActions());
  }
  
  if (config.activeFeatures.includes('analytics')) {
    actions.push(...generateAnalyticsActions());
  }
  
  if (config.activeFeatures.includes('campaigns')) {
    actions.push(...generateCampaignsActions());
  }
  
  return actions;
}

// ============================================================================
// CORE EMAIL FEATURES (Always Generated)
// ============================================================================

function generateCoreActions(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Install Resend SDK (NO React dependencies)
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['resend']
    },
    
    // Core Resend client wrapper
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/resend-client.ts',
      template: 'templates/resend-client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Email configuration (environment-based)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/email-config.ts',
      template: 'templates/email-config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Email types (tech-agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/email-types.ts',
      template: 'templates/email-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Pure HTML email sender (accepts HTML string)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/email-sender.ts',
      template: 'templates/email-sender.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// TEMPLATES FEATURES (Optional - BACKEND ONLY)
// ============================================================================

function generateTemplatesActions(): BlueprintAction[] {
  return [
    // Template utilities (tech-agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/template-utils.ts',
      template: 'templates/template-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Template types (tech-agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/template-types.ts',
      template: 'templates/template-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Template registry (tech-agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/template-registry.ts',
      template: 'templates/template-registry.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// ANALYTICS FEATURES (Optional)
// ============================================================================

function generateAnalyticsActions(): BlueprintAction[] {
  return [
    // Email analytics
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/analytics.ts',
      template: 'templates/analytics.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Tracking utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/tracking.ts',
      template: 'templates/tracking.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Analytics utilities (backend only)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/analytics-utils.ts',
      template: 'templates/analytics-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// CAMPAIGNS FEATURES (Optional)
// ============================================================================

function generateCampaignsActions(): BlueprintAction[] {
  return [
    // Batch sending
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/batch-sending.ts',
      template: 'templates/batch-sending.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // List management
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/list-management.ts',
      template: 'templates/list-management.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Campaign management
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/campaigns.ts',
      template: 'templates/campaigns.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}