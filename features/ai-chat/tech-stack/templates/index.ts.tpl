/**
 * AI Chat Feature - Technology Stack Layer
 * 
 * ⚠️ ARCHITECTURE:
 * - TanStack Query Hooks → Server data (conversations, messages)
 * - Zustand Store → UI state only (sidebar, input, streaming)
 */

// Types
export * from './types';

// Schemas
export * from './schemas';

// Hooks
export * from './hooks';

// Stores
export * from './stores';

// Re-export commonly used types for convenience
export type {
  Message,
  Chat,
  Conversation,
  SendMessageData,
  CreateChatData,
  UpdateChatData,
  ChatSettings,
  ChatAnalytics,
  AIChatError,
} from './types';

// Re-export commonly used schemas for validation
export {
  MessageSchema,
  ChatSchema,
  ConversationSchema,
  SendMessageDataSchema,
  CreateChatDataSchema,
  UpdateChatDataSchema,
  ChatSettingsSchema,
  AIChatErrorSchema,
} from './schemas';

// Re-export commonly used hooks
export {
  useConversations,
  useConversation,
  useCreateConversation,
  useUpdateConversation,
  useDeleteConversation,
  useMessages,
  useSendMessage,
  useUpdateMessage,
  useDeleteMessage,
  useChatSettings,
  useUpdateChatSettings,
  useChatAnalytics,
} from './hooks';

// Re-export UI store
export { useAIChatUIStore } from './stores';
