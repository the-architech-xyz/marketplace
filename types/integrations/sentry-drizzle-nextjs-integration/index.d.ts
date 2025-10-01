/**
 * Sentry Drizzle Next.js Integration
 * 
 * Complete Sentry integration with Drizzle ORM for Next.js applications with error logging, performance tracking, and database monitoring
 */

export interface SentryDrizzleNextjsIntegrationParams {

  /** Database schema and logging for Sentry errors */
  errorLogging: boolean;

  /** Database performance metrics and monitoring */
  performanceTracking: boolean;

  /** Database query performance and error tracking */
  queryMonitoring: boolean;

  /** Database storage for user feedback and reports */
  userFeedback: boolean;

  /** SQL migrations for Sentry tables */
  migrations: boolean;

  /** Performance indexes for Sentry queries */
  indexes: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const SentryDrizzleNextjsIntegrationArtifacts: {
  creates: [
    'src/lib/sentry.ts',
    'src/lib/sentry-drizzle.ts',
    'src/components/errors/ErrorBoundary.tsx',
    'src/components/errors/ErrorFallback.tsx'
  ],
  enhances: [],
  installs: [
    { packages: ['@sentry/nextjs', '@sentry/profiling-node', 'drizzle-orm'], isDev: false }
  ],
  envVars: [
    { key: 'SENTRY_DSN', value: '', description: 'Sentry DSN for error tracking' },
    { key: 'SENTRY_ORG', value: '', description: 'Sentry organization slug' },
    { key: 'SENTRY_PROJECT', value: '', description: 'Sentry project slug' }
  ]
};

// Type-safe artifact access
export type SentryDrizzleNextjsIntegrationCreates = typeof SentryDrizzleNextjsIntegrationArtifacts.creates[number];
export type SentryDrizzleNextjsIntegrationEnhances = typeof SentryDrizzleNextjsIntegrationArtifacts.enhances[number];
