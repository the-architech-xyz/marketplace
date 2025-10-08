import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface MonitoringMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'dismissed';
  source: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source: string;
  service: string;
  traceId?: string;
  metadata?: Record<string, any>;
}

export interface SystemComponent {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: string;
  lastIncident?: string;
  description: string;
  type: 'server' | 'database' | 'network' | 'storage' | 'cpu' | 'memory';
}

// API functions
const fetchMetrics = async (): Promise<MonitoringMetric[]> => {
  const response = await fetch('/api/monitoring/metrics');
  if (!response.ok) {
    throw new Error('Failed to fetch metrics');
  }
  return response.json();
};

const fetchAlerts = async (): Promise<Alert[]> => {
  const response = await fetch('/api/monitoring/alerts');
  if (!response.ok) {
    throw new Error('Failed to fetch alerts');
  }
  return response.json();
};

const fetchLogs = async (params: {
  level?: string;
  service?: string;
  search?: string;
  limit?: number;
}): Promise<LogEntry[]> => {
  const searchParams = new URLSearchParams();
  if (params.level) searchParams.append('level', params.level);
  if (params.service) searchParams.append('service', params.service);
  if (params.search) searchParams.append('search', params.search);
  if (params.limit) searchParams.append('limit', params.limit.toString());

  const response = await fetch(`/api/monitoring/logs?${searchParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch logs');
  }
  return response.json();
};

const fetchSystemStatus = async (): Promise<SystemComponent[]> => {
  const response = await fetch('/api/monitoring/status');
  if (!response.ok) {
    throw new Error('Failed to fetch system status');
  }
  return response.json();
};

const acknowledgeAlert = async (alertId: string): Promise<void> => {
  const response = await fetch(`/api/monitoring/alerts/${alertId}/acknowledge`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to acknowledge alert');
  }
};

const dismissAlert = async (alertId: string): Promise<void> => {
  const response = await fetch(`/api/monitoring/alerts/${alertId}/dismiss`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to dismiss alert');
  }
};

// Hooks
export const useMonitoringMetrics = () => {
  return useQuery({
    queryKey: ['monitoring', 'metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};

export const useMonitoringAlerts = () => {
  return useQuery({
    queryKey: ['monitoring', 'alerts'],
    queryFn: fetchAlerts,
    refetchInterval: 15000, // Refetch every 15 seconds
    staleTime: 5000, // Consider data stale after 5 seconds
  });
};

export const useMonitoringLogs = (params: {
  level?: string;
  service?: string;
  search?: string;
  limit?: number;
} = {}) => {
  return useQuery({
    queryKey: ['monitoring', 'logs', params],
    queryFn: () => fetchLogs(params),
    refetchInterval: 10000, // Refetch every 10 seconds
    staleTime: 5000, // Consider data stale after 5 seconds
  });
};

export const useSystemStatus = () => {
  return useQuery({
    queryKey: ['monitoring', 'status'],
    queryFn: fetchSystemStatus,
    refetchInterval: 20000, // Refetch every 20 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};

export const useAcknowledgeAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: acknowledgeAlert,
    onSuccess: () => {
      // Invalidate and refetch alerts
      queryClient.invalidateQueries({ queryKey: ['monitoring', 'alerts'] });
    },
  });
};

export const useDismissAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: dismissAlert,
    onSuccess: () => {
      // Invalidate and refetch alerts
      queryClient.invalidateQueries({ queryKey: ['monitoring', 'alerts'] });
    },
  });
};

// Utility hooks
export const useMonitoringSummary = () => {
  const { data: metrics, isLoading: metricsLoading } = useMonitoringMetrics();
  const { data: alerts, isLoading: alertsLoading } = useMonitoringAlerts();
  const { data: systemStatus, isLoading: statusLoading } = useSystemStatus();

  const summary = {
    totalMetrics: metrics?.length || 0,
    criticalMetrics: metrics?.filter(m => m.status === 'critical').length || 0,
    warningMetrics: metrics?.filter(m => m.status === 'warning').length || 0,
    activeAlerts: alerts?.filter(a => a.status === 'active').length || 0,
    criticalAlerts: alerts?.filter(a => a.severity === 'critical' && a.status === 'active').length || 0,
    operationalComponents: systemStatus?.filter(c => c.status === 'operational').length || 0,
    totalComponents: systemStatus?.length || 0,
    overallHealth: 'unknown' as 'good' | 'warning' | 'critical' | 'unknown',
  };

  // Calculate overall health
  if (!metricsLoading && !alertsLoading && !statusLoading) {
    if (summary.criticalAlerts > 0 || summary.criticalMetrics > 0) {
      summary.overallHealth = 'critical';
    } else if (summary.activeAlerts > 0 || summary.warningMetrics > 0) {
      summary.overallHealth = 'warning';
    } else {
      summary.overallHealth = 'good';
    }
  }

  return {
    summary,
    isLoading: metricsLoading || alertsLoading || statusLoading,
  };
};

export const useRealTimeMonitoring = (enabled: boolean = true) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Simulate WebSocket connection
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/monitoring');
    
    ws.onopen = () => {
      setIsConnected(true);
      console.log('Monitoring WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastUpdate(new Date());
      
      // Handle real-time updates
      if (data.type === 'metric_update') {
        // Update metrics cache
        console.log('Metric update received:', data);
      } else if (data.type === 'alert_created') {
        // Update alerts cache
        console.log('New alert received:', data);
      } else if (data.type === 'log_entry') {
        // Update logs cache
        console.log('New log entry received:', data);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('Monitoring WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('Monitoring WebSocket error:', error);
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [enabled]);

  return {
    isConnected,
    lastUpdate,
  };
};

// Custom hook for monitoring dashboard
export const useMonitoringDashboard = () => {
  const { data: metrics, isLoading: metricsLoading } = useMonitoringMetrics();
  const { data: alerts, isLoading: alertsLoading } = useMonitoringAlerts();
  const { data: logs, isLoading: logsLoading } = useMonitoringLogs({ limit: 100 });
  const { data: systemStatus, isLoading: statusLoading } = useSystemStatus();
  const { summary, isLoading: summaryLoading } = useMonitoringSummary();
  const { isConnected, lastUpdate } = useRealTimeMonitoring();

  const acknowledgeAlertMutation = useAcknowledgeAlert();
  const dismissAlertMutation = useDismissAlert();

  const handleAcknowledgeAlert = useCallback((alertId: string) => {
    acknowledgeAlertMutation.mutate(alertId);
  }, [acknowledgeAlertMutation]);

  const handleDismissAlert = useCallback((alertId: string) => {
    dismissAlertMutation.mutate(alertId);
  }, [dismissAlertMutation]);

  return {
    // Data
    metrics,
    alerts,
    logs,
    systemStatus,
    summary,
    
    // Loading states
    isLoading: metricsLoading || alertsLoading || logsLoading || statusLoading || summaryLoading,
    
    // Real-time status
    isConnected,
    lastUpdate,
    
    // Actions
    acknowledgeAlert: handleAcknowledgeAlert,
    dismissAlert: handleDismissAlert,
    
    // Mutation states
    isAcknowledging: acknowledgeAlertMutation.isPending,
    isDismissing: dismissAlertMutation.isPending,
  };
};
