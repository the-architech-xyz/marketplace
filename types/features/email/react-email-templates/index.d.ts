/**
 * React Email Templates
 * 
 * Pre-built React-based email templates using @react-email/components. Compiles .tsx templates to provider-agnostic HTML strings.
 */

export interface FeaturesEmailReactEmailTemplatesParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Core email templates (welcome, notifications) */
    core?: boolean;

    /** Authentication email templates (password reset, verification, 2FA) */
    auth?: boolean;

    /** Payment email templates (confirmation, receipts) */
    payments?: boolean;

    /** Organization email templates (invitations, updates) */
    organizations?: boolean;
  };

  /** Primary brand color for email templates */
  brandColor?: any;

  /** URL to company logo for email headers */
  logo?: any;
}

export interface FeaturesEmailReactEmailTemplatesFeatures {

  /** Core email templates (welcome, notifications) */
  core: boolean;

  /** Authentication email templates (password reset, verification, 2FA) */
  auth: boolean;

  /** Payment email templates (confirmation, receipts) */
  payments: boolean;

  /** Organization email templates (invitations, updates) */
  organizations: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesEmailReactEmailTemplatesArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesEmailReactEmailTemplatesCreates = typeof FeaturesEmailReactEmailTemplatesArtifacts.creates[number];
export type FeaturesEmailReactEmailTemplatesEnhances = typeof FeaturesEmailReactEmailTemplatesArtifacts.enhances[number];
