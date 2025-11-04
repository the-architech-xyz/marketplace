/**
 * Waitlist - Direct TanStack Query Hooks
 * 
 * ARCHITECTURE: Tech-Stack as Source of Truth
 * - Hooks call APIs directly via fetch (no backend imports)
 * - Schemas are defined here and imported by backend
 * - Full type safety across frontend and backend
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

// Import schemas for validation
import { JoinWaitlistDataSchema } from './schemas';
import type { JoinWaitlistResult, GetWaitlistUserResult } from '@/features/waitlist/contract';

// ============================================================================
// WAITLIST HOOKS
// ============================================================================

/**
 * Fetch user's waitlist status
 * @param userId - User ID (can be email or user ID)
 * @returns TanStack Query result with user data and stats
 */
export const useWaitlistUser = (userId: string, options?: Omit<UseQueryOptions<GetWaitlistUserResult>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['waitlist', 'user', userId],
    queryFn: async () => {
      const res = await fetch(`/api/waitlist/user/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch waitlist user');
      return res.json();
    },
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
    ...options
  });
};

/**
 * Fetch leaderboard
 * @param limit - Number of top referrers to fetch
 * @returns TanStack Query result with leaderboard data
 */
export const useWaitlistLeaderboard = (limit: number = 10, options?: Omit<UseQueryOptions<any[]>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['waitlist', 'leaderboard', limit],
    queryFn: async () => {
      const res = await fetch(`/api/waitlist/leaderboard?limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options
  });
};

/**
 * Fetch overall stats
 * @returns TanStack Query result with overall stats
 */
export const useWaitlistStats = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['waitlist', 'stats'],
    queryFn: async () => {
      const res = await fetch('/api/waitlist/stats');
      if (!res.ok) throw new Error('Failed to fetch waitlist stats');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options
  });
};

/**
 * Join the waitlist
 * @returns TanStack Mutation for joining waitlist
 */
export const useJoinWaitlist = (options?: UseMutationOptions<JoinWaitlistResult, any, any>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      // Validate input
      const validatedData = JoinWaitlistDataSchema.parse(data);
      
      const res = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });
      if (!res.ok) throw new Error('Failed to join waitlist');
      return res.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['waitlist'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

/**
 * Get referral link
 * @param userId - User ID
 * @returns TanStack Query result with referral link
 */
export const useReferralLink = (userId: string, options?: Omit<UseQueryOptions<{ link: string; code: string }>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['waitlist', 'referral-link', userId],
    queryFn: async () => {
      const res = await fetch(`/api/waitlist/referral-link/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch referral link');
      return res.json();
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options
  });
};

/**
 * Check referral code validity
 * @param code - Referral code to check
 * @returns TanStack Query result with code validity
 */
export const useCheckReferralCode = (code: string, options?: Omit<UseQueryOptions<{ valid: boolean; referrer?: string }>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['waitlist', 'referral-code', code],
    queryFn: async () => {
      const res = await fetch(`/api/waitlist/check-code/${code}`);
      if (!res.ok) throw new Error('Failed to check referral code');
      return res.json();
    },
    enabled: !!code && code.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options
  });
};


