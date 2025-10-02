/**
 * Email Types
 * 
 * TypeScript definitions for email operations
 * EXTERNAL API IDENTICAL ACROSS ALL EMAIL PROVIDERS - Features work with ANY email service!
 */

// Email data interface
export interface SendEmailData {
  to: string | string[];
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  tags?: { name: string; value: string }[];
  attachments?: File[];
  headers?: Record<string, string>;
}

// Email response interface
export interface SendEmailResponse {
  id: string;
  message: string;
  success: boolean;
  templateId?: string;
}

// Email template interface
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create template data
export interface CreateTemplateData {
  name: string;
  subject: string;
  html: string;
  text: string;
}

// Update template data
export interface UpdateTemplateData {
  name?: string;
  subject?: string;
  html?: string;
  text?: string;
}

// Email analytics interface
export interface EmailAnalytics {
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  totalUnsubscribed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  period: {
    start: Date;
    end: Date;
  };
}

// Email statistics interface
export interface EmailStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
}

// Email webhook interface
export interface EmailWebhook {
  id: string;
  url: string;
  events: string[];
  enabled: boolean;
  secret: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create webhook data
export interface CreateWebhookData {
  url: string;
  events: string[];
  secret?: string;
}

// Update webhook data
export interface UpdateWebhookData {
  url?: string;
  events?: string[];
  enabled?: boolean;
  secret?: string;
}

// Email error interface
export interface EmailError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

// Email attachment interface
export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
  disposition?: 'attachment' | 'inline';
  cid?: string;
}

// Email tag interface
export interface EmailTag {
  name: string;
  value: string;
}

// Email header interface
export interface EmailHeader {
  [key: string]: string;
}

// Email recipient interface
export interface EmailRecipient {
  email: string;
  name?: string;
}

// Email campaign interface
export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  templateId?: string;
  html?: string;
  text?: string;
  recipients: EmailRecipient[];
  scheduledAt?: Date;
  sentAt?: Date;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

// Email list interface
export interface EmailList {
  id: string;
  name: string;
  description?: string;
  subscribers: EmailRecipient[];
  createdAt: Date;
  updatedAt: Date;
}

// Email subscriber interface
export interface EmailSubscriber {
  id: string;
  email: string;
  name?: string;
  status: 'subscribed' | 'unsubscribed' | 'bounced' | 'complained';
  subscribedAt: Date;
  unsubscribedAt?: Date;
  tags: string[];
  customFields: Record<string, any>;
}

// Email event interface
export interface EmailEvent {
  id: string;
  type: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'complained' | 'unsubscribed';
  emailId: string;
  recipient: string;
  timestamp: Date;
  data: Record<string, any>;
}

// Email webhook event interface
export interface EmailWebhookEvent {
  id: string;
  webhookId: string;
  type: string;
  data: Record<string, any>;
  timestamp: Date;
  status: 'pending' | 'delivered' | 'failed';
  retryCount: number;
  lastRetryAt?: Date;
}

// Email performance interface
export interface EmailPerformance {
  period: {
    start: Date;
    end: Date;
  };
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
  rates: {
    delivery: number;
    open: number;
    click: number;
    bounce: number;
    unsubscribe: number;
  };
  trends: {
    sent: number[];
    delivered: number[];
    opened: number[];
    clicked: number[];
    bounced: number[];
    unsubscribed: number[];
  };
}

// Email comparison interface
export interface EmailComparison {
  current: EmailPerformance;
  previous: EmailPerformance;
  changes: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    bounceRate: number;
    unsubscribeRate: number;
  };
}

// Email filter interface
export interface EmailFilter {
  startDate?: Date;
  endDate?: Date;
  templateId?: string;
  campaignId?: string;
  recipient?: string;
  status?: string;
  tags?: string[];
}

// Email search interface
export interface EmailSearch {
  query: string;
  filters?: EmailFilter;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Email search result interface
export interface EmailSearchResult {
  emails: any[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

// Email provider interface
export interface EmailProvider {
  name: string;
  version: string;
  capabilities: string[];
  limits: {
    daily: number;
    monthly: number;
    perSecond: number;
  };
  features: {
    templates: boolean;
    analytics: boolean;
    webhooks: boolean;
    scheduling: boolean;
    tracking: boolean;
    attachments: boolean;
  };
}

// Email configuration interface
export interface EmailConfig {
  provider: EmailProvider;
  apiKey: string;
  fromEmail: string;
  fromName?: string;
  replyTo?: string;
  webhookSecret?: string;
  trackingDomain?: string;
  defaultTags?: EmailTag[];
  defaultHeaders?: EmailHeader;
}

// Email validation interface
export interface EmailValidation {
  email: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

// Email validation result interface
export interface EmailValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  normalizedEmail?: string;
  domain?: string;
  localPart?: string;
}

// Email rate limit interface
export interface EmailRateLimit {
  limit: number;
  remaining: number;
  reset: Date;
  retryAfter?: number;
}

// Email quota interface
export interface EmailQuota {
  daily: {
    limit: number;
    used: number;
    remaining: number;
    reset: Date;
  };
  monthly: {
    limit: number;
    used: number;
    remaining: number;
    reset: Date;
  };
}

// Email health check interface
export interface EmailHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  provider: string;
  lastCheck: Date;
  responseTime: number;
  errors: string[];
  warnings: string[];
}

// Email metrics interface
export interface EmailMetrics {
  timestamp: Date;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  complaints: number;
}

// Email dashboard interface
export interface EmailDashboard {
  overview: EmailStats;
  trends: EmailPerformance;
  recent: EmailEvent[];
  health: EmailHealthCheck;
  quota: EmailQuota;
}
