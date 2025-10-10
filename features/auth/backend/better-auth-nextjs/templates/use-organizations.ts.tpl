/**
 * useOrganizations Hook
 * 
 * Provides organization management functionality using TanStack Query.
 * This hook handles organization CRUD operations, member management, and invitations.
 * 
 * Uses Better Auth client directly (Option A - simpler approach)
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authClient } from '@/lib/auth/client';
import { authKeys } from '@/lib/auth/query-keys';
import type { 
  Organization, Member, Invitation, 
  CreateOrganizationData, UpdateOrganizationData 
} from '@/features/auth/contract';

export function useOrganizations() {
  const queryClient = useQueryClient();

  // Get user's organizations
  const { data: organizations, isLoading: isLoadingOrganizations } = useQuery({
    queryKey: authKeys.organizations.list(),
    queryFn: async () => {
      const { data } = await authClient.organization.list();
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Create organization
  const createOrganization = useMutation({
    mutationFn: async (data: CreateOrganizationData) => {
      const { data: org, error } = await authClient.organization.create(data);
      
      if (error) {
        throw new Error(error.message || 'Failed to create organization');
      }
      
      return org;
    },
    
    onSuccess: () => {
      // ✅ Organization created successfully, invalidate organizations list
      queryClient.invalidateQueries({ queryKey: authKeys.organizations.all });
    },
    
    onError: (error) => {
      console.error('Create organization error:', error);
    },
  });

  // Update organization
  const updateOrganization = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateOrganizationData }) => {
      const { error } = await authClient.organization.update({ 
        organizationId: id, 
        ...data 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to update organization');
      }
    },
    
    onSuccess: () => {
      // ✅ Organization updated successfully, invalidate organizations list
      queryClient.invalidateQueries({ queryKey: authKeys.organizations.all });
    },
    
    onError: (error) => {
      console.error('Update organization error:', error);
    },
  });

  // Delete organization
  const deleteOrganization = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await authClient.organization.delete({ organizationId: id });
      
      if (error) {
        throw new Error(error.message || 'Failed to delete organization');
      }
    },
    
    onSuccess: () => {
      // ✅ Organization deleted successfully, invalidate organizations list
      queryClient.invalidateQueries({ queryKey: authKeys.organizations.all });
    },
    
    onError: (error) => {
      console.error('Delete organization error:', error);
    },
  });

  // Switch active organization
  const switchActiveOrganization = useMutation({
    mutationFn: async (orgId: string) => {
      // This would typically update the session context
      // For now, we'll just invalidate the session to refresh
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onSuccess: () => {
      // ✅ Active organization switched, invalidate session
      queryClient.invalidateQueries({ queryKey: authKeys.session.all });
    },
    
    onError: (error) => {
      console.error('Switch active organization error:', error);
    },
  });

  return {
    // Data
    organizations,
    isLoadingOrganizations,
    
    // Mutations
    createOrganization,
    updateOrganization,
    deleteOrganization,
    switchActiveOrganization,
    
    // Convenience methods
    create: createOrganization.mutate,
    update: updateOrganization.mutate,
    delete: deleteOrganization.mutate,
    switchActive: switchActiveOrganization.mutate,
    
    // Loading states
    isCreating: createOrganization.isPending,
    isUpdating: updateOrganization.isPending,
    isDeleting: deleteOrganization.isPending,
    isSwitching: switchActiveOrganization.isPending,
    
    // Error states
    createError: createOrganization.error,
    updateError: updateOrganization.error,
    deleteError: deleteOrganization.error,
    switchError: switchActiveOrganization.error,
  };
}

// Organization members hook
export function useOrganizationMembers(orgId: string) {
  const queryClient = useQueryClient();

  // Get organization members
  const { data: members, isLoading: isLoadingMembers } = useQuery({
    queryKey: authKeys.organizations.detail(orgId),
    queryFn: async () => {
      const { data } = await authClient.organization.listMembers({ organizationId: orgId });
      return data || [];
    },
    enabled: !!orgId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Invite member
  const inviteMember = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) => {
      const { error } = await authClient.organization.invite({ 
        organizationId: orgId, 
        email, 
        role 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to invite member');
      }
    },
    
    onSuccess: () => {
      // ✅ Member invited successfully, invalidate members list
      queryClient.invalidateQueries({ queryKey: authKeys.organizations.detail(orgId) });
    },
    
    onError: (error) => {
      console.error('Invite member error:', error);
    },
  });

  // Remove member
  const removeMember = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.organization.removeMember({ 
        organizationId: orgId, 
        userId 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to remove member');
      }
    },
    
    onSuccess: () => {
      // ✅ Member removed successfully, invalidate members list
      queryClient.invalidateQueries({ queryKey: authKeys.organizations.detail(orgId) });
    },
    
    onError: (error) => {
      console.error('Remove member error:', error);
    },
  });

  // Update member role
  const updateMemberRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const { error } = await authClient.organization.updateMemberRole({ 
        organizationId: orgId, 
        userId, 
        role 
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to update member role');
      }
    },
    
    onSuccess: () => {
      // ✅ Member role updated successfully, invalidate members list
      queryClient.invalidateQueries({ queryKey: authKeys.organizations.detail(orgId) });
    },
    
    onError: (error) => {
      console.error('Update member role error:', error);
    },
  });

  return {
    // Data
    members,
    isLoadingMembers,
    
    // Mutations
    inviteMember,
    removeMember,
    updateMemberRole,
    
    // Convenience methods
    invite: inviteMember.mutate,
    remove: removeMember.mutate,
    updateRole: updateMemberRole.mutate,
    
    // Loading states
    isInviting: inviteMember.isPending,
    isRemoving: removeMember.isPending,
    isUpdatingRole: updateMemberRole.isPending,
    
    // Error states
    inviteError: inviteMember.error,
    removeError: removeMember.error,
    updateRoleError: updateMemberRole.error,
  };
}

// Organization invitations hook
export function useOrganizationInvitations(orgId: string) {
  const queryClient = useQueryClient();

  // Get organization invitations
  const { data: invitations, isLoading: isLoadingInvitations } = useQuery({
    queryKey: [...authKeys.organizations.detail(orgId), 'invitations'],
    queryFn: async () => {
      const { data } = await authClient.organization.listInvitations({ organizationId: orgId });
      return data || [];
    },
    enabled: !!orgId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Accept invitation
  const acceptInvitation = useMutation({
    mutationFn: async (token: string) => {
      const { error } = await authClient.organization.acceptInvitation({ token });
      
      if (error) {
        throw new Error(error.message || 'Failed to accept invitation');
      }
    },
    
    onSuccess: () => {
      // ✅ Invitation accepted successfully, invalidate organizations and invitations
      queryClient.invalidateQueries({ queryKey: authKeys.organizations.all });
      queryClient.invalidateQueries({ queryKey: [...authKeys.organizations.detail(orgId), 'invitations'] });
    },
    
    onError: (error) => {
      console.error('Accept invitation error:', error);
    },
  });

  // Reject invitation
  const rejectInvitation = useMutation({
    mutationFn: async (token: string) => {
      const { error } = await authClient.organization.rejectInvitation({ token });
      
      if (error) {
        throw new Error(error.message || 'Failed to reject invitation');
      }
    },
    
    onSuccess: () => {
      // ✅ Invitation rejected successfully, invalidate invitations
      queryClient.invalidateQueries({ queryKey: [...authKeys.organizations.detail(orgId), 'invitations'] });
    },
    
    onError: (error) => {
      console.error('Reject invitation error:', error);
    },
  });

  // Cancel invitation
  const cancelInvitation = useMutation({
    mutationFn: async (invitationId: string) => {
      const { error } = await authClient.organization.cancelInvitation({ invitationId });
      
      if (error) {
        throw new Error(error.message || 'Failed to cancel invitation');
      }
    },
    
    onSuccess: () => {
      // ✅ Invitation cancelled successfully, invalidate invitations
      queryClient.invalidateQueries({ queryKey: [...authKeys.organizations.detail(orgId), 'invitations'] });
    },
    
    onError: (error) => {
      console.error('Cancel invitation error:', error);
    },
  });

  return {
    // Data
    invitations,
    isLoadingInvitations,
    
    // Mutations
    acceptInvitation,
    rejectInvitation,
    cancelInvitation,
    
    // Convenience methods
    accept: acceptInvitation.mutate,
    reject: rejectInvitation.mutate,
    cancel: cancelInvitation.mutate,
    
    // Loading states
    isAccepting: acceptInvitation.isPending,
    isRejecting: rejectInvitation.isPending,
    isCancelling: cancelInvitation.isPending,
    
    // Error states
    acceptError: acceptInvitation.error,
    rejectError: rejectInvitation.error,
    cancelError: cancelInvitation.error,
  };
}