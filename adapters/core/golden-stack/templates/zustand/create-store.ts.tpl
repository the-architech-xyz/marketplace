/**
 * Store Creation Utilities
 * 
 * Golden Core utilities for creating type-safe Zustand stores with Next.js optimizations
 */

import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useState, useEffect } from 'react';
import type { StateCreator } from 'zustand';

// Store configuration options
export interface StoreConfig {
  name: string;
  persist?: boolean;
  devtools?: boolean;
  immer?: boolean;
  subscribeWithSelector?: boolean;
  ssr?: boolean; // Next.js SSR support
  hydration?: boolean; // Next.js hydration support
}

// Enhanced store creator with middleware and Next.js optimizations
export function createStore<T>(
  storeCreator: StateCreator<T, [], [], T>,
  config: StoreConfig = { name: 'store' }
) {
  let store = storeCreator;

  // Apply middleware in order
  if (config.immer) {
    store = immer(store) as StateCreator<T, [], [], T>;
  }

  if (config.subscribeWithSelector) {
    store = subscribeWithSelector(store) as StateCreator<T, [], [], T>;
  }

  if (config.persist) {
    store = persist(store, {
      name: config.name,
      partialize: (state) => state, // Override in specific stores
      // Next.js SSR optimization: skip persistence on server
      skipHydration: typeof window === 'undefined',
    }) as StateCreator<T, [], [], T>;
  }

  if (config.devtools) {
    store = devtools(store, {
      name: config.name,
      // Only enable devtools in development and client-side
      enabled: process.env.NODE_ENV === 'development' && typeof window !== 'undefined',
    }) as StateCreator<T, [], [], T>;
  }

  return create(store);
}

// Store slice creator for modular stores
export function createSlice<T, U>(
  sliceCreator: StateCreator<T, [], [], U>
): StateCreator<T, [], [], U> {
  return sliceCreator;
}

// Store selector creator for performance
export function createSelector<T, U>(
  selector: (state: T) => U
): (state: T) => U {
  return selector;
}

// Store action creator
export function createAction<T, U extends (...args: any[]) => void>(
  action: (set: (partial: Partial<T>) => void, get: () => T) => U
): (set: (partial: Partial<T>) => void, get: () => T) => U {
  return action;
}

// Store subscription utilities
export function createSubscription<T>(
  store: any,
  selector: (state: T) => any,
  callback: (state: any) => void
) {
  return store.subscribe(selector, callback);
}

// Store persistence utilities
export function createPersistence<T>(
  store: any,
  key: string,
  options?: {
    storage?: Storage;
    partialize?: (state: T) => Partial<T>;
    onRehydrateStorage?: () => void;
  }
) {
  return persist(store, {
    name: key,
    // Next.js SSR optimization
    skipHydration: typeof window === 'undefined',
    ...options,
  });
}

// Next.js SSR-safe store creator
export function createSSRStore<T>(
  storeCreator: StateCreator<T, [], [], T>,
  config: StoreConfig = { name: 'ssr-store' }
) {
  // Only create store on client-side for SSR safety
  if (typeof window === 'undefined') {
    return null as any;
  }
  
  return createStore(storeCreator, {
    ...config,
    ssr: true,
    hydration: true,
  });
}

// Next.js hydration utilities
export function useHydration<T>(store: any) {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsHydrated(true);
    }
  }, []);
  
  return isHydrated;
}
