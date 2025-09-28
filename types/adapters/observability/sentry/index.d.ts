/**
     * Generated TypeScript definitions for Sentry Error Monitoring
     * Generated from: adapters/observability/sentry/adapter.json
     */

/**
     * Parameters for the Sentry Error Monitoring adapter
     */
export interface SentryObservabilityParams {
  /**
   * Sentry DSN
   */
  dsn: string;
  /**
   * Environment name
   */
  environment?: string;
  /**
   * Enable performance monitoring
   */
  performance?: boolean;
  /**
   * Release version
   */
  release?: string;
}

/**
     * Features for the Sentry Error Monitoring adapter
     */
export interface SentryObservabilityFeatures {
  /**
   * Advanced performance tracking, web vitals, and transaction monitoring
   */
  'performance-monitoring'?: boolean;
  /**
   * Enhanced error tracking with breadcrumbs, context, and user feedback
   */
  'error-tracking'?: boolean;
  /**
   * Custom alerts, monitoring dashboard, and notification system
   */
  'alerts-dashboard'?: boolean;
}
