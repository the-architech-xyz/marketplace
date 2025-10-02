/**
 * Sign Out Hook
 * 
 * Standardized sign out hook for Better Auth
 * EXTERNAL API IDENTICAL ACROSS ALL AUTH PROVIDERS - Features work with ANY auth system!
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { authApi } from '@/lib/auth/api';
import type { AuthError } from '@/lib/auth/types';

// Sign out from current session
export function useSignOut() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      // Clear all auth data from cache
      queryClient.removeQueries({ queryKey: queryKeys.auth.all() });
      
      // Clear user and session from cache
      queryClient.setQueryData(queryKeys.auth.user(), null);
      queryClient.setQueryData(queryKeys.auth.session(), null);
    },
    onError: (error: AuthError) => {
      console.error('Sign out failed:', error);
    },
  });
}

// Sign out from all sessions
export function useSignOutAll() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.signOutAll(),
    onSuccess: () => {
      // Clear all auth data from cache
      queryClient.removeQueries({ queryKey: queryKeys.auth.all() });
      
      // Clear user and session from cache
      queryClient.setQueryData(queryKeys.auth.user(), null);
      queryClient.setQueryData(queryKeys.auth.session(), null);
    },
    onError: (error: AuthError) => {
      console.error('Sign out all failed:', error);
    },
  });
}

// Sign out from specific session
export function useSignOutSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (sessionId: string) => authApi.signOutSession(sessionId),
    onSuccess: () => {
      // Invalidate auth queries to refetch current session
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.session() });
    },
    onError: (error: AuthError) => {
      console.error('Sign out session failed:', error);
    },
  });
}
