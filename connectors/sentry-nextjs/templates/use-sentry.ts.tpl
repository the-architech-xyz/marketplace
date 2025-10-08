/**
 * Main Sentry Hook
 * 
 * Standardized main Sentry hook for comprehensive monitoring
 * EXTERNAL API IDENTICAL ACROSS ALL MONITORING PROVIDERS - Features work with ANY monitoring system!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { sentryApi } from '@/lib/sentry/api';
import type { SentryConfig, SentryStats, SentryHealth } from '@/lib/sentry/types';

// Main Sentry hook - returns configuration and health status
export function useSentry() {
  const queryClient = useQueryClient();
  
  // Get Sentry configuration
  const configQuery = useQuery({
    queryKey: queryKeys.sentry.config(),
    queryFn: () => sentryApi.getConfig(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
  
  // Get Sentry health status
  const healthQuery = useQuery({
    queryKey: queryKeys.sentry.health(),
    queryFn: () => sentryApi.getHealth(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const isLoading = configQuery.isLoading || healthQuery.isLoading;
  const error = configQuery.error || healthQuery.error;
  
  return {
    // Configuration
    config: configQuery.data || null,
    isConfigLoading: configQuery.isLoading,
    configError: configQuery.error,
    
    // Health status
    health: healthQuery.data || null,
    isHealthLoading: healthQuery.isLoading,
    healthError: healthQuery.error,
    
    // Combined status
    isLoading,
    error,
    isHealthy: healthQuery.data?.status === 'healthy',
    isUnhealthy: healthQuery.data?.status === 'unhealthy' && !isLoading,
    
    // Actions
    refetch: () => {
      configQuery.refetch();
      healthQuery.refetch();
    },
    
    // Invalidate Sentry data
    invalidate: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.all() });
    },
  };
}

// Sentry health status hook
export function useSentryHealth() {
  const { isHealthy, isLoading, error } = useSentry();
  
  return {
    isHealthy,
    isLoading,
    error,
    isUnhealthy: !isHealthy && !isLoading,
  };
}

// Sentry loading hook
export function useSentryLoading() {
  const { isLoading } = useSentry();
  
  return isLoading;
}

// Sentry error hook
export function useSentryError() {
  const { error } = useSentry();
  
  return error;
}

// Get Sentry statistics
export function useSentryStats(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.stats(timeRange || '24h'),
    queryFn: () => sentryApi.getStats(timeRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get Sentry projects
export function useSentryProjects() {
  return useQuery({
    queryKey: queryKeys.sentry.projects(),
    queryFn: () => sentryApi.getProjects(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get Sentry releases
export function useSentryReleases(projectId?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.releases(projectId),
    queryFn: () => sentryApi.getReleases(projectId),
    enabled: !!projectId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Create Sentry release
export function useCreateSentryRelease() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (release: any) => sentryApi.createRelease(release),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.releases(projectId) });
    },
    onError: (error) => {
      console.error('Failed to create Sentry release:', error);
    },
  });
}

// Get Sentry integrations
export function useSentryIntegrations() {
  return useQuery({
    queryKey: queryKeys.sentry.integrations(),
    queryFn: () => sentryApi.getIntegrations(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

// Configure Sentry integration
export function useConfigureSentryIntegration() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ integrationId, config }: { integrationId: string; config: any }) => 
      sentryApi.configureIntegration(integrationId, config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.integrations() });
    },
    onError: (error) => {
      console.error('Failed to configure Sentry integration:', error);
    },
  });
}

// Sentry refresh hook
export function useSentryRefresh() {
  const { refetch } = useSentry();
  
  return {
    refresh: refetch,
  };
}
