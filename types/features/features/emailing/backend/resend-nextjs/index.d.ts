/**
 * Email Capability (Resend + NextJS)
 * 
 * Complete email sending backend with Resend and NextJS
 */

export interface FeaturesEmailingBackendResendNextjsParams {

  /** Bulk email sending capabilities */
  bulkEmail: boolean;

  /** Email template management */
  templates: boolean;

  /** Email delivery and engagement analytics */
  analytics: boolean;

  /** Email event webhooks */
  webhooks: boolean;
}

export interface FeaturesEmailingBackendResendNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesEmailingBackendResendNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesEmailingBackendResendNextjsCreates = typeof FeaturesEmailingBackendResendNextjsArtifacts.creates[number];
export type FeaturesEmailingBackendResendNextjsEnhances = typeof FeaturesEmailingBackendResendNextjsArtifacts.enhances[number];
