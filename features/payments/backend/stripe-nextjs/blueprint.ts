/**
 * Stripe NextJS Drizzle Connector Blueprint
 * 
 * Generates server-side API routes for Stripe payments with organization billing
 * using NextJS and Drizzle ORM.
 */

import { BlueprintAction, BlueprintActionType } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/payment/stripe-nextjs-drizzle'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Install required packages
  actions.push({ // TODO: find out why
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['@paralleldrive/cuid2']
  });
  
  // Core Stripe setup
  actions.push(...generateCoreActions());
  
  // Organization billing features
  if (features.organizationBilling) {
    actions.push(...generateOrganizationBillingActions());
  }
  
  // Seat management features
  if (features.seatManagement) {
    actions.push(...generateSeatManagementActions());
  }
  
  // Usage tracking features
  if (features.usageTracking) {
    actions.push(...generateUsageTrackingActions());
  }
  
  // Webhook handling
  if (features.webhooks) {
    actions.push(...generateWebhookActions());
  }
  
  return actions;
}

// ============================================================================
// CORE STRIPE SETUP
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    // NOTE: No package installation needed - adapter handles 'stripe' package
    // We only add Next.js + Drizzle specific configuration and API routes
    
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/stripe/server.ts',
      template: 'templates/lib/stripe/server.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/stripe/config.ts',
      template: 'templates/lib/stripe/config.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/stripe/types.ts',
      template: 'templates/lib/stripe/types.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/stripe/errors.ts',
      template: 'templates/lib/stripe/errors.ts.tpl',
    },
    
    // PHASE 1 ENHANCEMENT: Idempotency key helpers
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/stripe/idempotency.ts',
      template: 'templates/lib/stripe/idempotency.ts.tpl',
    },
    
    // Main service object (required for contract validation)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/modules/index.ts',
      template: 'templates/lib/modules/index.ts.tpl',
    },
  ];
}

// ============================================================================
// ORGANIZATION BILLING ACTIONS
// ============================================================================

function generateOrganizationBillingActions(): BlueprintAction[] {
  return [
    // NOTE: Database schema is now in features/payments/database/drizzle/
    // No longer generated here - managed by database layer
    
    // Server-side modules
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/modules/org-billing.ts',
      template: 'templates/lib/modules/org-billing.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/modules/permissions.ts',
      template: 'templates/lib/modules/permissions.ts.tpl',
    },
    
    // API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}organizations/[orgId]/subscriptions/route.ts',
      template: 'templates/api/organizations/[orgId]/subscriptions/route.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}organizations/[orgId]/billing/route.ts',
      template: 'templates/api/organizations/[orgId]/billing/route.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}organizations/[orgId]/invoices/route.ts',
      template: 'templates/api/organizations/[orgId]/invoices/route.ts.tpl',
    },
    
    // PHASE 1 ENHANCEMENT: Billing Portal API route
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}organizations/[orgId]/billing/portal/route.ts',
      template: 'templates/api/organizations/[orgId]/billing/portal/route.ts.tpl',
    },
  ];
}

// ============================================================================
// SEAT MANAGEMENT ACTIONS
// ============================================================================

function generateSeatManagementActions(): BlueprintAction[] {
  return [
    // Server-side modules
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/modules/seats.ts',
      template: 'templates/lib/modules/seats.ts.tpl',
    },
    
    // API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}organizations/[orgId]/seats/route.ts',
      template: 'templates/api/organizations/[orgId]/seats/route.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}organizations/[orgId]/seats/history/route.ts',
      template: 'templates/api/organizations/[orgId]/seats/history/route.ts.tpl',
    },
  ];
}

// ============================================================================
// USAGE TRACKING ACTIONS
// ============================================================================

function generateUsageTrackingActions(): BlueprintAction[] {
  return [
    // Server-side modules
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/modules/usage.ts',
      template: 'templates/lib/modules/usage.ts.tpl',
    },
    
    // API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}organizations/[orgId]/usage/route.ts',
      template: 'templates/api/organizations/[orgId]/usage/route.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}organizations/[orgId]/teams/[teamId]/usage/route.ts',
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
      path: '${paths.lib}/stripe/webhooks.ts',
      template: 'templates/lib/stripe/webhooks.ts.tpl',
    },
    
    // API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}webhooks/stripe/route.ts',
      template: 'templates/api/webhooks/stripe/route.ts.tpl',
    },
  ];
}
