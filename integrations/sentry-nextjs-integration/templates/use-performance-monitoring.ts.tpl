/**
 * Performance Monitoring Hook
 * 
 * Standardized performance monitoring hook for Sentry
 * EXTERNAL API IDENTICAL ACROSS ALL MONITORING PROVIDERS - Features work with ANY monitoring system!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { sentryApi } from '@/lib/sentry/api';
import type { PerformanceEvent, PerformanceStats, PerformanceFilter } from '@/lib/sentry/types';

// Get performance events
export function usePerformanceEvents(filters?: PerformanceFilter) {
  return useQuery({
    queryKey: queryKeys.sentry.performance(filters || {}),
    queryFn: () => sentryApi.getPerformanceEvents(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get performance statistics
export function usePerformanceStats(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.performanceStats(timeRange || '24h'),
    queryFn: () => sentryApi.getPerformanceStats(timeRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get performance by ID
export function usePerformanceEvent(eventId: string) {
  return useQuery({
    queryKey: queryKeys.sentry.performanceEvent(eventId),
    queryFn: () => sentryApi.getPerformanceEvent(eventId),
    enabled: !!eventId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Report custom performance event
export function useReportPerformance() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (event: PerformanceEvent) => sentryApi.reportPerformance(event),
    onSuccess: () => {
      // Invalidate performance stats
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.performanceStats() });
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.performance() });
    },
    onError: (error) => {
      console.error('Failed to report performance event:', error);
    },
  });
}

// Get performance trends
export function usePerformanceTrends(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.performanceTrends(timeRange || '7d'),
    queryFn: () => sentryApi.getPerformanceTrends(timeRange),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get performance distribution
export function usePerformanceDistribution(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.performanceDistribution(timeRange || '24h'),
    queryFn: () => sentryApi.getPerformanceDistribution(timeRange),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Get Core Web Vitals
export function useCoreWebVitals(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.coreWebVitals(timeRange || '24h'),
    queryFn: () => sentryApi.getCoreWebVitals(timeRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get performance alerts
export function usePerformanceAlerts() {
  return useQuery({
    queryKey: queryKeys.sentry.performanceAlerts(),
    queryFn: () => sentryApi.getPerformanceAlerts(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Create performance alert
export function useCreatePerformanceAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (alert: any) => sentryApi.createPerformanceAlert(alert),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.performanceAlerts() });
    },
    onError: (error) => {
      console.error('Failed to create performance alert:', error);
    },
  });
}

// Get performance insights
export function usePerformanceInsights(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.performanceInsights(timeRange || '7d'),
    queryFn: () => sentryApi.getPerformanceInsights(timeRange),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get performance recommendations
export function usePerformanceRecommendations() {
  return useQuery({
    queryKey: queryKeys.sentry.performanceRecommendations(),
    queryFn: () => sentryApi.getPerformanceRecommendations(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}