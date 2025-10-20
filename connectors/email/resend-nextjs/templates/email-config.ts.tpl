/**
 * Email Configuration
 * Tech-agnostic configuration for email sending
 */

export const EMAIL_CONFIG = {
  // Sender configuration
  from: process.env.EMAIL_FROM || 'noreply@<%= project.domain %>',
  replyTo: process.env.EMAIL_REPLY_TO || 'support@<%= project.domain %>',
  
  // Application configuration
  appName: '<%= project.name %>',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  
  // Email settings
  defaultSubject: 'Message from <%= project.name %>',
  
  // Resend-specific settings
  resend: {
    apiKey: process.env.RESEND_API_KEY,
    tags: process.env.RESEND_TAGS ? process.env.RESEND_TAGS.split(',') : [],
  }
};

/**
 * Get email sender address
 */
export function getEmailSender(): string {
  return EMAIL_CONFIG.from;
}

/**
 * Get reply-to address
 */
export function getReplyToAddress(): string {
  return EMAIL_CONFIG.replyTo;
}

/**
 * Get application URL
 */
export function getAppUrl(): string {
  return EMAIL_CONFIG.appUrl;
}

/**
 * Get application name
 */
export function getAppName(): string {
  return EMAIL_CONFIG.appName;
}

