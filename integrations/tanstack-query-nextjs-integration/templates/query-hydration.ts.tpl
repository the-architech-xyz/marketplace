import { QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';

/**
 * Hydration utilities for TanStack Query
 * Handles client-side hydration of server-rendered data
 */

interface HydrationProps {
  children: React.ReactNode;
  dehydratedState?: any;
  queryClient?: QueryClient;
}

// Hydration provider component
export function QueryHydrationProvider({ 
  children, 
  dehydratedState,
  queryClient 
}: HydrationProps) {
  const client = queryClient || createQueryClient();

  if (!dehydratedState) {
    return <>{children}</>;
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      {children}
    </HydrationBoundary>
  );
}

// Hook to check if hydration is complete
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

// Hook to safely access query client after hydration
export function useHydratedQueryClient() {
  const isHydrated = useIsHydrated();
  const queryClient = useQueryClient();

  if (!isHydrated) {
    return null;
  }

  return queryClient;
}

// Utility to merge server and client state
export function mergeQueryState(
  serverState: any,
  clientState: any
) {
  return {
    ...serverState,
    ...clientState,
    queries: [
      ...(serverState?.queries || []),
      ...(clientState?.queries || []),
    ],
  };
}

// Utility to handle hydration errors
export function handleHydrationError(error: Error) {
  console.error('Query hydration error:', error);
  
  // You can add custom error handling here
  // e.g., send to error reporting service
  
  return {
    error: 'Failed to hydrate queries',
    details: error.message,
  };
}
