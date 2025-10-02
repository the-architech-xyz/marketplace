/**
 * API Types
 * 
 * TypeScript definitions for API responses and requests
 */

// Base API response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Paginated response
export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  featured?: boolean;
  published?: boolean;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image?: string;
  featured?: boolean;
  published?: boolean;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  featured?: boolean;
  published?: boolean;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  role?: string;
  avatar?: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  avatar?: string;
  role?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface UserFilters {
  role?: string;
  search?: string;
  status?: string;
}

// Post types
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  authorId: string;
  author?: User;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostData {
  title: string;
  content: string;
  excerpt?: string;
  authorId: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
}

export interface PostFilters {
  author?: string;
  category?: string;
  status?: string;
  search?: string;
  published?: boolean;
  featured?: boolean;
}

// Comment types
export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  postId: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentData {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}

// API Error types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Query parameters
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

// Filter parameters
export interface FilterParams {
  [key: string]: any;
}

// Sort parameters
export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

// Search parameters
export interface SearchParams {
  query: string;
  fields?: string[];
  fuzzy?: boolean;
}

// Bulk operation types
export interface BulkOperation {
  ids: string[];
  operation: 'delete' | 'update' | 'publish' | 'unpublish';
  data?: any;
}

export interface BulkOperationResult {
  success: boolean;
  processed: number;
  failed: number;
  errors: string[];
}

// Statistics types
export interface ProductStats {
  total: number;
  published: number;
  featured: number;
  categories: { [key: string]: number };
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  roles: { [key: string]: number };
}

export interface PostStats {
  total: number;
  published: number;
  featured: number;
  categories: { [key: string]: number };
}

// Authentication types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  permissions: string[];
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

// Permission types
export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}

// File upload types
export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: Date;
}

export interface UploadResponse {
  success: boolean;
  file?: FileUpload;
  error?: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

// Settings types
export interface AppSettings {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  updatedAt: Date;
}

// Audit log types
export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}
