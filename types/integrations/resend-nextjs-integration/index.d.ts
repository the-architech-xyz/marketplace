/**
 * Resend Next.js Integration
 * 
 * Complete Resend email integration for Next.js applications with API routes, middleware, and email templates
 */

export interface ResendNextjsIntegrationParams {

  /** Next.js API routes for email sending and management */
  apiRoutes: boolean;

  /** Resend webhook handlers for email events */
  webhooks: boolean;

  /** React-based email templates with preview */
  templates: boolean;

  /** Email analytics and tracking dashboard */
  analytics: boolean;

  /** Bulk email sending and campaign management */
  batchSending: boolean;

  /** Email rate limiting and security middleware */
  middleware: boolean;

  /** Email management admin interface */
  adminPanel: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ResendNextjsIntegrationArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ResendNextjsIntegrationCreates = typeof ResendNextjsIntegrationArtifacts.creates[number];
export type ResendNextjsIntegrationEnhances = typeof ResendNextjsIntegrationArtifacts.enhances[number];
