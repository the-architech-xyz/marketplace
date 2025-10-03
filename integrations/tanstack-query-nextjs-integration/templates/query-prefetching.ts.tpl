/**
 * Query Prefetching Examples
 * 
 * Comprehensive prefetching utilities for TanStack Query + Next.js
 * Provides server-side prefetching, client-side prefetching, and optimization patterns
 */

import { QueryClient } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cache } from 'react';

/**
 * Prefetching configuration
 */
interface PrefetchConfig {
  staleTime?: number;
  gcTime?: number;
  retry?: boolean | number;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
}

/**
 * Server-side prefetching utilities
 */
export class ServerPrefetching {
  /**
   * Create a new QueryClient for server-side prefetching
   */
  static createQueryClient(): QueryClient {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          gcTime: 5 * 60 * 1000, // 5 minutes
          retry: false, // Don't retry on server
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    });
  }

  /**
   * Prefetch a single query
   */
  static async prefetchQuery<T>(
    queryClient: QueryClient,
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ): Promise<void> {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: config.staleTime || 60 * 1000,
      gcTime: config.gcTime || 5 * 60 * 1000,
    });
  }

  /**
   * Prefetch multiple queries
   */
  static async prefetchQueries<T>(
    queryClient: QueryClient,
    queries: Array<{
      queryKey: string[];
      queryFn: () => Promise<T>;
      config?: PrefetchConfig;
    }>
  ): Promise<void> {
    await Promise.all(
      queries.map(({ queryKey, queryFn, config }) =>
        this.prefetchQuery(queryClient, queryKey, queryFn, config)
      )
    );
  }

  /**
   * Prefetch with error handling
   */
  static async prefetchQuerySafe<T>(
    queryClient: QueryClient,
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.prefetchQuery(queryClient, queryKey, queryFn, config);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Prefetch with conditional logic
   */
  static async prefetchQueryConditional<T>(
    queryClient: QueryClient,
    queryKey: string[],
    queryFn: () => Promise<T>,
    condition: boolean,
    config: PrefetchConfig = {}
  ): Promise<void> {
    if (condition) {
      await this.prefetchQuery(queryClient, queryKey, queryFn, config);
    }
  }

  /**
   * Prefetch with dependency resolution
   */
  static async prefetchQueryWithDeps<T>(
    queryClient: QueryClient,
    queryKey: string[],
    queryFn: () => Promise<T>,
    dependencies: Array<{
      queryKey: string[];
      queryFn: () => Promise<any>;
    }>,
    config: PrefetchConfig = {}
  ): Promise<void> {
    // Prefetch dependencies first
    await this.prefetchQueries(
      queryClient,
      dependencies.map(dep => ({ ...dep, config }))
    );

    // Then prefetch the main query
    await this.prefetchQuery(queryClient, queryKey, queryFn, config);
  }
}

/**
 * Client-side prefetching utilities
 */
export class ClientPrefetching {
  /**
   * Prefetch on hover
   */
  static usePrefetchOnHover<T>(
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ) {
    const queryClient = useQueryClient();

    return {
      onMouseEnter: () => {
        queryClient.prefetchQuery({
          queryKey,
          queryFn,
          staleTime: config.staleTime || 5 * 60 * 1000,
          gcTime: config.gcTime || 10 * 60 * 1000,
        });
      },
    };
  }

  /**
   * Prefetch on focus
   */
  static usePrefetchOnFocus<T>(
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ) {
    const queryClient = useQueryClient();

    useEffect(() => {
      const handleFocus = () => {
        queryClient.prefetchQuery({
          queryKey,
          queryFn,
          staleTime: config.staleTime || 5 * 60 * 1000,
          gcTime: config.gcTime || 10 * 60 * 1000,
        });
      };

      window.addEventListener('focus', handleFocus);
      return () => window.removeEventListener('focus', handleFocus);
    }, [queryClient, queryKey, queryFn, config]);
  }

  /**
   * Prefetch on intersection
   */
  static usePrefetchOnIntersection<T>(
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ) {
    const queryClient = useQueryClient();
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
      const element = ref.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            queryClient.prefetchQuery({
              queryKey,
              queryFn,
              staleTime: config.staleTime || 5 * 60 * 1000,
              gcTime: config.gcTime || 10 * 60 * 1000,
            });
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }, [queryClient, queryKey, queryFn, config]);

    return ref;
  }

  /**
   * Prefetch on route change
   */
  static usePrefetchOnRouteChange<T>(
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ) {
    const queryClient = useQueryClient();
    const router = useRouter();

    useEffect(() => {
      const handleRouteChange = () => {
        queryClient.prefetchQuery({
          queryKey,
          queryFn,
          staleTime: config.staleTime || 5 * 60 * 1000,
          gcTime: config.gcTime || 10 * 60 * 1000,
        });
      };

      router.events.on('routeChangeStart', handleRouteChange);
      return () => router.events.off('routeChangeStart', handleRouteChange);
    }, [queryClient, queryKey, queryFn, config, router]);
  }
}

/**
 * Prefetching patterns
 */
export class PrefetchingPatterns {
  /**
   * Prefetch related data
   */
  static async prefetchRelatedData<T>(
    queryClient: QueryClient,
    mainQueryKey: string[],
    mainQueryFn: () => Promise<T>,
    relatedQueries: Array<{
      queryKey: string[];
      queryFn: () => Promise<any>;
    }>,
    config: PrefetchConfig = {}
  ): Promise<void> {
    // Prefetch main query
    await ServerPrefetching.prefetchQuery(queryClient, mainQueryKey, mainQueryFn, config);

    // Prefetch related queries
    await ServerPrefetching.prefetchQueries(
      queryClient,
      relatedQueries.map(query => ({ ...query, config }))
    );
  }

  /**
   * Prefetch with pagination
   */
  static async prefetchPaginatedData<T>(
    queryClient: QueryClient,
    baseQueryKey: string[],
    queryFn: (page: number) => Promise<T>,
    totalPages: number,
    config: PrefetchConfig = {}
  ): Promise<void> {
    const queries = Array.from({ length: totalPages }, (_, i) => ({
      queryKey: [...baseQueryKey, 'page', i + 1],
      queryFn: () => queryFn(i + 1),
      config,
    }));

    await ServerPrefetching.prefetchQueries(queryClient, queries);
  }

  /**
   * Prefetch with search
   */
  static async prefetchSearchResults<T>(
    queryClient: QueryClient,
    baseQueryKey: string[],
    queryFn: (searchTerm: string) => Promise<T>,
    searchTerms: string[],
    config: PrefetchConfig = {}
  ): Promise<void> {
    const queries = searchTerms.map(term => ({
      queryKey: [...baseQueryKey, 'search', term],
      queryFn: () => queryFn(term),
      config,
    }));

    await ServerPrefetching.prefetchQueries(queryClient, queries);
  }

  /**
   * Prefetch with filters
   */
  static async prefetchFilteredData<T>(
    queryClient: QueryClient,
    baseQueryKey: string[],
    queryFn: (filters: Record<string, any>) => Promise<T>,
    filterCombinations: Record<string, any>[],
    config: PrefetchConfig = {}
  ): Promise<void> {
    const queries = filterCombinations.map(filters => ({
      queryKey: [...baseQueryKey, 'filters', JSON.stringify(filters)],
      queryFn: () => queryFn(filters),
      config,
    }));

    await ServerPrefetching.prefetchQueries(queryClient, queries);
  }
}

/**
 * Prefetching optimization
 */
export class PrefetchingOptimization {
  /**
   * Prefetch with priority
   */
  static async prefetchWithPriority<T>(
    queryClient: QueryClient,
    queries: Array<{
      queryKey: string[];
      queryFn: () => Promise<T>;
      priority: number;
      config?: PrefetchConfig;
    }>
  ): Promise<void> {
    // Sort by priority (higher number = higher priority)
    const sortedQueries = queries.sort((a, b) => b.priority - a.priority);

    // Prefetch in priority order
    for (const query of sortedQueries) {
      await ServerPrefetching.prefetchQuery(
        queryClient,
        query.queryKey,
        query.queryFn,
        query.config
      );
    }
  }

  /**
   * Prefetch with batching
   */
  static async prefetchWithBatching<T>(
    queryClient: QueryClient,
    queries: Array<{
      queryKey: string[];
      queryFn: () => Promise<T>;
      config?: PrefetchConfig;
    }>,
    batchSize: number = 5
  ): Promise<void> {
    for (let i = 0; i < queries.length; i += batchSize) {
      const batch = queries.slice(i, i + batchSize);
      await ServerPrefetching.prefetchQueries(
        queryClient,
        batch.map(query => ({ ...query, config: query.config }))
      );
    }
  }

  /**
   * Prefetch with caching
   */
  static async prefetchWithCaching<T>(
    queryClient: QueryClient,
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ): Promise<void> {
    // Check if data is already cached
    const cachedData = queryClient.getQueryData(queryKey);
    if (cachedData) {
      return;
    }

    // Prefetch if not cached
    await ServerPrefetching.prefetchQuery(queryClient, queryKey, queryFn, config);
  }

  /**
   * Prefetch with deduplication
   */
  static async prefetchWithDeduplication<T>(
    queryClient: QueryClient,
    queries: Array<{
      queryKey: string[];
      queryFn: () => Promise<T>;
      config?: PrefetchConfig;
    }>
  ): Promise<void> {
    // Remove duplicate queries
    const uniqueQueries = queries.filter((query, index, self) =>
      index === self.findIndex(q => JSON.stringify(q.queryKey) === JSON.stringify(query.queryKey))
    );

    await ServerPrefetching.prefetchQueries(
      queryClient,
      uniqueQueries.map(query => ({ ...query, config: query.config }))
    );
  }
}

/**
 * Prefetching hooks
 */
export class PrefetchingHooks {
  /**
   * Hook for prefetching on mount
   */
  static usePrefetchOnMount<T>(
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ) {
    const queryClient = useQueryClient();

    useEffect(() => {
      queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: config.staleTime || 5 * 60 * 1000,
        gcTime: config.gcTime || 10 * 60 * 1000,
      });
    }, [queryClient, queryKey, queryFn, config]);
  }

  /**
   * Hook for prefetching on condition
   */
  static usePrefetchOnCondition<T>(
    queryKey: string[],
    queryFn: () => Promise<T>,
    condition: boolean,
    config: PrefetchConfig = {}
  ) {
    const queryClient = useQueryClient();

    useEffect(() => {
      if (condition) {
        queryClient.prefetchQuery({
          queryKey,
          queryFn,
          staleTime: config.staleTime || 5 * 60 * 1000,
          gcTime: config.gcTime || 10 * 60 * 1000,
        });
      }
    }, [queryClient, queryKey, queryFn, condition, config]);
  }

  /**
   * Hook for prefetching on dependency change
   */
  static usePrefetchOnDependencyChange<T>(
    queryKey: string[],
    queryFn: () => Promise<T>,
    dependency: any,
    config: PrefetchConfig = {}
  ) {
    const queryClient = useQueryClient();

    useEffect(() => {
      queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: config.staleTime || 5 * 60 * 1000,
        gcTime: config.gcTime || 10 * 60 * 1000,
      });
    }, [queryClient, queryKey, queryFn, dependency, config]);
  }
}

/**
 * Prefetching utilities
 */
export class PrefetchingUtils {
  /**
   * Create prefetch function
   */
  static createPrefetchFunction<T>(
    queryClient: QueryClient,
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ) {
    return () => queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: config.staleTime || 5 * 60 * 1000,
      gcTime: config.gcTime || 10 * 60 * 1000,
    });
  }

  /**
   * Create prefetch function with error handling
   */
  static createPrefetchFunctionSafe<T>(
    queryClient: QueryClient,
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ) {
    return async () => {
      try {
        await queryClient.prefetchQuery({
          queryKey,
          queryFn,
          staleTime: config.staleTime || 5 * 60 * 1000,
          gcTime: config.gcTime || 10 * 60 * 1000,
        });
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    };
  }

  /**
   * Create prefetch function with caching
   */
  static createPrefetchFunctionWithCaching<T>(
    queryClient: QueryClient,
    queryKey: string[],
    queryFn: () => Promise<T>,
    config: PrefetchConfig = {}
  ) {
    return () => {
      const cachedData = queryClient.getQueryData(queryKey);
      if (cachedData) {
        return Promise.resolve();
      }

      return queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: config.staleTime || 5 * 60 * 1000,
        gcTime: config.gcTime || 10 * 60 * 1000,
      });
    };
  }
}
