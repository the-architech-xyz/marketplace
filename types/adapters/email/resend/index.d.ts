/**
 * Resend Email Service
 * 
 * Modern email API for transactional emails with Resend
 */

export interface EmailResendParams {

  /** Resend API key */
  apiKey: string;

  /** Default from email address */
  fromEmail: string;

  /** Enable webhook handling */
  webhooks?: boolean;

  /** Enable email analytics */
  analytics?: boolean;
}

export interface EmailResendFeatures {}

// 🚀 Auto-discovered artifacts
export declare const EmailResendArtifacts: {
  creates: [
    '{{paths.email_config}}/config.ts',
    '{{paths.email_config}}/sender.ts',
    '{{paths.email_config}}/templates/welcome-email.tsx',
    '{{paths.email_config}}/templates/password-reset-email.tsx',
    '{{paths.email_config}}/templates/email-verification-email.tsx',
    '{{paths.email_config}}/templates/payment-confirmation-email.tsx',
    '{{paths.email_config}}/templates/subscription-created-email.tsx',
    '{{paths.email_config}}/templates/subscription-cancelled-email.tsx'
  ],
  enhances: [],
  installs: [
    { packages: ['resend', '@react-email/components'], isDev: false }
  ],
  envVars: [
    { key: 'RESEND_API_KEY', value: 're_123456789', description: 'Resend API key for sending emails' },
    { key: 'EMAIL_FROM', value: 'noreply@{{project.name}}.com', description: 'Default from email address' },
    { key: 'EMAIL_REPLY_TO', value: 'support@{{project.name}}.com', description: 'Default reply-to email address' },
    { key: 'APP_URL', value: 'http://localhost:3000', description: 'Application URL for email links' }
  ]
};

// Type-safe artifact access
export type EmailResendCreates = typeof EmailResendArtifacts.creates[number];
export type EmailResendEnhances = typeof EmailResendArtifacts.enhances[number];
