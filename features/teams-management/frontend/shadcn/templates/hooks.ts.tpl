/**
 * Teams Management Hooks (Frontend)
 * 
 * React hooks for team management UI functionality using TanStack Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Team, 
  TeamMember, 
  TeamInvitation, 
  TeamAnalytics, 
  TeamBilling,
  CreateTeamRequest,
  UpdateTeamRequest,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
  UseTeamsReturn,
  UseTeamMembersReturn,
  UseTeamAnalyticsReturn
} from './types';

// Query keys for consistent caching
export const teamKeys = {
  all: ['teams'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  list: (filters: { userId?: string; search?: string }) => [...teamKeys.lists(), filters] as const,
  details: () => [...teamKeys.all, 'detail'] as const,
  detail: (id: string) => [...teamKeys.details(), id] as const,
  analytics: () => [...teamKeys.all, 'analytics'] as const,
  analyticsDetail: (id: string, period: string) => [...teamKeys.analytics(), id, period] as const,
  billing: () => [...teamKeys.all, 'billing'] as const,
  billingDetail: (id: string) => [...teamKeys.billing(), id] as const,
};

export const memberKeys = {
  all: ['team-members'] as const,
  lists: () => [...memberKeys.all, 'list'] as const,
  list: (teamId: string) => [...memberKeys.lists(), teamId] as const,
  details: () => [...memberKeys.all, 'detail'] as const,
  detail: (id: string) => [...memberKeys.details(), id] as const,
};

export const invitationKeys = {
  all: ['team-invitations'] as const,
  details: () => [...invitationKeys.all, 'detail'] as const,
  detail: (token: string) => [...invitationKeys.details(), token] as const,
};

// API functions (these would be implemented in your API layer)
const teamApi = {
  getTeams: async (filters: { userId?: string; search?: string }, page = 1, limit = 20) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.search && { search: filters.search }),
    });

    const response = await fetch(`/api/teams?${params}`);
    if (!response.ok) throw new Error('Failed to fetch teams');
    return response.json();
  },

  getTeam: async (id: string) => {
    const response = await fetch(`/api/teams/${id}`);
    if (!response.ok) throw new Error('Failed to fetch team');
    return response.json();
  },

  createTeam: async (data: CreateTeamRequest) => {
    const response = await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create team');
    return response.json();
  },

  updateTeam: async (data: UpdateTeamRequest) => {
    const response = await fetch(`/api/teams/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update team');
    return response.json();
  },

  deleteTeam: async (id: string) => {
    const response = await fetch(`/api/teams/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete team');
  },

  getTeamAnalytics: async (id: string, period = 'month') => {
    const response = await fetch(`/api/teams/${id}/analytics?period=${period}`);
    if (!response.ok) throw new Error('Failed to fetch team analytics');
    return response.json();
  },

  getTeamBilling: async (id: string) => {
    const response = await fetch(`/api/teams/${id}/billing`);
    if (!response.ok) throw new Error('Failed to fetch team billing');
    return response.json();
  },
};

const memberApi = {
  getTeamMembers: async (teamId: string, page = 1, limit = 20) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`/api/teams/${teamId}/members?${params}`);
    if (!response.ok) throw new Error('Failed to fetch team members');
    return response.json();
  },

  inviteMember: async (data: InviteMemberRequest) => {
    const response = await fetch(`/api/teams/${data.teamId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to invite member');
    return response.json();
  },

  updateMemberRole: async (data: UpdateMemberRoleRequest) => {
    const response = await fetch(`/api/teams/${data.teamId}/members/${data.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: data.role }),
    });
    if (!response.ok) throw new Error('Failed to update member role');
    return response.json();
  },

  removeMember: async (teamId: string, userId: string) => {
    const response = await fetch(`/api/teams/${teamId}/members/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to remove member');
  },
};

const invitationApi = {
  getInvitation: async (token: string) => {
    const response = await fetch(`/api/invitations/${token}`);
    if (!response.ok) throw new Error('Failed to fetch invitation');
    return response.json();
  },

  acceptInvitation: async (token: string) => {
    const response = await fetch(`/api/invitations/${token}/accept`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to accept invitation');
    return response.json();
  },

  cancelInvitation: async (token: string) => {
    const response = await fetch(`/api/invitations/${token}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to cancel invitation');
  },
};

// Team hooks
export function useTeams(filters: { userId?: string; search?: string } = {}, page = 1, limit = 20): UseTeamsReturn {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useQuery({
    queryKey: teamKeys.list(filters),
    queryFn: ({ pageParam = page }) => teamApi.getTeams(filters, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
  });

  const teams = data?.pages.flatMap(page => page.teams) ?? [];
  const hasMore = hasNextPage ?? false;

  const loadMore = () => {
    if (hasMore && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    teams,
    isLoading,
    error: error as Error | null,
    refetch,
    hasMore,
    loadMore,
  };
}

export function useTeam(id: string) {
  return useQuery({
    queryKey: teamKeys.detail(id),
    queryFn: () => teamApi.getTeam(id),
    enabled: !!id,
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.updateTeam,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(data.id) });
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamApi.deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
    },
  });
}

export function useTeamAnalytics(id: string, period = 'month'): UseTeamAnalyticsReturn {
  const {
    data: analytics,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: teamKeys.analyticsDetail(id, period),
    queryFn: () => teamApi.getTeamAnalytics(id, period),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    analytics: analytics ?? null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

export function useTeamBilling(id: string) {
  return useQuery({
    queryKey: teamKeys.billingDetail(id),
    queryFn: () => teamApi.getTeamBilling(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Member hooks
export function useTeamMembers(teamId: string, page = 1, limit = 20): UseTeamMembersReturn {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useQuery({
    queryKey: memberKeys.list(teamId),
    queryFn: ({ pageParam = page }) => memberApi.getTeamMembers(teamId, pageParam, limit),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    enabled: !!teamId,
  });

  const members = data?.pages.flatMap(page => page.members) ?? [];
  const hasMore = hasNextPage ?? false;

  const loadMore = () => {
    if (hasMore && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    members,
    isLoading,
    error: error as Error | null,
    refetch,
    hasMore,
    loadMore,
  };
}

export function useInviteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memberApi.inviteMember,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: memberKeys.list(data.teamId) });
    },
  });
}

export function useUpdateMemberRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memberApi.updateMemberRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: memberKeys.list(data.teamId) });
    },
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, userId }: { teamId: string; userId: string }) => 
      memberApi.removeMember(teamId, userId),
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: memberKeys.list(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
    },
  });
}

// Invitation hooks
export function useInvitation(token: string) {
  return useQuery({
    queryKey: invitationKeys.detail(token),
    queryFn: () => invitationApi.getInvitation(token),
    enabled: !!token,
  });
}

export function useAcceptInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: invitationApi.acceptInvitation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      queryClient.invalidateQueries({ queryKey: memberKeys.list(data.teamId) });
    },
  });
}

export function useCancelInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: invitationApi.cancelInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.all });
    },
  });
}
