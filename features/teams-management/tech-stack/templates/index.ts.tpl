/**
 * Teams Management Feature - Tech Stack Layer
 * 
 * ⚠️ ARCHITECTURE: Option C - Direct Hooks Pattern
 * - Direct TanStack Query hooks → Server data (teams, members, etc.)
 * - Zustand Store → UI state only (modals, filters, selections)
 * - Standard React pattern, no abstraction layers
 * 
 * USAGE EXAMPLES:
 * 
 * // Fetch server data with direct hooks
 * import { useTeamsList, useTeamsCreate } from '@/lib/teams-management';
 * const { data: teams, isLoading } = useTeamsList();
 * const { mutate: createTeam } = useTeamsCreate();
 * 
 * // Manage UI state
 * import { useTeamUIStore } from '@/lib/teams-management';
 * const { isTeamModalOpen, setTeamModalOpen } = useTeamUIStore();
 */

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export * from './types';

// ============================================================================
// SCHEMA EXPORTS
// ============================================================================

export * from './schemas';

// ============================================================================
// ZUSTAND STORE EXPORTS (UI State Only)
// ============================================================================

export { useTeamUIStore, useTeamUISelectors } from './stores';

// ============================================================================
// DIRECT TANSTACK QUERY HOOKS (Server Data)
// ============================================================================

export * from './hooks';

// ============================================================================
// CONVENIENCE CONSTANTS
// ============================================================================

export const TEAM_ROLES = {
  OWNER: 'owner' as const,
  ADMIN: 'admin' as const,
  MEMBER: 'member' as const,
  VIEWER: 'viewer' as const
} as const;

export const TEAM_STATUSES = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
  SUSPENDED: 'suspended' as const,
  ARCHIVED: 'archived' as const
} as const;

export const INVITATION_STATUSES = {
  PENDING: 'pending' as const,
  ACCEPTED: 'accepted' as const,
  DECLINED: 'declined' as const
} as const;
