/**
 * TanStack Query Types
 * 
 * TypeScript definitions for TanStack Query integration
 */

import { QueryKey } from './query-keys';

// Base query result types
export interface QueryResult<TData = unknown, TError = Error> {
  data: TData | undefined;
  error: TError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isStale: boolean;
  refetch: () => void;
}

// Mutation result types
export interface MutationResult<TData = unknown, TError = Error, TVariables = unknown> {
  data: TData | undefined;
  error: TError | null;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isPaused: boolean;
  isSuccess: boolean;
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  reset: () => void;
}

// Infinite query result types
export interface InfiniteQueryResult<TData = unknown, TError = Error> {
  data: {
    pages: Array<{
      data: TData[];
      nextCursor?: unknown;
      hasNextPage: boolean;
    }>;
    pageParams: unknown[];
  } | undefined;
  error: TError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  isFetchingPreviousPage: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  refetch: () => void;
}

// Query options types
export interface QueryOptions<TData = unknown, TError = Error> {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  refetchOnReconnect?: boolean;
  retry?: boolean | number | ((failureCount: number, error: TError) => boolean);
  retryDelay?: number | ((attemptIndex: number) => number);
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TData | undefined, error: TError | null) => void;
}

// Mutation options types
export interface MutationOptions<TData = unknown, TError = Error, TVariables = unknown> {
  onMutate?: (variables: TVariables) => Promise<unknown> | unknown;
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void;
  onError?: (error: TError, variables: TVariables, context: unknown) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: unknown) => void;
  retry?: boolean | number | ((failureCount: number, error: TError) => boolean);
  retryDelay?: number | ((attemptIndex: number) => number);
}

// API response types
export interface ApiResponse<TData = unknown> {
  data: TData;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

// Pagination types
export interface PaginatedResponse<TData = unknown> {
  data: TData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface CursorPaginatedResponse<TData = unknown> {
  data: TData[];
  pagination: {
    nextCursor: string | null;
    hasNextPage: boolean;
    total?: number;
  };
}

// Query key types
export type QueryKeyFactory = {
  [K in string]: QueryKey | (() => QueryKey) | ((...args: any[]) => QueryKey);
};

// Hook return types
export type UseQueryReturn<TData = unknown, TError = Error> = QueryResult<TData, TError>;
export type UseMutationReturn<TData = unknown, TError = Error, TVariables = unknown> = MutationResult<TData, TError, TVariables>;
export type UseInfiniteQueryReturn<TData = unknown, TError = Error> = InfiniteQueryResult<TData, TError>;

// Utility types
export type QueryFunction<TData = unknown, TQueryKey extends QueryKey = QueryKey> = (
  context: { queryKey: TQueryKey; pageParam?: unknown; signal?: AbortSignal }
) => Promise<TData>;

export type MutationFunction<TData = unknown, TVariables = unknown> = (
  variables: TVariables
) => Promise<TData>;

// Error types
export class QueryError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'QueryError';
  }
}

export class MutationError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'MutationError';
  }
}
