/**
 * AI Chat Feature (Shadcn)
 * 
 * Complete AI chat interface using Shadcn components
 */

export interface FeaturesAiChatFrontendShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential chat functionality (interface, message history) */
    core?: boolean;

    /** File upload and media support */
    media?: boolean;

    /** Voice input and output */
    voice?: boolean;

    /** Advanced features (custom prompts, export/import) */
    advanced?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesAiChatFrontendShadcnFeatures {

  /** Essential chat functionality (interface, message history) */
  core: boolean;

  /** File upload and media support */
  media: boolean;

  /** Voice input and output */
  voice: boolean;

  /** Advanced features (custom prompts, export/import) */
  advanced: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesAiChatFrontendShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesAiChatFrontendShadcnCreates = typeof FeaturesAiChatFrontendShadcnArtifacts.creates[number];
export type FeaturesAiChatFrontendShadcnEnhances = typeof FeaturesAiChatFrontendShadcnArtifacts.enhances[number];
