import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'emailing-backend-resend-nextjs',
  name: 'Email Capability (Resend + NextJS)',
  description: 'Complete email sending backend with Resend and NextJS, providing IEmailService.',
  version: '2.0.0',
  actions: [
    // Create the main EmailService that implements IEmailService
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}services/EmailService.ts',
      template: 'templates/EmailService.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create email service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/api.ts',
      template: 'templates/email-api.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create email API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/email/send/route.ts',
      template: 'templates/api-send-email-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/email/templates/route.ts',
      template: 'templates/api-email-templates-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/email/campaigns/route.ts',
      template: 'templates/api-email-campaigns-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/email/analytics/route.ts',
      template: 'templates/api-email-analytics-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};

export default blueprint;