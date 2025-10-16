/**
 * Monitoring Feature State Management Stores
 * 
 * Zustand stores for state management, providing consistent state patterns
 * across all frontend implementations. These stores handle UI state, data state,
 * and computed values for the Monitoring feature.
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  ErrorData,
  PerformanceMetrics,
  UserFeedback,
  Alert,
  AlertSettings,
  MonitoringDashboard,
  HealthCheck,
  HealthCheckResult,
  MonitoringState,
  ErrorDetailsState,
  PerformanceState,
  FeedbackState,
  AlertState,
  ErrorSeverity,
  ErrorStatus,
  FeedbackType,
  FeedbackStatus,
  FeedbackPriority,
  AlertType,
  AlertStatus,
  HealthStatus,
  TrendStatus,
  PaginationInfo,
  SortOptions,
  FilterOptions,
  ChartDataPoint,
  ChartSeries,
  TimeSeriesData,
  MetricComparison
} from './types';

// ============================================================================
// MONITORING STORE
// ============================================================================

interface MonitoringStore extends MonitoringState {
  // Actions
  setErrors: (errors: ErrorData[]) => void;
  addError: (error: ErrorData) => void;
  updateError: (errorId: string, updates: Partial<ErrorData>) => void;
  removeError: (errorId: string) => void;
  setPerformanceMetrics: (metrics: PerformanceMetrics[]) => void;
  addPerformanceMetric: (metric: PerformanceMetrics) => void;
  setUserFeedback: (feedback: UserFeedback[]) => void;
  addUserFeedback: (feedback: UserFeedback) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  updateAlert: (alertId: string, updates: Partial<Alert>) => void;
  removeAlert: (alertId: string) => void;
  setDashboard: (dashboard: MonitoringDashboard | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed values
  getCriticalErrors: () => ErrorData[];
  getUnresolvedErrors: () => ErrorData[];
  getErrorsBySeverity: (severity: ErrorStatus) => ErrorData[];
  getErrorCount: () => number;
  getCriticalErrorCount: () => number;
  getUnresolvedErrorCount: () => number;
  getAverageResponseTime: () => number;
  getUptime: () => number;
  getActiveAlerts: () => Alert[];
  getAlertCount: () => number;
  getCriticalAlertCount: () => number;
}

export const useMonitoringStore = create<MonitoringStore>()(
  subscribeWithSelector(
    immer((set, get) => ({
      // Initial state
      errors: [],
      performanceMetrics: [],
      userFeedback: [],
      alerts: [],
      dashboard: null,
      isLoading: false,
      error: null,

      // Actions
      setErrors: (errors) => set((state) => {
        state.errors = errors;
        state.error = null;
      }),

      addError: (error) => set((state) => {
        state.errors.unshift(error);
      }),

      updateError: (errorId, updates) => set((state) => {
        const index = state.errors.findIndex(e => e.id === errorId);
        if (index !== -1) {
          Object.assign(state.errors[index], updates);
        }
      }),

      removeError: (errorId) => set((state) => {
        state.errors = state.errors.filter(e => e.id !== errorId);
      }),

      setPerformanceMetrics: (metrics) => set((state) => {
        state.performanceMetrics = metrics;
      }),

      addPerformanceMetric: (metric) => set((state) => {
        state.performanceMetrics.push(metric);
      }),

      setUserFeedback: (feedback) => set((state) => {
        state.userFeedback = feedback;
      }),

      addUserFeedback: (feedback) => set((state) => {
        state.userFeedback.unshift(feedback);
      }),

      setAlerts: (alerts) => set((state) => {
        state.alerts = alerts;
      }),

      addAlert: (alert) => set((state) => {
        state.alerts.unshift(alert);
      }),

      updateAlert: (alertId, updates) => set((state) => {
        const index = state.alerts.findIndex(a => a.id === alertId);
        if (index !== -1) {
          Object.assign(state.alerts[index], updates);
        }
      }),

      removeAlert: (alertId) => set((state) => {
        state.alerts = state.alerts.filter(a => a.id !== alertId);
      }),

      setDashboard: (dashboard) => set((state) => {
        state.dashboard = dashboard;
      }),

      setLoading: (loading) => set((state) => {
        state.isLoading = loading;
      }),

      setError: (error) => set((state) => {
        state.error = error;
      }),

      // Computed values
      getCriticalErrors: () => {
        const { errors } = get();
        return errors.filter(e => e.severity === 'critical');
      },

      getUnresolvedErrors: () => {
        const { errors } = get();
        return errors.filter(e => e.status === 'unresolved');
      },

      getErrorsBySeverity: (severity) => {
        const { errors } = get();
        return errors.filter(e => e.severity === severity);
      },

      getErrorCount: () => {
        const { errors } = get();
        return errors.length;
      },

      getCriticalErrorCount: () => {
        const { errors } = get();
        return errors.filter(e => e.severity === 'critical').length;
      },

      getUnresolvedErrorCount: () => {
        const { errors } = get();
        return errors.filter(e => e.status === 'unresolved').length;
      },

      getAverageResponseTime: () => {
        const { performanceMetrics } = get();
        if (performanceMetrics.length === 0) return 0;
        
        const total = performanceMetrics.reduce((sum, metric) => sum + metric.pageLoadTime, 0);
        return total / performanceMetrics.length;
      },

      getUptime: () => {
        const { dashboard } = get();
        return dashboard?.summary.uptime || 0;
      },

      getActiveAlerts: () => {
        const { alerts } = get();
        return alerts.filter(a => a.status === 'active');
      },

      getAlertCount: () => {
        const { alerts } = get();
        return alerts.length;
      },

      getCriticalAlertCount: () => {
        const { alerts } = get();
        return alerts.filter(a => a.severity === 'critical').length;
      },
    }))
  )
);

// ============================================================================
// ERROR DETAILS STORE
// ============================================================================

interface ErrorDetailsStore extends ErrorDetailsState {
  // Actions
  setError: (error: ErrorData | null) => void;
  setTrends: (trends: any[]) => void;
  setRelatedErrors: (errors: ErrorData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed values
  getErrorSeverity: () => ErrorSeverity | null;
  getErrorStatus: () => ErrorStatus | null;
  getErrorCount: () => number;
  getAffectedUsers: () => number;
  getTimeSinceFirstSeen: () => string | null;
  getTimeSinceLastSeen: () => string | null;
  isErrorResolved: () => boolean;
  isErrorIgnored: () => boolean;
}

export const useErrorDetailsStore = create<ErrorDetailsStore>()(
  subscribeWithSelector(
    immer((set, get) => ({
      // Initial state
      error: null,
      trends: [],
      relatedErrors: [],
      isLoading: false,
      error: null,

      // Actions
      setError: (error) => set((state) => {
        state.error = error;
        state.error = null;
      }),

      setTrends: (trends) => set((state) => {
        state.trends = trends;
      }),

      setRelatedErrors: (errors) => set((state) => {
        state.relatedErrors = errors;
      }),

      setLoading: (loading) => set((state) => {
        state.isLoading = loading;
      }),

      setError: (error) => set((state) => {
        state.error = error;
      }),

      // Computed values
      getErrorSeverity: () => {
        const { error } = get();
        return error?.severity || null;
      },

      getErrorStatus: () => {
        const { error } = get();
        return error?.status || null;
      },

      getErrorCount: () => {
        const { error } = get();
        return error?.count || 0;
      },

      getAffectedUsers: () => {
        const { error } = get();
        return error?.affectedUsers || 0;
      },

      getTimeSinceFirstSeen: () => {
        const { error } = get();
        if (!error) return null;
        
        const now = new Date();
        const diff = now.getTime() - error.firstSeen.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        return `${days} days ago`;
      },

      getTimeSinceLastSeen: () => {
        const { error } = get();
        if (!error) return null;
        
        const now = new Date();
        const diff = now.getTime() - error.lastSeen.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} minutes ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        
        const days = Math.floor(hours / 24);
        return `${days} days ago`;
      },

      isErrorResolved: () => {
        const { error } = get();
        return error?.status === 'resolved';
      },

      isErrorIgnored: () => {
        const { error } = get();
        return error?.status === 'ignored';
      },
    }))
  )
);

// ============================================================================
// PERFORMANCE STORE
// ============================================================================

interface PerformanceStore extends PerformanceState {
  // Actions
  setMetrics: (metrics: PerformanceMetrics[]) => void;
  addMetric: (metric: PerformanceMetrics) => void;
  setTrends: (trends: any[]) => void;
  setCurrentMetrics: (metrics: PerformanceMetrics | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed values
  getAveragePageLoadTime: () => number;
  getAverageFirstContentfulPaint: () => number;
  getAverageLargestContentfulPaint: () => number;
  getAverageFirstInputDelay: () => number;
  getAverageCumulativeLayoutShift: () => number;
  getAverageTotalBlockingTime: () => number;
  getAverageSpeedIndex: () => number;
  getAverageTimeToInteractive: () => number;
  getPerformanceScore: () => number;
  getPerformanceStatus: () => 'good' | 'needs_improvement' | 'poor';
  getLatestMetrics: () => PerformanceMetrics | null;
}

export const usePerformanceStore = create<PerformanceStore>()(
  subscribeWithSelector(
    immer((set, get) => ({
      // Initial state
      metrics: [],
      trends: [],
      currentMetrics: null,
      isLoading: false,
      error: null,

      // Actions
      setMetrics: (metrics) => set((state) => {
        state.metrics = metrics;
        state.error = null;
      }),

      addMetric: (metric) => set((state) => {
        state.metrics.push(metric);
      }),

      setTrends: (trends) => set((state) => {
        state.trends = trends;
      }),

      setCurrentMetrics: (metrics) => set((state) => {
        state.currentMetrics = metrics;
      }),

      setLoading: (loading) => set((state) => {
        state.isLoading = loading;
      }),

      setError: (error) => set((state) => {
        state.error = error;
      }),

      // Computed values
      getAveragePageLoadTime: () => {
        const { metrics } = get();
        if (metrics.length === 0) return 0;
        
        const total = metrics.reduce((sum, metric) => sum + metric.pageLoadTime, 0);
        return total / metrics.length;
      },

      getAverageFirstContentfulPaint: () => {
        const { metrics } = get();
        if (metrics.length === 0) return 0;
        
        const total = metrics.reduce((sum, metric) => sum + metric.firstContentfulPaint, 0);
        return total / metrics.length;
      },

      getAverageLargestContentfulPaint: () => {
        const { metrics } = get();
        if (metrics.length === 0) return 0;
        
        const total = metrics.reduce((sum, metric) => sum + metric.largestContentfulPaint, 0);
        return total / metrics.length;
      },

      getAverageFirstInputDelay: () => {
        const { metrics } = get();
        if (metrics.length === 0) return 0;
        
        const total = metrics.reduce((sum, metric) => sum + metric.firstInputDelay, 0);
        return total / metrics.length;
      },

      getAverageCumulativeLayoutShift: () => {
        const { metrics } = get();
        if (metrics.length === 0) return 0;
        
        const total = metrics.reduce((sum, metric) => sum + metric.cumulativeLayoutShift, 0);
        return total / metrics.length;
      },

      getAverageTotalBlockingTime: () => {
        const { metrics } = get();
        if (metrics.length === 0) return 0;
        
        const total = metrics.reduce((sum, metric) => sum + metric.totalBlockingTime, 0);
        return total / metrics.length;
      },

      getAverageSpeedIndex: () => {
        const { metrics } = get();
        if (metrics.length === 0) return 0;
        
        const total = metrics.reduce((sum, metric) => sum + metric.speedIndex, 0);
        return total / metrics.length;
      },

      getAverageTimeToInteractive: () => {
        const { metrics } = get();
        if (metrics.length === 0) return 0;
        
        const total = metrics.reduce((sum, metric) => sum + metric.timeToInteractive, 0);
        return total / metrics.length;
      },

      getPerformanceScore: () => {
        const { getAveragePageLoadTime, getAverageFirstContentfulPaint, getAverageLargestContentfulPaint } = get();
        
        // Simple performance score calculation based on Core Web Vitals
        const pageLoadTime = getAveragePageLoadTime();
        const fcp = getAverageFirstContentfulPaint();
        const lcp = getAverageLargestContentfulPaint();
        
        let score = 100;
        
        // Deduct points for poor performance
        if (pageLoadTime > 3000) score -= 20;
        if (fcp > 1800) score -= 20;
        if (lcp > 2500) score -= 20;
        
        return Math.max(0, score);
      },

      getPerformanceStatus: () => {
        const { getPerformanceScore } = get();
        const score = getPerformanceScore();
        
        if (score >= 80) return 'good';
        if (score >= 60) return 'needs_improvement';
        return 'poor';
      },

      getLatestMetrics: () => {
        const { metrics } = get();
        if (metrics.length === 0) return null;
        
        return metrics[metrics.length - 1];
      },
    }))
  )
);

// ============================================================================
// FEEDBACK STORE
// ============================================================================

interface FeedbackStore extends FeedbackState {
  // Actions
  setFeedback: (feedback: UserFeedback[]) => void;
  addFeedback: (feedback: UserFeedback) => void;
  updateFeedback: (feedbackId: string, updates: Partial<UserFeedback>) => void;
  removeFeedback: (feedbackId: string) => void;
  setSubmittedFeedback: (feedback: UserFeedback | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed values
  getFeedbackByType: (type: FeedbackType) => UserFeedback[];
  getFeedbackByStatus: (status: FeedbackStatus) => UserFeedback[];
  getFeedbackByPriority: (priority: FeedbackPriority) => UserFeedback[];
  getOpenFeedback: () => UserFeedback[];
  getResolvedFeedback: () => UserFeedback[];
  getFeedbackCount: () => number;
  getOpenFeedbackCount: () => number;
  getAverageRating: () => number;
  getFeedbackByCategory: (category: string) => UserFeedback[];
}

export const useFeedbackStore = create<FeedbackStore>()(
  subscribeWithSelector(
    immer((set, get) => ({
      // Initial state
      feedback: [],
      submittedFeedback: null,
      isLoading: false,
      error: null,

      // Actions
      setFeedback: (feedback) => set((state) => {
        state.feedback = feedback;
        state.error = null;
      }),

      addFeedback: (feedback) => set((state) => {
        state.feedback.unshift(feedback);
      }),

      updateFeedback: (feedbackId, updates) => set((state) => {
        const index = state.feedback.findIndex(f => f.id === feedbackId);
        if (index !== -1) {
          Object.assign(state.feedback[index], updates);
        }
      }),

      removeFeedback: (feedbackId) => set((state) => {
        state.feedback = state.feedback.filter(f => f.id !== feedbackId);
      }),

      setSubmittedFeedback: (feedback) => set((state) => {
        state.submittedFeedback = feedback;
      }),

      setLoading: (loading) => set((state) => {
        state.isLoading = loading;
      }),

      setError: (error) => set((state) => {
        state.error = error;
      }),

      // Computed values
      getFeedbackByType: (type) => {
        const { feedback } = get();
        return feedback.filter(f => f.type === type);
      },

      getFeedbackByStatus: (status) => {
        const { feedback } = get();
        return feedback.filter(f => f.status === status);
      },

      getFeedbackByPriority: (priority) => {
        const { feedback } = get();
        return feedback.filter(f => f.priority === priority);
      },

      getOpenFeedback: () => {
        const { feedback } = get();
        return feedback.filter(f => f.status === 'open');
      },

      getResolvedFeedback: () => {
        const { feedback } = get();
        return feedback.filter(f => f.status === 'resolved');
      },

      getFeedbackCount: () => {
        const { feedback } = get();
        return feedback.length;
      },

      getOpenFeedbackCount: () => {
        const { feedback } = get();
        return feedback.filter(f => f.status === 'open').length;
      },

      getAverageRating: () => {
        const { feedback } = get();
        const ratedFeedback = feedback.filter(f => f.rating !== undefined);
        if (ratedFeedback.length === 0) return 0;
        
        const total = ratedFeedback.reduce((sum, f) => sum + (f.rating || 0), 0);
        return total / ratedFeedback.length;
      },

      getFeedbackByCategory: (category) => {
        const { feedback } = get();
        return feedback.filter(f => f.category === category);
      },
    }))
  )
);

// ============================================================================
// ALERT STORE
// ============================================================================

interface AlertStore extends AlertState {
  // Actions
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  updateAlert: (alertId: string, updates: Partial<Alert>) => void;
  removeAlert: (alertId: string) => void;
  setAlertSettings: (settings: AlertSettings | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed values
  getAlertsByType: (type: AlertType) => Alert[];
  getAlertsByStatus: (status: AlertStatus) => Alert[];
  getAlertsBySeverity: (severity: string) => Alert[];
  getActiveAlerts: () => Alert[];
  getAcknowledgedAlerts: () => Alert[];
  getResolvedAlerts: () => Alert[];
  getAlertCount: () => number;
  getActiveAlertCount: () => number;
  getCriticalAlertCount: () => number;
  getAlertSettings: () => AlertSettings | null;
}

export const useAlertStore = create<AlertStore>()(
  subscribeWithSelector(
    immer((set, get) => ({
      // Initial state
      alerts: [],
      alertSettings: null,
      isLoading: false,
      error: null,

      // Actions
      setAlerts: (alerts) => set((state) => {
        state.alerts = alerts;
        state.error = null;
      }),

      addAlert: (alert) => set((state) => {
        state.alerts.unshift(alert);
      }),

      updateAlert: (alertId, updates) => set((state) => {
        const index = state.alerts.findIndex(a => a.id === alertId);
        if (index !== -1) {
          Object.assign(state.alerts[index], updates);
        }
      }),

      removeAlert: (alertId) => set((state) => {
        state.alerts = state.alerts.filter(a => a.id !== alertId);
      }),

      setAlertSettings: (settings) => set((state) => {
        state.alertSettings = settings;
        state.error = null;
      }),

      setLoading: (loading) => set((state) => {
        state.isLoading = loading;
      }),

      setError: (error) => set((state) => {
        state.error = error;
      }),

      // Computed values
      getAlertsByType: (type) => {
        const { alerts } = get();
        return alerts.filter(a => a.type === type);
      },

      getAlertsByStatus: (status) => {
        const { alerts } = get();
        return alerts.filter(a => a.status === status);
      },

      getAlertsBySeverity: (severity) => {
        const { alerts } = get();
        return alerts.filter(a => a.severity === severity);
      },

      getActiveAlerts: () => {
        const { alerts } = get();
        return alerts.filter(a => a.status === 'active');
      },

      getAcknowledgedAlerts: () => {
        const { alerts } = get();
        return alerts.filter(a => a.status === 'acknowledged');
      },

      getResolvedAlerts: () => {
        const { alerts } = get();
        return alerts.filter(a => a.status === 'resolved');
      },

      getAlertCount: () => {
        const { alerts } = get();
        return alerts.length;
      },

      getActiveAlertCount: () => {
        const { alerts } = get();
        return alerts.filter(a => a.status === 'active').length;
      },

      getCriticalAlertCount: () => {
        const { alerts } = get();
        return alerts.filter(a => a.severity === 'critical').length;
      },

      getAlertSettings: () => {
        const { alertSettings } = get();
        return alertSettings;
      },
    }))
  )
);
