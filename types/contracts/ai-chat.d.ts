/**
 * ai-chat Contract Types
 * 
 * Auto-generated from contract.ts
 */
export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'failed' | 'streaming';
export type ChatStatus = 'idle' | 'loading' | 'streaming' | 'error';
export type ModelProvider = 'openai' | 'anthropic' | 'google' | 'azure' | 'custom';
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
export interface IAIChatService {
  useConversations: () => {
    list: any; // UseQueryResult<Conversation[], Error>
    get: (id: string) => any; // UseQueryResult<Conversation, Error>
    create: any; // UseMutationResult<Conversation, Error, CreateConversationData>
    update: any; // UseMutationResult<Conversation, Error, { id: string; data: UpdateConversationData }>
    delete: any; // UseMutationResult<void, Error, string>
    clear: any; // UseMutationResult<void, Error, string>
  };
  useMessages: () => {
    list: (conversationId: string) => any; // UseQueryResult<Message[], Error>
    get: (id: string) => any; // UseQueryResult<Message, Error>
    send: any; // UseMutationResult<Message, Error, SendMessageData>
    update: any; // UseMutationResult<Message, Error, { id: string; data: UpdateMessageData }>
    delete: any; // UseMutationResult<void, Error, string>
    regenerate: any; // UseMutationResult<Message, Error, string>
  };
  useSettings: () => {
    getSettings: any; // UseQueryResult<ChatSettings, Error>
    updateSettings: any; // UseMutationResult<ChatSettings, Error, ChatSettings>
    resetSettings: any; // UseMutationResult<ChatSettings, Error, void>
  };
  useAnalytics: () => {
    getChatAnalytics: any; // UseQueryResult<ChatAnalytics, Error>
    getConversationAnalytics: (conversationId: string) => any; // UseQueryResult<ConversationAnalytics, Error>
  };
}