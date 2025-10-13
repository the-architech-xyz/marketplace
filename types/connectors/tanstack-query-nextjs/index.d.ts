/**
 * TanStack Query NextJS Connector
 * 
 * TanStack Query setup and configuration for NextJS applications
 */

export interface ConnectorsTanstackQueryNextjsParams {

  /** SSR support for TanStack Query */
  ssr?: boolean;

  /** Client-side hydration support */
  hydration?: boolean;

  /** Error boundary for query errors */
  errorBoundary?: boolean;

  /** TanStack Query DevTools integration */
  devtools?: boolean;
}

export interface ConnectorsTanstackQueryNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsTanstackQueryNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsTanstackQueryNextjsCreates = typeof ConnectorsTanstackQueryNextjsArtifacts.creates[number];
export type ConnectorsTanstackQueryNextjsEnhances = typeof ConnectorsTanstackQueryNextjsArtifacts.enhances[number];
