/**
 * Email Template Types
 * 
 * Type definitions for email template rendering
 */

/**
 * Base template context
 * All templates receive these common properties
 */
export interface TemplateContext {
  /** Application name */
  appName?: string;
  
  /** Application URL */
  appUrl?: string;
  
  /** Primary brand color */
  brandColor?: string;
  
  /** Company logo URL */
  logo?: string;
  
  /** Additional context data (template-specific) */
  [key: string]: any;
}

/**
 * Template render result
 */
export interface RenderTemplateResult {
  /** Success status */
  success: boolean;
  
  /** Rendered HTML string */
  html?: string;
  
  /** Plain text version */
  text?: string;
  
  /** Error message if failed */
  error?: string;
}

/**
 * Welcome email context
 */
export interface WelcomeEmailContext extends TemplateContext {
  userName: string;
  dashboardUrl?: string;
}

/**
 * Notification email context
 */
export interface NotificationEmailContext extends TemplateContext {
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}

/**
 * Password reset email context
 */
export interface PasswordResetEmailContext extends TemplateContext {
  userName: string;
  resetUrl: string;
  expiresIn?: string;
}

/**
 * Email verification context
 */
export interface EmailVerificationEmailContext extends TemplateContext {
  userName: string;
  verificationUrl: string;
  expiresIn?: string;
}

/**
 * Magic link email context
 */
export interface MagicLinkEmailContext extends TemplateContext {
  userName: string;
  magicLinkUrl: string;
  expiresIn?: string;
}

/**
 * Two-factor setup email context
 */
export interface TwoFactorSetupEmailContext extends TemplateContext {
  userName: string;
  setupUrl?: string;
}

/**
 * Payment confirmation email context
 */
export interface PaymentConfirmationEmailContext extends TemplateContext {
  userName: string;
  amount: string;
  currency: string;
  paymentDate: string;
  receiptUrl?: string;
}

/**
 * Subscription created email context
 */
export interface SubscriptionCreatedEmailContext extends TemplateContext {
  userName: string;
  planName: string;
  amount: string;
  currency: string;
  billingCycle: string;
  startDate: string;
  manageUrl?: string;
}

/**
 * Subscription cancelled email context
 */
export interface SubscriptionCancelledEmailContext extends TemplateContext {
  userName: string;
  planName: string;
  endDate: string;
  reactivateUrl?: string;
}

/**
 * Organization invitation email context
 */
export interface OrganizationInvitationEmailContext extends TemplateContext {
  inviterName: string;
  organizationName: string;
  invitationUrl: string;
  expiresIn?: string;
}

