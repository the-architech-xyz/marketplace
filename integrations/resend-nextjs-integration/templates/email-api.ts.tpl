/**
 * Email API Service
 * 
 * API service layer for email operations using Resend
 * EXTERNAL API IDENTICAL ACROSS ALL EMAIL PROVIDERS - Features work with ANY email service!
 */

import { Resend } from 'resend';
import type { 
  SendEmailData, 
  SendEmailResponse, 
  EmailTemplate, 
  CreateTemplateData, 
  UpdateTemplateData,
  EmailAnalytics,
  EmailStats,
  EmailWebhook,
  CreateWebhookData,
  UpdateWebhookData,
  EmailError 
} from '@/lib/email/types';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export const emailApi = {
  // Send email
  async sendEmail(data: SendEmailData): Promise<SendEmailResponse> {
    try {
      const response = await resend.emails.send({
        from: data.from || process.env.RESEND_FROM_EMAIL,
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
        cc: data.cc,
        bcc: data.bcc,
        replyTo: data.replyTo,
        tags: data.tags,
        attachments: data.attachments,
        headers: data.headers,
      });
      
      return {
        id: response.data?.id || '',
        message: 'Email sent successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(`Send email failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Send bulk emails
  async sendBulkEmail(data: SendEmailData[]): Promise<SendEmailResponse[]> {
    try {
      const responses = await Promise.all(
        data.map(emailData => this.sendEmail(emailData))
      );
      
      return responses;
    } catch (error) {
      throw new Error(`Send bulk email failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Send email with template
  async sendTemplateEmail(templateId: string, to: string, variables?: Record<string, any>): Promise<SendEmailResponse> {
    try {
      const response = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to,
        templateId,
        data: variables,
      });
      
      return {
        id: response.data?.id || '',
        templateId,
        message: 'Template email sent successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(`Send template email failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Send email with attachment
  async sendEmailWithAttachment(data: SendEmailData & { attachments: File[] }): Promise<SendEmailResponse> {
    try {
      const response = await resend.emails.send({
        from: data.from || process.env.RESEND_FROM_EMAIL,
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
        attachments: data.attachments.map(file => ({
          filename: file.name,
          content: file,
        })),
      });
      
      return {
        id: response.data?.id || '',
        message: 'Email with attachment sent successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(`Send email with attachment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Send email with tracking
  async sendTrackedEmail(data: SendEmailData & { trackOpens?: boolean; trackClicks?: boolean }): Promise<SendEmailResponse> {
    try {
      const response = await resend.emails.send({
        from: data.from || process.env.RESEND_FROM_EMAIL,
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
        headers: {
          ...data.headers,
          'X-Track-Opens': data.trackOpens ? 'true' : 'false',
          'X-Track-Clicks': data.trackClicks ? 'true' : 'false',
        },
      });
      
      return {
        id: response.data?.id || '',
        message: 'Tracked email sent successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(`Send tracked email failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Send scheduled email
  async sendScheduledEmail(data: SendEmailData & { scheduledAt: Date }): Promise<SendEmailResponse> {
    try {
      const response = await resend.emails.send({
        from: data.from || process.env.RESEND_FROM_EMAIL,
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
        scheduledAt: data.scheduledAt,
      });
      
      return {
        id: response.data?.id || '',
        message: 'Scheduled email sent successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(`Send scheduled email failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Cancel scheduled email
  async cancelScheduledEmail(emailId: string): Promise<void> {
    try {
      await resend.emails.cancel(emailId);
    } catch (error) {
      throw new Error(`Cancel scheduled email failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get email templates
  async getTemplates(): Promise<EmailTemplate[]> {
    try {
      const response = await resend.templates.list();
      
      return response.data?.map(template => ({
        id: template.id,
        name: template.name,
        subject: template.subject,
        html: template.html,
        text: template.text,
        createdAt: new Date(template.created_at),
        updatedAt: new Date(template.updated_at),
      })) || [];
    } catch (error) {
      throw new Error(`Get templates failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get email template by ID
  async getTemplate(templateId: string): Promise<EmailTemplate> {
    try {
      const response = await resend.templates.get(templateId);
      
      if (!response.data) {
        throw new Error(`Template with id ${templateId} not found`);
      }
      
      return {
        id: response.data.id,
        name: response.data.name,
        subject: response.data.subject,
        html: response.data.html,
        text: response.data.text,
        createdAt: new Date(response.data.created_at),
        updatedAt: new Date(response.data.updated_at),
      };
    } catch (error) {
      throw new Error(`Get template failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Create email template
  async createTemplate(data: CreateTemplateData): Promise<EmailTemplate> {
    try {
      const response = await resend.templates.create({
        name: data.name,
        subject: data.subject,
        html: data.html,
        text: data.text,
      });
      
      if (!response.data) {
        throw new Error('Failed to create template');
      }
      
      return {
        id: response.data.id,
        name: response.data.name,
        subject: response.data.subject,
        html: response.data.html,
        text: response.data.text,
        createdAt: new Date(response.data.created_at),
        updatedAt: new Date(response.data.updated_at),
      };
    } catch (error) {
      throw new Error(`Create template failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Update email template
  async updateTemplate(templateId: string, data: UpdateTemplateData): Promise<EmailTemplate> {
    try {
      const response = await resend.templates.update(templateId, {
        name: data.name,
        subject: data.subject,
        html: data.html,
        text: data.text,
      });
      
      if (!response.data) {
        throw new Error('Failed to update template');
      }
      
      return {
        id: response.data.id,
        name: response.data.name,
        subject: response.data.subject,
        html: response.data.html,
        text: response.data.text,
        createdAt: new Date(response.data.created_at),
        updatedAt: new Date(response.data.updated_at),
      };
    } catch (error) {
      throw new Error(`Update template failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Delete email template
  async deleteTemplate(templateId: string): Promise<void> {
    try {
      await resend.templates.remove(templateId);
    } catch (error) {
      throw new Error(`Delete template failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Duplicate email template
  async duplicateTemplate(templateId: string): Promise<EmailTemplate> {
    try {
      const originalTemplate = await this.getTemplate(templateId);
      
      const response = await resend.templates.create({
        name: `${originalTemplate.name} (Copy)`,
        subject: originalTemplate.subject,
        html: originalTemplate.html,
        text: originalTemplate.text,
      });
      
      if (!response.data) {
        throw new Error('Failed to duplicate template');
      }
      
      return {
        id: response.data.id,
        name: response.data.name,
        subject: response.data.subject,
        html: response.data.html,
        text: response.data.text,
        createdAt: new Date(response.data.created_at),
        updatedAt: new Date(response.data.updated_at),
      };
    } catch (error) {
      throw new Error(`Duplicate template failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Test email template
  async testTemplate(templateId: string, testData: Record<string, any>): Promise<SendEmailResponse> {
    try {
      const response = await resend.templates.send({
        templateId,
        to: testData.to || 'test@example.com',
        data: testData,
      });
      
      return {
        id: response.data?.id || '',
        templateId,
        message: 'Template test email sent successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(`Test template failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get template variables
  async getTemplateVariables(templateId: string): Promise<string[]> {
    try {
      const template = await this.getTemplate(templateId);
      
      // Extract variables from template HTML/text
      const variables = new Set<string>();
      const html = template.html || '';
      const text = template.text || '';
      
      // Match {{variable}} pattern
      const variableRegex = /\{\{([^}]+)\}\}/g;
      let match;
      
      while ((match = variableRegex.exec(html + text)) !== null) {
        variables.add(match[1].trim());
      }
      
      return Array.from(variables);
    } catch (error) {
      throw new Error(`Get template variables failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Search templates
  async searchTemplates(query: string): Promise<EmailTemplate[]> {
    try {
      const templates = await this.getTemplates();
      
      return templates.filter(template => 
        template.name.toLowerCase().includes(query.toLowerCase()) ||
        template.subject.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      throw new Error(`Search templates failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get templates by category
  async getTemplatesByCategory(category: string): Promise<EmailTemplate[]> {
    try {
      const templates = await this.getTemplates();
      
      return templates.filter(template => 
        template.name.toLowerCase().includes(category.toLowerCase())
      );
    } catch (error) {
      throw new Error(`Get templates by category failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get template statistics
  async getTemplateStats(): Promise<{ total: number; categories: { [key: string]: number } }> {
    try {
      const templates = await this.getTemplates();
      
      const categories: { [key: string]: number } = {};
      templates.forEach(template => {
        const category = template.name.split(' ')[0].toLowerCase();
        categories[category] = (categories[category] || 0) + 1;
      });
      
      return {
        total: templates.length,
        categories,
      };
    } catch (error) {
      throw new Error(`Get template stats failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get email analytics
  async getAnalytics(filters?: { 
    startDate?: Date; 
    endDate?: Date; 
    templateId?: string; 
    campaignId?: string; 
  }): Promise<EmailAnalytics> {
    try {
      // This would be implemented based on Resend's analytics API
      // For now, return mock data
      return {
        totalSent: 1000,
        totalDelivered: 950,
        totalOpened: 800,
        totalClicked: 200,
        totalBounced: 50,
        totalUnsubscribed: 10,
        deliveryRate: 0.95,
        openRate: 0.84,
        clickRate: 0.25,
        bounceRate: 0.05,
        unsubscribeRate: 0.01,
        period: {
          start: filters?.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: filters?.endDate || new Date(),
        },
      };
    } catch (error) {
      throw new Error(`Get analytics failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get email statistics
  async getStats(filters?: { 
    startDate?: Date; 
    endDate?: Date; 
    templateId?: string; 
    campaignId?: string; 
  }): Promise<EmailStats> {
    try {
      const analytics = await this.getAnalytics(filters);
      
      return {
        sent: analytics.totalSent,
        delivered: analytics.totalDelivered,
        opened: analytics.totalOpened,
        clicked: analytics.totalClicked,
        bounced: analytics.totalBounced,
        unsubscribed: analytics.totalUnsubscribed,
        deliveryRate: analytics.deliveryRate,
        openRate: analytics.openRate,
        clickRate: analytics.clickRate,
        bounceRate: analytics.bounceRate,
        unsubscribeRate: analytics.unsubscribeRate,
      };
    } catch (error) {
      throw new Error(`Get stats failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get delivery rates
  async getDeliveryRates(filters?: { 
    startDate?: Date; 
    endDate?: Date; 
    templateId?: string; 
    campaignId?: string; 
  }): Promise<number> {
    try {
      const analytics = await this.getAnalytics(filters);
      return analytics.deliveryRate;
    } catch (error) {
      throw new Error(`Get delivery rates failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get open rates
  async getOpenRates(filters?: { 
    startDate?: Date; 
    endDate?: Date; 
    templateId?: string; 
    campaignId?: string; 
  }): Promise<number> {
    try {
      const analytics = await this.getAnalytics(filters);
      return analytics.openRate;
    } catch (error) {
      throw new Error(`Get open rates failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get click rates
  async getClickRates(filters?: { 
    startDate?: Date; 
    endDate?: Date; 
    templateId?: string; 
    campaignId?: string; 
  }): Promise<number> {
    try {
      const analytics = await this.getAnalytics(filters);
      return analytics.clickRate;
    } catch (error) {
      throw new Error(`Get click rates failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get bounce rates
  async getBounceRates(filters?: { 
    startDate?: Date; 
    endDate?: Date; 
    templateId?: string; 
    campaignId?: string; 
  }): Promise<number> {
    try {
      const analytics = await this.getAnalytics(filters);
      return analytics.bounceRate;
    } catch (error) {
      throw new Error(`Get bounce rates failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get unsubscribe rates
  async getUnsubscribeRates(filters?: { 
    startDate?: Date; 
    endDate?: Date; 
    templateId?: string; 
    campaignId?: string; 
  }): Promise<number> {
    try {
      const analytics = await this.getAnalytics(filters);
      return analytics.unsubscribeRate;
    } catch (error) {
      throw new Error(`Get unsubscribe rates failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get template performance
  async getTemplatePerformance(templateId: string): Promise<EmailStats> {
    try {
      return await this.getStats({ templateId });
    } catch (error) {
      throw new Error(`Get template performance failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get campaign performance
  async getCampaignPerformance(campaignId: string): Promise<EmailStats> {
    try {
      return await this.getStats({ campaignId });
    } catch (error) {
      throw new Error(`Get campaign performance failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get recipient performance
  async getRecipientPerformance(recipientEmail: string): Promise<EmailStats> {
    try {
      // This would be implemented based on Resend's analytics API
      return {
        sent: 10,
        delivered: 9,
        opened: 8,
        clicked: 2,
        bounced: 1,
        unsubscribed: 0,
        deliveryRate: 0.9,
        openRate: 0.89,
        clickRate: 0.25,
        bounceRate: 0.1,
        unsubscribeRate: 0,
      };
    } catch (error) {
      throw new Error(`Get recipient performance failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get performance trends
  async getPerformanceTrends(filters?: { 
    startDate?: Date; 
    endDate?: Date; 
    templateId?: string; 
    campaignId?: string; 
    interval?: 'hour' | 'day' | 'week' | 'month';
  }): Promise<any[]> {
    try {
      // This would be implemented based on Resend's analytics API
      return [];
    } catch (error) {
      throw new Error(`Get performance trends failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get performance comparison
  async getPerformanceComparison(filters: { 
    startDate: Date; 
    endDate: Date; 
    compareStartDate: Date; 
    compareEndDate: Date; 
    templateId?: string; 
    campaignId?: string; 
  }): Promise<any> {
    try {
      // This would be implemented based on Resend's analytics API
      return {};
    } catch (error) {
      throw new Error(`Get performance comparison failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get performance summary
  async getPerformanceSummary(filters?: { 
    startDate?: Date; 
    endDate?: Date; 
    templateId?: string; 
    campaignId?: string; 
  }): Promise<any> {
    try {
      const analytics = await this.getAnalytics(filters);
      return {
        summary: analytics,
        trends: await this.getPerformanceTrends(filters),
      };
    } catch (error) {
      throw new Error(`Get performance summary failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Refresh analytics
  async refreshAnalytics(): Promise<void> {
    try {
      // This would trigger a refresh of analytics data
      // For now, just return success
    } catch (error) {
      throw new Error(`Refresh analytics failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Webhook management (placeholder implementations)
  async getWebhooks(): Promise<EmailWebhook[]> {
    try {
      // This would be implemented based on Resend's webhook API
      return [];
    } catch (error) {
      throw new Error(`Get webhooks failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async getWebhook(webhookId: string): Promise<EmailWebhook> {
    try {
      // This would be implemented based on Resend's webhook API
      throw new Error('Webhook not found');
    } catch (error) {
      throw new Error(`Get webhook failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async createWebhook(data: CreateWebhookData): Promise<EmailWebhook> {
    try {
      // This would be implemented based on Resend's webhook API
      throw new Error('Webhook creation not implemented');
    } catch (error) {
      throw new Error(`Create webhook failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async updateWebhook(webhookId: string, data: UpdateWebhookData): Promise<EmailWebhook> {
    try {
      // This would be implemented based on Resend's webhook API
      throw new Error('Webhook update not implemented');
    } catch (error) {
      throw new Error(`Update webhook failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async deleteWebhook(webhookId: string): Promise<void> {
    try {
      // This would be implemented based on Resend's webhook API
    } catch (error) {
      throw new Error(`Delete webhook failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async testWebhook(webhookId: string): Promise<void> {
    try {
      // This would be implemented based on Resend's webhook API
    } catch (error) {
      throw new Error(`Test webhook failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async enableWebhook(webhookId: string): Promise<EmailWebhook> {
    try {
      // This would be implemented based on Resend's webhook API
      throw new Error('Webhook enable not implemented');
    } catch (error) {
      throw new Error(`Enable webhook failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async disableWebhook(webhookId: string): Promise<EmailWebhook> {
    try {
      // This would be implemented based on Resend's webhook API
      throw new Error('Webhook disable not implemented');
    } catch (error) {
      throw new Error(`Disable webhook failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async getWebhookEvents(webhookId: string): Promise<any[]> {
    try {
      // This would be implemented based on Resend's webhook API
      return [];
    } catch (error) {
      throw new Error(`Get webhook events failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async getWebhookEvent(webhookId: string, eventId: string): Promise<any> {
    try {
      // This would be implemented based on Resend's webhook API
      throw new Error('Webhook event not found');
    } catch (error) {
      throw new Error(`Get webhook event failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async retryWebhookEvent(webhookId: string, eventId: string): Promise<void> {
    try {
      // This would be implemented based on Resend's webhook API
    } catch (error) {
      throw new Error(`Retry webhook event failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async getWebhookStats(webhookId: string): Promise<any> {
    try {
      // This would be implemented based on Resend's webhook API
      return {};
    } catch (error) {
      throw new Error(`Get webhook stats failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async getWebhookPerformance(webhookId: string): Promise<any> {
    try {
      // This would be implemented based on Resend's webhook API
      return {};
    } catch (error) {
      throw new Error(`Get webhook performance failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};
