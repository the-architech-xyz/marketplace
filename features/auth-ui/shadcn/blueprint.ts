import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const authUiShadcnBlueprint: Blueprint = {
  id: 'auth-ui-shadcn',
  name: 'Authentication UI',
  description: 'Complete authentication UI components using Shadcn UI and Better Auth',
  version: '1.0.0',
  actions: [
    // Create auth components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/auth/LoginForm.tsx',
      template: 'templates/LoginForm.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/auth/RegisterForm.tsx',
      template: 'templates/RegisterForm.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/auth/ProfileButton.tsx',
      template: 'templates/ProfileButton.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/auth/AuthProvider.tsx',
      template: 'templates/AuthProvider.tsx.tpl'
    },
    // Create auth pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/auth/login/page.tsx',
      template: 'templates/login-page.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/auth/register/page.tsx',
      template: 'templates/register-page.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/profile/page.tsx',
      template: 'templates/profile-page.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/settings/page.tsx',
      template: 'templates/settings-page.tsx.tpl'
    },
    // Create auth hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/useAuth.ts',
      template: 'templates/useAuth.ts.tpl'
    },
    // Create auth utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth-utils.ts',
      template: 'templates/auth-utils.ts.tpl'
    },
    // Create auth types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/types/auth.ts',
      template: 'templates/auth-types.ts.tpl'
    }
  ]
};

export default authUiShadcnBlueprint;
