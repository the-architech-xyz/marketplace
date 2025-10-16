/**
 * AIChatService - Cohesive Business Services (Client-Side Abstraction)
 * 
 * This service wraps the pure backend AI API functions with TanStack Query hooks.
 * It implements the IAIChatService interface defined in contract.ts.
 * 
 * LAYER RESPONSIBILITY: Client-side abstraction (TanStack Query wrappers)
 * - Imports pure server functions from backend/vercel-ai-nextjs/ai-api
 * - Wraps them with useQuery/useMutation
 * - Exports cohesive service object
 * - NO direct API calls (uses backend functions)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { IAIChatService } from '@/features/ai-chat/contract';

/**
 * AIChatService - Cohesive Services Implementation
 * 
 * This service groups related AI chat operations into cohesive interfaces.
 * Each method returns an object containing all related queries and mutations.
 */
export const AIChatService: IAIChatService = {
  /**
   * Conversation Management Service
   * Provides all conversation-related operations in a cohesive interface
   */
  useConversations: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = () => useQuery({
      queryKey: ['ai-conversations'],
      queryFn: async () => {
        const response = await fetch('/api/chat/conversations');
        if (!response.ok) throw new Error('Failed to fetch conversations');
        return response.json();
      },
      staleTime: 2 * 60 * 1000 // 2 minutes
    });

    const get = (id: string) => useQuery({
      queryKey: ['ai-conversation', id],
      queryFn: async () => {
        const response = await fetch(`/api/chat/conversations/${id}`);
        if (!response.ok) throw new Error('Failed to fetch conversation');
        return response.json();
      },
      enabled: !!id,
      staleTime: 2 * 60 * 1000
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: { title?: string; model?: string }) => {
        const response = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create conversation');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ai-conversations'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const response = await fetch(`/api/chat/conversations/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update conversation');
        return response.json();
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['ai-conversation', id] });
        queryClient.invalidateQueries({ queryKey: ['ai-conversations'] });
      }
    });

    const deleteConversation = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/chat/conversations/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete conversation');
      },
      onSuccess: (_, id) => {
        queryClient.removeQueries({ queryKey: ['ai-conversation', id] });
        queryClient.invalidateQueries({ queryKey: ['ai-conversations'] });
      }
    });

    return { list, get, create, update, delete: deleteConversation };
  },

  /**
   * Message Management Service
   * Provides all message-related operations in a cohesive interface
   */
  useMessages: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (conversationId: string) => useQuery({
      queryKey: ['ai-messages', conversationId],
      queryFn: async () => {
        const response = await fetch(`/api/chat/conversations/${conversationId}/messages`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        return response.json();
      },
      enabled: !!conversationId,
      staleTime: 1 * 60 * 1000 // 1 minute
    });

    const get = (messageId: string) => useQuery({
      queryKey: ['ai-message', messageId],
      queryFn: async () => {
        const response = await fetch(`/api/chat/messages/${messageId}`);
        if (!response.ok) throw new Error('Failed to fetch message');
        return response.json();
      },
      enabled: !!messageId,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const send = () => useMutation({
      mutationFn: async (data: { conversationId: string; content: string; model?: string }) => {
        const response = await fetch('/api/chat/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to send message');
        return response.json();
      },
      onSuccess: (_, { conversationId }) => {
        queryClient.invalidateQueries({ queryKey: ['ai-messages', conversationId] });
        queryClient.invalidateQueries({ queryKey: ['ai-conversation', conversationId] });
      }
    });

    const regenerate = () => useMutation({
      mutationFn: async (messageId: string) => {
        const response = await fetch(`/api/chat/messages/${messageId}/regenerate`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to regenerate message');
        return response.json();
      },
      onSuccess: (data) => {
        if (data.conversationId) {
          queryClient.invalidateQueries({ queryKey: ['ai-messages', data.conversationId] });
        }
      }
    });

    const deleteMessage = () => useMutation({
      mutationFn: async (messageId: string) => {
        const response = await fetch(`/api/chat/messages/${messageId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete message');
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ai-messages'] });
      }
    });

    return { list, get, send, regenerate, delete: deleteMessage };
  },

  /**
   * AI Model Management Service
   * Provides all model-related operations in a cohesive interface
   */
  useModels: () => {
    // Query operations
    const list = () => useQuery({
      queryKey: ['ai-models'],
      queryFn: async () => {
        const response = await fetch('/api/chat/models');
        if (!response.ok) throw new Error('Failed to fetch models');
        return response.json();
      },
      staleTime: 30 * 60 * 1000 // 30 minutes - models don't change often
    });

    const get = (modelId: string) => useQuery({
      queryKey: ['ai-model', modelId],
      queryFn: async () => {
        const response = await fetch(`/api/chat/models/${modelId}`);
        if (!response.ok) throw new Error('Failed to fetch model');
        return response.json();
      },
      enabled: !!modelId,
      staleTime: 30 * 60 * 1000
    });

    const getCapabilities = (modelId: string) => useQuery({
      queryKey: ['ai-model-capabilities', modelId],
      queryFn: async () => {
        const response = await fetch(`/api/chat/models/${modelId}/capabilities`);
        if (!response.ok) throw new Error('Failed to fetch model capabilities');
        return response.json();
      },
      enabled: !!modelId,
      staleTime: 60 * 60 * 1000 // 1 hour
    });

    return { list, get, getCapabilities };
  },

  /**
   * File Management Service
   * Provides all file upload/management operations for AI chat
   */
  useFiles: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (conversationId?: string) => useQuery({
      queryKey: conversationId ? ['ai-files', conversationId] : ['ai-files'],
      queryFn: async () => {
        const url = conversationId 
          ? `/api/chat/files?conversationId=${conversationId}`
          : '/api/chat/files';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch files');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const upload = () => useMutation({
      mutationFn: async (data: { file: File; conversationId?: string }) => {
        const formData = new FormData();
        formData.append('file', data.file);
        if (data.conversationId) {
          formData.append('conversationId', data.conversationId);
        }

        const response = await fetch('/api/chat/files', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) throw new Error('Failed to upload file');
        return response.json();
      },
      onSuccess: (_, { conversationId }) => {
        if (conversationId) {
          queryClient.invalidateQueries({ queryKey: ['ai-files', conversationId] });
        }
        queryClient.invalidateQueries({ queryKey: ['ai-files'] });
      }
    });

    const deleteFile = () => useMutation({
      mutationFn: async (fileId: string) => {
        const response = await fetch(`/api/chat/files/${fileId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete file');
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['ai-files'] });
      }
    });

    return { list, upload, delete: deleteFile };
  },

  /**
   * Streaming Service
   * Provides real-time streaming chat functionality
   */
  useStreaming: () => {
    // Note: Streaming is handled differently - returns control functions
    const streamMessage = async (
      conversationId: string,
      content: string,
      onChunk: (text: string) => void,
      onComplete?: () => void,
      onError?: (error: Error) => void
    ) => {
      try {
        const response = await fetch('/api/chat/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId, content })
        });

        if (!response.ok) {
          throw new Error('Failed to start stream');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No reader available');
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          onChunk(chunk);
        }

        onComplete?.();
      } catch (error) {
        onError?.(error as Error);
      }
    };

    return { streamMessage };
  }
};

/**
 * ARCHITECTURE NOTES:
 * 
 * 1. This service lives in the TECH-STACK layer (client-side abstraction)
 * 2. It imports pure server functions from backend/vercel-ai-nextjs/ai-api
 * 3. It wraps them with TanStack Query for client-side data management
 * 4. It exports the IAIChatService interface as a cohesive service object
 * 5. Frontend components import THIS service, not the backend functions
 * 
 * LAYER FLOW:
 * Frontend → AIChatService (tech-stack) → AI API routes (backend) → Vercel AI SDK
 */

