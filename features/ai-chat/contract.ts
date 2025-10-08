/**
 * AI Chat Feature Contract
 * 
 * This is the single source of truth for the AI Chat feature.
 * All backend implementations must implement these hooks and types.
 * All frontend implementations must consume these hooks and types.
 */

// Note: TanStack Query types are imported by the implementing service, not the contract

// ============================================================================
// CORE TYPES
// ============================================================================

export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'failed' | 'streaming';
export type ChatStatus = 'idle' | 'loading' | 'streaming' | 'error';
export type ModelProvider = 'openai' | 'anthropic' | 'google' | 'azure' | 'custom';

// ============================================================================
// DATA TYPES
// ============================================================================

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  timestamp: string;
  metadata?: {
    model?: string;
    tokens?: number;
    cost?: number;
    duration?: number;
    error?: string;
  };
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'file' | 'code' | 'url';
  name: string;
  url: string;
  size?: number;
  mimeType?: string;
  metadata?: Record<string, any>;
}

export interface Chat {
  id: string;
  title: string;
  description?: string;
  messages: Message[];
  status: ChatStatus;
  model: string;
  provider: ModelProvider;
  createdAt: string;
  updatedAt: string;
  userId: string;
  metadata?: {
    totalTokens?: number;
    totalCost?: number;
    messageCount?: number;
    lastActivity?: string;
  };
}

export interface ChatSession {
  id: string;
  chatId: string;
  userId: string;
  status: 'active' | 'paused' | 'ended';
  startedAt: string;
  endedAt?: string;
  metadata?: Record<string, any>;
}

export interface AIModel {
  id: string;
  name: string;
  provider: ModelProvider;
  description?: string;
  maxTokens: number;
  costPerToken: number;
  capabilities: string[];
  isAvailable: boolean;
  metadata?: Record<string, any>;
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface SendMessageData {
  content: string;
  chatId?: string;
  model?: string;
  attachments?: MessageAttachment[];
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface CreateChatData {
  title: string;
  description?: string;
  model: string;
  systemPrompt?: string;
  metadata?: Record<string, any>;
}

export interface UpdateChatData {
  title?: string;
  description?: string;
  model?: string;
  systemPrompt?: string;
  metadata?: Record<string, any>;
}

export interface UploadFileData {
  file: File;
  chatId?: string;
  type?: 'image' | 'document' | 'code';
}

export interface ExportChatData {
  chatId: string;
  format: 'json' | 'markdown' | 'pdf' | 'txt';
  includeMetadata?: boolean;
}

export interface ImportChatData {
  file: File;
  format: 'json' | 'markdown' | 'txt';
}

// ============================================================================
// RESULT TYPES
// ============================================================================

export interface SendMessageResult {
  message: Message;
  chat: Chat;
  streamId?: string;
}

export interface StreamMessageResult {
  messageId: string;
  content: string;
  isComplete: boolean;
  metadata?: {
    tokens?: number;
    cost?: number;
  };
}

export interface UploadFileResult {
  attachment: MessageAttachment;
  message?: Message;
}

export interface ExportChatResult {
  url: string;
  filename: string;
  size: number;
}

export interface ImportChatResult {
  chat: Chat;
  messageCount: number;
  importedAt: string;
}

// ============================================================================
// HOOK CONTRACTS
// ============================================================================

// Old granular contract removed - using cohesive IAIChatService instead

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface ChatAnalytics {
  totalChats: number;
  totalMessages: number;
  totalTokens: number;
  totalCost: number;
  averageMessagesPerChat: number;
  averageTokensPerMessage: number;
  mostUsedModel: string;
  chatGrowth: Array<{ date: string; count: number }>;
  tokenUsage: Array<{ date: string; tokens: number }>;
  costTrend: Array<{ date: string; cost: number }>;
}

export interface UsageStats {
  daily: {
    chats: number;
    messages: number;
    tokens: number;
    cost: number;
  };
  weekly: {
    chats: number;
    messages: number;
    tokens: number;
    cost: number;
  };
  monthly: {
    chats: number;
    messages: number;
    tokens: number;
    cost: number;
  };
  limits: {
    dailyChats: number;
    dailyMessages: number;
    dailyTokens: number;
    dailyCost: number;
  };
  usage: {
    dailyChats: number;
    dailyMessages: number;
    dailyTokens: number;
    dailyCost: number;
  };
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface AIChatConfig {
  models: {
    default: string;
    available: string[];
    maxTokens: number;
    temperature: number;
  };
  features: {
    streaming: boolean;
    fileUpload: boolean;
    voiceInput: boolean;
    voiceOutput: boolean;
    codeHighlighting: boolean;
    markdownSupport: boolean;
    exportImport: boolean;
    customPrompts: boolean;
  };
  limits: {
    maxMessagesPerChat: number;
    maxFileSize: number;
    maxFilesPerMessage: number;
    maxChatsPerUser: number;
  };
  ui: {
    theme: 'default' | 'dark' | 'light' | 'minimal';
    showTokenCount: boolean;
    showCost: boolean;
    showTimestamps: boolean;
    enableAnimations: boolean;
  };
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface AIChatError {
  code: string;
  message: string;
  type: 'model_error' | 'rate_limit_error' | 'quota_error' | 'network_error' | 'validation_error';
  details?: {
    model?: string;
    tokens?: number;
    retryAfter?: number;
    quota?: {
      limit: number;
      used: number;
      remaining: number;
    };
  };
}

// ============================================================================
// CONVERSATION TYPES (for service compatibility)
// ============================================================================

export interface Conversation {
  id: string;
  title: string;
  userId: string;
  status: 'active' | 'archived';
  settings: {
    model: string;
    temperature: number;
    maxTokens: number;
    systemPrompt?: string;
  };
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConversationData {
  title?: string;
  settings?: Partial<Conversation['settings']>;
}

export interface UpdateConversationData {
  title?: string;
  settings?: Partial<Conversation['settings']>;
}

export interface UpdateMessageData {
  content?: string;
  metadata?: Record<string, any>;
}

export interface ChatSettings {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

export interface ConversationAnalytics {
  conversationId: string;
  messageCount: number;
  averageResponseTime: number;
  userSatisfaction: number;
  topics: string[];
}

// ============================================================================
// HOOK SERVICE CONTRACT
// ============================================================================

/**
 * AI Chat Service Contract
 *
 * This interface defines the cohesive business services for the AI Chat feature.
 * Backend implementations must provide an object that implements this interface.
 * Frontend implementations must consume this service.
 */
export interface IAIChatService {
  /**
   * Conversation Management Service
   * Provides all conversation-related operations in a cohesive interface
   */
  useConversations: () => {
    // Query operations
    list: any; // UseQueryResult<Conversation[], Error>
    get: (id: string) => any; // UseQueryResult<Conversation, Error>
    
    // Mutation operations
    create: any; // UseMutationResult<Conversation, Error, CreateConversationData>
    update: any; // UseMutationResult<Conversation, Error, { id: string; data: UpdateConversationData }>
    delete: any; // UseMutationResult<void, Error, string>
    clear: any; // UseMutationResult<void, Error, string>
  };

  /**
   * Message Management Service
   * Provides all message-related operations in a cohesive interface
   */
  useMessages: () => {
    // Query operations
    list: (conversationId: string) => any; // UseQueryResult<Message[], Error>
    get: (id: string) => any; // UseQueryResult<Message, Error>
    
    // Mutation operations
    send: any; // UseMutationResult<Message, Error, SendMessageData>
    update: any; // UseMutationResult<Message, Error, { id: string; data: UpdateMessageData }>
    delete: any; // UseMutationResult<void, Error, string>
    regenerate: any; // UseMutationResult<Message, Error, string>
  };

  /**
   * Chat Settings Service
   * Provides chat configuration and settings management
   */
  useSettings: () => {
    // Query operations
    getSettings: any; // UseQueryResult<ChatSettings, Error>
    
    // Mutation operations
    updateSettings: any; // UseMutationResult<ChatSettings, Error, ChatSettings>
    resetSettings: any; // UseMutationResult<ChatSettings, Error, void>
  };

  /**
   * Analytics Service
   * Provides chat analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    getChatAnalytics: any; // UseQueryResult<ChatAnalytics, Error>
    getConversationAnalytics: (conversationId: string) => any; // UseQueryResult<ConversationAnalytics, Error>
  };
}
