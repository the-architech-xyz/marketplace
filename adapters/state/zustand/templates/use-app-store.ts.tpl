/**
 * App Store
 * 
 * Main application store with global state management
 */

import { createStore } from '@/lib/stores/create-store';
import type { StoreConfig } from '@/lib/stores/store-types';

// App store state interface
export interface AppState {
  // App metadata
  version: string;
  environment: 'development' | 'production' | 'test';
  
  // App status
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  
  // App settings
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  
  // App actions
  initialize: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  setTimezone: (timezone: string) => void;
  reset: () => void;
}

// App store creator
const createAppStore = (): AppState => ({
  // Initial state
  version: '1.0.0',
  environment: process.env.NODE_ENV as 'development' | 'production' | 'test',
  isInitialized: false,
  isLoading: false,
  error: null,
  theme: 'system',
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  
  // Actions
  initialize: () => {
    // Implementation will be added by Zustand
  },
  
  setLoading: (loading: boolean) => {
    // Implementation will be added by Zustand
  },
  
  setError: (error: string | null) => {
    // Implementation will be added by Zustand
  },
  
  setTheme: (theme: 'light' | 'dark' | 'system') => {
    // Implementation will be added by Zustand
  },
  
  setLanguage: (language: string) => {
    // Implementation will be added by Zustand
  },
  
  setTimezone: (timezone: string) => {
    // Implementation will be added by Zustand
  },
  
  reset: () => {
    // Implementation will be added by Zustand
  },
});

// Store configuration
const storeConfig: StoreConfig = {
  name: 'app-store',
  middleware: {
    persist: {
      name: 'app-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        timezone: state.timezone,
      }),
    },
    devtools: {
      name: 'App Store',
      enabled: process.env.NODE_ENV === 'development',
    },
    immer: {{#if context..immer}}true{{else}}false{{/if}},
    subscribeWithSelector: true,
  },
};

// Create and export the store
export const useAppStore = createStore(createAppStore, storeConfig);

// Selectors for better performance
export const appSelectors = {
  version: (state: AppState) => state.version,
  environment: (state: AppState) => state.environment,
  isInitialized: (state: AppState) => state.isInitialized,
  isLoading: (state: AppState) => state.isLoading,
  error: (state: AppState) => state.error,
  theme: (state: AppState) => state.theme,
  language: (state: AppState) => state.language,
  timezone: (state: AppState) => state.timezone,
};

// Actions for better organization
export const appActions = {
  initialize: () => useAppStore.getState().initialize(),
  setLoading: (loading: boolean) => useAppStore.getState().setLoading(loading),
  setError: (error: string | null) => useAppStore.getState().setError(error),
  setTheme: (theme: 'light' | 'dark' | 'system') => useAppStore.getState().setTheme(theme),
  setLanguage: (language: string) => useAppStore.getState().setLanguage(language),
  setTimezone: (timezone: string) => useAppStore.getState().setTimezone(timezone),
  reset: () => useAppStore.getState().reset(),
};

export default useAppStore;