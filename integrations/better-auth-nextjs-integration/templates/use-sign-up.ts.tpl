/**
 * Sign Up Hook
 * 
 * Standardized sign up hook for Better Auth
 * EXTERNAL API IDENTICAL ACROSS ALL AUTH PROVIDERS - Features work with ANY auth system!
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { authApi } from '@/lib/auth/api';
import type { SignUpData, SignUpResponse, AuthError } from '@/lib/auth/types';

// Sign up with email and password
export function useSignUp() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SignUpData) => authApi.signUp(data),
    onSuccess: (response: SignUpResponse) => {
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
      console.error('Sign up failed:', error);
    },
  });
}

// Sign up with OAuth provider
export function useSignUpWithProvider() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (provider: string) => authApi.signUpWithProvider(provider),
    onSuccess: (response: SignUpResponse) => {
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
      console.error('OAuth sign up failed:', error);
    },
  });
}

// Verify email address
export function useVerifyEmail() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: (response: SignUpResponse) => {
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
      console.error('Email verification failed:', error);
    },
  });
}

// Resend verification email
export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: (email: string) => authApi.resendVerificationEmail(email),
    onError: (error: AuthError) => {
      console.error('Resend verification email failed:', error);
    },
  });
}

// Check if email is available
export function useCheckEmailAvailability() {
  return useMutation({
    mutationFn: (email: string) => authApi.checkEmailAvailability(email),
    onError: (error: AuthError) => {
      console.error('Check email availability failed:', error);
    },
  });
}

// Check if username is available
export function useCheckUsernameAvailability() {
  return useMutation({
    mutationFn: (username: string) => authApi.checkUsernameAvailability(username),
    onError: (error: AuthError) => {
      console.error('Check username availability failed:', error);
    },
  });
}
