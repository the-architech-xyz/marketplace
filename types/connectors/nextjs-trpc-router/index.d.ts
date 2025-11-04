/**
 * Next.js tRPC Router Connector
 * 
 * Generates tRPC router and API route for Next.js (supports both single-app and monorepo)
 */

export interface ConnectorsNextjsTrpcRouterParams {

  /** Template context with project structure information */
  templateContext?: Record<string, any>;
}

export interface ConnectorsNextjsTrpcRouterFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsNextjsTrpcRouterArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsNextjsTrpcRouterCreates = typeof ConnectorsNextjsTrpcRouterArtifacts.creates[number];
export type ConnectorsNextjsTrpcRouterEnhances = typeof ConnectorsNextjsTrpcRouterArtifacts.enhances[number];
