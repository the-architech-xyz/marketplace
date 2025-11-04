/**
 * A/B Testing Vercel Next.js Connector
 * 
 * A/B testing implementation for Next.js with Vercel Edge Config, middleware-based variant assignment, and React components
 */

export interface ConnectorsAnalyticsAbVercelNextjsParams {

  /** Add A/B testing middleware for variant assignment */
  middleware?: boolean;

  /** Generate Experiment and Variant components */
  components?: boolean;

  /** Generate React hooks for accessing variants */
  hooks?: boolean;

  /** Configure Vercel Edge Config for experiments */
  edgeConfig?: boolean;

  /** Track experiment views and conversions */
  analytics?: boolean;
}

export interface ConnectorsAnalyticsAbVercelNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsAnalyticsAbVercelNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsAnalyticsAbVercelNextjsCreates = typeof ConnectorsAnalyticsAbVercelNextjsArtifacts.creates[number];
export type ConnectorsAnalyticsAbVercelNextjsEnhances = typeof ConnectorsAnalyticsAbVercelNextjsArtifacts.enhances[number];
