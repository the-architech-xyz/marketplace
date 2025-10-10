/**
 * useTeams Hook
 * 
 * Provides team management functionality using TanStack Query.
 * This hook handles team CRUD operations within organizations, member management, and invitations.
 * 
 * Uses Better Auth client directly (Option A - simpler approach)
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth/client';
import { authKeys } from '@/lib/auth/query-keys';
import type { 
  Team, TeamMember, TeamInvitation, 
  CreateTeamData, UpdateTeamData 
} from '@/features/auth/contract';

export function useTeams(orgId: string) {
  const queryClient = useQueryClient();

  // Get organization's teams
  const { data: teams, isLoading: isLoadingTeams } = useQuery({
    queryKey: [...authKeys.organizations.detail(orgId), 'teams'],
    queryFn: async () => {
      const { data } = await authClient.organization.listTeams({ organizationId: orgId });
      return data || [];
    },
    enabled: !!orgId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Create team
  const createTeam = useMutation({
    mutationFn: async (data: CreateTeamData) => {
      const { data: team, error } = await authClient.organization.createTeam({ 
        organizationId: orgId, 
        ...data 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to create team');
      }
      
      return team;
    },
    
    onSuccess: () => {
      // ✅ Team created successfully, invalidate teams list
      queryClient.invalidateQueries({ queryKey: [...authKeys.organizations.detail(orgId), 'teams'] });
    },
    
    onError: (error) => {
      console.error('Create team error:', error);
    },
  });

  // Update team
  const updateTeam = useMutation({
    mutationFn: async ({ teamId, data }: { teamId: string; data: UpdateTeamData }) => {
      const { error } = await authClient.organization.updateTeam({ 
        organizationId: orgId, 
        teamId, 
        ...data 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to update team');
      }
    },
    
    onSuccess: () => {
      // ✅ Team updated successfully, invalidate teams list
      queryClient.invalidateQueries({ queryKey: [...authKeys.organizations.detail(orgId), 'teams'] });
    },
    
    onError: (error) => {
      console.error('Update team error:', error);
    },
  });

  // Delete team
  const deleteTeam = useMutation({
    mutationFn: async (teamId: string) => {
      const { error } = await authClient.organization.deleteTeam({ 
        organizationId: orgId, 
        teamId 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to delete team');
      }
    },
    
    onSuccess: () => {
      // ✅ Team deleted successfully, invalidate teams list
      queryClient.invalidateQueries({ queryKey: [...authKeys.organizations.detail(orgId), 'teams'] });
    },
    
    onError: (error) => {
      console.error('Delete team error:', error);
    },
  });

  // Switch active team
  const switchActiveTeam = useMutation({
    mutationFn: async (teamId: string) => {
      // This would typically update the session context
      // For now, we'll just invalidate the session to refresh
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onSuccess: () => {
      // ✅ Active team switched, invalidate session
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('Switch active team error:', error);
    },
  });

  return {
    // Data
    teams,
    isLoadingTeams,
    
    // Mutations
    createTeam,
    updateTeam,
    deleteTeam,
    switchActiveTeam,
    
    // Convenience methods
    create: createTeam.mutate,
    update: updateTeam.mutate,
    delete: deleteTeam.mutate,
    switchActive: switchActiveTeam.mutate,
    
    // Loading states
    isCreating: createTeam.isPending,
    isUpdating: updateTeam.isPending,
    isDeleting: deleteTeam.isPending,
    isSwitching: switchActiveTeam.isPending,
    
    // Error states
    createError: createTeam.error,
    updateError: updateTeam.error,
    deleteError: deleteTeam.error,
    switchError: switchActiveTeam.error,
  };
}

// Team members hook
export function useTeamMembers(orgId: string, teamId: string) {
  const queryClient = useQueryClient();

  // Get team members
  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: [...authKeys.organizations.detail(orgId), 'teams', teamId, 'members'],
    queryFn: async () => {
      const { data } = await authClient.organization.listTeamMembers({ 
        organizationId: orgId, 
        teamId 
      });
      return data || [];
    },
    enabled: !!orgId && !!teamId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Add team member
  const addMember = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const { error } = await authClient.organization.addTeamMember({ 
        organizationId: orgId, 
        teamId, 
        userId, 
        role 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to add team member');
      }
    },
    
    onSuccess: () => {
      // ✅ Member added successfully, invalidate team members list
      queryClient.invalidateQueries({ 
        queryKey: [...authKeys.organizations.detail(orgId), 'teams', teamId, 'members'] 
      });
    },
    
    onError: (error) => {
      console.error('Add team member error:', error);
    },
  });

  // Remove team member
  const removeMember = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.organization.removeTeamMember({ 
        organizationId: orgId, 
        teamId, 
        userId 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to remove team member');
      }
    },
    
    onSuccess: () => {
      // ✅ Member removed successfully, invalidate team members list
      queryClient.invalidateQueries({ 
        queryKey: [...authKeys.organizations.detail(orgId), 'teams', teamId, 'members'] 
      });
    },
    
    onError: (error) => {
      console.error('Remove team member error:', error);
    },
  });

  // Update team member role
  const updateMemberRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const { error } = await authClient.organization.updateTeamMemberRole({ 
        organizationId: orgId, 
        teamId, 
        userId, 
        role 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to update team member role');
      }
    },
    
    onSuccess: () => {
      // ✅ Member role updated successfully, invalidate team members list
      queryClient.invalidateQueries({ 
        queryKey: [...authKeys.organizations.detail(orgId), 'teams', teamId, 'members'] 
      });
    },
    
    onError: (error) => {
      console.error('Update team member role error:', error);
    },
  });

  return {
    // Data
    members,
    isLoadingMembers,
    
    // Mutations
    addMember,
    removeMember,
    updateMemberRole,
    
    // Convenience methods
    add: addMember.mutate,
    remove: removeMember.mutate,
    updateRole: updateMemberRole.mutate,
    
    // Loading states
    isAdding: addMember.isPending,
    isRemoving: removeMember.isPending,
    isUpdatingRole: updateMemberRole.isPending,
    
    // Error states
    addError: addMember.error,
    removeError: removeMember.error,
    updateRoleError: updateMemberRole.error,
  };
}

// Team invitations hook
export function useTeamInvitations(orgId: string, teamId: string) {
  const queryClient = useQueryClient();

  // Get team invitations
  const { data: invitations, isLoading: isLoadingInvitations } = useQuery({
    queryKey: [...authKeys.organizations.detail(orgId), 'teams', teamId, 'invitations'],
    queryFn: async () => {
      const { data } = await authClient.organization.listTeamInvitations({ 
        organizationId: orgId, 
        teamId 
      });
      return data || [];
    },
    enabled: !!orgId && !!teamId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Invite to team
  const inviteToTeam = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) => {
      const { error } = await authClient.organization.inviteToTeam({ 
        organizationId: orgId, 
        teamId, 
        email, 
        role 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to invite to team');
      }
    },
    
    onSuccess: () => {
      // ✅ Invitation sent successfully, invalidate team invitations list
      queryClient.invalidateQueries({ 
        queryKey: [...authKeys.organizations.detail(orgId), 'teams', teamId, 'invitations'] 
      });
    },
    
    onError: (error) => {
      console.error('Invite to team error:', error);
    },
  });

  // Accept team invitation
  const acceptInvitation = useMutation({
    mutationFn: async (token: string) => {
      const { error } = await authClient.organization.acceptTeamInvitation({ token });
      
      if (error) {
        throw new Error(error.message || 'Failed to accept team invitation');
      }
    },
    
    onSuccess: () => {
      // ✅ Invitation accepted successfully, invalidate teams and invitations
      queryClient.invalidateQueries({ queryKey: [...authKeys.organizations.detail(orgId), 'teams'] });
      queryClient.invalidateQueries({ 
        queryKey: [...authKeys.organizations.detail(orgId), 'teams', teamId, 'invitations'] 
      });
    },
    
    onError: (error) => {
      console.error('Accept team invitation error:', error);
    },
  });

  // Reject team invitation
  const rejectInvitation = useMutation({
    mutationFn: async (token: string) => {
      const { error } = await authClient.organization.rejectTeamInvitation({ token });
      
      if (error) {
        throw new Error(error.message || 'Failed to reject team invitation');
      }
    },
    
    onSuccess: () => {
      // ✅ Invitation rejected successfully, invalidate team invitations
      queryClient.invalidateQueries({ 
        queryKey: [...authKeys.organizations.detail(orgId), 'teams', teamId, 'invitations'] 
      });
    },
    
    onError: (error) => {
      console.error('Reject team invitation error:', error);
    },
  });

  return {
    // Data
    invitations,
    isLoadingInvitations,
    
    // Mutations
    inviteToTeam,
    acceptInvitation,
    rejectInvitation,
    
    // Convenience methods
    invite: inviteToTeam.mutate,
    accept: acceptInvitation.mutate,
    reject: rejectInvitation.mutate,
    
    // Loading states
    isInviting: inviteToTeam.isPending,
    isAccepting: acceptInvitation.isPending,
    isRejecting: rejectInvitation.isPending,
    
    // Error states
    inviteError: inviteToTeam.error,
    acceptError: acceptInvitation.error,
    rejectError: rejectInvitation.error,
  };
}
