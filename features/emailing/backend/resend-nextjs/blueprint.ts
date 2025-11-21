import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/emailing/backend/resend-nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (params.templates) {
    actions.push(...generateTemplatesActions());
  }
  
  if (params.analytics) {
    actions.push(...generateAnalyticsActions());
  }
  
  if (params.bulkEmail) {
    actions.push(...generateBulkEmailActions());
  }
  
  if (params.webhooks) {
    actions.push(...generateWebhooksActions());
  }
  
  if (params.organizations) {
    actions.push(...generateOrganizationsActions());
  }
  
  if (params.teams) {
    actions.push(...generateTeamsActions());
  }
  
  return actions;
}

// ============================================================================
// CORE EMAIL FEATURES (Always Generated)
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    // Create basic email API route - BACKEND API (resolves to apps.api.routes or apps.web.app/api)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}email/send/route.ts',
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
      path: '${paths.apps.backend.api}email/templates/route.ts', // BACKEND API
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
      path: '${paths.apps.backend.api}email/analytics/route.ts', // BACKEND API
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
      path: '${paths.apps.backend.api}email/campaigns/route.ts', // BACKEND API
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
      path: '${paths.apps.backend.api}email/webhooks/route.ts', // BACKEND API
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
    // Organization-specific email features would go here
    // Currently no additional files needed - permissions handled by auth
  ];
}

// ============================================================================
// TEAM FEATURES (Conditional)
// ============================================================================

function generateTeamsActions(): BlueprintAction[] {
  return [
    // Team-specific email features would go here
    // Currently no additional files needed - permissions handled by auth
  ];
}