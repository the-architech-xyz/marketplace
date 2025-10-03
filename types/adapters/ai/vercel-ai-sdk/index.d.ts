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
  defaultModel: string;

  /** Maximum tokens for generation */
  maxTokens: number;

  /** Temperature for generation */
  temperature: number;
}

export interface AiVercelAiSdkFeatures {}

// 🚀 Auto-discovered artifacts
export declare const AiVercelAiSdkArtifacts: {
  creates: [
    'src/lib/ai/config.ts',
    'src/lib/ai/providers.ts',
    'src/hooks/use-chat.ts',
    'src/hooks/use-completion.ts',
    'src/hooks/use-streaming.ts',
    'src/lib/ai/utils.ts',
    'src/types/ai.ts',
    'src/app/api/chat/route.ts',
    'src/app/api/completion/route.ts',
    'src/contexts/AIProvider.tsx'
  ],
  enhances: [
    '.env.example'
  ],
  installs: [
    { packages: ['ai', '@ai-sdk/react', '@ai-sdk/openai', '@ai-sdk/anthropic'], isDev: false },
    { packages: ['@types/node'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type AiVercelAiSdkCreates = typeof AiVercelAiSdkArtifacts.creates[number];
export type AiVercelAiSdkEnhances = typeof AiVercelAiSdkArtifacts.enhances[number];
