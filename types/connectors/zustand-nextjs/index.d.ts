/**
 * Zustand NextJS Connector
 * 
 * Zustand state management setup and configuration for NextJS applications
 */

export interface ConnectorsZustandNextjsParams {

  /** State persistence support */
  persistence?: boolean;

  /** Zustand DevTools integration */
  devtools?: boolean;

  /** Server-side rendering support */
  ssr?: boolean;
}

export interface ConnectorsZustandNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsZustandNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsZustandNextjsCreates = typeof ConnectorsZustandNextjsArtifacts.creates[number];
export type ConnectorsZustandNextjsEnhances = typeof ConnectorsZustandNextjsArtifacts.enhances[number];
