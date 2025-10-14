/**
 * Teams Capability (Better Auth + NextJS)
 * 
 * Complete teams management backend with Better Auth and NextJS
 */

export interface FeaturesTeamsManagementBackendBetterAuthNextjsParams {

  /** Team invitation system */
  invites?: boolean;

  /** Granular role-based permissions */
  permissions?: boolean;

  /** Team performance analytics */
  analytics?: boolean;

  /** Team billing and subscription management */
  billing?: boolean;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable team management */
    teams?: boolean;

    /** Enable team invitations */
    invitations?: boolean;

    /** Enable role-based access control */
    roles?: boolean;

    /** Enable granular permissions */
    permissions?: boolean;
  };
}

export interface FeaturesTeamsManagementBackendBetterAuthNextjsFeatures {

  /** Enable team management */
  teams: boolean;

  /** Enable team invitations */
  invitations: boolean;

  /** Enable role-based access control */
  roles: boolean;

  /** Enable granular permissions */
  permissions: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesTeamsManagementBackendBetterAuthNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesTeamsManagementBackendBetterAuthNextjsCreates = typeof FeaturesTeamsManagementBackendBetterAuthNextjsArtifacts.creates[number];
export type FeaturesTeamsManagementBackendBetterAuthNextjsEnhances = typeof FeaturesTeamsManagementBackendBetterAuthNextjsArtifacts.enhances[number];
