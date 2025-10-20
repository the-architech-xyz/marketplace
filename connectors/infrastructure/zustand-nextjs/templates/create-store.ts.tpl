import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface StoreConfig {
  name: string;
  persist?: boolean;
  devtools?: boolean;
  immer?: boolean;
}

export function createAppStore<T extends object>(
  storeFn: (set: any, get: any) => T,
  config: StoreConfig = { name: 'app-store' }
) {
  const { name, persist: enablePersistence = false, devtools: enableDevtools = false, immer: enableImmer = false } = config;

  let store = create<T>();

  // Apply immer middleware if enabled
  if (enableImmer) {
    store = store(immer(storeFn));
  } else {
    store = store(storeFn);
  }

  // Apply persistence middleware if enabled
  if (enablePersistence) {
    store = store(
      persist(
        store,
        {
          name: `${name}-storage`,
          partialize: (state) => {
            // Only persist specific parts of the state
            const { ...persistedState } = state as any;
            return persistedState;
          },
        }
      )
    );
  }

  // Apply devtools middleware if enabled
  if (enableDevtools) {
    store = store(devtools({ name }));
  }

  return store;
}

// Type-safe store creator
export function createTypedStore<T extends object>(
  storeFn: (set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void, get: () => T) => T,
  config?: StoreConfig
) {
  return createAppStore(storeFn, config);
}
