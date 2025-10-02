/**
 * Users Hooks
 * 
 * Standardized TanStack Query hooks for users (Prisma implementation)
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { usersApi } from '@/lib/api/users';
import type { User, CreateUserData, UpdateUserData } from '@/types/api';

// Get all users
export function useUsers(filters?: { role?: string; search?: string; status?: string }) {
  return useQuery({
    queryKey: queryKeys.users.list(filters || {}),
    queryFn: () => usersApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get user by ID
export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get current user
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: () => usersApi.getCurrent(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Create user
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateUserData) => usersApi.create(data),
    onSuccess: (newUser) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
      
      // Add the new user to the cache
      queryClient.setQueryData(
        queryKeys.users.detail(newUser.id),
        newUser
      );
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });
}

// Update user
export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) => 
      usersApi.update(id, data),
    onSuccess: (updatedUser) => {
      // Update the user in cache
      queryClient.setQueryData(
        queryKeys.users.detail(updatedUser.id),
        updatedUser
      );
      
      // If it's the current user, update the current user cache
      if (updatedUser.id === queryClient.getQueryData(queryKeys.auth.user())?.id) {
        queryClient.setQueryData(queryKeys.auth.user(), updatedUser);
      }
      
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
    },
  });
}

// Delete user
export function useDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove the user from cache
      queryClient.removeQueries({ queryKey: queryKeys.users.detail(deletedId) });
      
      // Invalidate users list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete user:', error);
    },
  });
}

// Update user profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateUserData) => usersApi.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update current user in cache
      queryClient.setQueryData(queryKeys.auth.user(), updatedUser);
      
      // Update user detail cache
      queryClient.setQueryData(
        queryKeys.users.detail(updatedUser.id),
        updatedUser
      );
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  });
}

// Change user password
export function useChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { 
      currentPassword: string; 
      newPassword: string; 
    }) => usersApi.changePassword(currentPassword, newPassword),
    onError: (error) => {
      console.error('Failed to change password:', error);
    },
  });
}

// Search users
export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: queryKeys.users.list({ search: query }),
    queryFn: () => usersApi.search(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get users by role
export function useUsersByRole(role: string) {
  return useQuery({
    queryKey: queryKeys.users.list({ role }),
    queryFn: () => usersApi.getByRole(role),
    enabled: !!role,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get user statistics
export function useUserStats() {
  return useQuery({
    queryKey: queryKeys.users.details(),
    queryFn: () => usersApi.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get user permissions
export function useUserPermissions(userId: string) {
  return useQuery({
    queryKey: queryKeys.auth.permissions(),
    queryFn: () => usersApi.getPermissions(userId),
    enabled: !!userId,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
