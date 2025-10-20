/**
 * TanStack Query NextJS Connector
 * 
 * TanStack Query setup and configuration for NextJS applications
 */

export interface ConnectorsInfrastructureTanstackQueryNextjsParams {

  /** SSR support for TanStack Query */
  ssr?: boolean;

  /** Client-side hydration support */
  hydration?: boolean;

  /** Error boundary for query errors */
  errorBoundary?: boolean;

  /** TanStack Query DevTools integration */
  devtools?: boolean;
}

export interface ConnectorsInfrastructureTanstackQueryNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsInfrastructureTanstackQueryNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsInfrastructureTanstackQueryNextjsCreates = typeof ConnectorsInfrastructureTanstackQueryNextjsArtifacts.creates[number];
export type ConnectorsInfrastructureTanstackQueryNextjsEnhances = typeof ConnectorsInfrastructureTanstackQueryNextjsArtifacts.enhances[number];
