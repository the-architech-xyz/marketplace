/**
 * AI Capability (Vercel AI SDK + NextJS)
 * 
 * Complete AI chat backend with Vercel AI SDK and NextJS
 */

export interface FeaturesAiChatBackendNextjsParams {

  /** Real-time message streaming */
  streaming?: boolean;

  /** File upload capabilities */
  fileUpload?: boolean;

  /** Voice input capabilities */
  voiceInput?: boolean;

  /** Voice output capabilities */
  voiceOutput?: boolean;

  /** Chat export and import capabilities */
  exportImport?: boolean;
}

export interface FeaturesAiChatBackendNextjsFeatures {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesAiChatBackendNextjsArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesAiChatBackendNextjsCreates = typeof FeaturesAiChatBackendNextjsArtifacts.creates[number];
export type FeaturesAiChatBackendNextjsEnhances = typeof FeaturesAiChatBackendNextjsArtifacts.enhances[number];
