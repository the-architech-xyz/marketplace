/**
 * Teams Management - Direct TanStack Query Hooks
 * 
 * ARCHITECTURE: Tech-Stack as Source of Truth
 * - Hooks call APIs directly via fetch (no backend imports)
 * - Schemas are defined here and imported by backend
 * - Full type safety across frontend and backend
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

// ============================================================================
// TEAM MANAGEMENT HOOKS
// ============================================================================

/**
 * Fetch a list of teams with optional filters
 * @returns TanStack Query result with teams data
 */
export const useTeamsList = (filters?: any, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['teams', filters],
    queryFn: async () => {
      const params = filters ? `?${new URLSearchParams(filters)}` : '';
      const res = await fetch(`/api/teams${params}`);
      if (!res.ok) throw new Error('Failed to fetch teams');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Fetch a single team by ID
 * @param id - Team ID
 * @returns TanStack Query result with team data
 */
export const useTeam = (id: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['team', id],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${id}`);
      if (!res.ok) throw new Error('Failed to fetch team');
      return res.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Create a new team
 * @returns TanStack Mutation for creating teams
 */
export const useTeamsCreate = (options?: UseMutationOptions<any, any, any>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to create team');
      return res.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

/**
 * Update an existing team
 * @returns TanStack Mutation for updating teams
 */
export const useTeamsUpdate = (options?: UseMutationOptions<any, any, { id: string; data: any }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await fetch(`/api/teams/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to update team');
      return res.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['team', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

/**
 * Delete a team
 * @returns TanStack Mutation for deleting teams
 */
export const useTeamsDelete = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/teams/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete team');
      return res.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.removeQueries({ queryKey: ['team', id] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

/**
 * Leave a team
 * @returns TanStack Mutation for leaving teams
 */
export const useTeamsLeave = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/teams/${id}/leave`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to leave team');
      return res.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['team', id] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

// ============================================================================
// TEAM MEMBERS HOOKS
// ============================================================================

/**
 * Fetch team members
 * @param teamId - Team ID
 * @returns TanStack Query result with members data
 */
export const useTeamMembersList = (teamId: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['team-members', teamId],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${teamId}/members`);
      if (!res.ok) throw new Error('Failed to fetch team members');
      return res.json();
    },
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Fetch a single team member
 * @param teamId - Team ID
 * @param memberId - Member ID
 * @returns TanStack Query result with member data
 */
export const useTeamMember = (teamId: string, memberId: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['team-member', teamId, memberId],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${teamId}/members/${memberId}`);
      if (!res.ok) throw new Error('Failed to fetch team member');
      return res.json();
    },
    enabled: !!teamId && !!memberId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Update team member
 * @returns TanStack Mutation for updating team members
 */
export const useTeamMembersUpdate = (options?: UseMutationOptions<any, any, { teamId: string; memberId: string; data: any }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ teamId, memberId, data }: { teamId: string; memberId: string; data: any }) => {
      const res = await fetch(`/api/teams/${teamId}/members/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to update team member');
      return res.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['team-member', variables.teamId, variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['team-members', variables.teamId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

/**
 * Remove team member
 * @returns TanStack Mutation for removing team members
 */
export const useTeamMembersRemove = (options?: UseMutationOptions<any, any, { teamId: string; memberId: string }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ teamId, memberId }: { teamId: string; memberId: string }) => {
      const res = await fetch(`/api/teams/${teamId}/members/${memberId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to remove team member');
      return res.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.removeQueries({ queryKey: ['team-member', variables.teamId, variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['team-members', variables.teamId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

/**
 * Bulk remove team members
 * @returns TanStack Mutation for bulk removing team members
 */
export const useTeamMembersBulkRemove = (options?: UseMutationOptions<any, any, { teamId: string; memberIds: string[] }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ teamId, memberIds }: { teamId: string; memberIds: string[] }) => {
      const res = await fetch(`/api/teams/${teamId}/members/bulk-remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberIds })
      });
      if (!res.ok) throw new Error('Failed to bulk remove team members');
      return res.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['team-members', variables.teamId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

// ============================================================================
// TEAM INVITATIONS HOOKS
// ============================================================================

/**
 * Fetch team invitations
 * @param teamId - Team ID
 * @returns TanStack Query result with invitations data
 */
export const useTeamInvitationsList = (teamId: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['team-invitations', teamId],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${teamId}/invites`);
      if (!res.ok) throw new Error('Failed to fetch team invitations');
      return res.json();
    },
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Fetch a single team invitation
 * @param teamId - Team ID
 * @param invitationId - Invitation ID
 * @returns TanStack Query result with invitation data
 */
export const useTeamInvitation = (teamId: string, invitationId: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['team-invitation', teamId, invitationId],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${teamId}/invites/${invitationId}`);
      if (!res.ok) throw new Error('Failed to fetch team invitation');
      return res.json();
    },
    enabled: !!teamId && !!invitationId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Invite team member
 * @returns TanStack Mutation for inviting team members
 */
export const useTeamInvitationsInvite = (options?: UseMutationOptions<any, any, { teamId: string; data: any }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ teamId, data }: { teamId: string; data: any }) => {
      const res = await fetch(`/api/teams/${teamId}/invites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to invite team member');
      return res.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['team-invitations', variables.teamId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

/**
 * Accept team invitation
 * @returns TanStack Mutation for accepting invitations
 */
export const useTeamInvitationsAccept = (options?: UseMutationOptions<any, any, { teamId: string; invitationId: string }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ teamId, invitationId }: { teamId: string; invitationId: string }) => {
      const res = await fetch(`/api/teams/${teamId}/invites/${invitationId}/accept`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to accept invitation');
      return res.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['team-invitations', variables.teamId] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

/**
 * Decline team invitation
 * @returns TanStack Mutation for declining invitations
 */
export const useTeamInvitationsDecline = (options?: UseMutationOptions<any, any, { teamId: string; invitationId: string }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ teamId, invitationId }: { teamId: string; invitationId: string }) => {
      const res = await fetch(`/api/teams/${teamId}/invites/${invitationId}/decline`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to decline invitation');
      return res.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['team-invitations', variables.teamId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

/**
 * Cancel team invitation
 * @returns TanStack Mutation for canceling invitations
 */
export const useTeamInvitationsCancel = (options?: UseMutationOptions<any, any, { teamId: string; invitationId: string }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ teamId, invitationId }: { teamId: string; invitationId: string }) => {
      const res = await fetch(`/api/teams/${teamId}/invites/${invitationId}/cancel`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to cancel invitation');
      return res.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['team-invitations', variables.teamId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

/**
 * Resend team invitation
 * @returns TanStack Mutation for resending invitations
 */
export const useTeamInvitationsResend = (options?: UseMutationOptions<any, any, { teamId: string; invitationId: string }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ teamId, invitationId }: { teamId: string; invitationId: string }) => {
      const res = await fetch(`/api/teams/${teamId}/invites/${invitationId}/resend`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to resend invitation');
      return res.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['team-invitations', variables.teamId] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

// ============================================================================
// TEAM ANALYTICS HOOKS
// ============================================================================

/**
 * Fetch team analytics
 * @param teamId - Team ID
 * @returns TanStack Query result with analytics data
 */
export const useTeamAnalytics = (teamId: string, filters?: any, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['team-analytics', teamId, filters],
    queryFn: async () => {
      const params = filters ? `?${new URLSearchParams(filters)}` : '';
      const res = await fetch(`/api/teams/${teamId}/analytics${params}`);
      if (!res.ok) throw new Error('Failed to fetch team analytics');
      return res.json();
    },
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Fetch team activities
 * @param teamId - Team ID
 * @returns TanStack Query result with activities data
 */
export const useTeamActivities = (teamId: string, filters?: any, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['team-activities', teamId, filters],
    queryFn: async () => {
      const params = filters ? `?${new URLSearchParams(filters)}` : '';
      const res = await fetch(`/api/teams/${teamId}/activities${params}`);
      if (!res.ok) throw new Error('Failed to fetch team activities');
      return res.json();
    },
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

// ============================================================================
// PERMISSIONS HOOKS
// ============================================================================

/**
 * Fetch user permissions for a team
 * @param teamId - Team ID
 * @returns TanStack Query result with permissions data
 */
export const useUserPermissions = (teamId: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['user-permissions', teamId],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${teamId}/permissions`);
      if (!res.ok) throw new Error('Failed to fetch user permissions');
      return res.json();
    },
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Check if user has a specific permission
 * @param teamId - Team ID
 * @param permission - Permission to check
 * @returns TanStack Query result with permission check
 */
export const useHasPermission = (teamId: string, permission: string, options?: Omit<UseQueryOptions<boolean>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['has-permission', teamId, permission],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${teamId}/permissions/${permission}`);
      if (!res.ok) throw new Error('Failed to check permission');
      const data = await res.json();
      return data.hasPermission;
    },
    enabled: !!teamId && !!permission,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};
