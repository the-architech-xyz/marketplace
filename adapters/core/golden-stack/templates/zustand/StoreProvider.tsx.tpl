/**
 * Store Provider
 * 
 * Provider component for Zustand stores
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useAppStore } from '@/stores/use-app-store';
import { useUIStore } from '@/stores/use-ui-store';

// Store context interface
interface StoreContextValue {
  appStore: ReturnType<typeof useAppStore>;
  uiStore: ReturnType<typeof useUIStore>;
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

  const value: StoreContextValue = {
    appStore,
    uiStore,
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

// Store initialization hook
export function useStoreInitialization() {
  const { appStore } = useStoreContext();

  React.useEffect(() => {
    // Initialize app store
    appStore.initialize();
  }, [appStore]);
}

// Store reset hook
export function useStoreReset() {
  const { appStore, uiStore } = useStoreContext();

  const resetAllStores = React.useCallback(() => {
    appStore.reset();
    uiStore.reset();
  }, [appStore, uiStore]);

  return { resetAllStores };
}

// Store debug hook
export function useStoreDebug() {
  const { appStore, uiStore } = useStoreContext();

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('App Store:', appStore);
      console.log('UI Store:', uiStore);
    }
  }, [appStore, uiStore]);
}

export default StoreProvider;
