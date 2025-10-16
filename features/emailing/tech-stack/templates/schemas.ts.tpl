/**
 * Emailing Feature Schemas - Zod Validation Schemas
 * 
 * This file contains all Zod validation schemas for the Emailing feature.
 * These schemas provide runtime type checking and validation for all data structures.
 * 
 * Generated from: features/emailing/contract.ts
 */

import { z } from 'zod';

// ============================================================================
// ENUM SCHEMAS
// ============================================================================

export const EmailStatusSchema = z.enum([
  'draft',
  'sending',
  'sent',
  'delivered',
  'failed'
]);

export const EmailPrioritySchema = z.enum([
  'low',
  'normal',
  'high',
  'urgent'
]);

export const EmailTypeSchema = z.enum([
  'transactional',
  'marketing',
  'notification',
  'newsletter',
  'welcome',
  'reminder'
]);

export const TemplateTypeSchema = z.enum([
  'html',
  'text'
]);

// ============================================================================
// CORE DATA SCHEMAS
// ============================================================================

export const EmailRecipientSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  type: z.enum(['to', 'cc', 'bcc']),
  status: EmailStatusSchema,
  deliveredAt: z.string().optional(),
  openedAt: z.string().optional(),
  clickedAt: z.string().optional(),
  bouncedAt: z.string().optional(),
  errorMessage: z.string().optional()
});

export const EmailAttachmentSchema = z.object({
  id: z.string(),
  filename: z.string(),
  contentType: z.string(),
  size: z.number().positive(),
  url: z.string().url(),
  createdAt: z.string()
});

export const EmailContentSchema = z.object({
  html: z.string().optional(),
  text: z.string().optional(),
  attachments: z.array(EmailAttachmentSchema).optional(),
  inlineImages: z.array(z.object({
    cid: z.string(),
    url: z.string().url()
  })).optional()
});

export const EmailSchema = z.object({
  id: z.string(),
  subject: z.string().min(1),
  content: EmailContentSchema,
  recipients: z.array(EmailRecipientSchema).min(1),
  status: EmailStatusSchema,
  priority: EmailPrioritySchema,
  type: EmailTypeSchema,
  templateId: z.string().optional(),
  campaignId: z.string().optional(),
  scheduledAt: z.string().optional(),
  sentAt: z.string().optional(),
  deliveredAt: z.string().optional(),
  openedAt: z.string().optional(),
  clickedAt: z.string().optional(),
  bouncedAt: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const EmailTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  type: TemplateTypeSchema,
  subject: z.string().min(1),
  content: z.object({
    html: z.string().optional(),
    text: z.string().optional(),
    variables: z.array(z.string())
  }),
  category: z.string().min(1),
  tags: z.array(z.string()),
  isPublic: z.boolean(),
  usageCount: z.number().nonnegative(),
  lastUsedAt: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const EmailAnalyticsSchema = z.object({
  emailsSent: z.number().nonnegative(),
  emailsDelivered: z.number().nonnegative(),
  emailsOpened: z.number().nonnegative(),
  emailsClicked: z.number().nonnegative(),
  emailsBounced: z.number().nonnegative(),
  emailsFailed: z.number().nonnegative(),
  openRate: z.number().min(0).max(1),
  clickRate: z.number().min(0).max(1),
  bounceRate: z.number().min(0).max(1),
  unsubscribeCount: z.number().nonnegative(),
  topLinks: z.array(z.object({
    url: z.string().url(),
    clicks: z.number().nonnegative()
  })),
  topRecipients: z.array(z.object({
    email: z.string().email(),
    opens: z.number().nonnegative(),
    clicks: z.number().nonnegative()
  }))
});

export const EmailCampaignSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  templateId: z.string(),
  status: z.enum(['draft', 'scheduled', 'running', 'paused', 'completed', 'cancelled']),
  recipients: z.array(EmailRecipientSchema).min(1),
  scheduledAt: z.string().optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  analytics: EmailAnalyticsSchema,
  settings: z.object({
    trackOpens: z.boolean(),
    trackClicks: z.boolean(),
    trackUnsubscribes: z.boolean(),
    maxRecipients: z.number().positive()
  }),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// ============================================================================
// INPUT SCHEMAS
// ============================================================================

export const SendEmailDataSchema = z.object({
  subject: z.string().min(1),
  content: EmailContentSchema,
  recipients: z.array(z.object({
    email: z.string().email(),
    name: z.string().optional(),
    type: z.enum(['to', 'cc', 'bcc'])
  })).min(1),
  priority: EmailPrioritySchema.optional(),
  type: EmailTypeSchema.optional(),
  templateId: z.string().optional(),
  scheduledAt: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

export const SendBulkEmailDataSchema = z.object({
  subject: z.string().min(1),
  content: EmailContentSchema,
  recipients: z.array(z.object({
    email: z.string().email(),
    name: z.string().optional(),
    type: z.enum(['to', 'cc', 'bcc'])
  })).min(1),
  priority: EmailPrioritySchema.optional(),
  type: EmailTypeSchema.optional(),
  templateId: z.string().optional(),
  scheduledAt: z.string().optional(),
  batchSize: z.number().positive().optional(),
  delayBetweenBatches: z.number().nonnegative().optional(),
  metadata: z.record(z.any()).optional()
});

export const CreateTemplateDataSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: TemplateTypeSchema,
  subject: z.string().min(1),
  content: z.object({
    html: z.string().optional(),
    text: z.string().optional(),
    variables: z.array(z.string())
  }),
  category: z.string().min(1),
  tags: z.array(z.string()),
  isPublic: z.boolean().optional(),
  metadata: z.record(z.any()).optional()
});

export const UpdateTemplateDataSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  subject: z.string().min(1).optional(),
  content: z.object({
    html: z.string().optional(),
    text: z.string().optional(),
    variables: z.array(z.string())
  }).optional(),
  category: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  metadata: z.record(z.any()).optional()
});

export const CreateCampaignDataSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  templateId: z.string(),
  recipients: z.array(z.object({
    email: z.string().email(),
    name: z.string().optional(),
    type: z.enum(['to', 'cc', 'bcc'])
  })).min(1),
  scheduledAt: z.string().optional(),
  settings: z.object({
    trackOpens: z.boolean().optional(),
    trackClicks: z.boolean().optional(),
    trackUnsubscribes: z.boolean().optional(),
    maxRecipients: z.number().positive().optional()
  }).optional(),
  metadata: z.record(z.any()).optional()
});

export const UpdateCampaignDataSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  templateId: z.string().optional(),
  recipients: z.array(z.object({
    email: z.string().email(),
    name: z.string().optional(),
    type: z.enum(['to', 'cc', 'bcc'])
  })).min(1).optional(),
  scheduledAt: z.string().optional(),
  settings: z.object({
    trackOpens: z.boolean().optional(),
    trackClicks: z.boolean().optional(),
    trackUnsubscribes: z.boolean().optional(),
    maxRecipients: z.number().positive().optional()
  }).optional(),
  metadata: z.record(z.any()).optional()
});

// ============================================================================
// RESULT SCHEMAS
// ============================================================================

export const SendEmailResultSchema = z.object({
  email: EmailSchema,
  success: z.boolean(),
  message: z.string().optional()
});

export const SendBulkEmailResultSchema = z.object({
  emails: z.array(EmailSchema),
  success: z.boolean(),
  message: z.string().optional(),
  totalSent: z.number().nonnegative(),
  totalFailed: z.number().nonnegative()
});

export const TemplateResultSchema = z.object({
  template: EmailTemplateSchema,
  success: z.boolean(),
  message: z.string().optional()
});

export const CampaignResultSchema = z.object({
  campaign: EmailCampaignSchema,
  success: z.boolean(),
  message: z.string().optional()
});

// ============================================================================
// FILTER SCHEMAS
// ============================================================================

export const EmailFiltersSchema = z.object({
  status: z.array(EmailStatusSchema).optional(),
  type: z.array(EmailTypeSchema).optional(),
  priority: z.array(EmailPrioritySchema).optional(),
  templateId: z.string().optional(),
  campaignId: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional()
});

export const TemplateFiltersSchema = z.object({
  type: z.array(TemplateTypeSchema).optional(),
  category: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
  search: z.string().optional()
});

export const CampaignFiltersSchema = z.object({
  status: z.array(z.enum(['draft', 'scheduled', 'running', 'paused', 'completed', 'cancelled'])).optional(),
  templateId: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional()
});

export const AnalyticsFiltersSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  type: z.array(EmailTypeSchema).optional(),
  templateId: z.string().optional(),
  campaignId: z.string().optional()
});

// ============================================================================
// ERROR SCHEMAS
// ============================================================================

export const EmailingErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  type: z.enum(['validation_error', 'template_error', 'delivery_error', 'quota_error']),
  field: z.string().optional(),
  details: z.record(z.any()).optional()
});

// ============================================================================
// CONFIGURATION SCHEMAS
// ============================================================================

export const EmailingConfigSchema = z.object({
  provider: z.object({
    name: z.string(),
    apiKey: z.string(),
    fromEmail: z.string().email(),
    fromName: z.string()
  }),
  features: z.object({
    templates: z.boolean(),
    campaigns: z.boolean(),
    analytics: z.boolean(),
    scheduling: z.boolean(),
    attachments: z.boolean()
  }),
  limits: z.object({
    maxRecipientsPerEmail: z.number().positive(),
    maxAttachmentsPerEmail: z.number().positive(),
    maxAttachmentSize: z.number().positive(),
    dailyEmailLimit: z.number().positive(),
    monthlyEmailLimit: z.number().positive()
  }),
  security: z.object({
    requireEmailVerification: z.boolean(),
    allowUnsubscribe: z.boolean(),
    trackUserActivity: z.boolean()
  })
});

// ============================================================================
// FORM SCHEMAS
// ============================================================================

export const EmailFormDataSchema = z.object({
  subject: z.string().min(1),
  content: z.object({
    html: z.string().optional(),
    text: z.string().optional()
  }),
  recipients: z.array(z.object({
    email: z.string().email(),
    name: z.string().optional(),
    type: z.enum(['to', 'cc', 'bcc'])
  })).min(1),
  priority: EmailPrioritySchema,
  type: EmailTypeSchema,
  templateId: z.string().optional(),
  scheduledAt: z.string().optional()
});

export const TemplateFormDataSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: TemplateTypeSchema,
  subject: z.string().min(1),
  content: z.object({
    html: z.string().optional(),
    text: z.string().optional(),
    variables: z.array(z.string())
  }),
  category: z.string().min(1),
  tags: z.array(z.string()),
  isPublic: z.boolean()
});

export const CampaignFormDataSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  templateId: z.string(),
  recipients: z.array(z.object({
    email: z.string().email(),
    name: z.string().optional(),
    type: z.enum(['to', 'cc', 'bcc'])
  })).min(1),
  scheduledAt: z.string().optional(),
  settings: z.object({
    trackOpens: z.boolean(),
    trackClicks: z.boolean(),
    trackUnsubscribes: z.boolean(),
    maxRecipients: z.number().positive()
  })
});

// ============================================================================
// UTILITY SCHEMAS
// ============================================================================

export const EmailListItemSchema = z.object({
  id: z.string(),
  subject: z.string(),
  status: EmailStatusSchema,
  priority: EmailPrioritySchema,
  type: EmailTypeSchema,
  recipientCount: z.number().nonnegative(),
  sentAt: z.string().optional(),
  deliveredAt: z.string().optional(),
  openedAt: z.string().optional(),
  clickedAt: z.string().optional(),
  bouncedAt: z.string().optional()
});

export const TemplateListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: TemplateTypeSchema,
  category: z.string(),
  tags: z.array(z.string()),
  isPublic: z.boolean(),
  usageCount: z.number().nonnegative(),
  lastUsedAt: z.string().optional(),
  createdAt: z.string()
});

export const CampaignListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(['draft', 'scheduled', 'running', 'paused', 'completed', 'cancelled']),
  recipientCount: z.number().nonnegative(),
  scheduledAt: z.string().optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  analytics: z.object({
    emailsSent: z.number().nonnegative(),
    emailsDelivered: z.number().nonnegative(),
    emailsOpened: z.number().nonnegative(),
    emailsClicked: z.number().nonnegative(),
    openRate: z.number().min(0).max(1),
    clickRate: z.number().min(0).max(1)
  })
});

export const EmailStatsSchema = z.object({
  totalEmails: z.number().nonnegative(),
  sentToday: z.number().nonnegative(),
  deliveredToday: z.number().nonnegative(),
  openedToday: z.number().nonnegative(),
  clickedToday: z.number().nonnegative(),
  bouncedToday: z.number().nonnegative(),
  failedToday: z.number().nonnegative(),
  openRate: z.number().min(0).max(1),
  clickRate: z.number().min(0).max(1),
  bounceRate: z.number().min(0).max(1)
});

export const TemplateStatsSchema = z.object({
  totalTemplates: z.number().nonnegative(),
  publicTemplates: z.number().nonnegative(),
  privateTemplates: z.number().nonnegative(),
  mostUsedTemplate: z.object({
    id: z.string(),
    name: z.string(),
    usageCount: z.number().nonnegative()
  }).optional(),
  recentlyCreated: z.number().nonnegative()
});

export const CampaignStatsSchema = z.object({
  totalCampaigns: z.number().nonnegative(),
  activeCampaigns: z.number().nonnegative(),
  completedCampaigns: z.number().nonnegative(),
  draftCampaigns: z.number().nonnegative(),
  scheduledCampaigns: z.number().nonnegative(),
  totalRecipients: z.number().nonnegative(),
  averageOpenRate: z.number().min(0).max(1),
  averageClickRate: z.number().min(0).max(1)
});
