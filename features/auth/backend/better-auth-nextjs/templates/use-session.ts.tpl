/**
 * Session Hook
 * 
 * Standardized session hook for Better Auth
 * EXTERNAL API IDENTICAL ACROSS ALL AUTH PROVIDERS - Features work with ANY auth system!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { authApi } from '@/lib/auth/api';
import type { Session, AuthError } from '@/lib/auth/types';

// Get current session
export function useSession() {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: () => authApi.getSession(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

// Check if session is valid
export function useSessionValid() {
  const { data: session, isLoading, error } = useSession();
  
  return {
    isValid: !!session && !error,
    isInvalid: !session || !!error,
    isLoading,
    error,
  };
}

// Check if session is expired
export function useSessionExpired() {
  const { data: session } = useSession();
  
  if (!session) {
    return { isExpired: false, expiresAt: null, timeUntilExpiry: null };
  }
  
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  const isExpired = now > expiresAt;
  const timeUntilExpiry = isExpired ? 0 : expiresAt.getTime() - now.getTime();
  
  return {
    isExpired,
    expiresAt,
    timeUntilExpiry,
  };
}

// Check if session is about to expire
export function useSessionExpiring() {
  const { data: session } = useSession();
  
  if (!session) {
    return { isExpiring: false, expiresAt: null, timeUntilExpiry: null };
  }
  
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  const timeUntilExpiry = expiresAt.getTime() - now.getTime();
  const isExpiring = timeUntilExpiry > 0 && timeUntilExpiry < 5 * 60 * 1000; // 5 minutes
  
  return {
    isExpiring,
    expiresAt,
    timeUntilExpiry,
  };
}

// Get session token
export function useSessionToken() {
  const { data: session } = useSession();
  
  return {
    token: session?.token || null,
    hasToken: !!session?.token,
  };
}

// Get session ID
export function useSessionId() {
  const { data: session } = useSession();
  
  return {
    sessionId: session?.id || null,
    hasSessionId: !!session?.id,
  };
}

// Get session creation date
export function useSessionCreatedAt() {
  const { data: session } = useSession();
  
  return {
    createdAt: session?.createdAt || null,
    isNewSession: session?.createdAt ? 
      Date.now() - new Date(session.createdAt).getTime() < 60 * 1000 : // 1 minute
      false,
  };
}

// Get session last updated date
export function useSessionUpdatedAt() {
  const { data: session } = useSession();
  
  return {
    updatedAt: session?.updatedAt || null,
    isRecentlyUpdated: session?.updatedAt ? 
      Date.now() - new Date(session.updatedAt).getTime() < 5 * 60 * 1000 : // 5 minutes
      false,
  };
}

// Refresh session
export function useRefreshSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.getSession(),
    onSuccess: (newSession: Session) => {
      // Update session in cache
      queryClient.setQueryData(queryKeys.auth.session(), newSession);
    },
    onError: (error: AuthError) => {
      console.error('Refresh session failed:', error);
    },
  });
}

// Extend session
export function useExtendSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.getSession(), // This would be a different API call in real implementation
    onSuccess: (newSession: Session) => {
      // Update session in cache
      queryClient.setQueryData(queryKeys.auth.session(), newSession);
    },
    onError: (error: AuthError) => {
      console.error('Extend session failed:', error);
    },
  });
}

// Get session duration
export function useSessionDuration() {
  const { data: session } = useSession();
  
  if (!session) {
    return { duration: 0, durationMinutes: 0, durationHours: 0 };
  }
  
  const now = new Date();
  const createdAt = new Date(session.createdAt);
  const duration = now.getTime() - createdAt.getTime();
  const durationMinutes = Math.floor(duration / (1000 * 60));
  const durationHours = Math.floor(durationMinutes / 60);
  
  return {
    duration,
    durationMinutes,
    durationHours,
  };
}

// Get session time remaining
export function useSessionTimeRemaining() {
  const { data: session } = useSession();
  
  if (!session) {
    return { timeRemaining: 0, timeRemainingMinutes: 0, timeRemainingHours: 0 };
  }
  
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  const timeRemaining = expiresAt.getTime() - now.getTime();
  const timeRemainingMinutes = Math.floor(timeRemaining / (1000 * 60));
  const timeRemainingHours = Math.floor(timeRemainingMinutes / 60);
  
  return {
    timeRemaining: Math.max(0, timeRemaining),
    timeRemainingMinutes: Math.max(0, timeRemainingMinutes),
    timeRemainingHours: Math.max(0, timeRemainingHours),
  };
}
