import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

/**
 * Store Configuration
 * Centralized configuration for Zustand stores
 */

// Store configuration options
export interface StoreConfig {
  name: string;
  version: number;
  storage?: 'localStorage' | 'sessionStorage' | 'memory';
  devtools?: boolean;
  persist?: boolean;
  subscribeWithSelector?: boolean;
}

// Default store configuration
export const defaultStoreConfig: StoreConfig = {
  name: 'app-store',
  version: 1,
  storage: 'localStorage',
  devtools: {{module.parameters.devtools ?? true}},
  persist: {{module.parameters.persistence ?? true}},
  subscribeWithSelector: true,
};

// Create store with configuration
export function createConfiguredStore<T extends object>(
  config: Partial<StoreConfig> = {},
  storeCreator: (set: any, get: any) => T
) {
  const finalConfig = { ...defaultStoreConfig, ...config };
  
  let store = create<T>();
  
  // Apply middleware based on configuration
  if (finalConfig.persist) {
    store = store.pipe(
      persist(
        {
          name: finalConfig.name,
          version: finalConfig.version,
          storage: finalConfig.storage === 'localStorage' 
            ? localStorage 
            : finalConfig.storage === 'sessionStorage'
            ? sessionStorage
            : undefined,
        },
        storeCreator
      )
    );
  } else {
    store = store.pipe(storeCreator);
  }
  
  if (finalConfig.subscribeWithSelector) {
    store = store.pipe(subscribeWithSelector);
  }
  
  if (finalConfig.devtools && process.env.NODE_ENV === 'development') {
    store = store.pipe(devtools);
  }
  
  return store;
}

// Store factory for creating multiple stores
export class StoreFactory {
  private stores: Map<string, any> = new Map();
  
  createStore<T extends object>(
    name: string,
    config: Partial<StoreConfig> = {},
    storeCreator: (set: any, get: any) => T
  ) {
    if (this.stores.has(name)) {
      return this.stores.get(name);
    }
    
    const store = createConfiguredStore(config, storeCreator);
    this.stores.set(name, store);
    return store;
  }
  
  getStore(name: string) {
    return this.stores.get(name);
  }
  
  hasStore(name: string) {
    return this.stores.has(name);
  }
  
  clearStore(name: string) {
    this.stores.delete(name);
  }
  
  clearAllStores() {
    this.stores.clear();
  }
}

// Global store factory instance
export const storeFactory = new StoreFactory();
