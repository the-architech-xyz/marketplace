/**
 * AI Chat Zustand Stores
 * 
 * Client-side state management for AI chat.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================================================
// CHAT UI STORE
// ============================================================================

interface ChatUIState {
  // Active conversation
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;

  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Settings
  isSettingsOpen: boolean;
  toggleSettings: () => void;
  setSettingsOpen: (open: boolean) => void;

  // Input
  inputValue: string;
  setInputValue: (value: string) => void;
  clearInput: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

/**
 * Chat UI Store
 * 
 * Manages UI state for the chat interface.
 */
export const useChatUIStore = create<ChatUIState>()(
  persist(
    (set) => ({
      // Active conversation
      activeConversationId: null,
      setActiveConversationId: (id) => set({ activeConversationId: id }),

      // Sidebar
      isSidebarOpen: true,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (open) => set({ isSidebarOpen: open }),

      // Settings
      isSettingsOpen: false,
      toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
      setSettingsOpen: (open) => set({ isSettingsOpen: open }),

      // Input
      inputValue: '',
      setInputValue: (value) => set({ inputValue: value }),
      clearInput: () => set({ inputValue: '' }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearSearch: () => set({ searchQuery: '' }),
    }),
    {
      name: 'chat-ui-storage',
      partialize: (state) => ({
        activeConversationId: state.activeConversationId,
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
);

// ============================================================================
// CHAT SETTINGS STORE
// ============================================================================

interface ChatSettings {
  model: string;
  provider: 'openai' | 'anthropic' | 'google' | 'cohere' | 'huggingface';
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  streaming: boolean;
}

interface ChatSettingsState extends ChatSettings {
  updateSettings: (settings: Partial<ChatSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: ChatSettings = {
  model: 'gpt-3.5-turbo',
  provider: 'openai',
              temperature: 0.7,
  maxTokens: 1000,
  systemPrompt: '',
  streaming: true,
};

/**
 * Chat Settings Store
 * 
 * Manages chat configuration and preferences.
 */
export const useChatSettingsStore = create<ChatSettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'chat-settings-storage',
    }
  )
);

// ============================================================================
// DRAFT MESSAGES STORE
// ============================================================================

interface DraftMessage {
  conversationId: string;
  content: string;
  timestamp: number;
}

interface DraftMessagesState {
  drafts: Record<string, DraftMessage>;
  saveDraft: (conversationId: string, content: string) => void;
  getDraft: (conversationId: string) => string | null;
  clearDraft: (conversationId: string) => void;
  clearAllDrafts: () => void;
}

/**
 * Draft Messages Store
 * 
 * Saves unsent message drafts per conversation.
 */
export const useDraftMessagesStore = create<DraftMessagesState>()(
  persist(
    (set, get) => ({
      drafts: {},
      saveDraft: (conversationId, content) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [conversationId]: {
              conversationId,
              content,
              timestamp: Date.now(),
            },
          },
        })),
      getDraft: (conversationId) => {
        const draft = get().drafts[conversationId];
        return draft?.content || null;
      },
      clearDraft: (conversationId) =>
          set((state) => {
          const { [conversationId]: _, ...rest } = state.drafts;
          return { drafts: rest };
        }),
      clearAllDrafts: () => set({ drafts: {} }),
    }),
    {
      name: 'chat-drafts-storage',
    }
  )
);

// ============================================================================
// SELECTION STORE (for bulk operations)
// ============================================================================

interface SelectionState {
  selectedConversations: Set<string>;
  isSelectionMode: boolean;
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  enterSelectionMode: () => void;
  exitSelectionMode: () => void;
}

/**
 * Selection Store
 * 
 * Manages selection state for bulk operations.
 */
export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedConversations: new Set(),
  isSelectionMode: false,
  toggleSelection: (id) =>
    set((state) => {
      const newSelection = new Set(state.selectedConversations);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return { selectedConversations: newSelection };
    }),
  selectAll: (ids) =>
    set({ selectedConversations: new Set(ids), isSelectionMode: true }),
  clearSelection: () =>
    set({ selectedConversations: new Set(), isSelectionMode: false }),
  enterSelectionMode: () => set({ isSelectionMode: true }),
  exitSelectionMode: () =>
    set({ selectedConversations: new Set(), isSelectionMode: false }),
}));

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Get the current active conversation ID
 */
export const useActiveConversation = () => 
  useChatUIStore((state) => state.activeConversationId);

/**
 * Get current chat settings
 */
export const useChatSettings = () => 
  useChatSettingsStore((state) => ({
    model: state.model,
    provider: state.provider,
    temperature: state.temperature,
    maxTokens: state.maxTokens,
    systemPrompt: state.systemPrompt,
    streaming: state.streaming,
  }));

/**
 * Check if sidebar is open
 */
export const useIsSidebarOpen = () => 
  useChatUIStore((state) => state.isSidebarOpen);
