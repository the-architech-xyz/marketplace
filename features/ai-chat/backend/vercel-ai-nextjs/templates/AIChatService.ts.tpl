/**
 * AIChatService - Cohesive Business Hook Services Implementation
 * 
 * This service implements the IAIChatService interface using Vercel AI SDK and TanStack Query.
 * It provides cohesive business services that group related functionality.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  IAIChatService, 
  Conversation, Message, ChatAnalytics, ChatSettings,
  CreateConversationData, UpdateConversationData, SendMessageData, UpdateMessageData,
  ConversationFilters, MessageFilters, AnalyticsFilters,
  ExportChatData, ImportChatData, UploadFileData
} from '@/features/ai-chat/contract';
import { aiChatApi } from '@/lib/ai-chat/api';

/**
 * AIChatService - Main service implementation
 * 
 * This service provides all AI chat-related operations through cohesive business services.
 * Each service method returns an object containing all related queries and mutations.
 */
export const AIChatService: IAIChatService = {
  /**
   * Conversation Management Service
   * Provides all conversation-related operations in a cohesive interface
   */
  useConversations: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (filters?: ConversationFilters) => useQuery({
      queryKey: ['conversations', filters],
      queryFn: async () => {
        return await aiChatApi.getConversations(filters);
      }
    });

    const get = (id: string) => useQuery({
      queryKey: ['conversation', id],
      queryFn: async () => {
        return await aiChatApi.getConversation(id);
      },
      enabled: !!id
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: CreateConversationData) => {
        return await aiChatApi.createConversation(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateConversationData }) => {
        return await aiChatApi.updateConversation(id, data);
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
        queryClient.invalidateQueries({ queryKey: ['conversation', id] });
      }
    });

    const delete = () => useMutation({
      mutationFn: async (id: string) => {
        return await aiChatApi.deleteConversation(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
        queryClient.removeQueries({ queryKey: ['conversation', id] });
        queryClient.removeQueries({ queryKey: ['messages', id] });
      }
    });

    const clear = () => useMutation({
      mutationFn: async (id: string) => {
        return await aiChatApi.clearConversation(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['conversation', id] });
        queryClient.invalidateQueries({ queryKey: ['messages', id] });
      }
    });

    const exportChat = () => useMutation({
      mutationFn: async (data: ExportChatData) => {
        return await aiChatApi.exportChat(data);
      }
    });

    const importChat = () => useMutation({
      mutationFn: async (data: ImportChatData) => {
        return await aiChatApi.importChat(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      }
    });

    return { list, get, create, update, delete, clear, export: exportChat, import: importChat };
  },

  /**
   * Message Management Service
   * Provides all message-related operations in a cohesive interface
   */
  useMessages: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (conversationId: string, filters?: MessageFilters) => useQuery({
      queryKey: ['messages', conversationId, filters],
      queryFn: async () => {
        return await aiChatApi.getMessages(conversationId, filters);
      },
      enabled: !!conversationId
    });

    const get = (id: string) => useQuery({
      queryKey: ['message', id],
      queryFn: async () => {
        return await aiChatApi.getMessage(id);
      },
      enabled: !!id
    });

    // Mutation operations
    const send = () => useMutation({
      mutationFn: async (data: SendMessageData) => {
        return await aiChatApi.sendMessage(data);
      },
      onSuccess: (_, { conversationId }) => {
        queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
        queryClient.invalidateQueries({ queryKey: ['conversation', conversationId] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateMessageData }) => {
        return await aiChatApi.updateMessage(id, data);
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['message', id] });
      }
    });

    const delete = () => useMutation({
      mutationFn: async (id: string) => {
        return await aiChatApi.deleteMessage(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['messages'] });
        queryClient.removeQueries({ queryKey: ['message', id] });
      }
    });

    const regenerate = () => useMutation({
      mutationFn: async (id: string) => {
        return await aiChatApi.regenerateMessage(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['message', id] });
        queryClient.invalidateQueries({ queryKey: ['messages'] });
      }
    });

    return { list, get, send, update, delete, regenerate };
  },

  /**
   * Chat Settings Service
   * Provides chat configuration and settings management
   */
  useSettings: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getSettings = () => useQuery({
      queryKey: ['chat-settings'],
      queryFn: async () => {
        return await aiChatApi.getSettings();
      }
    });

    // Mutation operations
    const updateSettings = () => useMutation({
      mutationFn: async (settings: ChatSettings) => {
        return await aiChatApi.updateSettings(settings);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['chat-settings'] });
      }
    });

    const resetSettings = () => useMutation({
      mutationFn: async () => {
        return await aiChatApi.resetSettings();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['chat-settings'] });
      }
    });

    return { getSettings, updateSettings, resetSettings };
  },

  /**
   * Analytics Service
   * Provides chat analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    const getChatAnalytics = (filters?: AnalyticsFilters) => useQuery({
      queryKey: ['chat-analytics', filters],
      queryFn: async () => {
        return await aiChatApi.getChatAnalytics(filters);
      }
    });

    const getConversationAnalytics = (conversationId: string) => useQuery({
      queryKey: ['conversation-analytics', conversationId],
      queryFn: async () => {
        return await aiChatApi.getConversationAnalytics(conversationId);
      },
      enabled: !!conversationId
    });

    return { getChatAnalytics, getConversationAnalytics };
  },

  /**
   * File Upload Service
   * Provides file upload and attachment management
   */
  useFileUpload: () => {
    const queryClient = useQueryClient();

    // Mutation operations
    const upload = () => useMutation({
      mutationFn: async (data: UploadFileData) => {
        return await aiChatApi.uploadFile(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['messages'] });
      }
    });

    const deleteAttachment = () => useMutation({
      mutationFn: async (id: string) => {
        return await aiChatApi.deleteAttachment(id);
      }
    });

    return { upload, delete: deleteAttachment };
  }
};
