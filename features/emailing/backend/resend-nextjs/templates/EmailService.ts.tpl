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
import { sendEmail } from '@/adapters/email/resend/sender';
import { EmailPermissions, UserContext } from './permissions';

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
  useEmails: (userContext?: UserContext) => {
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
        // Check permissions
        if (userContext) {
          const permission = EmailPermissions.canSendEmail(userContext);
          if (!permission.allowed) {
            throw new Error(permission.reason || 'Insufficient permissions to send email');
          }
        }
        
        // Add user context to the email data
        const emailDataWithContext = {
          ...data,
          userId: userContext?.userId,
          organizationId: userContext?.organizationId,
          teamId: userContext?.teamId
        };
        
        return await emailApi.sendEmail(emailDataWithContext);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['emails'] });
      }
    });

    const sendBulk = () => useMutation({
      mutationFn: async (data: SendBulkEmailData) => {
        // Check permissions for bulk email
        if (userContext) {
          const permission = EmailPermissions.canSendBulkEmails(userContext);
          if (!permission.allowed) {
            throw new Error(permission.reason || 'Insufficient permissions to send bulk emails');
          }
        }
        
        // Add user context to the bulk email data
        const bulkEmailDataWithContext = {
          ...data,
          userId: userContext?.userId,
          organizationId: userContext?.organizationId,
          teamId: userContext?.teamId
        };
        
        return await emailApi.sendBulkEmail(bulkEmailDataWithContext);
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
  useTemplates: (userContext?: UserContext) => {
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
        // Check permissions
        if (userContext) {
          const permission = EmailPermissions.canManageTemplates(userContext);
          if (!permission.allowed) {
            throw new Error(permission.reason || 'Insufficient permissions to create templates');
          }
        }
        
        // Add user context to the template data
        const templateDataWithContext = {
          ...data,
          userId: userContext?.userId,
          organizationId: userContext?.organizationId
        };
        
        return await emailApi.createTemplate(templateDataWithContext);
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
  useCampaigns: (userContext?: UserContext) => {
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
  useAnalytics: (userContext?: UserContext) => {
    // Query operations
    const getEmailAnalytics = (filters?: AnalyticsFilters) => useQuery({
      queryKey: ['email-analytics', filters],
      queryFn: async () => {
        // Check permissions
        if (userContext) {
          const permission = EmailPermissions.canViewAnalytics(userContext);
          if (!permission.allowed) {
            throw new Error(permission.reason || 'Insufficient permissions to view analytics');
          }
        }
        
        // Add user context to filters
        const filtersWithContext = {
          ...filters,
          userId: userContext?.userId,
          organizationId: userContext?.organizationId
        };
        
        return await emailApi.getEmailAnalytics(filtersWithContext);
      },
      enabled: !userContext || EmailPermissions.canViewAnalytics(userContext).allowed
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

/**
 * Static EmailService methods for direct use by other services (like Auth)
 * These methods don't use TanStack Query and can be called directly
 */
export class EmailServiceStatic {
  /**
   * Send email directly (for use by Auth and other services)
   */
  static async send(data: {
    to: string;
    subject: string;
    template: string;
    context?: Record<string, any>;
  }): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const result = await sendEmail({
        to: data.to,
        subject: data.subject,
        template: data.template,
        data: data.context || {}
      });
      
      return {
        success: result.success,
        messageId: result.messageId,
        error: result.error
      };
    } catch (error) {
      console.error('EmailService.send error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send organization invitation email
   */
  static async sendOrganizationInvitation(data: {
    to: string;
    organizationName: string;
    inviterName: string;
    invitationUrl: string;
    role: string;
  }): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.send({
      to: data.to,
      subject: `You've been invited to join ${data.organizationName}`,
      template: 'organization-invitation',
      context: {
        organizationName: data.organizationName,
        inviterName: data.inviterName,
        invitationUrl: data.invitationUrl,
        role: data.role,
        projectName: process.env.APP_NAME || 'The Architech'
      }
    });
  }

  /**
   * Send magic link email
   */
  static async sendMagicLink(data: {
    to: string;
    magicLinkUrl: string;
    userName?: string;
  }): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.send({
      to: data.to,
      subject: 'Your magic link to sign in',
      template: 'magic-link',
      context: {
        magicLinkUrl: data.magicLinkUrl,
        userName: data.userName || 'User',
        projectName: process.env.APP_NAME || 'The Architech'
      }
    });
  }

  /**
   * Send two-factor setup email
   */
  static async sendTwoFactorSetup(data: {
    to: string;
    userName?: string;
    setupUrl?: string;
  }): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.send({
      to: data.to,
      subject: 'Two-factor authentication enabled',
      template: 'two-factor-setup',
      context: {
        userName: data.userName || 'User',
        projectName: process.env.APP_NAME || 'The Architech',
        setupUrl: data.setupUrl
      }
    });
  }
}
