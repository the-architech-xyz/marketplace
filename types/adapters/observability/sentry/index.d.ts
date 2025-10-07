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

  /** Enable performance monitoring */
  performance?: boolean;

  /** Release version */
  release?: string;
}

export interface ObservabilitySentryFeatures {}

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
