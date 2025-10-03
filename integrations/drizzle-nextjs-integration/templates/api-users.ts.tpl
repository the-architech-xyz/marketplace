import { api } from './api';

/**
 * Users API service
 * Provides standardized API methods for user management
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  name: string;
  password?: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Get all users with optional filtering and pagination
 */
export async function getUsers(params?: UserListParams): Promise<UserListResponse> {
  const response = await api.get('/users', { params });
  return response.data;
}

/**
 * Get a single user by ID
 */
export async function getUserById(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

/**
 * Create a new user
 */
export async function createUser(userData: CreateUserData): Promise<User> {
  const response = await api.post('/users', userData);
  return response.data;
}

/**
 * Update an existing user
 */
export async function updateUser(id: string, userData: UpdateUserData): Promise<User> {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
}

/**
 * Delete a user
 */
export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}

/**
 * Search users by query
 */
export async function searchUsers(query: string, params?: Omit<UserListParams, 'search'>): Promise<UserListResponse> {
  return getUsers({ ...params, search: query });
}

/**
 * Get user profile (current user)
 */
export async function getUserProfile(): Promise<User> {
  const response = await api.get('/users/profile');
  return response.data;
}

/**
 * Update user profile (current user)
 */
export async function updateUserProfile(userData: UpdateUserData): Promise<User> {
  const response = await api.put('/users/profile', userData);
  return response.data;
}

/**
 * Change user password
 */
export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await api.put('/users/password', {
    currentPassword,
    newPassword,
  });
}

/**
 * Reset user password (admin only)
 */
export async function resetUserPassword(id: string): Promise<void> {
  await api.post(`/users/${id}/reset-password`);
}

/**
 * Verify user email
 */
export async function verifyUserEmail(token: string): Promise<void> {
  await api.post('/users/verify-email', { token });
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(): Promise<void> {
  await api.post('/users/resend-verification');
}
