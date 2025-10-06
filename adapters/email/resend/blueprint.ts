/**
 * Resend Base Blueprint
 * 
 * Sets up Resend with minimal configuration
 * Advanced features are available as separate features
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const resendBlueprint: Blueprint = {
  id: 'resend-base-setup',
  name: 'Resend Base Setup',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['resend', '@react-email/components']
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.email_config}}/config.ts',
      template: 'templates/config.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.email_config}}/sender.ts',
      template: 'templates/sender.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.email_config}}/templates/welcome-email.tsx',
      template: 'templates/templates/welcome-email.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.email_config}}/templates/password-reset-email.tsx',
      template: 'templates/templates/password-reset-email.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.email_config}}/templates/email-verification-email.tsx',
      template: 'templates/templates/email-verification-email.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.email_config}}/templates/payment-confirmation-email.tsx',
      template: 'templates/templates/payment-confirmation-email.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.email_config}}/templates/subscription-created-email.tsx',
      template: 'templates/templates/subscription-created-email.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.email_config}}/templates/subscription-cancelled-email.tsx',
      template: 'templates/templates/subscription-cancelled-email.tsx.tpl'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'RESEND_API_KEY',
      value: 're_123456789',
      description: 'Resend API key for sending emails'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'EMAIL_FROM',
      value: 'noreply@{{project.name}}.com',
      description: 'Default from email address'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'EMAIL_REPLY_TO',
      value: 'support@{{project.name}}.com',
      description: 'Default reply-to email address'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'APP_URL',
      value: 'http://localhost:3000',
      description: 'Application URL for email links'
    }
  ]
};