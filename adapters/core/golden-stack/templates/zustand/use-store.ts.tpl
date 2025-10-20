/**
 * Store Hooks
 * 
 * Enhanced hooks for Zustand stores with better performance and type safety
 */

import { useCallback, useRef, useEffect } from 'react';
import { useStore as useZustandStore } from 'zustand';
import { shallow } from 'zustand/shallow';

// Enhanced store hook with shallow comparison
export function useStore<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  equalityFn?: (a: U, b: U) => boolean
): U {
  return useZustandStore(store, selector, equalityFn || shallow);
}

// Store hook with automatic selector memoization
export function useStoreSelector<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  deps: React.DependencyList = []
): U {
  const memoizedSelector = useCallback(selector, deps);
  return useZustandStore(store, memoizedSelector, shallow);
}

// Store hook with custom equality function
export function useStoreWithEquality<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  equalityFn: (a: U, b: U) => boolean
): U {
  return useZustandStore(store, selector, equalityFn);
}

// Store hook that returns the entire store
export function useStoreState<T>(store: () => T): T {
  return useZustandStore(store);
}

// Store hook for actions only
export function useStoreActions<T, U extends Record<string, (...args: any[]) => any>>(
  store: (selector: (state: T) => U) => U,
  actionsSelector: (state: T) => U
): U {
  return useZustandStore(store, actionsSelector, shallow);
}

// Store hook with subscription
export function useStoreSubscription<T>(
  store: any,
  selector: (state: T) => any,
  callback: (state: any) => void,
  deps: React.DependencyList = []
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const unsubscribe = store.subscribe(
      selector,
      (state: any) => callbackRef.current(state)
    );
    return unsubscribe;
  }, deps);
}

// Store hook with previous value
export function useStoreWithPrevious<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  equalityFn?: (a: U, b: U) => boolean
): { current: U; previous: U | undefined } {
  const current = useZustandStore(store, selector, equalityFn);
  const previousRef = useRef<U | undefined>(undefined);

  useEffect(() => {
    previousRef.current = current;
  });

  return { current, previous: previousRef.current };
}

// Store hook with loading state
export function useStoreWithLoading<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  loadingSelector: (state: T) => boolean
): { data: U; isLoading: boolean } {
  const data = useZustandStore(store, selector, shallow);
  const isLoading = useZustandStore(store, loadingSelector, shallow);

  return { data, isLoading };
}

// Store hook with error state
export function useStoreWithError<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  errorSelector: (state: T) => string | null
): { data: U; error: string | null } {
  const data = useZustandStore(store, selector, shallow);
  const error = useZustandStore(store, errorSelector, shallow);

  return { data, error };
}

// Store hook with both loading and error states
export function useStoreWithStatus<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  loadingSelector: (state: T) => boolean,
  errorSelector: (state: T) => string | null
): { data: U; isLoading: boolean; error: string | null } {
  const data = useZustandStore(store, selector, shallow);
  const isLoading = useZustandStore(store, loadingSelector, shallow);
  const error = useZustandStore(store, errorSelector, shallow);

  return { data, isLoading, error };
}

// Store hook for debugging
export function useStoreDebug<T>(
  store: () => T,
  name: string = 'Store'
) {
  const state = useZustandStore(store);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${name}] State:`, state);
    }
  }, [state, name]);

  return state;
}

// Store hook with persistence
export function useStoreWithPersistence<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  persistenceKey: string
): U {
  const data = useZustandStore(store, selector, shallow);

  useEffect(() => {
    // Save to localStorage on change
    localStorage.setItem(persistenceKey, JSON.stringify(data));
  }, [data, persistenceKey]);

  return data;
}

// Store hook with validation
export function useStoreWithValidation<T, U>(
  store: (selector: (state: T) => U) => U,
  selector: (state: T) => U,
  validator: (data: U) => boolean
): { data: U; isValid: boolean } {
  const data = useZustandStore(store, selector, shallow);
  const isValid = validator(data);

  return { data, isValid };
}
