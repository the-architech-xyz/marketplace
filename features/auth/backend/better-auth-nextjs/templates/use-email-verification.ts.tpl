/**
 * useEmailVerification Hook
 * 
 * Provides email verification functionality using TanStack Query.
 * This hook handles email verification, resend verification, and change email flows.
 * 
 * Uses Better Auth client directly (Option A - simpler approach)
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth/client';
import { authKeys } from '@/lib/auth/query-keys';

export function useEmailVerification() {
  const queryClient = useQueryClient();

  // Send verification email
  const sendVerificationEmail = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.sendVerificationEmail();
      
      if (error) {
        throw new Error(error.message || 'Failed to send verification email');
      }
    },
    
    onError: (error) => {
      console.error('Send verification email error:', error);
    },
  });

  // Verify email with token
  const verifyEmail = useMutation({
    mutationFn: async ({ 
      token 
    }: { 
      token: string;
    }) => {
      const { error } = await authClient.verifyEmail({ token });
      
      if (error) {
        throw new Error(error.message || 'Invalid verification token');
      }
    },
    
    onSuccess: () => {
      // ✅ Email verified successfully, invalidate session to refresh
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('Verify email error:', error);
    },
  });

  // Change email address
  const changeEmail = useMutation({
    mutationFn: async ({ 
      newEmail 
    }: { 
      newEmail: string;
    }) => {
      const { error } = await authClient.changeEmail({ newEmail });
      
      if (error) {
        throw new Error(error.message || 'Failed to change email');
      }
    },
    
    onSuccess: () => {
      // ✅ Email changed successfully, invalidate session to refresh
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('Change email error:', error);
    },
  });

  // Get email verification status
  const { data: emailStatus, isLoading: isLoadingStatus } = useQuery({
    queryKey: authKeys.email.verification(),
    queryFn: async () => {
      // This would typically be a separate API call to check email verification status
      // For now, we'll return a mock status
      return {
        verified: false,
        email: '',
        lastVerificationSent: null,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    // Mutations
    sendVerificationEmail,
    verifyEmail,
    changeEmail,
    
    // Convenience methods
    resendVerification: sendVerificationEmail.mutate,
    verifyEmailWithToken: verifyEmail.mutate,
    updateEmailAddress: changeEmail.mutate,
    
    // Loading states
    isSendingVerification: sendVerificationEmail.isPending,
    isVerifying: verifyEmail.isPending,
    isChangingEmail: changeEmail.isPending,
    isLoadingStatus,
    
    // Error states
    sendError: sendVerificationEmail.error,
    verifyError: verifyEmail.error,
    changeError: changeEmail.error,
    
    // Data
    emailStatus,
  };
}
