import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('templates')) {
    actions.push(...generateTemplatesActions());
  }
  
  if (config.activeFeatures.includes('analytics')) {
    actions.push(...generateAnalyticsActions());
  }
  
  if (config.activeFeatures.includes('bulkEmail')) {
    actions.push(...generateBulkEmailActions());
  }
  
  if (config.activeFeatures.includes('webhooks')) {
    actions.push(...generateWebhooksActions());
  }
  
  if (config.activeFeatures.includes('organizations')) {
    actions.push(...generateOrganizationsActions());
  }
  
  if (config.activeFeatures.includes('teams')) {
    actions.push(...generateTeamsActions());
  }
  
  return actions;
}

// ============================================================================
// CORE EMAIL FEATURES (Always Generated)
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    // Create the main EmailService that implements IEmailService
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}services/EmailService.ts',
      template: 'templates/EmailService.ts.tpl',
      context: { features: ['core'] },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create email service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/api.ts',
      template: 'templates/email-api.ts.tpl',
      context: { features: ['core'] },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create basic email API route
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/email/send/route.ts',
      template: 'templates/api-send-email-route.ts.tpl',
      context: { features: ['core'] },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

// ============================================================================
// TEMPLATE FEATURES (Conditional)
// ============================================================================

function generateTemplatesActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/email/templates/route.ts',
      template: 'templates/api-email-templates-route.ts.tpl',
      context: { 
        features: ['templates'],
        hasTemplates: true 
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

// ============================================================================
// ANALYTICS FEATURES (Conditional)
// ============================================================================

function generateAnalyticsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/email/analytics/route.ts',
      template: 'templates/api-email-analytics-route.ts.tpl',
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

// ============================================================================
// BULK EMAIL FEATURES (Conditional)
// ============================================================================

function generateBulkEmailActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/email/campaigns/route.ts',
      template: 'templates/api-email-campaigns-route.ts.tpl',
      context: { 
        features: ['bulkEmail'],
        hasBulkEmail: true 
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

// ============================================================================
// WEBHOOKS FEATURES (Conditional)
// ============================================================================

function generateWebhooksActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/email/webhooks/route.ts',
      template: 'templates/api-email-webhooks-route.ts.tpl',
      context: { 
        features: ['webhooks'],
        hasWebhooks: true 
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

// ============================================================================
// ORGANIZATION FEATURES (Conditional)
// ============================================================================

function generateOrganizationsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/permissions.ts',
      template: 'templates/permissions.ts.tpl',
      context: { 
        features: ['organizations'],
        hasOrganizations: true 
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

// ============================================================================
// TEAM FEATURES (Conditional)
// ============================================================================

function generateTeamsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/team-permissions.ts',
      template: 'templates/team-permissions.ts.tpl',
      context: { 
        features: ['teams'],
        hasTeams: true 
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}