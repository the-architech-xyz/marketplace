/**
 * UI Store
 * 
 * UI-specific state management for themes, modals, notifications, etc.
 */

import { createStore } from '@/lib/stores/create-store';
import type { StoreConfig } from '@/lib/stores/store-types';

// UI store state interface
export interface UIState {
  // Theme state
  theme: 'light' | 'dark' | 'system';
  systemTheme: 'light' | 'dark';
  
  // Modal state
  modals: Record<string, boolean>;
  
  // Notification state
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
    timestamp: number;
  }>;
  
  // Loading state
  loading: Record<string, boolean>;
  
  // Sidebar state
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSystemTheme: (theme: 'light' | 'dark') => void;
  
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  toggleModal: (id: string) => void;
  closeAllModals: () => void;
  
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  setLoading: (key: string, loading: boolean) => void;
  clearLoading: (key: string) => void;
  clearAllLoading: () => void;
  
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  
  reset: () => void;
}

// UI store creator
const createUIStore = (): UIState => ({
  // Initial state
  theme: 'system',
  systemTheme: 'light',
  modals: {},
  notifications: [],
  loading: {},
  sidebarOpen: true,
  sidebarCollapsed: false,
  
  // Actions
  setTheme: (theme) => {
    // Implementation will be added by Zustand
  },
  
  setSystemTheme: (theme) => {
    // Implementation will be added by Zustand
  },
  
  openModal: (id) => {
    // Implementation will be added by Zustand
  },
  
  closeModal: (id) => {
    // Implementation will be added by Zustand
  },
  
  toggleModal: (id) => {
    // Implementation will be added by Zustand
  },
  
  closeAllModals: () => {
    // Implementation will be added by Zustand
  },
  
  addNotification: (notification) => {
    // Implementation will be added by Zustand
  },
  
  removeNotification: (id) => {
    // Implementation will be added by Zustand
  },
  
  clearNotifications: () => {
    // Implementation will be added by Zustand
  },
  
  setLoading: (key, loading) => {
    // Implementation will be added by Zustand
  },
  
  clearLoading: (key) => {
    // Implementation will be added by Zustand
  },
  
  clearAllLoading: () => {
    // Implementation will be added by Zustand
  },
  
  setSidebarOpen: (open) => {
    // Implementation will be added by Zustand
  },
  
  setSidebarCollapsed: (collapsed) => {
    // Implementation will be added by Zustand
  },
  
  toggleSidebar: () => {
    // Implementation will be added by Zustand
  },
  
  reset: () => {
    // Implementation will be added by Zustand
  },
});

// Store configuration
const storeConfig: StoreConfig = {
  name: 'ui-store',
  middleware: {
    persist: {
      name: 'ui-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
    devtools: {
      name: 'UI Store',
      enabled: process.env.NODE_ENV === 'development',
    },
    immer: <% if (module.parameters.hasImmer) { %>true<% } else { %>false<% } %>,
    subscribeWithSelector: true,
  },
};

// Create and export the store
export const useUIStore = createStore(createUIStore, storeConfig);

// Selectors for better performance
export const uiSelectors = {
  theme: (state: UIState) => state.theme,
  systemTheme: (state: UIState) => state.systemTheme,
  modals: (state: UIState) => state.modals,
  notifications: (state: UIState) => state.notifications,
  loading: (state: UIState) => state.loading,
  sidebarOpen: (state: UIState) => state.sidebarOpen,
  sidebarCollapsed: (state: UIState) => state.sidebarCollapsed,
  isModalOpen: (id: string) => (state: UIState) => state.modals[id] || false,
  isLoading: (key: string) => (state: UIState) => state.loading[key] || false,
};

// Actions for better organization
export const uiActions = {
  setTheme: (theme: 'light' | 'dark' | 'system') => useUIStore.getState().setTheme(theme),
  setSystemTheme: (theme: 'light' | 'dark') => useUIStore.getState().setSystemTheme(theme),
  openModal: (id: string) => useUIStore.getState().openModal(id),
  closeModal: (id: string) => useUIStore.getState().closeModal(id),
  toggleModal: (id: string) => useUIStore.getState().toggleModal(id),
  closeAllModals: () => useUIStore.getState().closeAllModals(),
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => 
    useUIStore.getState().addNotification(notification),
  removeNotification: (id: string) => useUIStore.getState().removeNotification(id),
  clearNotifications: () => useUIStore.getState().clearNotifications(),
  setLoading: (key: string, loading: boolean) => useUIStore.getState().setLoading(key, loading),
  clearLoading: (key: string) => useUIStore.getState().clearLoading(key),
  clearAllLoading: () => useUIStore.getState().clearAllLoading(),
  setSidebarOpen: (open: boolean) => useUIStore.getState().setSidebarOpen(open),
  setSidebarCollapsed: (collapsed: boolean) => useUIStore.getState().setSidebarCollapsed(collapsed),
  toggleSidebar: () => useUIStore.getState().toggleSidebar(),
  reset: () => useUIStore.getState().reset(),
};

export default useUIStore;
