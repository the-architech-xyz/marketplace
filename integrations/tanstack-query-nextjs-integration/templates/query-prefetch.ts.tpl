import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from './query-keys';

/**
 * Query Prefetching Utilities
 * Provides utilities for prefetching data on the server
 */

// Prefetch user data
export async function prefetchUser(
  queryClient: QueryClient,
  userId: string
) {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Prefetch users list
export async function prefetchUsers(
  queryClient: QueryClient,
  filters?: Record<string, any>
) {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.users.list(filters || {}),
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/users?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Prefetch posts data
export async function prefetchPosts(
  queryClient: QueryClient,
  filters?: Record<string, any>
) {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.posts.list(filters || {}),
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/posts?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Prefetch products data
export async function prefetchProducts(
  queryClient: QueryClient,
  filters?: Record<string, any>
) {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.products.list(filters || {}),
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Prefetch auth data
export async function prefetchAuth(queryClient: QueryClient) {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: async () => {
      const response = await fetch('/api/auth/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Prefetch multiple queries
export async function prefetchMultiple(
  queryClient: QueryClient,
  prefetchers: Array<() => Promise<void>>
) {
  await Promise.all(prefetchers.map(prefetcher => prefetcher()));
}

// Prefetch based on route
export async function prefetchByRoute(
  queryClient: QueryClient,
  route: string,
  params?: Record<string, any>
) {
  switch (route) {
    case '/users':
      await prefetchUsers(queryClient, params);
      break;
    case '/posts':
      await prefetchPosts(queryClient, params);
      break;
    case '/products':
      await prefetchProducts(queryClient, params);
      break;
    case '/profile':
      await prefetchAuth(queryClient);
      break;
    default:
      // No prefetching needed for this route
      break;
  }
}
