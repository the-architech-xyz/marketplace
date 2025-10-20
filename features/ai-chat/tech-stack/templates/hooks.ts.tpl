/**
 * AI Chat - Direct TanStack Query Hooks
 * 
 * ARCHITECTURE: Direct Hooks Pattern (Best Practice)
 * - Each hook is a standalone TanStack Query hook
 * - Clear naming: useConversationsList, useMessageSend, etc.
 * - No abstraction layers, direct usage
 * - Includes streaming functionality as a hook
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

// ============================================================================
// CONVERSATION HOOKS
// ============================================================================

export const useConversationsList = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['ai-conversations'],
    queryFn: async () => {
      const response = await fetch('/api/chat/conversations');
      if (!response.ok) throw new Error('Failed to fetch conversations');
      return response.json();
    },
    staleTime: 2 * 60 * 1000,
    ...options
  });
};

export const useConversation = (id: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['ai-conversation', id],
    queryFn: async () => {
      const response = await fetch(`/api/chat/conversations/${id}`);
      if (!response.ok) throw new Error('Failed to fetch conversation');
      return response.json();
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    ...options
  });
};

export const useConversationsCreate = (options?: UseMutationOptions<any, any, { title?: string; model?: string }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title?: string; model?: string }) => {
      const response = await fetch('/api/chat/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create conversation');
      return response.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['ai-conversations'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

export const useConversationsUpdate = (options?: UseMutationOptions<any, any, { id: string; data: any }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/chat/conversations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update conversation');
      return response.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['ai-conversation', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['ai-conversations'] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

export const useConversationsDelete = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/chat/conversations/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete conversation');
      return response.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.removeQueries({ queryKey: ['ai-conversation', id] });
      queryClient.invalidateQueries({ queryKey: ['ai-conversations'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

// ============================================================================
// MESSAGE HOOKS
// ============================================================================

export const useMessagesList = (conversationId: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['ai-messages', conversationId],
    queryFn: async () => {
      const response = await fetch(`/api/chat/conversations/${conversationId}/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      return response.json();
    },
    enabled: !!conversationId,
    staleTime: 1 * 60 * 1000,
    ...options
  });
};

export const useMessage = (conversationId: string, messageId: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['ai-message', conversationId, messageId],
    queryFn: async () => {
      const response = await fetch(`/api/chat/conversations/${conversationId}/messages/${messageId}`);
      if (!response.ok) throw new Error('Failed to fetch message');
      return response.json();
    },
    enabled: !!conversationId && !!messageId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

export const useMessageSend = (options?: UseMutationOptions<any, any, { conversationId: string; content: string; model?: string }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ conversationId, content, model }: { conversationId: string; content: string; model?: string }) => {
      const response = await fetch(`/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, model })
      });
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['ai-messages', variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['ai-conversation', variables.conversationId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

export const useMessageRegenerate = (options?: UseMutationOptions<any, any, { conversationId: string; messageId: string }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ conversationId, messageId }: { conversationId: string; messageId: string }) => {
      const response = await fetch(`/api/chat/conversations/${conversationId}/messages/${messageId}/regenerate`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to regenerate message');
      return response.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['ai-messages', variables.conversationId] });
      queryClient.invalidateQueries({ queryKey: ['ai-message', variables.conversationId, variables.messageId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

export const useMessageDelete = (options?: UseMutationOptions<any, any, { conversationId: string; messageId: string }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ conversationId, messageId }: { conversationId: string; messageId: string }) => {
      const response = await fetch(`/api/chat/conversations/${conversationId}/messages/${messageId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete message');
      return response.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.removeQueries({ queryKey: ['ai-message', variables.conversationId, variables.messageId] });
      queryClient.invalidateQueries({ queryKey: ['ai-messages', variables.conversationId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

// ============================================================================
// STREAMING HOOK
// ============================================================================

/**
 * Hook for streaming messages with real-time AI responses
 * Returns a function to initiate streaming
 */
export const useMessageStream = () => {
  const queryClient = useQueryClient();

  const streamMessage = async (
    conversationId: string,
    content: string,
    onChunk: (chunk: string) => void,
    onComplete?: (fullResponse: string) => void,
    onError?: (error: Error) => void
  ) => {
    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, content })
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to start stream');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullResponse += chunk;
        onChunk(chunk);
      }

      // Invalidate queries after streaming completes
      queryClient.invalidateQueries({ queryKey: ['ai-messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['ai-conversation', conversationId] });

      onComplete?.(fullResponse);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return { streamMessage };
};

// ============================================================================
// MODEL HOOKS
// ============================================================================

export const useModelsList = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['ai-models'],
    queryFn: async () => {
      const response = await fetch('/api/chat/models');
      if (!response.ok) throw new Error('Failed to fetch models');
      return response.json();
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    ...options
  });
};

export const useModel = (id: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['ai-model', id],
    queryFn: async () => {
      const response = await fetch(`/api/chat/models/${id}`);
      if (!response.ok) throw new Error('Failed to fetch model');
      return response.json();
    },
    enabled: !!id,
    staleTime: 60 * 60 * 1000,
    ...options
  });
};

// ============================================================================
// FILE UPLOAD HOOKS
// ============================================================================

export const useFilesList = (conversationId?: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['ai-files', conversationId],
    queryFn: async () => {
      const url = conversationId 
        ? `/api/chat/files?conversationId=${conversationId}`
        : '/api/chat/files';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch files');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

export const useFileUpload = (options?: UseMutationOptions<any, any, { conversationId: string; file: File }>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ conversationId, file }: { conversationId: string; file: File }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('conversationId', conversationId);

      const response = await fetch('/api/chat/files', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Failed to upload file');
      return response.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['ai-files', variables.conversationId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

export const useFileDelete = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fileId: string) => {
      const response = await fetch(`/api/chat/files/${fileId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete file');
      return response.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['ai-files'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};




