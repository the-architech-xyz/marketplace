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
  creates: [
    'src/lib/sentry/client.ts',
    'src/lib/sentry/server.ts',
    'src/lib/sentry/config.ts',
    'src/lib/sentry/performance.ts',
    'src/lib/sentry/analytics.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['@sentry/browser', '@sentry/node'], isDev: false }
  ],
  envVars: [
    { key: 'SENTRY_DSN', value: 'https://...', description: 'Sentry DSN for server-side error reporting' },
    { key: 'SENTRY_DSN', value: 'https://...', description: 'Sentry DSN for client-side error reporting' },
    { key: 'SENTRY_ORG', value: 'your-org', description: 'Sentry organization slug' },
    { key: 'SENTRY_PROJECT', value: 'your-project', description: 'Sentry project slug' },
    { key: 'SENTRY_RELEASE', value: '1.0.0', description: 'Sentry release version' }
  ]
};

// Type-safe artifact access
export type ObservabilitySentryCreates = typeof ObservabilitySentryArtifacts.creates[number];
export type ObservabilitySentryEnhances = typeof ObservabilitySentryArtifacts.enhances[number];
