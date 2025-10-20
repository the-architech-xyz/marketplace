import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cache } from 'react';

// Create a stable query client for SSR
export const getQueryClient = cache(() => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
}));

// Hydration utilities for SSR
export async function dehydrateQueryClient(queryClient: QueryClient) {
  return dehydrate(queryClient);
}

// Prefetch utilities for SSR
export async function prefetchQuery<T>(
  queryClient: QueryClient,
  queryKey: string[],
  queryFn: () => Promise<T>
) {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000,
  });
}

// Hydration boundary component
export function QueryHydrationBoundary({ 
  children, 
  state 
}: { 
  children: React.ReactNode; 
  state: any;
}) {
  return (
    <HydrationBoundary state={state}>
      {children}
    </HydrationBoundary>
  );
}
