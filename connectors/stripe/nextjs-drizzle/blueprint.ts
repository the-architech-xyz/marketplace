/**
 * Stripe NextJS Drizzle Connector Blueprint
 * 
 * Generates server-side API routes for Stripe payments with organization billing
 * using NextJS and Drizzle ORM.
 */

import { BlueprintAction, BlueprintActionType, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core Stripe setup
  actions.push(...generateCoreActions());
  
  // Organization billing features
  if (config.activeFeatures.includes('organizationBilling')) {
    actions.push(...generateOrganizationBillingActions());
  }
  
  // Seat management features
  if (config.activeFeatures.includes('seatManagement')) {
    actions.push(...generateSeatManagementActions());
  }
  
  // Usage tracking features
  if (config.activeFeatures.includes('usageTracking')) {
    actions.push(...generateUsageTrackingActions());
  }
  
  // Webhook handling
  if (config.activeFeatures.includes('webhooks')) {
    actions.push(...generateWebhookActions());
  }
  
  return actions;
}

// ============================================================================
// CORE STRIPE SETUP
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/stripe/server.ts',
      template: 'templates/lib/stripe/server.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/stripe/config.ts',
      template: 'templates/lib/stripe/config.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/stripe/types.ts',
      template: 'templates/lib/stripe/types.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/stripe/errors.ts',
      template: 'templates/lib/stripe/errors.ts.tpl',
    },
  ];
}

// ============================================================================
// ORGANIZATION BILLING ACTIONS
// ============================================================================

function generateOrganizationBillingActions(): BlueprintAction[] {
  return [
    // Database schema
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/db/schema/organization-billing.ts',
      template: 'templates/lib/db/schema/organization-billing.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/db/migrations/001_organization_billing.sql',
      template: 'templates/lib/db/migrations/001_organization_billing.sql.tpl',
    },
    
    // Server-side services
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/services/org-billing.ts',
      template: 'templates/lib/services/org-billing.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/services/permissions.ts',
      template: 'templates/lib/services/permissions.ts.tpl',
    },
    
    // API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api}}/organizations/[orgId]/subscriptions/route.ts',
      template: 'templates/api/organizations/[orgId]/subscriptions/route.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api}}/organizations/[orgId]/billing/route.ts',
      template: 'templates/api/organizations/[orgId]/billing/route.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api}}/organizations/[orgId]/invoices/route.ts',
      template: 'templates/api/organizations/[orgId]/invoices/route.ts.tpl',
    },
  ];
}

// ============================================================================
// SEAT MANAGEMENT ACTIONS
// ============================================================================

function generateSeatManagementActions(): BlueprintAction[] {
  return [
    // Server-side services
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/services/seats.ts',
      template: 'templates/lib/services/seats.ts.tpl',
    },
    
    // API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api}}/organizations/[orgId]/seats/route.ts',
      template: 'templates/api/organizations/[orgId]/seats/route.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api}}/organizations/[orgId]/seats/history/route.ts',
      template: 'templates/api/organizations/[orgId]/seats/history/route.ts.tpl',
    },
  ];
}

// ============================================================================
// USAGE TRACKING ACTIONS
// ============================================================================

function generateUsageTrackingActions(): BlueprintAction[] {
  return [
    // Server-side services
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/services/usage.ts',
      template: 'templates/lib/services/usage.ts.tpl',
    },
    
    // API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api}}/organizations/[orgId]/usage/route.ts',
      template: 'templates/api/organizations/[orgId]/usage/route.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api}}/organizations/[orgId]/teams/[teamId]/usage/route.ts',
      template: 'templates/api/organizations/[orgId]/teams/[teamId]/usage/route.ts.tpl',
    },
  ];
}

// ============================================================================
// WEBHOOK ACTIONS
// ============================================================================

function generateWebhookActions(): BlueprintAction[] {
  return [
    // Webhook handling
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}/stripe/webhooks.ts',
      template: 'templates/lib/stripe/webhooks.ts.tpl',
    },
    
    // API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api}}/webhooks/stripe/route.ts',
      template: 'templates/api/webhooks/stripe/route.ts.tpl',
    },
  ];
}
