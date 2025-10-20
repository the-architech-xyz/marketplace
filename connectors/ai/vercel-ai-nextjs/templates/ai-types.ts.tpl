// AI Types for Vercel AI SDK

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface ChatOptions {
  body?: Record<string, any>;
  headers?: Record<string, string>;
  stream?: boolean;
  onResponse?: (response: Response) => void;
  onError?: (error: Error) => void;
  onFinish?: (message: string) => void;
}

export interface ChatResponse {
  messages: ChatMessage[];
  isLoading: boolean;
  error: Error | undefined;
  stop: () => void;
  reload: () => void;
  setMessages: (messages: ChatMessage[]) => void;
}

export interface CompletionOptions {
  model?: string;
  provider?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
  stream?: boolean;
}

export interface CompletionResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason?: string;
}

export interface StreamingOptions extends CompletionOptions {
  onChunk?: (chunk: string) => void;
  onComplete?: (response: CompletionResponse) => void;
}

export interface AIProvider {
  name: string;
  models: string[];
  supportsStreaming: boolean;
  supportsFunctionCalling: boolean;
  supportsImageGeneration: boolean;
  supportsEmbeddings: boolean;
}

export interface ModelConfig {
  provider: any;
  model: string;
  maxTokens: number;
  cost: number;
  supportsStreaming?: boolean;
  supportsFunctionCalling?: boolean;
  supportsImageGeneration?: boolean;
  supportsEmbeddings?: boolean;
}

export interface AIError extends Error {
  code?: string;
  status?: number;
  provider?: string;
  model?: string;
}

export interface ChatContext {
  messages: ChatMessage[];
  model: string;
  provider: string;
  temperature: number;
  maxTokens: number;
}

export interface FunctionCall {
  name: string;
  arguments: Record<string, any>;
  result?: any;
}

export interface ToolUse {
  name: string;
  input: Record<string, any>;
  result?: any;
}

export interface EmbeddingOptions {
  model?: string;
  provider?: string;
  dimensions?: number;
}

export interface EmbeddingResponse {
  embeddings: number[][];
  usage?: {
    promptTokens: number;
    totalTokens: number;
  };
}

export interface ImageGenerationOptions {
  model?: string;
  provider?: string;
  size?: '256x256' | '512x512' | '1024x1024';
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
  n?: number;
}

export interface ImageGenerationResponse {
  images: {
    url: string;
    revisedPrompt?: string;
  }[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Utility types
export type AIProviderName = 'openai' | 'anthropic' | 'google' | 'cohere' | 'huggingface';
export type ModelName = string;
export type MessageRole = 'user' | 'assistant' | 'system';
export type FinishReason = 'stop' | 'length' | 'function_call' | 'content_filter';

// Hook return types
export interface UseChatReturn {
  messages: ChatMessage[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: Error | undefined;
  stop: () => void;
  reload: () => void;
  setMessages: (messages: ChatMessage[]) => void;
  setInput: (input: string) => void;
  addMessage: (content: string, role?: MessageRole) => void;
  clearMessages: () => void;
  getConversationSummary: () => {
    messageCount: number;
    totalTokens: number;
    lastMessage?: ChatMessage;
    duration: number;
  };
  modelInfo: {
    provider: string;
    model: string;
    maxTokens: number;
    cost: number;
    supportsStreaming: boolean;
  };
  isStreamingSupported: boolean;
}

export interface UseCompletionReturn {
  completion: string;
  complete: (prompt: string, options?: CompletionOptions) => Promise<CompletionResponse>;
  isLoading: boolean;
  error: Error | undefined;
  stop: () => void;
  setCompletion: (completion: string) => void;
}

export interface UseStreamingReturn {
  text: string;
  stream: (prompt: string, options?: StreamingOptions) => Promise<CompletionResponse>;
  isLoading: boolean;
  error: Error | undefined;
  stop: () => void;
  setText: (text: string) => void;
}
