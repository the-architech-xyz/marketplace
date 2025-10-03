import { api } from './api';

/**
 * Posts API service
 * Provides standardized API methods for post management
 */

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  authorId: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
  tags?: string[];
  category?: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  published?: boolean;
  tags?: string[];
  category?: string;
  featuredImage?: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  excerpt?: string;
  slug?: string;
  published?: boolean;
  tags?: string[];
  category?: string;
  featuredImage?: string;
}

export interface PostListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  authorId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PostListResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Get all posts with optional filtering and pagination
 */
export async function getPosts(params?: PostListParams): Promise<PostListResponse> {
  const response = await api.get('/posts', { params });
  return response.data;
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: string): Promise<Post> {
  const response = await api.get(`/posts/${id}`);
  return response.data;
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  const response = await api.get(`/posts/slug/${slug}`);
  return response.data;
}

/**
 * Create a new post
 */
export async function createPost(postData: CreatePostData): Promise<Post> {
  const response = await api.post('/posts', postData);
  return response.data;
}

/**
 * Update an existing post
 */
export async function updatePost(id: string, postData: UpdatePostData): Promise<Post> {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
}

/**
 * Delete a post
 */
export async function deletePost(id: string): Promise<void> {
  await api.delete(`/posts/${id}`);
}

/**
 * Publish a post
 */
export async function publishPost(id: string): Promise<Post> {
  const response = await api.put(`/posts/${id}/publish`);
  return response.data;
}

/**
 * Unpublish a post
 */
export async function unpublishPost(id: string): Promise<Post> {
  const response = await api.put(`/posts/${id}/unpublish`);
  return response.data;
}

/**
 * Search posts by query
 */
export async function searchPosts(query: string, params?: Omit<PostListParams, 'search'>): Promise<PostListResponse> {
  return getPosts({ ...params, search: query });
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string, params?: Omit<PostListParams, 'category'>): Promise<PostListResponse> {
  return getPosts({ ...params, category });
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string, params?: Omit<PostListParams, 'tags'>): Promise<PostListResponse> {
  return getPosts({ ...params, tags: [tag] });
}

/**
 * Get posts by author
 */
export async function getPostsByAuthor(authorId: string, params?: Omit<PostListParams, 'authorId'>): Promise<PostListResponse> {
  return getPosts({ ...params, authorId });
}

/**
 * Get published posts only
 */
export async function getPublishedPosts(params?: Omit<PostListParams, 'published'>): Promise<PostListResponse> {
  return getPosts({ ...params, published: true });
}

/**
 * Get draft posts only
 */
export async function getDraftPosts(params?: Omit<PostListParams, 'published'>): Promise<PostListResponse> {
  return getPosts({ ...params, published: false });
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(params?: Omit<PostListParams, 'featured'>): Promise<PostListResponse> {
  const response = await api.get('/posts/featured', { params });
  return response.data;
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit: number = 10): Promise<Post[]> {
  const response = await api.get('/posts/recent', { params: { limit } });
  return response.data;
}

/**
 * Get popular posts
 */
export async function getPopularPosts(limit: number = 10): Promise<Post[]> {
  const response = await api.get('/posts/popular', { params: { limit } });
  return response.data;
}

/**
 * Get related posts
 */
export async function getRelatedPosts(postId: string, limit: number = 5): Promise<Post[]> {
  const response = await api.get(`/posts/${postId}/related`, { params: { limit } });
  return response.data;
}
