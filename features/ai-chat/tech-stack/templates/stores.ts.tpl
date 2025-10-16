/**
 * AI Chat Feature Zustand Stores
 * 
 * Technology-agnostic state management for the AI Chat feature.
 * These stores provide consistent state patterns across all implementations.
 * 
 * Generated from: contract.ts
 */

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type {
  Conversation,
  Message,
  Chat,
  ChatSettings,
  ChatAnalytics,
  ConversationAnalytics,
  AIChatError,
} from './types';

// ============================================================================
// CONVERSATION STORE
// ============================================================================

export interface ConversationState {
  // Data
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  error: AIChatError | null;
  
  // UI State
  selectedConversationId: string | null;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export interface ConversationActions {
  // Data Actions
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  removeConversation: (id: string) => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
  
  // UI Actions
  setSelectedConversationId: (id: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsCreating: (creating: boolean) => void;
  setIsUpdating: (updating: boolean) => void;
  setIsDeleting: (deleting: boolean) => void;
  setError: (error: AIChatError | null) => void;
  
  // Computed Actions
  getConversationById: (id: string) => Conversation | undefined;
  getActiveConversations: () => Conversation[];
  getArchivedConversations: () => Conversation[];
  clearError: () => void;
}

export const useConversationStore = create<ConversationState & ConversationActions>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // Initial State
        conversations: [],
        currentConversation: null,
        isLoading: false,
        error: null,
        selectedConversationId: null,
        isCreating: false,
        isUpdating: false,
        isDeleting: false,

        // Data Actions
        setConversations: (conversations) =>
          set((state) => {
            state.conversations = conversations;
          }),

        addConversation: (conversation) =>
          set((state) => {
            state.conversations.unshift(conversation);
          }),

        updateConversation: (id, updates) =>
          set((state) => {
            const index = state.conversations.findIndex((c) => c.id === id);
            if (index !== -1) {
              Object.assign(state.conversations[index], updates);
            }
            if (state.currentConversation?.id === id) {
              Object.assign(state.currentConversation, updates);
            }
          }),

        removeConversation: (id) =>
          set((state) => {
            state.conversations = state.conversations.filter((c) => c.id !== id);
            if (state.currentConversation?.id === id) {
              state.currentConversation = null;
            }
            if (state.selectedConversationId === id) {
              state.selectedConversationId = null;
            }
          }),

        setCurrentConversation: (conversation) =>
          set((state) => {
            state.currentConversation = conversation;
            if (conversation) {
              state.selectedConversationId = conversation.id;
            }
          }),

        // UI Actions
        setSelectedConversationId: (id) =>
          set((state) => {
            state.selectedConversationId = id;
            const conversation = state.conversations.find((c) => c.id === id);
            state.currentConversation = conversation || null;
          }),

        setIsLoading: (loading) =>
          set((state) => {
            state.isLoading = loading;
          }),

        setIsCreating: (creating) =>
          set((state) => {
            state.isCreating = creating;
          }),

        setIsUpdating: (updating) =>
          set((state) => {
            state.isUpdating = updating;
          }),

        setIsDeleting: (deleting) =>
          set((state) => {
            state.isDeleting = deleting;
          }),

        setError: (error) =>
          set((state) => {
            state.error = error;
          }),

        // Computed Actions
        getConversationById: (id) => {
          const state = get();
          return state.conversations.find((c) => c.id === id);
        },

        getActiveConversations: () => {
          const state = get();
          return state.conversations.filter((c) => c.status === 'active');
        },

        getArchivedConversations: () => {
          const state = get();
          return state.conversations.filter((c) => c.status === 'archived');
        },

        clearError: () =>
          set((state) => {
            state.error = null;
          }),
      }))
    ),
    { name: 'ai-chat-conversation-store' }
  )
);

// ============================================================================
// MESSAGE STORE
// ============================================================================

export interface MessageState {
  // Data
  messages: Message[];
  currentMessage: Message | null;
  isLoading: boolean;
  error: AIChatError | null;
  
  // UI State
  isSending: boolean;
  isStreaming: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  selectedMessageId: string | null;
  
  // Streaming State
  streamingMessageId: string | null;
  streamingContent: string;
}

export interface MessageActions {
  // Data Actions
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  removeMessage: (id: string) => void;
  setCurrentMessage: (message: Message | null) => void;
  
  // UI Actions
  setIsLoading: (loading: boolean) => void;
  setIsSending: (sending: boolean) => void;
  setIsStreaming: (streaming: boolean) => void;
  setIsUpdating: (updating: boolean) => void;
  setIsDeleting: (deleting: boolean) => void;
  setSelectedMessageId: (id: string | null) => void;
  setError: (error: AIChatError | null) => void;
  
  // Streaming Actions
  startStreaming: (messageId: string) => void;
  updateStreamingContent: (content: string) => void;
  finishStreaming: (messageId: string, finalContent: string) => void;
  cancelStreaming: () => void;
  
  // Computed Actions
  getMessageById: (id: string) => Message | undefined;
  getMessagesByConversation: (conversationId: string) => Message[];
  getLastMessage: () => Message | undefined;
  clearError: () => void;
  clearMessages: () => void;
}

export const useMessageStore = create<MessageState & MessageActions>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // Initial State
        messages: [],
        currentMessage: null,
        isLoading: false,
        error: null,
        isSending: false,
        isStreaming: false,
        isUpdating: false,
        isDeleting: false,
        selectedMessageId: null,
        streamingMessageId: null,
        streamingContent: '',

        // Data Actions
        setMessages: (messages) =>
          set((state) => {
            state.messages = messages;
          }),

        addMessage: (message) =>
          set((state) => {
            state.messages.push(message);
          }),

        updateMessage: (id, updates) =>
          set((state) => {
            const index = state.messages.findIndex((m) => m.id === id);
            if (index !== -1) {
              Object.assign(state.messages[index], updates);
            }
            if (state.currentMessage?.id === id) {
              Object.assign(state.currentMessage, updates);
            }
          }),

        removeMessage: (id) =>
          set((state) => {
            state.messages = state.messages.filter((m) => m.id !== id);
            if (state.currentMessage?.id === id) {
              state.currentMessage = null;
            }
            if (state.selectedMessageId === id) {
              state.selectedMessageId = null;
            }
          }),

        setCurrentMessage: (message) =>
          set((state) => {
            state.currentMessage = message;
            if (message) {
              state.selectedMessageId = message.id;
            }
          }),

        // UI Actions
        setIsLoading: (loading) =>
          set((state) => {
            state.isLoading = loading;
          }),

        setIsSending: (sending) =>
          set((state) => {
            state.isSending = sending;
          }),

        setIsStreaming: (streaming) =>
          set((state) => {
            state.isStreaming = streaming;
          }),

        setIsUpdating: (updating) =>
          set((state) => {
            state.isUpdating = updating;
          }),

        setIsDeleting: (deleting) =>
          set((state) => {
            state.isDeleting = deleting;
          }),

        setSelectedMessageId: (id) =>
          set((state) => {
            state.selectedMessageId = id;
            const message = state.messages.find((m) => m.id === id);
            state.currentMessage = message || null;
          }),

        setError: (error) =>
          set((state) => {
            state.error = error;
          }),

        // Streaming Actions
        startStreaming: (messageId) =>
          set((state) => {
            state.isStreaming = true;
            state.streamingMessageId = messageId;
            state.streamingContent = '';
          }),

        updateStreamingContent: (content) =>
          set((state) => {
            state.streamingContent = content;
          }),

        finishStreaming: (messageId, finalContent) =>
          set((state) => {
            state.isStreaming = false;
            state.streamingMessageId = null;
            state.streamingContent = '';
            
            // Update the message with final content
            const index = state.messages.findIndex((m) => m.id === messageId);
            if (index !== -1) {
              state.messages[index].content = finalContent;
              state.messages[index].status = 'sent';
            }
          }),

        cancelStreaming: () =>
          set((state) => {
            state.isStreaming = false;
            state.streamingMessageId = null;
            state.streamingContent = '';
          }),

        // Computed Actions
        getMessageById: (id) => {
          const state = get();
          return state.messages.find((m) => m.id === id);
        },

        getMessagesByConversation: (conversationId) => {
          const state = get();
          return state.messages.filter((m) => 
            // This assumes messages have a conversationId field
            // You might need to adjust this based on your data structure
            (m as any).conversationId === conversationId
          );
        },

        getLastMessage: () => {
          const state = get();
          return state.messages[state.messages.length - 1];
        },

        clearError: () =>
          set((state) => {
            state.error = null;
          }),

        clearMessages: () =>
          set((state) => {
            state.messages = [];
            state.currentMessage = null;
            state.selectedMessageId = null;
            state.streamingMessageId = null;
            state.streamingContent = '';
          }),
      }))
    ),
    { name: 'ai-chat-message-store' }
  )
);

// ============================================================================
// CHAT SETTINGS STORE
// ============================================================================

export interface ChatSettingsState {
  // Data
  settings: ChatSettings | null;
  isLoading: boolean;
  error: AIChatError | null;
  
  // UI State
  isUpdating: boolean;
  isResetting: boolean;
}

export interface ChatSettingsActions {
  // Data Actions
  setSettings: (settings: ChatSettings) => void;
  updateSettings: (updates: Partial<ChatSettings>) => void;
  resetSettings: () => void;
  
  // UI Actions
  setIsLoading: (loading: boolean) => void;
  setIsUpdating: (updating: boolean) => void;
  setIsResetting: (resetting: boolean) => void;
  setError: (error: AIChatError | null) => void;
  
  // Computed Actions
  getSetting: <K extends keyof ChatSettings>(key: K) => ChatSettings[K] | undefined;
  clearError: () => void;
}

export const useChatSettingsStore = create<ChatSettingsState & ChatSettingsActions>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // Initial State
        settings: null,
        isLoading: false,
        error: null,
        isUpdating: false,
        isResetting: false,

        // Data Actions
        setSettings: (settings) =>
          set((state) => {
            state.settings = settings;
          }),

        updateSettings: (updates) =>
          set((state) => {
            if (state.settings) {
              Object.assign(state.settings, updates);
            }
          }),

        resetSettings: () =>
          set((state) => {
            // Reset to default settings
            state.settings = {
              model: 'gpt-4',
              temperature: 0.7,
              maxTokens: 2000,
              systemPrompt: 'You are a helpful AI assistant.',
            };
          }),

        // UI Actions
        setIsLoading: (loading) =>
          set((state) => {
            state.isLoading = loading;
          }),

        setIsUpdating: (updating) =>
          set((state) => {
            state.isUpdating = updating;
          }),

        setIsResetting: (resetting) =>
          set((state) => {
            state.isResetting = resetting;
          }),

        setError: (error) =>
          set((state) => {
            state.error = error;
          }),

        // Computed Actions
        getSetting: (key) => {
          const state = get();
          return state.settings?.[key];
        },

        clearError: () =>
          set((state) => {
            state.error = null;
          }),
      }))
    ),
    { name: 'ai-chat-settings-store' }
  )
);

// ============================================================================
// ANALYTICS STORE
// ============================================================================

export interface AnalyticsState {
  // Data
  chatAnalytics: ChatAnalytics | null;
  conversationAnalytics: ConversationAnalytics | null;
  isLoading: boolean;
  error: AIChatError | null;
  
  // UI State
  isRefreshing: boolean;
}

export interface AnalyticsActions {
  // Data Actions
  setChatAnalytics: (analytics: ChatAnalytics) => void;
  setConversationAnalytics: (analytics: ConversationAnalytics) => void;
  
  // UI Actions
  setIsLoading: (loading: boolean) => void;
  setIsRefreshing: (refreshing: boolean) => void;
  setError: (error: AIChatError | null) => void;
  
  // Computed Actions
  getTotalUsage: () => { tokens: number; cost: number; messages: number } | null;
  clearError: () => void;
}

export const useAnalyticsStore = create<AnalyticsState & AnalyticsActions>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // Initial State
        chatAnalytics: null,
        conversationAnalytics: null,
        isLoading: false,
        error: null,
        isRefreshing: false,

        // Data Actions
        setChatAnalytics: (analytics) =>
          set((state) => {
            state.chatAnalytics = analytics;
          }),

        setConversationAnalytics: (analytics) =>
          set((state) => {
            state.conversationAnalytics = analytics;
          }),

        // UI Actions
        setIsLoading: (loading) =>
          set((state) => {
            state.isLoading = loading;
          }),

        setIsRefreshing: (refreshing) =>
          set((state) => {
            state.isRefreshing = refreshing;
          }),

        setError: (error) =>
          set((state) => {
            state.error = error;
          }),

        // Computed Actions
        getTotalUsage: () => {
          const state = get();
          if (!state.chatAnalytics) return null;
          
          return {
            tokens: state.chatAnalytics.totalTokens,
            cost: state.chatAnalytics.totalCost,
            messages: state.chatAnalytics.totalMessages,
          };
        },

        clearError: () =>
          set((state) => {
            state.error = null;
          }),
      }))
    ),
    { name: 'ai-chat-analytics-store' }
  )
);

// ============================================================================
// COMBINED STORE SELECTORS
// ============================================================================

// Selectors for common use cases
export const useConversationSelectors = () => {
  const conversations = useConversationStore((state) => state.conversations);
  const currentConversation = useConversationStore((state) => state.currentConversation);
  const selectedConversationId = useConversationStore((state) => state.selectedConversationId);
  const isLoading = useConversationStore((state) => state.isLoading);
  const error = useConversationStore((state) => state.error);
  
  return {
    conversations,
    currentConversation,
    selectedConversationId,
    isLoading,
    error,
  };
};

export const useMessageSelectors = () => {
  const messages = useMessageStore((state) => state.messages);
  const currentMessage = useMessageStore((state) => state.currentMessage);
  const isStreaming = useMessageStore((state) => state.isStreaming);
  const streamingContent = useMessageStore((state) => state.streamingContent);
  const isLoading = useMessageStore((state) => state.isLoading);
  const error = useMessageStore((state) => state.error);
  
  return {
    messages,
    currentMessage,
    isStreaming,
    streamingContent,
    isLoading,
    error,
  };
};

export const useChatSettingsSelectors = () => {
  const settings = useChatSettingsStore((state) => state.settings);
  const isLoading = useChatSettingsStore((state) => state.isLoading);
  const error = useChatSettingsStore((state) => state.error);
  
  return {
    settings,
    isLoading,
    error,
  };
};

export const useAnalyticsSelectors = () => {
  const chatAnalytics = useAnalyticsStore((state) => state.chatAnalytics);
  const conversationAnalytics = useAnalyticsStore((state) => state.conversationAnalytics);
  const isLoading = useAnalyticsStore((state) => state.isLoading);
  const error = useAnalyticsStore((state) => state.error);
  
  return {
    chatAnalytics,
    conversationAnalytics,
    isLoading,
    error,
  };
};
