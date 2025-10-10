/**
 * Sentry Error Monitoring
 * 
 * Complete error monitoring and performance tracking with Sentry
 */

export interface ObservabilitySentryParams {

  /** Sentry DSN */
  dsn: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential monitoring (error tracking, basic performance) */
    core: boolean;

    /** Advanced performance monitoring */
    performance: boolean;

    /** Custom alerts and dashboard */
    alerts: boolean;

    /** Enterprise features (profiling, custom metrics) */
    enterprise: boolean;
  };

  /** Release version */
  release?: string;
}

export interface ObservabilitySentryFeatures {

  /** Essential monitoring (error tracking, basic performance) */
  core: boolean;

  /** Advanced performance monitoring */
  performance: boolean;

  /** Custom alerts and dashboard */
  alerts: boolean;

  /** Enterprise features (profiling, custom metrics) */
  enterprise: boolean;
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
