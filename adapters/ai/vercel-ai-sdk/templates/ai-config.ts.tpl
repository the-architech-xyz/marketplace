import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

/**
 * AI Configuration
 * Centralized configuration for all AI providers and models
 */

export const AI_CONFIG = {
  // Default model settings
  defaultModel: '<%= context.defaultModel || "gpt-3.5-turbo" %>',
  maxTokens: <%= context.maxTokens || 1000 %>,
  temperature: <%= context.temperature || 0.7 %>,
  
  // Available models
  models: {
    openai: {
      'gpt-3.5-turbo': {
        provider: openai,
        model: 'gpt-3.5-turbo',
        maxTokens: 4096,
        cost: 0.0015, // per 1K tokens
      },
      'gpt-4': {
        provider: openai,
        model: 'gpt-4',
        maxTokens: 8192,
        cost: 0.03, // per 1K tokens
      },
      'gpt-4-turbo': {
        provider: openai,
        model: 'gpt-4-turbo-preview',
        maxTokens: 128000,
        cost: 0.01, // per 1K tokens
      },
    },
    anthropic: {
      'claude-3-sonnet': {
        provider: anthropic,
        model: 'claude-3-sonnet-20240229',
        maxTokens: 200000,
        cost: 0.003, // per 1K tokens
      },
      'claude-3-opus': {
        provider: anthropic,
        model: 'claude-3-opus-20240229',
        maxTokens: 200000,
        cost: 0.015, // per 1K tokens
      },
    },
  },
  
  // Feature flags
  features: {
    streaming: <%= context.hasStreaming ?? true %>,
    chat: <%= context.hasChat ?? true %>,
    textGeneration: <%= context.hasTextGeneration ?? true %>,
    imageGeneration: <%= context.hasImageGeneration ?? false %>,
    embeddings: <%= context.hasEmbeddings ?? false %>,
    functionCalling: <%= context.hasFunctionCalling ?? false %>,
  },
  
  // Rate limiting
  rateLimit: {
    requestsPerMinute: 60,
    tokensPerMinute: 150000,
  },
  
  // Caching
  cache: {
    enabled: true,
    ttl: 300, // 5 minutes
    maxSize: 1000, // max cached responses
  },
};

// Get model configuration
export function getModelConfig(provider: string, model: string) {
  const providerConfig = AI_CONFIG.models[provider as keyof typeof AI_CONFIG.models];
  if (!providerConfig) {
    throw new Error(`Provider ${provider} not supported`);
  }
  
  const modelConfig = providerConfig[model as keyof typeof providerConfig];
  if (!modelConfig) {
    throw new Error(`Model ${model} not supported for provider ${provider}`);
  }
  
  return modelConfig;
}

// Get default model configuration
export function getDefaultModelConfig() {
  const [provider, model] = AI_CONFIG.defaultModel.split(':');
  return getModelConfig(provider, model);
}

// Check if feature is enabled
export function isFeatureEnabled(feature: keyof typeof AI_CONFIG.features): boolean {
  return AI_CONFIG.features[feature];
}

// Get available models for a provider
export function getAvailableModels(provider: string) {
  const providerConfig = AI_CONFIG.models[provider as keyof typeof AI_CONFIG.models];
  if (!providerConfig) {
    return [];
  }
  
  return Object.keys(providerConfig);
}

// Get all available providers
export function getAvailableProviders() {
  return Object.keys(AI_CONFIG.models);
}
