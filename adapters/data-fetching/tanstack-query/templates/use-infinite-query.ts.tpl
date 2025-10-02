import { useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';

// Standard infinite query hook
export function useStandardInfiniteQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: ({ pageParam }: { pageParam: unknown }) => Promise<{
    data: TData[];
    nextCursor?: unknown;
    hasNextPage: boolean;
  }>,
  options?: Omit<UseInfiniteQueryOptions<{
    data: TData[];
    nextCursor?: unknown;
    hasNextPage: boolean;
  }, TError, TData[], QueryKey, unknown>, 'queryKey' | 'queryFn'>
): UseInfiniteQueryResult<{
  data: TData[];
  nextCursor?: unknown;
  hasNextPage: boolean;
}, TError> {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.previousCursor,
    ...options,
  });
}

// Infinite query with cursor-based pagination
export function useCursorInfiniteQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: ({ pageParam }: { pageParam: string | null }) => Promise<{
    data: TData[];
    nextCursor: string | null;
    hasNextPage: boolean;
  }>,
  options?: Omit<UseInfiniteQueryOptions<{
    data: TData[];
    nextCursor: string | null;
    hasNextPage: boolean;
  }, TError, TData[], QueryKey, string | null>, 'queryKey' | 'queryFn'>
): UseInfiniteQueryResult<{
  data: TData[];
  nextCursor: string | null;
  hasNextPage: boolean;
}, TError> {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    ...options,
  });
}

// Infinite query with offset-based pagination
export function useOffsetInfiniteQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<{
    data: TData[];
    nextOffset: number;
    hasNextPage: boolean;
    total: number;
  }>,
  pageSize: number = 20,
  options?: Omit<UseInfiniteQueryOptions<{
    data: TData[];
    nextOffset: number;
    hasNextPage: boolean;
    total: number;
  }, TError, TData[], QueryKey, number>, 'queryKey' | 'queryFn'>
): UseInfiniteQueryResult<{
  data: TData[];
  nextOffset: number;
  hasNextPage: boolean;
  total: number;
}, TError> {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.nextOffset;
    },
    ...options,
  });
}

// Utility hook for infinite query data
export function useInfiniteQueryData<TData = unknown>(
  infiniteQuery: UseInfiniteQueryResult<{
    data: TData[];
    nextCursor?: unknown;
    hasNextPage: boolean;
  }, Error>
) {
  const allData = infiniteQuery.data?.pages.flatMap(page => page.data) ?? [];
  const totalItems = allData.length;
  const hasNextPage = infiniteQuery.data?.pages[infiniteQuery.data.pages.length - 1]?.hasNextPage ?? false;
  const isFetchingNextPage = infiniteQuery.isFetchingNextPage;
  const fetchNextPage = infiniteQuery.fetchNextPage;
  const hasNextPage = infiniteQuery.hasNextPage;

  return {
    data: allData,
    totalItems,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading: infiniteQuery.isLoading,
    isError: infiniteQuery.isError,
    error: infiniteQuery.error,
  };
}
