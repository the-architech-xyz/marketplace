import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

/**
 * Dynamic Auth UI Feature Blueprint
 * 
 * Generates authentication UI components based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/auth/frontend/shadcn'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // ============================================================================
  // FRONTEND-SPECIFIC IMPLEMENTATION
  // ============================================================================
  // Note: Technology stack layer is automatically included by the CLI
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (features.passwordReset) {
    actions.push(...generatePasswordResetActions());
  }
  
  if (features.mfa) {
    actions.push(...generateMFAActions());
  }
  
  if (features.socialLogins) {
    actions.push(...generateSocialLoginsActions());
  }
  
  if (features.profileManagement) {
    actions.push(...generateProfileManagementActions());
  }
  
  if (features.accountSettingsPage) {
    actions.push(...generateAccountSettingsPageActions());
  }
  
  return actions;
}

// ============================================================================
// CORE AUTH FEATURES (Always Generated)
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    // Install auth packages + tech stack dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        // Auth specific packages
        'better-auth',
        'react-hook-form',
        '@hookform/resolvers',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge'
      ]
    },
    // Auth Pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}(auth)/login/page.tsx',
      template: 'templates/login-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}(auth)/signup/page.tsx',
      template: 'templates/signup-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}(auth)/profile/page.tsx',
      template: 'templates/profile-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Core Auth Components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/AuthForm.tsx',
      template: 'templates/AuthForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/LoginForm.tsx',
      template: 'templates/LoginForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/SignupForm.tsx',
      template: 'templates/SignupForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/UserProfile.tsx',
      template: 'templates/UserProfile.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/AuthGuard.tsx',
      template: 'templates/AuthGuard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Auth Layouts
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}layouts/AuthLayout.tsx',
      template: 'templates/AuthLayout.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}layouts/DashboardLayout.tsx',
      template: 'templates/DashboardLayout.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Auth Utils & Hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}utils/auth-utils.ts',
      template: 'templates/auth-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
    // ℹ️ Auth hooks are provided by Better Auth adapter (native SDK hooks)
    // No wrapper hooks needed - frontend uses authClient directly
  ];
}

// ============================================================================
// PASSWORD RESET FEATURES (Optional)
// ============================================================================

function generatePasswordResetActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}(auth)/forgot-password/page.tsx',
      template: 'templates/forgot-password-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}(auth)/reset-password/page.tsx',
      template: 'templates/reset-password-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    // ℹ️ Password reset is handled by Better Auth native API
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/ForgotPasswordForm.tsx',
      template: 'templates/ForgotPasswordForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/ResetPasswordForm.tsx',
      template: 'templates/ResetPasswordForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

// ============================================================================
// MFA FEATURES (Optional)
// ============================================================================

function generateMFAActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/TwoFactorSetup.tsx',
      template: 'templates/TwoFactorSetup.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/EmailVerification.tsx',
      template: 'templates/EmailVerification.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
    // NOTE: use-two-factor hook is provided by tech-stack layer
  ];
}

// ============================================================================
// SOCIAL LOGINS FEATURES (Optional)
// ============================================================================

function generateSocialLoginsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/ConnectedAccounts.tsx',
      template: 'templates/ConnectedAccounts.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

// ============================================================================
// PROFILE MANAGEMENT FEATURES (Optional)
// ============================================================================

function generateProfileManagementActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/ProfileManager.tsx',
      template: 'templates/ProfileManager.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
    // NOTE: use-profile hook is provided by tech-stack layer
  ];
}

// ============================================================================
// ACCOUNT SETTINGS PAGE FEATURES (Optional)
// ============================================================================

function generateAccountSettingsPageActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}(auth)/settings/page.tsx',
      template: 'templates/settings-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/AccountSettings.tsx',
      template: 'templates/AccountSettings.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}auth/SecuritySettings.tsx',
      template: 'templates/SecuritySettings.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}