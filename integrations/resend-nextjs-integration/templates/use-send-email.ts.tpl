/**
 * Send Email Hook
 * 
 * Standardized TanStack Query hook for sending emails via Resend
 * EXTERNAL API IDENTICAL ACROSS ALL EMAIL PROVIDERS - Features work with ANY email service!
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { emailApi } from '@/lib/email/api';
import type { SendEmailData, SendEmailResponse, EmailError } from '@/lib/email/types';

// Send email
export function useSendEmail() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SendEmailData) => emailApi.sendEmail(data),
    onSuccess: (response: SendEmailResponse) => {
      // Invalidate email analytics to refresh stats
      queryClient.invalidateQueries({ queryKey: queryKeys.email.analytics() });
      
      // Invalidate email templates if this was a template-based email
      if (response.templateId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.email.templates() });
      }
    },
    onError: (error: EmailError) => {
      console.error('Send email failed:', error);
    },
  });
}

// Send bulk emails
export function useSendBulkEmail() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SendEmailData[]) => emailApi.sendBulkEmail(data),
    onSuccess: (response: SendEmailResponse[]) => {
      // Invalidate email analytics to refresh stats
      queryClient.invalidateQueries({ queryKey: queryKeys.email.analytics() });
      
      // Invalidate email templates if any were template-based
      const hasTemplateEmails = response.some(r => r.templateId);
      if (hasTemplateEmails) {
        queryClient.invalidateQueries({ queryKey: queryKeys.email.templates() });
      }
    },
    onError: (error: EmailError) => {
      console.error('Send bulk email failed:', error);
    },
  });
}

// Send email with template
export function useSendTemplateEmail() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { templateId: string; to: string; variables?: Record<string, any> }) => 
      emailApi.sendTemplateEmail(data.templateId, data.to, data.variables),
    onSuccess: (response: SendEmailResponse) => {
      // Invalidate email analytics to refresh stats
      queryClient.invalidateQueries({ queryKey: queryKeys.email.analytics() });
      
      // Invalidate email templates
      queryClient.invalidateQueries({ queryKey: queryKeys.email.templates() });
    },
    onError: (error: EmailError) => {
      console.error('Send template email failed:', error);
    },
  });
}

// Send email with attachment
export function useSendEmailWithAttachment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SendEmailData & { attachments: File[] }) => 
      emailApi.sendEmailWithAttachment(data),
    onSuccess: (response: SendEmailResponse) => {
      // Invalidate email analytics to refresh stats
      queryClient.invalidateQueries({ queryKey: queryKeys.email.analytics() });
    },
    onError: (error: EmailError) => {
      console.error('Send email with attachment failed:', error);
    },
  });
}

// Send email with tracking
export function useSendTrackedEmail() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SendEmailData & { trackOpens?: boolean; trackClicks?: boolean }) => 
      emailApi.sendTrackedEmail(data),
    onSuccess: (response: SendEmailResponse) => {
      // Invalidate email analytics to refresh stats
      queryClient.invalidateQueries({ queryKey: queryKeys.email.analytics() });
    },
    onError: (error: EmailError) => {
      console.error('Send tracked email failed:', error);
    },
  });
}

// Send email with scheduling
export function useSendScheduledEmail() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SendEmailData & { scheduledAt: Date }) => 
      emailApi.sendScheduledEmail(data),
    onSuccess: (response: SendEmailResponse) => {
      // Invalidate email analytics to refresh stats
      queryClient.invalidateQueries({ queryKey: queryKeys.email.analytics() });
    },
    onError: (error: EmailError) => {
      console.error('Send scheduled email failed:', error);
    },
  });
}

// Cancel scheduled email
export function useCancelScheduledEmail() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (emailId: string) => emailApi.cancelScheduledEmail(emailId),
    onSuccess: () => {
      // Invalidate email analytics to refresh stats
      queryClient.invalidateQueries({ queryKey: queryKeys.email.analytics() });
    },
    onError: (error: EmailError) => {
      console.error('Cancel scheduled email failed:', error);
    },
  });
}
