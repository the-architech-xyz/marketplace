/**
 * Teams Management Feature (Shadcn)
 * 
 * Complete team management UI using Shadcn components
 */

export interface FeaturesTeamsManagementFrontendParams {
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

export interface FeaturesTeamsManagementFrontendFeatures {

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
export declare const FeaturesTeamsManagementFrontendArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesTeamsManagementFrontendCreates = typeof FeaturesTeamsManagementFrontendArtifacts.creates[number];
export type FeaturesTeamsManagementFrontendEnhances = typeof FeaturesTeamsManagementFrontendArtifacts.enhances[number];
