/**
 * A/B Testing Core (Tech-Agnostic)
 * 
 * Tech-agnostic A/B testing types, utilities, and experiment management. Framework-specific implementations handled by Connectors.
 */

export interface AnalyticsAbTestingCoreParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential A/B testing utilities and types */
    core?: boolean;

    /** Experiment configuration and management */
    experimentManagement?: boolean;

    /** Variant assignment logic */
    variantAssignment?: boolean;

    /** Analytics integration for tracking experiment results */
    analytics?: boolean;
  };
}

export interface AnalyticsAbTestingCoreFeatures {

  /** Essential A/B testing utilities and types */
  core: boolean;

  /** Experiment configuration and management */
  experimentManagement: boolean;

  /** Variant assignment logic */
  variantAssignment: boolean;

  /** Analytics integration for tracking experiment results */
  analytics: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const AnalyticsAbTestingCoreArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type AnalyticsAbTestingCoreCreates = typeof AnalyticsAbTestingCoreArtifacts.creates[number];
export type AnalyticsAbTestingCoreEnhances = typeof AnalyticsAbTestingCoreArtifacts.enhances[number];
