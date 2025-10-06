import { Blueprint, BlueprintActionType, ModifierType } from '@thearchitech.xyz/types';

const resendShadcnIntegrationBlueprint: Blueprint = {
  id: 'resend-shadcn-integration',
  name: 'Resend Shadcn Integration',
  description: 'Technical bridge connecting Resend and Shadcn/ui - configures Tailwind and provides email utilities',
  version: '2.0.0',
  actions: [
    // Configure Tailwind for email components
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'tailwind.config.js',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        wrapperFunction: 'withEmailConfig',
        wrapperImport: {
          name: 'withEmailConfig',
          from: './lib/email/tailwind-config',
          isDefault: false
        },
        wrapperOptions: {
          emailStyles: true,
          emailUtilities: true
        }
      }
    },
    // Create email-specific Tailwind configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/email/tailwind-config.ts',
      template: 'templates/tailwind-config.ts.tpl'
    },
    // Create email utility functions
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/email/utils.ts',
      template: 'templates/email-utils.ts.tpl'
    },
    // Create email component utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/email/component-utils.ts',
      template: 'templates/component-utils.ts.tpl'
    },
    // Create email styling constants
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/email/styles.ts',
      template: 'templates/email-styles.ts.tpl'
    }
  ]
};

export default resendShadcnIntegrationBlueprint;