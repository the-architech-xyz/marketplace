/**
 * Monitoring UI Store - Zustand State Management
 * 
 * ⚠️ ARCHITECTURE NOTE:
 * This store manages UI STATE ONLY - not server data!
 * 
 * SERVER DATA (errors, metrics, logs) → Use TanStack Query hooks
 * UI STATE (filters, date ranges, view preferences) → Use this Zustand store
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import type {
  ErrorFilters,
  FeedbackFilters,
  DateRange
} from './types';

interface MonitoringUIState {
  // Selection State
  selectedErrorId: string | null;
  selectedFeedbackId: string | null;
  selectedAlertId: string | null;
  
  // Filter State
  errorFilters: ErrorFilters;
  feedbackFilters: FeedbackFilters;
  dateRange: DateRange;
  
  // Modal State
  isErrorDetailsOpen: boolean;
  isFeedbackModalOpen: boolean;
  isAlertSettingsOpen: boolean;
  
  // View State
  dashboardView: 'overview' | 'errors' | 'performance' | 'alerts';
  chartTimeRange: '1h' | '24h' | '7d' | '30d';
  refreshInterval: number; // in ms
  
  // UI Preferences
  showResolved Errors: boolean;
  groupErrorsBy: 'type' | 'page' | 'user';
  
  // Actions
  setSelectedErrorId: (id: string | null) => void;
  setSelectedFeedbackId: (id: string | null) => void;
  setSelectedAlertId: (id: string | null) => void;
  setErrorFilters: (filters: ErrorFilters) => void;
  setFeedbackFilters: (filters: FeedbackFilters) => void;
  setDateRange: (range: DateRange) => void;
  setErrorDetailsOpen: (isOpen: boolean) => void;
  setFeedbackModalOpen: (isOpen: boolean) => void;
  setAlertSettingsOpen: (isOpen: boolean) => void;
  setDashboardView: (view: 'overview' | 'errors' | 'performance' | 'alerts') => void;
  setChartTimeRange: (range: '1h' | '24h' | '7d' | '30d') => void;
  setRefreshInterval: (interval: number) => void;
  setShowResolvedErrors: (show: boolean) => void;
  setGroupErrorsBy: (groupBy: 'type' | 'page' | 'user') => void;
  resetUIState: () => void;
}

export const useMonitoringUIStore = create<MonitoringUIState>()(
  persist(
    immer((set) => ({
      // Initial state
      selectedErrorId: null,
      selectedFeedbackId: null,
      selectedAlertId: null,
      errorFilters: {},
      feedbackFilters: {},
      dateRange: { from: new Date(Date.now() - 24 * 60 * 60 * 1000), to: new Date() },
      isErrorDetailsOpen: false,
      isFeedbackModalOpen: false,
      isAlertSettingsOpen: false,
      dashboardView: 'overview',
      chartTimeRange: '24h',
      refreshInterval: 30000, // 30 seconds
      showResolvedErrors: false,
      groupErrorsBy: 'type',

      // Actions
      setSelectedErrorId: (id) => set((state) => { state.selectedErrorId = id; }),
      setSelectedFeedbackId: (id) => set((state) => { state.selectedFeedbackId = id; }),
      setSelectedAlertId: (id) => set((state) => { state.selectedAlertId = id; }),
      setErrorFilters: (filters) => set((state) => { state.errorFilters = filters; }),
      setFeedbackFilters: (filters) => set((state) => { state.feedbackFilters = filters; }),
      setDateRange: (range) => set((state) => { state.dateRange = range; }),
      setErrorDetailsOpen: (isOpen) => set((state) => { state.isErrorDetailsOpen = isOpen; }),
      setFeedbackModalOpen: (isOpen) => set((state) => { state.isFeedbackModalOpen = isOpen; }),
      setAlertSettingsOpen: (isOpen) => set((state) => { state.isAlertSettingsOpen = isOpen; }),
      setDashboardView: (view) => set((state) => { state.dashboardView = view; }),
      setChartTimeRange: (range) => set((state) => { state.chartTimeRange = range; }),
      setRefreshInterval: (interval) => set((state) => { state.refreshInterval = interval; }),
      setShowResolvedErrors: (show) => set((state) => { state.showResolvedErrors = show; }),
      setGroupErrorsBy: (groupBy) => set((state) => { state.groupErrorsBy = groupBy; }),
      resetUIState: () => set((state) => {
        state.selectedErrorId = null;
        state.selectedFeedbackId = null;
        state.selectedAlertId = null;
        state.errorFilters = {};
        state.feedbackFilters = {};
        state.isErrorDetailsOpen = false;
        state.isFeedbackModalOpen = false;
        state.isAlertSettingsOpen = false;
        state.dashboardView = 'overview';
      })
    })),
    {
      name: 'monitoring-ui-storage',
      partialize: (state) => ({
        dashboardView: state.dashboardView,
        chartTimeRange: state.chartTimeRange,
        refreshInterval: state.refreshInterval,
        showResolvedErrors: state.showResolvedErrors,
        groupErrorsBy: state.groupErrorsBy
      })
    }
  )
);
