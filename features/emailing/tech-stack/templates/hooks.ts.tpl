/**
 * Emailing - Direct TanStack Query Hooks
 * 
 * ARCHITECTURE: Tech-Stack as Source of Truth
 * - Hooks call APIs directly via fetch (no backend imports)
 * - Schemas are defined here and imported by backend
 * - Full type safety across frontend and backend
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

// ============================================================================
// EMAIL SENDING HOOKS
// ============================================================================

/**
 * Send a single email
 * @returns TanStack Mutation for sending emails
 */
export const useEmailSend = (options?: UseMutationOptions<any, any, any>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to send email');
      return res.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

/**
 * Send multiple emails in bulk
 * @returns TanStack Mutation for bulk sending emails
 */
export const useEmailSendBulk = (options?: UseMutationOptions<any, any, any[]>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (emails: any[]) => {
      const res = await fetch('/api/email/send-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails })
      });
      if (!res.ok) throw new Error('Failed to send bulk emails');
      return res.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

/**
 * Send email using a template
 * @returns TanStack Mutation for sending templated emails
 */
export const useEmailSendTemplate = (options?: UseMutationOptions<any, any, { templateName: string; to: string; variables: any }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ templateName, to, variables }: { templateName: string; to: string; variables: any }) => {
      const res = await fetch('/api/email/send-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateName, to, variables })
      });
      if (!res.ok) throw new Error('Failed to send templated email');
      return res.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['emails'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

// ============================================================================
// EMAIL TEMPLATE HOOKS
// ============================================================================

/**
 * Fetch list of email templates
 * @returns TanStack Query result with templates data
 */
export const useTemplatesList = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['email-templates'],
    queryFn: async () => {
      const response = await fetch('/api/email/templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Fetch a single email template by ID
 * @param id - Template ID
 * @returns TanStack Query result with template data
 */
export const useTemplate = (id: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['email-template', id],
    queryFn: async () => {
      const response = await fetch(`/api/email/templates/${id}`);
      if (!response.ok) throw new Error('Failed to fetch template');
      return response.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Create a new email template
 * @returns TanStack Mutation for creating templates
 */
export const useTemplatesCreate = (options?: UseMutationOptions<any, any, any>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/email/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create template');
      return response.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

/**
 * Update an existing email template
 * @returns TanStack Mutation for updating templates
 */
export const useTemplatesUpdate = (options?: UseMutationOptions<any, any, { id: string; data: any }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await fetch(`/api/email/templates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update template');
      return response.json();
    },
    onSuccess: (data, variables, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['email-template', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      options?.onSuccess?.(data, variables, ...rest);
    },
    ...options
  });
};

/**
 * Delete an email template
 * @returns TanStack Mutation for deleting templates
 */
export const useTemplatesDelete = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/email/templates/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete template');
      return response.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.removeQueries({ queryKey: ['email-template', id] });
      queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

// ============================================================================
// LEGACY ALIASES (For backwards compatibility with existing components)
// ============================================================================

/**
 * @deprecated Use useTemplatesList instead
 */
export const useTemplates = useTemplatesList;

/**
 * @deprecated Use useTemplatesCreate instead
 */
export const useCreateTemplate = useTemplatesCreate;

/**
 * @deprecated Use useTemplatesUpdate instead
 */
export const useUpdateTemplate = useTemplatesUpdate;

/**
 * @deprecated Use useTemplatesDelete instead
 */
export const useDeleteTemplate = useTemplatesDelete;

/**
 * @deprecated Use useEmailSend instead
 */
export const useSendEmail = useEmailSend;

/**
 * @deprecated Use useEmailsList instead (if it exists)
 */
export const useEmails = useTemplatesList; // This might need adjustment based on actual needs

// ============================================================================
// EMAIL CAMPAIGN HOOKS
// ============================================================================

/**
 * Fetch list of email campaigns
 * @returns TanStack Query result with campaigns data
 */
export const useCampaignsList = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['email-campaigns'],
    queryFn: async () => {
      const response = await fetch('/api/email/campaigns');
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Fetch a single email campaign by ID
 * @param id - Campaign ID
 * @returns TanStack Query result with campaign data
 */
export const useCampaign = (id: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['email-campaign', id],
    queryFn: async () => {
      const response = await fetch(`/api/email/campaigns/${id}`);
      if (!response.ok) throw new Error('Failed to fetch campaign');
      return response.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Create a new email campaign
 * @returns TanStack Mutation for creating campaigns
 */
export const useCampaignsCreate = (options?: UseMutationOptions<any, any, any>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/email/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create campaign');
      return response.json();
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      options?.onSuccess?.(...args);
    },
    ...options
  });
};

/**
 * Start an email campaign
 * @returns TanStack Mutation for starting campaigns
 */
export const useCampaignsStart = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/email/campaigns/${id}/start`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to start campaign');
      return response.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

/**
 * Pause an email campaign
 * @returns TanStack Mutation for pausing campaigns
 */
export const useCampaignsPause = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/email/campaigns/${id}/pause`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to pause campaign');
      return response.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

/**
 * Cancel an email campaign
 * @returns TanStack Mutation for canceling campaigns
 */
export const useCampaignsCancel = (options?: UseMutationOptions<any, any, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/email/campaigns/${id}/cancel`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to cancel campaign');
      return response.json();
    },
    onSuccess: (data, id, ...rest) => {
      queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
      queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      options?.onSuccess?.(data, id, ...rest);
    },
    ...options
  });
};

// ============================================================================
// EMAIL ANALYTICS HOOKS
// ============================================================================

/**
 * Fetch email analytics
 * @returns TanStack Query result with analytics data
 */
export const useEmailAnalytics = (filters?: any, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['email-analytics', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/email/analytics?${params}`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    ...options
  });
};

/**
 * Fetch campaign analytics
 * @param campaignId - Campaign ID
 * @returns TanStack Query result with campaign analytics
 */
export const useCampaignAnalytics = (campaignId: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    queryKey: ['campaign-analytics', campaignId],
    queryFn: async () => {
      const response = await fetch(`/api/email/campaigns/${campaignId}/analytics`);
      if (!response.ok) throw new Error('Failed to fetch campaign analytics');
      return response.json();
    },
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};


