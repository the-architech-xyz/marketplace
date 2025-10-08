import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AIService, SendMessageData, ChatMessage, ChatSession } from '../api/ai-api';

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SendMessageData) => AIService.sendMessage(data),
    onSuccess: (message, variables) => {
      if (variables.sessionId) {
        queryClient.invalidateQueries({ queryKey: ['chat-history', variables.sessionId] });
      }
    }
  });
};

export const useStreamMessage = () => {
  return useMutation({
    mutationFn: (data: SendMessageData) => AIService.streamMessage(data),
  });
};

export const useCreateChatSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (title: string) => AIService.createChatSession(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
    }
  });
};

export const useChatHistory = (sessionId: string) => {
  return useQuery({
    queryKey: ['chat-history', sessionId],
    queryFn: () => AIService.getChatHistory(sessionId),
    enabled: !!sessionId
  });
};

export const useChatSessions = () => {
  return useQuery({
    queryKey: ['chat-sessions'],
    queryFn: async (): Promise<ChatSession[]> => {
      // This would typically fetch from an API
      return [];
    }
  });
};

export const useDeleteChatSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (sessionId: string) => AIService.deleteChatSession(sessionId),
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] });
      queryClient.removeQueries({ queryKey: ['chat-history', sessionId] });
    }
  });
};

export const useSaveMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ sessionId, message }: { sessionId: string; message: ChatMessage }) => 
      AIService.saveMessage(sessionId, message),
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: ['chat-history', sessionId] });
    }
  });
};
