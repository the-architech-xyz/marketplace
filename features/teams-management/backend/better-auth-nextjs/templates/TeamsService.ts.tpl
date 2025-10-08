/**
 * TeamsService - Cohesive Business Hook Services Implementation
 * 
 * This service implements the ITeamsService interface using Better Auth and TanStack Query.
 * It provides cohesive business services that group related functionality.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ITeamsService, 
  Team, TeamMember, TeamInvitation, TeamActivity, TeamAnalytics,
  CreateTeamData, UpdateTeamData, InviteMemberData, UpdateMemberData,
  AcceptInvitationData, DeclineInvitationData, TeamFilters, MemberFilters,
  InvitationFilters, ActivityFilters, Permission
} from '@/features/teams-management/contract';

/**
 * TeamsService - Main service implementation
 * 
 * This service provides all teams-related operations through cohesive business services.
 * Each service method returns an object containing all related queries and mutations.
 */
export const TeamsService: ITeamsService = {
  /**
   * Team Management Service
   * Provides all team-related operations in a cohesive interface
   */
  useTeams: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (filters?: TeamFilters) => useQuery({
      queryKey: ['teams', filters],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (filters?.status) params.append('status', filters.status.join(','));
        if (filters?.search) params.append('search', filters.search);
        
        const response = await fetch(`/api/teams?${params}`);
        if (!response.ok) throw new Error('Failed to fetch teams');
        return response.json() as Team[];
      }
    });

    const get = (id: string) => useQuery({
      queryKey: ['team', id],
      queryFn: async () => {
        const response = await fetch(`/api/teams/${id}`);
        if (!response.ok) throw new Error('Failed to fetch team');
        return response.json() as Team;
      },
      enabled: !!id
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: CreateTeamData) => {
        const response = await fetch('/api/teams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create team');
        return response.json() as Team;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateTeamData }) => {
        const response = await fetch(`/api/teams/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update team');
        return response.json() as Team;
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        queryClient.invalidateQueries({ queryKey: ['team', id] });
      }
    });

    const delete = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/teams/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete team');
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        queryClient.removeQueries({ queryKey: ['team', id] });
      }
    });

    const leave = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/teams/${id}/leave`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to leave team');
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        queryClient.removeQueries({ queryKey: ['team', id] });
      }
    });

    return { list, get, create, update, delete, leave };
  },

  /**
   * Member Management Service
   * Provides all team member-related operations in a cohesive interface
   */
  useMembers: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (teamId: string) => useQuery({
      queryKey: ['team-members', teamId],
      queryFn: async () => {
        const response = await fetch(`/api/teams/${teamId}/members`);
        if (!response.ok) throw new Error('Failed to fetch team members');
        return response.json() as TeamMember[];
      },
      enabled: !!teamId
    });

    const get = (teamId: string, userId: string) => useQuery({
      queryKey: ['team-member', teamId, userId],
      queryFn: async () => {
        const response = await fetch(`/api/teams/${teamId}/members/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch team member');
        return response.json() as TeamMember;
      },
      enabled: !!teamId && !!userId
    });

    // Mutation operations
    const update = () => useMutation({
      mutationFn: async ({ teamId, userId, data }: { teamId: string; userId: string; data: UpdateMemberData }) => {
        const response = await fetch(`/api/teams/${teamId}/members/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update team member');
        return response.json() as TeamMember;
      },
      onSuccess: (_, { teamId }) => {
        queryClient.invalidateQueries({ queryKey: ['team-members', teamId] });
      }
    });

    const remove = () => useMutation({
      mutationFn: async ({ teamId, userId }: { teamId: string; userId: string }) => {
        const response = await fetch(`/api/teams/${teamId}/members/${userId}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to remove team member');
      },
      onSuccess: (_, { teamId }) => {
        queryClient.invalidateQueries({ queryKey: ['team-members', teamId] });
      }
    });

    return { list, get, update, remove };
  },

  /**
   * Invitation Management Service
   * Provides all team invitation-related operations in a cohesive interface
   */
  useInvitations: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (teamId?: string) => useQuery({
      queryKey: ['team-invitations', teamId],
      queryFn: async () => {
        const url = teamId ? `/api/teams/${teamId}/invites` : '/api/teams/invites';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch team invitations');
        return response.json() as TeamInvitation[];
      }
    });

    const get = (id: string) => useQuery({
      queryKey: ['team-invitation', id],
      queryFn: async () => {
        const response = await fetch(`/api/teams/invites/${id}`);
        if (!response.ok) throw new Error('Failed to fetch team invitation');
        return response.json() as TeamInvitation;
      },
      enabled: !!id
    });

    // Mutation operations
    const invite = () => useMutation({
      mutationFn: async ({ teamId, data }: { teamId: string; data: InviteMemberData }) => {
        const response = await fetch(`/api/teams/${teamId}/invites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to invite team member');
        return response.json() as TeamInvitation;
      },
      onSuccess: (_, { teamId }) => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations', teamId] });
      }
    });

    const accept = () => useMutation({
      mutationFn: async (data: AcceptInvitationData) => {
        const response = await fetch(`/api/teams/invites/${data.invitationId}/accept`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: data.userId })
        });
        if (!response.ok) throw new Error('Failed to accept invitation');
        return response.json() as { member: TeamMember; team: Team };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
        queryClient.invalidateQueries({ queryKey: ['teams'] });
      }
    });

    const decline = () => useMutation({
      mutationFn: async (data: DeclineInvitationData) => {
        const response = await fetch(`/api/teams/invites/${data.invitationId}/decline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason: data.reason })
        });
        if (!response.ok) throw new Error('Failed to decline invitation');
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      }
    });

    const cancel = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/teams/invites/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to cancel invitation');
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      }
    });

    const resend = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/teams/invites/${id}/resend`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to resend invitation');
        return response.json() as TeamInvitation;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      }
    });

    return { list, get, invite, accept, decline, cancel, resend };
  },

  /**
   * Analytics Service
   * Provides team analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    const getTeamAnalytics = (teamId: string) => useQuery({
      queryKey: ['team-analytics', teamId],
      queryFn: async () => {
        const response = await fetch(`/api/teams/${teamId}/analytics`);
        if (!response.ok) throw new Error('Failed to fetch team analytics');
        return response.json() as TeamAnalytics;
      },
      enabled: !!teamId
    });

    const getActivities = (teamId: string, filters?: ActivityFilters) => useQuery({
      queryKey: ['team-activities', teamId, filters],
      queryFn: async () => {
        const params = new URLSearchParams();
        if (filters?.userId) params.append('userId', filters.userId);
        if (filters?.action) params.append('action', filters.action);
        if (filters?.after) params.append('after', filters.after);
        if (filters?.before) params.append('before', filters.before);
        if (filters?.limit) params.append('limit', filters.limit.toString());
        
        const response = await fetch(`/api/teams/${teamId}/activities?${params}`);
        if (!response.ok) throw new Error('Failed to fetch team activities');
        return response.json() as TeamActivity[];
      },
      enabled: !!teamId
    });

    return { getTeamAnalytics, getActivities };
  },

  /**
   * Permissions Service
   * Provides permission checking and management
   */
  usePermissions: () => {
    // Query operations
    const getPermissions = (teamId: string, userId: string) => useQuery({
      queryKey: ['team-permissions', teamId, userId],
      queryFn: async () => {
        const response = await fetch(`/api/teams/${teamId}/permissions/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch permissions');
        return response.json() as Permission[];
      },
      enabled: !!teamId && !!userId
    });

    const hasPermission = (teamId: string, userId: string, permission: Permission) => useQuery({
      queryKey: ['team-has-permission', teamId, userId, permission],
      queryFn: async () => {
        const response = await fetch(`/api/teams/${teamId}/permissions/${userId}/${permission}`);
        if (!response.ok) throw new Error('Failed to check permission');
        return response.json() as boolean;
      },
      enabled: !!teamId && !!userId && !!permission
    });

    return { getPermissions, hasPermission };
  }
};
