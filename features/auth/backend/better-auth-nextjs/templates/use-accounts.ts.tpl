/**
 * useAccounts Hook
 * 
 * Provides connected accounts management functionality using TanStack Query.
 * This hook handles OAuth account linking, unlinking, and listing connected accounts.
 * 
 * Uses Better Auth client directly (Option A - simpler approach)
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth/client';
import { authKeys } from '@/lib/auth/query-keys';

export function useAccounts() {
  const queryClient = useQueryClient();

  // Get connected accounts
  const { data: connectedAccounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: authKeys.accounts.list(),
    queryFn: async () => {
      const { data } = await authClient.listAccounts();
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Link OAuth account
  const linkAccount = useMutation({
    mutationFn: async ({ 
      provider 
    }: { 
      provider: 'google' | 'github' | 'discord';
    }) => {
      await authClient.linkSocial({ provider });
    },
    
    onSuccess: () => {
      // ✅ Account linked successfully, invalidate accounts list
      queryClient.invalidateQueries({ queryKey: authKeys.accounts.all });
    },
    
    onError: (error) => {
      console.error('Link account error:', error);
    },
  });

  // Unlink OAuth account
  const unlinkAccount = useMutation({
    mutationFn: async ({ 
      accountId 
    }: { 
      accountId: string;
    }) => {
      const { error } = await authClient.unlinkAccount({ accountId });
      
      if (error) {
        throw new Error(error.message || 'Failed to unlink account');
      }
    },
    
    onSuccess: () => {
      // ✅ Account unlinked successfully, invalidate accounts list
      queryClient.invalidateQueries({ queryKey: authKeys.accounts.all });
    },
    
    onError: (error) => {
      console.error('Unlink account error:', error);
    },
  });

  return {
    // Data
    connectedAccounts,
    isLoadingAccounts,
    
    // Mutations
    linkAccount,
    unlinkAccount,
    
    // Convenience methods
    linkGoogleAccount: () => linkAccount.mutate({ provider: 'google' }),
    linkGithubAccount: () => linkAccount.mutate({ provider: 'github' }),
    linkDiscordAccount: () => linkAccount.mutate({ provider: 'discord' }),
    unlinkAccountById: unlinkAccount.mutate,
    
    // Loading states
    isLinking: linkAccount.isPending,
    isUnlinking: unlinkAccount.isPending,
    
    // Error states
    linkError: linkAccount.error,
    unlinkError: unlinkAccount.error,
  };
}
