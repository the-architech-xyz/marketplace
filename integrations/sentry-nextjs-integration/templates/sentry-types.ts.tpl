/**
 * Sentry Types
 * 
 * TypeScript types for Sentry integration
 * Provides type safety for all Sentry operations
 */

// Error Tracking Types
export interface ErrorEvent {
  id: string;
  title: string;
  message: string;
  level: 'error' | 'warning' | 'info' | 'debug';
  status: 'unresolved' | 'resolved' | 'ignored';
  project: string;
  environment: string;
  timestamp: string;
  user: {
    id?: string;
    email?: string;
    username?: string;
  };
  tags: Record<string, string>;
  metadata: Record<string, any>;
  stacktrace?: {
    frames: Array<{
      filename: string;
      function: string;
      line: number;
      column: number;
    }>;
  };
  context: Record<string, any>;
}

export interface ErrorStats {
  total: number;
  resolved: number;
  unresolved: number;
  ignored: number;
  new: number;
  regressions: number;
  timeRange: string;
  trends: Array<{
    date: string;
    count: number;
  }>;
}

export interface ErrorFilter {
  project?: string;
  environment?: string;
  status?: 'unresolved' | 'resolved' | 'ignored';
  timeRange?: string;
  level?: 'error' | 'warning' | 'info' | 'debug';
}

// Performance Monitoring Types
export interface PerformanceEvent {
  id: string;
  transaction: string;
  project: string;
  environment: string;
  timestamp: string;
  duration: number;
  user: {
    id?: string;
    email?: string;
    username?: string;
  };
  tags: Record<string, string>;
  measurements: {
    fcp?: number; // First Contentful Paint
    lcp?: number; // Largest Contentful Paint
    fid?: number; // First Input Delay
    cls?: number; // Cumulative Layout Shift
    ttfb?: number; // Time to First Byte
  };
  spans: Array<{
    op: string;
    description: string;
    start_timestamp: number;
    timestamp: number;
    duration: number;
  }>;
}

export interface PerformanceStats {
  total: number;
  average: number;
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  p99: number;
  timeRange: string;
  trends: Array<{
    date: string;
    average: number;
    p95: number;
  }>;
}

export interface PerformanceFilter {
  project?: string;
  environment?: string;
  timeRange?: string;
  transaction?: string;
}

// User Feedback Types
export interface UserFeedback {
  id: string;
  name: string;
  email: string;
  comments: string;
  event_id: string;
  project: string;
  environment: string;
  timestamp: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  sentiment?: 'positive' | 'negative' | 'neutral';
  tags: Record<string, string>;
  metadata: Record<string, any>;
}

export interface FeedbackStats {
  total: number;
  new: number;
  in_progress: number;
  resolved: number;
  closed: number;
  positive: number;
  negative: number;
  neutral: number;
  timeRange: string;
  trends: Array<{
    date: string;
    count: number;
  }>;
}

export interface FeedbackFilter {
  project?: string;
  status?: 'new' | 'in_progress' | 'resolved' | 'closed';
  timeRange?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

// Main Sentry Types
export interface SentryConfig {
  dsn: string;
  environment: string;
  release?: string;
  debug: boolean;
  tracesSampleRate: number;
  replaysSessionSampleRate: number;
  replaysOnErrorSampleRate: number;
  integrations: string[];
  beforeSend?: (event: any) => any;
  beforeBreadcrumb?: (breadcrumb: any) => any;
}

export interface SentryStats {
  errors: ErrorStats;
  performance: PerformanceStats;
  feedback: FeedbackStats;
  timeRange: string;
  lastUpdated: string;
}

export interface SentryHealth {
  status: 'healthy' | 'unhealthy' | 'degraded';
  uptime: number;
  lastCheck: string;
  issues: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
  metrics: {
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
}

// API Response Types
export interface SentryApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface SentryPaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  success: boolean;
  message?: string;
}

// Query Key Types
export interface SentryQueryKeys {
  all: () => string[];
  config: () => string[];
  health: () => string[];
  stats: (timeRange?: string) => string[];
  projects: () => string[];
  releases: (projectId?: string) => string[];
  integrations: () => string[];
  errors: (filters?: ErrorFilter) => string[];
  error: (errorId: string) => string[];
  performance: (filters?: PerformanceFilter) => string[];
  performanceEvent: (eventId: string) => string[];
  performanceStats: (timeRange?: string) => string[];
  performanceTrends: (timeRange?: string) => string[];
  performanceDistribution: (timeRange?: string) => string[];
  coreWebVitals: (timeRange?: string) => string[];
  performanceAlerts: () => string[];
  performanceInsights: (timeRange?: string) => string[];
  performanceRecommendations: () => string[];
  feedback: (filters?: FeedbackFilter) => string[];
  feedbackItem: (feedbackId: string) => string[];
  feedbackStats: (timeRange?: string) => string[];
  feedbackTrends: (timeRange?: string) => string[];
  feedbackDistribution: (timeRange?: string) => string[];
  feedbackSentiment: (timeRange?: string) => string[];
  feedbackAlerts: () => string[];
  feedbackInsights: (timeRange?: string) => string[];
  trends: (timeRange?: string) => string[];
  distribution: (timeRange?: string) => string[];
  alerts: () => string[];
}
