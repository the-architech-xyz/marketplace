// Utility functions for monitoring features

// Types
export interface TimeRange {
  label: string;
  value: string;
  hours: number;
}

export interface MetricThreshold {
  warning: number;
  critical: number;
}

export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: 'greater_than' | 'less_than' | 'equals' | 'not_equals';
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
}

// Time range utilities
export const TIME_RANGES: TimeRange[] = [
  { label: 'Last 5 minutes', value: '5m', hours: 0.083 },
  { label: 'Last 15 minutes', value: '15m', hours: 0.25 },
  { label: 'Last 30 minutes', value: '30m', hours: 0.5 },
  { label: 'Last hour', value: '1h', hours: 1 },
  { label: 'Last 3 hours', value: '3h', hours: 3 },
  { label: 'Last 6 hours', value: '6h', hours: 6 },
  { label: 'Last 12 hours', value: '12h', hours: 12 },
  { label: 'Last 24 hours', value: '24h', hours: 24 },
  { label: 'Last 3 days', value: '3d', hours: 72 },
  { label: 'Last week', value: '1w', hours: 168 },
  { label: 'Last month', value: '1M', hours: 720 },
];

export const getTimeRangeByValue = (value: string): TimeRange | undefined => {
  return TIME_RANGES.find(range => range.value === value);
};

export const formatTimeRange = (value: string): string => {
  const range = getTimeRangeByValue(value);
  return range ? range.label : value;
};

// Status utilities
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'operational':
    case 'good':
      return 'text-green-600 bg-green-100';
    case 'degraded':
    case 'warning':
      return 'text-yellow-600 bg-yellow-100';
    case 'outage':
    case 'critical':
      return 'text-red-600 bg-red-100';
    case 'maintenance':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'low':
      return 'text-blue-600 bg-blue-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'critical':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getTrendColor = (trend: string): string => {
  switch (trend) {
    case 'up':
      return 'text-green-600';
    case 'down':
      return 'text-red-600';
    case 'stable':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

// Formatting utilities
export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${formatNumber(bytes / Math.pow(k, i))} ${sizes[i]}`;
};

export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
  return `${Math.round(seconds / 86400)}d`;
};

export const formatUptime = (uptime: string): string => {
  // Parse uptime string like "99.9%" or "2d 5h 30m"
  if (uptime.includes('%')) {
    return uptime;
  }
  
  // If it's a duration string, format it nicely
  return uptime;
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  if (diff < 60000) { // Less than 1 minute
    return 'Just now';
  } else if (diff < 3600000) { // Less than 1 hour
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diff < 86400000) { // Less than 1 day
    const hours = Math.floor(diff / 3600000);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diff / 86400000);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

// Validation utilities
export const isValidMetricValue = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

export const isValidThreshold = (threshold: MetricThreshold): boolean => {
  return (
    isValidMetricValue(threshold.warning) &&
    isValidMetricValue(threshold.critical) &&
    threshold.warning < threshold.critical
  );
};

export const isValidAlertRule = (rule: AlertRule): boolean => {
  return (
    !!rule.name &&
    !!rule.metric &&
    !!rule.condition &&
    isValidMetricValue(rule.threshold) &&
    !!rule.severity
  );
};

// Calculation utilities
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

export const calculateMedian = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
};

export const calculatePercentile = (values: number[], percentile: number): number => {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  
  if (Number.isInteger(index)) {
    return sorted[index];
  } else {
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  }
};

// Health score calculation
export const calculateHealthScore = (metrics: Array<{ status: string; weight?: number }>): number => {
  if (metrics.length === 0) return 0;
  
  let totalWeight = 0;
  let weightedScore = 0;
  
  metrics.forEach(metric => {
    const weight = metric.weight || 1;
    totalWeight += weight;
    
    let score = 0;
    switch (metric.status) {
      case 'good':
      case 'operational':
        score = 100;
        break;
      case 'warning':
      case 'degraded':
        score = 50;
        break;
      case 'critical':
      case 'outage':
        score = 0;
        break;
      default:
        score = 0;
    }
    
    weightedScore += score * weight;
  });
  
  return totalWeight > 0 ? Math.round(weightedScore / totalWeight) : 0;
};

// Data aggregation utilities
export const aggregateMetricsByTime = (
  metrics: Array<{ timestamp: string; value: number }>,
  interval: 'minute' | 'hour' | 'day' = 'hour'
): Array<{ timestamp: string; value: number; count: number }> => {
  const intervals: { [key: string]: { value: number; count: number } } = {};
  
  metrics.forEach(metric => {
    const date = new Date(metric.timestamp);
    let key: string;
    
    switch (interval) {
      case 'minute':
        key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
        break;
      case 'hour':
        key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
        break;
      case 'day':
        key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        break;
      default:
        key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`;
    }
    
    if (!intervals[key]) {
      intervals[key] = { value: 0, count: 0 };
    }
    
    intervals[key].value += metric.value;
    intervals[key].count += 1;
  });
  
  return Object.entries(intervals).map(([timestamp, data]) => ({
    timestamp,
    value: data.value / data.count, // Average value
    count: data.count,
  }));
};

// Export utilities
export const exportToCSV = (data: any[], filename: string = 'monitoring-data.csv'): void => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data: any[], filename: string = 'monitoring-data.json'): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
