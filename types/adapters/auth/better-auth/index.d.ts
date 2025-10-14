/**
 * Better Auth
 * 
 * Modern authentication library for TypeScript
 */

export interface AuthBetterAuthParams {

  /** Authentication providers to enable */
  providers?: string[];

  /** Session management strategy */
  session?: any;

  /** Enable CSRF protection */
  csrf?: boolean;

  /** Enable rate limiting */
  rateLimit?: boolean;
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
