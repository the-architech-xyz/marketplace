/**
 * AI Chat Database Schema (Database-Agnostic)
 * 
 * This schema stores chat conversations, messages, custom prompts, and usage analytics.
 * Works with any database (Postgres, MySQL, SQLite, etc.)
 * 
 * NOTE: Vercel AI SDK handles streaming, this layer handles persistence.
 */

import { pgTable, text, timestamp, integer, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// ============================================================================
// ENUMS
// ============================================================================

export const messageRoleEnum = pgEnum('message_role', ['user', 'assistant', 'system', 'function']);
export const conversationStatusEnum = pgEnum('conversation_status', ['active', 'archived', 'deleted']);
export const promptVisibilityEnum = pgEnum('prompt_visibility', ['private', 'team', 'public']);

// ============================================================================
// AI CONVERSATIONS
// ============================================================================

/**
 * AI Conversations Table
 * 
 * Stores chat sessions/conversations.
 * Each conversation is a series of messages between user and AI.
 */
export const aiConversations = pgTable('ai_conversations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // User
  userId: text('user_id').notNull(), // References users.id
  
  // Conversation details
  title: text('title').notNull(),
  status: conversationStatusEnum('status').notNull().default('active'),
  
  // AI configuration
  model: text('model').notNull(), // 'gpt-4', 'claude-3-sonnet', etc.
  provider: text('provider').notNull().default('openai'), // 'openai', 'anthropic', 'google'
  temperature: integer('temperature'), // 0-200 (0.0-2.0 scaled by 100)
  maxTokens: integer('max_tokens'),
  systemPrompt: text('system_prompt'),
  
  // Statistics
  totalMessages: integer('total_messages').notNull().default(0),
  totalTokens: integer('total_tokens').notNull().default(0),
  estimatedCost: integer('estimated_cost').notNull().default(0), // in cents
  
  // Settings
  settings: jsonb('settings').$type<{
    streaming?: boolean;
    codeHighlighting?: boolean;
    voiceEnabled?: boolean;
    autoSave?: boolean;
  }>(),
  
  // Timestamps
  lastMessageAt: timestamp('last_message_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============================================================================
// AI MESSAGES
// ============================================================================

/**
 * AI Messages Table
 * 
 * Stores individual messages within conversations.
 * Includes user messages, assistant responses, and system messages.
 */
export const aiMessages = pgTable('ai_messages', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Conversation
  conversationId: text('conversation_id').notNull(), // References ai_conversations.id
  
  // Message details
  role: messageRoleEnum('role').notNull(),
  content: text('content').notNull(),
  
  // Metadata
  tokens: integer('tokens'), // Token count for this message
  model: text('model'), // Model used (if different from conversation default)
  cost: integer('cost'), // Cost in cents
  
  // Attachments (optional)
  attachments: jsonb('attachments').$type<Array<{
    type: 'image' | 'file' | 'code';
    url?: string;
    name?: string;
    size?: number;
    mimeType?: string;
  }>>(),
  
  // Function calling (optional)
  functionCall: jsonb('function_call').$type<{
    name: string;
    arguments: Record<string, any>;
    result?: any;
  }>(),
  
  // Tool use (optional)
  toolUse: jsonb('tool_use').$type<{
    toolName: string;
    toolInput: Record<string, any>;
    toolOutput?: any;
  }>(),
  
  // Error tracking
  error: text('error'),
  errorCode: text('error_code'),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================================================
// AI PROMPTS (Custom Prompt Library)
// ============================================================================

/**
 * AI Prompts Table
 * 
 * Stores custom prompts created by users.
 * Can be private, shared with team, or public.
 */
export const aiPrompts = pgTable('ai_prompts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // User
  userId: text('user_id').notNull(), // References users.id
  teamId: text('team_id'), // References teams.id (if team prompt)
  
  // Prompt details
  name: text('name').notNull(),
  description: text('description'),
  prompt: text('prompt').notNull(),
  systemPrompt: text('system_prompt'), // Optional system prompt
  
  // Visibility
  visibility: promptVisibilityEnum('visibility').notNull().default('private'),
  
  // Categorization
  category: text('category'), // 'coding', 'writing', 'analysis', 'creative', etc.
  tags: jsonb('tags').$type<string[]>(),
  
  // Configuration
  config: jsonb('config').$type<{
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }>(),
  
  // Usage tracking
  useCount: integer('use_count').notNull().default(0),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============================================================================
// AI USAGE TRACKING (for analytics & billing)
// ============================================================================

/**
 * AI Usage Table
 * 
 * Tracks token usage and costs for analytics and billing.
 * Aggregates data for reporting.
 */
export const aiUsage = pgTable('ai_usage', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // User
  userId: text('user_id').notNull(), // References users.id
  conversationId: text('conversation_id'), // References ai_conversations.id (optional)
  
  // Usage details
  model: text('model').notNull(),
  provider: text('provider').notNull(), // 'openai', 'anthropic', 'google', etc.
  
  // Token tracking
  promptTokens: integer('prompt_tokens').notNull(),
  completionTokens: integer('completion_tokens').notNull(),
  totalTokens: integer('total_tokens').notNull(),
  
  // Cost tracking
  cost: integer('cost').notNull(), // in cents
  
  // Request metadata
  metadata: jsonb('metadata').$type<{
    endpoint?: string;
    duration?: number; // in milliseconds
    error?: string;
    statusCode?: number;
  }>(),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ============================================================================
// AI CONVERSATION SHARES (Optional - for sharing conversations)
// ============================================================================

/**
 * AI Conversation Shares Table
 * 
 * Allows users to share conversations via links.
 * Optional feature for collaboration.
 */
export const aiConversationShares = pgTable('ai_conversation_shares', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Conversation
  conversationId: text('conversation_id').notNull(), // References ai_conversations.id
  userId: text('user_id').notNull(), // References users.id (owner)
  
  // Share details
  shareToken: text('share_token').notNull().unique(),
  title: text('title'),
  description: text('description'),
  
  // Access control
  isPublic: boolean('is_public').notNull().default(false),
  requireAuth: boolean('require_auth').notNull().default(false),
  allowComments: boolean('allow_comments').notNull().default(false),
  
  // Statistics
  viewCount: integer('view_count').notNull().default(0),
  
  // Expiration
  expiresAt: timestamp('expires_at'),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ============================================================================
// INDEXES (for performance)
// ============================================================================

// Conversations indexes
export const aiConversationsIndexes = {
  userId: aiConversations.userId,
  status: aiConversations.status,
  lastMessageAt: aiConversations.lastMessageAt,
  provider: aiConversations.provider,
  model: aiConversations.model,
};

// Messages indexes
export const aiMessagesIndexes = {
  conversationId: aiMessages.conversationId,
  role: aiMessages.role,
  createdAt: aiMessages.createdAt,
};

// Prompts indexes
export const aiPromptsIndexes = {
  userId: aiPrompts.userId,
  teamId: aiPrompts.teamId,
  visibility: aiPrompts.visibility,
  category: aiPrompts.category,
};

// Usage indexes
export const aiUsageIndexes = {
  userId: aiUsage.userId,
  conversationId: aiUsage.conversationId,
  provider: aiUsage.provider,
  model: aiUsage.model,
  createdAt: aiUsage.createdAt,
};

// Shares indexes
export const aiConversationSharesIndexes = {
  conversationId: aiConversationShares.conversationId,
  shareToken: aiConversationShares.shareToken,
  userId: aiConversationShares.userId,
  isPublic: aiConversationShares.isPublic,
};



