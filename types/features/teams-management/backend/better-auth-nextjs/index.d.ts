/**
 * Teams Capability (Better Auth + NextJS)
 * 
 * Complete teams management backend with Better Auth and NextJS
 */

export interface FeaturesTeamsManagementBackendBetterAuthNextjsParams {

  /** Team invitation system */
  invites?: any;

  /** Granular role-based permissions */
  permissions?: any;

  /** Team performance analytics */
  analytics?: any;

  /** Team billing and subscription management */
  billing?: any;
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
