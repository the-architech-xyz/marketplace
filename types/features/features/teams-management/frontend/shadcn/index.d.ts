/**
 * Teams Management Feature (Shadcn)
 * 
 * Complete team management UI using Shadcn components
 */

export interface FeaturesTeamsManagementFrontendShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic team management (list, creation, member management) */
    core: boolean;

    /** Advanced team features (settings, permissions, dashboard) */
    advanced: boolean;

    /** Team analytics and reporting */
    analytics: boolean;

    /** Team billing and usage tracking */
    billing: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesTeamsManagementFrontendShadcnFeatures {

  /** Basic team management (list, creation, member management) */
  core: boolean;

  /** Advanced team features (settings, permissions, dashboard) */
  advanced: boolean;

  /** Team analytics and reporting */
  analytics: boolean;

  /** Team billing and usage tracking */
  billing: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesTeamsManagementFrontendShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesTeamsManagementFrontendShadcnCreates = typeof FeaturesTeamsManagementFrontendShadcnArtifacts.creates[number];
export type FeaturesTeamsManagementFrontendShadcnEnhances = typeof FeaturesTeamsManagementFrontendShadcnArtifacts.enhances[number];
