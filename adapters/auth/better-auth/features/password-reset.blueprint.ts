/**
 * Better Auth Password Reset Feature
 * 
 * Adds secure password reset flow to Better Auth
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/marketplace/types';

const passwordResetBlueprint: Blueprint = {
  id: 'better-auth-password-reset',
  name: 'Better Auth Password Reset',
  actions: [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/auth/password-reset.ts',
      template: 'templates/password-reset.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/auth/PasswordResetForm.tsx',
      template: 'templates/password-reset-form.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/auth/reset-password/page.tsx',
      template: 'templates/password-reset-page.tsx.tpl'
    }
  ]
};

export default passwordResetBlueprint;