/**
 * Monitoring Feature - Centralized Exports
 * 
 * This file provides centralized exports for the Monitoring feature's
 * technology-agnostic stack layer. Import from this file for consistent
 * access to types, schemas, hooks, and stores.
 */

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  // Core types
  ErrorData,
  ErrorTrend,
  PerformanceMetrics,
  PerformanceTrend,
  UserFeedback,
  UserFeedbackData,
  SentryConfig,
  
  // Service interface
  IMonitoringService,
  
  // Filter types
  ErrorFilters,
  FeedbackFilters,
  DateRange,
  ErrorStatus,
  
  // API response types
  ApiResponse,
  PaginatedResponse,
  
  // Dashboard types
  MonitoringDashboard,
  Alert,
  AlertSettings,
  
  // Analytics types
  MonitoringAnalytics,
  TrendData,
  
  // Health check types
  HealthCheck,
  HealthCheckResult,
  
  // UI-specific types
  ErrorCardData,
  PerformanceChartData,
  FeedbackFormData,
  MonitoringState,
  ErrorDetailsState,
  PerformanceState,
  FeedbackState,
  AlertState,
  ErrorValidationErrors,
  FeedbackValidationErrors,
  AlertValidationErrors,
  MonitoringError,
  ValidationError,
  
  // Utility types
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
  MetricComparison,
  DashboardWidget,
  MonitoringConfig,
  ExportOptions,
  NotificationSettings
} from './types';

// ============================================================================
// SCHEMA EXPORTS
// ============================================================================

export {
  // Core schemas
  ErrorDataSchema,
  ErrorTrendSchema,
  PerformanceMetricsSchema,
  PerformanceTrendSchema,
  UserFeedbackSchema,
  UserFeedbackDataSchema,
  SentryConfigSchema,
  
  // Filter schemas
  ErrorFiltersSchema,
  FeedbackFiltersSchema,
  DateRangeSchema,
  
  // API response schemas
  ApiResponseSchema,
  PaginatedResponseSchema,
  
  // Dashboard schemas
  MonitoringDashboardSchema,
  AlertSchema,
  AlertSettingsSchema,
  
  // Analytics schemas
  MonitoringAnalyticsSchema,
  TrendDataSchema,
  
  // Health check schemas
  HealthCheckSchema,
  HealthCheckResultSchema,
  
  // Form validation schemas
  FeedbackFormDataSchema,
  AlertFormDataSchema,
  HealthCheckFormDataSchema,
  
  // Utility schemas
  PaginationInfoSchema,
  SortOptionsSchema,
  FilterOptionsSchema,
  ChartDataPointSchema,
  ChartSeriesSchema,
  TimeSeriesDataSchema,
  MetricComparisonSchema,
  
  // All schemas object
  MonitoringSchemas
} from './schemas';

// ============================================================================
// HOOK EXPORTS
// ============================================================================

export {
  // Query keys
  monitoringKeys,
  
  // Error tracking hooks
  useErrors,
  useError,
  useErrorTrends,
  useResolveError,
  useIgnoreError,
  useUpdateErrorStatus,
  
  // Performance monitoring hooks
  usePerformanceMetrics,
  usePerformanceTrends,
  
  // User feedback hooks
  useUserFeedback,
  useSubmitFeedback,
  
  // Configuration hooks
  useSentryConfig,
  useUpdateSentryConfig,
  
  // Dashboard hooks
  useMonitoringDashboard,
  
  // Alert hooks
  useAlerts,
  useAlertSettings,
  useUpdateAlertSettings,
  
  // Analytics hooks
  useMonitoringAnalytics,
  
  // Health check hooks
  useHealthChecks,
  useHealthCheckResults
} from './hooks';

// ============================================================================
// STORE EXPORTS
// ============================================================================

export {
  // Monitoring store
  useMonitoringStore,
  
  // Error details store
  useErrorDetailsStore,
  
  // Performance store
  usePerformanceStore,
  
  // Feedback store
  useFeedbackStore,
  
  // Alert store
  useAlertStore
} from './stores';

// ============================================================================
// CONTRACT EXPORTS
// ============================================================================

// Re-export the contract for reference
export type { IMonitoringService } from '../contract';

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

// Common validation functions
export const validateErrorData = (data: any): boolean => {
  try {
    ErrorDataSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

export const validateFeedbackData = (data: any): boolean => {
  try {
    UserFeedbackDataSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

export const validateAlertData = (data: any): boolean => {
  try {
    AlertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

// Common utility functions
export const formatErrorSeverity = (severity: ErrorSeverity): string => {
  switch (severity) {
    case 'low':
      return 'Low';
    case 'medium':
      return 'Medium';
    case 'high':
      return 'High';
    case 'critical':
      return 'Critical';
    default:
      return 'Unknown';
  }
};

export const formatErrorStatus = (status: ErrorStatus): string => {
  switch (status) {
    case 'unresolved':
      return 'Unresolved';
    case 'resolved':
      return 'Resolved';
    case 'ignored':
      return 'Ignored';
    default:
      return 'Unknown';
  }
};

export const formatFeedbackType = (type: FeedbackType): string => {
  switch (type) {
    case 'bug_report':
      return 'Bug Report';
    case 'feature_request':
      return 'Feature Request';
    case 'general_feedback':
      return 'General Feedback';
    case 'rating':
      return 'Rating';
    default:
      return 'Unknown';
  }
};

export const formatFeedbackStatus = (status: FeedbackStatus): string => {
  switch (status) {
    case 'open':
      return 'Open';
    case 'in_progress':
      return 'In Progress';
    case 'resolved':
      return 'Resolved';
    case 'closed':
      return 'Closed';
    default:
      return 'Unknown';
  }
};

export const formatFeedbackPriority = (priority: FeedbackPriority): string => {
  switch (priority) {
    case 'low':
      return 'Low';
    case 'medium':
      return 'Medium';
    case 'high':
      return 'High';
    case 'urgent':
      return 'Urgent';
    default:
      return 'Unknown';
  }
};

export const formatAlertType = (type: AlertType): string => {
  switch (type) {
    case 'error_threshold':
      return 'Error Threshold';
    case 'performance_degradation':
      return 'Performance Degradation';
    case 'uptime_issue':
      return 'Uptime Issue';
    case 'user_feedback':
      return 'User Feedback';
    default:
      return 'Unknown';
  }
};

export const formatAlertStatus = (status: AlertStatus): string => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'acknowledged':
      return 'Acknowledged';
    case 'resolved':
      return 'Resolved';
    default:
      return 'Unknown';
  }
};

export const formatHealthStatus = (status: HealthStatus): string => {
  switch (status) {
    case 'healthy':
      return 'Healthy';
    case 'unhealthy':
      return 'Unhealthy';
    case 'timeout':
      return 'Timeout';
    case 'error':
      return 'Error';
    default:
      return 'Unknown';
  }
};

export const formatTrendStatus = (status: TrendStatus): string => {
  switch (status) {
    case 'improving':
      return 'Improving';
    case 'stable':
      return 'Stable';
    case 'degrading':
      return 'Degrading';
    default:
      return 'Unknown';
  }
};

// Performance utility functions
export const calculatePerformanceScore = (metrics: PerformanceMetrics): number => {
  let score = 100;
  
  // Deduct points for poor performance based on Core Web Vitals
  if (metrics.pageLoadTime > 3000) score -= 20;
  if (metrics.firstContentfulPaint > 1800) score -= 20;
  if (metrics.largestContentfulPaint > 2500) score -= 20;
  if (metrics.firstInputDelay > 100) score -= 20;
  if (metrics.cumulativeLayoutShift > 0.1) score -= 20;
  
  return Math.max(0, score);
};

export const getPerformanceStatus = (score: number): 'good' | 'needs_improvement' | 'poor' => {
  if (score >= 80) return 'good';
  if (score >= 60) return 'needs_improvement';
  return 'poor';
};

export const formatResponseTime = (time: number): string => {
  if (time < 1000) return `${time}ms`;
  return `${(time / 1000).toFixed(2)}s`;
};

export const formatUptime = (uptime: number): string => {
  return `${uptime.toFixed(2)}%`;
};

export const formatErrorCount = (count: number): string => {
  if (count < 1000) return count.toString();
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
  return `${(count / 1000000).toFixed(1)}M`;
};

export const formatUserCount = (count: number): string => {
  if (count < 1000) return count.toString();
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
  return `${(count / 1000000).toFixed(1)}M`;
};

// Time utility functions
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minutes ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} days ago`;
  
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} weeks ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  
  const years = Math.floor(days / 365);
  return `${years} years ago`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

// ============================================================================
// CONSTANTS
// ============================================================================

export const MONITORING_CONSTANTS = {
  MAX_ERROR_TITLE_LENGTH: 200,
  MAX_ERROR_MESSAGE_LENGTH: 1000,
  MAX_FEEDBACK_TITLE_LENGTH: 200,
  MAX_FEEDBACK_DESCRIPTION_LENGTH: 2000,
  MAX_ALERT_TITLE_LENGTH: 200,
  MAX_ALERT_MESSAGE_LENGTH: 500,
  MAX_HEALTH_CHECK_NAME_LENGTH: 100,
  MIN_RATING: 1,
  MAX_RATING: 5,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  ERROR_REFRESH_INTERVAL: 60000, // 1 minute
  PERFORMANCE_REFRESH_INTERVAL: 120000, // 2 minutes
  FEEDBACK_REFRESH_INTERVAL: 120000, // 2 minutes
  ALERT_REFRESH_INTERVAL: 30000, // 30 seconds
  DASHBOARD_REFRESH_INTERVAL: 30000, // 30 seconds
  HEALTH_CHECK_REFRESH_INTERVAL: 60000, // 1 minute
  CONFIG_CACHE_DURATION: 600000, // 10 minutes
  ANALYTICS_CACHE_DURATION: 600000, // 10 minutes
} as const;

export const MONITORING_ROUTES = {
  ERRORS: '/api/monitoring/errors',
  PERFORMANCE: '/api/monitoring/performance',
  FEEDBACK: '/api/monitoring/feedback',
  CONFIG: '/api/monitoring/config',
  DASHBOARD: '/api/monitoring/dashboard',
  ALERTS: '/api/monitoring/alerts',
  ALERT_SETTINGS: '/api/monitoring/alert-settings',
  ANALYTICS: '/api/monitoring/analytics',
  HEALTH_CHECKS: '/api/monitoring/health-checks',
} as const;

export const MONITORING_QUERY_KEYS = {
  ERRORS: 'monitoring-errors',
  ERROR: 'monitoring-error',
  ERROR_TRENDS: 'monitoring-error-trends',
  PERFORMANCE: 'monitoring-performance',
  PERFORMANCE_TRENDS: 'monitoring-performance-trends',
  FEEDBACK: 'monitoring-feedback',
  SENTRY_CONFIG: 'monitoring-sentry-config',
  DASHBOARD: 'monitoring-dashboard',
  ALERTS: 'monitoring-alerts',
  ALERT_SETTINGS: 'monitoring-alert-settings',
  ANALYTICS: 'monitoring-analytics',
  HEALTH_CHECKS: 'monitoring-health-checks',
  HEALTH_CHECK_RESULTS: 'monitoring-health-check-results',
} as const;

export const PERFORMANCE_THRESHOLDS = {
  PAGE_LOAD_TIME: {
    GOOD: 2000,
    NEEDS_IMPROVEMENT: 4000,
  },
  FIRST_CONTENTFUL_PAINT: {
    GOOD: 1800,
    NEEDS_IMPROVEMENT: 3000,
  },
  LARGEST_CONTENTFUL_PAINT: {
    GOOD: 2500,
    NEEDS_IMPROVEMENT: 4000,
  },
  FIRST_INPUT_DELAY: {
    GOOD: 100,
    NEEDS_IMPROVEMENT: 300,
  },
  CUMULATIVE_LAYOUT_SHIFT: {
    GOOD: 0.1,
    NEEDS_IMPROVEMENT: 0.25,
  },
  TOTAL_BLOCKING_TIME: {
    GOOD: 200,
    NEEDS_IMPROVEMENT: 600,
  },
  SPEED_INDEX: {
    GOOD: 3400,
    NEEDS_IMPROVEMENT: 5800,
  },
  TIME_TO_INTERACTIVE: {
    GOOD: 3800,
    NEEDS_IMPROVEMENT: 7300,
  },
} as const;
