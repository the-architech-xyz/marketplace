/**
 * Better Auth + GitHub Connector
 * 
 * OAuth integration between Better Auth and GitHub for Application Authorization
 */

export interface ConnectorsBetterAuthGithubParams {

  /** GitHub OAuth App Client ID */
  clientId: string;

  /** GitHub OAuth App Client Secret */
  clientSecret: string;

  /** OAuth redirect URI */
  redirectUri: string;

  /** GitHub OAuth scopes */
  scopes?: string[];

  /** Encryption key for storing tokens securely */
  encryptionKey: string;
}

export interface ConnectorsBetterAuthGithubFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsBetterAuthGithubArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsBetterAuthGithubCreates = typeof ConnectorsBetterAuthGithubArtifacts.creates[number];
export type ConnectorsBetterAuthGithubEnhances = typeof ConnectorsBetterAuthGithubArtifacts.enhances[number];
