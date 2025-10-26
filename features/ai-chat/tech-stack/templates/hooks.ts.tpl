/**
 * AI Chat Tech-Stack Hooks
 * 
 * Generic, database-agnostic hooks for AI chat functionality.
 * Uses TanStack Query for data fetching and caching.
 * Uses Vercel AI SDK's useChat directly for streaming.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useChat as useVercelChat } from 'ai/react';
import { useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface AIConversation {
  id: string;
  userId: string;
  title: string;
  status: 'active' | 'archived' | 'deleted';
  model: string;
  provider: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  totalMessages: number;
  totalTokens: number;
  estimatedCost: number;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  tokens?: number;
  model?: string;
  cost?: number;
  error?: string;
  createdAt: Date;
}

export interface CreateConversationData {
  title?: string;
  model?: string;
  provider?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface UpdateConversationData {
  title?: string;
  status?: 'active' | 'archived' | 'deleted';
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface SendMessageData {
  content: string;
  conversationId?: string;
  model?: string;
  provider?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

// ============================================================================
// API CLIENT (Internal)
// ============================================================================

const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },

  async patch<T>(url: string, data: any): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },

  async delete(url: string): Promise<void> {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
  },
};

// ============================================================================
// CONVERSATION HOOKS
// ============================================================================

/**
 * Get all conversations
 */
export function useConversations(options?: {
  status?: 'active' | 'archived' | 'deleted';
  limit?: number;
  offset?: number;
}) {
  const params = new URLSearchParams();
  if (options?.status) params.set('status', options.status);
  if (options?.limit) params.set('limit', String(options.limit));
  if (options?.offset) params.set('offset', String(options.offset));

  return useQuery<{ conversations: AIConversation[] }>({
    queryKey: ['conversations', options],
    queryFn: () => apiClient.get(`/api/conversations?${params}`),
  });
}

/**
 * Get a specific conversation with messages
 */
export function useConversation(id: string | undefined) {
  return useQuery<{ conversation: AIConversation; messages: AIMessage[] }>({
    queryKey: ['conversation', id],
    queryFn: () => apiClient.get(`/api/conversations/${id}`),
    enabled: !!id,
  });
}

/**
 * Create a new conversation
 */
export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConversationData) =>
      apiClient.post<AIConversation>('/api/conversations', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

/**
 * Update a conversation
 */
export function useUpdateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateConversationData }) =>
      apiClient.patch<AIConversation>(`/api/conversations/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['conversation', id] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

/**
 * Delete a conversation (soft delete)
 */
export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/api/conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

// ============================================================================
// MESSAGE HOOKS
// ============================================================================

/**
 * Get messages for a conversation
 */
export function useMessages(conversationId: string | undefined) {
  return useQuery<{ messages: AIMessage[] }>({
    queryKey: ['messages', conversationId],
    queryFn: () => apiClient.get(`/api/conversations/${conversationId}/messages`),
    enabled: !!conversationId,
  });
}

/**
 * Delete a message
 */
export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => apiClient.delete(`/api/messages/${messageId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['conversation'] });
    },
  });
}

// ============================================================================
// CHAT HOOK (with Vercel AI SDK + Database Persistence)
// ============================================================================

/**
 * Enhanced useChat hook
 * 
 * Combines Vercel AI SDK's streaming with our database persistence.
 * 
 * Usage:
 * ```tsx
 * const { messages, input, handleInputChange, handleSubmit, isLoading } = 
 *   useChatWithHistory({ conversationId: '123' });
 * ```
 */
export function useChatWithHistory(options?: {
  conversationId?: string;
  model?: string;
  provider?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  onConversationCreated?: (conversationId: string) => void;
}) {
  const queryClient = useQueryClient();
  const { conversationId, onConversationCreated, ...chatOptions } = options || {};

  // Load existing messages if conversationId provided
  const { data: messagesData } = useMessages(conversationId);

  // Use Vercel AI SDK's useChat for streaming
  const chat = useVercelChat({
    api: '/api/chat',
    body: {
      conversationId,
      ...chatOptions,
    },
    initialMessages: messagesData?.messages?.map(m => ({
      id: m.id,
      role: m.role as any,
      content: m.content,
    })),
    onFinish: (message, { finishReason }) => {
      // Invalidate queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['conversation', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });

      // If no conversationId, extract it from response headers
      if (!conversationId && onConversationCreated) {
        // Note: You'd need to get this from the response somehow
        // This is a simplified example
        console.log('New conversation created');
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  return {
    ...chat,
    conversationId,
  };
}

/**
 * Simple useChat without persistence
 * 
 * Just uses Vercel AI SDK directly for ephemeral chats.
 */
export function useSimpleChat(options?: {
  model?: string;
  provider?: string;
  temperature?: number;
  maxTokens?: number;
}) {
  return useVercelChat({
    api: '/api/chat',
    body: options,
  });
}

// ============================================================================
// ANALYTICS HOOKS (Optional)
// ============================================================================

/**
 * Get usage analytics
 */
export function useAnalytics(userId?: string) {
  return useQuery({
    queryKey: ['analytics', userId],
    queryFn: () => apiClient.get(`/api/analytics${userId ? `?userId=${userId}` : ''}`),
    enabled: !!userId,
  });
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Archive a conversation
 */
export function useArchiveConversation() {
  const updateConversation = useUpdateConversation();

  return useCallback(
    (id: string) => {
      return updateConversation.mutateAsync({
        id,
        data: { status: 'archived' },
      });
    },
    [updateConversation]
  );
}

/**
 * Restore an archived conversation
 */
export function useRestoreConversation() {
  const updateConversation = useUpdateConversation();

  return useCallback(
    (id: string) => {
      return updateConversation.mutateAsync({
        id,
        data: { status: 'active' },
      });
    },
    [updateConversation]
  );
}

/**
 * Rename a conversation
 */
export function useRenameConversation() {
  const updateConversation = useUpdateConversation();

  return useCallback(
    (id: string, title: string) => {
      return updateConversation.mutateAsync({
        id,
        data: { title },
      });
    },
    [updateConversation]
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Re-export Vercel AI SDK hooks for direct use
  useChat,
  useCompletion,
} from 'ai/react';
