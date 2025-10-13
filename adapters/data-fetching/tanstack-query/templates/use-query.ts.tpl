import { useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';

// Standard query hook with enhanced error handling
export function useStandardQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options,
  });
}

// Query with automatic retry and error handling
export function useRobustQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error instanceof Error && 'status' in error && 
          typeof error.status === 'number' && error.status >= 400 && error.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
}

// Query with background refetch
export function useBackgroundQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  refetchInterval?: number,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    refetchInterval: refetchInterval || 5 * 60 * 1000, // 5 minutes default
    refetchIntervalInBackground: true,
    ...options,
  });
}

// Query with suspense support
export function useSuspenseQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  <% if (context.hasSuspense) { %>
  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    suspense: true,
    ...options,
  });
  <% } else { %>
  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options,
  });
  <% } %>
}

// Utility hook for invalidating queries
export function useInvalidateQuery() {
  const queryClient = useQueryClient();
  
  return {
    invalidate: (queryKey: QueryKey) => {
      return queryClient.invalidateQueries({ queryKey });
    },
    invalidateAll: () => {
      return queryClient.invalidateQueries();
    },
    refetch: (queryKey: QueryKey) => {
      return queryClient.refetchQueries({ queryKey });
    },
  };
}

// Utility hook for prefetching
export function usePrefetchQuery() {
  const queryClient = useQueryClient();
  
  return {
    prefetch: async <TData = unknown>(
      queryKey: QueryKey,
      queryFn: () => Promise<TData>,
      options?: { staleTime?: number }
    ) => {
      return queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: options?.staleTime || 5 * 60 * 1000,
      });
    },
  };
}
