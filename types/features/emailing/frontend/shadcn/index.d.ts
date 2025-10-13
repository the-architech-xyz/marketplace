/**
 * Emailing Feature (Shadcn)
 * 
 * Complete email management UI using Shadcn components
 */

export interface FeaturesEmailingFrontendShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable email composer UI */
    emailComposer?: boolean;

    /** Enable email list UI */
    emailList?: boolean;

    /** Enable email templates UI */
    templates?: boolean;

    /** Enable email analytics UI */
    analytics?: boolean;

    /** Enable email campaigns UI */
    campaigns?: boolean;

    /** Enable email scheduling UI */
    scheduling?: boolean;

    /** Enable advanced email templates UI */
    advancedTemplates?: boolean;
  };

  /** UI theme variant */
  theme?: any;
}

export interface FeaturesEmailingFrontendShadcnFeatures {

  /** Enable email composer UI */
  emailComposer: boolean;

  /** Enable email list UI */
  emailList: boolean;

  /** Enable email templates UI */
  templates: boolean;

  /** Enable email analytics UI */
  analytics: boolean;

  /** Enable email campaigns UI */
  campaigns: boolean;

  /** Enable email scheduling UI */
  scheduling: boolean;

  /** Enable advanced email templates UI */
  advancedTemplates: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesEmailingFrontendShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesEmailingFrontendShadcnCreates = typeof FeaturesEmailingFrontendShadcnArtifacts.creates[number];
export type FeaturesEmailingFrontendShadcnEnhances = typeof FeaturesEmailingFrontendShadcnArtifacts.enhances[number];
