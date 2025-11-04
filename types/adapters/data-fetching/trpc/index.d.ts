/**
 * tRPC Client
 * 
 * End-to-end typesafe APIs with tRPC (wraps TanStack Query)
 */

export interface DataFetchingTrpcParams {

  /** Data transformer for complex types (Date, Map, Set) */
  transformer?: 'superjson' | 'devalue' | 'none';

  /** Abort requests on component unmount */
  abortOnUnmount?: boolean;

  /** Enable request batching for better performance */
  batchingEnabled?: boolean;
}

export interface DataFetchingTrpcFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DataFetchingTrpcArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DataFetchingTrpcCreates = typeof DataFetchingTrpcArtifacts.creates[number];
export type DataFetchingTrpcEnhances = typeof DataFetchingTrpcArtifacts.enhances[number];
