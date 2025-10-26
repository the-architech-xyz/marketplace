/**
 * Better Auth Hooks
 * 
 * Framework-agnostic Better Auth React hooks.
 * Works with Next.js, Remix, Expo, etc.
 */

import { useSession, useSignIn, useSignOut, useSignUp } from 'better-auth/react';
import { authClient } from './client';

/**
 * Use Better Auth session
 */
export function useAuth() {
  const { data: session, isPending, error } = useSession();
  
  return {
    user: session?.user || null,
    isLoading: isPending,
    error,
    isAuthenticated: !!session?.user,
  };
}

/**
 * Use Better Auth sign in
 */
export function useSignInMutation() {
  const { signIn, isPending, error } = useSignIn();
  
  return {
    signIn: async (email: string, password: string) => {
      return signIn.email({
        email,
        password,
      });
    },
    isLoading: isPending,
    error,
  };
}

/**
 * Use Better Auth sign up
 */
export function useSignUpMutation() {
  const { signUp, isPending, error } = useSignUp();
  
  return {
    signUp: async (email: string, password: string, name?: string) => {
      return signUp.email({
        email,
        password,
        name,
      });
    },
    isLoading: isPending,
    error,
  };
}

/**
 * Use Better Auth sign out
 */
export function useSignOutMutation() {
  const { signOut, isPending, error } = useSignOut();
  
  return {
    signOut: async () => {
      return signOut();
    },
    isLoading: isPending,
    error,
  };
}

/**
 * Use Better Auth OAuth sign in
 */
export function useOAuthSignIn() {
  const { signIn, isPending, error } = useSignIn();
  
  return {
    signInWithGoogle: async () => {
      return signIn.social({
        provider: 'google',
      });
    },
    signInWithGitHub: async () => {
      return signIn.social({
        provider: 'github',
      });
    },
    isLoading: isPending,
    error,
  };
}

/**
 * Use Better Auth magic link
 */
export function useMagicLinkSignIn() {
  const { signIn, isPending, error } = useSignIn();
  
  return {
    signInWithMagicLink: async (email: string) => {
      return signIn.magicLink({
        email,
      });
    },
    isLoading: isPending,
    error,
  };
}
