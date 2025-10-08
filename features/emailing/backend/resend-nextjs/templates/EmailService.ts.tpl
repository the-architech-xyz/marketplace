/**
 * EmailService - Cohesive Business Hook Services Implementation
 * 
 * This service implements the IEmailService interface using Resend and TanStack Query.
 * It provides cohesive business services that group related functionality.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  IEmailService, 
  Email, EmailTemplate, EmailCampaign, EmailAnalytics,
  SendEmailData, SendBulkEmailData, CreateTemplateData, UpdateTemplateData,
  CreateCampaignData, UpdateCampaignData, EmailFilters, TemplateFilters, CampaignFilters, AnalyticsFilters
} from '@/features/emailing/contract';
import { emailApi } from '@/lib/email/api';

/**
 * EmailService - Main service implementation
 * 
 * This service provides all email-related operations through cohesive business services.
 * Each service method returns an object containing all related queries and mutations.
 */
export const EmailService: IEmailService = {
  /**
   * Email Management Service
   * Provides all email-related operations in a cohesive interface
   */
  useEmails: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (filters?: EmailFilters) => useQuery({
      queryKey: ['emails', filters],
      queryFn: async () => {
        return await emailApi.getEmails(filters);
      }
    });

    const get = (id: string) => useQuery({
      queryKey: ['email', id],
      queryFn: async () => {
        return await emailApi.getEmail(id);
      },
      enabled: !!id
    });

    // Mutation operations
    const send = () => useMutation({
      mutationFn: async (data: SendEmailData) => {
        return await emailApi.sendEmail(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['emails'] });
      }
    });

    const sendBulk = () => useMutation({
      mutationFn: async (data: SendBulkEmailData) => {
        return await emailApi.sendBulkEmail(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['emails'] });
      }
    });

    const delete = () => useMutation({
      mutationFn: async (id: string) => {
        return await emailApi.deleteEmail(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['emails'] });
        queryClient.removeQueries({ queryKey: ['email', id] });
      }
    });

    const resend = () => useMutation({
      mutationFn: async (id: string) => {
        return await emailApi.resendEmail(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['emails'] });
      }
    });

    return { list, get, send, sendBulk, delete, resend };
  },

  /**
   * Template Management Service
   * Provides all email template-related operations in a cohesive interface
   */
  useTemplates: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (filters?: TemplateFilters) => useQuery({
      queryKey: ['email-templates', filters],
      queryFn: async () => {
        return await emailApi.getTemplates(filters);
      }
    });

    const get = (id: string) => useQuery({
      queryKey: ['email-template', id],
      queryFn: async () => {
        return await emailApi.getTemplate(id);
      },
      enabled: !!id
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: CreateTemplateData) => {
        return await emailApi.createTemplate(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateTemplateData }) => {
        return await emailApi.updateTemplate(id, data);
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['email-templates'] });
        queryClient.invalidateQueries({ queryKey: ['email-template', id] });
      }
    });

    const delete = () => useMutation({
      mutationFn: async (id: string) => {
        return await emailApi.deleteTemplate(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['email-templates'] });
        queryClient.removeQueries({ queryKey: ['email-template', id] });
      }
    });

    const duplicate = () => useMutation({
      mutationFn: async (id: string) => {
        return await emailApi.duplicateTemplate(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['email-templates'] });
      }
    });

    return { list, get, create, update, delete, duplicate };
  },

  /**
   * Campaign Management Service
   * Provides all email campaign-related operations in a cohesive interface
   */
  useCampaigns: () => {
    const queryClient = useQueryClient();

    // Query operations
    const list = (filters?: CampaignFilters) => useQuery({
      queryKey: ['email-campaigns', filters],
      queryFn: async () => {
        return await emailApi.getCampaigns(filters);
      }
    });

    const get = (id: string) => useQuery({
      queryKey: ['email-campaign', id],
      queryFn: async () => {
        return await emailApi.getCampaign(id);
      },
      enabled: !!id
    });

    // Mutation operations
    const create = () => useMutation({
      mutationFn: async (data: CreateCampaignData) => {
        return await emailApi.createCampaign(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
      }
    });

    const update = () => useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateCampaignData }) => {
        return await emailApi.updateCampaign(id, data);
      },
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
        queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
      }
    });

    const delete = () => useMutation({
      mutationFn: async (id: string) => {
        return await emailApi.deleteCampaign(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
        queryClient.removeQueries({ queryKey: ['email-campaign', id] });
      }
    });

    const start = () => useMutation({
      mutationFn: async (id: string) => {
        return await emailApi.startCampaign(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
        queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
      }
    });

    const pause = () => useMutation({
      mutationFn: async (id: string) => {
        return await emailApi.pauseCampaign(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
        queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
      }
    });

    const cancel = () => useMutation({
      mutationFn: async (id: string) => {
        return await emailApi.cancelCampaign(id);
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ['email-campaigns'] });
        queryClient.invalidateQueries({ queryKey: ['email-campaign', id] });
      }
    });

    return { list, get, create, update, delete, start, pause, cancel };
  },

  /**
   * Analytics Service
   * Provides email analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    const getEmailAnalytics = (filters?: AnalyticsFilters) => useQuery({
      queryKey: ['email-analytics', filters],
      queryFn: async () => {
        return await emailApi.getEmailAnalytics(filters);
      }
    });

    const getTemplateAnalytics = (templateId: string) => useQuery({
      queryKey: ['email-template-analytics', templateId],
      queryFn: async () => {
        return await emailApi.getTemplateAnalytics(templateId);
      },
      enabled: !!templateId
    });

    const getCampaignAnalytics = (campaignId: string) => useQuery({
      queryKey: ['email-campaign-analytics', campaignId],
      queryFn: async () => {
        return await emailApi.getCampaignAnalytics(campaignId);
      },
      enabled: !!campaignId
    });

    return { getEmailAnalytics, getTemplateAnalytics, getCampaignAnalytics };
  }
};
