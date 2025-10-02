/**
 * Error Tracking Hook
 * 
 * Standardized error tracking hook for Sentry
 * EXTERNAL API IDENTICAL ACROSS ALL MONITORING PROVIDERS - Features work with ANY monitoring system!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { sentryApi } from '@/lib/sentry/api';
import type { ErrorEvent, ErrorStats, ErrorFilter } from '@/lib/sentry/types';

// Get error events
export function useErrorEvents(filters?: ErrorFilter) {
  return useQuery({
    queryKey: queryKeys.sentry.errors(filters || {}),
    queryFn: () => sentryApi.getErrorEvents(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get error statistics
export function useErrorStats(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.stats(timeRange || '24h'),
    queryFn: () => sentryApi.getErrorStats(timeRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get error by ID
export function useErrorEvent(errorId: string) {
  return useQuery({
    queryKey: queryKeys.sentry.error(errorId),
    queryFn: () => sentryApi.getErrorEvent(errorId),
    enabled: !!errorId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Report custom error
export function useReportError() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (error: ErrorEvent) => sentryApi.reportError(error),
    onSuccess: () => {
      // Invalidate error stats
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.stats() });
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.errors() });
    },
    onError: (error) => {
      console.error('Failed to report error:', error);
    },
  });
}

// Resolve error
export function useResolveError() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (errorId: string) => sentryApi.resolveError(errorId),
    onSuccess: (_, errorId) => {
      // Update error in cache
      queryClient.setQueryData(
        queryKeys.sentry.error(errorId),
        (old: ErrorEvent | undefined) => old ? { ...old, status: 'resolved' } : old
      );
      
      // Invalidate error lists
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.errors() });
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.stats() });
    },
    onError: (error) => {
      console.error('Failed to resolve error:', error);
    },
  });
}

// Ignore error
export function useIgnoreError() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (errorId: string) => sentryApi.ignoreError(errorId),
    onSuccess: (_, errorId) => {
      // Update error in cache
      queryClient.setQueryData(
        queryKeys.sentry.error(errorId),
        (old: ErrorEvent | undefined) => old ? { ...old, status: 'ignored' } : old
      );
      
      // Invalidate error lists
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.errors() });
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.stats() });
    },
    onError: (error) => {
      console.error('Failed to ignore error:', error);
    },
  });
}

// Get error trends
export function useErrorTrends(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.trends(timeRange || '7d'),
    queryFn: () => sentryApi.getErrorTrends(timeRange),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get error distribution
export function useErrorDistribution(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.distribution(timeRange || '24h'),
    queryFn: () => sentryApi.getErrorDistribution(timeRange),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Get error alerts
export function useErrorAlerts() {
  return useQuery({
    queryKey: queryKeys.sentry.alerts(),
    queryFn: () => sentryApi.getErrorAlerts(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Create error alert
export function useCreateErrorAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (alert: any) => sentryApi.createErrorAlert(alert),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.alerts() });
    },
    onError: (error) => {
      console.error('Failed to create error alert:', error);
    },
  });
}