/**
 * Emailing Feature Types
 * 
 * ARCHITECTURE: Types defined in tech-stack, shared by all layers
 */

// ============================================================================
// USER CONTEXT TYPES (for permissions)
// ============================================================================

export interface UserContext {
  userId: string;
  organizationId?: string;
  role?: 'owner' | 'admin' | 'member';
  teamId?: string;
  teamRole?: 'owner' | 'admin' | 'member';
}

// ============================================================================
// EMAIL CORE TYPES
// ============================================================================

export type EmailStatus = 'draft' | 'queued' | 'sending' | 'sent' | 'delivered' | 'failed' | 'bounced';
export type EmailPriority = 'low' | 'normal' | 'high' | 'urgent';
export type EmailType = 'transactional' | 'marketing' | 'notification' | 'newsletter' | 'welcome' | 'reminder';
export type TemplateType = 'html' | 'text';

export interface EmailRecipient {
  email: string;
  name?: string;
  type: 'to' | 'cc' | 'bcc';
}

export interface EmailAttachment {
  filename: string;
  content: string;
  contentType: string;
  size: number;
}

export interface EmailContent {
  html?: string;
  text?: string;
  variables?: Record<string, any>;
}

export interface Email {
  id: string;
  subject: string;
  content: EmailContent;
  recipients: EmailRecipient[];
  sender?: {
    email: string;
    name?: string;
  };
  status: EmailStatus;
  priority: EmailPriority;
  type: EmailType;
  templateId?: string;
  attachments?: EmailAttachment[];
  scheduledAt?: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  error?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// EMAIL TEMPLATE TYPES
// ============================================================================

export interface TemplateVariable {
  name: string;
  type: string;
  description?: string;
  required?: boolean;
  defaultValue?: any;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description?: string;
  type: TemplateType;
  subject: string;
  content: EmailContent & {
    variables?: TemplateVariable[];
  };
  category?: string;
  tags?: string[];
  isPublic: boolean;
  userId?: string;
  organizationId?: string;
  usageCount?: number;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// EMAIL CAMPAIGN TYPES
// ============================================================================

export type CampaignStatus = 'draft' | 'scheduled' | 'running' | 'paused' | 'completed' | 'cancelled';

export interface EmailCampaign {
  id: string;
  name: string;
  description?: string;
  templateId: string;
  recipients: EmailRecipient[];
  status: CampaignStatus;
  scheduledAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  settings?: {
    trackOpens?: boolean;
    trackClicks?: boolean;
    trackUnsubscribes?: boolean;
    maxRecipients?: number;
  };
  stats?: {
    totalRecipients: number;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
  userId?: string;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// EMAIL ANALYTICS TYPES
// ============================================================================

export interface EmailAnalytics {
  period: {
    startDate: Date;
    endDate: Date;
  };
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  totalFailed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  byType?: Record<EmailType, number>;
  byStatus?: Record<EmailStatus, number>;
  byDay?: Array<{ date: string; count: number }>;
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface SendEmailData {
  subject: string;
  content: EmailContent;
  recipients: EmailRecipient[];
  sender?: {
    email: string;
    name?: string;
  };
  priority?: EmailPriority;
  type?: EmailType;
  templateId?: string;
  attachments?: EmailAttachment[];
  scheduledAt?: Date;
  metadata?: Record<string, any>;
}

export interface SendBulkEmailData {
  emails: SendEmailData[];
}

export interface CreateTemplateData {
  name: string;
  description?: string;
  type: TemplateType;
  subject: string;
  content: EmailContent & {
    variables?: TemplateVariable[];
  };
  category?: string;
  tags?: string[];
  isPublic?: boolean;
}

export interface UpdateTemplateData extends Partial<CreateTemplateData> {
  id: string;
}

export interface CreateCampaignData {
  name: string;
  description?: string;
  templateId: string;
  recipients: EmailRecipient[];
  scheduledAt?: Date;
  settings?: {
    trackOpens?: boolean;
    trackClicks?: boolean;
    trackUnsubscribes?: boolean;
    maxRecipients?: number;
  };
}

export interface UpdateCampaignData extends Partial<CreateCampaignData> {
  id: string;
  status?: CampaignStatus;
}

// ============================================================================
// RESULT TYPES
// ============================================================================

export interface SendEmailResult {
  success: boolean;
  emailId?: string;
  error?: string;
  status?: EmailStatus;
}

export interface SendBulkEmailResult {
  success: boolean;
  results: SendEmailResult[];
  totalSent: number;
  totalFailed: number;
}

export interface TemplateResult {
  success: boolean;
  template?: EmailTemplate;
  error?: string;
}

export interface CampaignResult {
  success: boolean;
  campaign?: EmailCampaign;
  error?: string;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface EmailFilters {
  status?: EmailStatus;
  type?: EmailType;
  priority?: EmailPriority;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface TemplateFilters {
  type?: TemplateType;
  category?: string;
  tags?: string[];
  search?: string;
  isPublic?: boolean;
  limit?: number;
  offset?: number;
}

export interface CampaignFilters {
  status?: CampaignStatus;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface AnalyticsFilters {
  startDate?: Date;
  endDate?: Date;
  type?: EmailType;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface EmailingError {
  code: string;
  message: string;
  details?: any;
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export interface EmailingConfig {
  provider: EmailProvider;
  apiKey?: string;
  region?: string;
  fromEmail: string;
  fromName?: string;
  replyToEmail?: string;
  maxAttachmentSize?: number;
  allowedAttachmentTypes?: string[];
}

export type EmailProvider = 'resend' | 'sendgrid' | 'ses' | 'postmark' | 'mailgun';
export type EmailDeliveryStatus = 'pending' | 'sent' | 'delivered' | 'bounced' | 'failed';
export type TemplateCategory = 'welcome' | 'notification' | 'marketing' | 'transactional' | 'newsletter' | 'reminder' | 'promotional' | 'system' | 'custom';

// ============================================================================
// SERVICE INTERFACE (for type checking)
// ============================================================================

export interface IEmailService {
  // Email operations
  sendEmail(data: SendEmailData): Promise<SendEmailResult>;
  sendBulkEmails(data: SendBulkEmailData): Promise<SendBulkEmailResult>;
  sendTemplate(templateId: string, recipients: EmailRecipient[], variables?: Record<string, any>): Promise<SendEmailResult>;
  
  // Template operations
  getTemplates(filters?: TemplateFilters): Promise<EmailTemplate[]>;
  getTemplate(id: string): Promise<EmailTemplate | null>;
  createTemplate(data: CreateTemplateData): Promise<TemplateResult>;
  updateTemplate(data: UpdateTemplateData): Promise<TemplateResult>;
  deleteTemplate(id: string): Promise<boolean>;
  
  // Campaign operations
  getCampaigns(filters?: CampaignFilters): Promise<EmailCampaign[]>;
  getCampaign(id: string): Promise<EmailCampaign | null>;
  createCampaign(data: CreateCampaignData): Promise<CampaignResult>;
  updateCampaign(data: UpdateCampaignData): Promise<CampaignResult>;
  deleteCampaign(id: string): Promise<boolean>;
  startCampaign(id: string): Promise<boolean>;
  pauseCampaign(id: string): Promise<boolean>;
  cancelCampaign(id: string): Promise<boolean>;
  
  // Analytics operations
  getAnalytics(filters?: AnalyticsFilters): Promise<EmailAnalytics>;
  getEmailAnalytics(id: string): Promise<EmailAnalytics>;
  getCampaignAnalytics(id: string): Promise<EmailAnalytics>;
}

// ============================================================================
// FORM DATA TYPES
// ============================================================================

export interface EmailFormData {
  subject: string;
  content: EmailContent;
  recipients: EmailRecipient[];
  priority: EmailPriority;
  type: EmailType;
  templateId?: string;
  scheduledAt?: Date;
}

export interface TemplateFormData {
  name: string;
  description?: string;
  type: TemplateType;
  subject: string;
  content: EmailContent & {
    variables?: TemplateVariable[];
  };
  category?: string;
  tags?: string[];
  isPublic: boolean;
}

export interface CampaignFormData {
  name: string;
  description?: string;
  templateId: string;
  recipients: EmailRecipient[];
  scheduledAt?: Date;
  settings?: {
    trackOpens?: boolean;
    trackClicks?: boolean;
    trackUnsubscribes?: boolean;
    maxRecipients?: number;
  };
}

// ============================================================================
// LIST ITEM TYPES (for UI rendering)
// ============================================================================

export interface EmailListItem {
  id: string;
  subject: string;
  recipients: string[];
  status: EmailStatus;
  type: EmailType;
  sentAt?: Date;
  createdAt: Date;
}

export interface TemplateListItem {
  id: string;
  name: string;
  type: TemplateType;
  category?: string;
  usageCount?: number;
  lastUsedAt?: Date;
  createdAt: Date;
}

export interface CampaignListItem {
  id: string;
  name: string;
  status: CampaignStatus;
  totalRecipients: number;
  sentCount?: number;
  deliveredCount?: number;
  scheduledAt?: Date;
  createdAt: Date;
}

// ============================================================================
// STATS TYPES (for UI rendering)
// ============================================================================

export interface EmailStats {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  deliveryRate: number;
}

export interface TemplateStats {
  totalTemplates: number;
  publicTemplates: number;
  privateTemplates: number;
  totalUsage: number;
}

export interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  completedCampaigns: number;
  totalRecipients: number;
}

