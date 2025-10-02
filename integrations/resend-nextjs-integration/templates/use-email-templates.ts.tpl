/**
 * Email Templates Hook
 * 
 * Standardized TanStack Query hook for managing email templates via Resend
 * EXTERNAL API IDENTICAL ACROSS ALL EMAIL PROVIDERS - Features work with ANY email service!
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { emailApi } from '@/lib/email/api';
import type { EmailTemplate, CreateTemplateData, UpdateTemplateData, EmailError } from '@/lib/email/types';

// Get all email templates
export function useEmailTemplates() {
  return useQuery({
    queryKey: queryKeys.email.templates(),
    queryFn: () => emailApi.getTemplates(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get email template by ID
export function useEmailTemplate(templateId: string) {
  return useQuery({
    queryKey: queryKeys.email.template(templateId),
    queryFn: () => emailApi.getTemplate(templateId),
    enabled: !!templateId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Create email template
export function useCreateEmailTemplate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTemplateData) => emailApi.createTemplate(data),
    onSuccess: (newTemplate: EmailTemplate) => {
      // Invalidate templates list
      queryClient.invalidateQueries({ queryKey: queryKeys.email.templates() });
      
      // Add the new template to cache
      queryClient.setQueryData(
        queryKeys.email.template(newTemplate.id),
        newTemplate
      );
    },
    onError: (error: EmailError) => {
      console.error('Create email template failed:', error);
    },
  });
}

// Update email template
export function useUpdateEmailTemplate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ templateId, data }: { templateId: string; data: UpdateTemplateData }) => 
      emailApi.updateTemplate(templateId, data),
    onSuccess: (updatedTemplate: EmailTemplate) => {
      // Update the template in cache
      queryClient.setQueryData(
        queryKeys.email.template(updatedTemplate.id),
        updatedTemplate
      );
      
      // Invalidate templates list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.email.templates() });
    },
    onError: (error: EmailError) => {
      console.error('Update email template failed:', error);
    },
  });
}

// Delete email template
export function useDeleteEmailTemplate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (templateId: string) => emailApi.deleteTemplate(templateId),
    onSuccess: (_, deletedTemplateId) => {
      // Remove the template from cache
      queryClient.removeQueries({ queryKey: queryKeys.email.template(deletedTemplateId) });
      
      // Invalidate templates list to refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.email.templates() });
    },
    onError: (error: EmailError) => {
      console.error('Delete email template failed:', error);
    },
  });
}

// Duplicate email template
export function useDuplicateEmailTemplate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (templateId: string) => emailApi.duplicateTemplate(templateId),
    onSuccess: (newTemplate: EmailTemplate) => {
      // Invalidate templates list
      queryClient.invalidateQueries({ queryKey: queryKeys.email.templates() });
      
      // Add the new template to cache
      queryClient.setQueryData(
        queryKeys.email.template(newTemplate.id),
        newTemplate
      );
    },
    onError: (error: EmailError) => {
      console.error('Duplicate email template failed:', error);
    },
  });
}

// Test email template
export function useTestEmailTemplate() {
  return useMutation({
    mutationFn: ({ templateId, testData }: { templateId: string; testData: Record<string, any> }) => 
      emailApi.testTemplate(templateId, testData),
    onError: (error: EmailError) => {
      console.error('Test email template failed:', error);
    },
  });
}

// Get template variables
export function useTemplateVariables(templateId: string) {
  return useQuery({
    queryKey: queryKeys.email.templateVariables(templateId),
    queryFn: () => emailApi.getTemplateVariables(templateId),
    enabled: !!templateId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Search templates
export function useSearchTemplates(query: string) {
  return useQuery({
    queryKey: queryKeys.email.templates({ search: query }),
    queryFn: () => emailApi.searchTemplates(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get templates by category
export function useTemplatesByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.email.templates({ category }),
    queryFn: () => emailApi.getTemplatesByCategory(category),
    enabled: !!category,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Get template statistics
export function useTemplateStats() {
  return useQuery({
    queryKey: queryKeys.email.templateStats(),
    queryFn: () => emailApi.getTemplateStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
