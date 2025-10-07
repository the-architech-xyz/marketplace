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
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type EmailResendCreates = typeof EmailResendArtifacts.creates[number];
export type EmailResendEnhances = typeof EmailResendArtifacts.enhances[number];
