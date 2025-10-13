/**
 * Teams Management Hooks (Frontend)
 * 
 * Pure frontend hooks that consume the TeamsService from backend.
 * NO direct API calls - all data fetching delegated to backend service.
 * 
 * This follows The Architech's contract architecture:
 * - Frontend imports ONLY from contract and backend service
 * - Frontend makes ZERO direct fetch() calls
 * - Frontend consumes backend hooks via ITeamsService interface
 */

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
import { TeamsService } from '@/lib/services/TeamsService';

// Note: Query keys are managed by backend service
// Frontend just uses the hooks provided by ITeamsService

/**
 * Teams Management Hooks (Frontend)
 * 
 * Pure frontend hooks that delegate to TeamsService from backend.
 * These are convenience wrappers following The Architech's gold standard pattern.
 */

// ============================================================================
// TEAM HOOKS - Delegate to TeamsService.useTeams()
// ============================================================================

export function useTeams(filters: { userId?: string; search?: string } = {}): UseTeamsReturn {
  // ✅ CORRECT: Use backend service
  const { list, get } = TeamsService.useTeams();
  
  const teamsQuery = list(filters);

  return {
    teams: teamsQuery.data ?? [],
    isLoading: teamsQuery.isLoading,
    error: teamsQuery.error,
    refetch: teamsQuery.refetch,
    hasMore: false, // Pagination handled by backend
    loadMore: () => {}, // Pagination handled by backend
  };
}

export function useTeam(id: string) {
  // ✅ CORRECT: Use backend service
  const { get } = TeamsService.useTeams();
  return get(id);
}

export function useCreateTeam() {
  // ✅ CORRECT: Use backend service mutation
  const { create } = TeamsService.useTeams();
  return create();
}

export function useUpdateTeam() {
  // ✅ CORRECT: Use backend service mutation
  const { update } = TeamsService.useTeams();
  return update();
}

export function useDeleteTeam() {
  // ✅ CORRECT: Use backend service mutation
  const { delete: deleteTeam } = TeamsService.useTeams();
  return deleteTeam();
}

export function useTeamAnalytics(teamId: string): UseTeamAnalyticsReturn {
  // ✅ CORRECT: Use backend service
  const { getTeamAnalytics } = TeamsService.useAnalytics();
  
  const analyticsQuery = getTeamAnalytics(teamId);

  return {
    analytics: analyticsQuery.data ?? null,
    isLoading: analyticsQuery.isLoading,
    error: analyticsQuery.error,
    refetch: analyticsQuery.refetch,
  };
}

export function useTeamBilling(teamId: string) {
  // ✅ CORRECT: Use backend service
  // Note: This will need to be implemented when billing integration is added
  // For now, return a placeholder
  return {
    data: null,
    isLoading: false,
    error: null,
  };
}

// ============================================================================
// MEMBER HOOKS - Delegate to TeamsService.useMembers()
// ============================================================================

export function useTeamMembers(teamId: string): UseTeamMembersReturn {
  // ✅ CORRECT: Use backend service
  const { list } = TeamsService.useMembers();
  
  const membersQuery = list(teamId);

  return {
    members: membersQuery.data ?? [],
    isLoading: membersQuery.isLoading,
    error: membersQuery.error,
    refetch: membersQuery.refetch,
    hasMore: false, // Pagination handled by backend
    loadMore: () => {}, // Pagination handled by backend
  };
}

export function useInviteMember() {
  // ✅ CORRECT: Use backend service mutation
  const { invite } = TeamsService.useInvitations();
  return invite();
}

export function useUpdateMemberRole() {
  // ✅ CORRECT: Use backend service mutation
  const { update } = TeamsService.useMembers();
  return update();
}

export function useRemoveMember() {
  // ✅ CORRECT: Use backend service mutation
  const { remove } = TeamsService.useMembers();
  return remove();
}

// ============================================================================
// INVITATION HOOKS - Delegate to TeamsService.useInvitations()
// ============================================================================

export function useInvitation(invitationId: string) {
  // ✅ CORRECT: Use backend service
  const { get } = TeamsService.useInvitations();
  return get(invitationId);
}

export function useAcceptInvitation() {
  // ✅ CORRECT: Use backend service mutation
  const { accept } = TeamsService.useInvitations();
  return accept();
}

export function useCancelInvitation() {
  // ✅ CORRECT: Use backend service mutation
  const { cancel } = TeamsService.useInvitations();
  return cancel();
}
