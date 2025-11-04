/**
 * AI Chat UI Store - Zustand State Management
 * 
 * ⚠️ ARCHITECTURE NOTE:
 * This store manages UI STATE ONLY - not server data!
 * 
 * SERVER DATA (conversations, messages) → Use TanStack Query hooks
 * UI STATE (sidebar, input state, streaming) → Use this Zustand store
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

interface AIChatUIState {
  // Selection State
  selectedConversationId: string | null;
  selectedMessageId: string | null;
  
  // UI State
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isChatLoading: boolean;
  isStreaming: boolean;
  
  // Input State
  inputMessage: string;
  inputFiles: File[];
  
  // View State
  viewMode: 'chat' | 'history' | 'settings';
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'auto';
  
  // Streaming State
  streamingMessageId: string | null;
  streamingContent: string;
  
  // Actions
  setSelectedConversationId: (id: string | null) => void;
  setSelectedMessageId: (id: string | null) => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSettingsOpen: (isOpen: boolean) => void;
  setChatLoading: (isLoading: boolean) => void;
  setStreaming: (isStreaming: boolean) => void;
  setInputMessage: (message: string) => void;
  setInputFiles: (files: File[]) => void;
  addInputFile: (file: File) => void;
  removeInputFile: (index: number) => void;
  clearInput: () => void;
  setViewMode: (mode: 'chat' | 'history' | 'settings') => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setStreamingMessageId: (id: string | null) => void;
  setStreamingContent: (content: string) => void;
  appendStreamingContent: (chunk: string) => void;
  clearStreaming: () => void;
  resetUIState: () => void;
}

export const useAIChatUIStore = create<AIChatUIState>()(
  persist(
    immer((set) => ({
      // Initial state
      selectedConversationId: null,
      selectedMessageId: null,
      isSidebarOpen: true,
      isSettingsOpen: false,
      isChatLoading: false,
        isStreaming: false,
      inputMessage: '',
      inputFiles: [],
      viewMode: 'chat',
      fontSize: 'medium',
      theme: 'auto',
        streamingMessageId: null,
        streamingContent: '',

      // Actions
      setSelectedConversationId: (id) => set((state) => { state.selectedConversationId = id; }),
      setSelectedMessageId: (id) => set((state) => { state.selectedMessageId = id; }),
      setSidebarOpen: (isOpen) => set((state) => { state.isSidebarOpen = isOpen; }),
      setSettingsOpen: (isOpen) => set((state) => { state.isSettingsOpen = isOpen; }),
      setChatLoading: (isLoading) => set((state) => { state.isChatLoading = isLoading; }),
      setStreaming: (isStreaming) => set((state) => { state.isStreaming = isStreaming; }),
      setInputMessage: (message) => set((state) => { state.inputMessage = message; }),
      setInputFiles: (files) => set((state) => { state.inputFiles = files; }),
      addInputFile: (file) => set((state) => { state.inputFiles.push(file); }),
      removeInputFile: (index) => set((state) => { state.inputFiles.splice(index, 1); }),
      clearInput: () => set((state) => {
        state.inputMessage = '';
        state.inputFiles = [];
      }),
      setViewMode: (mode) => set((state) => { state.viewMode = mode; }),
      setFontSize: (size) => set((state) => { state.fontSize = size; }),
      setTheme: (theme) => set((state) => { state.theme = theme; }),
      setStreamingMessageId: (id) => set((state) => { state.streamingMessageId = id; }),
      setStreamingContent: (content) => set((state) => { state.streamingContent = content; }),
      appendStreamingContent: (chunk) => set((state) => { state.streamingContent += chunk; }),
      clearStreaming: () => set((state) => {
            state.streamingMessageId = null;
            state.streamingContent = '';
            state.isStreaming = false;
      }),
      resetUIState: () => set((state) => {
        state.selectedConversationId = null;
            state.selectedMessageId = null;
        state.isSettingsOpen = false;
        state.isChatLoading = false;
        state.isStreaming = false;
        state.inputMessage = '';
        state.inputFiles = [];
            state.streamingMessageId = null;
            state.streamingContent = '';
        state.viewMode = 'chat';
      })
    })),
    {
      name: 'ai-chat-ui-storage',
      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen,
        fontSize: state.fontSize,
        theme: state.theme
      })
    }
  )
);
