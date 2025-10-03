import { useChat as useVercelChat } from 'ai/react';
import { useCallback, useMemo } from 'react';
import { AI_CONFIG, getModelConfig } from '@/lib/ai/config';
import { ChatMessage, ChatOptions, ChatResponse } from '@/types/ai';

export interface UseChatOptions extends ChatOptions {
  model?: string;
  provider?: string;
  maxTokens?: number;
  temperature?: number;
  onError?: (error: Error) => void;
  onFinish?: (message: string) => void;
}

export function useChat(options: UseChatOptions = {}) {
  const {
    model = AI_CONFIG.defaultModel,
    provider = 'openai',
    maxTokens = AI_CONFIG.maxTokens,
    temperature = AI_CONFIG.temperature,
    onError,
    onFinish,
    ...chatOptions
  } = options;

  // Get model configuration
  const modelConfig = useMemo(() => {
    try {
      return getModelConfig(provider, model);
    } catch (error) {
      console.error('Invalid model configuration:', error);
      return getModelConfig('openai', 'gpt-3.5-turbo');
    }
  }, [provider, model]);

  // Use Vercel's useChat hook
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    reload,
    setMessages,
    setInput,
    ...rest
  } = useVercelChat({
    api: '/api/chat',
    body: {
      model: `${provider}:${model}`,
      maxTokens,
      temperature,
      ...chatOptions.body,
    },
    onError: (error) => {
      console.error('Chat error:', error);
      onError?.(error);
    },
    onFinish: (message) => {
      onFinish?.(message.content);
    },
    ...chatOptions,
  });

  // Enhanced message handling
  const addMessage = useCallback(
    (content: string, role: 'user' | 'assistant' | 'system' = 'user') => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        role,
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, newMessage]);
    },
    [setMessages]
  );

  // Clear conversation
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  // Get conversation summary
  const getConversationSummary = useCallback(() => {
    return {
      messageCount: messages.length,
      totalTokens: messages.reduce((acc, msg) => acc + (msg.content?.length || 0), 0),
      lastMessage: messages[messages.length - 1],
      duration: messages.length > 1 
        ? new Date(messages[messages.length - 1]?.timestamp || 0).getTime() - 
          new Date(messages[0]?.timestamp || 0).getTime()
        : 0,
    };
  }, [messages]);

  // Check if streaming is supported
  const isStreamingSupported = useMemo(() => {
    return AI_CONFIG.features.streaming && modelConfig.provider.supportsStreaming;
  }, [modelConfig]);

  // Get model info
  const modelInfo = useMemo(() => ({
    provider,
    model,
    maxTokens: modelConfig.maxTokens,
    cost: modelConfig.cost,
    supportsStreaming: isStreamingSupported,
  }), [provider, model, modelConfig, isStreamingSupported]);

  return {
    // Core chat functionality
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    reload,
    setMessages,
    setInput,
    
    // Enhanced functionality
    addMessage,
    clearMessages,
    getConversationSummary,
    
    // Model information
    modelInfo,
    isStreamingSupported,
    
    // Rest of Vercel's useChat properties
    ...rest,
  };
}

// Hook for simple chat without streaming
export function useSimpleChat(options: UseChatOptions = {}) {
  const chat = useChat({
    ...options,
    stream: false,
  });

  return {
    ...chat,
    // Override streaming-related methods for simple chat
    stop: undefined,
    reload: undefined,
  };
}

// Hook for chat with function calling
export function useChatWithFunctions(
  functions: Record<string, any>,
  options: UseChatOptions = {}
) {
  const chat = useChat({
    ...options,
    body: {
      ...options.body,
      functions,
    },
  });

  return {
    ...chat,
    // Add function calling utilities
    callFunction: useCallback(
      (name: string, args: any) => {
        // Implementation for function calling
        console.log('Calling function:', name, args);
      },
      []
    ),
  };
}
