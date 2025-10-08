export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'active' | 'resolved' | 'acknowledged' | 'suppressed';
export type MetricType = 'counter' | 'gauge' | 'histogram' | 'summary';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type SystemStatus = 'healthy' | 'degraded' | 'down' | 'unknown';

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  type: MetricType;
  timestamp: string;
  labels?: Record<string, string>;
  description?: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  metricId?: string;
  threshold?: number;
  currentValue?: number;
  triggeredAt: string;
  resolvedAt?: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: string;
  source: string;
  service?: string;
  userId?: string;
  requestId?: string;
  metadata?: Record<string, any>;
  stackTrace?: string;
}

export interface SystemHealth {
  status: SystemStatus;
  uptime: number;
  lastCheck: string;
  services: ServiceHealth[];
  overallScore: number;
}

export interface ServiceHealth {
  name: string;
  status: SystemStatus;
  responseTime?: number;
  lastCheck: string;
  endpoint?: string;
  error?: string;
}

export interface PerformanceMetrics {
  cpu: {
    usage: number;
    cores: number;
    loadAverage: number[];
  };
  memory: {
    used: number;
    total: number;
    free: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    free: number;
    percentage: number;
  };
  network: {
    bytesIn: number;
    bytesOut: number;
    packetsIn: number;
    packetsOut: number;
  };
}

export interface MonitoringDashboard {
  id: string;
  name: string;
  description?: string;
  widgets: DashboardWidget[];
  layout: DashboardLayout;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  ownerId: string;
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'alert' | 'log' | 'status';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: WidgetConfig;
  data?: any;
}

export interface WidgetConfig {
  metricId?: string;
  chartType?: 'line' | 'bar' | 'pie' | 'area' | 'gauge';
  timeRange?: string;
  refreshInterval?: number;
  thresholds?: AlertThreshold[];
  filters?: Record<string, any>;
}

export interface AlertThreshold {
  value: number;
  severity: AlertSeverity;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  gap: number;
}

export interface MonitoringSettings {
  alerting: {
    enabled: boolean;
    emailNotifications: boolean;
    webhookUrl?: string;
    slackChannel?: string;
  };
  retention: {
    metrics: number; // days
    logs: number; // days
    alerts: number; // days
  };
  refresh: {
    dashboard: number; // seconds
    metrics: number; // seconds
    alerts: number; // seconds
  };
  thresholds: {
    cpu: number;
    memory: number;
    disk: number;
    responseTime: number;
  };
}

export interface MonitoringAnalytics {
  totalAlerts: number;
  activeAlerts: number;
  resolvedAlerts: number;
  averageResponseTime: number;
  uptime: number;
  errorRate: number;
  topErrors: Array<{
    error: string;
    count: number;
    percentage: number;
  }>;
  performanceTrends: {
    cpu: Array<{ timestamp: string; value: number }>;
    memory: Array<{ timestamp: string; value: number }>;
    responseTime: Array<{ timestamp: string; value: number }>;
  };
}

export interface CreateAlertData {
  title: string;
  description: string;
  severity: AlertSeverity;
  source: string;
  metricId?: string;
  threshold?: number;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface UpdateAlertData {
  status?: AlertStatus;
  acknowledgedBy?: string;
  resolvedAt?: string;
}

export interface CreateDashboardData {
  name: string;
  description?: string;
  widgets?: DashboardWidget[];
  isPublic?: boolean;
}

export interface UpdateDashboardData {
  name?: string;
  description?: string;
  widgets?: DashboardWidget[];
  layout?: DashboardLayout;
  isPublic?: boolean;
}

export interface MonitoringFilters {
  timeRange?: {
    from: string;
    to: string;
  };
  severity?: AlertSeverity[];
  status?: AlertStatus[];
  source?: string[];
  service?: string[];
  level?: LogLevel[];
  search?: string;
}

export interface MonitoringError {
  code: string;
  message: string;
  type: 'validation_error' | 'api_error' | 'network_error' | 'permission_error';
  details?: Record<string, any>;
}
