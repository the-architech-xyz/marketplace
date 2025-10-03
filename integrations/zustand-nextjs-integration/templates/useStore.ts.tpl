import { useStore as useZustandStore } from 'zustand';
import { useCallback, useMemo } from 'react';

/**
 * Enhanced useStore hook for Zustand
 * Provides additional utilities and type safety
 */

// Generic store hook
export function useStore<T>(
  store: any,
  selector?: (state: T) => any
) {
  const selectedState = useZustandStore(store, selector);
  return selectedState;
}

// Store selector hook
export function useStoreSelector<T, R>(
  store: any,
  selector: (state: T) => R
) {
  return useZustandStore(store, selector);
}

// Store actions hook
export function useStoreActions<T>(
  store: any,
  actions: (state: T) => any
) {
  return useZustandStore(store, actions);
}

// Store state hook
export function useStoreState<T>(
  store: any,
  selector?: (state: T) => any
) {
  const state = useZustandStore(store, selector);
  const actions = useZustandStore(store, (state: T) => {
    const { ...stateWithoutActions } = state as any;
    return stateWithoutActions;
  });

  return { state, actions };
}

// Store subscription hook
export function useStoreSubscription<T>(
  store: any,
  selector: (state: T) => any,
  callback: (selectedState: any) => void
) {
  const selectedState = useZustandStore(store, selector);

  useEffect(() => {
    callback(selectedState);
  }, [selectedState, callback]);
}

// Store persistence hook
export function useStorePersistence<T>(
  store: any,
  options: {
    onRehydrate?: (state: T) => void;
    onError?: (error: Error) => void;
  } = {}
) {
  const [isRehydrated, setIsRehydrated] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = store.subscribe(
      (state: T) => {
        if (state && !isRehydrated) {
          setIsRehydrated(true);
          options.onRehydrate?.(state);
        }
      },
      (error: Error) => {
        setHasError(true);
        setError(error);
        options.onError?.(error);
      }
    );

    return unsubscribe;
  }, [store, isRehydrated, options]);

  return { isRehydrated, hasError, error };
}

// Store devtools hook
export function useStoreDevtools<T>(
  store: any,
  name: string
) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // DevTools integration would go here
      console.log(`Store ${name} initialized:`, store.getState());
    }
  }, [store, name]);
}

// Store middleware hook
export function useStoreMiddleware<T>(
  store: any,
  middleware: (state: T) => T
) {
  const [middlewareState, setMiddlewareState] = useState<T | null>(null);

  useEffect(() => {
    const unsubscribe = store.subscribe((state: T) => {
      const processedState = middleware(state);
      setMiddlewareState(processedState);
    });

    return unsubscribe;
  }, [store, middleware]);

  return middlewareState;
}
