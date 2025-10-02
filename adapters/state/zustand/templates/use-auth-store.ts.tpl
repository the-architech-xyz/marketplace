/**
 * Auth Store
 * 
 * Authentication state management
 */

import { createStore } from '@/lib/stores/create-store';
import type { StoreConfig } from '@/lib/stores/store-types';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

// Auth store state interface
export interface AuthState {
  // Auth status
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // User data
  user: User | null;
  
  // Session data
  session: {
    token: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
  };
  
  // Auth actions
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (userData: { email: string; password: string; name: string }) => Promise<void>;
  refreshToken: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (currentPassword: string; newPassword: string) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  
  // User actions
  setUser: (user: User | null) => void;
  updateUser: (userData: Partial<User>) => void;
  
  // Session actions
  setSession: (session: AuthState['session']) => void;
  clearSession: () => void;
  
  // Error handling
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Loading state
  setLoading: (loading: boolean) => void;
  
  // Reset
  reset: () => void;
}

// Auth store creator
const createAuthStore = (): AuthState => ({
  // Initial state
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
  session: {
    token: null,
    refreshToken: null,
    expiresAt: null,
  },
  
  // Actions
  login: async (credentials) => {
    // Implementation will be added by Zustand
  },
  
  logout: () => {
    // Implementation will be added by Zustand
  },
  
  register: async (userData) => {
    // Implementation will be added by Zustand
  },
  
  refreshToken: async () => {
    // Implementation will be added by Zustand
  },
  
  resetPassword: async (email) => {
    // Implementation will be added by Zustand
  },
  
  updatePassword: async (currentPassword, newPassword) => {
    // Implementation will be added by Zustand
  },
  
  updateProfile: async (profileData) => {
    // Implementation will be added by Zustand
  },
  
  setUser: (user) => {
    // Implementation will be added by Zustand
  },
  
  updateUser: (userData) => {
    // Implementation will be added by Zustand
  },
  
  setSession: (session) => {
    // Implementation will be added by Zustand
  },
  
  clearSession: () => {
    // Implementation will be added by Zustand
  },
  
  setError: (error) => {
    // Implementation will be added by Zustand
  },
  
  clearError: () => {
    // Implementation will be added by Zustand
  },
  
  setLoading: (loading) => {
    // Implementation will be added by Zustand
  },
  
  reset: () => {
    // Implementation will be added by Zustand
  },
});

// Store configuration
const storeConfig: StoreConfig = {
  name: 'auth-store',
  middleware: {
    persist: {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    },
    devtools: {
      name: 'Auth Store',
      enabled: process.env.NODE_ENV === 'development',
    },
    immer: {{#if module.parameters.immer}}true{{else}}false{{/if}},
    subscribeWithSelector: true,
  },
};

// Create and export the store
export const useAuthStore = createStore(createAuthStore, storeConfig);

// Selectors for better performance
export const authSelectors = {
  isAuthenticated: (state: AuthState) => state.isAuthenticated,
  isLoading: (state: AuthState) => state.isLoading,
  error: (state: AuthState) => state.error,
  user: (state: AuthState) => state.user,
  session: (state: AuthState) => state.session,
  hasPermission: (permission: string) => (state: AuthState) => 
    state.user?.permissions.includes(permission) || false,
  hasRole: (role: string) => (state: AuthState) => 
    state.user?.role === role || false,
  isSessionValid: (state: AuthState) => {
    if (!state.session.expiresAt) return false;
    return Date.now() < state.session.expiresAt;
  },
};

// Actions for better organization
export const authActions = {
  login: (credentials: { email: string; password: string }) => 
    useAuthStore.getState().login(credentials),
  logout: () => useAuthStore.getState().logout(),
  register: (userData: { email: string; password: string; name: string }) => 
    useAuthStore.getState().register(userData),
  refreshToken: () => useAuthStore.getState().refreshToken(),
  resetPassword: (email: string) => useAuthStore.getState().resetPassword(email),
  updatePassword: (currentPassword: string, newPassword: string) => 
    useAuthStore.getState().updatePassword(currentPassword, newPassword),
  updateProfile: (profileData: Partial<User>) => 
    useAuthStore.getState().updateProfile(profileData),
  setUser: (user: User | null) => useAuthStore.getState().setUser(user),
  updateUser: (userData: Partial<User>) => useAuthStore.getState().updateUser(userData),
  setSession: (session: AuthState['session']) => useAuthStore.getState().setSession(session),
  clearSession: () => useAuthStore.getState().clearSession(),
  setError: (error: string | null) => useAuthStore.getState().setError(error),
  clearError: () => useAuthStore.getState().clearError(),
  setLoading: (loading: boolean) => useAuthStore.getState().setLoading(loading),
  reset: () => useAuthStore.getState().reset(),
};

export default useAuthStore;
