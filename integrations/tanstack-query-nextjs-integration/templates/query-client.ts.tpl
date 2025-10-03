import { QueryClient, DefaultOptions } from '@tanstack/react-query';

// Default query options
const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: {{module.parameters.defaultOptions?.staleTime || 5 * 60 * 1000}},
    cacheTime: {{module.parameters.defaultOptions?.cacheTime || 10 * 60 * 1000}},
    retry: {{module.parameters.defaultOptions?.retry || 3}},
    refetchOnWindowFocus: {{module.parameters.defaultOptions?.refetchOnWindowFocus || false}},
    refetchOnMount: true,
    refetchOnReconnect: true,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  mutations: {
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
};

// Create QueryClient instance
export function createQueryClient(options?: Partial<DefaultOptions>) {
  return new QueryClient({
    defaultOptions: {
      ...defaultOptions,
      ...options,
    },
  });
}

// Global QueryClient instance
let queryClient: QueryClient | undefined;

// Get or create QueryClient instance
export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server-side: always create a new instance
    return createQueryClient();
  }
  
  // Client-side: reuse existing instance
  if (!queryClient) {
    queryClient = createQueryClient();
  }
  
  return queryClient;
}

// Reset QueryClient (useful for testing)
export function resetQueryClient() {
  queryClient = undefined;
}

// QueryClient configuration for different environments
export const queryClientConfig = {
  development: {
    queries: {
      staleTime: 0, // Always refetch in development
      cacheTime: 0,
    },
  },
  production: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
  test: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
};

// Get QueryClient for specific environment
export function getQueryClientForEnvironment(env: 'development' | 'production' | 'test' = 'production') {
  return createQueryClient(queryClientConfig[env]);
}
