/**
 * Email Capability (Resend + NextJS)
 * 
 * Complete email sending backend with Resend and NextJS
 */

export interface FeaturesEmailingBackendResendNextjsParams {

  /** Bulk email sending capabilities */
  bulkEmail?: any;

  /** Email template management */
  templates?: any;

  /** Email delivery and engagement analytics */
  analytics?: any;

  /** Email event webhooks */
  webhooks?: any;

  /** Enable organization-scoped email management */
  organizations?: any;

  /** Enable team-scoped email management */
  teams?: any;
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
