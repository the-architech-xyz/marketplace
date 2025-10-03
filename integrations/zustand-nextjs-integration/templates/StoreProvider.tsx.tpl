'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';
import { createStore } from '@/lib/store-config';

// Store context type
interface StoreContextValue {
  store: UseBoundStore<StoreApi<any>>;
  isHydrated: boolean;
}

// Create store context
const StoreContext = createContext<StoreContextValue | null>(null);

// Store provider props
interface StoreProviderProps {
  children: React.ReactNode;
  store?: UseBoundStore<StoreApi<any>>;
}

export function StoreProvider({ children, store: providedStore }: StoreProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [store] = useState(() => providedStore || createStore());

  // Handle hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHydrated(true);
    }
  }, []);

  const value: StoreContextValue = {
    store,
    isHydrated,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

// Hook to use store
export function useStore<T>(
  selector?: (state: any) => T
): T extends undefined ? any : T {
  const context = useContext(StoreContext);
  
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  const { store, isHydrated } = context;

  // Use selector if provided, otherwise return the entire store
  const selectedState = selector ? store(selector) : store();

  // Return undefined during SSR if not hydrated
  if (!isHydrated && typeof window === 'undefined') {
    return selector ? undefined : {};
  }

  return selectedState;
}

// Hook to get store instance
export function useStoreApi() {
  const context = useContext(StoreContext);
  
  if (!context) {
    throw new Error('useStoreApi must be used within a StoreProvider');
  }

  return context.store;
}

// Hook to check if store is hydrated
export function useIsHydrated() {
  const context = useContext(StoreContext);
  
  if (!context) {
    throw new Error('useIsHydrated must be used within a StoreProvider');
  }

  return context.isHydrated;
}
