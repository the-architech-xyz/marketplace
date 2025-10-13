/**
 * Vercel AI SDK
 * 
 * Pure Vercel AI SDK for building AI-powered applications with streaming, chat, and text generation
 */

export interface AiVercelAiSdkParams {

  /** AI providers to include */
  providers?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential AI functionality (chat, text generation) */
    core?: boolean;

    /** Real-time streaming responses */
    streaming?: boolean;

    /** Function calling and tool use */
    tools?: boolean;

    /** Text embeddings functionality */
    embeddings?: boolean;

    /** Advanced AI features (image generation, embeddings, function calling) */
    advanced?: boolean;

    /** Enterprise features (caching, edge runtime, tool use) */
    enterprise?: boolean;
  };

  /** Default AI model */
  defaultModel?: any;

  /** Maximum tokens for generation */
  maxTokens?: any;

  /** Temperature for generation */
  temperature?: any;
}

export interface AiVercelAiSdkFeatures {

  /** Essential AI functionality (chat, text generation) */
  core: boolean;

  /** Real-time streaming responses */
  streaming: boolean;

  /** Function calling and tool use */
  tools: boolean;

  /** Text embeddings functionality */
  embeddings: boolean;

  /** Advanced AI features (image generation, embeddings, function calling) */
  advanced: boolean;

  /** Enterprise features (caching, edge runtime, tool use) */
  enterprise: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const AiVercelAiSdkArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type AiVercelAiSdkCreates = typeof AiVercelAiSdkArtifacts.creates[number];
export type AiVercelAiSdkEnhances = typeof AiVercelAiSdkArtifacts.enhances[number];
