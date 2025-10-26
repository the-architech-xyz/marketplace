/**
 * Vercel AI SDK Configuration
 * 
 * Central configuration for AI providers and models.
 * This file ONLY contains configuration - no business logic.
 */

/**
 * AI Configuration
 */
export const AI_CONFIG = {
  // Default provider
  defaultProvider: '<%= params.providers?.[0] || 'openai' %>' as const,
  
  // Default model
  defaultModel: '<%= params.defaultModel || 'gpt-3.5-turbo' %>' as const,
  
  // Default parameters
  maxTokens: <%= params.maxTokens || 1000 %>,
  temperature: <%= params.temperature || 0.7 %>,
  
  // Feature flags
  features: {
    streaming: <%= params.features?.streaming !== false %>,
    functionCalling: <%= params.features?.tools || false %>,
    embeddings: <%= params.features?.embeddings || false %>,
  },
} as const;

/**
 * Provider Configuration
 * 
 * API keys should be stored in environment variables:
 * - OPENAI_API_KEY
 * - ANTHROPIC_API_KEY
 * - GOOGLE_API_KEY
 * - etc.
 */
export const PROVIDER_CONFIG = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    baseURL: process.env.ANTHROPIC_BASE_URL,
  },
  <% if (params.providers?.includes('google')) { %>
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
  },
  <% } %>
  <% if (params.providers?.includes('cohere')) { %>
  cohere: {
    apiKey: process.env.COHERE_API_KEY,
  },
  <% } %>
  <% if (params.providers?.includes('huggingface')) { %>
  huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY,
  },
  <% } %>
} as const;

/**
 * Model Configuration
 * 
 * Defines available models and their capabilities.
 */
export const MODEL_CONFIG = {
  // OpenAI models
  'gpt-3.5-turbo': {
    provider: 'openai',
    maxTokens: 4096,
    supportsStreaming: true,
    supportsFunctionCalling: true,
  },
  'gpt-4': {
    provider: 'openai',
    maxTokens: 8192,
    supportsStreaming: true,
    supportsFunctionCalling: true,
  },
  'gpt-4-turbo': {
    provider: 'openai',
    maxTokens: 128000,
    supportsStreaming: true,
    supportsFunctionCalling: true,
  },
  
  // Anthropic models
  'claude-3-haiku': {
    provider: 'anthropic',
    maxTokens: 4096,
    supportsStreaming: true,
    supportsFunctionCalling: true,
  },
  'claude-3-sonnet': {
    provider: 'anthropic',
    maxTokens: 4096,
    supportsStreaming: true,
    supportsFunctionCalling: true,
  },
  'claude-3-opus': {
    provider: 'anthropic',
    maxTokens: 4096,
    supportsStreaming: true,
    supportsFunctionCalling: true,
  },
  <% if (params.providers?.includes('google')) { %>
  
  // Google models
  'gemini-pro': {
    provider: 'google',
    maxTokens: 32768,
    supportsStreaming: true,
    supportsFunctionCalling: false,
  },
  <% } %>
} as const;

export type ModelId = keyof typeof MODEL_CONFIG;
export type ProviderId = keyof typeof PROVIDER_CONFIG;
