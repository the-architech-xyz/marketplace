/**
 * AI Streaming Hook
 * 
 * React hook for streaming AI responses using Vercel AI SDK.
 * Based on modern Next.js and TypeScript best practices.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { streamAIText, streamAIObject, AIStreamResponse, AIConfig, AIError } from './ai-utils';

// Types
export interface UseStreamingOptions {
  onComplete?: (response: AIStreamResponse) => void;
  onError?: (error: AIError) => void;
  onChunk?: (chunk: string) => void;
  autoStart?: boolean;
}

export interface UseStreamingReturn {
  text: string;
  isStreaming: boolean;
  error: AIError | null;
  startStream: (prompt: string, config?: AIConfig, providerId?: string) => Promise<void>;
  stopStream: () => void;
  clear: () => void;
  retry: () => Promise<void>;
}

export interface UseObjectStreamingOptions<T> {
  onComplete?: (object: T) => void;
  onError?: (error: AIError) => void;
  onChunk?: (chunk: Partial<T>) => void;
  autoStart?: boolean;
}

export interface UseObjectStreamingReturn<T> {
  object: T | null;
  isStreaming: boolean;
  error: AIError | null;
  startStream: (prompt: string, schema: any, config?: AIConfig, providerId?: string) => Promise<void>;
  stopStream: () => void;
  clear: () => void;
  retry: () => Promise<void>;
}

// Text streaming hook
export function useStreaming(options: UseStreamingOptions = {}): UseStreamingReturn {
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<AIError | null>(null);
  const [lastPrompt, setLastPrompt] = useState('');
  const [lastConfig, setLastConfig] = useState<AIConfig>({});
  const [lastProviderId, setLastProviderId] = useState('openai');
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const streamGeneratorRef = useRef<AsyncGenerator<AIStreamResponse, void, unknown> | null>(null);

  const { onComplete, onError, onChunk } = options;

  const startStream = useCallback(async (
    prompt: string,
    config: AIConfig = {},
    providerId: string = 'openai'
  ) => {
    if (isStreaming) {
      console.warn('Stream is already in progress');
      return;
    }

    try {
      setIsStreaming(true);
      setError(null);
      setText('');
      setLastPrompt(prompt);
      setLastConfig(config);
      setLastProviderId(providerId);

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      // Start streaming
      const streamGenerator = streamAIText(prompt, config, providerId);
      streamGeneratorRef.current = streamGenerator;

      for await (const chunk of streamGenerator) {
        // Check if stream was cancelled
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }

        if (chunk.isComplete) {
          // Stream completed
          const finalResponse: AIStreamResponse = {
            text,
            isComplete: true,
            usage: chunk.usage,
          };
          
          onComplete?.(finalResponse);
          break;
        } else {
          // Add chunk to text
          setText(prev => prev + chunk.text);
          onChunk?.(chunk.text);
        }
      }
    } catch (err) {
      const aiError = err instanceof AIError ? err : new AIError(
        err instanceof Error ? err.message : 'Unknown error',
        'STREAM_ERROR'
      );
      setError(aiError);
      onError?.(aiError);
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
      streamGeneratorRef.current = null;
    }
  }, [isStreaming, text, onComplete, onError, onChunk]);

  const stopStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsStreaming(false);
  }, []);

  const clear = useCallback(() => {
    setText('');
    setError(null);
    setIsStreaming(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const retry = useCallback(async () => {
    if (lastPrompt) {
      await startStream(lastPrompt, lastConfig, lastProviderId);
    }
  }, [lastPrompt, lastConfig, lastProviderId, startStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    text,
    isStreaming,
    error,
    startStream,
    stopStream,
    clear,
    retry,
  };
}

// Object streaming hook
export function useObjectStreaming<T>(
  options: UseObjectStreamingOptions<T> = {}
): UseObjectStreamingReturn<T> {
  const [object, setObject] = useState<T | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<AIError | null>(null);
  const [lastPrompt, setLastPrompt] = useState('');
  const [lastSchema, setLastSchema] = useState<any>(null);
  const [lastConfig, setLastConfig] = useState<AIConfig>({});
  const [lastProviderId, setLastProviderId] = useState('openai');
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const streamGeneratorRef = useRef<AsyncGenerator<T, void, unknown> | null>(null);

  const { onComplete, onError, onChunk } = options;

  const startStream = useCallback(async (
    prompt: string,
    schema: any,
    config: AIConfig = {},
    providerId: string = 'openai'
  ) => {
    if (isStreaming) {
      console.warn('Stream is already in progress');
      return;
    }

    try {
      setIsStreaming(true);
      setError(null);
      setObject(null);
      setLastPrompt(prompt);
      setLastSchema(schema);
      setLastConfig(config);
      setLastProviderId(providerId);

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      // Start streaming
      const streamGenerator = streamAIObject<T>(prompt, schema, config, providerId);
      streamGeneratorRef.current = streamGenerator;

      for await (const chunk of streamGenerator) {
        // Check if stream was cancelled
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }

        // Update object with new chunk
        setObject(prev => ({ ...prev, ...chunk } as T));
        onChunk?.(chunk);
      }

      // Stream completed
      onComplete?.(object as T);
    } catch (err) {
      const aiError = err instanceof AIError ? err : new AIError(
        err instanceof Error ? err.message : 'Unknown error',
        'STREAM_ERROR'
      );
      setError(aiError);
      onError?.(aiError);
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
      streamGeneratorRef.current = null;
    }
  }, [isStreaming, object, onComplete, onError, onChunk]);

  const stopStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsStreaming(false);
  }, []);

  const clear = useCallback(() => {
    setObject(null);
    setError(null);
    setIsStreaming(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const retry = useCallback(async () => {
    if (lastPrompt && lastSchema) {
      await startStream(lastPrompt, lastSchema, lastConfig, lastProviderId);
    }
  }, [lastPrompt, lastSchema, lastConfig, lastProviderId, startStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    object,
    isStreaming,
    error,
    startStream,
    stopStream,
    clear,
    retry,
  };
}

// Utility hook for managing multiple streams
export function useMultipleStreams() {
  const [streams, setStreams] = useState<Map<string, UseStreamingReturn>>(new Map());

  const createStream = useCallback((id: string, options?: UseStreamingOptions) => {
    const stream = useStreaming(options);
    setStreams(prev => new Map(prev.set(id, stream)));
    return stream;
  }, []);

  const getStream = useCallback((id: string) => {
    return streams.get(id);
  }, [streams]);

  const removeStream = useCallback((id: string) => {
    const stream = streams.get(id);
    if (stream) {
      stream.stopStream();
      setStreams(prev => {
        const newStreams = new Map(prev);
        newStreams.delete(id);
        return newStreams;
      });
    }
  }, [streams]);

  const stopAllStreams = useCallback(() => {
    streams.forEach(stream => stream.stopStream());
  }, [streams]);

  const clearAllStreams = useCallback(() => {
    streams.forEach(stream => stream.clear());
  }, [streams]);

  return {
    streams: Array.from(streams.values()),
    createStream,
    getStream,
    removeStream,
    stopAllStreams,
    clearAllStreams,
  };
}

// Hook for streaming with automatic retry
export function useStreamingWithRetry(
  maxRetries: number = 3,
  retryDelay: number = 1000,
  options: UseStreamingOptions = {}
): UseStreamingReturn & { retryCount: number } {
  const [retryCount, setRetryCount] = useState(0);
  const stream = useStreaming({
    ...options,
    onError: (error) => {
      if (retryCount < maxRetries && error.retryable) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          stream.retry();
        }, retryDelay);
      } else {
        options.onError?.(error);
      }
    },
    onComplete: () => {
      setRetryCount(0);
      options.onComplete?.(stream as any);
    },
  });

  return {
    ...stream,
    retryCount,
  };
}

// Hook for streaming with progress tracking
export function useStreamingWithProgress(
  options: UseStreamingOptions = {}
): UseStreamingReturn & { progress: number; estimatedTimeRemaining: number } {
  const [progress, setProgress] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number | null>(null);

  const stream = useStreaming({
    ...options,
    onChunk: (chunk) => {
      const now = Date.now();
      
      if (!startTime) {
        setStartTime(now);
      }
      
      setLastUpdateTime(now);
      
      // Estimate progress based on text length (rough approximation)
      const estimatedTotalLength = 1000; // This could be improved with better estimation
      const currentProgress = Math.min((stream.text.length / estimatedTotalLength) * 100, 95);
      setProgress(currentProgress);
      
      // Estimate time remaining
      if (startTime && lastUpdateTime) {
        const elapsed = now - startTime;
        const rate = stream.text.length / elapsed;
        const remaining = Math.max(0, (estimatedTotalLength - stream.text.length) / rate);
        setEstimatedTimeRemaining(remaining);
      }
      
      options.onChunk?.(chunk);
    },
    onComplete: (response) => {
      setProgress(100);
      setEstimatedTimeRemaining(0);
      options.onComplete?.(response);
    },
    onError: (error) => {
      setProgress(0);
      setEstimatedTimeRemaining(0);
      options.onError?.(error);
    },
  });

  return {
    ...stream,
    progress,
    estimatedTimeRemaining,
  };
}
