/**
 * emailing Contract Types
 * 
 * Auto-generated from contract.ts
 */
export type EmailStatus = 
  | 'draft' 
  | 'sending' 
  | 'sent' 
  | 'delivered' 
  | 'failed';
export type EmailPriority = 
  | 'low' 
  | 'normal' 
  | 'high' 
  | 'urgent';
export type EmailType = 
  | 'transactional' 
  | 'marketing' 
  | 'notification' 
  | 'newsletter' 
  | 'welcome' 
  | 'reminder';
export type TemplateType = 
  | 'html' 
  | 'text';
export interface Email {
  id: string;
  subject: string;
  content: EmailContent;
  recipients: EmailRecipient[];
  status: EmailStatus;
  priority: EmailPriority;
  type: EmailType;
  templateId?: string;
  campaignId?: string;
  scheduledAt?: string;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  bouncedAt?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
export interface EmailRecipient {
  email: string;
  name?: string;
  type: 'to' | 'cc' | 'bcc';
  status: EmailStatus;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  bouncedAt?: string;
  errorMessage?: string;
}
export interface EmailContent {
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
  inlineImages?: Array<{
    cid: string;
    url: string;
  }>;
}
export interface EmailAttachment {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  createdAt: string;
}
export interface EmailTemplate {
  id: string;
  name: string;
  description?: string;
  type: TemplateType;
  subject: string;
  content: {
    html?: string;
    text?: string;
    variables: string[];
  };
  category: string;
  tags: string[];
  isPublic: boolean;
  usageCount: number;
  lastUsedAt?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
export interface EmailCampaign {
  id: string;
  name: string;
  description?: string;
  templateId: string;
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled';
  recipients: EmailRecipient[];
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  analytics: EmailAnalytics;
  settings: {
    trackOpens: boolean;
    trackClicks: boolean;
    trackUnsubscribes: boolean;
    maxRecipients: number;
  };
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
export interface EmailAnalytics {
  emailsSent: number;
  emailsDelivered: number;
  emailsOpened: number;
  emailsClicked: number;
  emailsBounced: number;
  emailsFailed: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeCount: number;
  topLinks: Array<{
    url: string;
    clicks: number;
  }>;
  topRecipients: Array<{
    email: string;
    opens: number;
    clicks: number;
  }>;
}
export interface SendEmailData {
  subject: string;
  content: EmailContent;
  recipients: Omit<EmailRecipient, 'status' | 'deliveredAt' | 'openedAt' | 'clickedAt' | 'bouncedAt' | 'errorMessage'>[];
  priority?: EmailPriority;
  type?: EmailType;
  templateId?: string;
  scheduledAt?: string;
  metadata?: Record<string, any>;
}
export interface SendBulkEmailData {
  subject: string;
  content: EmailContent;
  recipients: Omit<EmailRecipient, 'status' | 'deliveredAt' | 'openedAt' | 'clickedAt' | 'bouncedAt' | 'errorMessage'>[];
  priority?: EmailPriority;
  type?: EmailType;
  templateId?: string;
  scheduledAt?: string;
  batchSize?: number;
  delayBetweenBatches?: number;
  metadata?: Record<string, any>;
}
export interface CreateTemplateData {
  name: string;
  description?: string;
  type: TemplateType;
  subject: string;
  content: {
    html?: string;
    text?: string;
    variables: string[];
  };
  category: string;
  tags: string[];
  isPublic?: boolean;
  metadata?: Record<string, any>;
}
export interface UpdateTemplateData {
  name?: string;
  description?: string;
  subject?: string;
  content?: {
    html?: string;
    text?: string;
    variables?: string[];
  };
  category?: string;
  tags?: string[];
  isPublic?: boolean;
  metadata?: Record<string, any>;
}
export interface CreateCampaignData {
  name: string;
  description?: string;
  templateId: string;
  recipients: Omit<EmailRecipient, 'status' | 'deliveredAt' | 'openedAt' | 'clickedAt' | 'bouncedAt' | 'errorMessage'>[];
  scheduledAt?: string;
  settings?: {
    trackOpens?: boolean;
    trackClicks?: boolean;
    trackUnsubscribes?: boolean;
    maxRecipients?: number;
  };
  metadata?: Record<string, any>;
}
export interface UpdateCampaignData {
  name?: string;
  description?: string;
  templateId?: string;
  recipients?: Omit<EmailRecipient, 'status' | 'deliveredAt' | 'openedAt' | 'clickedAt' | 'bouncedAt' | 'errorMessage'>[];
  scheduledAt?: string;
  settings?: {
    trackOpens?: boolean;
    trackClicks?: boolean;
    trackUnsubscribes?: boolean;
    maxRecipients?: number;
  };
  metadata?: Record<string, any>;
}
export interface SendEmailResult {
  email: Email;
  success: boolean;
  message?: string;
}
export interface SendBulkEmailResult {
  emails: Email[];
  success: boolean;
  message?: string;
  totalSent: number;
  totalFailed: number;
}
export interface TemplateResult {
  template: EmailTemplate;
  success: boolean;
  message?: string;
}
export interface CampaignResult {
  campaign: EmailCampaign;
  success: boolean;
  message?: string;
}
export interface EmailFilters {
  status?: EmailStatus[];
  type?: EmailType[];
  priority?: EmailPriority[];
  templateId?: string;
  campaignId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}
export interface TemplateFilters {
  type?: TemplateType[];
  category?: string[];
  tags?: string[];
  isPublic?: boolean;
  search?: string;
}
export interface CampaignFilters {
  status?: ('draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled')[];
  templateId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}
export interface AnalyticsFilters {
  dateFrom?: string;
  dateTo?: string;
  type?: EmailType[];
  templateId?: string;
  campaignId?: string;
}
export interface EmailingError {
  code: string;
  message: string;
  type: 'validation_error' | 'template_error' | 'delivery_error' | 'quota_error';
  field?: string;
  details?: Record<string, any>;
}
export interface EmailingConfig {
  provider: {
    name: string;
    apiKey: string;
    fromEmail: string;
    fromName: string;
  };
  features: {
    templates: boolean;
    campaigns: boolean;
    analytics: boolean;
    scheduling: boolean;
    attachments: boolean;
  };
  limits: {
    maxRecipientsPerEmail: number;
    maxAttachmentsPerEmail: number;
    maxAttachmentSize: number;
    dailyEmailLimit: number;
    monthlyEmailLimit: number;
  };
  security: {
    requireEmailVerification: boolean;
    allowUnsubscribe: boolean;
    trackUserActivity: boolean;
  };
}
export interface IEmailService {
  useEmails: () => {
    list: any; // UseQueryResult<Email[], Error>
    get: (id: string) => any; // UseQueryResult<Email, Error>
    send: any; // UseMutationResult<SendEmailResult, Error, SendEmailData>
    sendBulk: any; // UseMutationResult<SendBulkEmailResult, Error, SendBulkEmailData>
    delete: any; // UseMutationResult<void, Error, string>
    bulkDelete: any; // UseMutationResult<void, Error, string[]>
    resend: any; // UseMutationResult<SendEmailResult, Error, string>
  };
  useTemplates: () => {
    list: any; // UseQueryResult<EmailTemplate[], Error>
    get: (id: string) => any; // UseQueryResult<EmailTemplate, Error>
    create: any; // UseMutationResult<TemplateResult, Error, CreateTemplateData>
    update: any; // UseMutationResult<TemplateResult, Error, { id: string; data: UpdateTemplateData }>
    delete: any; // UseMutationResult<void, Error, string>
    duplicate: any; // UseMutationResult<TemplateResult, Error, string>
  };
  useCampaigns: () => {
    list: any; // UseQueryResult<EmailCampaign[], Error>
    get: (id: string) => any; // UseQueryResult<EmailCampaign, Error>
    create: any; // UseMutationResult<CampaignResult, Error, CreateCampaignData>
    update: any; // UseMutationResult<CampaignResult, Error, { id: string; data: UpdateCampaignData }>
    delete: any; // UseMutationResult<void, Error, string>
    start: any; // UseMutationResult<CampaignResult, Error, string>
    pause: any; // UseMutationResult<CampaignResult, Error, string>
    cancel: any; // UseMutationResult<CampaignResult, Error, string>
  };
  useAnalytics: () => {
    getEmailAnalytics: (filters?: AnalyticsFilters) => any; // UseQueryResult<EmailAnalytics, Error>
    getTemplateAnalytics: (templateId: string) => any; // UseQueryResult<EmailAnalytics, Error>
    getCampaignAnalytics: (campaignId: string) => any; // UseQueryResult<EmailAnalytics, Error>
  };
}