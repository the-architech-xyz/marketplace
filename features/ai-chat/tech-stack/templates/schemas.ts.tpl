/**
 * AI Chat Zod Schemas
 * 
 * Validation schemas for AI chat data.
 */

import { z } from 'zod';

// ============================================================================
// ENUMS
// ============================================================================

export const MessageRoleSchema = z.enum(['user', 'assistant', 'system', 'function']);
export const ConversationStatusSchema = z.enum(['active', 'archived', 'deleted']);
export const AIProviderSchema = z.enum(['openai', 'anthropic', 'google', 'cohere', 'huggingface']);

// ============================================================================
// MESSAGE SCHEMAS
// ============================================================================

export const AIMessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  role: MessageRoleSchema,
  content: z.string(),
  tokens: z.number().optional(),
  model: z.string().optional(),
  cost: z.number().optional(),
  error: z.string().optional(),
  errorCode: z.string().optional(),
  attachments: z.array(z.object({
    type: z.enum(['image', 'file', 'code']),
    url: z.string().optional(),
    name: z.string().optional(),
    size: z.number().optional(),
    mimeType: z.string().optional(),
  })).optional(),
  functionCall: z.object({
    name: z.string(),
    arguments: z.record(z.any()),
    result: z.any().optional(),
  }).optional(),
  toolUse: z.object({
    toolName: z.string(),
    toolInput: z.record(z.any()),
    toolOutput: z.any().optional(),
  }).optional(),
  createdAt: z.date(),
});

export type AIMessage = z.infer<typeof AIMessageSchema>;

// ============================================================================
// CONVERSATION SCHEMAS
// ============================================================================

export const AIConversationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  status: ConversationStatusSchema,
  model: z.string(),
  provider: AIProviderSchema,
  temperature: z.number().min(0).max(200).optional(), // 0-200 (0.0-2.0 scaled by 100)
  maxTokens: z.number().optional(),
  systemPrompt: z.string().optional(),
  totalMessages: z.number().default(0),
  totalTokens: z.number().default(0),
  estimatedCost: z.number().default(0),
  settings: z.object({
    streaming: z.boolean().optional(),
    codeHighlighting: z.boolean().optional(),
    voiceEnabled: z.boolean().optional(),
    autoSave: z.boolean().optional(),
  }).optional(),
  lastMessageAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AIConversation = z.infer<typeof AIConversationSchema>;

// ============================================================================
// INPUT SCHEMAS (for API requests)
// ============================================================================

export const CreateConversationSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  model: z.string().default('gpt-3.5-turbo'),
  provider: AIProviderSchema.default('openai'),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().min(1).max(128000).optional(),
  systemPrompt: z.string().optional(),
});

export type CreateConversationData = z.infer<typeof CreateConversationSchema>;

export const UpdateConversationSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  status: ConversationStatusSchema.optional(),
  systemPrompt: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().min(1).max(128000).optional(),
});

export type UpdateConversationData = z.infer<typeof UpdateConversationSchema>;

export const SendMessageSchema = z.object({
  content: z.string().min(1),
  conversationId: z.string().optional(),
  model: z.string().optional(),
  provider: AIProviderSchema.optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().min(1).max(128000).optional(),
  systemPrompt: z.string().optional(),
});

export type SendMessageData = z.infer<typeof SendMessageSchema>;

// ============================================================================
// USAGE SCHEMAS
// ============================================================================

export const AIUsageSchema = z.object({
  id: z.string(),
  userId: z.string(),
  conversationId: z.string().optional(),
  model: z.string(),
  provider: AIProviderSchema,
  promptTokens: z.number(),
  completionTokens: z.number(),
  totalTokens: z.number(),
  cost: z.number(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.date(),
});

export type AIUsage = z.infer<typeof AIUsageSchema>;

// ============================================================================
// PROMPT SCHEMAS
// ============================================================================

export const PromptVisibilitySchema = z.enum(['private', 'team', 'public']);

export const AIPromptSchema = z.object({
  id: z.string(),
  userId: z.string(),
  teamId: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  prompt: z.string(),
  systemPrompt: z.string().optional(),
  visibility: PromptVisibilitySchema,
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  config: z.object({
    model: z.string().optional(),
    temperature: z.number().optional(),
    maxTokens: z.number().optional(),
  }).optional(),
  useCount: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AIPrompt = z.infer<typeof AIPromptSchema>;

export const CreatePromptSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  prompt: z.string().min(1),
  systemPrompt: z.string().optional(),
  visibility: PromptVisibilitySchema.default('private'),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  config: z.object({
    model: z.string().optional(),
    temperature: z.number().optional(),
    maxTokens: z.number().optional(),
  }).optional(),
});

export type CreatePromptData = z.infer<typeof CreatePromptSchema>;

// ============================================================================
// ANALYTICS SCHEMAS
// ============================================================================

export const ChatAnalyticsSchema = z.object({
  totalConversations: z.number(),
  totalMessages: z.number(),
  totalTokens: z.number(),
  totalCost: z.number(),
  averageMessagesPerConversation: z.number(),
  averageTokensPerMessage: z.number(),
  mostUsedModel: z.string(),
  conversationGrowth: z.array(z.object({
    date: z.string(),
    count: z.number(),
  })),
  tokenUsage: z.array(z.object({
    date: z.string(),
    tokens: z.number(),
  })),
  costTrend: z.array(z.object({
    date: z.string(),
    cost: z.number(),
  })),
});

export type ChatAnalytics = z.infer<typeof ChatAnalyticsSchema>;

// ============================================================================
// ERROR SCHEMAS
// ============================================================================

export const AIChatErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  type: z.enum(['model_error', 'rate_limit_error', 'quota_error', 'network_error', 'validation_error']),
  details: z.object({
    model: z.string().optional(),
    tokens: z.number().optional(),
    retryAfter: z.number().optional(),
    quota: z.object({
      limit: z.number(),
      used: z.number(),
      remaining: z.number(),
    }).optional(),
  }).optional(),
});

export type AIChatError = z.infer<typeof AIChatErrorSchema>;
