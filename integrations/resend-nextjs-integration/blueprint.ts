import { Blueprint } from '@thearchitech.xyz/types';

const resendNextjsIntegrationBlueprint: Blueprint = {
  id: 'resend-nextjs-integration',
  name: 'Resend Next.js Integration',
  description: 'Complete email service integration with Next.js using Resend API and standardized TanStack Query hooks',
  version: '2.0.0',
  actions: [
    // Create standardized email hooks (REVOLUTIONARY!)
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-send-email.ts',
      template: 'templates/use-send-email.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-email-templates.ts',
      template: 'templates/use-email-templates.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-email-analytics.ts',
      template: 'templates/use-email-analytics.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-email-webhooks.ts',
      template: 'templates/use-email-webhooks.ts.tpl'
    },
    // Create Email API service layer
    {
      type: 'CREATE_FILE',
      path: 'src/lib/email/api.ts',
      template: 'templates/email-api.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/email/types.ts',
      template: 'templates/email-types.ts.tpl'
    },
    // Create Email API Routes
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/email/send/route.ts',
      template: 'templates/send-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/email/templates/route.ts',
      template: 'templates/templates-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/email/analytics/route.ts',
      template: 'templates/analytics-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/email/webhook/route.ts',
      template: 'templates/webhook-route.ts.tpl'
    },
    // Create Email Utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/email/resend.ts',
      template: 'templates/resend.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/email/templates.ts',
      template: 'templates/templates.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/email/analytics.ts',
      template: 'templates/analytics.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/email/validation.ts',
      template: 'templates/validation.ts.tpl'
    },
    // Create Middleware
    {
      type: 'CREATE_FILE',
      path: 'src/middleware.ts',
      template: 'templates/middleware.ts.tpl'
    },
    // Install Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'resend',
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'nodemailer',
        'handlebars'
      ],
      isDev: false
    },
    // Add Environment Variables
    {
      type: 'ADD_ENV_VAR',
      key: 'RESEND_API_KEY',
      value: '',
      description: 'Resend API key for email service'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'RESEND_FROM_EMAIL',
      value: 'noreply@yourdomain.com',
      description: 'Default from email address'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'RESEND_WEBHOOK_SECRET',
      value: '',
      description: 'Webhook secret for Resend events'
    },
    // Add Email Scripts
    {
      type: 'ADD_SCRIPT',
      name: 'email:test',
      command: 'node scripts/test-email.js',
    },
    {
      type: 'ADD_SCRIPT',
      name: 'email:template:generate',
      command: 'node scripts/generate-templates.js',
    }
  ]
};

export default resendNextjsIntegrationBlueprint;