/**
 * Social Profile Feature (Shadcn)
 * 
 * Complete modular social profile management interface using Shadcn components
 */

export interface FeaturesSocialProfileShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic profile management */
    core?: boolean;

    /** Avatar upload and management */
    avatar?: boolean;

    /** Profile settings and preferences */
    settings?: boolean;

    /** Security settings and privacy */
    security?: boolean;

    /** Notification preferences */
    notifications?: boolean;

    /** Data export functionality */
    export?: boolean;

    /** Profile type definitions */
    types?: boolean;

    /** Profile utility functions */
    utils?: boolean;

    /** Profile constants and configuration */
    constants?: boolean;
  };
}

export interface FeaturesSocialProfileShadcnFeatures {

  /** Basic profile management */
  core: boolean;

  /** Avatar upload and management */
  avatar: boolean;

  /** Profile settings and preferences */
  settings: boolean;

  /** Security settings and privacy */
  security: boolean;

  /** Notification preferences */
  notifications: boolean;

  /** Data export functionality */
  export: boolean;

  /** Profile type definitions */
  types: boolean;

  /** Profile utility functions */
  utils: boolean;

  /** Profile constants and configuration */
  constants: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesSocialProfileShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesSocialProfileShadcnCreates = typeof FeaturesSocialProfileShadcnArtifacts.creates[number];
export type FeaturesSocialProfileShadcnEnhances = typeof FeaturesSocialProfileShadcnArtifacts.enhances[number];
