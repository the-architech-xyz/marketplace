/**
 * Vercel AI SDK
 * 
 * Pure Vercel AI SDK for building AI-powered applications with streaming, chat, and text generation
 */

export interface AiVercelAiSdkParams {

  /** AI providers to include */
  providers: string[];

  /** Feature flags */
  features: Record<string, any>;

  /** Default AI model */
  defaultModel: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo' | 'claude-3-sonnet' | 'claude-3-opus';

  /** Maximum tokens for generation */
  maxTokens: number;

  /** Temperature for generation */
  temperature: number;
}

export interface AiVercelAiSdkFeatures {}

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
