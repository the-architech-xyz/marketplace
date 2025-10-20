/**
 * Teams Management UI Store - Zustand State Management
 * 
 * ⚠️ ARCHITECTURE NOTE:
 * This store manages UI STATE ONLY - not server data!
 * 
 * SERVER DATA (teams, members, etc.) → Use TanStack Query hooks
 * UI STATE (modals, filters, selections) → Use this Zustand store
 * 
 * This separation follows React best practices:
 * - TanStack Query: Automatic caching, revalidation, synchronization
 * - Zustand: UI preferences, form drafts, transient client state
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type {
  TeamFilters,
  MemberFilters,
  InvitationFilters,
  ActivityFilters,
  TeamFormData,
  InvitationFormData,
  TeamRole
} from './types';

// ============================================================================
// TEAM UI STORE (UI State Only)
// ============================================================================

interface TeamUIState {
  // Selection State (just IDs, not full data)
  selectedTeamId: string | null;
  selectedMemberId: string | null;
  selectedInvitationId: string | null;
  
  // Filter State (user preferences)
  teamFilters: TeamFilters;
  memberFilters: MemberFilters;
  invitationFilters: InvitationFilters;
  activityFilters: ActivityFilters;
  
  // Modal/Dialog State
  isTeamModalOpen: boolean;
  isMemberModalOpen: boolean;
  isInvitationModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  isSettingsModalOpen: boolean;
  
  // Form State (drafts before submission)
  teamFormDraft: Partial<TeamFormData> | null;
  invitationFormDraft: Partial<InvitationFormData> | null;
  
  // View State (UI preferences)
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'createdAt' | 'memberCount';
  sortDirection: 'asc' | 'desc';
  
  // Pagination State (client-side)
  currentPage: number;
  itemsPerPage: number;
  
  // Multi-select State (for bulk operations)
  selectedTeamIds: string[];
  selectedMemberIds: string[];
  
  // Actions
  setSelectedTeamId: (id: string | null) => void;
  setSelectedMemberId: (id: string | null) => void;
  setSelectedInvitationId: (id: string | null) => void;
  setTeamFilters: (filters: TeamFilters) => void;
  setMemberFilters: (filters: MemberFilters) => void;
  setInvitationFilters: (filters: InvitationFilters) => void;
  setActivityFilters: (filters: ActivityFilters) => void;
  setTeamModalOpen: (isOpen: boolean) => void;
  setMemberModalOpen: (isOpen: boolean) => void;
  setInvitationModalOpen: (isOpen: boolean) => void;
  setDeleteDialogOpen: (isOpen: boolean) => void;
  setSettingsModalOpen: (isOpen: boolean) => void;
  setTeamFormDraft: (draft: Partial<TeamFormData> | null) => void;
  setInvitationFormDraft: (draft: Partial<InvitationFormData> | null) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sortBy: 'name' | 'createdAt' | 'memberCount') => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  toggleTeamSelection: (id: string) => void;
  toggleMemberSelection: (id: string) => void;
  clearTeamSelections: () => void;
  clearMemberSelections: () => void;
  resetUIState: () => void;
}

export const useTeamUIStore = create<TeamUIState>()(
  persist(
    immer((set) => ({
    // Initial state
      selectedTeamId: null,
      selectedMemberId: null,
      selectedInvitationId: null,
      teamFilters: {},
      memberFilters: {},
      invitationFilters: {},
      activityFilters: {},
      isTeamModalOpen: false,
      isMemberModalOpen: false,
      isInvitationModalOpen: false,
      isDeleteDialogOpen: false,
    isSettingsModalOpen: false,
      teamFormDraft: null,
      invitationFormDraft: null,
      viewMode: 'grid',
      sortBy: 'name',
      sortDirection: 'asc',
      currentPage: 1,
      itemsPerPage: 20,
      selectedTeamIds: [],
      selectedMemberIds: [],
    
    // Actions
      setSelectedTeamId: (id) => set((state) => { state.selectedTeamId = id; }),
      setSelectedMemberId: (id) => set((state) => { state.selectedMemberId = id; }),
      setSelectedInvitationId: (id) => set((state) => { state.selectedInvitationId = id; }),
      setTeamFilters: (filters) => set((state) => { state.teamFilters = filters; }),
      setMemberFilters: (filters) => set((state) => { state.memberFilters = filters; }),
      setInvitationFilters: (filters) => set((state) => { state.invitationFilters = filters; }),
      setActivityFilters: (filters) => set((state) => { state.activityFilters = filters; }),
      setTeamModalOpen: (isOpen) => set((state) => { state.isTeamModalOpen = isOpen; }),
      setMemberModalOpen: (isOpen) => set((state) => { state.isMemberModalOpen = isOpen; }),
      setInvitationModalOpen: (isOpen) => set((state) => { state.isInvitationModalOpen = isOpen; }),
      setDeleteDialogOpen: (isOpen) => set((state) => { state.isDeleteDialogOpen = isOpen; }),
      setSettingsModalOpen: (isOpen) => set((state) => { state.isSettingsModalOpen = isOpen; }),
      setTeamFormDraft: (draft) => set((state) => { state.teamFormDraft = draft; }),
      setInvitationFormDraft: (draft) => set((state) => { state.invitationFormDraft = draft; }),
      setViewMode: (mode) => set((state) => { state.viewMode = mode; }),
      setSortBy: (sortBy) => set((state) => { state.sortBy = sortBy; }),
      setSortDirection: (direction) => set((state) => { state.sortDirection = direction; }),
      setCurrentPage: (page) => set((state) => { state.currentPage = page; }),
      setItemsPerPage: (items) => set((state) => { state.itemsPerPage = items; }),
      
      toggleTeamSelection: (id) => set((state) => {
        const index = state.selectedTeamIds.indexOf(id);
        if (index === -1) {
          state.selectedTeamIds.push(id);
        } else {
          state.selectedTeamIds.splice(index, 1);
        }
      }),
      
      toggleMemberSelection: (id) => set((state) => {
        const index = state.selectedMemberIds.indexOf(id);
        if (index === -1) {
          state.selectedMemberIds.push(id);
        } else {
          state.selectedMemberIds.splice(index, 1);
        }
      }),
      
      clearTeamSelections: () => set((state) => { state.selectedTeamIds = []; }),
      clearMemberSelections: () => set((state) => { state.selectedMemberIds = []; }),
    
    resetUIState: () => set((state) => {
        state.selectedTeamId = null;
        state.selectedMemberId = null;
        state.selectedInvitationId = null;
        state.teamFilters = {};
        state.memberFilters = {};
        state.invitationFilters = {};
        state.activityFilters = {};
        state.isTeamModalOpen = false;
        state.isMemberModalOpen = false;
        state.isInvitationModalOpen = false;
        state.isDeleteDialogOpen = false;
      state.isSettingsModalOpen = false;
        state.teamFormDraft = null;
        state.invitationFormDraft = null;
        state.viewMode = 'grid';
        state.sortBy = 'name';
        state.sortDirection = 'asc';
        state.currentPage = 1;
        state.selectedTeamIds = [];
        state.selectedMemberIds = [];
      })
    })),
    {
      name: 'team-ui-storage',
      // Persist user preferences only (not selections/modals)
      partialize: (state) => ({
        viewMode: state.viewMode,
        sortBy: state.sortBy,
        sortDirection: state.sortDirection,
        itemsPerPage: state.itemsPerPage,
        teamFilters: state.teamFilters,
        memberFilters: state.memberFilters
      })
    }
  )
);

// ============================================================================
// CONVENIENCE SELECTORS
// ============================================================================

// These selectors make it easier to use the store in components
export const useTeamUISelectors = () => {
  const store = useTeamUIStore();
  
  return {
    // Selection
    selectedTeamId: store.selectedTeamId,
    selectedMemberId: store.selectedMemberId,
    hasTeamSelected: !!store.selectedTeamId,
    hasMemberSelected: !!store.selectedMemberId,
    hasMultipleTeamsSelected: store.selectedTeamIds.length > 1,
    selectedTeamCount: store.selectedTeamIds.length,
    
    // Modals
    anyModalOpen: store.isTeamModalOpen || store.isMemberModalOpen || store.isInvitationModalOpen || store.isDeleteDialogOpen || store.isSettingsModalOpen,
    
    // Form drafts
    hasTeamDraft: !!store.teamFormDraft,
    hasInvitationDraft: !!store.invitationFormDraft,
    
    // Filters
    hasActiveFilters: Object.keys(store.teamFilters).length > 0 || Object.keys(store.memberFilters).length > 0,
  };
};
