/**
 * Auth Hook
 * 
 * Standardized auth hook for Better Auth
 * EXTERNAL API IDENTICAL ACROSS ALL AUTH PROVIDERS - Features work with ANY auth system!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { authApi } from '@/lib/auth/api';
import type { User, Session, AuthError } from '@/lib/auth/types';

// Main auth hook - returns user, session, and auth status
export function useAuth() {
  const queryClient = useQueryClient();
  
  // Get current user
  const userQuery = useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: () => authApi.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
  
  // Get current session
  const sessionQuery = useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: () => authApi.getSession(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
  
  const isLoading = userQuery.isLoading || sessionQuery.isLoading;
  const error = userQuery.error || sessionQuery.error;
  
  return {
    // User data
    user: userQuery.data || null,
    isUserLoading: userQuery.isLoading,
    userError: userQuery.error,
    
    // Session data
    session: sessionQuery.data || null,
    isSessionLoading: sessionQuery.isLoading,
    sessionError: sessionQuery.error,
    
    // Combined status
    isLoading,
    error,
    isAuthenticated: !!userQuery.data && !!sessionQuery.data,
    isUnauthenticated: !userQuery.data && !sessionQuery.data && !isLoading,
    
    // Actions
    refetch: () => {
      userQuery.refetch();
      sessionQuery.refetch();
    },
    
    // Invalidate auth data
    invalidate: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
    },
  };
}

// Auth status hook
export function useAuthStatus() {
  const { isAuthenticated, isLoading, error } = useAuth();
  
  return {
    isAuthenticated,
    isLoading,
    error,
    isUnauthenticated: !isAuthenticated && !isLoading,
  };
}

// Auth loading hook
export function useAuthLoading() {
  const { isLoading } = useAuth();
  
  return isLoading;
}

// Auth error hook
export function useAuthError() {
  const { error } = useAuth();
  
  return error;
}

// Check if user has specific role
export function useHasRole(role: string) {
  const { user } = useAuth();
  
  return user?.role === role;
}

// Check if user has specific permission
export function useHasPermission(permission: string) {
  const { user } = useAuth();
  
  return user?.permissions?.includes(permission) || false;
}

// Check if user has any of the specified roles
export function useHasAnyRole(roles: string[]) {
  const { user } = useAuth();
  
  return roles.includes(user?.role || '');
}

// Check if user has all of the specified permissions
export function useHasAllPermissions(permissions: string[]) {
  const { user } = useAuth();
  
  return permissions.every(permission => 
    user?.permissions?.includes(permission) || false
  );
}

// Check if user has any of the specified permissions
export function useHasAnyPermission(permissions: string[]) {
  const { user } = useAuth();
  
  return permissions.some(permission => 
    user?.permissions?.includes(permission) || false
  );
}

// Auth refresh hook
export function useAuthRefresh() {
  const { refetch } = useAuth();
  
  return {
    refresh: refetch,
  };
}
