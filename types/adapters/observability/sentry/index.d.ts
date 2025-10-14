/**
 * Sentry Core (Tech-Agnostic)
 * 
 * Tech-agnostic Sentry types and utilities. Framework-specific implementations handled by Connectors.
 */

export interface ObservabilitySentryParams {

  /** Sentry DSN */
  dsn?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core?: boolean;

    /** Error tracking and reporting */
    errorTracking?: boolean;

    /** Advanced performance monitoring */
    performance?: boolean;

    /** Custom alerts and dashboard */
    alerts?: boolean;

    /** Enterprise features (profiling, custom metrics) */
    enterprise?: boolean;

    /** Session replay for debugging */
    replay?: boolean;
  };

  /** Release version */
  release?: string;
}

export interface ObservabilitySentryFeatures {

  /** Essential monitoring (error tracking, basic performance) */
  core: boolean;

  /** Error tracking and reporting */
  errorTracking: boolean;

  /** Advanced performance monitoring */
  performance: boolean;

  /** Custom alerts and dashboard */
  alerts: boolean;

  /** Enterprise features (profiling, custom metrics) */
  enterprise: boolean;

  /** Session replay for debugging */
  replay: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const ObservabilitySentryArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ObservabilitySentryCreates = typeof ObservabilitySentryArtifacts.creates[number];
export type ObservabilitySentryEnhances = typeof ObservabilitySentryArtifacts.enhances[number];
