/**
 * Architech Welcome
 * 
 * Beautiful welcome page showcasing the generated project's capabilities and technology stack
 */

export interface FeaturesArchitechWelcomeShadcnParams {

  /** Show technology stack visualization */
  showTechStack: boolean;

  /** Show interactive component library showcase */
  showComponents: boolean;

  /** Show project structure and architecture */
  showProjectStructure: boolean;

  /** Show quick start guide */
  showQuickStart: boolean;

  /** Custom welcome page title */
  customTitle: string;

  /** Custom welcome page description */
  customDescription: string;

  /** Primary color theme for the welcome page */
  primaryColor: string;

  /** Show Architech branding and links */
  showArchitechBranding: boolean;
}

export interface FeaturesArchitechWelcomeShadcnFeatures {}

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
