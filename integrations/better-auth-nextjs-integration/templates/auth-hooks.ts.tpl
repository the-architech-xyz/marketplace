/**
 * Streamlined Auth Hooks
 * 
 * Granular, action-oriented hooks for Better Auth
 * Each hook has a single responsibility and clear purpose
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { authApi } from '@/lib/auth/api';
import type { User, Session, AuthError, SignInData, SignUpData } from '@/lib/auth/types';

// ============================================================================
// SESSION HOOKS
// ============================================================================

/**
 * Main session hook - returns current session state
 */
export function useAuthSession() {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: () => authApi.getSession(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

/**
 * Current user hook - returns user data
 */
export function useUser() {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: () => authApi.getCurrentUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

// ============================================================================
// AUTHENTICATION MUTATIONS
// ============================================================================

/**
 * Sign in mutation
 */
export function useSignIn() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SignInData) => authApi.signIn(data),
    onSuccess: () => {
      // Invalidate all auth queries on successful sign in
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
    },
  });
}

/**
 * Sign up mutation
 */
export function useSignUp() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SignUpData) => authApi.signUp(data),
    onSuccess: () => {
      // Invalidate all auth queries on successful sign up
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
    },
  });
}

/**
 * Sign out mutation
 */
export function useSignOut() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      // Clear all auth data on sign out
      queryClient.setQueryData(queryKeys.auth.user(), null);
      queryClient.setQueryData(queryKeys.auth.session(), null);
    },
  });
}

// ============================================================================
// OAUTH HOOKS
// ============================================================================

/**
 * OAuth sign in mutation
 */
export function useOAuthSignIn() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (provider: string) => authApi.oauthSignIn(provider),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
    },
  });
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Check if user is authenticated
 */
export function useIsAuthenticated() {
  const { data: session } = useAuthSession();
  const { data: user } = useUser();
  
  return !!(session && user);
}

/**
 * Check if auth is loading
 */
export function useAuthLoading() {
  const { isLoading: sessionLoading } = useAuthSession();
  const { isLoading: userLoading } = useUser();
  
  return sessionLoading || userLoading;
}

/**
 * Get auth error
 */
export function useAuthError() {
  const { error: sessionError } = useAuthSession();
  const { error: userError } = useUser();
  
  return sessionError || userError;
}

/**
 * Refresh auth data
 */
export function useAuthRefresh() {
  const queryClient = useQueryClient();
  
  return {
    refresh: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
    },
  };
}

// ============================================================================
// PERMISSION HOOKS (Optional - only if needed)
// ============================================================================

/**
 * Check if user has specific role
 */
export function useHasRole(role: string) {
  const { data: user } = useUser();
  return user?.role === role;
}

/**
 * Check if user has specific permission
 */
export function useHasPermission(permission: string) {
  const { data: user } = useUser();
  return user?.permissions?.includes(permission) || false;
}
