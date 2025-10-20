/**
 * Store Provider
 * 
 * Provider component for Zustand stores
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useAppStore } from './use-app-store';
import { useUIStore } from './use-ui-store';
import { useAuthStore } from './use-auth-store';

// Store context interface
interface StoreContextValue {
  appStore: ReturnType<typeof useAppStore>;
  uiStore: ReturnType<typeof useUIStore>;
  authStore: ReturnType<typeof useAuthStore>;
}

// Create store context
const StoreContext = createContext<StoreContextValue | null>(null);

// Store provider props
interface StoreProviderProps {
  children: ReactNode;
}

// Store provider component
export function StoreProvider({ children }: StoreProviderProps) {
  const appStore = useAppStore();
  const uiStore = useUIStore();
  const authStore = useAuthStore();

  const value: StoreContextValue = {
    appStore,
    uiStore,
    authStore,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

// Hook to use store context
export function useStoreContext(): StoreContextValue {
  const context = useContext(StoreContext);
  
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  
  return context;
}

// Individual store hooks
export function useAppStoreContext() {
  const { appStore } = useStoreContext();
  return appStore;
}

export function useUIStoreContext() {
  const { uiStore } = useStoreContext();
  return uiStore;
}

export function useAuthStoreContext() {
  const { authStore } = useStoreContext();
  return authStore;
}

// Store initialization hook
export function useStoreInitialization() {
  const { appStore, authStore } = useStoreContext();

  React.useEffect(() => {
    // Initialize app store
    appStore.initialize();
    
    // Check for existing auth session
    if (authStore.session.token && authStore.session.expiresAt) {
      const isExpired = Date.now() >= authStore.session.expiresAt;
      if (!isExpired) {
        authStore.setUser(authStore.user);
        authStore.setSession(authStore.session);
      } else {
        authStore.clearSession();
      }
    }
  }, [appStore, authStore]);
}

// Store reset hook
export function useStoreReset() {
  const { appStore, uiStore, authStore } = useStoreContext();

  const resetAllStores = React.useCallback(() => {
    appStore.reset();
    uiStore.reset();
    authStore.reset();
  }, [appStore, uiStore, authStore]);

  return { resetAllStores };
}

// Store debug hook
export function useStoreDebug() {
  const { appStore, uiStore, authStore } = useStoreContext();

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('App Store:', appStore);
      console.log('UI Store:', uiStore);
      console.log('Auth Store:', authStore);
    }
  }, [appStore, uiStore, authStore]);
}

export default StoreProvider;
