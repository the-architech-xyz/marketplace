/**
 * useTwoFactor Hook
 * 
 * Provides two-factor authentication functionality using TanStack Query.
 * This hook handles 2FA setup, verification, disable, and recovery codes.
 * 
 * Uses Better Auth client directly (Option A - simpler approach)
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth/client';
import { authKeys } from '@/lib/auth/query-keys';

export function useTwoFactor() {
  const queryClient = useQueryClient();

  // Setup 2FA (get QR code and secret)
  const setupTwoFactor = useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.twoFactor.enable();
      
      if (error) {
        throw new Error(error.message || 'Failed to setup 2FA');
      }
      
      return data;
    },
    
    onError: (error) => {
      console.error('Setup 2FA error:', error);
    },
  });

  // Verify 2FA code
  const verifyTwoFactor = useMutation({
    mutationFn: async ({ 
      code 
    }: { 
      code: string;
    }) => {
      const { error } = await authClient.twoFactor.verify({ code });
      
      if (error) {
        throw new Error(error.message || 'Invalid 2FA code');
      }
    },
    
    onSuccess: () => {
      // ✅ 2FA verified successfully, invalidate session to refresh
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('Verify 2FA error:', error);
    },
  });

  // Disable 2FA
  const disableTwoFactor = useMutation({
    mutationFn: async ({ 
      password 
    }: { 
      password: string;
    }) => {
      const { error } = await authClient.twoFactor.disable({ password });
      
      if (error) {
        throw new Error(error.message || 'Failed to disable 2FA');
      }
    },
    
    onSuccess: () => {
      // ✅ 2FA disabled successfully, invalidate session to refresh
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('Disable 2FA error:', error);
    },
  });

  // Regenerate recovery codes
  const regenerateRecoveryCodes = useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.twoFactor.generateBackupCodes();
      
      if (error) {
        throw new Error(error.message || 'Failed to regenerate recovery codes');
      }
      
      return data;
    },
    
    onError: (error) => {
      console.error('Regenerate recovery codes error:', error);
    },
  });

  // Get current 2FA status
  const { data: twoFactorStatus, isLoading: isLoadingStatus } = useQuery({
    queryKey: authKeys.twoFactor.setup(),
    queryFn: async () => {
      // This would typically be a separate API call to check 2FA status
      // For now, we'll return a mock status
      return {
        enabled: false,
        hasRecoveryCodes: false,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    // Mutations
    setupTwoFactor,
    verifyTwoFactor,
    disableTwoFactor,
    regenerateRecoveryCodes,
    
    // Convenience methods
    enable2FA: setupTwoFactor.mutate,
    verify2FACode: verifyTwoFactor.mutate,
    disable2FA: disableTwoFactor.mutate,
    generateNewRecoveryCodes: regenerateRecoveryCodes.mutate,
    
    // Loading states
    isSettingUp: setupTwoFactor.isPending,
    isVerifying: verifyTwoFactor.isPending,
    isDisabling: disableTwoFactor.isPending,
    isRegeneratingCodes: regenerateRecoveryCodes.isPending,
    isLoadingStatus,
    
    // Error states
    setupError: setupTwoFactor.error,
    verifyError: verifyTwoFactor.error,
    disableError: disableTwoFactor.error,
    regenerateError: regenerateRecoveryCodes.error,
    
    // Data
    twoFactorStatus,
  };
}
