import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const blueprint: Blueprint = {
  id: 'feature:auth/shadcn',
  name: 'Authentication Feature (Shadcn)',
  description: 'Complete authentication solution with beautiful UI using Shadcn components',
  version: '1.0.0',
  actions: [
    // Auth Pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(auth)/login/page.tsx',
      template: 'templates/login-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(auth)/signup/page.tsx',
      template: 'templates/signup-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(auth)/forgot-password/page.tsx',
      template: 'templates/forgot-password-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(auth)/reset-password/page.tsx',
      template: 'templates/reset-password-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(auth)/verify-email/page.tsx',
      template: 'templates/verify-email-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/profile/page.tsx',
      template: 'templates/profile-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/settings/page.tsx',
      template: 'templates/settings-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Auth Components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/AuthForm.tsx',
      template: 'templates/AuthForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/LoginForm.tsx',
      template: 'templates/LoginForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/SignupForm.tsx',
      template: 'templates/SignupForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/ForgotPasswordForm.tsx',
      template: 'templates/ForgotPasswordForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/ResetPasswordForm.tsx',
      template: 'templates/ResetPasswordForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/UserProfile.tsx',
      template: 'templates/UserProfile.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/ProfileManager.tsx',
      template: 'templates/ProfileManager.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/AccountSettings.tsx',
      template: 'templates/AccountSettings.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/SecuritySettings.tsx',
      template: 'templates/SecuritySettings.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/ConnectedAccounts.tsx',
      template: 'templates/ConnectedAccounts.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/AuthGuard.tsx',
      template: 'templates/AuthGuard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/ProtectedRoute.tsx',
      template: 'templates/ProtectedRoute.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/TwoFactorSetup.tsx',
      template: 'templates/TwoFactorSetup.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}auth/EmailVerification.tsx',
      template: 'templates/EmailVerification.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Auth Layouts
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}layouts/AuthLayout.tsx',
      template: 'templates/AuthLayout.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}layouts/DashboardLayout.tsx',
      template: 'templates/DashboardLayout.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Auth Hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}hooks/use-auth.ts',
      template: 'templates/use-auth.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}hooks/use-profile.ts',
      template: 'templates/use-profile.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}hooks/use-two-factor.ts',
      template: 'templates/use-two-factor.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Auth Types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}types/auth.ts',
      template: 'templates/auth-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Auth Utils
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}utils/auth-utils.ts',
      template: 'templates/auth-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};