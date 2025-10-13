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
  customTitle?: any;

  /** Custom welcome page description */
  customDescription?: any;

  /** Primary color theme for the welcome page */
  primaryColor?: any;

  /** Show technology stack visualization */
  showTechStack?: any;

  /** Show interactive component library showcase */
  showComponents?: any;

  /** Show project structure and architecture */
  showProjectStructure?: any;

  /** Show quick start guide */
  showQuickStart?: any;

  /** Show Architech branding and links */
  showArchitechBranding?: any;
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
