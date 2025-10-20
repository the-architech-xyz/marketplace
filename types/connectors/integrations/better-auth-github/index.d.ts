/**
 * Better Auth + GitHub Connector
 * 
 * OAuth integration between Better Auth and GitHub for Application Authorization
 */

export interface ConnectorsIntegrationsBetterAuthGithubParams {

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

export interface ConnectorsIntegrationsBetterAuthGithubFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsIntegrationsBetterAuthGithubArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsIntegrationsBetterAuthGithubCreates = typeof ConnectorsIntegrationsBetterAuthGithubArtifacts.creates[number];
export type ConnectorsIntegrationsBetterAuthGithubEnhances = typeof ConnectorsIntegrationsBetterAuthGithubArtifacts.enhances[number];
