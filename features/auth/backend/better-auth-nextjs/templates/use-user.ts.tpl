/**
 * User Hook
 * 
 * Standardized user hook for Better Auth
 * EXTERNAL API IDENTICAL ACROSS ALL AUTH PROVIDERS - Features work with ANY auth system!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { authApi } from '@/lib/auth/api';
import type { User, UpdateProfileData, ChangePasswordData, AuthError } from '@/lib/auth/types';

// Get current user
export function useUser() {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: () => authApi.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

// Update user profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateProfileData) => authApi.updateProfile(data),
    onSuccess: (updatedUser: User) => {
      // Update user in cache
      queryClient.setQueryData(queryKeys.auth.user(), updatedUser);
    },
    onError: (error: AuthError) => {
      console.error('Update profile failed:', error);
    },
  });
}

// Change password
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => authApi.changePassword(data),
    onError: (error: AuthError) => {
      console.error('Change password failed:', error);
    },
  });
}

// Check if user has specific role
export function useUserRole() {
  const { data: user } = useUser();
  
  return {
    role: user?.role || null,
    hasRole: (role: string) => user?.role === role,
    hasAnyRole: (roles: string[]) => roles.includes(user?.role || ''),
  };
}

// Check if user has specific permissions
export function useUserPermissions() {
  const { data: user } = useUser();
  
  return {
    permissions: user?.permissions || [],
    hasPermission: (permission: string) => user?.permissions?.includes(permission) || false,
    hasAnyPermission: (permissions: string[]) => 
      permissions.some(permission => user?.permissions?.includes(permission) || false),
    hasAllPermissions: (permissions: string[]) => 
      permissions.every(permission => user?.permissions?.includes(permission) || false),
  };
}

// Check if user is verified
export function useUserVerification() {
  const { data: user } = useUser();
  
  return {
    isVerified: user?.emailVerified || false,
    isUnverified: !user?.emailVerified,
  };
}

// Get user avatar
export function useUserAvatar() {
  const { data: user } = useUser();
  
  return {
    avatar: user?.avatar || null,
    hasAvatar: !!user?.avatar,
    getAvatarUrl: () => user?.avatar || '/default-avatar.png',
  };
}

// Get user display name
export function useUserDisplayName() {
  const { data: user } = useUser();
  
  return {
    displayName: user?.name || user?.email || 'Anonymous',
    firstName: user?.name?.split(' ')[0] || null,
    lastName: user?.name?.split(' ').slice(1).join(' ') || null,
  };
}

// Get user email
export function useUserEmail() {
  const { data: user } = useUser();
  
  return {
    email: user?.email || null,
    hasEmail: !!user?.email,
    isEmailVerified: user?.emailVerified || false,
  };
}

// Get user creation date
export function useUserCreatedAt() {
  const { data: user } = useUser();
  
  return {
    createdAt: user?.createdAt || null,
    isNewUser: user?.createdAt ? 
      Date.now() - new Date(user.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000 : // 7 days
      false,
  };
}

// Get user last updated date
export function useUserUpdatedAt() {
  const { data: user } = useUser();
  
  return {
    updatedAt: user?.updatedAt || null,
    isRecentlyUpdated: user?.updatedAt ? 
      Date.now() - new Date(user.updatedAt).getTime() < 24 * 60 * 60 * 1000 : // 24 hours
      false,
  };
}
