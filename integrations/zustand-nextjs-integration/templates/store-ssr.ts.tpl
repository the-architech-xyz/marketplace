import { StoreApi } from 'zustand';

/**
 * SSR utilities for Zustand stores
 * Provides server-side rendering support for Zustand
 */

// SSR store state
export interface SSRStoreState {
  [key: string]: any;
}

// SSR store manager
export class SSRStoreManager {
  private stores: Map<string, StoreApi<any>> = new Map();
  private initialState: Map<string, any> = new Map();

  // Register a store for SSR
  registerStore<T>(name: string, store: StoreApi<T>) {
    this.stores.set(name, store);
    this.initialState.set(name, store.getState());
  }

  // Get store state for SSR
  getStoreState(name: string) {
    const store = this.stores.get(name);
    if (!store) {
      throw new Error(`Store ${name} not found`);
    }
    return store.getState();
  }

  // Get all store states for SSR
  getAllStoreStates(): Record<string, any> {
    const states: Record<string, any> = {};
    for (const [name, store] of this.stores) {
      states[name] = store.getState();
    }
    return states;
  }

  // Hydrate store from SSR state
  hydrateStore(name: string, state: any) {
    const store = this.stores.get(name);
    if (!store) {
      throw new Error(`Store ${name} not found`);
    }
    store.setState(state);
  }

  // Hydrate all stores from SSR state
  hydrateAllStores(states: Record<string, any>) {
    for (const [name, state] of Object.entries(states)) {
      this.hydrateStore(name, state);
    }
  }

  // Reset store to initial state
  resetStore(name: string) {
    const store = this.stores.get(name);
    const initialState = this.initialState.get(name);
    if (store && initialState) {
      store.setState(initialState);
    }
  }

  // Reset all stores to initial state
  resetAllStores() {
    for (const [name] of this.stores) {
      this.resetStore(name);
    }
  }

  // Clear all stores
  clear() {
    this.stores.clear();
    this.initialState.clear();
  }
}

// Global SSR store manager
export const ssrStoreManager = new SSRStoreManager();

// SSR store wrapper
export function createSSRStore<T extends object>(
  name: string,
  storeCreator: (set: any, get: any) => T
) {
  const store = storeCreator(
    (partial) => store.setState(partial),
    () => store.getState()
  );

  // Register for SSR
  ssrStoreManager.registerStore(name, store);

  return store;
}

// SSR hydration hook
export function useSSRHydration(storeName: string) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
