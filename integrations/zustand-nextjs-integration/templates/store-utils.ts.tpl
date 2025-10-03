import { StoreApi } from 'zustand';

/**
 * Store utilities for Zustand
 * Provides common utilities for working with Zustand stores
 */

// Store state type
export type StoreState = Record<string, any>;

// Store utilities class
export class StoreUtils {
  // Get store state
  static getState<T>(store: StoreApi<T>): T {
    return store.getState();
  }

  // Set store state
  static setState<T>(store: StoreApi<T>, state: Partial<T>): void {
    store.setState(state);
  }

  // Update store state
  static updateState<T>(store: StoreApi<T>, updater: (state: T) => Partial<T>): void {
    const currentState = store.getState();
    const newState = updater(currentState);
    store.setState(newState);
  }

  // Reset store state
  static resetState<T>(store: StoreApi<T>, initialState: T): void {
    store.setState(initialState);
  }

  // Subscribe to store changes
  static subscribe<T>(
    store: StoreApi<T>,
    callback: (state: T, prevState: T) => void
  ): () => void {
    return store.subscribe(callback);
  }

  // Subscribe to specific state changes
  static subscribeToState<T, R>(
    store: StoreApi<T>,
    selector: (state: T) => R,
    callback: (selectedState: R, prevSelectedState: R) => void
  ): () => void {
    let prevSelectedState: R;
    
    return store.subscribe((state: T) => {
      const selectedState = selector(state);
      if (selectedState !== prevSelectedState) {
        callback(selectedState, prevSelectedState);
        prevSelectedState = selectedState;
      }
    });
  }

  // Batch state updates
  static batchUpdate<T>(
    store: StoreApi<T>,
    updates: Array<(state: T) => Partial<T>>
  ): void {
    const currentState = store.getState();
    let newState = { ...currentState };

    for (const update of updates) {
      newState = { ...newState, ...update(currentState) };
    }

    store.setState(newState);
  }

  // Deep merge state
  static deepMergeState<T>(
    store: StoreApi<T>,
    newState: Partial<T>
  ): void {
    const currentState = store.getState();
    const mergedState = this.deepMerge(currentState, newState);
    store.setState(mergedState);
  }

  // Deep merge utility
  private static deepMerge(target: any, source: any): any {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }

  // Store persistence
  static persistStore<T>(
    store: StoreApi<T>,
    key: string,
    storage: Storage = localStorage
  ): () => void {
    // Load initial state
    const savedState = storage.getItem(key);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        store.setState(parsedState);
      } catch (error) {
        console.error('Failed to load persisted state:', error);
      }
    }

    // Subscribe to changes
    return store.subscribe((state: T) => {
      try {
        storage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to persist state:', error);
      }
    });
  }

  // Store hydration
  static hydrateStore<T>(
    store: StoreApi<T>,
    state: T
  ): void {
    store.setState(state);
  }

  // Store serialization
  static serializeStore<T>(store: StoreApi<T>): string {
    return JSON.stringify(store.getState());
  }

  // Store deserialization
  static deserializeStore<T>(
    store: StoreApi<T>,
    serializedState: string
  ): void {
    try {
      const state = JSON.parse(serializedState);
      store.setState(state);
    } catch (error) {
      console.error('Failed to deserialize state:', error);
    }
  }
}
