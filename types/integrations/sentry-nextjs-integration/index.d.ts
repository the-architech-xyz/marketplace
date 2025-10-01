/**
 * Sentry Next.js Integration
 * 
 * Complete Sentry integration for Next.js applications with error tracking, performance monitoring, and middleware
 */

export interface SentryNextjsIntegrationParams {

  /** Comprehensive error tracking with breadcrumbs and context */
  errorTracking: boolean;

  /** Web vitals, transactions, and performance tracking */
  performanceMonitoring: boolean;

  /** User feedback collection and error reporting */
  userFeedback: boolean;

  /** Sentry middleware for automatic error capture */
  middleware: boolean;

  /** Performance profiling and analysis */
  profiling: boolean;

  /** Custom alerts and monitoring dashboard */
  alerts: boolean;

  /** Release tracking and deployment monitoring */
  releaseTracking: boolean;

  /** User session recording and replay for debugging */
  sessionReplay: boolean;

  /** Custom business metrics and KPIs tracking */
  customMetrics: boolean;

  /** Advanced error grouping and deduplication */
  errorGrouping: boolean;

  /** Detailed crash reports with stack traces */
  crashReporting: boolean;

  /** User action breadcrumbs for error context */
  breadcrumbs: boolean;

  /** Source map support for better error debugging */
  sourceMaps: boolean;

  /** Integrations with Slack, Discord, PagerDuty, etc. */
  integrations: boolean;

  /** Custom tagging and filtering for errors and performance */
  customTags: boolean;

  /** Intelligent sampling for high-volume applications */
  sampling: boolean;

  /** Data privacy controls and PII scrubbing */
  privacy: boolean;

  /** Webhook notifications for critical errors */
  webhooks: boolean;

  /** Advanced analytics and reporting features */
  analytics: boolean;

  /** Testing utilities and mock Sentry for development */
  testing: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const SentryNextjsIntegrationArtifacts: {
  creates: [],
  enhances: [
    { path: 'next.config.js' },
    { path: 'src/lib/sentry/client.ts' },
    { path: 'src/lib/sentry/server.ts' },
    { path: 'src/lib/sentry/config.ts' },
    { path: 'src/app/layout.tsx' },
    { path: 'src/middleware.ts' }
  ],
  installs: [
    { packages: ['@sentry/nextjs'], isDev: false }
  ],
  envVars: [
    { key: 'NEXT_PUBLIC_SENTRY_DSN', value: 'https://...@sentry.io/...', description: 'Sentry DSN for client-side error tracking' },
    { key: 'SENTRY_ORG', value: 'your-org', description: 'Sentry organization slug' },
    { key: 'SENTRY_PROJECT', value: 'your-project', description: 'Sentry project name' },
    { key: 'SENTRY_AUTH_TOKEN', value: 'sntrys_...', description: 'Sentry auth token for releases' }
  ]
};

// Type-safe artifact access
export type SentryNextjsIntegrationCreates = typeof SentryNextjsIntegrationArtifacts.creates[number];
export type SentryNextjsIntegrationEnhances = typeof SentryNextjsIntegrationArtifacts.enhances[number];
