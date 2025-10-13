/**
 * Authentication Capability (Better Auth + NextJS)
 * 
 * Complete authentication backend with Better Auth and NextJS
 */

export interface FeaturesAuthBackendBetterAuthNextjsParams {

  /** Next.js API routes for authentication endpoints */
  apiRoutes?: any;

  /** Next.js middleware for authentication and route protection */
  middleware?: any;

  /** Admin API routes for user management */
  adminPanel?: any;

  /** Email verification API routes and components */
  emailVerification?: any;

  /** MFA API routes and components */
  mfa?: any;

  /** Password reset API routes and components */
  passwordReset?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable email/password authentication */
    emailPassword?: boolean;

    /** Enable email verification */
    emailVerification?: boolean;

    /** Enable password reset functionality */
    passwordReset?: boolean;

    /** Enable session management */
    sessions?: boolean;

    /** Enable organization/team management */
    organizations?: boolean;

    /** Enable two-factor authentication */
    twoFactor?: boolean;
  };
}

export interface FeaturesAuthBackendBetterAuthNextjsFeatures {

  /** Enable email/password authentication */
  emailPassword: boolean;

  /** Enable email verification */
  emailVerification: boolean;

  /** Enable password reset functionality */
  passwordReset: boolean;

  /** Enable session management */
  sessions: boolean;

  /** Enable organization/team management */
  organizations: boolean;

  /** Enable two-factor authentication */
  twoFactor: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesAuthBackendBetterAuthNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesAuthBackendBetterAuthNextjsCreates = typeof FeaturesAuthBackendBetterAuthNextjsArtifacts.creates[number];
export type FeaturesAuthBackendBetterAuthNextjsEnhances = typeof FeaturesAuthBackendBetterAuthNextjsArtifacts.enhances[number];
