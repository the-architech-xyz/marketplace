import { persist, createJSONStorage } from 'zustand/middleware';
import { StateStorage } from 'zustand/middleware';

// Custom storage implementations
export const createLocalStorage = (): StateStorage => ({
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
});

export const createSessionStorage = (): StateStorage => ({
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(name);
  },
});

// Persistence configuration
export const persistenceConfig = {
  localStorage: createJSONStorage(() => createLocalStorage()),
  sessionStorage: createJSONStorage(() => createSessionStorage()),
};

// Persistence utilities
export function createPersistedStore<T extends object>(
  storeFn: (set: any, get: any) => T,
  options: {
    name: string;
    storage?: 'localStorage' | 'sessionStorage';
    partialize?: (state: T) => Partial<T>;
  }
) {
  const { name, storage = 'localStorage', partialize } = options;
  
  return persist(
    storeFn,
    {
      name,
      storage: persistenceConfig[storage],
      partialize,
    }
  );
}

// Hydration utilities for SSR
export function createHydrationStore<T extends object>(
  storeFn: (set: any, get: any) => T,
  options: {
    name: string;
    storage?: 'localStorage' | 'sessionStorage';
    partialize?: (state: T) => Partial<T>;
  }
) {
  const persistedStore = createPersistedStore(storeFn, options);
  
  return {
    ...persistedStore,
    hydrate: () => {
      if (typeof window !== 'undefined') {
        persistedStore.persist.rehydrate();
      }
    },
  };
}
