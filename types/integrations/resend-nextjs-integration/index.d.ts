/**
 * Resend Next.js Integration
 * 
 * Complete Resend email integration for Next.js applications with API routes, middleware, and email templates
 */

export interface ResendNextjsIntegrationParams {

  /** Next.js API routes for email sending and management */
  apiRoutes: boolean;

  /** Resend webhook handlers for email events */
  webhooks: boolean;

  /** React-based email templates with preview */
  templates: boolean;

  /** Email analytics and tracking dashboard */
  analytics: boolean;

  /** Bulk email sending and campaign management */
  batchSending: boolean;

  /** Email rate limiting and security middleware */
  middleware: boolean;

  /** Email management admin interface */
  adminPanel: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ResendNextjsIntegrationArtifacts: {
  creates: [
    'src/hooks/use-send-email.ts',
    'src/hooks/use-email-templates.ts',
    'src/hooks/use-email-analytics.ts',
    'src/hooks/use-email-webhooks.ts',
    'src/lib/email/api.ts',
    'src/lib/email/types.ts',
    'src/app/api/email/send/route.ts',
    'src/app/api/email/templates/route.ts',
    'src/app/api/email/analytics/route.ts',
    'src/app/api/email/webhook/route.ts',
    'src/lib/email/resend.ts',
    'src/lib/email/templates.ts',
    'src/lib/email/analytics.ts',
    'src/lib/email/validation.ts',
    'src/middleware.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['resend', 'react-hook-form', '@hookform/resolvers', 'zod', 'nodemailer', 'handlebars'], isDev: false }
  ],
  envVars: [
    { key: 'RESEND_API_KEY', value: '', description: 'Resend API key for email service' },
    { key: 'RESEND_FROM_EMAIL', value: 'noreply@yourdomain.com', description: 'Default from email address' },
    { key: 'RESEND_WEBHOOK_SECRET', value: '', description: 'Webhook secret for Resend events' }
  ]
};

// Type-safe artifact access
export type ResendNextjsIntegrationCreates = typeof ResendNextjsIntegrationArtifacts.creates[number];
export type ResendNextjsIntegrationEnhances = typeof ResendNextjsIntegrationArtifacts.enhances[number];
