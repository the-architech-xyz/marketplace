/**
 * useAuthentication Hook
 * 
 * Provides authentication functionality using TanStack Query.
 * This hook handles sign in, sign up, sign out, and OAuth flows.
 * 
 * Uses Better Auth client directly (Option A - simpler approach)
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth/client';
import { authKeys } from '@/lib/auth/query-keys';

export function useAuthentication() {
  const queryClient = useQueryClient();

  // Sign in with email and password
  const signIn = useMutation({
    mutationFn: async ({ 
      email, 
      password 
    }: { 
      email: string; 
      password: string;
    }) => {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      
      if (error) {
        throw new Error(error.message || 'Sign in failed');
      }
      
      return data;
    },
    
    onSuccess: (data) => {
      // ✅ Optimistic update: set session immediately
      queryClient.setQueryData(authKeys.session.get(), data.session);
      
      // ✅ Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      // ✅ Error handling (optional: show toast, etc.)
      console.error('Sign in error:', error);
    },
    
    retry: false, // ✅ Don't retry auth failures
  });

  // Sign up with email and password
  const signUp = useMutation({
    mutationFn: async ({ 
      email, 
      password, 
      name 
    }: { 
      email: string; 
      password: string; 
      name: string;
    }) => {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });
      
      if (error) {
        throw new Error(error.message || 'Sign up failed');
      }
      
      return data;
    },
    
    onSuccess: (data) => {
      // ✅ Optimistic update: set session immediately
      queryClient.setQueryData(authKeys.session.get(), data.session);
      
      // ✅ Invalidate to refetch fresh data
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('Sign up error:', error);
    },
    
    retry: false,
  });

  // Sign out
  const signOut = useMutation({
    mutationFn: async () => {
      await authClient.signOut();
    },
    
    onSuccess: () => {
      // ✅ Clear all auth cache
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
    
    onError: (error) => {
      console.error('Sign out error:', error);
    },
  });

  // OAuth sign in
  const signInWithProvider = useMutation({
    mutationFn: async ({ 
      provider 
    }: { 
      provider: 'google' | 'github' | 'discord';
    }) => {
      await authClient.signIn.social({ provider });
    },
    
    onSuccess: () => {
      // ✅ OAuth typically redirects, so invalidate session
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('OAuth sign in error:', error);
    },
  });

  // Magic link sign in
  const sendMagicLink = useMutation({
    mutationFn: async ({ 
      email 
    }: { 
      email: string;
    }) => {
      const { error } = await authClient.signIn.magicLink({ email });
      
      if (error) {
        throw new Error(error.message || 'Failed to send magic link');
      }
    },
    
    onError: (error) => {
      console.error('Magic link error:', error);
    },
  });

  return {
    // Mutations
    signIn,
    signUp,
    signOut,
    signInWithProvider,
    sendMagicLink,
    
    // Convenience methods
    signInWithEmail: signIn.mutate,
    signUpWithEmail: signUp.mutate,
    signOutUser: signOut.mutate,
    signInWithGoogle: () => signInWithProvider.mutate({ provider: 'google' }),
    signInWithGithub: () => signInWithProvider.mutate({ provider: 'github' }),
    sendMagicLinkToEmail: sendMagicLink.mutate,
    
    // Loading states
    isSigningIn: signIn.isPending,
    isSigningUp: signUp.isPending,
    isSigningOut: signOut.isPending,
    isOAuthSigningIn: signInWithProvider.isPending,
    isSendingMagicLink: sendMagicLink.isPending,
    
    // Error states
    signInError: signIn.error,
    signUpError: signUp.error,
    signOutError: signOut.error,
    oAuthError: signInWithProvider.error,
    magicLinkError: sendMagicLink.error,
  };
}
