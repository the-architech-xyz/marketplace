import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '../lib/api/{{module.parameters.apiService || 'api'}}';

/**
 * Generic TanStack Query hook for data fetching
 * 
 * @param queryKey - Unique key for the query
 * @param queryFn - Function that returns a Promise
 * @param options - Additional query options
 * @returns Query result with data, loading, error states
 */
export function useQuery<TData = unknown, TError = Error>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
}

/**
 * Generic hook for fetching a single item by ID
 */
export function useQueryById<TData = unknown, TError = Error>(
  resource: string,
  id: string | number,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError>(
    [resource, id],
    () => api.get(`${resource}/${id}`),
    options
  );
}

/**
 * Generic hook for fetching a list of items
 */
export function useQueryList<TData = unknown, TError = Error>(
  resource: string,
  params?: Record<string, any>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError>(
    [resource, 'list', params],
    () => api.get(resource, { params }),
    options
  );
}

/**
 * Generic hook for infinite queries (pagination)
 */
export function useInfiniteQuery<TData = unknown, TError = Error>(
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam?: any }) => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage: any) => lastPage.nextCursor,
    ...options,
  });
}
