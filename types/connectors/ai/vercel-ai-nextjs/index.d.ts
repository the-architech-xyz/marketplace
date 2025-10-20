/**
 * Vercel AI SDK + Next.js Connector
 * 
 * Complete Vercel AI SDK integration for Next.js with streaming support
 */

export interface ConnectorsAiVercelAiNextjsParams {

  /** Enabled AI providers */
  providers?: string[];

  /** Enable streaming responses */
  streaming?: boolean;
}

export interface ConnectorsAiVercelAiNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ConnectorsAiVercelAiNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ConnectorsAiVercelAiNextjsCreates = typeof ConnectorsAiVercelAiNextjsArtifacts.creates[number];
export type ConnectorsAiVercelAiNextjsEnhances = typeof ConnectorsAiVercelAiNextjsArtifacts.enhances[number];
