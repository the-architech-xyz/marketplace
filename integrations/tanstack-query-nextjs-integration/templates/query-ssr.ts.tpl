import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';

/**
 * SSR utilities for TanStack Query
 * Provides server-side rendering support for React Query
 */

// Create a new QueryClient for each request
export function createSSRQueryClient() {
  return createQueryClient({
    queries: {
      staleTime: 0, // Always refetch on server
      cacheTime: 0,
    },
  });
}

// Dehydrate query client for SSR
export function dehydrateQueryClient(queryClient: QueryClient) {
  return dehydrate(queryClient);
}

// Hydrate query client on client
export function hydrateQueryClient(queryClient: QueryClient, dehydratedState: any) {
  return new HydrationBoundary({
    state: dehydratedState,
    children: null,
  });
}

// SSR wrapper component
export function SSRQueryProvider({ 
  children, 
  dehydratedState 
}: { 
  children: React.ReactNode;
  dehydratedState?: any;
}) {
  const queryClient = createSSRQueryClient();

  if (dehydratedState) {
    return (
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    );
  }

  return <>{children}</>;
}

// Prefetch data on server
export async function prefetchQuery<T>(
  queryClient: QueryClient,
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: {
    staleTime?: number;
    cacheTime?: number;
  }
) {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: options?.staleTime || 0,
    cacheTime: options?.cacheTime || 0,
  });
}

// Prefetch multiple queries
export async function prefetchQueries(
  queryClient: QueryClient,
  queries: Array<{
    queryKey: string[];
    queryFn: () => Promise<any>;
    options?: {
      staleTime?: number;
      cacheTime?: number;
    };
  }>
) {
  await Promise.all(
    queries.map(({ queryKey, queryFn, options }) =>
      prefetchQuery(queryClient, queryKey, queryFn, options)
    )
  );
}
