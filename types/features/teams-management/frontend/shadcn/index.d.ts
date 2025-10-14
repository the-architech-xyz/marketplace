/**
 * Teams Management Feature (Shadcn)
 * 
 * Complete team management UI using Shadcn components
 */

export interface FeaturesTeamsManagementFrontendShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Basic team management (list, creation, member management) */
    core?: boolean;

    /** Enable team management UI */
    teams?: boolean;

    /** Enable member management UI */
    members?: boolean;

    /** Enable team invitations UI */
    invitations?: boolean;

    /** Enable role management UI */
    roles?: boolean;

    /** Team billing and usage tracking */
    billing?: boolean;

    /** Team analytics and reporting */
    analytics?: boolean;

    /** Advanced team features (settings, permissions, dashboard) */
    advanced?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesTeamsManagementFrontendShadcnFeatures {

  /** Basic team management (list, creation, member management) */
  core: boolean;

  /** Enable team management UI */
  teams: boolean;

  /** Enable member management UI */
  members: boolean;

  /** Enable team invitations UI */
  invitations: boolean;

  /** Enable role management UI */
  roles: boolean;

  /** Team billing and usage tracking */
  billing: boolean;

  /** Team analytics and reporting */
  analytics: boolean;

  /** Advanced team features (settings, permissions, dashboard) */
  advanced: boolean;
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
