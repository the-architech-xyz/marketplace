/**
 * Email Configuration - Next.js Connector
 * 
 * Re-exports base Resend client from adapter.
 * The adapter provides the configured client, we just re-export for convenience
 * and add Next.js specific configuration.
 */

// Import base Resend client from adapter
import { resendClient } from '@/lib/email/resend-client';

// Re-export as 'resend' for convenience
export const resend = resendClient;

// Email configuration (connector-specific)
export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || '<%= module.parameters.fromEmail %>',
  replyTo: process.env.EMAIL_REPLY_TO || 'support@<%= project.name %>.com',
  baseUrl: process.env.APP_URL || '<%= env.APP_URL %>',
};

// Email templates (connector-specific)
export const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Welcome to <%= project.name %>!',
    template: 'welcome',
  },
  passwordReset: {
    subject: 'Reset your password',
    template: 'password-reset',
  },
  emailVerification: {
    subject: 'Verify your email address',
    template: 'email-verification',
  },
  paymentConfirmation: {
    subject: 'Payment confirmed',
    template: 'payment-confirmation',
  },
  subscriptionCreated: {
    subject: 'Subscription activated',
    template: 'subscription-created',
  },
  subscriptionCancelled: {
    subject: 'Subscription cancelled',
    template: 'subscription-cancelled',
  },
};

// Email types (connector-specific)
export interface EmailData {
  to: string | string[];
  subject: string;
  template: string;
  data: Record<string, unknown>;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}`,
    },
    {
