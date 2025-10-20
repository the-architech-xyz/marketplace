/**
 * Better Auth
 * 
 * Full-stack authentication SDK with session management, OAuth, 2FA, and organization support
 */

export interface AuthBetterAuthParams {

  /** Enable email/password authentication */
  emailPassword?: boolean;

  /** Enable email verification */
  emailVerification?: boolean;

  /** Enabled OAuth providers */
  oauthProviders?: string[];

  /** Enable two-factor authentication */
  twoFactor?: boolean;

  /** Enable organization support */
  organizations?: boolean;

  /** Enable team support within organizations */
  teams?: boolean;

  /** Session expiry time in seconds (default: 7 days) */
  sessionExpiry?: number;
}

export interface AuthBetterAuthFeatures {}

// 🚀 Auto-discovered artifacts
export declare const AuthBetterAuthArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type AuthBetterAuthCreates = typeof AuthBetterAuthArtifacts.creates[number];
export type AuthBetterAuthEnhances = typeof AuthBetterAuthArtifacts.enhances[number];
