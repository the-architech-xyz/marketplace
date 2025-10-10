/**
 * AI Capability (Vercel AI SDK + NextJS)
 * 
 * Complete AI chat backend with Vercel AI SDK and NextJS
 */

export interface FeaturesAiChatBackendVercelAiNextjsParams {

  /** Real-time message streaming */
  streaming: boolean;

  /** File upload capabilities */
  fileUpload: boolean;

  /** Voice input capabilities */
  voiceInput: boolean;

  /** Voice output capabilities */
  voiceOutput: boolean;

  /** Chat export and import capabilities */
  exportImport: boolean;
}

export interface FeaturesAiChatBackendVercelAiNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesAiChatBackendVercelAiNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesAiChatBackendVercelAiNextjsCreates = typeof FeaturesAiChatBackendVercelAiNextjsArtifacts.creates[number];
export type FeaturesAiChatBackendVercelAiNextjsEnhances = typeof FeaturesAiChatBackendVercelAiNextjsArtifacts.enhances[number];
