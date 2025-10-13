import React from 'react';
import type { TemplateContext } from './template-types';

// Import all email templates
import { WelcomeEmail } from './welcome-email';
import { NotificationEmail } from './notification-email';
<% if (features.auth) { %>
import { PasswordResetEmail } from './password-reset-email';
import { EmailVerificationEmail } from './email-verification-email';
import { MagicLinkEmail } from './magic-link-email';
import { TwoFactorSetupEmail } from './two-factor-setup-email';
<% } %>
<% if (features.payments) { %>
import { PaymentConfirmationEmail } from './payment-confirmation-email';
import { SubscriptionCreatedEmail } from './subscription-created-email';
import { SubscriptionCancelledEmail } from './subscription-cancelled-email';
<% } %>
<% if (features.organizations) { %>
import { OrganizationInvitationEmail } from './organization-invitation-email';
<% } %>

/**
 * Email Template Registry
 * 
 * Central registry of all available email templates.
 * Maps template names to React components.
 */

export type TemplateComponent = (props: TemplateContext) => React.ReactElement;

/**
 * Template registry map
 */
export const TEMPLATE_REGISTRY: Record<string, TemplateComponent> = {
  // Core templates
  'welcome': WelcomeEmail,
  'notification': NotificationEmail,
  
  <% if (features.auth) { %>
  // Authentication templates
  'password-reset': PasswordResetEmail,
  'email-verification': EmailVerificationEmail,
  'magic-link': MagicLinkEmail,
  'two-factor-setup': TwoFactorSetupEmail,
  <% } %>
  
  <% if (features.payments) { %>
  // Payment templates
  'payment-confirmation': PaymentConfirmationEmail,
  'subscription-created': SubscriptionCreatedEmail,
  'subscription-cancelled': SubscriptionCancelledEmail,
  <% } %>
  
  <% if (features.organizations) { %>
  // Organization templates
  'organization-invitation': OrganizationInvitationEmail,
  <% } %>
};

/**
 * Get template component by name
 * 
 * @param templateName - Name of the template
 * @returns Template component or null if not found
 */
export function getTemplateComponent(templateName: string): TemplateComponent | null {
  return TEMPLATE_REGISTRY[templateName] || null;
}

/**
 * Get all available template names
 * 
 * @returns Array of template names
 */
export function getAvailableTemplates(): string[] {
  return Object.keys(TEMPLATE_REGISTRY);
}

/**
 * Check if template exists
 * 
 * @param templateName - Name of the template
 * @returns True if template exists
 */
export function hasTemplate(templateName: string): boolean {
  return templateName in TEMPLATE_REGISTRY;
}

/**
 * Register custom template
 * Allows runtime registration of custom templates
 * 
 * @param templateName - Name of the template
 * @param component - Template component
 */
export function registerTemplate(
  templateName: string,
  component: TemplateComponent
): void {
  if (TEMPLATE_REGISTRY[templateName]) {
    console.warn(`[Email Templates] Overwriting existing template: ${templateName}`);
  }
  
  TEMPLATE_REGISTRY[templateName] = component;
}

