/**
 * AI Chat Feature Zod Schemas
 * 
 * Technology-agnostic validation schemas for the AI Chat feature.
 * These schemas provide runtime validation for all data types.
 * 
 * Generated from: contract.ts
 */

import { z } from 'zod';

// ============================================================================
// CORE SCHEMAS
// ============================================================================

export const MessageRoleSchema = z.enum(['user', 'assistant', 'system']);
export const MessageStatusSchema = z.enum(['sending', 'sent', 'failed', 'streaming']);
export const ChatStatusSchema = z.enum(['idle', 'loading', 'streaming', 'error']);
export const ModelProviderSchema = z.enum(['openai', 'anthropic', 'google', 'azure', 'custom']);

// ============================================================================
// DATA SCHEMAS
// ============================================================================

export const MessageAttachmentSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['image', 'file', 'code', 'url']),
  name: z.string().min(1),
  url: z.string().url(),
  size: z.number().positive().optional(),
  mimeType: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const MessageSchema = z.object({
  id: z.string().uuid(),
  role: MessageRoleSchema,
  content: z.string().min(1),
  status: MessageStatusSchema,
  timestamp: z.string().datetime(),
  metadata: z.object({
    model: z.string().optional(),
    tokens: z.number().positive().optional(),
    cost: z.number().positive().optional(),
    duration: z.number().positive().optional(),
    error: z.string().optional(),
  }).optional(),
  attachments: z.array(MessageAttachmentSchema).optional(),
});

export const ChatSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  messages: z.array(MessageSchema),
  status: ChatStatusSchema,
  model: z.string().min(1),
  provider: ModelProviderSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.string().uuid(),
  metadata: z.object({
    totalTokens: z.number().positive().optional(),
    totalCost: z.number().positive().optional(),
    messageCount: z.number().positive().optional(),
    lastActivity: z.string().datetime().optional(),
  }).optional(),
});

export const ConversationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  userId: z.string().uuid(),
  status: z.enum(['active', 'archived']),
  settings: z.object({
    model: z.string().min(1),
    temperature: z.number().min(0).max(2),
    maxTokens: z.number().positive(),
    systemPrompt: z.string().optional(),
  }),
  messageCount: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// INPUT SCHEMAS
// ============================================================================

export const SendMessageDataSchema = z.object({
  content: z.string().min(1).max(10000),
  chatId: z.string().uuid().optional(),
  model: z.string().min(1).optional(),
  attachments: z.array(MessageAttachmentSchema).optional(),
  systemPrompt: z.string().max(2000).optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().positive().optional(),
  stream: z.boolean().optional(),
});

export const CreateChatDataSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  model: z.string().min(1),
  systemPrompt: z.string().max(2000).optional(),
  metadata: z.record(z.any()).optional(),
});

export const UpdateChatDataSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  model: z.string().min(1).optional(),
  systemPrompt: z.string().max(2000).optional(),
  metadata: z.record(z.any()).optional(),
});

export const CreateConversationDataSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  settings: z.object({
    model: z.string().min(1).optional(),
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().positive().optional(),
    systemPrompt: z.string().max(2000).optional(),
  }).optional(),
});

export const UpdateConversationDataSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  settings: z.object({
    model: z.string().min(1).optional(),
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().positive().optional(),
    systemPrompt: z.string().max(2000).optional(),
  }).optional(),
});

export const UpdateMessageDataSchema = z.object({
  content: z.string().min(1).max(10000).optional(),
  metadata: z.record(z.any()).optional(),
});

export const UploadFileDataSchema = z.object({
  file: z.instanceof(File),
  chatId: z.string().uuid().optional(),
  type: z.enum(['image', 'document', 'code']).optional(),
});

export const ExportChatDataSchema = z.object({
  chatId: z.string().uuid(),
  format: z.enum(['json', 'markdown', 'pdf', 'txt']),
  includeMetadata: z.boolean().optional(),
});

export const ImportChatDataSchema = z.object({
  file: z.instanceof(File),
  format: z.enum(['json', 'markdown', 'txt']),
});

// ============================================================================
// RESULT SCHEMAS
// ============================================================================

export const SendMessageResultSchema = z.object({
  message: MessageSchema,
  chat: ChatSchema,
  streamId: z.string().optional(),
});

export const StreamMessageResultSchema = z.object({
  messageId: z.string().uuid(),
  content: z.string(),
  isComplete: z.boolean(),
  metadata: z.object({
    tokens: z.number().positive().optional(),
    cost: z.number().positive().optional(),
  }).optional(),
});

export const UploadFileResultSchema = z.object({
  attachment: MessageAttachmentSchema,
  message: MessageSchema.optional(),
});

export const ExportChatResultSchema = z.object({
  url: z.string().url(),
  filename: z.string().min(1),
  size: z.number().positive(),
});

export const ImportChatResultSchema = z.object({
  chat: ChatSchema,
  messageCount: z.number().positive(),
  importedAt: z.string().datetime(),
});

// ============================================================================
// ANALYTICS SCHEMAS
// ============================================================================

export const ChatAnalyticsSchema = z.object({
  totalChats: z.number().positive(),
  totalMessages: z.number().positive(),
  totalTokens: z.number().positive(),
  totalCost: z.number().positive(),
  averageMessagesPerChat: z.number().positive(),
  averageTokensPerMessage: z.number().positive(),
  mostUsedModel: z.string().min(1),
  chatGrowth: z.array(z.object({
    date: z.string().datetime(),
    count: z.number().positive(),
  })),
  tokenUsage: z.array(z.object({
    date: z.string().datetime(),
    tokens: z.number().positive(),
  })),
  costTrend: z.array(z.object({
    date: z.string().datetime(),
    cost: z.number().positive(),
  })),
});

export const UsageStatsSchema = z.object({
  daily: z.object({
    chats: z.number().positive(),
    messages: z.number().positive(),
    tokens: z.number().positive(),
    cost: z.number().positive(),
  }),
  weekly: z.object({
    chats: z.number().positive(),
    messages: z.number().positive(),
    tokens: z.number().positive(),
    cost: z.number().positive(),
  }),
  monthly: z.object({
    chats: z.number().positive(),
    messages: z.number().positive(),
    tokens: z.number().positive(),
    cost: z.number().positive(),
  }),
  limits: z.object({
    dailyChats: z.number().positive(),
    dailyMessages: z.number().positive(),
    dailyTokens: z.number().positive(),
    dailyCost: z.number().positive(),
  }),
  usage: z.object({
    dailyChats: z.number().positive(),
    dailyMessages: z.number().positive(),
    dailyTokens: z.number().positive(),
    dailyCost: z.number().positive(),
  }),
});

// ============================================================================
// CONFIGURATION SCHEMAS
// ============================================================================

export const AIChatConfigSchema = z.object({
  models: z.object({
    default: z.string().min(1),
    available: z.array(z.string().min(1)),
    maxTokens: z.number().positive(),
    temperature: z.number().min(0).max(2),
  }),
  features: z.object({
    streaming: z.boolean(),
    fileUpload: z.boolean(),
    voiceInput: z.boolean(),
    voiceOutput: z.boolean(),
    codeHighlighting: z.boolean(),
    markdownSupport: z.boolean(),
    exportImport: z.boolean(),
    customPrompts: z.boolean(),
  }),
  limits: z.object({
    maxMessagesPerChat: z.number().positive(),
    maxFileSize: z.number().positive(),
    maxFilesPerMessage: z.number().positive(),
    maxChatsPerUser: z.number().positive(),
  }),
  ui: z.object({
    theme: z.enum(['default', 'dark', 'light', 'minimal']),
    showTokenCount: z.boolean(),
    showCost: z.boolean(),
    showTimestamps: z.boolean(),
    enableAnimations: z.boolean(),
  }),
});

// ============================================================================
// ERROR SCHEMAS
// ============================================================================

export const AIChatErrorSchema = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(['model_error', 'rate_limit_error', 'quota_error', 'network_error', 'validation_error']),
  details: z.object({
    model: z.string().optional(),
    tokens: z.number().positive().optional(),
    retryAfter: z.number().positive().optional(),
    quota: z.object({
      limit: z.number().positive(),
      used: z.number().positive(),
      remaining: z.number().positive(),
    }).optional(),
  }).optional(),
});

// ============================================================================
// SERVICE INTERFACE SCHEMAS
// ============================================================================

export const ChatSettingsSchema = z.object({
  model: z.string().min(1),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().positive(),
  systemPrompt: z.string().max(2000),
});

export const ConversationAnalyticsSchema = z.object({
  conversationId: z.string().uuid(),
  messageCount: z.number().positive(),
  averageResponseTime: z.number().positive(),
  userSatisfaction: z.number().min(0).max(5),
  topics: z.array(z.string().min(1)),
});

// ============================================================================
// TYPE INFERENCE
// ============================================================================

export type MessageRole = z.infer<typeof MessageRoleSchema>;
export type MessageStatus = z.infer<typeof MessageStatusSchema>;
export type ChatStatus = z.infer<typeof ChatStatusSchema>;
export type ModelProvider = z.infer<typeof ModelProviderSchema>;

export type MessageAttachment = z.infer<typeof MessageAttachmentSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Chat = z.infer<typeof ChatSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;

export type SendMessageData = z.infer<typeof SendMessageDataSchema>;
export type CreateChatData = z.infer<typeof CreateChatDataSchema>;
export type UpdateChatData = z.infer<typeof UpdateChatDataSchema>;
export type CreateConversationData = z.infer<typeof CreateConversationDataSchema>;
export type UpdateConversationData = z.infer<typeof UpdateConversationDataSchema>;
export type UpdateMessageData = z.infer<typeof UpdateMessageDataSchema>;
export type UploadFileData = z.infer<typeof UploadFileDataSchema>;
export type ExportChatData = z.infer<typeof ExportChatDataSchema>;
export type ImportChatData = z.infer<typeof ImportChatDataSchema>;

export type SendMessageResult = z.infer<typeof SendMessageResultSchema>;
export type StreamMessageResult = z.infer<typeof StreamMessageResultSchema>;
export type UploadFileResult = z.infer<typeof UploadFileResultSchema>;
export type ExportChatResult = z.infer<typeof ExportChatResultSchema>;
export type ImportChatResult = z.infer<typeof ImportChatResultSchema>;

export type ChatAnalytics = z.infer<typeof ChatAnalyticsSchema>;
export type UsageStats = z.infer<typeof UsageStatsSchema>;
export type AIChatConfig = z.infer<typeof AIChatConfigSchema>;
export type AIChatError = z.infer<typeof AIChatErrorSchema>;
export type ChatSettings = z.infer<typeof ChatSettingsSchema>;
export type ConversationAnalytics = z.infer<typeof ConversationAnalyticsSchema>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export function validateMessage(data: unknown): Message {
  return MessageSchema.parse(data);
}

export function validateChat(data: unknown): Chat {
  return ChatSchema.parse(data);
}

export function validateConversation(data: unknown): Conversation {
  return ConversationSchema.parse(data);
}

export function validateSendMessageData(data: unknown): SendMessageData {
  return SendMessageDataSchema.parse(data);
}

export function validateCreateChatData(data: unknown): CreateChatData {
  return CreateChatDataSchema.parse(data);
}

export function validateUpdateChatData(data: unknown): UpdateChatData {
  return UpdateChatDataSchema.parse(data);
}

export function validateAIChatError(data: unknown): AIChatError {
  return AIChatErrorSchema.parse(data);
}

// Safe validation helpers
export function safeValidateMessage(data: unknown): { success: true; data: Message } | { success: false; error: z.ZodError } {
  const result = MessageSchema.safeParse(data);
  return result.success 
    ? { success: true, data: result.data }
    : { success: false, error: result.error };
}

export function safeValidateChat(data: unknown): { success: true; data: Chat } | { success: false; error: z.ZodError } {
  const result = ChatSchema.safeParse(data);
  return result.success 
    ? { success: true, data: result.data }
    : { success: false, error: result.error };
}

export function safeValidateConversation(data: unknown): { success: true; data: Conversation } | { success: false; error: z.ZodError } {
  const result = ConversationSchema.safeParse(data);
  return result.success 
    ? { success: true, data: result.data }
    : { success: false, error: result.error };
}
