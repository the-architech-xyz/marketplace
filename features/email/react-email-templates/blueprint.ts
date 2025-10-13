import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * React Email Templates Feature Blueprint
 * 
 * Provides React-based email templates that compile to HTML strings.
 * These templates are provider-agnostic and can be used with any email adapter.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/email/react-email-templates'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);
  
  // Core templates are always generated
  actions.push(...generateCoreActions(config));
  
  // Optional template sets based on schema parameters
  if (features.auth) {
    actions.push(...generateAuthActions());
  }
  
  if (features.payments) {
    actions.push(...generatePaymentsActions());
  }
  
  if (features.organizations) {
    actions.push(...generateOrganizationsActions());
  }
  
  return actions;
}

// ============================================================================
// CORE TEMPLATES (Always Generated)
// ============================================================================

function generateCoreActions(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Install React Email dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['react', '@react-email/components', '@react-email/render']
    },
    
    // Template renderer (compiles React to HTML)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/templates/render-template.ts',
      template: 'templates/render-template.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Template registry
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/templates/template-registry.ts',
      template: 'templates/template-registry.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Template types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/templates/template-types.ts',
      template: 'templates/template-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Welcome email template
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/templates/welcome-email.tsx',
      template: 'templates/templates/welcome-email.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Generic notification email template
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/templates/notification-email.tsx',
      template: 'templates/templates/notification-email.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// AUTH TEMPLATES (Optional)
// ============================================================================

function generateAuthActions(): BlueprintAction[] {
  return [
    // Password reset email
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "{{paths.shared_library}}email/templates/password-reset-email.tsx",
      template: "templates/templates/password-reset-email.tsx.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2,
      },
    },

    // Email verification email
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "{{paths.shared_library}}email/templates/email-verification-email.tsx",
      template: "templates/templates/email-verification-email.tsx.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2,
      },
    },

    // Magic link email
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "{{paths.shared_library}}email/templates/magic-link-email.tsx",
      template: "templates/templates/magic-link-email.tsx.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2,
      },
    },

    // Two-factor authentication setup email
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "{{paths.shared_library}}email/templates/two-factor-setup-email.tsx",
      template: "templates/templates/two-factor-setup-email.tsx.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2,
      },
    },
  ];
}

// ============================================================================
// PAYMENTS TEMPLATES (Optional)
// ============================================================================

function generatePaymentsActions(): BlueprintAction[] {
  return [
    // Payment confirmation email
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/templates/payment-confirmation-email.tsx',
      template: 'templates/templates/payment-confirmation-email.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Subscription created email
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/templates/subscription-created-email.tsx',
      template: 'templates/templates/subscription-created-email.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Subscription cancelled email
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/templates/subscription-cancelled-email.tsx',
      template: 'templates/templates/subscription-cancelled-email.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

// ============================================================================
// ORGANIZATIONS TEMPLATES (Optional)
// ============================================================================

function generateOrganizationsActions(): BlueprintAction[] {
  return [
    // Organization invitation email
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/templates/organization-invitation-email.tsx',
      template: 'templates/templates/organization-invitation-email.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}
