/**
 * TeamsService - Cohesive Business Services (Client-Side Abstraction)
 * 
 * This service wraps the pure backend API functions with TanStack Query hooks.
 * It implements the ITeamsService interface defined in contract.ts.
 * 
 * LAYER RESPONSIBILITY: Client-side abstraction (TanStack Query wrappers)
 * - Imports pure server functions from backend/
 * - Wraps them with useQuery/useMutation
 * - Exports cohesive service object
 * - NO direct API calls (uses backend functions)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  apiGetTeams, apiGetTeam, apiCreateTeam, apiUpdateTeam, apiDeleteTeam, apiLeaveTeam,
  apiGetTeamMembers, apiGetTeamMember, apiUpdateTeamMember, apiRemoveTeamMember, apiBulkRemoveTeamMembers,
  apiGetTeamInvitations, apiGetTeamInvitation, apiInviteTeamMember, 
  apiAcceptTeamInvitation, apiDeclineTeamInvitation, apiCancelTeamInvitation, apiResendTeamInvitation,
  apiGetTeamAnalytics, apiGetTeamActivities,
  apiGetUserPermissions, apiHasPermission
} from '@/features/teams-management/backend/better-auth-nextjs/teams-api';
import type { ITeamsService } from '@/features/teams-management/contract';

/**
 * TeamsService - Cohesive Services Implementation
 * 
 * This service groups related team operations into cohesive interfaces.
 * Each method returns an object containing all related queries and mutations.
 */
export const TeamsService: ITeamsService = {
  /**
   * Team Management Service
   * Provides all team-related operations in a cohesive interface
   */
  useTeams: () => {
    const queryClient = useQueryClient();

    // Query operations - wrapped with TanStack Query
    const list = (filters?) => useQuery({
      queryKey: ['teams', filters],
      queryFn: () => apiGetTeams(filters),  // ← Wraps backend function
      staleTime: 5 * 60 * 1000
    });

    const get = (id: string) => useQuery({
      queryKey: ['team', id],
      queryFn: () => apiGetTeam(id),  // ← Wraps backend function
      enabled: !!id,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations - wrapped with TanStack Query
    const create = () => useMutation({
      mutationFn: apiCreateTeam,  // ← Wraps backend function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
      }
    });

    const update = () => useMutation({
      mutationFn: ({ id, data }) => apiUpdateTeam(id, data),  // ← Wraps backend function
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['team', id] });
        queryClient.invalidateQueries({ queryKey: ['teams'] });
      }
    });

    const deleteTeam = () => useMutation({
      mutationFn: apiDeleteTeam,  // ← Wraps backend function
      onSuccess: (_, id) => {
        queryClient.removeQueries({ queryKey: ['team', id] });
        queryClient.invalidateQueries({ queryKey: ['teams'] });
      }
    });

    const leave = () => useMutation({
      mutationFn: ({ teamId, userId }) => apiLeaveTeam(teamId, userId),  // ← Wraps backend function
      onSuccess: (_, { teamId }) => {
        queryClient.removeQueries({ queryKey: ['team', teamId] });
        queryClient.invalidateQueries({ queryKey: ['teams'] });
      }
    });

    return { list, get, create, update, delete: deleteTeam, leave };
  },

  /**
   * Member Management Service
   * Provides all team member-related operations in a cohesive interface
   */
  useMembers: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (teamId: string, filters?) => useQuery({
      queryKey: ['team-members', teamId, filters],
      queryFn: () => apiGetTeamMembers(teamId, filters),  // ← Wraps backend function
      enabled: !!teamId,
      staleTime: 5 * 60 * 1000
    });

    const get = (teamId: string, userId: string) => useQuery({
      queryKey: ['team-member', teamId, userId],
      queryFn: () => apiGetTeamMember(teamId, userId),  // ← Wraps backend function
      enabled: !!teamId && !!userId,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const update = () => useMutation({
      mutationFn: ({ teamId, userId, data }) => apiUpdateTeamMember(teamId, userId, data),  // ← Wraps backend function
      onSuccess: (_, { teamId }) => {
        queryClient.invalidateQueries({ queryKey: ['team-members', teamId] });
      }
    });

    const remove = () => useMutation({
      mutationFn: ({ teamId, userId }) => apiRemoveTeamMember(teamId, userId),  // ← Wraps backend function
      onSuccess: (_, { teamId }) => {
        queryClient.invalidateQueries({ queryKey: ['team-members', teamId] });
      }
    });

    const bulkRemove = () => useMutation({
      mutationFn: ({ teamId, userIds }) => apiBulkRemoveTeamMembers(teamId, userIds),  // ← Wraps backend function
      onSuccess: (_, { teamId }) => {
        queryClient.invalidateQueries({ queryKey: ['team-members', teamId] });
      }
    });

    return { list, get, update, remove, bulkRemove };
  },

  /**
   * Invitation Management Service
   * Provides all team invitation-related operations in a cohesive interface
   */
  useInvitations: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (teamId?: string, filters?) => useQuery({
      queryKey: ['team-invitations', teamId, filters],
      queryFn: () => apiGetTeamInvitations(teamId, filters),  // ← Wraps backend function
      staleTime: 5 * 60 * 1000
    });

    const get = (id: string) => useQuery({
      queryKey: ['team-invitation', id],
      queryFn: () => apiGetTeamInvitation(id),  // ← Wraps backend function
      enabled: !!id,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const invite = () => useMutation({
      mutationFn: ({ teamId, data }) => apiInviteTeamMember(teamId, data),  // ← Wraps backend function
      onSuccess: (_, { teamId }) => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations', teamId] });
      }
    });

    const bulkInvite = () => useMutation({
      mutationFn: async ({ teamId, data }: { teamId: string; data: any[] }) => {
        // Bulk operation by calling single invite multiple times
        return Promise.all(data.map(d => apiInviteTeamMember(teamId, d)));
      },
      onSuccess: (_, { teamId }) => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations', teamId] });
      }
    });

    const accept = () => useMutation({
      mutationFn: apiAcceptTeamInvitation,  // ← Wraps backend function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
        queryClient.invalidateQueries({ queryKey: ['teams'] });
      }
    });

    const decline = () => useMutation({
      mutationFn: apiDeclineTeamInvitation,  // ← Wraps backend function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      }
    });

    const cancel = () => useMutation({
      mutationFn: apiCancelTeamInvitation,  // ← Wraps backend function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      }
    });

    const resend = () => useMutation({
      mutationFn: apiResendTeamInvitation,  // ← Wraps backend function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['team-invitations'] });
      }
    });

    return { list, get, invite, bulkInvite, accept, decline, cancel, resend };
  },

  /**
   * Analytics Service
   * Provides team analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    const getTeamAnalytics = (teamId: string) => useQuery({
      queryKey: ['team-analytics', teamId],
      queryFn: () => apiGetTeamAnalytics(teamId),  // ← Wraps backend function
      enabled: !!teamId,
      staleTime: 5 * 60 * 1000
    });

    const getActivities = (teamId: string, filters?) => useQuery({
      queryKey: ['team-activities', teamId, filters],
      queryFn: () => apiGetTeamActivities(teamId, filters),  // ← Wraps backend function
      enabled: !!teamId,
      staleTime: 2 * 60 * 1000
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
      queryFn: () => apiGetUserPermissions(teamId, userId),  // ← Wraps backend function
      enabled: !!teamId && !!userId,
      staleTime: 5 * 60 * 1000
    });

    const hasPermission = (teamId: string, userId: string, permission) => useQuery({
      queryKey: ['team-has-permission', teamId, userId, permission],
      queryFn: () => apiHasPermission(teamId, userId, permission),  // ← Wraps backend function
      enabled: !!teamId && !!userId && !!permission,
      staleTime: 5 * 60 * 1000
    });

    return { getPermissions, hasPermission };
  }
};

/**
 * ARCHITECTURE NOTES:
 * 
 * 1. This service lives in the TECH-STACK layer (client-side abstraction)
 * 2. It imports PURE server functions from backend/better-auth-nextjs/teams-api
 * 3. It wraps them with TanStack Query for client-side data management
 * 4. It exports the ITeamsService interface as a cohesive service object
 * 5. Frontend components import THIS service, not the backend functions
 * 
 * LAYER FLOW:
 * Frontend → TeamsService (tech-stack) → apiXXX() (backend) → Database
 */

