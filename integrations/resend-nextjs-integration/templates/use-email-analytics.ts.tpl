/**
 * Email Analytics Hook
 * 
 * Standardized TanStack Query hook for email analytics via Resend
 * EXTERNAL API IDENTICAL ACROSS ALL EMAIL PROVIDERS - Features work with ANY email service!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { emailApi } from '@/lib/email/api';
import type { EmailAnalytics, EmailStats, EmailError } from '@/lib/email/types';

// Get email analytics
export function useEmailAnalytics(filters?: { 
  startDate?: Date; 
  endDate?: Date; 
  templateId?: string; 
  campaignId?: string; 
}) {
  return useQuery({
    queryKey: queryKeys.email.analytics(filters || {}),
    queryFn: () => emailApi.getAnalytics(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get email statistics
export function useEmailStats(filters?: { 
  startDate?: Date; 
  endDate?: Date; 
  templateId?: string; 
  campaignId?: string; 
}) {
  return useQuery({
    queryKey: queryKeys.email.stats(filters || {}),
    queryFn: () => emailApi.getStats(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get email delivery rates
export function useEmailDeliveryRates(filters?: { 
  startDate?: Date; 
  endDate?: Date; 
  templateId?: string; 
  campaignId?: string; 
}) {
  return useQuery({
    queryKey: queryKeys.email.deliveryRates(filters || {}),
    queryFn: () => emailApi.getDeliveryRates(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email open rates
export function useEmailOpenRates(filters?: { 
  startDate?: Date; 
  endDate?: Date; 
  templateId?: string; 
  campaignId?: string; 
}) {
  return useQuery({
    queryKey: queryKeys.email.openRates(filters || {}),
    queryFn: () => emailApi.getOpenRates(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email click rates
export function useEmailClickRates(filters?: { 
  startDate?: Date; 
  endDate?: Date; 
  templateId?: string; 
  campaignId?: string; 
}) {
  return useQuery({
    queryKey: queryKeys.email.clickRates(filters || {}),
    queryFn: () => emailApi.getClickRates(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email bounce rates
export function useEmailBounceRates(filters?: { 
  startDate?: Date; 
  endDate?: Date; 
  templateId?: string; 
  campaignId?: string; 
}) {
  return useQuery({
    queryKey: queryKeys.email.bounceRates(filters || {}),
    queryFn: () => emailApi.getBounceRates(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email unsubscribe rates
export function useEmailUnsubscribeRates(filters?: { 
  startDate?: Date; 
  endDate?: Date; 
  templateId?: string; 
  campaignId?: string; 
}) {
  return useQuery({
    queryKey: queryKeys.email.unsubscribeRates(filters || {}),
    queryFn: () => emailApi.getUnsubscribeRates(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email performance by template
export function useEmailPerformanceByTemplate(templateId: string) {
  return useQuery({
    queryKey: queryKeys.email.templatePerformance(templateId),
    queryFn: () => emailApi.getTemplatePerformance(templateId),
    enabled: !!templateId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email performance by campaign
export function useEmailPerformanceByCampaign(campaignId: string) {
  return useQuery({
    queryKey: queryKeys.email.campaignPerformance(campaignId),
    queryFn: () => emailApi.getCampaignPerformance(campaignId),
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email performance by recipient
export function useEmailPerformanceByRecipient(recipientEmail: string) {
  return useQuery({
    queryKey: queryKeys.email.recipientPerformance(recipientEmail),
    queryFn: () => emailApi.getRecipientPerformance(recipientEmail),
    enabled: !!recipientEmail,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email performance trends
export function useEmailPerformanceTrends(filters?: { 
  startDate?: Date; 
  endDate?: Date; 
  templateId?: string; 
  campaignId?: string; 
  interval?: 'hour' | 'day' | 'week' | 'month';
}) {
  return useQuery({
    queryKey: queryKeys.email.performanceTrends(filters || {}),
    queryFn: () => emailApi.getPerformanceTrends(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email performance comparison
export function useEmailPerformanceComparison(filters: { 
  startDate: Date; 
  endDate: Date; 
  compareStartDate: Date; 
  compareEndDate: Date; 
  templateId?: string; 
  campaignId?: string; 
}) {
  return useQuery({
    queryKey: queryKeys.email.performanceComparison(filters),
    queryFn: () => emailApi.getPerformanceComparison(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email performance summary
export function useEmailPerformanceSummary(filters?: { 
  startDate?: Date; 
  endDate?: Date; 
  templateId?: string; 
  campaignId?: string; 
}) {
  return useQuery({
    queryKey: queryKeys.email.performanceSummary(filters || {}),
    queryFn: () => emailApi.getPerformanceSummary(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Refresh email analytics
export function useRefreshEmailAnalytics() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => emailApi.refreshAnalytics(),
    onSuccess: () => {
      // Invalidate all email analytics queries
      queryClient.invalidateQueries({ queryKey: queryKeys.email.analytics() });
      queryClient.invalidateQueries({ queryKey: queryKeys.email.stats() });
      queryClient.invalidateQueries({ queryKey: queryKeys.email.deliveryRates() });
      queryClient.invalidateQueries({ queryKey: queryKeys.email.openRates() });
      queryClient.invalidateQueries({ queryKey: queryKeys.email.clickRates() });
      queryClient.invalidateQueries({ queryKey: queryKeys.email.bounceRates() });
      queryClient.invalidateQueries({ queryKey: queryKeys.email.unsubscribeRates() });
    },
    onError: (error: EmailError) => {
      console.error('Refresh email analytics failed:', error);
    },
  });
}
