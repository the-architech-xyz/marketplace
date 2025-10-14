/**
 * Sentry Next.js Connector
 * 
 * Next.js-specific Sentry integration with @sentry/nextjs
 */

export interface ConnectorsSentryNextjsParams {

  /** Sentry DSN */
  dsn?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential Next.js Sentry integration */
    core?: boolean;

    /** Next.js performance monitoring */
    performance?: boolean;

    /** Next.js alerts and dashboard */
    alerts?: boolean;

    /** Next.js enterprise features */
    enterprise?: boolean;
  };

  /** Release version */
  release?: string;
}

export interface ConnectorsSentryNextjsFeatures {

  /** Essential Next.js Sentry integration */
  core: boolean;

  /** Next.js performance monitoring */
  performance: boolean;

  /** Next.js alerts and dashboard */
  alerts: boolean;

  /** Next.js enterprise features */
  enterprise: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsSentryNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsSentryNextjsCreates = typeof ConnectorsSentryNextjsArtifacts.creates[number];
export type ConnectorsSentryNextjsEnhances = typeof ConnectorsSentryNextjsArtifacts.enhances[number];
