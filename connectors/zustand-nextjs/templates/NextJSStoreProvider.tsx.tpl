/**
 * Next.js Store Provider
 * 
 * Enhanced store provider with Next.js-specific optimizations
 */

'use client';

import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useHydration, useStoreErrorBoundary } from './nextjs-utils';

interface NextJSStoreProviderProps {
  children: ReactNode;
  stores?: Record<string, any>;
  fallbackData?: Record<string, any>;
}

const NextJSStoreContext = createContext<{
  stores: Record<string, any>;
  isHydrated: boolean;
  isReady: boolean;
}>({
  stores: {},
  isHydrated: false,
  isReady: false,
});

export function NextJSStoreProvider({ 
  children, 
  stores = {},
  fallbackData = {}
}: NextJSStoreProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Mark as hydrated when component mounts (client-side)
    setIsHydrated(true);
    
    // Initialize stores with fallback data if provided
    Object.entries(fallbackData).forEach(([key, data]) => {
      if (stores[key]?.getState?.setState) {
        stores[key].getState().setState(data);
      }
    });

    // Mark as ready after a short delay
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [stores, fallbackData]);

  const value = {
    stores,
    isHydrated,
    isReady,
  };

  return (
    <NextJSStoreContext.Provider value={value}>
      {children}
    </NextJSStoreContext.Provider>
  );
}

// Hook to use Next.js store context
export function useNextJSStoreContext() {
  const context = useContext(NextJSStoreContext);
  
  if (!context) {
    throw new Error('useNextJSStoreContext must be used within a NextJSStoreProvider');
  }
  
  return context;
}

// Hook to use a specific store with Next.js optimizations
export function useNextJSStore<T, U>(
  storeKey: string,
  selector: (state: T) => U,
  fallback?: U
) {
  const { stores, isHydrated, isReady } = useNextJSStoreContext();
  const store = stores[storeKey];
  
  if (!store) {
    throw new Error(`Store with key "${storeKey}" not found`);
  }

  const [value, setValue] = useState<U | undefined>(fallback);

  useEffect(() => {
    if (!isHydrated || !isReady) return;

    const unsubscribe = store.subscribe((state: T) => {
      setValue(selector(state));
    });

    // Set initial value
    setValue(selector(store.getState()));

    return unsubscribe;
  }, [store, selector, isHydrated, isReady]);

  return value ?? fallback;
}

// Hook to check if stores are ready
export function useStoresReady() {
  const { isHydrated, isReady } = useNextJSStoreContext();
  return isHydrated && isReady;
}

export default NextJSStoreProvider;
