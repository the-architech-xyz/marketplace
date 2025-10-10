/**
 * AI Chat Frontend Types
 * 
 * Unified type definitions for the AI Chat frontend components.
 * These types extend the backend contract types with frontend-specific additions.
 */

// Re-export backend contract types
export type {
  MessageRole,
  MessageStatus,
  ChatStatus,
  ModelProvider,
  Message,
  MessageAttachment,
  Chat,
  ChatSession,
  AIModel,
  SendMessageData,
  CreateChatData,
  UpdateChatData,
  UploadFileData,
  ExportChatData,
  ImportChatData,
  SendMessageResult,
  StreamMessageResult,
  UploadFileResult,
  ExportChatResult,
  ImportChatResult,
  ChatAnalytics,
  UsageStats,
  AIChatConfig,
  AIChatError,
  Conversation,
  CreateConversationData,
  UpdateConversationData,
  UpdateMessageData,
  ChatSettings,
  ConversationAnalytics,
  IAIChatService,
} from '@/features/ai-chat/contract';

// Frontend-specific types
export interface MessageFilters {
  role?: MessageRole;
  status?: MessageStatus;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
}

export interface ConversationFilters {
  search?: string;
  status?: 'active' | 'archived';
  pinned?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface MessageHistoryProps {
  className?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  maxHeight?: string;
  onMessageAction?: (action: 'copy' | 'delete' | 'regenerate', messageId: string) => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: MessageFilters) => void;
}

export interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onConversationSelect: (conversationId: string) => void;
  onConversationCreate: (data: CreateConversationData) => void;
  onConversationUpdate: (id: string, data: UpdateConversationData) => void;
  onConversationDelete: (id: string) => void;
  onConversationArchive: (id: string) => void;
  onConversationPin: (id: string) => void;
  onConversationUnpin: (id: string) => void;
  className?: string;
  showSearch?: boolean;
  showCreateButton?: boolean;
  maxHeight?: string;
  isLoading?: boolean;
  error?: string | null;
}

export interface UseAIChatExtendedOptions {
  conversationId?: string;
  initialSettings?: Partial<ChatSettings>;
  onError?: (error: Error) => void;
  onConversationChange?: (conversation: Conversation) => void;
  onMessageSent?: (message: Message) => void;
  onMessageReceived?: (message: Message) => void;
}

export interface UseAIChatExtendedReturn {
  // Core chat functionality (from Vercel's useChat)
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: Error | null;
  stop: () => void;
  reload: () => void;
  setMessages: (messages: Message[]) => void;
  setInput: (input: string) => void;

  // Extended functionality
  currentConversation: Conversation | null;
  conversations: Conversation[];
  settings: ChatSettings;
  analytics: ChatAnalytics | null;
  
  // Conversation management
  createConversation: (data: CreateConversationData) => Promise<Conversation>;
  updateConversation: (id: string, data: UpdateConversationData) => Promise<Conversation>;
  deleteConversation: (id: string) => Promise<void>;
  switchConversation: (id: string) => Promise<void>;
  archiveConversation: (id: string) => Promise<void>;
  pinConversation: (id: string) => Promise<void>;
  unpinConversation: (id: string) => Promise<void>;
  
  // Message management
  sendMessage: (content: string, options?: Partial<SendMessageData>) => Promise<Message>;
  updateMessage: (id: string, data: UpdateMessageData) => Promise<Message>;
  deleteMessage: (id: string) => Promise<void>;
  regenerateMessage: (id: string) => Promise<Message>;
  
  // Settings management
  updateSettings: (settings: Partial<ChatSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
  
  // Analytics
  refreshAnalytics: () => Promise<void>;
  getConversationAnalytics: (conversationId: string) => Promise<ConversationAnalytics>;
  
  // Utility functions
  clearCurrentConversation: () => void;
  exportConversation: (format: 'json' | 'markdown' | 'pdf') => Promise<string>;
  importConversation: (data: string, format: 'json' | 'markdown') => Promise<Conversation>;
  
  // State flags
  isCreatingConversation: boolean;
  isUpdatingConversation: boolean;
  isDeletingConversation: boolean;
  isSendingMessage: boolean;
  isUpdatingMessage: boolean;
  isDeletingMessage: boolean;
  isUpdatingSettings: boolean;
  isRefreshingAnalytics: boolean;
}

// UI Component Props
export interface ChatInterfaceProps {
  className?: string;
  showSidebar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  maxHeight?: string;
  onError?: (error: Error) => void;
  onConversationChange?: (conversation: Conversation) => void;
}

export interface MessageInputProps {
  className?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  onSend?: (content: string, attachments?: File[]) => void;
  onVoiceInput?: () => void;
  onFileUpload?: (files: File[]) => void;
}

export interface MessageListProps {
  messages: Message[];
  className?: string;
  showTimestamps?: boolean;
  showStatus?: boolean;
  onMessageAction?: (action: 'copy' | 'delete' | 'regenerate', messageId: string) => void;
}

export interface MediaPreviewProps {
  attachments: MessageAttachment[];
  className?: string;
  onRemove?: (attachmentId: string) => void;
  onDownload?: (attachmentId: string) => void;
}

export interface FileUploadProps {
  className?: string;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  onUpload?: (files: File[]) => void;
  onError?: (error: Error) => void;
}

export interface CustomPromptsProps {
  className?: string;
  onPromptSelect?: (prompt: string) => void;
  onPromptCreate?: (prompt: CustomPrompt) => void;
  onPromptUpdate?: (id: string, prompt: CustomPrompt) => void;
  onPromptDelete?: (id: string) => void;
}

export interface SettingsPanelProps {
  className?: string;
  settings: ChatSettings;
  onSettingsChange?: (settings: ChatSettings) => void;
  onReset?: () => void;
}

export interface VoiceInputProps {
  className?: string;
  onTranscription?: (text: string) => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
}

export interface VoiceOutputProps {
  className?: string;
  text: string;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  disabled?: boolean;
}

export interface LoadingIndicatorProps {
  className?: string;
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

export interface ErrorDisplayProps {
  className?: string;
  error: Error;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export interface ChatAnalyticsProps {
  className?: string;
  analytics: ChatAnalytics;
  conversationId?: string;
  onRefresh?: () => void;
}

// Custom Prompt types
export interface CustomPrompt {
  id: string;
  name: string;
  content: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomPromptCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

// Export/Import types
export interface ExportOptions {
  format: 'json' | 'markdown' | 'pdf' | 'txt';
  includeMetadata?: boolean;
  includeAttachments?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface ImportOptions {
  format: 'json' | 'markdown' | 'txt';
  mergeWithExisting?: boolean;
  createNewConversation?: boolean;
}

// Theme and UI types
export interface ChatTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface ChatUIConfig {
  theme: ChatTheme;
  layout: {
    sidebarWidth: string;
    headerHeight: string;
    footerHeight: string;
  };
  features: {
    showTimestamps: boolean;
    showStatus: boolean;
    showTokenCount: boolean;
    showCost: boolean;
    enableAnimations: boolean;
    enableSounds: boolean;
  };
  limits: {
    maxMessageLength: number;
    maxAttachments: number;
    maxFileSize: number;
  };
}

// Event types
export interface ChatEvent {
  type: 'message_sent' | 'message_received' | 'conversation_created' | 'conversation_updated' | 'conversation_deleted' | 'settings_updated' | 'error';
  timestamp: string;
  data: any;
}

export interface ChatEventHandler {
  (event: ChatEvent): void;
}

// Hook return types for individual features
export interface UseConversationsReturn {
  conversations: Conversation[];
  isLoading: boolean;
  error: Error | null;
  createConversation: (data: CreateConversationData) => Promise<Conversation>;
  updateConversation: (id: string, data: UpdateConversationData) => Promise<Conversation>;
  deleteConversation: (id: string) => Promise<void>;
  archiveConversation: (id: string) => Promise<void>;
  pinConversation: (id: string) => Promise<void>;
  unpinConversation: (id: string) => Promise<void>;
}

export interface UseMessagesReturn {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (data: SendMessageData) => Promise<Message>;
  updateMessage: (id: string, data: UpdateMessageData) => Promise<Message>;
  deleteMessage: (id: string) => Promise<void>;
  regenerateMessage: (id: string) => Promise<Message>;
}

export interface UseSettingsReturn {
  settings: ChatSettings;
  isLoading: boolean;
  error: Error | null;
  updateSettings: (settings: ChatSettings) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export interface UseAnalyticsReturn {
  analytics: ChatAnalytics | null;
  isLoading: boolean;
  error: Error | null;
  refreshAnalytics: () => Promise<void>;
  getConversationAnalytics: (conversationId: string) => Promise<ConversationAnalytics>;
}

// Utility types
export type MessageAction = 'copy' | 'delete' | 'regenerate' | 'edit' | 'reply';
export type ConversationAction = 'create' | 'update' | 'delete' | 'archive' | 'pin' | 'unpin';
export type ExportFormat = 'json' | 'markdown' | 'pdf' | 'txt';
export type ImportFormat = 'json' | 'markdown' | 'txt';
export type VoiceCommand = 'start' | 'stop' | 'pause' | 'resume' | 'cancel';

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface ChatError extends Error {
  code: string;
  type: 'validation' | 'network' | 'api' | 'permission' | 'rate_limit' | 'quota' | 'unknown';
  details?: Record<string, any>;
  retryable?: boolean;
}

// Constants
export const MESSAGE_ACTIONS: MessageAction[] = ['copy', 'delete', 'regenerate', 'edit', 'reply'];
export const CONVERSATION_ACTIONS: ConversationAction[] = ['create', 'update', 'delete', 'archive', 'pin', 'unpin'];
export const EXPORT_FORMATS: ExportFormat[] = ['json', 'markdown', 'pdf', 'txt'];
export const IMPORT_FORMATS: ImportFormat[] = ['json', 'markdown', 'txt'];
export const VOICE_COMMANDS: VoiceCommand[] = ['start', 'stop', 'pause', 'resume', 'cancel'];

// Default values
export const DEFAULT_CHAT_SETTINGS: ChatSettings = {
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 1000,
  systemPrompt: 'You are a helpful AI assistant.',
};

export const DEFAULT_UI_CONFIG: ChatUIConfig = {
  theme: {
    name: 'default',
    colors: {
      primary: 'hsl(222.2 84% 4.9%)',
      secondary: 'hsl(210 40% 98%)',
      background: 'hsl(0 0% 100%)',
      surface: 'hsl(0 0% 100%)',
      text: 'hsl(222.2 84% 4.9%)',
      muted: 'hsl(210 40% 96%)',
      border: 'hsl(214.3 31.8% 91.4%)',
      accent: 'hsl(210 40% 98%)',
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
    },
  },
  layout: {
    sidebarWidth: '280px',
    headerHeight: '60px',
    footerHeight: '80px',
  },
  features: {
    showTimestamps: true,
    showStatus: true,
    showTokenCount: false,
    showCost: false,
    enableAnimations: true,
    enableSounds: false,
  },
  limits: {
    maxMessageLength: 2000,
    maxAttachments: 5,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
};
