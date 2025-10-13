/**
 * Sentry Dashboard UI (Shadcn)
 * 
 * User-facing Sentry monitoring dashboard with Shadcn UI components. Browse errors, view performance metrics, configure alerts.
 */

export interface FeaturesObservabilitySentryShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Main Sentry dashboard with overview */
    dashboard?: boolean;

    /** Browse and filter captured errors */
    errorBrowser?: boolean;

    /** Performance metrics and charts */
    performance?: boolean;

    /** Alert configuration UI */
    alerts?: boolean;
  };

  /** Path to mount the Sentry dashboard */
  dashboardPath?: any;

  /** Auto-refresh interval (ms) for dashboard data */
  refreshInterval?: any;
}

export interface FeaturesObservabilitySentryShadcnFeatures {

  /** Main Sentry dashboard with overview */
  dashboard: boolean;

  /** Browse and filter captured errors */
  errorBrowser: boolean;

  /** Performance metrics and charts */
  performance: boolean;

  /** Alert configuration UI */
  alerts: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesObservabilitySentryShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesObservabilitySentryShadcnCreates = typeof FeaturesObservabilitySentryShadcnArtifacts.creates[number];
export type FeaturesObservabilitySentryShadcnEnhances = typeof FeaturesObservabilitySentryShadcnArtifacts.enhances[number];
