/**
 * Emailing Feature Stores - Zustand State Management
 * 
 * This file contains all Zustand stores for the Emailing feature.
 * These stores provide consistent state management patterns across all implementations.
 * 
 * Generated from: features/emailing/contract.ts
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  Email,
  EmailTemplate,
  EmailCampaign,
  EmailFilters,
  TemplateFilters,
  CampaignFilters,
  EmailFormData,
  TemplateFormData,
  CampaignFormData,
  EmailStats,
  TemplateStats,
  CampaignStats
} from './types';

// ============================================================================
// EMAIL STORE
// ============================================================================

interface EmailState {
  // Data
  emails: Email[];
  selectedEmail: Email | null;
  emailFilters: EmailFilters;
  
  // UI State
  isEmailModalOpen: boolean;
  isEmailFormOpen: boolean;
  isEmailLoading: boolean;
  emailFormData: EmailFormData | null;
  
  // Actions
  setEmails: (emails: Email[]) => void;
  setSelectedEmail: (email: Email | null) => void;
  setEmailFilters: (filters: EmailFilters) => void;
  setEmailModalOpen: (isOpen: boolean) => void;
  setEmailFormOpen: (isOpen: boolean) => void;
  setEmailLoading: (isLoading: boolean) => void;
  setEmailFormData: (data: EmailFormData | null) => void;
  addEmail: (email: Email) => void;
  updateEmail: (id: string, email: Partial<Email>) => void;
  removeEmail: (id: string) => void;
  clearEmails: () => void;
  resetEmailState: () => void;
}

export const useEmailStore = create<EmailState>()(
  immer((set, get) => ({
    // Initial state
    emails: [],
    selectedEmail: null,
    emailFilters: {},
    isEmailModalOpen: false,
    isEmailFormOpen: false,
    isEmailLoading: false,
    emailFormData: null,
    
    // Actions
    setEmails: (emails) => set((state) => {
      state.emails = emails;
    }),
    
    setSelectedEmail: (email) => set((state) => {
      state.selectedEmail = email;
    }),
    
    setEmailFilters: (filters) => set((state) => {
      state.emailFilters = filters;
    }),
    
    setEmailModalOpen: (isOpen) => set((state) => {
      state.isEmailModalOpen = isOpen;
    }),
    
    setEmailFormOpen: (isOpen) => set((state) => {
      state.isEmailFormOpen = isOpen;
    }),
    
    setEmailLoading: (isLoading) => set((state) => {
      state.isEmailLoading = isLoading;
    }),
    
    setEmailFormData: (data) => set((state) => {
      state.emailFormData = data;
    }),
    
    addEmail: (email) => set((state) => {
      state.emails.unshift(email);
    }),
    
    updateEmail: (id, emailData) => set((state) => {
      const index = state.emails.findIndex(email => email.id === id);
      if (index !== -1) {
        state.emails[index] = { ...state.emails[index], ...emailData };
      }
      if (state.selectedEmail?.id === id) {
        state.selectedEmail = { ...state.selectedEmail, ...emailData };
      }
    }),
    
    removeEmail: (id) => set((state) => {
      state.emails = state.emails.filter(email => email.id !== id);
      if (state.selectedEmail?.id === id) {
        state.selectedEmail = null;
      }
    }),
    
    clearEmails: () => set((state) => {
      state.emails = [];
      state.selectedEmail = null;
    }),
    
    resetEmailState: () => set((state) => {
      state.emails = [];
      state.selectedEmail = null;
      state.emailFilters = {};
      state.isEmailModalOpen = false;
      state.isEmailFormOpen = false;
      state.isEmailLoading = false;
      state.emailFormData = null;
    })
  }))
);

// ============================================================================
// TEMPLATE STORE
// ============================================================================

interface TemplateState {
  // Data
  templates: EmailTemplate[];
  selectedTemplate: EmailTemplate | null;
  templateFilters: TemplateFilters;
  
  // UI State
  isTemplateModalOpen: boolean;
  isTemplateFormOpen: boolean;
  isTemplateLoading: boolean;
  templateFormData: TemplateFormData | null;
  
  // Actions
  setTemplates: (templates: EmailTemplate[]) => void;
  setSelectedTemplate: (template: EmailTemplate | null) => void;
  setTemplateFilters: (filters: TemplateFilters) => void;
  setTemplateModalOpen: (isOpen: boolean) => void;
  setTemplateFormOpen: (isOpen: boolean) => void;
  setTemplateLoading: (isLoading: boolean) => void;
  setTemplateFormData: (data: TemplateFormData | null) => void;
  addTemplate: (template: EmailTemplate) => void;
  updateTemplate: (id: string, template: Partial<EmailTemplate>) => void;
  removeTemplate: (id: string) => void;
  clearTemplates: () => void;
  resetTemplateState: () => void;
}

export const useTemplateStore = create<TemplateState>()(
  immer((set, get) => ({
    // Initial state
    templates: [],
    selectedTemplate: null,
    templateFilters: {},
    isTemplateModalOpen: false,
    isTemplateFormOpen: false,
    isTemplateLoading: false,
    templateFormData: null,
    
    // Actions
    setTemplates: (templates) => set((state) => {
      state.templates = templates;
    }),
    
    setSelectedTemplate: (template) => set((state) => {
      state.selectedTemplate = template;
    }),
    
    setTemplateFilters: (filters) => set((state) => {
      state.templateFilters = filters;
    }),
    
    setTemplateModalOpen: (isOpen) => set((state) => {
      state.isTemplateModalOpen = isOpen;
    }),
    
    setTemplateFormOpen: (isOpen) => set((state) => {
      state.isTemplateFormOpen = isOpen;
    }),
    
    setTemplateLoading: (isLoading) => set((state) => {
      state.isTemplateLoading = isLoading;
    }),
    
    setTemplateFormData: (data) => set((state) => {
      state.templateFormData = data;
    }),
    
    addTemplate: (template) => set((state) => {
      state.templates.unshift(template);
    }),
    
    updateTemplate: (id, templateData) => set((state) => {
      const index = state.templates.findIndex(template => template.id === id);
      if (index !== -1) {
        state.templates[index] = { ...state.templates[index], ...templateData };
      }
      if (state.selectedTemplate?.id === id) {
        state.selectedTemplate = { ...state.selectedTemplate, ...templateData };
      }
    }),
    
    removeTemplate: (id) => set((state) => {
      state.templates = state.templates.filter(template => template.id !== id);
      if (state.selectedTemplate?.id === id) {
        state.selectedTemplate = null;
      }
    }),
    
    clearTemplates: () => set((state) => {
      state.templates = [];
      state.selectedTemplate = null;
    }),
    
    resetTemplateState: () => set((state) => {
      state.templates = [];
      state.selectedTemplate = null;
      state.templateFilters = {};
      state.isTemplateModalOpen = false;
      state.isTemplateFormOpen = false;
      state.isTemplateLoading = false;
      state.templateFormData = null;
    })
  }))
);

// ============================================================================
// CAMPAIGN STORE
// ============================================================================

interface CampaignState {
  // Data
  campaigns: EmailCampaign[];
  selectedCampaign: EmailCampaign | null;
  campaignFilters: CampaignFilters;
  
  // UI State
  isCampaignModalOpen: boolean;
  isCampaignFormOpen: boolean;
  isCampaignLoading: boolean;
  campaignFormData: CampaignFormData | null;
  
  // Actions
  setCampaigns: (campaigns: EmailCampaign[]) => void;
  setSelectedCampaign: (campaign: EmailCampaign | null) => void;
  setCampaignFilters: (filters: CampaignFilters) => void;
  setCampaignModalOpen: (isOpen: boolean) => void;
  setCampaignFormOpen: (isOpen: boolean) => void;
  setCampaignLoading: (isLoading: boolean) => void;
  setCampaignFormData: (data: CampaignFormData | null) => void;
  addCampaign: (campaign: EmailCampaign) => void;
  updateCampaign: (id: string, campaign: Partial<EmailCampaign>) => void;
  removeCampaign: (id: string) => void;
  clearCampaigns: () => void;
  resetCampaignState: () => void;
}

export const useCampaignStore = create<CampaignState>()(
  immer((set, get) => ({
    // Initial state
    campaigns: [],
    selectedCampaign: null,
    campaignFilters: {},
    isCampaignModalOpen: false,
    isCampaignFormOpen: false,
    isCampaignLoading: false,
    campaignFormData: null,
    
    // Actions
    setCampaigns: (campaigns) => set((state) => {
      state.campaigns = campaigns;
    }),
    
    setSelectedCampaign: (campaign) => set((state) => {
      state.selectedCampaign = campaign;
    }),
    
    setCampaignFilters: (filters) => set((state) => {
      state.campaignFilters = filters;
    }),
    
    setCampaignModalOpen: (isOpen) => set((state) => {
      state.isCampaignModalOpen = isOpen;
    }),
    
    setCampaignFormOpen: (isOpen) => set((state) => {
      state.isCampaignFormOpen = isOpen;
    }),
    
    setCampaignLoading: (isLoading) => set((state) => {
      state.isCampaignLoading = isLoading;
    }),
    
    setCampaignFormData: (data) => set((state) => {
      state.campaignFormData = data;
    }),
    
    addCampaign: (campaign) => set((state) => {
      state.campaigns.unshift(campaign);
    }),
    
    updateCampaign: (id, campaignData) => set((state) => {
      const index = state.campaigns.findIndex(campaign => campaign.id === id);
      if (index !== -1) {
        state.campaigns[index] = { ...state.campaigns[index], ...campaignData };
      }
      if (state.selectedCampaign?.id === id) {
        state.selectedCampaign = { ...state.selectedCampaign, ...campaignData };
      }
    }),
    
    removeCampaign: (id) => set((state) => {
      state.campaigns = state.campaigns.filter(campaign => campaign.id !== id);
      if (state.selectedCampaign?.id === id) {
        state.selectedCampaign = null;
      }
    }),
    
    clearCampaigns: () => set((state) => {
      state.campaigns = [];
      state.selectedCampaign = null;
    }),
    
    resetCampaignState: () => set((state) => {
      state.campaigns = [];
      state.selectedCampaign = null;
      state.campaignFilters = {};
      state.isCampaignModalOpen = false;
      state.isCampaignFormOpen = false;
      state.isCampaignLoading = false;
      state.campaignFormData = null;
    })
  }))
);

// ============================================================================
// STATS STORE
// ============================================================================

interface StatsState {
  // Data
  emailStats: EmailStats | null;
  templateStats: TemplateStats | null;
  campaignStats: CampaignStats | null;
  
  // UI State
  isStatsLoading: boolean;
  lastUpdated: string | null;
  
  // Actions
  setEmailStats: (stats: EmailStats) => void;
  setTemplateStats: (stats: TemplateStats) => void;
  setCampaignStats: (stats: CampaignStats) => void;
  setStatsLoading: (isLoading: boolean) => void;
  setLastUpdated: (timestamp: string) => void;
  clearStats: () => void;
  resetStatsState: () => void;
}

export const useStatsStore = create<StatsState>()(
  immer((set, get) => ({
    // Initial state
    emailStats: null,
    templateStats: null,
    campaignStats: null,
    isStatsLoading: false,
    lastUpdated: null,
    
    // Actions
    setEmailStats: (stats) => set((state) => {
      state.emailStats = stats;
    }),
    
    setTemplateStats: (stats) => set((state) => {
      state.templateStats = stats;
    }),
    
    setCampaignStats: (stats) => set((state) => {
      state.campaignStats = stats;
    }),
    
    setStatsLoading: (isLoading) => set((state) => {
      state.isStatsLoading = isLoading;
    }),
    
    setLastUpdated: (timestamp) => set((state) => {
      state.lastUpdated = timestamp;
    }),
    
    clearStats: () => set((state) => {
      state.emailStats = null;
      state.templateStats = null;
      state.campaignStats = null;
    }),
    
    resetStatsState: () => set((state) => {
      state.emailStats = null;
      state.templateStats = null;
      state.campaignStats = null;
      state.isStatsLoading = false;
      state.lastUpdated = null;
    })
  }))
);

// ============================================================================
// UI STORE
// ============================================================================

interface UIState {
  // Navigation
  activeTab: 'emails' | 'templates' | 'campaigns' | 'analytics';
  
  // View modes
  emailViewMode: 'list' | 'grid';
  templateViewMode: 'list' | 'grid';
  campaignViewMode: 'list' | 'grid';
  
  // Sidebar
  isSidebarOpen: boolean;
  sidebarWidth: number;
  
  // Modals
  isSettingsModalOpen: boolean;
  isHelpModalOpen: boolean;
  
  // Actions
  setActiveTab: (tab: 'emails' | 'templates' | 'campaigns' | 'analytics') => void;
  setEmailViewMode: (mode: 'list' | 'grid') => void;
  setTemplateViewMode: (mode: 'list' | 'grid') => void;
  setCampaignViewMode: (mode: 'list' | 'grid') => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarWidth: (width: number) => void;
  setSettingsModalOpen: (isOpen: boolean) => void;
  setHelpModalOpen: (isOpen: boolean) => void;
  resetUIState: () => void;
}

export const useUIStore = create<UIState>()(
  immer((set, get) => ({
    // Initial state
    activeTab: 'emails',
    emailViewMode: 'list',
    templateViewMode: 'list',
    campaignViewMode: 'list',
    isSidebarOpen: true,
    sidebarWidth: 300,
    isSettingsModalOpen: false,
    isHelpModalOpen: false,
    
    // Actions
    setActiveTab: (tab) => set((state) => {
      state.activeTab = tab;
    }),
    
    setEmailViewMode: (mode) => set((state) => {
      state.emailViewMode = mode;
    }),
    
    setTemplateViewMode: (mode) => set((state) => {
      state.templateViewMode = mode;
    }),
    
    setCampaignViewMode: (mode) => set((state) => {
      state.campaignViewMode = mode;
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
    
    resetUIState: () => set((state) => {
      state.activeTab = 'emails';
      state.emailViewMode = 'list';
      state.templateViewMode = 'list';
      state.campaignViewMode = 'list';
      state.isSidebarOpen = true;
      state.sidebarWidth = 300;
      state.isSettingsModalOpen = false;
      state.isHelpModalOpen = false;
    })
  }))
);

// ============================================================================
// COMBINED STORE SELECTORS
// ============================================================================

/**
 * Selector to get all email-related state
 */
export const useEmailState = () => {
  const emails = useEmailStore((state) => state.emails);
  const selectedEmail = useEmailStore((state) => state.selectedEmail);
  const emailFilters = useEmailStore((state) => state.emailFilters);
  const isEmailModalOpen = useEmailStore((state) => state.isEmailModalOpen);
  const isEmailFormOpen = useEmailStore((state) => state.isEmailFormOpen);
  const isEmailLoading = useEmailStore((state) => state.isEmailLoading);
  const emailFormData = useEmailStore((state) => state.emailFormData);
  
  return {
    emails,
    selectedEmail,
    emailFilters,
    isEmailModalOpen,
    isEmailFormOpen,
    isEmailLoading,
    emailFormData
  };
};

/**
 * Selector to get all template-related state
 */
export const useTemplateState = () => {
  const templates = useTemplateStore((state) => state.templates);
  const selectedTemplate = useTemplateStore((state) => state.selectedTemplate);
  const templateFilters = useTemplateStore((state) => state.templateFilters);
  const isTemplateModalOpen = useTemplateStore((state) => state.isTemplateModalOpen);
  const isTemplateFormOpen = useTemplateStore((state) => state.isTemplateFormOpen);
  const isTemplateLoading = useTemplateStore((state) => state.isTemplateLoading);
  const templateFormData = useTemplateStore((state) => state.templateFormData);
  
  return {
    templates,
    selectedTemplate,
    templateFilters,
    isTemplateModalOpen,
    isTemplateFormOpen,
    isTemplateLoading,
    templateFormData
  };
};

/**
 * Selector to get all campaign-related state
 */
export const useCampaignState = () => {
  const campaigns = useCampaignStore((state) => state.campaigns);
  const selectedCampaign = useCampaignStore((state) => state.selectedCampaign);
  const campaignFilters = useCampaignStore((state) => state.campaignFilters);
  const isCampaignModalOpen = useCampaignStore((state) => state.isCampaignModalOpen);
  const isCampaignFormOpen = useCampaignStore((state) => state.isCampaignFormOpen);
  const isCampaignLoading = useCampaignStore((state) => state.isCampaignLoading);
  const campaignFormData = useCampaignStore((state) => state.campaignFormData);
  
  return {
    campaigns,
    selectedCampaign,
    campaignFilters,
    isCampaignModalOpen,
    isCampaignFormOpen,
    isCampaignLoading,
    campaignFormData
  };
};

/**
 * Selector to get all stats-related state
 */
export const useStatsState = () => {
  const emailStats = useStatsStore((state) => state.emailStats);
  const templateStats = useStatsStore((state) => state.templateStats);
  const campaignStats = useStatsStore((state) => state.campaignStats);
  const isStatsLoading = useStatsStore((state) => state.isStatsLoading);
  const lastUpdated = useStatsStore((state) => state.lastUpdated);
  
  return {
    emailStats,
    templateStats,
    campaignStats,
    isStatsLoading,
    lastUpdated
  };
};

/**
 * Selector to get all UI-related state
 */
export const useUIState = () => {
  const activeTab = useUIStore((state) => state.activeTab);
  const emailViewMode = useUIStore((state) => state.emailViewMode);
  const templateViewMode = useUIStore((state) => state.templateViewMode);
  const campaignViewMode = useUIStore((state) => state.campaignViewMode);
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const sidebarWidth = useUIStore((state) => state.sidebarWidth);
  const isSettingsModalOpen = useUIStore((state) => state.isSettingsModalOpen);
  const isHelpModalOpen = useUIStore((state) => state.isHelpModalOpen);
  
  return {
    activeTab,
    emailViewMode,
    templateViewMode,
    campaignViewMode,
    isSidebarOpen,
    sidebarWidth,
    isSettingsModalOpen,
    isHelpModalOpen
  };
};
