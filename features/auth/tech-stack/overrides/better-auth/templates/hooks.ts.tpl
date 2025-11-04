/**
 * Better Auth SDK Hooks
 * 
 * ARCHITECTURE NOTE:
 * These hooks use Better Auth SDK instead of TanStack Query
 * Same interface as standard hooks, Better Auth implementation
 */

import { 
  useSession as useBetterAuthSession,
  useSignIn as useBetterAuthSignIn,
  useSignOut as useBetterAuthSignOut,
  useSignUp as useBetterAuthSignUp,
  useUpdateUser as useBetterAuthUpdateUser,
  useChangePassword as useBetterAuthChangePassword
} from 'better-auth/react';

// ============================================================================
// SESSION HOOKS
// ============================================================================

/**
 * Get current session (Better Auth SDK)
 */
export const useSession = (options?: any) => {
  const { data: session, isLoading, error } = useBetterAuthSession();
  
  return {
    data: session,
    isLoading,
    error,
    isAuthenticated: !!session?.user
  };
};

// ============================================================================
// AUTHENTICATION HOOKS
// ============================================================================

/**
 * Sign in with email/password (Better Auth SDK)
 */
export const useSignIn = (options?: any) => {
  const { signIn, isLoading, error } = useBetterAuthSignIn();
  
  const mutate = async (credentials: { email: string; password: string }) => {
    return signIn({
      email: credentials.email,
      password: credentials.password,
      provider: 'credentials'
    });
  };

  return {
    mutate,
    isLoading,
    error
  };
};

/**
 * Sign up with email/password (Better Auth SDK)
 */
export const useSignUp = (options?: any) => {
  const { signUp, isLoading, error } = useBetterAuthSignUp();
  
  const mutate = async (data: { email: string; password: string; name: string }) => {
    return signUp({
      email: data.email,
      password: data.password,
      name: data.name
    });
  };

  return {
    mutate,
    isLoading,
    error
  };
};

/**
 * Sign out (Better Auth SDK)
 */
export const useSignOut = (options?: any) => {
  const { signOut, isLoading, error } = useBetterAuthSignOut();
  
  const mutate = async () => {
    return signOut();
  };

  return {
    mutate,
    isLoading,
    error
  };
};

// ============================================================================
// SOCIAL AUTHENTICATION HOOKS
// ============================================================================

/**
 * Sign in with GitHub (Better Auth SDK)
 */
export const useSignInWithGitHub = (options?: any) => {
  const { signIn, isLoading, error } = useBetterAuthSignIn();
  
  const mutate = async () => {
    return signIn({ provider: 'github' });
  };

  return {
    mutate,
    isLoading,
    error
  };
};

/**
 * Sign in with Google (Better Auth SDK)
 */
export const useSignInWithGoogle = (options?: any) => {
  const { signIn, isLoading, error } = useBetterAuthSignIn();
  
  const mutate = async () => {
    return signIn({ provider: 'google' });
  };

  return {
    mutate,
    isLoading,
    error
  };
};

// ============================================================================
// USER MANAGEMENT HOOKS
// ============================================================================

/**
 * Update user profile (Better Auth SDK)
 */
export const useUpdateProfile = (options?: any) => {
  const { updateUser, isLoading, error } = useBetterAuthUpdateUser();
  
  const mutate = async (data: { name?: string; email?: string }) => {
    return updateUser(data);
  };

  return {
    mutate,
    isLoading,
    error
  };
};

/**
 * Change password (Better Auth SDK)
 */
export const useChangePassword = (options?: any) => {
  const { changePassword, isLoading, error } = useBetterAuthChangePassword();
  
  const mutate = async (data: { currentPassword: string; newPassword: string }) => {
    return changePassword(data);
  };

  return {
    mutate,
    isLoading,
    error
  };
};
