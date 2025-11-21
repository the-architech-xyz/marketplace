import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic Auth UI Feature Blueprint
 * 
 * Generates authentication UI components based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 * Uses UI marketplace templates via convention-based loading (`ui/...` prefix)
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
    // Auth Pages - Generate directly in app directory (Next.js routes)
    // Routes should be in apps/web/src/app/, not in packages/shared
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.frontend.app}(auth)/login/page.tsx',
      template: 'ui/auth/LoginPage.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.frontend.app}(auth)/signup/page.tsx',
      template: 'ui/auth/SignupPage.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.frontend.app}(auth)/profile/page.tsx',
      template: 'ui/auth/ProfilePage.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Core Auth Components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/AuthForm.tsx',
      template: 'ui/auth/AuthForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/LoginForm.tsx',
      template: 'ui/auth/LoginForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/SignupForm.tsx',
      template: 'ui/auth/SignupForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/UserProfile.tsx',
      template: 'ui/auth/UserProfile.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/AuthGuard.tsx',
      template: 'ui/auth/AuthGuard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Auth Layouts
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}layouts/AuthLayout.tsx',
      template: 'ui/auth/AuthLayout.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}layouts/DashboardLayout.tsx',
      template: 'ui/auth/DashboardLayout.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Auth Utils & Hooks
    // Use packages.auth.src (from recipe book targetPackage: "auth")
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.auth.src}utils/auth-utils.ts',
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
      path: '${paths.apps.frontend.app}(auth)/forgot-password/page.tsx',
      template: 'ui/auth/ForgotPasswordPage.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.frontend.app}(auth)/reset-password/page.tsx',
      template: 'ui/auth/ResetPasswordPage.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    // ℹ️ Password reset is handled by Better Auth native API
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/ForgotPasswordForm.tsx',
      template: 'ui/auth/ForgotPasswordForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/ResetPasswordForm.tsx',
      template: 'ui/auth/ResetPasswordForm.tsx.tpl',
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
      path: '${paths.apps.web.components}auth/TwoFactorSetup.tsx',
      template: 'ui/auth/TwoFactorSetup.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/EmailVerification.tsx',
      template: 'ui/auth/EmailVerification.tsx.tpl',
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
      path: '${paths.apps.web.components}auth/ConnectedAccounts.tsx',
      template: 'ui/auth/ConnectedAccounts.tsx.tpl',
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
      path: '${paths.apps.web.components}auth/ProfileManager.tsx',
      template: 'ui/auth/ProfileManager.tsx.tpl',
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
      path: '${paths.apps.frontend.app}(auth)/settings/page.tsx',
      template: 'ui/auth/SettingsPage.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/AccountSettings.tsx',
      template: 'ui/auth/AccountSettings.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}auth/SecuritySettings.tsx',
      template: 'ui/auth/SecuritySettings.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}