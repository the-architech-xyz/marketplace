/**
 * Resend Shadcn Integration
 * 
 * Beautiful email UI components using Shadcn/ui for Resend email management
 */

export interface ResendShadcnIntegrationParams {

  /** Simple email sending form with validation */
  basicEmail: boolean;

  /** Advanced template system with variables and logic */
  emailTemplates: boolean;

  /** Rich text email composer with template support */
  emailComposer: boolean;

  /** Email configuration and preferences interface */
  emailSettings: boolean;

  /** Campaign creation and management interface */
  emailCampaigns: boolean;

  /** Email list management and subscriber interface */
  emailList: boolean;

  /** Email performance tracking and analytics dashboard */
  emailAnalytics: boolean;

  /** Schedule emails for future delivery */
  emailScheduling: boolean;

  /** Automated email workflows and triggers */
  emailAutomation: boolean;

  /** Advanced audience segmentation and targeting */
  emailSegmentation: boolean;

  /** Dynamic content and personalization features */
  emailPersonalization: boolean;

  /** A/B testing and email preview tools */
  emailTesting: boolean;

  /** GDPR, CAN-SPAM compliance tools and features */
  emailCompliance: boolean;

  /** Webhook handling for email events */
  emailWebhooks: boolean;

  /** Batch email sending and processing */
  emailBatching: boolean;

  /** File attachment support and management */
  emailAttachments: boolean;

  /** Open rates, click tracking, and engagement metrics */
  emailTracking: boolean;

  /** WCAG AA compliant email components */
  accessibility: boolean;

  /** Custom theming and branding support */
  theming: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ResendShadcnIntegrationArtifacts: {
  creates: [
    'src/components/email/EmailComposer.tsx',
    'src/components/email/EmailTemplateEditor.tsx',
    'src/components/email/EmailAnalytics.tsx',
    'src/components/email/EmailList.tsx',
    'src/components/email/EmailPreview.tsx'
  ],
  enhances: [],
  installs: [
    { packages: ['resend', 'react-hook-form', '@hookform/resolvers', 'zod', 'monaco-editor', 'html-to-text'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type ResendShadcnIntegrationCreates = typeof ResendShadcnIntegrationArtifacts.creates[number];
export type ResendShadcnIntegrationEnhances = typeof ResendShadcnIntegrationArtifacts.enhances[number];
