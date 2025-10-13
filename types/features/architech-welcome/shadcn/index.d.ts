/**
 * Architech Welcome
 * 
 * Beautiful welcome page showcasing the generated project's capabilities and technology stack
 */

export interface FeaturesArchitechWelcomeShadcnParams {
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

  /** Show architecture documentation section */
  showArchitecture?: boolean;

  /** Show documentation links section */
  showDocumentation?: boolean;
}

export interface FeaturesArchitechWelcomeShadcnFeatures {

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
export declare const FeaturesArchitechWelcomeShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesArchitechWelcomeShadcnCreates = typeof FeaturesArchitechWelcomeShadcnArtifacts.creates[number];
export type FeaturesArchitechWelcomeShadcnEnhances = typeof FeaturesArchitechWelcomeShadcnArtifacts.enhances[number];
