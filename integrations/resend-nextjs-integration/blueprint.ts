import { Blueprint } from '@thearchitech.xyz/types';

const resendNextjsIntegrationBlueprint: Blueprint = {
  id: 'resend-nextjs-integration',
  name: 'Resend Next.js Integration',
  description: 'Complete email service integration with Next.js using Resend API for transactional emails, templates, and analytics',
  version: '1.0.0',
  actions: [
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
    // Create Email Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailForm.tsx',
      template: 'templates/EmailForm.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailTemplate.tsx',
      template: 'templates/EmailTemplate.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/email/EmailAnalytics.tsx',
      template: 'templates/EmailAnalytics.tsx.tpl'
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
      description: 'Test email functionality'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'email:template:generate',
      command: 'node scripts/generate-templates.js',
      description: 'Generate email templates'
    }
  ]
};

export default resendNextjsIntegrationBlueprint;