/**
 * Emailing Feature (Shadcn)
 * 
 * Complete email management UI using Shadcn components
 */

export interface FeaturesEmailingFrontendShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    type: boolean;

    default: boolean;

    description: boolean;

    required: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesEmailingFrontendShadcnFeatures {

  type: boolean;

  default: boolean;

  description: boolean;

  required: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesEmailingFrontendShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesEmailingFrontendShadcnCreates = typeof FeaturesEmailingFrontendShadcnArtifacts.creates[number];
export type FeaturesEmailingFrontendShadcnEnhances = typeof FeaturesEmailingFrontendShadcnArtifacts.enhances[number];
