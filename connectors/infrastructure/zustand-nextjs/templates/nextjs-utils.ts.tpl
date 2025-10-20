/**
 * Next.js Zustand Utilities
 * 
 * Next.js-specific utilities for Zustand state management
 */

import { createStore, createSSRStore, useHydration } from './create-store';
import { useEffect, useState } from 'react';

// Next.js SSR-safe store hook
export function useSSRStore<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  fallback?: U
) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [ssrValue, setSSRValue] = useState<U | undefined>(fallback);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Return fallback value during SSR
  if (!isHydrated) {
    return ssrValue as U;
  }

  // Return actual store value after hydration
  return store(selector);
}

// Next.js store initialization hook
export function useStoreInitialization<T>(
  store: any,
  initialData?: Partial<T>
) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (initialData) {
      store.getState().setState?.(initialData);
    }
    setIsInitialized(true);
  }, [store, initialData]);

  return isInitialized;
}

// Next.js store hydration status hook
export function useStoreHydrationStatus(store: any) {
  const isHydrated = useHydration(store);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isHydrated) {
      // Wait for store to be ready
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isHydrated]);

  return { isHydrated, isReady };
}

// Next.js store error boundary hook
export function useStoreErrorBoundary(store: any) {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(
      (state: any) => {
        if (state.error) {
          setError(state.error);
        } else {
          setError(null);
        }
      }
    );

    return unsubscribe;
  }, [store]);

  return { error, clearError: () => setError(null) };
}
