/**
 * Email Webhooks Hook
 * 
 * Standardized TanStack Query hook for managing email webhooks via Resend
 * EXTERNAL API IDENTICAL ACROSS ALL EMAIL PROVIDERS - Features work with ANY email service!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { emailApi } from '@/lib/email/api';
import type { EmailWebhook, CreateWebhookData, UpdateWebhookData, EmailError } from '@/lib/email/types';

// Get all email webhooks
export function useEmailWebhooks() {
  return useQuery({
    queryKey: queryKeys.email.webhooks(),
    queryFn: () => emailApi.getWebhooks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email webhook by ID
export function useEmailWebhook(webhookId: string) {
  return useQuery({
    queryKey: queryKeys.email.webhook(webhookId),
    queryFn: () => emailApi.getWebhook(webhookId),
    enabled: !!webhookId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Create email webhook
export function useCreateEmailWebhook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateWebhookData) => emailApi.createWebhook(data),
    onSuccess: (newWebhook: EmailWebhook) => {
      // Invalidate webhooks list
      queryClient.invalidateQueries({ queryKey: queryKeys.email.webhooks() });
      
      // Add the new webhook to cache
      queryClient.setQueryData(
        queryKeys.email.webhook(newWebhook.id),
        newWebhook
      );
    },
    onError: (error: EmailError) => {
      console.error('Create email webhook failed:', error);
    },
  });
}

// Update email webhook
export function useUpdateEmailWebhook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ webhookId, data }: { webhookId: string; data: UpdateWebhookData }) => 
      emailApi.updateWebhook(webhookId, data),
    onSuccess: (updatedWebhook: EmailWebhook) => {
      // Update the webhook in cache
      queryClient.setQueryData(
        queryKeys.email.webhook(updatedWebhook.id),
        updatedWebhook
      );
      
      // Invalidate webhooks list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.email.webhooks() });
    },
    onError: (error: EmailError) => {
      console.error('Update email webhook failed:', error);
    },
  });
}

// Delete email webhook
export function useDeleteEmailWebhook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (webhookId: string) => emailApi.deleteWebhook(webhookId),
    onSuccess: (_, deletedWebhookId) => {
      // Remove the webhook from cache
      queryClient.removeQueries({ queryKey: queryKeys.email.webhook(deletedWebhookId) });
      
      // Invalidate webhooks list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.email.webhooks() });
    },
    onError: (error: EmailError) => {
      console.error('Delete email webhook failed:', error);
    },
  });
}

// Test email webhook
export function useTestEmailWebhook() {
  return useMutation({
    mutationFn: (webhookId: string) => emailApi.testWebhook(webhookId),
    onError: (error: EmailError) => {
      console.error('Test email webhook failed:', error);
    },
  });
}

// Enable email webhook
export function useEnableEmailWebhook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (webhookId: string) => emailApi.enableWebhook(webhookId),
    onSuccess: (updatedWebhook: EmailWebhook) => {
      // Update the webhook in cache
      queryClient.setQueryData(
        queryKeys.email.webhook(updatedWebhook.id),
        updatedWebhook
      );
      
      // Invalidate webhooks list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.email.webhooks() });
    },
    onError: (error: EmailError) => {
      console.error('Enable email webhook failed:', error);
    },
  });
}

// Disable email webhook
export function useDisableEmailWebhook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (webhookId: string) => emailApi.disableWebhook(webhookId),
    onSuccess: (updatedWebhook: EmailWebhook) => {
      // Update the webhook in cache
      queryClient.setQueryData(
        queryKeys.email.webhook(updatedWebhook.id),
        updatedWebhook
      );
      
      // Invalidate webhooks list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.email.webhooks() });
    },
    onError: (error: EmailError) => {
      console.error('Disable email webhook failed:', error);
    },
  });
}

// Get webhook events
export function useWebhookEvents(webhookId: string) {
  return useQuery({
    queryKey: queryKeys.email.webhookEvents(webhookId),
    queryFn: () => emailApi.getWebhookEvents(webhookId),
    enabled: !!webhookId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

// Get webhook event by ID
export function useWebhookEvent(webhookId: string, eventId: string) {
  return useQuery({
    queryKey: queryKeys.email.webhookEvent(webhookId, eventId),
    queryFn: () => emailApi.getWebhookEvent(webhookId, eventId),
    enabled: !!webhookId && !!eventId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Retry webhook event
export function useRetryWebhookEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ webhookId, eventId }: { webhookId: string; eventId: string }) => 
      emailApi.retryWebhookEvent(webhookId, eventId),
    onSuccess: (_, { webhookId }) => {
      // Invalidate webhook events to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.email.webhookEvents(webhookId) });
    },
    onError: (error: EmailError) => {
      console.error('Retry webhook event failed:', error);
    },
  });
}

// Get webhook statistics
export function useWebhookStats(webhookId: string) {
  return useQuery({
    queryKey: queryKeys.email.webhookStats(webhookId),
    queryFn: () => emailApi.getWebhookStats(webhookId),
    enabled: !!webhookId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get webhook performance
export function useWebhookPerformance(webhookId: string) {
  return useQuery({
    queryKey: queryKeys.email.webhookPerformance(webhookId),
    queryFn: () => emailApi.getWebhookPerformance(webhookId),
    enabled: !!webhookId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
