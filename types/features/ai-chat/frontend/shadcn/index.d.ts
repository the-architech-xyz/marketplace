/**
 * AI Chat Feature (Shadcn)
 * 
 * Complete modular AI chat interface using Shadcn components
 */

export interface FeaturesAiChatFrontendShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential chat interface with basic messaging */
    core?: boolean;

    /** Chat context and provider management */
    context?: boolean;

    /** File upload and media preview capabilities */
    media?: boolean;

    /** Voice input and output functionality */
    voice?: boolean;

    /** Advanced conversation history and management */
    history?: boolean;

    /** Advanced message input with features */
    input?: boolean;

    /** Chat toolbar and controls */
    toolbar?: boolean;

    /** Chat settings and configuration */
    settings?: boolean;

    /** Custom prompts and templates */
    prompts?: boolean;

    /** Chat export and import functionality */
    export?: boolean;

    /** Chat analytics and insights */
    analytics?: boolean;

    /** Project-based chat organization */
    projects?: boolean;

    /** Chat middleware and routing */
    middleware?: boolean;

    /** AI chat service utilities */
    services?: boolean;

    /** Text completion and generation */
    completion?: boolean;
  };

  /** UI theme variant */
  theme?: 'default' | 'dark' | 'light' | 'minimal';
}

export interface FeaturesAiChatFrontendShadcnFeatures {

  /** Essential chat interface with basic messaging */
  core: boolean;

  /** Chat context and provider management */
  context: boolean;

  /** File upload and media preview capabilities */
  media: boolean;

  /** Voice input and output functionality */
  voice: boolean;

  /** Advanced conversation history and management */
  history: boolean;

  /** Advanced message input with features */
  input: boolean;

  /** Chat toolbar and controls */
  toolbar: boolean;

  /** Chat settings and configuration */
  settings: boolean;

  /** Custom prompts and templates */
  prompts: boolean;

  /** Chat export and import functionality */
  export: boolean;

  /** Chat analytics and insights */
  analytics: boolean;

  /** Project-based chat organization */
  projects: boolean;

  /** Chat middleware and routing */
  middleware: boolean;

  /** AI chat service utilities */
  services: boolean;

  /** Text completion and generation */
  completion: boolean;
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
