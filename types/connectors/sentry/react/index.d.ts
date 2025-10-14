/**
 * Sentry React Connector
 * 
 * React-specific Sentry integration with @sentry/react
 */

export interface ConnectorsSentryReactParams {

  /** Sentry DSN */
  dsn?: string;

  /** Environment name */
  environment?: string;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential React Sentry integration */
    core?: boolean;

    /** React performance monitoring */
    performance?: boolean;

    /** React Error Boundary components */
    'error-boundary'?: boolean;
  };

  /** Release version */
  release?: string;
}

export interface ConnectorsSentryReactFeatures {

  /** Essential React Sentry integration */
  core: boolean;

  /** React performance monitoring */
  performance: boolean;

  /** React Error Boundary components */
  'error-boundary': boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsSentryReactArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsSentryReactCreates = typeof ConnectorsSentryReactArtifacts.creates[number];
export type ConnectorsSentryReactEnhances = typeof ConnectorsSentryReactArtifacts.enhances[number];
