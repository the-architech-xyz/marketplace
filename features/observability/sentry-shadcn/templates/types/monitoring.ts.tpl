/**
 * Monitoring Dashboard Types
 * 
 * Type definitions for Sentry monitoring UI
 */

export interface MonitoringStats {
  totalErrors: number;
  totalUsers: number;
  errorRate: number;
  uptime: number;
  avgResponseTime: number;
}

export interface ErrorSummary {
  id: string;
  title: string;
  message: string;
  count: number;
  lastSeen: Date;
  firstSeen: Date;
  level: 'error' | 'warning' | 'info' | 'fatal';
  status: 'unresolved' | 'resolved' | 'ignored';
  affectedUsers: number;
  platform?: string;
  environment?: string;
}

export interface ErrorDetails extends ErrorSummary {
  stackTrace: string[];
  breadcrumbs: Breadcrumb[];
  tags: Record<string, string>;
  user?: {
    id: string;
    email?: string;
    username?: string;
  };
  context: Record<string, any>;
  releases?: string[];
}

export interface Breadcrumb {
  timestamp: Date;
  category: string;
  message: string;
  level: string;
  data?: Record<string, any>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  rating?: 'good' | 'needs-improvement' | 'poor';
}

export interface WebVitals {
  fcp: PerformanceMetric;
  lcp: PerformanceMetric;
  cls: PerformanceMetric;
  fid: PerformanceMetric;
  ttfb: PerformanceMetric;
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  enabled: boolean;
  notificationChannels: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MonitoringFilters {
  level?: ('error' | 'warning' | 'info' | 'fatal')[];
  status?: ('unresolved' | 'resolved' | 'ignored')[];
  environment?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  search?: string;
}

