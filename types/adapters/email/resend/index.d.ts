/**
     * Generated TypeScript definitions for Resend Email Service
     * Generated from: adapters/email/resend/adapter.json
     */

/**
     * Parameters for the Resend Email Service adapter
     */
export interface ResendEmailParams {
  /**
   * Resend API key
   */
  apiKey: string;
  /**
   * Default from email address
   */
  fromEmail: string;
  /**
   * Enable webhook handling
   */
  webhooks?: boolean;
  /**
   * Enable email analytics
   */
  analytics?: boolean;
}

/**
     * Features for the Resend Email Service adapter
     */
export interface ResendEmailFeatures {
  /**
   * Advanced email template system with React components
   */
  templates?: boolean;
  /**
   * Detailed email tracking, open rates, and click analytics
   */
  analytics?: boolean;
  /**
   * Bulk email sending, list management, and campaign tools
   */
  batch-sending?: boolean;
}
