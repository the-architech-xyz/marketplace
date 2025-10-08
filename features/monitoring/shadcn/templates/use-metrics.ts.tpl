import { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
  metadata?: Record<string, any>;
}

export interface MetricFilters {
  status?: string;
  trend?: string;
  search?: string;
  timeRange?: string;
  limit?: number;
}

export interface MetricStats {
  total: number;
  good: number;
  warning: number;
  critical: number;
  averageValue: number;
  minValue: number;
  maxValue: number;
  lastUpdated: string;
}

export interface MetricDataPoint {
  timestamp: string;
  value: number;
  label?: string;
}

// API functions
const fetchMetrics = async (filters: MetricFilters = {}): Promise<Metric[]> => {
  const searchParams = new URLSearchParams();
  if (filters.status) searchParams.append('status', filters.status);
  if (filters.trend) searchParams.append('trend', filters.trend);
  if (filters.search) searchParams.append('search', filters.search);
  if (filters.timeRange) searchParams.append('timeRange', filters.timeRange);
  if (filters.limit) searchParams.append('limit', filters.limit.toString());

  const response = await fetch(`/api/monitoring/metrics?${searchParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch metrics');
  }
  return response.json();
};

const fetchMetricStats = async (): Promise<MetricStats> => {
  const response = await fetch('/api/monitoring/metrics/stats');
  if (!response.ok) {
    throw new Error('Failed to fetch metric stats');
  }
  return response.json();
};

const fetchMetricHistory = async (metricId: string, timeRange: string = '1h'): Promise<MetricDataPoint[]> => {
  const response = await fetch(`/api/monitoring/metrics/${metricId}/history?timeRange=${timeRange}`);
  if (!response.ok) {
    throw new Error('Failed to fetch metric history');
  }
  return response.json();
};

const updateMetricThreshold = async (metricId: string, threshold: { warning: number; critical: number }): Promise<void> => {
  const response = await fetch(`/api/monitoring/metrics/${metricId}/threshold`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(threshold),
  });
  if (!response.ok) {
    throw new Error('Failed to update metric threshold');
  }
};

// Hooks
export const useMetrics = (filters: MetricFilters = {}) => {
  return useQuery({
    queryKey: ['monitoring', 'metrics', filters],
    queryFn: () => fetchMetrics(filters),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
};

export const useMetricStats = () => {
  return useQuery({
    queryKey: ['monitoring', 'metrics', 'stats'],
    queryFn: fetchMetricStats,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
};

export const useMetricHistory = (metricId: string, timeRange: string = '1h') => {
  return useQuery({
    queryKey: ['monitoring', 'metrics', metricId, 'history', timeRange],
    queryFn: () => fetchMetricHistory(metricId, timeRange),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
    enabled: !!metricId,
  });
};

export const useUpdateMetricThreshold = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ metricId, threshold }: { metricId: string; threshold: { warning: number; critical: number } }) =>
      updateMetricThreshold(metricId, threshold),
    onSuccess: (_, { metricId }) => {
      // Invalidate and refetch metrics
      queryClient.invalidateQueries({ queryKey: ['monitoring', 'metrics'] });
      queryClient.invalidateQueries({ queryKey: ['monitoring', 'metrics', metricId] });
    },
  });
};

// Custom hook for metric management
export const useMetricManagement = (initialFilters: MetricFilters = {}) => {
  const [filters, setFilters] = useState<MetricFilters>(initialFilters);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const { data: metrics, isLoading, error } = useMetrics(filters);
  const { data: stats } = useMetricStats();
  
  const updateThresholdMutation = useUpdateMetricThreshold();

  const handleUpdateThreshold = useCallback((metricId: string, threshold: { warning: number; critical: number }) => {
    updateThresholdMutation.mutate({ metricId, threshold });
  }, [updateThresholdMutation]);

  const handleSelectMetric = useCallback((metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (metrics) {
      setSelectedMetrics(
        selectedMetrics.length === metrics.length 
          ? [] 
          : metrics.map(metric => metric.id)
      );
    }
  }, [metrics, selectedMetrics.length]);

  const handleFilterChange = useCallback((newFilters: Partial<MetricFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const getFilteredMetrics = useCallback(() => {
    if (!metrics) return [];
    
    return metrics.filter(metric => {
      if (filters.status && metric.status !== filters.status) return false;
      if (filters.trend && metric.trend !== filters.trend) return false;
      if (filters.search && !metric.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [metrics, filters]);

  const getMetricsByStatus = useCallback(() => {
    if (!metrics) return { good: [], warning: [], critical: [] };
    
    return {
      good: metrics.filter(m => m.status === 'good'),
      warning: metrics.filter(m => m.status === 'warning'),
      critical: metrics.filter(m => m.status === 'critical'),
    };
  }, [metrics]);

  const getMetricsByTrend = useCallback(() => {
    if (!metrics) return { up: [], down: [], stable: [] };
    
    return {
      up: metrics.filter(m => m.trend === 'up'),
      down: metrics.filter(m => m.trend === 'down'),
      stable: metrics.filter(m => m.trend === 'stable'),
    };
  }, [metrics]);

  const getAverageValue = useCallback(() => {
    if (!metrics || metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }, [metrics]);

  const getMinValue = useCallback(() => {
    if (!metrics || metrics.length === 0) return 0;
    return Math.min(...metrics.map(m => m.value));
  }, [metrics]);

  const getMaxValue = useCallback(() => {
    if (!metrics || metrics.length === 0) return 0;
    return Math.max(...metrics.map(m => m.value));
  }, [metrics]);

  const getHealthScore = useCallback(() => {
    if (!metrics || metrics.length === 0) return 0;
    
    const goodCount = metrics.filter(m => m.status === 'good').length;
    const warningCount = metrics.filter(m => m.status === 'warning').length;
    const criticalCount = metrics.filter(m => m.status === 'critical').length;
    
    const total = metrics.length;
    const score = ((goodCount * 100) + (warningCount * 50) + (criticalCount * 0)) / total;
    
    return Math.round(score);
  }, [metrics]);

  return {
    // Data
    metrics: getFilteredMetrics(),
    stats,
    filters,
    selectedMetrics,
    
    // Loading states
    isLoading,
    error,
    
    // Actions
    updateThreshold: handleUpdateThreshold,
    
    // Selection
    selectMetric: handleSelectMetric,
    selectAll: handleSelectAll,
    
    // Filtering
    setFilters: handleFilterChange,
    clearFilters: handleClearFilters,
    
    // Computed values
    metricsByStatus: getMetricsByStatus(),
    metricsByTrend: getMetricsByTrend(),
    averageValue: getAverageValue(),
    minValue: getMinValue(),
    maxValue: getMaxValue(),
    healthScore: getHealthScore(),
    
    // Mutation states
    isUpdatingThreshold: updateThresholdMutation.isPending,
  };
};

// Hook for real-time metrics
export const useRealTimeMetrics = (enabled: boolean = true) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const queryClient = useQueryClient();

  const connectWebSocket = useCallback(() => {
    if (!enabled) return;

    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/metrics');
    
    ws.onopen = () => {
      setIsConnected(true);
      console.log('Metrics WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastUpdate(new Date());
      
      if (data.type === 'metric_update') {
        // Update metrics cache
        queryClient.setQueryData(['monitoring', 'metrics'], (oldData: Metric[] | undefined) => {
          if (!oldData) return [data.metric];
          
          const existingIndex = oldData.findIndex(m => m.id === data.metric.id);
          if (existingIndex >= 0) {
            const newData = [...oldData];
            newData[existingIndex] = data.metric;
            return newData;
          } else {
            return [...oldData, data.metric];
          }
        });
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('Metrics WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('Metrics WebSocket error:', error);
      setIsConnected(false);
    };

    return ws;
  }, [enabled, queryClient]);

  const ws = useMemo(() => connectWebSocket(), [connectWebSocket]);

  return {
    isConnected,
    lastUpdate,
    ws,
  };
};
