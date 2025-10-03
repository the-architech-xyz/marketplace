/**
 * Query Invalidation Utilities
 * 
 * Comprehensive query invalidation utilities for TanStack Query
 * Provides powerful and flexible query invalidation patterns
 */

import { useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';

/**
 * Hook for query invalidation utilities
 * Provides comprehensive invalidation patterns for different use cases
 */
export function useQueryInvalidation() {
  const queryClient = useQueryClient();

  return {
    /**
     * Invalidate specific queries by key
     */
    invalidate: (queryKey: QueryKey) => {
      return queryClient.invalidateQueries({ queryKey });
    },

    /**
     * Invalidate all queries
     */
    invalidateAll: () => {
      return queryClient.invalidateQueries();
    },

    /**
     * Invalidate queries by type (e.g., 'users', 'posts', 'products')
     */
    invalidateByType: (type: string) => {
      return queryClient.invalidateQueries({ 
        queryKey: [type],
        exact: false 
      });
    },

    /**
     * Invalidate queries by predicate function
     */
    invalidateByPredicate: (predicate: (query: any) => boolean) => {
      return queryClient.invalidateQueries({ predicate });
    },

    /**
     * Invalidate queries with specific tags
     */
    invalidateByTags: (tags: string[]) => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return tags.some(tag => 
            Array.isArray(queryKey) && queryKey.some(key => 
              typeof key === 'string' && key.includes(tag)
            )
          );
        }
      });
    },

    /**
     * Invalidate and refetch specific queries
     */
    invalidateAndRefetch: (queryKey: QueryKey) => {
      return queryClient.invalidateQueries({ 
        queryKey, 
        refetchType: 'active' 
      });
    },

    /**
     * Invalidate queries and refetch all
     */
    invalidateAndRefetchAll: () => {
      return queryClient.invalidateQueries({ 
        refetchType: 'active' 
      });
    },

    /**
     * Remove specific queries from cache
     */
    remove: (queryKey: QueryKey) => {
      return queryClient.removeQueries({ queryKey });
    },

    /**
     * Remove all queries from cache
     */
    removeAll: () => {
      return queryClient.removeQueries();
    },

    /**
     * Reset specific queries to initial state
     */
    reset: (queryKey: QueryKey) => {
      return queryClient.resetQueries({ queryKey });
    },

    /**
     * Reset all queries to initial state
     */
    resetAll: () => {
      return queryClient.resetQueries();
    },

    /**
     * Cancel ongoing queries
     */
    cancel: (queryKey: QueryKey) => {
      return queryClient.cancelQueries({ queryKey });
    },

    /**
     * Cancel all ongoing queries
     */
    cancelAll: () => {
      return queryClient.cancelQueries();
    },

    /**
     * Refetch specific queries
     */
    refetch: (queryKey: QueryKey) => {
      return queryClient.refetchQueries({ queryKey });
    },

    /**
     * Refetch all queries
     */
    refetchAll: () => {
      return queryClient.refetchQueries();
    },

    /**
     * Get query data without triggering a fetch
     */
    getQueryData: (queryKey: QueryKey) => {
      return queryClient.getQueryData(queryKey);
    },

    /**
     * Set query data manually
     */
    setQueryData: <TData = unknown>(queryKey: QueryKey, data: TData) => {
      return queryClient.setQueryData(queryKey, data);
    },

    /**
     * Update query data with a function
     */
    updateQueryData: <TData = unknown>(
      queryKey: QueryKey, 
      updater: (oldData: TData | undefined) => TData
    ) => {
      return queryClient.setQueryData(queryKey, updater);
    },

    /**
     * Get all query data
     */
    getAllQueryData: () => {
      return queryClient.getQueryCache().getAll();
    },

    /**
     * Check if queries are loading
     */
    isLoading: (queryKey?: QueryKey) => {
      return queryClient.isFetching(queryKey ? { queryKey } : undefined) > 0;
    },

    /**
     * Get query status
     */
    getQueryStatus: (queryKey: QueryKey) => {
      const query = queryClient.getQueryState(queryKey);
      return {
        status: query?.status,
        fetchStatus: query?.fetchStatus,
        dataUpdatedAt: query?.dataUpdatedAt,
        errorUpdatedAt: query?.errorUpdatedAt,
        isStale: query?.isStale,
        isInvalidated: query?.isInvalidated,
      };
    },
  };
}

/**
 * Hook for batch invalidation operations
 * Useful for complex invalidation patterns
 */
export function useBatchInvalidation() {
  const queryClient = useQueryClient();

  return {
    /**
     * Invalidate multiple query keys at once
     */
    invalidateMultiple: (queryKeys: QueryKey[]) => {
      return Promise.all(
        queryKeys.map(key => queryClient.invalidateQueries({ queryKey: key }))
      );
    },

    /**
     * Invalidate and refetch multiple queries
     */
    invalidateAndRefetchMultiple: (queryKeys: QueryKey[]) => {
      return Promise.all(
        queryKeys.map(key => 
          queryClient.invalidateQueries({ 
            queryKey: key, 
            refetchType: 'active' 
          })
        )
      );
    },

    /**
     * Remove multiple queries from cache
     */
    removeMultiple: (queryKeys: QueryKey[]) => {
      return Promise.all(
        queryKeys.map(key => queryClient.removeQueries({ queryKey: key }))
      );
    },

    /**
     * Reset multiple queries to initial state
     */
    resetMultiple: (queryKeys: QueryKey[]) => {
      return Promise.all(
        queryKeys.map(key => queryClient.resetQueries({ queryKey: key }))
      );
    },
  };
}

/**
 * Hook for smart invalidation patterns
 * Provides intelligent invalidation based on common patterns
 */
export function useSmartInvalidation() {
  const queryClient = useQueryClient();

  return {
    /**
     * Invalidate related queries when a resource is updated
     * Example: When a user is updated, invalidate user list, user details, etc.
     */
    invalidateRelated: (resourceType: string, resourceId?: string | number) => {
      const patterns = [
        [resourceType],
        [resourceType, 'list'],
        [resourceType, 'details'],
        [resourceType, 'search'],
      ];

      if (resourceId) {
        patterns.push([resourceType, resourceId]);
        patterns.push([resourceType, resourceId, 'details']);
      }

      return Promise.all(
        patterns.map(pattern => 
          queryClient.invalidateQueries({ 
            queryKey: pattern,
            exact: false 
          })
        )
      );
    },

    /**
     * Invalidate queries after a mutation
     * Automatically invalidates related queries based on mutation type
     */
    invalidateAfterMutation: (
      mutationType: 'create' | 'update' | 'delete',
      resourceType: string,
      resourceId?: string | number
    ) => {
      const invalidation = useSmartInvalidation();
      
      switch (mutationType) {
        case 'create':
          // After creating, invalidate list queries
          return queryClient.invalidateQueries({
            queryKey: [resourceType, 'list'],
            exact: false
          });
        
        case 'update':
          // After updating, invalidate specific resource and list
          return invalidation.invalidateRelated(resourceType, resourceId);
        
        case 'delete':
          // After deleting, invalidate list and remove specific resource
          return Promise.all([
            queryClient.invalidateQueries({
              queryKey: [resourceType, 'list'],
              exact: false
            }),
            queryClient.removeQueries({
              queryKey: [resourceType, resourceId],
              exact: false
            })
          ]);
        
        default:
          return Promise.resolve();
      }
    },

    /**
     * Invalidate queries based on user permissions
     * Useful for role-based data invalidation
     */
    invalidateByPermission: (permission: string) => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          // This would need to be customized based on your permission system
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && 
                 queryKey.some(key => 
                   typeof key === 'string' && 
                   key.includes(permission)
                 );
        }
      });
    },

    /**
     * Invalidate queries based on user role
     * Useful for role-based data invalidation
     */
    invalidateByRole: (role: string) => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          // This would need to be customized based on your role system
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && 
                 queryKey.some(key => 
                   typeof key === 'string' && 
                   key.includes(role)
                 );
        }
      });
    },
  };
}

/**
 * Hook for query cache management
 * Provides utilities for managing the query cache
 */
export function useQueryCache() {
  const queryClient = useQueryClient();

  return {
    /**
     * Get cache size
     */
    getSize: () => {
      return queryClient.getQueryCache().getAll().length;
    },

    /**
     * Clear cache
     */
    clear: () => {
      return queryClient.clear();
    },

    /**
     * Get cache statistics
     */
    getStats: () => {
      const queries = queryClient.getQueryCache().getAll();
      return {
        total: queries.length,
        active: queries.filter(q => q.state.status === 'pending').length,
        success: queries.filter(q => q.state.status === 'success').length,
        error: queries.filter(q => q.state.status === 'error').length,
        stale: queries.filter(q => q.state.isStale).length,
        invalidated: queries.filter(q => q.state.isInvalidated).length,
      };
    },

    /**
     * Get queries by status
     */
    getQueriesByStatus: (status: 'pending' | 'success' | 'error') => {
      return queryClient.getQueryCache().getAll().filter(q => q.state.status === status);
    },

    /**
     * Get stale queries
     */
    getStaleQueries: () => {
      return queryClient.getQueryCache().getAll().filter(q => q.state.isStale);
    },

    /**
     * Get invalidated queries
     */
    getInvalidatedQueries: () => {
      return queryClient.getQueryCache().getAll().filter(q => q.state.isInvalidated);
    },
  };
}
