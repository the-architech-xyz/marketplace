/**
 * Emailing UI Store - Zustand State Management
 * 
 * ⚠️ ARCHITECTURE NOTE:
 * This store manages UI STATE ONLY - not server data!
 * 
 * SERVER DATA (emails, templates, campaigns) → Use TanStack Query hooks
 * UI STATE (modals, filters, composer state) → Use this Zustand store
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type {
  EmailFilters,
  TemplateFilters,
  CampaignFilters,
  EmailFormData,
  TemplateFormData,
  CampaignFormData
} from './types';

interface EmailingUIState {
  // Selection State
  selectedEmailId: string | null;
  selectedTemplateId: string | null;
  selectedCampaignId: string | null;
  
  // Filter State
  emailFilters: EmailFilters;
  templateFilters: TemplateFilters;
  campaignFilters: CampaignFilters;
  
  // Modal State
  isComposerOpen: boolean;
  isTemplateModalOpen: boolean;
  isCampaignModalOpen: boolean;
  isPreviewModalOpen: boolean;
  
  // Form State (drafts)
  emailDraft: Partial<EmailFormData> | null;
  templateDraft: Partial<TemplateFormData> | null;
  campaignDraft: Partial<CampaignFormData> | null;
  
  // View State
  viewMode: 'list' | 'grid';
  sortBy: 'date' | 'subject' | 'status';
  sortDirection: 'asc' | 'desc';
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  
  // Multi-select
  selectedEmailIds: string[];
  
  // Composer state
  composerMode: 'new' | 'reply' | 'forward' | 'draft';
  replyToId: string | null;
  
  // Actions
  setSelectedEmailId: (id: string | null) => void;
  setSelectedTemplateId: (id: string | null) => void;
  setSelectedCampaignId: (id: string | null) => void;
  setEmailFilters: (filters: EmailFilters) => void;
  setTemplateFilters: (filters: TemplateFilters) => void;
  setCampaignFilters: (filters: CampaignFilters) => void;
  setComposerOpen: (isOpen: boolean, mode?: 'new' | 'reply' | 'forward' | 'draft', replyToId?: string | null) => void;
  setTemplateModalOpen: (isOpen: boolean) => void;
  setCampaignModalOpen: (isOpen: boolean) => void;
  setPreviewModalOpen: (isOpen: boolean) => void;
  setEmailDraft: (draft: Partial<EmailFormData> | null) => void;
  setTemplateDraft: (draft: Partial<TemplateFormData> | null) => void;
  setCampaignDraft: (draft: Partial<CampaignFormData> | null) => void;
  setViewMode: (mode: 'list' | 'grid') => void;
  setSortBy: (sortBy: 'date' | 'subject' | 'status') => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  toggleEmailSelection: (id: string) => void;
  clearEmailSelections: () => void;
  resetUIState: () => void;
}

export const useEmailingUIStore = create<EmailingUIState>()(
  persist(
    immer((set) => ({
    // Initial state
      selectedEmailId: null,
      selectedTemplateId: null,
      selectedCampaignId: null,
      emailFilters: {},
      templateFilters: {},
      campaignFilters: {},
      isComposerOpen: false,
      isTemplateModalOpen: false,
      isCampaignModalOpen: false,
      isPreviewModalOpen: false,
      emailDraft: null,
      templateDraft: null,
      campaignDraft: null,
      viewMode: 'list',
      sortBy: 'date',
      sortDirection: 'desc',
      currentPage: 1,
      itemsPerPage: 20,
      selectedEmailIds: [],
      composerMode: 'new',
      replyToId: null,
    
    // Actions
      setSelectedEmailId: (id) => set((state) => { state.selectedEmailId = id; }),
      setSelectedTemplateId: (id) => set((state) => { state.selectedTemplateId = id; }),
      setSelectedCampaignId: (id) => set((state) => { state.selectedCampaignId = id; }),
      setEmailFilters: (filters) => set((state) => { state.emailFilters = filters; }),
      setTemplateFilters: (filters) => set((state) => { state.templateFilters = filters; }),
      setCampaignFilters: (filters) => set((state) => { state.campaignFilters = filters; }),
      setComposerOpen: (isOpen, mode = 'new', replyToId = null) => set((state) => {
        state.isComposerOpen = isOpen;
        state.composerMode = mode;
        state.replyToId = replyToId;
      }),
      setTemplateModalOpen: (isOpen) => set((state) => { state.isTemplateModalOpen = isOpen; }),
      setCampaignModalOpen: (isOpen) => set((state) => { state.isCampaignModalOpen = isOpen; }),
      setPreviewModalOpen: (isOpen) => set((state) => { state.isPreviewModalOpen = isOpen; }),
      setEmailDraft: (draft) => set((state) => { state.emailDraft = draft; }),
      setTemplateDraft: (draft) => set((state) => { state.templateDraft = draft; }),
      setCampaignDraft: (draft) => set((state) => { state.campaignDraft = draft; }),
      setViewMode: (mode) => set((state) => { state.viewMode = mode; }),
      setSortBy: (sortBy) => set((state) => { state.sortBy = sortBy; }),
      setSortDirection: (direction) => set((state) => { state.sortDirection = direction; }),
      setCurrentPage: (page) => set((state) => { state.currentPage = page; }),
      setItemsPerPage: (items) => set((state) => { state.itemsPerPage = items; }),
      toggleEmailSelection: (id) => set((state) => {
        const index = state.selectedEmailIds.indexOf(id);
        if (index === -1) state.selectedEmailIds.push(id);
        else state.selectedEmailIds.splice(index, 1);
      }),
      clearEmailSelections: () => set((state) => { state.selectedEmailIds = []; }),
    resetUIState: () => set((state) => {
        state.selectedEmailId = null;
        state.selectedTemplateId = null;
        state.selectedCampaignId = null;
        state.emailFilters = {};
        state.templateFilters = {};
        state.campaignFilters = {};
        state.isComposerOpen = false;
        state.isTemplateModalOpen = false;
        state.isCampaignModalOpen = false;
        state.isPreviewModalOpen = false;
        state.emailDraft = null;
        state.templateDraft = null;
        state.campaignDraft = null;
        state.composerMode = 'new';
        state.replyToId = null;
        state.selectedEmailIds = [];
      })
    })),
    {
      name: 'emailing-ui-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
        sortBy: state.sortBy,
        sortDirection: state.sortDirection,
        itemsPerPage: state.itemsPerPage,
        emailFilters: state.emailFilters
      })
    }
  )
);
