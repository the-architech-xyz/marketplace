/**
 * User Feedback Hook
 * 
 * Standardized user feedback hook for Sentry
 * EXTERNAL API IDENTICAL ACROSS ALL MONITORING PROVIDERS - Features work with ANY monitoring system!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { sentryApi } from '@/lib/sentry/api';
import type { UserFeedback, FeedbackStats, FeedbackFilter } from '@/lib/sentry/types';

// Get user feedback
export function useUserFeedback(filters?: FeedbackFilter) {
  return useQuery({
    queryKey: queryKeys.sentry.feedback(filters || {}),
    queryFn: () => sentryApi.getUserFeedback(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get feedback statistics
export function useFeedbackStats(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.feedbackStats(timeRange || '24h'),
    queryFn: () => sentryApi.getFeedbackStats(timeRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get feedback by ID
export function useFeedbackItem(feedbackId: string) {
  return useQuery({
    queryKey: queryKeys.sentry.feedbackItem(feedbackId),
    queryFn: () => sentryApi.getFeedbackItem(feedbackId),
    enabled: !!feedbackId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Submit user feedback
export function useSubmitFeedback() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (feedback: UserFeedback) => sentryApi.submitFeedback(feedback),
    onSuccess: () => {
      // Invalidate feedback lists
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.feedback() });
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.feedbackStats() });
    },
    onError: (error) => {
      console.error('Failed to submit feedback:', error);
    },
  });
}

// Update feedback status
export function useUpdateFeedbackStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ feedbackId, status }: { feedbackId: string; status: string }) => 
      sentryApi.updateFeedbackStatus(feedbackId, status),
    onSuccess: (_, { feedbackId }) => {
      // Update feedback in cache
      queryClient.setQueryData(
        queryKeys.sentry.feedbackItem(feedbackId),
        (old: UserFeedback | undefined) => old ? { ...old, status } : old
      );
      
      // Invalidate feedback lists
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.feedback() });
    },
    onError: (error) => {
      console.error('Failed to update feedback status:', error);
    },
  });
}

// Get feedback trends
export function useFeedbackTrends(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.feedbackTrends(timeRange || '7d'),
    queryFn: () => sentryApi.getFeedbackTrends(timeRange),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get feedback distribution
export function useFeedbackDistribution(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.feedbackDistribution(timeRange || '24h'),
    queryFn: () => sentryApi.getFeedbackDistribution(timeRange),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Get feedback sentiment
export function useFeedbackSentiment(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.feedbackSentiment(timeRange || '7d'),
    queryFn: () => sentryApi.getFeedbackSentiment(timeRange),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get feedback alerts
export function useFeedbackAlerts() {
  return useQuery({
    queryKey: queryKeys.sentry.feedbackAlerts(),
    queryFn: () => sentryApi.getFeedbackAlerts(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Create feedback alert
export function useCreateFeedbackAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (alert: any) => sentryApi.createFeedbackAlert(alert),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentry.feedbackAlerts() });
    },
    onError: (error) => {
      console.error('Failed to create feedback alert:', error);
    },
  });
}

// Get feedback insights
export function useFeedbackInsights(timeRange?: string) {
  return useQuery({
    queryKey: queryKeys.sentry.feedbackInsights(timeRange || '7d'),
    queryFn: () => sentryApi.getFeedbackInsights(timeRange),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}