/**
 * Sign In Hook
 * 
 * Standardized sign in hook for Better Auth
 * EXTERNAL API IDENTICAL ACROSS ALL AUTH PROVIDERS - Features work with ANY auth system!
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { authApi } from '@/lib/auth/api';
import type { SignInData, SignInResponse, AuthError } from '@/lib/auth/types';

// Sign in with email and password
export function useSignIn() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SignInData) => authApi.signIn(data),
    onSuccess: (response: SignInResponse) => {
      // Invalidate auth queries to refetch user and session
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      
      // Set user and session in cache
      if (response.user) {
        queryClient.setQueryData(queryKeys.auth.user(), response.user);
      }
      if (response.session) {
        queryClient.setQueryData(queryKeys.auth.session(), response.session);
      }
    },
    onError: (error: AuthError) => {
      console.error('Sign in failed:', error);
    },
  });
}

// Sign in with OAuth provider
export function useSignInWithProvider() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (provider: string) => authApi.signInWithProvider(provider),
    onSuccess: (response: SignInResponse) => {
      // Invalidate auth queries to refetch user and session
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      
      // Set user and session in cache
      if (response.user) {
        queryClient.setQueryData(queryKeys.auth.user(), response.user);
      }
      if (response.session) {
        queryClient.setQueryData(queryKeys.auth.session(), response.session);
      }
    },
    onError: (error: AuthError) => {
      console.error('OAuth sign in failed:', error);
    },
  });
}

// Sign in with magic link
export function useSignInWithMagicLink() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (email: string) => authApi.signInWithMagicLink(email),
    onSuccess: (response: SignInResponse) => {
      // Invalidate auth queries to refetch user and session
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      
      // Set user and session in cache
      if (response.user) {
        queryClient.setQueryData(queryKeys.auth.user(), response.user);
      }
      if (response.session) {
        queryClient.setQueryData(queryKeys.auth.session(), response.session);
      }
    },
    onError: (error: AuthError) => {
      console.error('Magic link sign in failed:', error);
    },
  });
}

// Sign in with phone number
export function useSignInWithPhone() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (phone: string) => authApi.signInWithPhone(phone),
    onSuccess: (response: SignInResponse) => {
      // Invalidate auth queries to refetch user and session
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      
      // Set user and session in cache
      if (response.user) {
        queryClient.setQueryData(queryKeys.auth.user(), response.user);
      }
      if (response.session) {
        queryClient.setQueryData(queryKeys.auth.session(), response.session);
      }
    },
    onError: (error: AuthError) => {
      console.error('Phone sign in failed:', error);
    },
  });
}

// Verify OTP for phone sign in
export function useVerifyOTP() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) => 
      authApi.verifyOTP(phone, otp),
    onSuccess: (response: SignInResponse) => {
      // Invalidate auth queries to refetch user and session
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all() });
      
      // Set user and session in cache
      if (response.user) {
        queryClient.setQueryData(queryKeys.auth.user(), response.user);
      }
      if (response.session) {
        queryClient.setQueryData(queryKeys.auth.session(), response.session);
      }
    },
    onError: (error: AuthError) => {
      console.error('OTP verification failed:', error);
    },
  });
}

// Resend OTP
export function useResendOTP() {
  return useMutation({
    mutationFn: (phone: string) => authApi.resendOTP(phone),
    onError: (error: AuthError) => {
      console.error('Resend OTP failed:', error);
    },
  });
}
