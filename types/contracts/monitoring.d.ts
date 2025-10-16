/**
 * Monitoring Feature Contract
 * 
 * This contract defines the core types, interfaces, and service methods
 * for the monitoring system with error tracking, performance monitoring, and user feedback.
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export interface ErrorData {
  id: string;
  projectId: string;
  title: string;
  message: string;
  stackTrace?: string;
  errorType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'unresolved' | 'resolved' | 'ignored';
  firstSeen: Date;
  lastSeen: Date;
  count: number;
  affectedUsers: number;
  metadata?: Record<string, any>;
  tags?: string[];
  assignedTo?: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ErrorTrend {
  date: string;
  count: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  errorType: string;
}

export interface PerformanceMetrics {
  id: string;
  projectId: string;
  timestamp: Date;
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  totalBlockingTime: number;
  speedIndex: number;
  timeToInteractive: number;
  metadata?: Record<string, any>;
}

export interface PerformanceTrend {
  date: string;
  metric: string;
  value: number;
  threshold: number;
  status: 'good' | 'needs_improvement' | 'poor';
}

export interface UserFeedback {
  id: string;
  projectId: string;
  userId?: string;
  type: 'bug_report' | 'feature_request' | 'general_feedback' | 'rating';
  title: string;
  description: string;
  rating?: number;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  tags?: string[];
  attachments?: string[];
  assignedTo?: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFeedbackData {
  type: 'bug_report' | 'feature_request' | 'general_feedback' | 'rating';
  title: string;
  description: string;
  rating?: number;
  category?: string;
  tags?: string[];
  attachments?: string[];
}

export interface SentryConfig {
  id: string;
  projectId: string;
  dsn: string;
  environment: string;
  release?: string;
  sampleRate: number;
  tracesSampleRate: number;
  profilesSampleRate: number;
  enabled: boolean;
  settings: {
    enableErrorTracking: boolean;
    enablePerformanceTracking: boolean;
    enableUserFeedback: boolean;
    enableSessionReplay: boolean;
    enableProfiling: boolean;
    enableTracing: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// SERVICE INTERFACE
// ============================================================================

export interface IMonitoringService {
  // Error Tracking
  getErrors(projectId: string, filters?: ErrorFilters): Promise<ErrorData[]>;
  getError(errorId: string): Promise<ErrorData>;
  getErrorTrends(projectId: string, dateRange: DateRange): Promise<ErrorTrend[]>;
  resolveError(errorId: string, resolvedBy: string): Promise<{ success: boolean }>;
  ignoreError(errorId: string, ignoredBy: string): Promise<{ success: boolean }>;
  updateErrorStatus(errorId: string, status: ErrorStatus, updatedBy: string): Promise<{ success: boolean }>;
  
  // Performance Monitoring
  getPerformanceMetrics(projectId: string, dateRange: DateRange): Promise<PerformanceMetrics[]>;
  getPerformanceTrends(projectId: string, dateRange: DateRange): Promise<PerformanceTrend[]>;
  
  // User Feedback
  getUserFeedback(projectId: string, filters?: FeedbackFilters): Promise<UserFeedback[]>;
  submitFeedback(projectId: string, data: UserFeedbackData): Promise<{ success: boolean; feedbackId: string }>;
  
  // Configuration
  getSentryConfig(projectId: string): Promise<SentryConfig>;
  updateSentryConfig(projectId: string, config: Partial<SentryConfig>): Promise<SentryConfig>;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface ErrorFilters {
  status?: 'unresolved' | 'resolved' | 'ignored';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  errorType?: string;
  assignedTo?: string;
  dateRange?: DateRange;
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface FeedbackFilters {
  type?: 'bug_report' | 'feature_request' | 'general_feedback' | 'rating';
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  assignedTo?: string;
  dateRange?: DateRange;
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export type ErrorStatus = 'unresolved' | 'resolved' | 'ignored';

// ============================================================================
// API RESPONSES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface MonitoringDashboard {
  projectId: string;
  summary: {
    totalErrors: number;
    unresolvedErrors: number;
    criticalErrors: number;
    averageResponseTime: number;
    uptime: number;
    userSatisfaction: number;
  };
  recentErrors: ErrorData[];
  performanceMetrics: PerformanceMetrics;
  userFeedback: UserFeedback[];
  trends: {
    errors: ErrorTrend[];
    performance: PerformanceTrend[];
  };
  lastUpdated: Date;
}

export interface Alert {
  id: string;
  projectId: string;
  type: 'error_threshold' | 'performance_degradation' | 'uptime_issue' | 'user_feedback';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  threshold?: number;
  currentValue?: number;
  triggeredAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
  metadata?: Record<string, any>;
}

export interface AlertSettings {
  id: string;
  projectId: string;
  errorThreshold: {
    enabled: boolean;
    threshold: number;
    timeWindow: number; // in minutes
  };
  performanceThreshold: {
    enabled: boolean;
    responseTimeThreshold: number;
    errorRateThreshold: number;
    timeWindow: number; // in minutes
  };
  uptimeThreshold: {
    enabled: boolean;
    threshold: number; // percentage
    timeWindow: number; // in minutes
  };
  notifications: {
    email: boolean;
    slack: boolean;
    webhook: boolean;
    recipients: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface MonitoringAnalytics {
  projectId: string;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  metrics: {
    errorRate: number;
    averageResponseTime: number;
    uptime: number;
    userSatisfaction: number;
    pageViews: number;
    uniqueUsers: number;
    bounceRate: number;
  };
  trends: {
    errorRate: TrendData[];
    responseTime: TrendData[];
    uptime: TrendData[];
    userSatisfaction: TrendData[];
  };
  breakdown: {
    errorsByType: Record<string, number>;
    errorsBySeverity: Record<string, number>;
    performanceByPage: Record<string, number>;
    feedbackByType: Record<string, number>;
  };
  generatedAt: Date;
}

export interface TrendData {
  date: string;
  value: number;
  change: number; // percentage change from previous period
  status: 'improving' | 'stable' | 'degrading';
}

// ============================================================================
// HEALTH CHECK TYPES
// ============================================================================

export interface HealthCheck {
  id: string;
  projectId: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
  expectedStatus: number;
  timeout: number; // in seconds
  interval: number; // in minutes
  enabled: boolean;
  lastCheck?: Date;
  lastStatus?: 'healthy' | 'unhealthy' | 'timeout' | 'error';
  lastResponseTime?: number;
  consecutiveFailures: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthCheckResult {
  id: string;
  healthCheckId: string;
  status: 'healthy' | 'unhealthy' | 'timeout' | 'error';
  responseTime: number;
  statusCode: number;
  responseBody?: string;
  error?: string;
  checkedAt: Date;
}
