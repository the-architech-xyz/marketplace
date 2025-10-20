/**
 * auth-tech-stack
 * 
 * Technology-agnostic stack layer for Auth feature
 */

export interface FeaturesAuthTechStackParams {

  /** The name of the feature (e.g., 'auth') */
  featureName?: string;

  /** The path to the feature (e.g., 'auth') */
  featurePath?: string;

  /** Whether to generate TypeScript types */
  hasTypes?: boolean;

  /** Whether to generate Zod schemas */
  hasSchemas?: boolean;

  /** Whether to generate TanStack Query hooks */
  hasHooks?: boolean;

  /** Whether to generate Zustand stores */
  hasStores?: boolean;

  /** Whether to generate API routes */
  hasApiRoutes?: boolean;

  /** Whether to generate validation layer */
  hasValidation?: boolean;
}

export interface FeaturesAuthTechStackFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesAuthTechStackArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesAuthTechStackCreates = typeof FeaturesAuthTechStackArtifacts.creates[number];
export type FeaturesAuthTechStackEnhances = typeof FeaturesAuthTechStackArtifacts.enhances[number];
