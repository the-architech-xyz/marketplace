/**
 * Sentry Next.js Connector
 * 
 * Enhances Sentry adapter with NextJS-specific optimizations, middleware, and monitoring hooks
 */

export interface ConnectorsMonitoringSentryNextjsParams {

  /** Comprehensive error tracking with breadcrumbs and context */
  errorTracking?: boolean;

  /** Web vitals, transactions, and performance tracking */
  performanceMonitoring?: boolean;

  /** User feedback collection and error reporting */
  userFeedback?: boolean;

  /** Sentry middleware for automatic error capture */
  middleware?: boolean;

  /** Performance profiling and analysis */
  profiling?: boolean;

  /** Custom alerts and monitoring dashboard */
  alerts?: boolean;

  /** Release tracking and deployment monitoring */
  releaseTracking?: boolean;

  /** User session recording and replay for debugging */
  sessionReplay?: boolean;

  /** Custom business metrics and KPIs tracking */
  customMetrics?: boolean;

  /** Advanced error grouping and deduplication */
  errorGrouping?: boolean;

  /** Detailed crash reports with stack traces */
  crashReporting?: boolean;

  /** User action breadcrumbs for error context */
  breadcrumbs?: boolean;

  /** Source map support for better error debugging */
  sourceMaps?: boolean;

  /** Integrations with Slack, Discord, PagerDuty, etc. */
  integrations?: boolean;

  /** Custom tagging and filtering for errors and performance */
  customTags?: boolean;

  /** Intelligent sampling for high-volume applications */
  sampling?: boolean;

  /** Data privacy controls and PII scrubbing */
  privacy?: boolean;

  /** Webhook notifications for critical errors */
  webhooks?: boolean;

  /** Advanced analytics and reporting features */
  analytics?: boolean;

  /** Testing utilities and mock Sentry for development */
  testing?: boolean;
}

export interface ConnectorsMonitoringSentryNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsMonitoringSentryNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsMonitoringSentryNextjsCreates = typeof ConnectorsMonitoringSentryNextjsArtifacts.creates[number];
export type ConnectorsMonitoringSentryNextjsEnhances = typeof ConnectorsMonitoringSentryNextjsArtifacts.enhances[number];
