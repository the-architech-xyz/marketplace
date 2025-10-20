/**
 * Auth Hooks - Better Auth Native
 * 
 * ARCHITECTURE NOTE:
 * These hooks use Better Auth's native React hooks for optimal performance.
 * They are provided by the backend/better-auth-nextjs feature because
 * Better Auth is a full-stack SDK that handles both server AND client.
 * 
 * This file OVERWRITES generic tech-stack hooks when Better Auth is selected.
 * If you switch to a different auth provider (Supabase, Clerk, custom API),
 * those hooks will overwrite these, or fall back to tech-stack's generic hooks.
 */

// Re-export Better Auth client and native hooks
export { authClient, useSession, signIn, signUp, signOut, getSession } from './client';

// Re-export Better Auth types
export type { Session, User } from 'better-auth/types';

// Convenience wrapper hook
export const useAuth = () => {
  const session = authClient.useSession();
  
  return {
    session: session.data,
    user: session.data?.user,
    isLoading: session.isPending,
    isAuthenticated: !!session.data,
    error: session.error,
    
    // Auth methods
    signInEmail: authClient.signIn.email,
    signUpEmail: authClient.signUp.email,
    signOut: authClient.signOut,
    
    // Social auth
    signInSocial: authClient.signIn.social,
    
    // Session management
    getSession: authClient.getSession,
  };
};

// Password management hooks
export const usePassword = () => {
  return {
    forgetPassword: authClient.forgetPassword,
    resetPassword: authClient.resetPassword,
    changePassword: authClient.changePassword,
  };
};

// Two-factor authentication
export const useTwoFactor = () => {
  return {
    enable: authClient.twoFactor.enable,
    disable: authClient.twoFactor.disable,
    verify: authClient.twoFactor.verify,
  };
};

// Email verification
export const useEmailVerification = () => {
  return {
    sendVerification: authClient.emailVerification.sendVerificationEmail,
    verify: authClient.emailVerification.verifyEmail,
  };
};

// Legacy aliases for backward compatibility
export const useSocialAuth = () => ({
  signInWithGoogle: () => authClient.signIn.social({ provider: 'google' }),
  signInWithGithub: () => authClient.signIn.social({ provider: 'github' }),
});

