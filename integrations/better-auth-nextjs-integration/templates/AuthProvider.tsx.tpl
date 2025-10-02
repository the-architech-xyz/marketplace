/**
 * Auth Provider
 * 
 * React context provider for authentication using Better Auth
 * EXTERNAL API IDENTICAL ACROSS ALL AUTH PROVIDERS - Features work with ANY auth system!
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { authApi } from '@/lib/auth/api';
import type { 
  AuthContextValue, 
  User, 
  Session, 
  SignInData, 
  SignUpData, 
  SignInResponse, 
  SignUpResponse,
  AuthError 
} from '@/lib/auth/types';

// Create auth context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

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

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to get user and session
        await Promise.all([
          userQuery.refetch(),
          sessionQuery.refetch(),
        ]);
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Sign in function
  const signIn = async (data: SignInData): Promise<SignInResponse> => {
    try {
      const response = await authApi.signIn(data);
      
      // Invalidate auth queries to refetch user and session
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      
      // Set user and session in cache
      if (response.user) {
        queryClient.setQueryData(queryKeys.auth.user(), response.user);
      }
      if (response.session) {
        queryClient.setQueryData(queryKeys.auth.session(), response.session);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Sign up function
  const signUp = async (data: SignUpData): Promise<SignUpResponse> => {
    try {
      const response = await authApi.signUp(data);
      
      // Invalidate auth queries to refetch user and session
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      
      // Set user and session in cache
      if (response.user) {
        queryClient.setQueryData(queryKeys.auth.user(), response.user);
      }
      if (response.session) {
        queryClient.setQueryData(queryKeys.auth.session(), response.session);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      await authApi.signOut();
      
      // Clear all auth data from cache
      queryClient.removeQueries({ queryKey: queryKeys.auth.all() });
      
      // Clear user and session from cache
      queryClient.setQueryData(queryKeys.auth.user(), null);
      queryClient.setQueryData(queryKeys.auth.session(), null);
    } catch (error) {
      throw error;
    }
  };

  // Refresh function
  const refresh = async (): Promise<void> => {
    try {
      // Refetch user and session
      await Promise.all([
        userQuery.refetch(),
        sessionQuery.refetch(),
      ]);
    } catch (error) {
      throw error;
    }
  };

  // Get auth context value
  const contextValue: AuthContextValue = {
    user: userQuery.data || null,
    session: sessionQuery.data || null,
    isAuthenticated: !!userQuery.data && !!sessionQuery.data,
    isLoading: userQuery.isLoading || sessionQuery.isLoading || !isInitialized,
    error: userQuery.error || sessionQuery.error || null,
    signIn,
    signUp,
    signOut,
    refresh,
  };

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
}

// Hook to check if user is authenticated
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated;
}

// Hook to get current user
export function useCurrentUser(): User | null {
  const { user } = useAuthContext();
  return user;
}

// Hook to get current session
export function useCurrentSession(): Session | null {
  const { session } = useAuthContext();
  return session;
}

// Hook to check if auth is loading
export function useIsAuthLoading(): boolean {
  const { isLoading } = useAuthContext();
  return isLoading;
}

// Hook to get auth error
export function useAuthError(): AuthError | null {
  const { error } = useAuthContext();
  return error;
}

// Hook to get auth actions
export function useAuthActions() {
  const { signIn, signUp, signOut, refresh } = useAuthContext();
  
  return {
    signIn,
    signUp,
    signOut,
    refresh,
  };
}

// Auth guard component
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: string;
  requirePermission?: string;
  requireAnyRole?: string[];
  requireAnyPermission?: string[];
  requireAllPermissions?: string[];
}

export function AuthGuard({
  children,
  fallback,
  requireAuth = true,
  requireRole,
  requirePermission,
  requireAnyRole,
  requireAnyPermission,
  requireAllPermissions,
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return fallback || <div>Please sign in to access this content.</div>;
  }
  
  // Check role requirement
  if (requireRole && user?.role !== requireRole) {
    return fallback || <div>You don't have the required role to access this content.</div>;
  }
  
  // Check any role requirement
  if (requireAnyRole && !requireAnyRole.includes(user?.role || '')) {
    return fallback || <div>You don't have any of the required roles to access this content.</div>;
  }
  
  // Check permission requirement
  if (requirePermission && !user?.permissions?.includes(requirePermission)) {
    return fallback || <div>You don't have the required permission to access this content.</div>;
  }
  
  // Check any permission requirement
  if (requireAnyPermission && !requireAnyPermission.some(permission => 
    user?.permissions?.includes(permission) || false
  )) {
    return fallback || <div>You don't have any of the required permissions to access this content.</div>;
  }
  
  // Check all permissions requirement
  if (requireAllPermissions && !requireAllPermissions.every(permission => 
    user?.permissions?.includes(permission) || false
  )) {
    return fallback || <div>You don't have all the required permissions to access this content.</div>;
  }
  
  return <>{children}</>;
}
