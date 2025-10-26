/**
 * Vercel AI SDK Types
 * 
 * Type definitions for AI functionality.
 * These extend/augment types from the 'ai' package.
 */

import { Message as VercelMessage } from 'ai';

/**
 * AI Message
 * 
 * Extended message type with additional metadata.
 */
export interface AIMessage extends VercelMessage {
  tokens?: number;
  cost?: number;
  model?: string;
  error?: string;
}

/**
 * AI Conversation
 * 
 * Represents a chat conversation.
 */
export interface AIConversation {
  id: string;
  userId: string;
  title: string;
  status: 'active' | 'archived' | 'deleted';
  model: string;
  provider: string;
  totalMessages: number;
  totalTokens: number;
  estimatedCost: number;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt?: Date;
}

/**
 * AI Provider
 */
export type AIProvider = 'openai' | 'anthropic'<% if (params.providers?.includes('google')) { %> | 'google'<% } %><% if (params.providers?.includes('cohere')) { %> | 'cohere'<% } %><% if (params.providers?.includes('huggingface')) { %> | 'huggingface'<% } %>;

/**
 * AI Model Configuration
 */
export interface AIModelConfig {
  provider: AIProvider;
  maxTokens: number;
  supportsStreaming: boolean;
  supportsFunctionCalling: boolean;
}

/**
 * Chat Options
 */
export interface AIChatOptions {
  conversationId?: string;
  model?: string;
  provider?: AIProvider;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

/**
 * Completion Options
 */
export interface AICompletionOptions {
  model?: string;
  provider?: AIProvider;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Usage Metrics
 */
export interface AIUsageMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number; // in cents
}
