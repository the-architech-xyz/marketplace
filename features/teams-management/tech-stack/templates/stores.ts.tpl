/**
 * Teams Management Feature Stores - Zustand State Management
 * 
 * This file contains all Zustand stores for the Teams Management feature.
 * These stores provide consistent state management patterns across all implementations.
 * 
 * Generated from: features/teams-management/contract.ts
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  Team,
  TeamMember,
  TeamInvitation,
  TeamActivity,
  TeamFilters,
  MemberFilters,
  InvitationFilters,
  ActivityFilters,
  TeamFormData,
  InvitationFormData,
  TeamStats,
  MemberStats,
  InvitationStats,
  UserTeamMembership,
  TeamSettings,
  ActivitySummary
} from './types';

// ============================================================================
// TEAM STORE
// ============================================================================

interface TeamState {
  // Data
  teams: Team[];
  selectedTeam: Team | null;
  teamFilters: TeamFilters;
  
  // UI State
  isTeamModalOpen: boolean;
  isTeamFormOpen: boolean;
  isTeamLoading: boolean;
  teamFormData: TeamFormData | null;
  
  // Actions
  setTeams: (teams: Team[]) => void;
  setSelectedTeam: (team: Team | null) => void;
  setTeamFilters: (filters: TeamFilters) => void;
  setTeamModalOpen: (isOpen: boolean) => void;
  setTeamFormOpen: (isOpen: boolean) => void;
  setTeamLoading: (isLoading: boolean) => void;
  setTeamFormData: (data: TeamFormData | null) => void;
  addTeam: (team: Team) => void;
  updateTeam: (id: string, team: Partial<Team>) => void;
  removeTeam: (id: string) => void;
  clearTeams: () => void;
  resetTeamState: () => void;
}

export const useTeamStore = create<TeamState>()(
  immer((set, get) => ({
    // Initial state
    teams: [],
    selectedTeam: null,
    teamFilters: {},
    isTeamModalOpen: false,
    isTeamFormOpen: false,
    isTeamLoading: false,
    teamFormData: null,
    
    // Actions
    setTeams: (teams) => set((state) => {
      state.teams = teams;
    }),
    
    setSelectedTeam: (team) => set((state) => {
      state.selectedTeam = team;
    }),
    
    setTeamFilters: (filters) => set((state) => {
      state.teamFilters = filters;
    }),
    
    setTeamModalOpen: (isOpen) => set((state) => {
      state.isTeamModalOpen = isOpen;
    }),
    
    setTeamFormOpen: (isOpen) => set((state) => {
      state.isTeamFormOpen = isOpen;
    }),
    
    setTeamLoading: (isLoading) => set((state) => {
      state.isTeamLoading = isLoading;
    }),
    
    setTeamFormData: (data) => set((state) => {
      state.teamFormData = data;
    }),
    
    addTeam: (team) => set((state) => {
      state.teams.unshift(team);
    }),
    
    updateTeam: (id, teamData) => set((state) => {
      const index = state.teams.findIndex(team => team.id === id);
      if (index !== -1) {
        state.teams[index] = { ...state.teams[index], ...teamData };
      }
      if (state.selectedTeam?.id === id) {
        state.selectedTeam = { ...state.selectedTeam, ...teamData };
      }
    }),
    
    removeTeam: (id) => set((state) => {
      state.teams = state.teams.filter(team => team.id !== id);
      if (state.selectedTeam?.id === id) {
        state.selectedTeam = null;
      }
    }),
    
    clearTeams: () => set((state) => {
      state.teams = [];
      state.selectedTeam = null;
    }),
    
    resetTeamState: () => set((state) => {
      state.teams = [];
      state.selectedTeam = null;
      state.teamFilters = {};
      state.isTeamModalOpen = false;
      state.isTeamFormOpen = false;
      state.isTeamLoading = false;
      state.teamFormData = null;
    })
  }))
);

// ============================================================================
// MEMBER STORE
// ============================================================================

interface MemberState {
  // Data
  members: TeamMember[];
  selectedMember: TeamMember | null;
  memberFilters: MemberFilters;
  
  // UI State
  isMemberModalOpen: boolean;
  isMemberFormOpen: boolean;
  isMemberLoading: boolean;
  
  // Actions
  setMembers: (members: TeamMember[]) => void;
  setSelectedMember: (member: TeamMember | null) => void;
  setMemberFilters: (filters: MemberFilters) => void;
  setMemberModalOpen: (isOpen: boolean) => void;
  setMemberFormOpen: (isOpen: boolean) => void;
  setMemberLoading: (isLoading: boolean) => void;
  addMember: (member: TeamMember) => void;
  updateMember: (id: string, member: Partial<TeamMember>) => void;
  removeMember: (id: string) => void;
  clearMembers: () => void;
  resetMemberState: () => void;
}

export const useMemberStore = create<MemberState>()(
  immer((set, get) => ({
    // Initial state
    members: [],
    selectedMember: null,
    memberFilters: {},
    isMemberModalOpen: false,
    isMemberFormOpen: false,
    isMemberLoading: false,
    
    // Actions
    setMembers: (members) => set((state) => {
      state.members = members;
    }),
    
    setSelectedMember: (member) => set((state) => {
      state.selectedMember = member;
    }),
    
    setMemberFilters: (filters) => set((state) => {
      state.memberFilters = filters;
    }),
    
    setMemberModalOpen: (isOpen) => set((state) => {
      state.isMemberModalOpen = isOpen;
    }),
    
    setMemberFormOpen: (isOpen) => set((state) => {
      state.isMemberFormOpen = isOpen;
    }),
    
    setMemberLoading: (isLoading) => set((state) => {
      state.isMemberLoading = isLoading;
    }),
    
    addMember: (member) => set((state) => {
      state.members.unshift(member);
    }),
    
    updateMember: (id, memberData) => set((state) => {
      const index = state.members.findIndex(member => member.id === id);
      if (index !== -1) {
        state.members[index] = { ...state.members[index], ...memberData };
      }
      if (state.selectedMember?.id === id) {
        state.selectedMember = { ...state.selectedMember, ...memberData };
      }
    }),
    
    removeMember: (id) => set((state) => {
      state.members = state.members.filter(member => member.id !== id);
      if (state.selectedMember?.id === id) {
        state.selectedMember = null;
      }
    }),
    
    clearMembers: () => set((state) => {
      state.members = [];
      state.selectedMember = null;
    }),
    
    resetMemberState: () => set((state) => {
      state.members = [];
      state.selectedMember = null;
      state.memberFilters = {};
      state.isMemberModalOpen = false;
      state.isMemberFormOpen = false;
      state.isMemberLoading = false;
    })
  }))
);

// ============================================================================
// INVITATION STORE
// ============================================================================

interface InvitationState {
  // Data
  invitations: TeamInvitation[];
  selectedInvitation: TeamInvitation | null;
  invitationFilters: InvitationFilters;
  
  // UI State
  isInvitationModalOpen: boolean;
  isInvitationFormOpen: boolean;
  isInvitationLoading: boolean;
  invitationFormData: InvitationFormData | null;
  
  // Actions
  setInvitations: (invitations: TeamInvitation[]) => void;
  setSelectedInvitation: (invitation: TeamInvitation | null) => void;
  setInvitationFilters: (filters: InvitationFilters) => void;
  setInvitationModalOpen: (isOpen: boolean) => void;
  setInvitationFormOpen: (isOpen: boolean) => void;
  setInvitationLoading: (isLoading: boolean) => void;
  setInvitationFormData: (data: InvitationFormData | null) => void;
  addInvitation: (invitation: TeamInvitation) => void;
  updateInvitation: (id: string, invitation: Partial<TeamInvitation>) => void;
  removeInvitation: (id: string) => void;
  clearInvitations: () => void;
  resetInvitationState: () => void;
}

export const useInvitationStore = create<InvitationState>()(
  immer((set, get) => ({
    // Initial state
    invitations: [],
    selectedInvitation: null,
    invitationFilters: {},
    isInvitationModalOpen: false,
    isInvitationFormOpen: false,
    isInvitationLoading: false,
    invitationFormData: null,
    
    // Actions
    setInvitations: (invitations) => set((state) => {
      state.invitations = invitations;
    }),
    
    setSelectedInvitation: (invitation) => set((state) => {
      state.selectedInvitation = invitation;
    }),
    
    setInvitationFilters: (filters) => set((state) => {
      state.invitationFilters = filters;
    }),
    
    setInvitationModalOpen: (isOpen) => set((state) => {
      state.isInvitationModalOpen = isOpen;
    }),
    
    setInvitationFormOpen: (isOpen) => set((state) => {
      state.isInvitationFormOpen = isOpen;
    }),
    
    setInvitationLoading: (isLoading) => set((state) => {
      state.isInvitationLoading = isLoading;
    }),
    
    setInvitationFormData: (data) => set((state) => {
      state.invitationFormData = data;
    }),
    
    addInvitation: (invitation) => set((state) => {
      state.invitations.unshift(invitation);
    }),
    
    updateInvitation: (id, invitationData) => set((state) => {
      const index = state.invitations.findIndex(invitation => invitation.id === id);
      if (index !== -1) {
        state.invitations[index] = { ...state.invitations[index], ...invitationData };
      }
      if (state.selectedInvitation?.id === id) {
        state.selectedInvitation = { ...state.selectedInvitation, ...invitationData };
      }
    }),
    
    removeInvitation: (id) => set((state) => {
      state.invitations = state.invitations.filter(invitation => invitation.id !== id);
      if (state.selectedInvitation?.id === id) {
        state.selectedInvitation = null;
      }
    }),
    
    clearInvitations: () => set((state) => {
      state.invitations = [];
      state.selectedInvitation = null;
    }),
    
    resetInvitationState: () => set((state) => {
      state.invitations = [];
      state.selectedInvitation = null;
      state.invitationFilters = {};
      state.isInvitationModalOpen = false;
      state.isInvitationFormOpen = false;
      state.isInvitationLoading = false;
      state.invitationFormData = null;
    })
  }))
);

// ============================================================================
// ACTIVITY STORE
// ============================================================================

interface ActivityState {
  // Data
  activities: TeamActivity[];
  activityFilters: ActivityFilters;
  
  // UI State
  isActivityLoading: boolean;
  
  // Actions
  setActivities: (activities: TeamActivity[]) => void;
  setActivityFilters: (filters: ActivityFilters) => void;
  setActivityLoading: (isLoading: boolean) => void;
  addActivity: (activity: TeamActivity) => void;
  clearActivities: () => void;
  resetActivityState: () => void;
}

export const useActivityStore = create<ActivityState>()(
  immer((set, get) => ({
    // Initial state
    activities: [],
    activityFilters: {},
    isActivityLoading: false,
    
    // Actions
    setActivities: (activities) => set((state) => {
      state.activities = activities;
    }),
    
    setActivityFilters: (filters) => set((state) => {
      state.activityFilters = filters;
    }),
    
    setActivityLoading: (isLoading) => set((state) => {
      state.isActivityLoading = isLoading;
    }),
    
    addActivity: (activity) => set((state) => {
      state.activities.unshift(activity);
    }),
    
    clearActivities: () => set((state) => {
      state.activities = [];
    }),
    
    resetActivityState: () => set((state) => {
      state.activities = [];
      state.activityFilters = {};
      state.isActivityLoading = false;
    })
  }))
);

// ============================================================================
// STATS STORE
// ============================================================================

interface StatsState {
  // Data
  teamStats: TeamStats | null;
  memberStats: MemberStats | null;
  invitationStats: InvitationStats | null;
  
  // UI State
  isStatsLoading: boolean;
  lastUpdated: string | null;
  
  // Actions
  setTeamStats: (stats: TeamStats) => void;
  setMemberStats: (stats: MemberStats) => void;
  setInvitationStats: (stats: InvitationStats) => void;
  setStatsLoading: (isLoading: boolean) => void;
  setLastUpdated: (timestamp: string) => void;
  clearStats: () => void;
  resetStatsState: () => void;
}

export const useStatsStore = create<StatsState>()(
  immer((set, get) => ({
    // Initial state
    teamStats: null,
    memberStats: null,
    invitationStats: null,
    isStatsLoading: false,
    lastUpdated: null,
    
    // Actions
    setTeamStats: (stats) => set((state) => {
      state.teamStats = stats;
    }),
    
    setMemberStats: (stats) => set((state) => {
      state.memberStats = stats;
    }),
    
    setInvitationStats: (stats) => set((state) => {
      state.invitationStats = stats;
    }),
    
    setStatsLoading: (isLoading) => set((state) => {
      state.isStatsLoading = isLoading;
    }),
    
    setLastUpdated: (timestamp) => set((state) => {
      state.lastUpdated = timestamp;
    }),
    
    clearStats: () => set((state) => {
      state.teamStats = null;
      state.memberStats = null;
      state.invitationStats = null;
    }),
    
    resetStatsState: () => set((state) => {
      state.teamStats = null;
      state.memberStats = null;
      state.invitationStats = null;
      state.isStatsLoading = false;
      state.lastUpdated = null;
    })
  }))
);

// ============================================================================
// USER MEMBERSHIP STORE
// ============================================================================

interface UserMembershipState {
  // Data
  memberships: UserTeamMembership[];
  
  // UI State
  isMembershipLoading: boolean;
  
  // Actions
  setMemberships: (memberships: UserTeamMembership[]) => void;
  setMembershipLoading: (isLoading: boolean) => void;
  addMembership: (membership: UserTeamMembership) => void;
  updateMembership: (teamId: string, membership: Partial<UserTeamMembership>) => void;
  removeMembership: (teamId: string) => void;
  clearMemberships: () => void;
  resetMembershipState: () => void;
}

export const useUserMembershipStore = create<UserMembershipState>()(
  immer((set, get) => ({
    // Initial state
    memberships: [],
    isMembershipLoading: false,
    
    // Actions
    setMemberships: (memberships) => set((state) => {
      state.memberships = memberships;
    }),
    
    setMembershipLoading: (isLoading) => set((state) => {
      state.isMembershipLoading = isLoading;
    }),
    
    addMembership: (membership) => set((state) => {
      state.memberships.unshift(membership);
    }),
    
    updateMembership: (teamId, membershipData) => set((state) => {
      const index = state.memberships.findIndex(membership => membership.teamId === teamId);
      if (index !== -1) {
        state.memberships[index] = { ...state.memberships[index], ...membershipData };
      }
    }),
    
    removeMembership: (teamId) => set((state) => {
      state.memberships = state.memberships.filter(membership => membership.teamId !== teamId);
    }),
    
    clearMemberships: () => set((state) => {
      state.memberships = [];
    }),
    
    resetMembershipState: () => set((state) => {
      state.memberships = [];
      state.isMembershipLoading = false;
    })
  }))
);

// ============================================================================
// PERMISSION STORE
// ============================================================================

interface PermissionState {
  // Data
  permissions: Record<string, string[]>; // teamId -> permissions
  permissionChecks: Record<string, boolean>; // "teamId:userId:permission" -> boolean
  
  // UI State
  isPermissionLoading: boolean;
  
  // Actions
  setPermissions: (teamId: string, permissions: string[]) => void;
  setPermissionCheck: (teamId: string, userId: string, permission: string, hasPermission: boolean) => void;
  setPermissionLoading: (isLoading: boolean) => void;
  clearPermissions: (teamId?: string) => void;
  resetPermissionState: () => void;
}

export const usePermissionStore = create<PermissionState>()(
  immer((set, get) => ({
    // Initial state
    permissions: {},
    permissionChecks: {},
    isPermissionLoading: false,
    
    // Actions
    setPermissions: (teamId, permissions) => set((state) => {
      state.permissions[teamId] = permissions;
    }),
    
    setPermissionCheck: (teamId, userId, permission, hasPermission) => set((state) => {
      const key = `${teamId}:${userId}:${permission}`;
      state.permissionChecks[key] = hasPermission;
    }),
    
    setPermissionLoading: (isLoading) => set((state) => {
      state.isPermissionLoading = isLoading;
    }),
    
    clearPermissions: (teamId) => set((state) => {
      if (teamId) {
        delete state.permissions[teamId];
        // Clear related permission checks
        Object.keys(state.permissionChecks).forEach(key => {
          if (key.startsWith(`${teamId}:`)) {
            delete state.permissionChecks[key];
          }
        });
      } else {
        state.permissions = {};
        state.permissionChecks = {};
      }
    }),
    
    resetPermissionState: () => set((state) => {
      state.permissions = {};
      state.permissionChecks = {};
      state.isPermissionLoading = false;
    })
  }))
);

// ============================================================================
// UI STORE
// ============================================================================

interface UIState {
  // Navigation
  activeTab: 'teams' | 'members' | 'invitations' | 'activities' | 'analytics';
  
  // View modes
  teamViewMode: 'list' | 'grid';
  memberViewMode: 'list' | 'grid';
  invitationViewMode: 'list' | 'grid';
  
  // Sidebar
  isSidebarOpen: boolean;
  sidebarWidth: number;
  
  // Modals
  isSettingsModalOpen: boolean;
  isHelpModalOpen: boolean;
  isInviteModalOpen: boolean;
  
  // Actions
  setActiveTab: (tab: 'teams' | 'members' | 'invitations' | 'activities' | 'analytics') => void;
  setTeamViewMode: (mode: 'list' | 'grid') => void;
  setMemberViewMode: (mode: 'list' | 'grid') => void;
  setInvitationViewMode: (mode: 'list' | 'grid') => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarWidth: (width: number) => void;
  setSettingsModalOpen: (isOpen: boolean) => void;
  setHelpModalOpen: (isOpen: boolean) => void;
  setInviteModalOpen: (isOpen: boolean) => void;
  resetUIState: () => void;
}

export const useUIStore = create<UIState>()(
  immer((set, get) => ({
    // Initial state
    activeTab: 'teams',
    teamViewMode: 'list',
    memberViewMode: 'list',
    invitationViewMode: 'list',
    isSidebarOpen: true,
    sidebarWidth: 300,
    isSettingsModalOpen: false,
    isHelpModalOpen: false,
    isInviteModalOpen: false,
    
    // Actions
    setActiveTab: (tab) => set((state) => {
      state.activeTab = tab;
    }),
    
    setTeamViewMode: (mode) => set((state) => {
      state.teamViewMode = mode;
    }),
    
    setMemberViewMode: (mode) => set((state) => {
      state.memberViewMode = mode;
    }),
    
    setInvitationViewMode: (mode) => set((state) => {
      state.invitationViewMode = mode;
    }),
    
    setSidebarOpen: (isOpen) => set((state) => {
      state.isSidebarOpen = isOpen;
    }),
    
    setSidebarWidth: (width) => set((state) => {
      state.sidebarWidth = width;
    }),
    
    setSettingsModalOpen: (isOpen) => set((state) => {
      state.isSettingsModalOpen = isOpen;
    }),
    
    setHelpModalOpen: (isOpen) => set((state) => {
      state.isHelpModalOpen = isOpen;
    }),
    
    setInviteModalOpen: (isOpen) => set((state) => {
      state.isInviteModalOpen = isOpen;
    }),
    
    resetUIState: () => set((state) => {
      state.activeTab = 'teams';
      state.teamViewMode = 'list';
      state.memberViewMode = 'list';
      state.invitationViewMode = 'list';
      state.isSidebarOpen = true;
      state.sidebarWidth = 300;
      state.isSettingsModalOpen = false;
      state.isHelpModalOpen = false;
      state.isInviteModalOpen = false;
    })
  }))
);

// ============================================================================
// COMBINED STORE SELECTORS
// ============================================================================

/**
 * Selector to get all team-related state
 */
export const useTeamState = () => {
  const teams = useTeamStore((state) => state.teams);
  const selectedTeam = useTeamStore((state) => state.selectedTeam);
  const teamFilters = useTeamStore((state) => state.teamFilters);
  const isTeamModalOpen = useTeamStore((state) => state.isTeamModalOpen);
  const isTeamFormOpen = useTeamStore((state) => state.isTeamFormOpen);
  const isTeamLoading = useTeamStore((state) => state.isTeamLoading);
  const teamFormData = useTeamStore((state) => state.teamFormData);
  
  return {
    teams,
    selectedTeam,
    teamFilters,
    isTeamModalOpen,
    isTeamFormOpen,
    isTeamLoading,
    teamFormData
  };
};

/**
 * Selector to get all member-related state
 */
export const useMemberState = () => {
  const members = useMemberStore((state) => state.members);
  const selectedMember = useMemberStore((state) => state.selectedMember);
  const memberFilters = useMemberStore((state) => state.memberFilters);
  const isMemberModalOpen = useMemberStore((state) => state.isMemberModalOpen);
  const isMemberFormOpen = useMemberStore((state) => state.isMemberFormOpen);
  const isMemberLoading = useMemberStore((state) => state.isMemberLoading);
  
  return {
    members,
    selectedMember,
    memberFilters,
    isMemberModalOpen,
    isMemberFormOpen,
    isMemberLoading
  };
};

/**
 * Selector to get all invitation-related state
 */
export const useInvitationState = () => {
  const invitations = useInvitationStore((state) => state.invitations);
  const selectedInvitation = useInvitationStore((state) => state.selectedInvitation);
  const invitationFilters = useInvitationStore((state) => state.invitationFilters);
  const isInvitationModalOpen = useInvitationStore((state) => state.isInvitationModalOpen);
  const isInvitationFormOpen = useInvitationStore((state) => state.isInvitationFormOpen);
  const isInvitationLoading = useInvitationStore((state) => state.isInvitationLoading);
  const invitationFormData = useInvitationStore((state) => state.invitationFormData);
  
  return {
    invitations,
    selectedInvitation,
    invitationFilters,
    isInvitationModalOpen,
    isInvitationFormOpen,
    isInvitationLoading,
    invitationFormData
  };
};

/**
 * Selector to get all activity-related state
 */
export const useActivityState = () => {
  const activities = useActivityStore((state) => state.activities);
  const activityFilters = useActivityStore((state) => state.activityFilters);
  const isActivityLoading = useActivityStore((state) => state.isActivityLoading);
  
  return {
    activities,
    activityFilters,
    isActivityLoading
  };
};

/**
 * Selector to get all stats-related state
 */
export const useStatsState = () => {
  const teamStats = useStatsStore((state) => state.teamStats);
  const memberStats = useStatsStore((state) => state.memberStats);
  const invitationStats = useStatsStore((state) => state.invitationStats);
  const isStatsLoading = useStatsStore((state) => state.isStatsLoading);
  const lastUpdated = useStatsStore((state) => state.lastUpdated);
  
  return {
    teamStats,
    memberStats,
    invitationStats,
    isStatsLoading,
    lastUpdated
  };
};

/**
 * Selector to get all user membership-related state
 */
export const useUserMembershipState = () => {
  const memberships = useUserMembershipStore((state) => state.memberships);
  const isMembershipLoading = useUserMembershipStore((state) => state.isMembershipLoading);
  
  return {
    memberships,
    isMembershipLoading
  };
};

/**
 * Selector to get all permission-related state
 */
export const usePermissionState = () => {
  const permissions = usePermissionStore((state) => state.permissions);
  const permissionChecks = usePermissionStore((state) => state.permissionChecks);
  const isPermissionLoading = usePermissionStore((state) => state.isPermissionLoading);
  
  return {
    permissions,
    permissionChecks,
    isPermissionLoading
  };
};

/**
 * Selector to get all UI-related state
 */
export const useUIState = () => {
  const activeTab = useUIStore((state) => state.activeTab);
  const teamViewMode = useUIStore((state) => state.teamViewMode);
  const memberViewMode = useUIStore((state) => state.memberViewMode);
  const invitationViewMode = useUIStore((state) => state.invitationViewMode);
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const sidebarWidth = useUIStore((state) => state.sidebarWidth);
  const isSettingsModalOpen = useUIStore((state) => state.isSettingsModalOpen);
  const isHelpModalOpen = useUIStore((state) => state.isHelpModalOpen);
  const isInviteModalOpen = useUIStore((state) => state.isInviteModalOpen);
  
  return {
    activeTab,
    teamViewMode,
    memberViewMode,
    invitationViewMode,
    isSidebarOpen,
    sidebarWidth,
    isSettingsModalOpen,
    isHelpModalOpen,
    isInviteModalOpen
  };
};
