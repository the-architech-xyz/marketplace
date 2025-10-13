'use client';

import { useQuery } from '@tanstack/react-query';
import type { MonitoringStats, ErrorSummary, MonitoringFilters } from '@/types/monitoring';

/**
 * Hook to fetch monitoring statistics
 */
export function useMonitoringStats(refreshInterval = 30000) {
  return useQuery<MonitoringStats>({
    queryKey: ['monitoring', 'stats'],
    queryFn: async () => {
      const response = await fetch('/api/monitoring/stats');
      if (!response.ok) throw new Error('Failed to fetch monitoring stats');
      return response.json();
    },
    refetchInterval: refreshInterval
  });
}

/**
 * Hook to fetch error list
 */
export function useErrorList(filters?: MonitoringFilters, refreshInterval = 30000) {
  return useQuery<ErrorSummary[]>({
    queryKey: ['monitoring', 'errors', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.level) params.append('level', filters.level.join(','));
      if (filters?.status) params.append('status', filters.status.join(','));
      if (filters?.environment) params.append('environment', filters.environment);
      if (filters?.search) params.append('search', filters.search);
      
      const response = await fetch(`/api/monitoring/errors?${params}`);
      if (!response.ok) throw new Error('Failed to fetch errors');
      return response.json();
    },
    refetchInterval: refreshInterval
  });
}

/**
 * Hook to fetch error details
 */
export function useErrorDetails(errorId: string) {
  return useQuery({
    queryKey: ['monitoring', 'errors', errorId],
    queryFn: async () => {
      const response = await fetch(`/api/monitoring/errors/${errorId}`);
      if (!response.ok) throw new Error('Failed to fetch error details');
      return response.json();
    },
    enabled: !!errorId
  });
}

/**
 * Hook to fetch performance metrics
 */
export function usePerformanceMetrics(timeRange = '24h') {
  return useQuery({
    queryKey: ['monitoring', 'performance', timeRange],
    queryFn: async () => {
      const response = await fetch(`/api/monitoring/performance?range=${timeRange}`);
      if (!response.ok) throw new Error('Failed to fetch performance metrics');
      return response.json();
    },
    refetchInterval: 60000 // 1 minute
  });
}

/**
 * Hook to fetch Web Vitals
 */
export function useWebVitals() {
  return useQuery({
    queryKey: ['monitoring', 'web-vitals'],
    queryFn: async () => {
      const response = await fetch('/api/monitoring/web-vitals');
      if (!response.ok) throw new Error('Failed to fetch web vitals');
      return response.json();
    },
    refetchInterval: 60000 // 1 minute
  });
}

