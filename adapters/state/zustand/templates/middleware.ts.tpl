import { StateStorage } from 'zustand/middleware';

/**
 * Zustand middleware utilities
 */

/**
 * Logger middleware for debugging state changes
 */
export const logger = <T>(config: any) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      console.log('  applying', args);
      set(...args);
      console.log('  new state', get());
    },
    get,
    api
  );

/**
 * Devtools middleware for Redux DevTools integration
 */
export const devtools = <T>(config: any, name?: string) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      set(...args);
      if (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
        (window as any).__REDUX_DEVTOOLS_EXTENSION__.send(
          { type: args[0]?.type || 'unknown', args: args[0] },
          get()
        );
      }
    },
    get,
    api
  );

/**
 * Immer middleware for immutable updates
 */
export const immer = <T>(config: any) => (set: any, get: any, api: any) =>
  config(
    (fn: any) => set((state: T) => {
      const draft = JSON.parse(JSON.stringify(state));
      fn(draft);
      return draft;
    }),
    get,
    api
  );

/**
 * SubscribeWithSelector middleware for fine-grained subscriptions
 */
export const subscribeWithSelector = <T>(config: any) => (set: any, get: any, api: any) => {
  const store = config(set, get, api);
  
  const subscribe = (listener: any, selector?: any, equalityFn?: any) => {
    if (selector) {
      let previousValue = selector(get());
      return api.subscribe((state: T) => {
        const newValue = selector(state);
        if (equalityFn ? !equalityFn(previousValue, newValue) : previousValue !== newValue) {
          const unsubscribe = listener(newValue, previousValue);
          previousValue = newValue;
          return unsubscribe;
        }
      });
    }
    return api.subscribe(listener);
  };
  
  return {
    ...store,
    subscribe,
  };
};

/**
 * Undo/Redo middleware
 */
export const undoRedo = <T>(config: any, options: { maxHistorySize?: number } = {}) => (set: any, get: any, api: any) => {
  const { maxHistorySize = 50 } = options;
  let history: T[] = [get()];
  let historyIndex = 0;

  const store = config(
    (...args: any[]) => {
      set(...args);
      const newState = get();
      
      // Add to history
      history = history.slice(0, historyIndex + 1);
      history.push(JSON.parse(JSON.stringify(newState)));
      
      // Limit history size
      if (history.length > maxHistorySize) {
        history = history.slice(-maxHistorySize);
        historyIndex = history.length - 1;
      } else {
        historyIndex++;
      }
    },
    get,
    api
  );

  const undo = () => {
    if (historyIndex > 0) {
      historyIndex--;
      set(history[historyIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      set(history[historyIndex]);
    }
  };

  const canUndo = () => historyIndex > 0;
  const canRedo = () => historyIndex < history.length - 1;

  return {
    ...store,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};

/**
 * Throttle middleware to limit state updates
 */
export const throttle = <T>(config: any, delay: number = 100) => (set: any, get: any, api: any) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let pendingUpdate: any = null;

  const throttledSet = (...args: any[]) => {
    pendingUpdate = args;
    
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        if (pendingUpdate) {
          set(...pendingUpdate);
          pendingUpdate = null;
        }
        timeoutId = null;
      }, delay);
    }
  };

  return config(throttledSet, get, api);
};

/**
 * Debounce middleware to delay state updates
 */
export const debounce = <T>(config: any, delay: number = 300) => (set: any, get: any, api: any) => {
  let timeoutId: NodeJS.Timeout | null = null;

  const debouncedSet = (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      set(...args);
      timeoutId = null;
    }, delay);
  };

  return config(debouncedSet, get, api);
};

/**
 * Combine multiple middleware
 */
export const combine = (...middlewares: any[]) => (config: any) => 
  middlewares.reduceRight((acc, middleware) => middleware(acc), config);

/**
 * Type-safe middleware factory
 */
export function createMiddleware<T>() {
  return {
    logger: (config: any) => logger<T>(config),
    devtools: (config: any, name?: string) => devtools<T>(config, name),
    immer: (config: any) => immer<T>(config),
    subscribeWithSelector: (config: any) => subscribeWithSelector<T>(config),
    undoRedo: (config: any, options?: { maxHistorySize?: number }) => undoRedo<T>(config, options),
    throttle: (config: any, delay?: number) => throttle<T>(config, delay),
    debounce: (config: any, delay?: number) => debounce<T>(config, delay),
    combine: (...middlewares: any[]) => combine(...middlewares),
  };
}
