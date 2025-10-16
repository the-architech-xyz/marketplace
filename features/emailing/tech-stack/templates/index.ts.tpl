/**
 * Emailing Feature Index - Centralized Exports
 * 
 * This file provides centralized exports for the Emailing feature.
 * Import commonly used types, schemas, hooks, and stores from this file.
 * 
 * Generated from: features/emailing/contract.ts
 */

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Core types
  EmailStatus,
  EmailPriority,
  EmailType,
  TemplateType,
  Email,
  EmailRecipient,
  EmailContent,
  EmailAttachment,
  EmailTemplate,
  EmailCampaign,
  EmailAnalytics,
  
  // Input types
  SendEmailData,
  SendBulkEmailData,
  CreateTemplateData,
  UpdateTemplateData,
  CreateCampaignData,
  UpdateCampaignData,
  
  // Result types
  SendEmailResult,
  SendBulkEmailResult,
  TemplateResult,
  CampaignResult,
  
  // Filter types
  EmailFilters,
  TemplateFilters,
  CampaignFilters,
  AnalyticsFilters,
  
  // Error types
  EmailingError,
  
  // Configuration types
  EmailingConfig,
  
  // Service interface
  IEmailService,
  
  // Additional utility types
  EmailFormData,
  TemplateFormData,
  CampaignFormData,
  EmailListItem,
  TemplateListItem,
  CampaignListItem,
  EmailStats,
  TemplateStats,
  CampaignStats,
  EmailProvider,
  EmailDeliveryStatus,
  TemplateVariable,
  TemplateCategory,
  CampaignStatus
} from './types';

// ============================================================================
// SCHEMAS
// ============================================================================

export {
  // Enum schemas
  EmailStatusSchema,
  EmailPrioritySchema,
  EmailTypeSchema,
  TemplateTypeSchema,
  
  // Core data schemas
  EmailRecipientSchema,
  EmailAttachmentSchema,
  EmailContentSchema,
  EmailSchema,
  EmailTemplateSchema,
  EmailAnalyticsSchema,
  EmailCampaignSchema,
  
  // Input schemas
  SendEmailDataSchema,
  SendBulkEmailDataSchema,
  CreateTemplateDataSchema,
  UpdateTemplateDataSchema,
  CreateCampaignDataSchema,
  UpdateCampaignDataSchema,
  
  // Result schemas
  SendEmailResultSchema,
  SendBulkEmailResultSchema,
  TemplateResultSchema,
  CampaignResultSchema,
  
  // Filter schemas
  EmailFiltersSchema,
  TemplateFiltersSchema,
  CampaignFiltersSchema,
  AnalyticsFiltersSchema,
  
  // Error schemas
  EmailingErrorSchema,
  
  // Configuration schemas
  EmailingConfigSchema,
  
  // Form schemas
  EmailFormDataSchema,
  TemplateFormDataSchema,
  CampaignFormDataSchema,
  
  // Utility schemas
  EmailListItemSchema,
  TemplateListItemSchema,
  CampaignListItemSchema,
  EmailStatsSchema,
  TemplateStatsSchema,
  CampaignStatsSchema
} from './schemas';

// ============================================================================
// HOOKS
// ============================================================================

export {
  // Query keys
  emailingQueryKeys,
  
  // Email hooks
  useEmails,
  useEmail,
  useSendEmail,
  useSendBulkEmail,
  useDeleteEmail,
  useBulkDeleteEmails,
  useResendEmail,
  
  // Template hooks
  useTemplates,
  useTemplate,
  useCreateTemplate,
  useUpdateTemplate,
  useDeleteTemplate,
  useDuplicateTemplate,
  
  // Campaign hooks
  useCampaigns,
  useCampaign,
  useCreateCampaign,
  useUpdateCampaign,
  useDeleteCampaign,
  useStartCampaign,
  usePauseCampaign,
  useCancelCampaign,
  
  // Analytics hooks
  useEmailAnalytics,
  useTemplateAnalytics,
  useCampaignAnalytics,
  
  // Stats hooks
  useEmailStats,
  useTemplateStats,
  useCampaignStats
} from './hooks';

// ============================================================================
// STORES
// ============================================================================

export {
  // Individual stores
  useEmailStore,
  useTemplateStore,
  useCampaignStore,
  useStatsStore,
  useUIStore,
  
  // Combined selectors
  useEmailState,
  useTemplateState,
  useCampaignState,
  useStatsState,
  useUIState
} from './stores';

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * Common email statuses for UI components
 */
export const EMAIL_STATUSES = {
  DRAFT: 'draft' as const,
  SENDING: 'sending' as const,
  SENT: 'sent' as const,
  DELIVERED: 'delivered' as const,
  FAILED: 'failed' as const
} as const;

/**
 * Common email priorities for UI components
 */
export const EMAIL_PRIORITIES = {
  LOW: 'low' as const,
  NORMAL: 'normal' as const,
  HIGH: 'high' as const,
  URGENT: 'urgent' as const
} as const;

/**
 * Common email types for UI components
 */
export const EMAIL_TYPES = {
  TRANSACTIONAL: 'transactional' as const,
  MARKETING: 'marketing' as const,
  NOTIFICATION: 'notification' as const,
  NEWSLETTER: 'newsletter' as const,
  WELCOME: 'welcome' as const,
  REMINDER: 'reminder' as const
} as const;

/**
 * Common template types for UI components
 */
export const TEMPLATE_TYPES = {
  HTML: 'html' as const,
  TEXT: 'text' as const
} as const;

/**
 * Common campaign statuses for UI components
 */
export const CAMPAIGN_STATUSES = {
  DRAFT: 'draft' as const,
  SCHEDULED: 'scheduled' as const,
  RUNNING: 'running' as const,
  PAUSED: 'paused' as const,
  COMPLETED: 'completed' as const,
  CANCELLED: 'cancelled' as const
} as const;

/**
 * Common recipient types for UI components
 */
export const RECIPIENT_TYPES = {
  TO: 'to' as const,
  CC: 'cc' as const,
  BCC: 'bcc' as const
} as const;

/**
 * Default email form data
 */
export const DEFAULT_EMAIL_FORM_DATA = {
  subject: '',
  content: {
    html: '',
    text: ''
  },
  recipients: [],
  priority: 'normal' as const,
  type: 'transactional' as const,
  templateId: undefined,
  scheduledAt: undefined
} as const;

/**
 * Default template form data
 */
export const DEFAULT_TEMPLATE_FORM_DATA = {
  name: '',
  description: '',
  type: 'html' as const,
  subject: '',
  content: {
    html: '',
    text: '',
    variables: []
  },
  category: '',
  tags: [],
  isPublic: false
} as const;

/**
 * Default campaign form data
 */
export const DEFAULT_CAMPAIGN_FORM_DATA = {
  name: '',
  description: '',
  templateId: '',
  recipients: [],
  scheduledAt: undefined,
  settings: {
    trackOpens: true,
    trackClicks: true,
    trackUnsubscribes: true,
    maxRecipients: 1000
  }
} as const;

/**
 * Default filters for different views
 */
export const DEFAULT_FILTERS = {
  email: {},
  template: {},
  campaign: {},
  analytics: {}
} as const;

/**
 * Common email categories
 */
export const EMAIL_CATEGORIES = [
  'welcome',
  'notification',
  'marketing',
  'transactional',
  'newsletter',
  'reminder',
  'promotional',
  'system'
] as const;

/**
 * Common template categories
 */
export const TEMPLATE_CATEGORIES = [
  'welcome',
  'notification',
  'marketing',
  'transactional',
  'newsletter',
  'reminder',
  'promotional',
  'system',
  'custom'
] as const;

/**
 * Common email tags
 */
export const EMAIL_TAGS = [
  'urgent',
  'important',
  'follow-up',
  'confirmation',
  'reminder',
  'promotional',
  'newsletter',
  'system',
  'user-generated',
  'automated'
] as const;

/**
 * Common template tags
 */
export const TEMPLATE_TAGS = [
  'responsive',
  'mobile-friendly',
  'dark-mode',
  'light-mode',
  'minimal',
  'modern',
  'classic',
  'corporate',
  'creative',
  'newsletter'
] as const;
