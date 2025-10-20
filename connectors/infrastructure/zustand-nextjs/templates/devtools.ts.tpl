import { devtools } from 'zustand/middleware';

// DevTools configuration
export const devtoolsConfig = {
  enabled: process.env.NODE_ENV === 'development',
  name: 'App Store',
  trace: true,
  traceLimit: 25,
};

// DevTools wrapper
export function withDevtools<T extends object>(
  storeFn: (set: any, get: any) => T,
  options: {
    name?: string;
    trace?: boolean;
    traceLimit?: number;
  } = {}
) {
  const { name = devtoolsConfig.name, trace = devtoolsConfig.trace, traceLimit = devtoolsConfig.traceLimit } = options;
  
  if (!devtoolsConfig.enabled) {
    return storeFn;
  }

  return devtools(storeFn, {
    name,
    trace,
    traceLimit,
  });
}

// Development-only store creator
export function createDevStore<T extends object>(
  storeFn: (set: any, get: any) => T,
  options?: {
    name?: string;
    trace?: boolean;
    traceLimit?: number;
  }
) {
  if (process.env.NODE_ENV === 'development') {
    return withDevtools(storeFn, options);
  }
  
  return storeFn;
}

// Store debugging utilities
export function createStoreLogger<T extends object>(
  storeName: string,
  store: T
) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${storeName}] Store created:`, store);
    
    // Log state changes
    const originalSet = (store as any).setState;
    if (originalSet) {
      (store as any).setState = (...args: any[]) => {
        console.log(`[${storeName}] State change:`, args);
        return originalSet(...args);
      };
    }
  }
  
  return store;
}
