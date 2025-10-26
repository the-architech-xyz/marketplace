/**
 * AI Chat Tech-Stack - Centralized Exports
 * 
 * Import everything you need from one place.
 */

// ============================================================================
// HOOKS
// ============================================================================

export {
  // Conversation hooks
  useConversations,
  useConversation,
  useCreateConversation,
  useUpdateConversation,
  useDeleteConversation,
  
  // Message hooks
  useMessages,
  useDeleteMessage,
  
  // Chat hooks
  useChatWithHistory,
  useSimpleChat,
  
  // Analytics hooks
  useAnalytics,
  
  // Utility hooks
  useArchiveConversation,
  useRestoreConversation,
  useRenameConversation,
  
  // Re-exported Vercel AI SDK hooks
  useChat,
  useCompletion,
} from './hooks';

// ============================================================================
// TYPES
// ============================================================================

export type {
  AIConversation,
  AIMessage,
  CreateConversationData,
  UpdateConversationData,
  SendMessageData,
} from './hooks';

// ============================================================================
// SCHEMAS
// ============================================================================

export {
  // Schemas
  AIMessageSchema,
  AIConversationSchema,
  CreateConversationSchema,
  UpdateConversationSchema,
  SendMessageSchema,
  AIUsageSchema,
  AIPromptSchema,
  CreatePromptSchema,
  ChatAnalyticsSchema,
  AIChatErrorSchema,
  
  // Enums
  MessageRoleSchema,
  ConversationStatusSchema,
  AIProviderSchema,
  PromptVisibilitySchema,
} from './schemas';

export type {
  AIMessage as AIMessageType,
  AIConversation as AIConversationType,
  CreateConversationData as CreateConversationDataType,
  UpdateConversationData as UpdateConversationDataType,
  SendMessageData as SendMessageDataType,
  AIUsage,
  AIPrompt,
  CreatePromptData,
  ChatAnalytics,
  AIChatError,
} from './schemas';

// ============================================================================
// STORES
// ============================================================================

export {
  // Stores
  useChatUIStore,
  useChatSettingsStore,
  useDraftMessagesStore,
  useSelectionStore,
  
  // Utility hooks
  useActiveConversation,
  useChatSettings,
  useIsSidebarOpen,
} from './stores';
