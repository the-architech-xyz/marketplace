import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Query client configuration for different environments
export const createQueryClient = (options?: {
  staleTime?: number;
  gcTime?: number;
  retry?: number;
  refetchOnWindowFocus?: boolean;
}) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: options?.staleTime ?? 5 * 60 * 1000,
        gcTime: options?.gcTime ?? 10 * 60 * 1000,
        retry: options?.retry ?? 3,
        refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
      },
      mutations: {
        retry: 1,
      },
    },
  });
};
