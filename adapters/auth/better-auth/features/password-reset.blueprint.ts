/**
 * Better Auth Password Reset Feature
 * 
 * Adds secure password reset flow to Better Auth
 */

import { Blueprint } from '@thearchitech.xyz/types';

const passwordResetBlueprint: Blueprint = {
  id: 'better-auth-password-reset',
  name: 'Better Auth Password Reset',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/auth/password-reset.ts',
      template: 'adapters/auth/better-auth/features/templates/password-reset.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/auth/PasswordResetForm.tsx',
      template: 'adapters/auth/better-auth/features/templates/password-reset-form.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/auth/reset-password/page.tsx',
      template: 'adapters/auth/better-auth/features/templates/password-reset-page.tsx.tpl'
    }
  ]
};

export default passwordResetBlueprint;