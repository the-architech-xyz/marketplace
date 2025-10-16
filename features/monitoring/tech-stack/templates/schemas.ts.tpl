/**
 * Monitoring Feature Validation Schemas
 * 
 * Zod validation schemas for runtime type checking and data validation.
 * These schemas are generated from the feature contract and provide
 * consistent validation across all frontend/backend implementations.
 */

import { z } from 'zod';

// ============================================================================
// CORE SCHEMAS
// ============================================================================

export const ErrorDataSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  stackTrace: z.string().optional(),
  errorType: z.string().min(1).max(100),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['unresolved', 'resolved', 'ignored']),
  firstSeen: z.date(),
  lastSeen: z.date(),
  count: z.number().min(0),
  affectedUsers: z.number().min(0),
  metadata: z.record(z.any()).optional(),
  tags: z.array(z.string()).optional(),
  assignedTo: z.string().uuid().optional(),
  resolvedAt: z.date().optional(),
  resolvedBy: z.string().uuid().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ErrorTrendSchema = z.object({
  date: z.string(),
  count: z.number().min(0),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  errorType: z.string(),
});

export const PerformanceMetricsSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  timestamp: z.date(),
  pageLoadTime: z.number().min(0),
  firstContentfulPaint: z.number().min(0),
  largestContentfulPaint: z.number().min(0),
  firstInputDelay: z.number().min(0),
  cumulativeLayoutShift: z.number().min(0),
  totalBlockingTime: z.number().min(0),
  speedIndex: z.number().min(0),
  timeToInteractive: z.number().min(0),
  metadata: z.record(z.any()).optional(),
});

export const PerformanceTrendSchema = z.object({
  date: z.string(),
  metric: z.string(),
  value: z.number(),
  threshold: z.number(),
  status: z.enum(['good', 'needs_improvement', 'poor']),
});

export const UserFeedbackSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  type: z.enum(['bug_report', 'feature_request', 'general_feedback', 'rating']),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  rating: z.number().min(1).max(5).optional(),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
  assignedTo: z.string().uuid().optional(),
  resolvedAt: z.date().optional(),
  resolvedBy: z.string().uuid().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserFeedbackDataSchema = z.object({
  type: z.enum(['bug_report', 'feature_request', 'general_feedback', 'rating']),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  rating: z.number().min(1).max(5).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
});

export const SentryConfigSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  dsn: z.string().url(),
  environment: z.string().min(1).max(50),
  release: z.string().optional(),
  sampleRate: z.number().min(0).max(1),
  tracesSampleRate: z.number().min(0).max(1),
  profilesSampleRate: z.number().min(0).max(1),
  enabled: z.boolean(),
  settings: z.object({
    enableErrorTracking: z.boolean(),
    enablePerformanceTracking: z.boolean(),
    enableUserFeedback: z.boolean(),
    enableSessionReplay: z.boolean(),
    enableProfiling: z.boolean(),
    enableTracing: z.boolean(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// FILTER SCHEMAS
// ============================================================================

export const ErrorFiltersSchema = z.object({
  status: z.enum(['unresolved', 'resolved', 'ignored']).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  errorType: z.string().optional(),
  assignedTo: z.string().uuid().optional(),
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().positive().max(100).optional(),
  offset: z.number().min(0).optional(),
});

export const FeedbackFiltersSchema = z.object({
  type: z.enum(['bug_report', 'feature_request', 'general_feedback', 'rating']).optional(),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  category: z.string().optional(),
  assignedTo: z.string().uuid().optional(),
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().positive().max(100).optional(),
  offset: z.number().min(0).optional(),
});

export const DateRangeSchema = z.object({
  start: z.date(),
  end: z.date(),
});

// ============================================================================
// API RESPONSE SCHEMAS
// ============================================================================

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export const PaginatedResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number().positive(),
    limit: z.number().positive(),
    total: z.number().min(0),
    totalPages: z.number().min(0),
  }),
});

// ============================================================================
// DASHBOARD SCHEMAS
// ============================================================================

export const MonitoringDashboardSchema = z.object({
  projectId: z.string().uuid(),
  summary: z.object({
    totalErrors: z.number().min(0),
    unresolvedErrors: z.number().min(0),
    criticalErrors: z.number().min(0),
    averageResponseTime: z.number().min(0),
    uptime: z.number().min(0).max(100),
    userSatisfaction: z.number().min(0).max(5),
  }),
  recentErrors: z.array(ErrorDataSchema),
  performanceMetrics: PerformanceMetricsSchema,
  userFeedback: z.array(UserFeedbackSchema),
  trends: z.object({
    errors: z.array(ErrorTrendSchema),
    performance: z.array(PerformanceTrendSchema),
  }),
  lastUpdated: z.date(),
});

export const AlertSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  type: z.enum(['error_threshold', 'performance_degradation', 'uptime_issue', 'user_feedback']),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(500),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['active', 'acknowledged', 'resolved']),
  threshold: z.number().optional(),
  currentValue: z.number().optional(),
  triggeredAt: z.date(),
  resolvedAt: z.date().optional(),
  resolvedBy: z.string().uuid().optional(),
  metadata: z.record(z.any()).optional(),
});

export const AlertSettingsSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  errorThreshold: z.object({
    enabled: z.boolean(),
    threshold: z.number().min(0),
    timeWindow: z.number().min(1),
  }),
  performanceThreshold: z.object({
    enabled: z.boolean(),
    responseTimeThreshold: z.number().min(0),
    errorRateThreshold: z.number().min(0).max(100),
    timeWindow: z.number().min(1),
  }),
  uptimeThreshold: z.object({
    enabled: z.boolean(),
    threshold: z.number().min(0).max(100),
    timeWindow: z.number().min(1),
  }),
  notifications: z.object({
    email: z.boolean(),
    slack: z.boolean(),
    webhook: z.boolean(),
    recipients: z.array(z.string().email()),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// ANALYTICS SCHEMAS
// ============================================================================

export const MonitoringAnalyticsSchema = z.object({
  projectId: z.string().uuid(),
  period: z.enum(['day', 'week', 'month', 'quarter', 'year']),
  metrics: z.object({
    errorRate: z.number().min(0).max(100),
    averageResponseTime: z.number().min(0),
    uptime: z.number().min(0).max(100),
    userSatisfaction: z.number().min(0).max(5),
    pageViews: z.number().min(0),
    uniqueUsers: z.number().min(0),
    bounceRate: z.number().min(0).max(100),
  }),
  trends: z.object({
    errorRate: z.array(z.object({
      date: z.string(),
      value: z.number(),
      change: z.number(),
      status: z.enum(['improving', 'stable', 'degrading']),
    })),
    responseTime: z.array(z.object({
      date: z.string(),
      value: z.number(),
      change: z.number(),
      status: z.enum(['improving', 'stable', 'degrading']),
    })),
    uptime: z.array(z.object({
      date: z.string(),
      value: z.number(),
      change: z.number(),
      status: z.enum(['improving', 'stable', 'degrading']),
    })),
    userSatisfaction: z.array(z.object({
      date: z.string(),
      value: z.number(),
      change: z.number(),
      status: z.enum(['improving', 'stable', 'degrading']),
    })),
  }),
  breakdown: z.object({
    errorsByType: z.record(z.number()),
    errorsBySeverity: z.record(z.number()),
    performanceByPage: z.record(z.number()),
    feedbackByType: z.record(z.number()),
  }),
  generatedAt: z.date(),
});

export const TrendDataSchema = z.object({
  date: z.string(),
  value: z.number(),
  change: z.number(),
  status: z.enum(['improving', 'stable', 'degrading']),
});

// ============================================================================
// HEALTH CHECK SCHEMAS
// ============================================================================

export const HealthCheckSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  name: z.string().min(1).max(100),
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  headers: z.record(z.string()).optional(),
  body: z.string().optional(),
  expectedStatus: z.number().min(100).max(599),
  timeout: z.number().min(1).max(300),
  interval: z.number().min(1).max(1440),
  enabled: z.boolean(),
  lastCheck: z.date().optional(),
  lastStatus: z.enum(['healthy', 'unhealthy', 'timeout', 'error']).optional(),
  lastResponseTime: z.number().min(0).optional(),
  consecutiveFailures: z.number().min(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const HealthCheckResultSchema = z.object({
  id: z.string().uuid(),
  healthCheckId: z.string().uuid(),
  status: z.enum(['healthy', 'unhealthy', 'timeout', 'error']),
  responseTime: z.number().min(0),
  statusCode: z.number().min(100).max(599),
  responseBody: z.string().optional(),
  error: z.string().optional(),
  checkedAt: z.date(),
});

// ============================================================================
// FORM VALIDATION SCHEMAS
// ============================================================================

export const FeedbackFormDataSchema = z.object({
  type: z.enum(['bug_report', 'feature_request', 'general_feedback', 'rating']),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  rating: z.number().min(1).max(5).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  attachments: z.array(z.instanceof(File)).optional(),
});

export const AlertFormDataSchema = z.object({
  type: z.enum(['error_threshold', 'performance_degradation', 'uptime_issue', 'user_feedback']),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(500),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  threshold: z.number().min(0).optional(),
  timeWindow: z.number().min(1).optional(),
});

export const HealthCheckFormDataSchema = z.object({
  name: z.string().min(1).max(100),
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  headers: z.record(z.string()).optional(),
  body: z.string().optional(),
  expectedStatus: z.number().min(100).max(599),
  timeout: z.number().min(1).max(300),
  interval: z.number().min(1).max(1440),
  enabled: z.boolean(),
});

// ============================================================================
// UTILITY SCHEMAS
// ============================================================================

export const PaginationInfoSchema = z.object({
  page: z.number().positive(),
  limit: z.number().positive(),
  total: z.number().min(0),
  totalPages: z.number().min(0),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

export const SortOptionsSchema = z.object({
  field: z.string(),
  direction: z.enum(['asc', 'desc']),
});

export const FilterOptionsSchema = z.object({
  status: z.enum(['unresolved', 'resolved', 'ignored']).optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  type: z.enum(['bug_report', 'feature_request', 'general_feedback', 'rating']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
  tags: z.array(z.string()).optional(),
});

export const ChartDataPointSchema = z.object({
  x: z.union([z.string(), z.number(), z.date()]),
  y: z.number(),
  label: z.string().optional(),
  color: z.string().optional(),
});

export const ChartSeriesSchema = z.object({
  name: z.string(),
  data: z.array(ChartDataPointSchema),
  color: z.string().optional(),
  type: z.enum(['line', 'bar', 'area']).optional(),
});

export const TimeSeriesDataSchema = z.object({
  timestamp: z.date(),
  value: z.number(),
  label: z.string().optional(),
});

export const MetricComparisonSchema = z.object({
  current: z.number(),
  previous: z.number(),
  change: z.number(),
  changePercentage: z.number(),
  status: z.enum(['improving', 'stable', 'degrading']),
});

// ============================================================================
// EXPORT ALL SCHEMAS
// ============================================================================

export const MonitoringSchemas = {
  ErrorData: ErrorDataSchema,
  ErrorTrend: ErrorTrendSchema,
  PerformanceMetrics: PerformanceMetricsSchema,
  PerformanceTrend: PerformanceTrendSchema,
  UserFeedback: UserFeedbackSchema,
  UserFeedbackData: UserFeedbackDataSchema,
  SentryConfig: SentryConfigSchema,
  ErrorFilters: ErrorFiltersSchema,
  FeedbackFilters: FeedbackFiltersSchema,
  DateRange: DateRangeSchema,
  ApiResponse: ApiResponseSchema,
  PaginatedResponse: PaginatedResponseSchema,
  MonitoringDashboard: MonitoringDashboardSchema,
  Alert: AlertSchema,
  AlertSettings: AlertSettingsSchema,
  MonitoringAnalytics: MonitoringAnalyticsSchema,
  TrendData: TrendDataSchema,
  HealthCheck: HealthCheckSchema,
  HealthCheckResult: HealthCheckResultSchema,
  FeedbackFormData: FeedbackFormDataSchema,
  AlertFormData: AlertFormDataSchema,
  HealthCheckFormData: HealthCheckFormDataSchema,
  PaginationInfo: PaginationInfoSchema,
  SortOptions: SortOptionsSchema,
  FilterOptions: FilterOptionsSchema,
  ChartDataPoint: ChartDataPointSchema,
  ChartSeries: ChartSeriesSchema,
  TimeSeriesData: TimeSeriesDataSchema,
  MetricComparison: MetricComparisonSchema,
} as const;
