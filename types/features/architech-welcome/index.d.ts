/**
 * Architech Welcome Tech-Stack
 * 
 * Framework-agnostic welcome page logic and data extraction
 */

export interface FeaturesArchitechWelcomeParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Show technology stack visualization */
    techStack?: boolean;

    /** Show interactive component library showcase */
    componentShowcase?: boolean;

    /** Show project structure and architecture */
    projectStructure?: boolean;

    /** Show quick start guide */
    quickStart?: boolean;

    /** Show Architech branding and links */
    architechBranding?: boolean;
  };

  /** Custom welcome page title */
  customTitle?: string;

  /** Custom welcome page description */
  customDescription?: string;

  /** Primary color theme for the welcome page */
  primaryColor?: string;
}

export interface FeaturesArchitechWelcomeFeatures {

  /** Show technology stack visualization */
  techStack: boolean;

  /** Show interactive component library showcase */
  componentShowcase: boolean;

  /** Show project structure and architecture */
  projectStructure: boolean;

  /** Show quick start guide */
  quickStart: boolean;

  /** Show Architech branding and links */
  architechBranding: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesArchitechWelcomeArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesArchitechWelcomeCreates = typeof FeaturesArchitechWelcomeArtifacts.creates[number];
export type FeaturesArchitechWelcomeEnhances = typeof FeaturesArchitechWelcomeArtifacts.enhances[number];
