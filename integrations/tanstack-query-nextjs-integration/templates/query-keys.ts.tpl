/**
 * Query Keys Factory
 * Centralized query key management for TanStack Query
 */

// Base query keys
export const queryKeys = {
  // User related queries
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  
  // Posts related queries
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.posts.lists(), { filters }] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.posts.details(), id] as const,
  },
  
  // Products related queries
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.products.lists(), { filters }] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
  },
  
  // Auth related queries
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },
  
  // Settings related queries
  settings: {
    all: ['settings'] as const,
    profile: () => [...queryKeys.settings.all, 'profile'] as const,
    preferences: () => [...queryKeys.settings.all, 'preferences'] as const,
  },
} as const;

// Type for query key
export type QueryKey = typeof queryKeys[keyof typeof queryKeys][keyof typeof queryKeys[keyof typeof queryKeys]];

// Utility function to create query keys
export function createQueryKey<T extends string>(
  baseKey: T,
  ...segments: (string | number | Record<string, any>)[]
): [T, ...(string | number | Record<string, any>)[]] {
  return [baseKey, ...segments];
}

// Utility function to invalidate related queries
export function getRelatedQueryKeys(key: QueryKey) {
  const [baseKey] = key;
  
  switch (baseKey) {
    case 'users':
      return [queryKeys.users.all];
    case 'posts':
      return [queryKeys.posts.all];
    case 'products':
      return [queryKeys.products.all];
    case 'auth':
      return [queryKeys.auth.all];
    case 'settings':
      return [queryKeys.settings.all];
    default:
      return [key];
  }
}

// Query key matchers
export const queryKeyMatchers = {
  users: (key: QueryKey) => key[0] === 'users',
  posts: (key: QueryKey) => key[0] === 'posts',
  products: (key: QueryKey) => key[0] === 'products',
  auth: (key: QueryKey) => key[0] === 'auth',
  settings: (key: QueryKey) => key[0] === 'settings',
} as const;
