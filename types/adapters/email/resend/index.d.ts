/**
 * Resend Email Service
 * 
 * Modern email API for transactional emails with Resend
 */

export interface EmailResendParams {

  /** Resend API key */
  apiKey?: string;

  /** Default from email address */
  fromEmail?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential email functionality (sending, basic templates) */
    core?: boolean;

    /** Advanced email template system */
    templates?: boolean;

    /** Email analytics and tracking */
    analytics?: boolean;

    /** Batch sending and campaign management */
    campaigns?: boolean;
  };
}

export interface EmailResendFeatures {

  /** Essential email functionality (sending, basic templates) */
  core: boolean;

  /** Advanced email template system */
  templates: boolean;

  /** Email analytics and tracking */
  analytics: boolean;

  /** Batch sending and campaign management */
  campaigns: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const EmailResendArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type EmailResendCreates = typeof EmailResendArtifacts.creates[number];
export type EmailResendEnhances = typeof EmailResendArtifacts.enhances[number];
