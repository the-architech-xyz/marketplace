/**
 * Monitoring Capability
 * 
 * Complete monitoring capability with error tracking, performance monitoring, and user feedback using Sentry
 */

export interface FeaturesMonitoringShadcnParams {

  /** Backend implementation for monitoring services */
  backend?: any;

  /** Frontend implementation for monitoring UI */
  frontend?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core?: boolean;

    /** Advanced performance monitoring */
    performance?: boolean;

    /** Error tracking and reporting */
    errors?: boolean;

    /** User feedback collection */
    feedback?: boolean;

    /** Monitoring analytics and reporting */
    analytics?: boolean;
  };

  /** Environments to monitor */
  environments?: string[];
}

export interface FeaturesMonitoringShadcnFeatures {

  /** Essential monitoring (error tracking, basic performance) */
  core: boolean;

  /** Advanced performance monitoring */
  performance: boolean;

  /** Error tracking and reporting */
  errors: boolean;

  /** User feedback collection */
  feedback: boolean;

  /** Monitoring analytics and reporting */
  analytics: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesMonitoringShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesMonitoringShadcnCreates = typeof FeaturesMonitoringShadcnArtifacts.creates[number];
export type FeaturesMonitoringShadcnEnhances = typeof FeaturesMonitoringShadcnArtifacts.enhances[number];
