/**
 * EmailingService - Cohesive Business Services (Client-Side Abstraction)
 * 
 * This service wraps the pure backend email-api functions with TanStack Query hooks.
 * It implements the IEmailingService interface defined in contract.ts.
 * 
 * LAYER RESPONSIBILITY: Client-side abstraction (TanStack Query wrappers)
 * - Imports pure server functions from backend/resend-nextjs/email-api
 * - Wraps them with useQuery/useMutation
 * - Exports cohesive service object
 * - NO direct API calls (uses backend functions)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EmailService } from '@/features/emailing/backend/resend-nextjs/email-api';
import type { IEmailingService } from '@/features/emailing/contract';

/**
 * EmailingService - Cohesive Services Implementation
 * 
 * This service groups related emailing operations into cohesive interfaces.
 * Each method returns an object containing all related queries and mutations.
 */
export const EmailingService: IEmailingService = {
  /**
   * Email Management Service
   * Provides all email-sending operations in a cohesive interface
   */
  useEmails: () => {
    const queryClient = useQueryClient();

    // Mutation operations - email sending
    const send = () => useMutation({
      mutationFn: (data) => EmailService.sendEmail(data),  // ← Wraps backend function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['emails'] });
      }
    });

    const sendBulk = () => useMutation({
      mutationFn: async (emails: any[]) => {
        // Send multiple emails using backend function
        return Promise.all(emails.map(data => EmailService.sendEmail(data)));
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['emails'] });
      }
    });

    const sendTemplate = () => useMutation({
      mutationFn: ({ templateName, to, variables }) => 
        EmailService.sendTemplate(templateName, to, variables),  // ← Wraps backend function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['emails'] });
      }
    });

    return { send, sendBulk, sendTemplate };
  },

  /**
   * Template Management Service
   * Provides all template-related operations in a cohesive interface
   */
  useTemplates: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = () => useQuery({
      queryKey: ['email-templates'],
      queryFn: async () => {
        const response = await fetch('/api/email/templates');
        if (!response.ok) throw new Error('Failed to fetch templates');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    const get = (id: string) => useQuery({
      queryKey: ['email-template', id],
      queryFn: async () => {
        const response = await fetch(`/api/email/templates/${id}`);
        if (!response.ok) throw new Error('Failed to fetch template');
        return response.json();
      },
      enabled: !!id,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data) => {
        const response = await fetch('/api/email/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create template');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }) => {
        const response = await fetch(`/api/email/templates/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update template');
        return response.json();
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['email-template', id] });
        queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      }
    });

    const deleteTemplate = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/email/templates/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete template');
      },
      onSuccess: (_, id) => {
        queryClient.removeQueries({ queryKey: ['email-template', id] });
        queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      }
    });

    return { list, get, create, update, delete: deleteTemplate };
  },

  /**
   * Campaign Management Service
   * Provides all campaign-related operations in a cohesive interface
   */
  useCampaigns: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = () => useQuery({
      queryKey: ['email-campaigns'],
      queryFn: async () => {
        const response = await fetch('/api/email/campaigns');
        if (!response.ok) throw new Error('Failed to fetch campaigns');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    const get = (id: string) => useQuery({
      queryKey: ['email-campaign', id],
      queryFn: async () => {
        const response = await fetch(`/api/email/campaigns/${id}`);
        if (!response.ok) throw new Error('Failed to fetch campaign');
        return response.json();
      },
      enabled: !!id,
      staleTime: 5 * 60 * 1000
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data) => {
        const response = await fetch('/api/email/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create campaign');
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      }
    });

    const start = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/email/campaigns/${id}/start`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to start campaign');
        return response.json();
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
        queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      }
    });

    const pause = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/email/campaigns/${id}/pause`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to pause campaign');
        return response.json();
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
      }
    });

    const cancel = () => useMutation({
      mutationFn: async (id: string) => {
        const response = await fetch(`/api/email/campaigns/${id}/cancel`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to cancel campaign');
        return response.json();
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
        queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      }
    });

    return { list, get, create, start, pause, cancel };
  },

  /**
   * Analytics Service
   * Provides email analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    const getEmailAnalytics = () => useQuery({
      queryKey: ['email-analytics'],
      queryFn: async () => {
        const response = await fetch('/api/email/analytics');
        if (!response.ok) throw new Error('Failed to fetch email analytics');
        return response.json();
      },
      staleTime: 5 * 60 * 1000
    });

    const getTemplateAnalytics = (templateId: string) => useQuery({
      queryKey: ['email-template-analytics', templateId],
      queryFn: async () => {
        const response = await fetch(`/api/email/templates/${templateId}/analytics`);
        if (!response.ok) throw new Error('Failed to fetch template analytics');
        return response.json();
      },
      enabled: !!templateId,
      staleTime: 5 * 60 * 1000
    });

    const getCampaignAnalytics = (campaignId: string) => useQuery({
      queryKey: ['email-campaign-analytics', campaignId],
      queryFn: async () => {
        const response = await fetch(`/api/email/campaigns/${campaignId}/analytics`);
        if (!response.ok) throw new Error('Failed to fetch campaign analytics');
        return response.json();
      },
      enabled: !!campaignId,
      staleTime: 5 * 60 * 1000
    });

    return { getEmailAnalytics, getTemplateAnalytics, getCampaignAnalytics };
  }
};

/**
 * ARCHITECTURE NOTES:
 * 
 * 1. This service lives in the TECH-STACK layer (client-side abstraction)
 * 2. It imports pure server functions from backend/resend-nextjs/email-api
 * 3. It wraps them with TanStack Query for client-side data management
 * 4. It exports the IEmailingService interface as a cohesive service object
 * 5. Frontend components import THIS service, not the backend functions
 * 
 * LAYER FLOW:
 * Frontend → EmailingService (tech-stack) → EmailService/API routes (backend) → Resend
 */

