/**
 * Query Keys Factory
 * 
 * Centralized query key management for consistent caching and invalidation
 */

export type QueryKey = readonly unknown[];

// Base query keys
export const queryKeys = {
  // User related queries
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  
  // Posts related queries
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.posts.lists(), { filters }] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.posts.details(), id] as const,
    comments: (postId: string) => [...queryKeys.posts.detail(postId), 'comments'] as const,
  },
  
  // Auth related queries
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },
  
  // Settings related queries
  settings: {
    all: ['settings'] as const,
    app: () => [...queryKeys.settings.all, 'app'] as const,
    user: () => [...queryKeys.settings.all, 'user'] as const,
  },
  
  // Analytics related queries
  analytics: {
    all: ['analytics'] as const,
    dashboard: () => [...queryKeys.analytics.all, 'dashboard'] as const,
    reports: () => [...queryKeys.analytics.all, 'reports'] as const,
    report: (id: string) => [...queryKeys.analytics.reports(), id] as const,
  },
} as const;

// Helper function to create query keys with filters
export function createQueryKey<T extends Record<string, unknown>>(
  baseKey: QueryKey,
  filters?: T
): QueryKey {
  if (!filters || Object.keys(filters).length === 0) {
    return baseKey;
  }
  
  return [...baseKey, { filters }] as const;
}

// Helper function to create paginated query keys
export function createPaginatedQueryKey<T extends Record<string, unknown>>(
  baseKey: QueryKey,
  page: number,
  limit: number,
  filters?: T
): QueryKey {
  return [...baseKey, { page, limit, filters }] as const;
}

// Helper function to create infinite query keys
export function createInfiniteQueryKey<T extends Record<string, unknown>>(
  baseKey: QueryKey,
  filters?: T
): QueryKey {
  return [...baseKey, 'infinite', { filters }] as const;
}

// Type-safe query key validation
export function isValidQueryKey(key: unknown): key is QueryKey {
  return Array.isArray(key) && key.every(item => 
    typeof item === 'string' || 
    typeof item === 'number' || 
    typeof item === 'boolean' ||
    item === null ||
    (typeof item === 'object' && item !== null)
  );
}

// Query key matcher for invalidation
export function matchesQueryKey(queryKey: QueryKey, pattern: QueryKey): boolean {
  if (pattern.length > queryKey.length) return false;
  
  return pattern.every((patternItem, index) => {
    const queryItem = queryKey[index];
    
    if (patternItem === queryItem) return true;
    
    if (typeof patternItem === 'object' && patternItem !== null &&
        typeof queryItem === 'object' && queryItem !== null) {
      // Deep comparison for filter objects
      return JSON.stringify(patternItem) === JSON.stringify(queryItem);
    }
    
    return false;
  });
}
