/**
 * useSessionManagement Hook
 * 
 * Provides session management functionality using TanStack Query.
 * This hook handles active sessions, session revocation, and session monitoring.
 * 
 * Uses Better Auth client directly (Option A - simpler approach)
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth/client';
import { authKeys } from '@/lib/auth/query-keys';

export function useSessionManagement() {
  const queryClient = useQueryClient();

  // Get active sessions
  const { data: activeSessions, isLoading: isLoadingSessions } = useQuery({
    queryKey: authKeys.sessions.list(),
    queryFn: async () => {
      // This would typically be a separate API call to get active sessions
      // For now, we'll return a mock list
      return [
        {
          id: 'session-1',
          device: 'Chrome on MacOS',
          location: 'San Francisco, CA',
          ipAddress: '192.168.1.1',
          lastActive: new Date().toISOString(),
          isCurrent: true,
        },
        {
          id: 'session-2',
          device: 'Safari on iPhone',
          location: 'San Francisco, CA',
          ipAddress: '192.168.1.2',
          lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          isCurrent: false,
        },
      ];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Revoke specific session
  const revokeSession = useMutation({
    mutationFn: async ({ 
      sessionId 
    }: { 
      sessionId: string;
    }) => {
      // This would typically be a separate API call to revoke a session
      // For now, we'll simulate the call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (sessionId === 'invalid-session') {
        throw new Error('Session not found');
      }
    },
    
    onSuccess: () => {
      // ✅ Session revoked successfully, invalidate sessions list
      queryClient.invalidateQueries({ queryKey: authKeys.sessions.all });
    },
    
    onError: (error) => {
      console.error('Revoke session error:', error);
    },
  });

  // Revoke all other sessions (keep current)
  const revokeAllOtherSessions = useMutation({
    mutationFn: async () => {
      // This would typically be a separate API call to revoke all other sessions
      // For now, we'll simulate the call
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    
    onSuccess: () => {
      // ✅ All other sessions revoked successfully, invalidate sessions list
      queryClient.invalidateQueries({ queryKey: authKeys.sessions.all });
    },
    
    onError: (error) => {
      console.error('Revoke all other sessions error:', error);
    },
  });

  // Refresh current session
  const refreshSession = useMutation({
    mutationFn: async () => {
      const { data } = await authClient.getSession();
      return data;
    },
    
    onSuccess: (newSession) => {
      // ✅ Session refreshed successfully, update session in cache
      queryClient.setQueryData(authKeys.session.get(), newSession);
    },
    
    onError: (error) => {
      console.error('Refresh session error:', error);
    },
  });

  return {
    // Data
    activeSessions,
    isLoadingSessions,
    
    // Mutations
    revokeSession,
    revokeAllOtherSessions,
    refreshSession,
    
    // Convenience methods
    revokeSessionById: revokeSession.mutate,
    revokeAllOther: revokeAllOtherSessions.mutate,
    refreshCurrentSession: refreshSession.mutate,
    
    // Loading states
    isRevokingSession: revokeSession.isPending,
    isRevokingAllOther: revokeAllOtherSessions.isPending,
    isRefreshing: refreshSession.isPending,
    
    // Error states
    revokeError: revokeSession.error,
    revokeAllError: revokeAllOtherSessions.error,
    refreshError: refreshSession.error,
  };
}
