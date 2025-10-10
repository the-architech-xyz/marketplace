/**
 * usePassword Hook
 * 
 * Provides password management functionality using TanStack Query.
 * This hook handles password reset, change password, and forgot password flows.
 * 
 * Uses Better Auth client directly (Option A - simpler approach)
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth/client';
import { authKeys } from '@/lib/auth/query-keys';

export function usePassword() {
  const queryClient = useQueryClient();

  // Forgot password (request reset)
  const forgotPassword = useMutation({
    mutationFn: async ({ 
      email 
    }: { 
      email: string;
    }) => {
      const { error } = await authClient.forgetPassword({ email });
      
      if (error) {
        throw new Error(error.message || 'Failed to send password reset email');
      }
    },
    
    onError: (error) => {
      console.error('Forgot password error:', error);
    },
  });

  // Reset password (with token)
  const resetPassword = useMutation({
    mutationFn: async ({ 
      token, 
      newPassword 
    }: { 
      token: string; 
      newPassword: string;
    }) => {
      const { error } = await authClient.resetPassword({ 
        token, 
        newPassword 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to reset password');
      }
    },
    
    onSuccess: () => {
      // ✅ Password reset successful, invalidate session to force re-login
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('Reset password error:', error);
    },
  });

  // Change password (for logged in users)
  const changePassword = useMutation({
    mutationFn: async ({ 
      currentPassword, 
      newPassword 
    }: { 
      currentPassword: string; 
      newPassword: string;
    }) => {
      const { error } = await authClient.changePassword({ 
        currentPassword, 
        newPassword 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to change password');
      }
    },
    
    onSuccess: () => {
      // ✅ Password changed successfully, invalidate session to refresh
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('Change password error:', error);
    },
  });

  return {
    // Mutations
    forgotPassword,
    resetPassword,
    changePassword,
    
    // Convenience methods
    requestPasswordReset: forgotPassword.mutate,
    resetPasswordWithToken: resetPassword.mutate,
    changeUserPassword: changePassword.mutate,
    
    // Loading states
    isRequestingReset: forgotPassword.isPending,
    isResettingPassword: resetPassword.isPending,
    isChangingPassword: changePassword.isPending,
    
    // Error states
    forgotPasswordError: forgotPassword.error,
    resetPasswordError: resetPassword.error,
    changePasswordError: changePassword.error,
  };
}
