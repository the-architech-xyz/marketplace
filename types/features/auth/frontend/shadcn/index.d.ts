/**
 * Authentication UI (Shadcn)
 * 
 * Complete authentication UI using Shadcn components
 */

export interface FeaturesAuthFrontendShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable sign-in UI components */
    signIn?: boolean;

    /** Enable sign-up UI components */
    signUp?: boolean;

    /** Enables password reset functionality (forms and pages) */
    passwordReset?: boolean;

    /** Enable profile management UI components */
    profile?: boolean;

    /** Enables Multi-Factor Authentication setup and verification */
    mfa?: boolean;

    /** Enables UI for Google, GitHub, etc. logins */
    socialLogins?: boolean;

    /** Generates a full page for managing account settings */
    accountSettingsPage?: boolean;

    /** Enables advanced profile management features */
    profileManagement?: boolean;

    /** Enable two-factor authentication UI */
    twoFactor?: boolean;

    /** Enable organization management UI */
    organizationManagement?: boolean;
  };

  /** UI theme variant */
  theme?: any;
}

export interface FeaturesAuthFrontendShadcnFeatures {

  /** Enable sign-in UI components */
  signIn: boolean;

  /** Enable sign-up UI components */
  signUp: boolean;

  /** Enables password reset functionality (forms and pages) */
  passwordReset: boolean;

  /** Enable profile management UI components */
  profile: boolean;

  /** Enables Multi-Factor Authentication setup and verification */
  mfa: boolean;

  /** Enables UI for Google, GitHub, etc. logins */
  socialLogins: boolean;

  /** Generates a full page for managing account settings */
  accountSettingsPage: boolean;

  /** Enables advanced profile management features */
  profileManagement: boolean;

  /** Enable two-factor authentication UI */
  twoFactor: boolean;

  /** Enable organization management UI */
  organizationManagement: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesAuthFrontendShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesAuthFrontendShadcnCreates = typeof FeaturesAuthFrontendShadcnArtifacts.creates[number];
export type FeaturesAuthFrontendShadcnEnhances = typeof FeaturesAuthFrontendShadcnArtifacts.enhances[number];
