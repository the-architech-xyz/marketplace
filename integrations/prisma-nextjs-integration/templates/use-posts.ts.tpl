/**
 * Posts Hooks
 * 
 * Standardized TanStack Query hooks for posts
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { postsApi } from '@/lib/api/posts';
import type { Post, CreatePostData, UpdatePostData } from '@/types/api';

// Get all posts
export function usePosts(filters?: { 
  author?: string; 
  category?: string; 
  status?: string; 
  search?: string;
  published?: boolean;
}) {
  return useQuery({
    queryKey: queryKeys.posts.list(filters || {}),
    queryFn: () => postsApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get post by ID
export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => postsApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get published posts
export function usePublishedPosts(filters?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: queryKeys.posts.list({ ...filters, published: true }),
    queryFn: () => postsApi.getPublished(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get posts by author
export function usePostsByAuthor(authorId: string) {
  return useQuery({
    queryKey: queryKeys.posts.list({ author: authorId }),
    queryFn: () => postsApi.getByAuthor(authorId),
    enabled: !!authorId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Create post
export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePostData) => postsApi.create(data),
    onSuccess: (newPost) => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
      
      // Add the new post to the cache
      queryClient.setQueryData(
        queryKeys.posts.detail(newPost.id),
        newPost
      );
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });
}

// Update post
export function useUpdatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostData }) => 
      postsApi.update(id, data),
    onSuccess: (updatedPost) => {
      // Update the post in cache
      queryClient.setQueryData(
        queryKeys.posts.detail(updatedPost.id),
        updatedPost
      );
      
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
    onError: (error) => {
      console.error('Failed to update post:', error);
    },
  });
}

// Delete post
export function useDeletePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => postsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove the post from cache
      queryClient.removeQueries({ queryKey: queryKeys.posts.detail(deletedId) });
      
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete post:', error);
    },
  });
}

// Publish post
export function usePublishPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => postsApi.publish(id),
    onSuccess: (publishedPost) => {
      // Update the post in cache
      queryClient.setQueryData(
        queryKeys.posts.detail(publishedPost.id),
        publishedPost
      );
      
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
    onError: (error) => {
      console.error('Failed to publish post:', error);
    },
  });
}

// Unpublish post
export function useUnpublishPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => postsApi.unpublish(id),
    onSuccess: (unpublishedPost) => {
      // Update the post in cache
      queryClient.setQueryData(
        queryKeys.posts.detail(unpublishedPost.id),
        unpublishedPost
      );
      
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
    onError: (error) => {
      console.error('Failed to unpublish post:', error);
    },
  });
}

// Get post comments
export function usePostComments(postId: string) {
  return useQuery({
    queryKey: queryKeys.posts.comments(postId),
    queryFn: () => postsApi.getComments(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Add comment to post
export function useAddComment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) => 
      postsApi.addComment(postId, content),
    onSuccess: (_, { postId }) => {
      // Invalidate post comments
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.posts.comments(postId) 
      });
    },
    onError: (error) => {
      console.error('Failed to add comment:', error);
    },
  });
}

// Search posts
export function useSearchPosts(query: string) {
  return useQuery({
    queryKey: queryKeys.posts.list({ search: query }),
    queryFn: () => postsApi.search(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get posts by category
export function usePostsByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.posts.list({ category }),
    queryFn: () => postsApi.getByCategory(category),
    enabled: !!category,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get featured posts
export function useFeaturedPosts() {
  return useQuery({
    queryKey: queryKeys.posts.list({ featured: true }),
    queryFn: () => postsApi.getFeatured(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Get post statistics
export function usePostStats() {
  return useQuery({
    queryKey: queryKeys.posts.details(),
    queryFn: () => postsApi.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
