/**
 * Generic Query Hooks
 * 
 * Generic TanStack Query hooks for any entity
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

// Generic useQuery hook
export function useGenericQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    refetchOnWindowFocus?: boolean;
  }
) {
  return useQuery({
    queryKey,
    queryFn,
    enabled: options?.enabled,
    staleTime: options?.staleTime,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
  });
}

// Generic useMutation hook
export function useGenericMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // Call custom onSuccess
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      console.error('Mutation failed:', error);
      options?.onError?.(error, variables);
    },
  });
}

// Generic useInfiniteQuery hook
export function useGenericInfiniteQuery<TData, TPageParam = unknown>(
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam: TPageParam }) => Promise<{
    data: TData[];
    nextCursor?: TPageParam;
  }>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    getNextPageParam?: (lastPage: { data: TData[]; nextCursor?: TPageParam }) => TPageParam | undefined;
  }
) {
  return useQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
    enabled: options?.enabled,
    staleTime: options?.staleTime,
    getNextPageParam: options?.getNextPageParam,
  });
}
