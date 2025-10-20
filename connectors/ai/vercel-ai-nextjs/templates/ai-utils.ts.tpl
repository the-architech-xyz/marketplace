/**
 * AI Utilities
 * 
 * Utility functions for AI functionality using Vercel AI SDK.
 * Based on modern Next.js and TypeScript best practices.
 */

import { generateText, generateObject, streamText, streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

// Types
export interface AIProvider {
  id: string;
  name: string;
  model: string;
  apiKey: string;
  enabled: boolean;
}

export interface AIResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason?: string;
}

export interface AIStreamResponse {
  text: string;
  isComplete: boolean;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIConfig {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
}

// Provider configuration
export const AI_PROVIDERS: Record<string, AIProvider> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    model: 'gpt-4',
    apiKey: process.env.OPENAI_API_KEY || '',
    enabled: !!process.env.OPENAI_API_KEY,
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    model: 'claude-3-sonnet-20240229',
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    enabled: !!process.env.ANTHROPIC_API_KEY,
  },
};

// Get AI provider
export function getAIProvider(providerId: string = 'openai') {
  const provider = AI_PROVIDERS[providerId];
  if (!provider || !provider.enabled) {
    throw new Error(`Provider ${providerId} is not available or not configured`);
  }
  return provider;
}

// Get AI model
export function getAIModel(providerId: string = 'openai') {
  const provider = getAIProvider(providerId);
  
  switch (providerId) {
    case 'openai':
      return openai(provider.model);
    case 'anthropic':
      return anthropic(provider.model);
    default:
      throw new Error(`Unsupported provider: ${providerId}`);
  }
}

// Generate text
export async function generateAIText(
  prompt: string,
  config: AIConfig = {},
  providerId: string = 'openai'
): Promise<AIResponse> {
  try {
    const model = getAIModel(providerId);
    
    const result = await generateText({
      model,
      prompt,
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1000,
      topP: config.topP ?? 1,
      frequencyPenalty: config.frequencyPenalty ?? 0,
      presencePenalty: config.presencePenalty ?? 0,
      stop: config.stop,
    });

    return {
      text: result.text,
      usage: result.usage,
      finishReason: result.finishReason,
    };
  } catch (error) {
    console.error('AI text generation failed:', error);
    throw new Error(`AI text generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Generate structured object
export async function generateAIObject<T>(
  prompt: string,
  schema: any,
  config: AIConfig = {},
  providerId: string = 'openai'
): Promise<T> {
  try {
    const model = getAIModel(providerId);
    
    const result = await generateObject({
      model,
      prompt,
      schema,
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1000,
      topP: config.topP ?? 1,
      frequencyPenalty: config.frequencyPenalty ?? 0,
      presencePenalty: config.presencePenalty ?? 0,
      stop: config.stop,
    });

    return result.object as T;
  } catch (error) {
    console.error('AI object generation failed:', error);
    throw new Error(`AI object generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Stream text
export async function* streamAIText(
  prompt: string,
  config: AIConfig = {},
  providerId: string = 'openai'
): AsyncGenerator<AIStreamResponse, void, unknown> {
  try {
    const model = getAIModel(providerId);
    
    const result = await streamText({
      model,
      prompt,
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1000,
      topP: config.topP ?? 1,
      frequencyPenalty: config.frequencyPenalty ?? 0,
      presencePenalty: config.presencePenalty ?? 0,
      stop: config.stop,
    });

    for await (const delta of result.textStream) {
      yield {
        text: delta,
        isComplete: false,
      };
    }

    yield {
      text: '',
      isComplete: true,
      usage: result.usage,
    };
  } catch (error) {
    console.error('AI text streaming failed:', error);
    throw new Error(`AI text streaming failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Stream structured object
export async function* streamAIObject<T>(
  prompt: string,
  schema: any,
  config: AIConfig = {},
  providerId: string = 'openai'
): AsyncGenerator<T, void, unknown> {
  try {
    const model = getAIModel(providerId);
    
    const result = await streamObject({
      model,
      prompt,
      schema,
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1000,
      topP: config.topP ?? 1,
      frequencyPenalty: config.frequencyPenalty ?? 0,
      presencePenalty: config.presencePenalty ?? 0,
      stop: config.stop,
    });

    for await (const delta of result.objectStream) {
      yield delta as T;
    }
  } catch (error) {
    console.error('AI object streaming failed:', error);
    throw new Error(`AI object streaming failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Utility functions
export function estimateTokens(text: string): number {
  // Rough estimation: 1 token ≈ 4 characters for English text
  return Math.ceil(text.length / 4);
}

export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  providerId: string = 'openai'
): number {
  const costs = {
    openai: {
      'gpt-4': { input: 0.03, output: 0.06 },
      'gpt-3.5-turbo': { input: 0.001, output: 0.002 },
    },
    anthropic: {
      'claude-3-sonnet-20240229': { input: 0.003, output: 0.015 },
      'claude-3-haiku-20240307': { input: 0.00025, output: 0.00125 },
    },
  };

  const provider = getAIProvider(providerId);
  const modelCosts = costs[providerId as keyof typeof costs]?.[provider.model as keyof any];
  
  if (!modelCosts) {
    return 0; // Unknown model, return 0 cost
  }

  const inputCost = (inputTokens / 1000) * modelCosts.input;
  const outputCost = (outputTokens / 1000) * modelCosts.output;
  
  return inputCost + outputCost;
}

export function formatCost(cost: number): string {
  if (cost < 0.001) {
    return '< $0.001';
  }
  return `$${cost.toFixed(4)}`;
}

export function formatTokens(tokens: number): string {
  if (tokens < 1000) {
    return `${tokens} tokens`;
  }
  return `${(tokens / 1000).toFixed(1)}K tokens`;
}

// Validation functions
export function validatePrompt(prompt: string): { valid: boolean; error?: string } {
  if (!prompt || prompt.trim().length === 0) {
    return { valid: false, error: 'Prompt cannot be empty' };
  }

  if (prompt.length > 10000) {
    return { valid: false, error: 'Prompt is too long (max 10,000 characters)' };
  }

  return { valid: true };
}

export function validateConfig(config: AIConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (config.temperature !== undefined && (config.temperature < 0 || config.temperature > 2)) {
    errors.push('Temperature must be between 0 and 2');
  }

  if (config.maxTokens !== undefined && config.maxTokens < 1) {
    errors.push('Max tokens must be at least 1');
  }

  if (config.topP !== undefined && (config.topP < 0 || config.topP > 1)) {
    errors.push('Top P must be between 0 and 1');
  }

  if (config.frequencyPenalty !== undefined && (config.frequencyPenalty < -2 || config.frequencyPenalty > 2)) {
    errors.push('Frequency penalty must be between -2 and 2');
  }

  if (config.presencePenalty !== undefined && (config.presencePenalty < -2 || config.presencePenalty > 2)) {
    errors.push('Presence penalty must be between -2 and 2');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Error handling
export class AIError extends Error {
  constructor(
    message: string,
    public code: string,
    public provider?: string,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'AIError';
  }
}

export function handleAIError(error: any): AIError {
  if (error instanceof AIError) {
    return error;
  }

  // Handle common error types
  if (error.message?.includes('API key')) {
    return new AIError('Invalid API key', 'INVALID_API_KEY', undefined, false);
  }

  if (error.message?.includes('rate limit')) {
    return new AIError('Rate limit exceeded', 'RATE_LIMIT', undefined, true);
  }

  if (error.message?.includes('quota')) {
    return new AIError('API quota exceeded', 'QUOTA_EXCEEDED', undefined, false);
  }

  if (error.message?.includes('model')) {
    return new AIError('Model not available', 'MODEL_UNAVAILABLE', undefined, false);
  }

  if (error.message?.includes('timeout')) {
    return new AIError('Request timeout', 'TIMEOUT', undefined, true);
  }

  // Default error
  return new AIError(
    error.message || 'An unexpected error occurred',
    'UNKNOWN_ERROR',
    undefined,
    false
  );
}

// Retry logic
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      const aiError = handleAIError(error);
      if (!aiError.retryable || attempt === maxRetries) {
        throw aiError;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }

  throw lastError!;
}

// Cache utilities
export class AICache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Global cache instance
export const aiCache = new AICache();
