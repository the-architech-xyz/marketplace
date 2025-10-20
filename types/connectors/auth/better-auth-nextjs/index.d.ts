/**
 * Better Auth + Next.js Connector
 * 
 * Complete Better Auth integration for Next.js applications with React hooks
 */

export interface ConnectorsAuthBetterAuthNextjsParams {

  /** Enable email verification */
  emailVerification?: boolean;

  /** Enabled OAuth providers */
  oauthProviders?: string[];

  /** Enable two-factor authentication */
  twoFactor?: boolean;

  /** Enable organization support */
  organizations?: boolean;

  /** Enable team support */
  teams?: boolean;
}

export interface ConnectorsAuthBetterAuthNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsAuthBetterAuthNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsAuthBetterAuthNextjsCreates = typeof ConnectorsAuthBetterAuthNextjsArtifacts.creates[number];
export type ConnectorsAuthBetterAuthNextjsEnhances = typeof ConnectorsAuthBetterAuthNextjsArtifacts.enhances[number];
