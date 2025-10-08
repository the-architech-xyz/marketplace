// AI Chat Hook

import { useState, useCallback, useRef, useEffect } from 'react';
import { useAIProvider } from './AIProvider';

// Types
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    tokens?: number;
    model?: string;
    provider?: string;
    cost?: number;
    duration?: number;
  };
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

interface UseChatOptions {
  initialMessages?: ChatMessage[];
  onMessage?: (message: ChatMessage) => void;
  onError?: (error: Error) => void;
  onComplete?: (message: ChatMessage) => void;
  stream?: boolean;
  maxMessages?: number;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  retryLastMessage: () => Promise<void>;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
}

export const useChat = (options: UseChatOptions = {}): UseChatReturn => {
  const {
    initialMessages = [],
    onMessage,
    onError,
    onComplete,
    stream = true,
    maxMessages = 100,
  } = options;

  const { currentProvider, currentModel, settings, updateUsage } = useAIProvider();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastMessageRef = useRef<ChatMessage | null>(null);

  // Initialize messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('ai-chat-messages');
    if (savedMessages && messages.length === 0) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
      } catch (error) {
        console.error('Failed to load chat messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai-chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Limit messages to maxMessages
  useEffect(() => {
    if (messages.length > maxMessages) {
      setMessages(prev => prev.slice(-maxMessages));
    }
  }, [messages.length, maxMessages]);

  const generateId = useCallback(() => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }, []);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: generateId(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    onMessage?.(newMessage);
    return newMessage;
  }, [generateId, onMessage]);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<ChatMessage>) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, ...updates } : msg
    ));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('ai-chat-messages');
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    const userMessage = addMessage({
      role: 'user',
      content: content.trim(),
    });

    // Create assistant message placeholder
    const assistantMessage = addMessage({
      role: 'assistant',
      content: '',
    });

    lastMessageRef.current = assistantMessage;

    try {
      // Abort previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_AI_API_KEY || '',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          settings: {
            model: currentModel,
            provider: currentProvider,
            ...settings,
          },
          stream,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      if (stream && response.body) {
        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.chunk) {
                  fullContent += parsed.chunk;
                  updateMessage(assistantMessage.id, {
                    content: fullContent,
                  });
                }

                if (parsed.isComplete) {
                  updateMessage(assistantMessage.id, {
                    content: fullContent,
                    metadata: {
                      tokens: parsed.usage?.totalTokens,
                      model: currentModel,
                      provider: currentProvider,
                      cost: parsed.cost,
                      duration: parsed.duration,
                    },
                  });

                  // Update usage
                  if (parsed.usage) {
                    updateUsage({
                      totalTokens: prev => prev + parsed.usage.totalTokens,
                      totalCost: prev => prev + (parsed.cost || 0),
                      totalRequests: prev => prev + 1,
                    });
                  }

                  onComplete?.(assistantMessage);
                }
              } catch (e) {
                // Ignore parsing errors for streaming
              }
            }
          }
        }
      } else {
        // Handle non-streaming response
        const data = await response.json();
        updateMessage(assistantMessage.id, {
          content: data.message.content,
          metadata: {
            tokens: data.usage?.totalTokens,
            model: currentModel,
            provider: currentProvider,
            cost: data.cost,
            duration: data.duration,
          },
        });

        // Update usage
        if (data.usage) {
          updateUsage({
            totalTokens: prev => prev + data.usage.totalTokens,
            totalCost: prev => prev + (data.cost || 0),
            totalRequests: prev => prev + 1,
          });
        }

        onComplete?.(assistantMessage);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was aborted, don't show error
        return;
      }

      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      updateMessage(assistantMessage.id, {
        content: `Error: ${errorMessage}`,
      });
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [
    messages,
    isLoading,
    addMessage,
    updateMessage,
    updateUsage,
    currentProvider,
    currentModel,
    settings,
    stream,
    onComplete,
    onError,
  ]);

  const retryLastMessage = useCallback(async () => {
    if (messages.length < 2) return;

    const lastUserMessage = messages[messages.length - 2];
    if (lastUserMessage.role !== 'user') return;

    // Remove the last assistant message
    setMessages(prev => prev.slice(0, -1));

    // Resend the last user message
    await sendMessage(lastUserMessage.content);
  }, [messages, sendMessage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    retryLastMessage,
    setMessages,
    addMessage,
    removeMessage,
    updateMessage,
  };
};