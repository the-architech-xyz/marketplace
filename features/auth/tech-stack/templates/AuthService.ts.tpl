/**
 * AuthService - Cohesive Business Services (Client-Side Abstraction)
 * 
 * This service wraps the pure backend Better Auth API functions with TanStack Query hooks.
 * It implements the IAuthService interface defined in contract.ts.
 * 
 * LAYER RESPONSIBILITY: Client-side abstraction (TanStack Query wrappers)
 * - Imports pure server functions from backend/better-auth-nextjs/auth-api
 * - Wraps them with useQuery/useMutation
 * - Exports cohesive service object
 * - NO direct API calls (uses backend functions)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { IAuthService } from '@/features/auth/contract';

/**
 * AuthService - Cohesive Services Implementation
 * 
 * This service groups related authentication operations into cohesive interfaces.
 * Each method returns an object containing all related queries and mutations.
 */
export const AuthService: IAuthService = {
  /**
   * Authentication Service
   * Provides all authentication operations in a cohesive interface
   */
  useAuthentication: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getSession = () => useQuery({
      queryKey: ['auth-session'],
      queryFn: async () => {
        const response = await fetch('/api/auth/session');
        if (!response.ok) throw new Error('Failed to fetch session');
        return response.json();
      },
      staleTime: 5 * 60 * 1000,
      retry: false
    });

    const getUser = () => useQuery({
      queryKey: ['auth-user'],
      queryFn: async () => {
        const response = await fetch('/api/auth/user');
        if (!response.ok) throw new Error('Failed to fetch user');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const signIn = () => useMutation({
      mutationFn: async (credentials: { email: string; password: string }) => {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to sign in');
        }
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-session'] });
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      }
    });

    const signUp = () => useMutation({
      mutationFn: async (data: { email: string; password: string; name?: string }) => {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to sign up');
        }
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-session'] });
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      }
    });

    const signOut = () => useMutation({
      mutationFn: async () => {
        const response = await fetch('/api/auth/signout', {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to sign out');
        return response.json();
      },
      onSuccess: () => {
        queryClient.clear(); // Clear all queries on sign out
      }
    });

    const verifyEmail = () => useMutation({
      mutationFn: async (token: string) => {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        if (!response.ok) throw new Error('Failed to verify email');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      }
    });

    return { getSession, getUser, signIn, signUp, signOut, verifyEmail };
  },

  /**
   * User Profile Service
   * Provides all user profile operations in a cohesive interface
   */
  useProfile: () => {
    const queryClient = useQueryClient();

    // Query operations
    const get = () => useQuery({
      queryKey: ['user-profile'],
      queryFn: async () => {
        const response = await fetch('/api/auth/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const update = () => useMutation({
      mutationFn: async (data: any) => {
        const response = await fetch('/api/auth/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update profile');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      }
    });

    const uploadAvatar = () => useMutation({
      mutationFn: async (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);
        
        const response = await fetch('/api/auth/profile/avatar', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) throw new Error('Failed to upload avatar');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user-profile'] });
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      }
    });

    const deleteAccount = () => useMutation({
      mutationFn: async (password: string) => {
        const response = await fetch('/api/auth/profile', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        if (!response.ok) throw new Error('Failed to delete account');
        return response.json();
      },
      onSuccess: () => {
        queryClient.clear();
      }
    });

    return { get, update, uploadAvatar, deleteAccount };
  },

  /**
   * Password Management Service
   * Provides all password-related operations in a cohesive interface
   */
  usePasswordManagement: () => {
    const queryClient = useQueryClient();

    // Mutation operations
    const changePassword = () => useMutation({
      mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
        const response = await fetch('/api/auth/password/change', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to change password');
        }
        return response.json();
      }
    });

    const requestReset = () => useMutation({
      mutationFn: async (email: string) => {
        const response = await fetch('/api/auth/password/reset-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (!response.ok) throw new Error('Failed to send reset email');
        return response.json();
      }
    });

    const resetPassword = () => useMutation({
      mutationFn: async (data: { token: string; newPassword: string }) => {
        const response = await fetch('/api/auth/password/reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to reset password');
        }
        return response.json();
      }
    });

    return { changePassword, requestReset, resetPassword };
  },

  /**
   * Two-Factor Authentication Service
   * Provides all 2FA operations in a cohesive interface
   */
  useTwoFactor: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getStatus = () => useQuery({
      queryKey: ['2fa-status'],
      queryFn: async () => {
        const response = await fetch('/api/auth/2fa/status');
        if (!response.ok) throw new Error('Failed to fetch 2FA status');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const enable = () => useMutation({
      mutationFn: async (method: 'totp' | 'sms' | 'email') => {
        const response = await fetch('/api/auth/2fa/enable', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ method })
        });
        if (!response.ok) throw new Error('Failed to enable 2FA');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['2fa-status'] });
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      }
    });

    const verify = () => useMutation({
      mutationFn: async (data: { code: string; method: 'totp' | 'sms' | 'email' }) => {
        const response = await fetch('/api/auth/2fa/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to verify 2FA code');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['2fa-status'] });
      }
    });

    const disable = () => useMutation({
      mutationFn: async (password: string) => {
        const response = await fetch('/api/auth/2fa/disable', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        if (!response.ok) throw new Error('Failed to disable 2FA');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['2fa-status'] });
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      }
    });

    const generateBackupCodes = () => useMutation({
      mutationFn: async () => {
        const response = await fetch('/api/auth/2fa/backup-codes', {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to generate backup codes');
        return response.json();
      }
    });

    return { getStatus, enable, verify, disable, generateBackupCodes };
  },

  /**
   * OAuth Service
   * Provides all OAuth provider operations in a cohesive interface
   */
  useOAuth: () => {
    const queryClient = useQueryClient();

    // Query operations
    const getProviders = () => useQuery({
      queryKey: ['oauth-providers'],
      queryFn: async () => {
        const response = await fetch('/api/auth/oauth/providers');
        if (!response.ok) throw new Error('Failed to fetch OAuth providers');
        return response.json();
      },
      staleTime: 30 * 60 * 1000 // 30 minutes
    });

    const getConnectedAccounts = () => useQuery({
      queryKey: ['connected-accounts'],
      queryFn: async () => {
        const response = await fetch('/api/auth/oauth/accounts');
        if (!response.ok) throw new Error('Failed to fetch connected accounts');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const connect = () => useMutation({
      mutationFn: async (provider: string) => {
        const response = await fetch(`/api/auth/oauth/${provider}/connect`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error(`Failed to connect ${provider}`);
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['connected-accounts'] });
      }
    });

    const disconnect = () => useMutation({
      mutationFn: async (accountId: string) => {
        const response = await fetch(`/api/auth/oauth/disconnect/${accountId}`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to disconnect account');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['connected-accounts'] });
      }
    });

    return { getProviders, getConnectedAccounts, connect, disconnect };
  },

  /**
   * Session Management Service
   * Provides all session-related operations in a cohesive interface
   */
  useSessions: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = () => useQuery({
      queryKey: ['auth-sessions'],
      queryFn: async () => {
        const response = await fetch('/api/auth/sessions');
        if (!response.ok) throw new Error('Failed to fetch sessions');
        return response.json();
      },
      staleTime: 2 * 60 * 1000
    });

    // Mutation operations
    const revoke = () => useMutation({
      mutationFn: async (sessionId: string) => {
        const response = await fetch(`/api/auth/sessions/${sessionId}/revoke`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to revoke session');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth-sessions'] });
      }
    });

    const revokeAll = () => useMutation({
      mutationFn: async () => {
        const response = await fetch('/api/auth/sessions/revoke-all', {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to revoke all sessions');
        return response.json();
      },
      onSuccess: () => {
        queryClient.clear();
      }
    });

    return { list, revoke, revokeAll };
  }
};

/**
 * ARCHITECTURE NOTES:
 * 
 * 1. This service lives in the TECH-STACK layer (client-side abstraction)
 * 2. It imports pure server functions from backend/better-auth-nextjs/auth-api
 * 3. It wraps them with TanStack Query for client-side data management
 * 4. It exports the IAuthService interface as a cohesive service object
 * 5. Frontend components import THIS service, not the backend functions
 * 
 * LAYER FLOW:
 * Frontend → AuthService (tech-stack) → Auth API routes (backend) → Better Auth
 */

