/**
 * Payments Feature Index - Centralized Exports
 * 
 * ⚠️ ARCHITECTURE:
 * - TanStack Query Hooks → Server data (payments, subscriptions, invoices)
 * - Zustand Store → UI state only (modals, filters, checkout flow)
 * 
 * USAGE EXAMPLES:
 * 
 * // Fetch server data
 * import { usePayments, useSubscriptions } from '@/lib/payments';
 * const { data: payments, isLoading } = usePayments();
 * 
 * // Manage UI state
 * import { usePaymentUIStore } from '@/lib/payments';
 * const { isCheckoutModalOpen, setCheckoutModalOpen } = usePaymentUIStore();
 */

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Core types
  PaymentStatus,
  PaymentMethod,
  Currency,
  SubscriptionStatus,
  InvoiceStatus,
  Payment,
  PaymentMethodData,
  Subscription,
  Invoice,
  InvoiceLineItem,
  PaymentIntent,
  Refund,
  
  // Input types
  CreatePaymentData,
  CreateSubscriptionData,
  CreateInvoiceData,
  UpdatePaymentData,
  UpdateSubscriptionData,
  
  // Analytics types
  PaymentAnalytics,
  PaymentFilters,
  
  // Error types
  PaymentError,
  
  // Webhook types
  PaymentWebhookEvent,
  
  // Organization billing types
  OrganizationSubscription,
  SeatInfo,
  OrganizationUsage,
  TeamUsage,
  BillingInfo,
  CreateOrgSubscriptionData,
  UpdateOrgSubscriptionData,
  UpdateBillingInfoData,
  TrackUsageData,
  
  // Service interface
  IPaymentService,
  
  // Additional utility types
  PaymentFormData,
  SubscriptionFormData,
  InvoiceFormData,
  PaymentListItem,
  SubscriptionListItem,
  InvoiceListItem,
  PaymentMethodListItem,
  PaymentStats,
  SubscriptionStats,
  InvoiceStats,
  PaymentProvider,
  PaymentPlan,
  WebhookConfig,
  AnalyticsFilters,
  ExportConfig,
  NotificationSettings,
  SecuritySettings,
  ComplianceSettings,
  IntegrationStatus,
  DashboardWidget
} from './types';

// ============================================================================
// SCHEMAS
// ============================================================================

export {
  // Enum schemas
  PaymentStatusSchema,
  PaymentMethodSchema,
  CurrencySchema,
  SubscriptionStatusSchema,
  InvoiceStatusSchema,
  
  // Core data schemas
  PaymentSchema,
  PaymentMethodDataSchema,
  SubscriptionSchema,
  InvoiceLineItemSchema,
  InvoiceSchema,
  PaymentIntentSchema,
  RefundSchema,
  
  // Input schemas
  CreatePaymentDataSchema,
  CreateSubscriptionDataSchema,
  CreateInvoiceDataSchema,
  UpdatePaymentDataSchema,
  UpdateSubscriptionDataSchema,
  
  // Analytics schemas
  PaymentAnalyticsSchema,
  PaymentFiltersSchema,
  
  // Error schemas
  PaymentErrorSchema,
  
  // Webhook schemas
  PaymentWebhookEventSchema,
  
  // Organization billing schemas
  OrganizationSubscriptionSchema,
  SeatInfoSchema,
  OrganizationUsageSchema,
  TeamUsageSchema,
  BillingInfoSchema,
  CreateOrgSubscriptionDataSchema,
  UpdateOrgSubscriptionDataSchema,
  UpdateBillingInfoDataSchema,
  TrackUsageDataSchema,
  
  // Form schemas
  PaymentFormDataSchema,
  SubscriptionFormDataSchema,
  InvoiceFormDataSchema,
  
  // Utility schemas
  PaymentListItemSchema,
  SubscriptionListItemSchema,
  InvoiceListItemSchema,
  PaymentMethodListItemSchema,
  PaymentStatsSchema,
  SubscriptionStatsSchema,
  InvoiceStatsSchema
} from './schemas';

// ============================================================================
// DIRECT HOOKS EXPORTS (Standard React Pattern)
// ============================================================================

export * from './hooks';

// ============================================================================
// ZUSTAND STORE EXPORTS (UI State Only)
// ============================================================================

export { usePaymentUIStore, usePaymentUISelectors } from './stores';

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * Common payment statuses for UI components
 */
export const PAYMENT_STATUSES = {
  COMPLETED: 'completed' as const,
  PENDING: 'pending' as const,
  FAILED: 'failed' as const,
  PROCESSING: 'processing' as const,
  CANCELLED: 'cancelled' as const,
  REFUNDED: 'refunded' as const
} as const;

/**
 * Common payment methods for UI components
 */
export const PAYMENT_METHODS = {
  CARD: 'card' as const,
  BANK_TRANSFER: 'bank_transfer' as const,
  PAYPAL: 'paypal' as const,
  APPLE_PAY: 'apple_pay' as const,
  GOOGLE_PAY: 'google_pay' as const,
  CRYPTO: 'crypto' as const,
  WALLET: 'wallet' as const
} as const;

/**
 * Common currencies for UI components
 */
export const CURRENCIES = {
  USD: 'USD' as const,
  EUR: 'EUR' as const,
  GBP: 'GBP' as const,
  CAD: 'CAD' as const,
  AUD: 'AUD' as const,
  JPY: 'JPY' as const,
  CHF: 'CHF' as const
} as const;

/**
 * Common subscription statuses for UI components
 */
export const SUBSCRIPTION_STATUSES = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
  CANCELLED: 'cancelled' as const,
  PAST_DUE: 'past_due' as const,
  UNPAID: 'unpaid' as const,
  TRIALING: 'trialing' as const
} as const;

/**
 * Common invoice statuses for UI components
 */
export const INVOICE_STATUSES = {
  DRAFT: 'draft' as const,
  OPEN: 'open' as const,
  PAID: 'paid' as const,
  VOID: 'void' as const,
  UNCOLLECTIBLE: 'uncollectible' as const
} as const;

/**
 * Default payment form data
 */
export const DEFAULT_PAYMENT_FORM_DATA = {
  amount: 0,
  currency: 'USD' as const,
  method: 'card' as const,
  customerId: undefined,
  description: '',
  saveCard: false,
  returnUrl: undefined
} as const;

/**
 * Default subscription form data
 */
export const DEFAULT_SUBSCRIPTION_FORM_DATA = {
  customerId: '',
  planId: '',
  paymentMethodId: undefined,
  trialPeriodDays: undefined
} as const;

/**
 * Default invoice form data
 */
export const DEFAULT_INVOICE_FORM_DATA = {
  customerId: '',
  subscriptionId: undefined,
  description: '',
  dueDate: undefined,
  lineItems: [],
  taxRate: undefined,
  discount: undefined
} as const;

/**
 * Default filters for different views
 */
export const DEFAULT_FILTERS = {
  payment: {},
  subscription: {},
  invoice: {},
  analytics: {}
} as const;

/**
 * Common payment intervals
 */
export const PAYMENT_INTERVALS = {
  DAY: 'day' as const,
  WEEK: 'week' as const,
  MONTH: 'month' as const,
  YEAR: 'year' as const
} as const;

/**
 * Common refund reasons
 */
export const REFUND_REASONS = {
  DUPLICATE: 'duplicate' as const,
  FRAUDULENT: 'fraudulent' as const,
  REQUESTED_BY_CUSTOMER: 'requested_by_customer' as const,
  OTHER: 'other' as const
} as const;

/**
 * Common payment error types
 */
export const PAYMENT_ERROR_TYPES = {
  CARD_ERROR: 'card_error' as const,
  INVALID_REQUEST_ERROR: 'invalid_request_error' as const,
  API_ERROR: 'api_error' as const,
  AUTHENTICATION_ERROR: 'authentication_error' as const
} as const;

/**
 * Common webhook events
 */
export const WEBHOOK_EVENTS = {
  PAYMENT_SUCCEEDED: 'payment.succeeded',
  PAYMENT_FAILED: 'payment.failed',
  SUBSCRIPTION_CREATED: 'subscription.created',
  SUBSCRIPTION_UPDATED: 'subscription.updated',
  SUBSCRIPTION_DELETED: 'subscription.deleted',
  INVOICE_CREATED: 'invoice.created',
  INVOICE_PAID: 'invoice.paid',
  INVOICE_PAYMENT_FAILED: 'invoice.payment_failed',
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_UPDATED: 'customer.updated',
  CUSTOMER_DELETED: 'customer.deleted'
} as const;

/**
 * Common payment providers
 */
export const PAYMENT_PROVIDERS = {
  STRIPE: 'stripe' as const,
  PAYPAL: 'paypal' as const,
  SQUARE: 'square' as const,
  RAZORPAY: 'razorpay' as const,
  CUSTOM: 'custom' as const
} as const;

/**
 * Common payment plan features
 */
export const PAYMENT_PLAN_FEATURES = [
  'unlimited_transactions',
  'advanced_analytics',
  'priority_support',
  'custom_branding',
  'api_access',
  'webhook_support',
  'multi_currency',
  'recurring_billing',
  'invoice_generation',
  'payment_methods',
  'fraud_protection',
  'pci_compliance'
] as const;

/**
 * Common dashboard widget types
 */
export const DASHBOARD_WIDGET_TYPES = {
  REVENUE: 'revenue' as const,
  TRANSACTIONS: 'transactions' as const,
  SUBSCRIPTIONS: 'subscriptions' as const,
  INVOICES: 'invoices' as const,
  ANALYTICS: 'analytics' as const
} as const;

/**
 * Common chart types for analytics
 */
export const CHART_TYPES = {
  LINE: 'line' as const,
  BAR: 'bar' as const,
  PIE: 'pie' as const,
  AREA: 'area' as const
} as const;

/**
 * Common date ranges for analytics
 */
export const DATE_RANGES = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_YEAR: 'this_year',
  LAST_YEAR: 'last_year',
  CUSTOM: 'custom'
} as const;

/**
 * Common export formats
 */
export const EXPORT_FORMATS = {
  CSV: 'csv' as const,
  XLSX: 'xlsx' as const,
  PDF: 'pdf' as const
} as const;

/**
 * Common notification types
 */
export const NOTIFICATION_TYPES = {
  EMAIL: 'email' as const,
  WEBHOOK: 'webhook' as const,
  SMS: 'sms' as const
} as const;

/**
 * Common security levels
 */
export const SECURITY_LEVELS = {
  BASIC: 'basic' as const,
  STANDARD: 'standard' as const,
  HIGH: 'high' as const
} as const;

/**
 * Common backup frequencies
 */
export const BACKUP_FREQUENCIES = {
  DAILY: 'daily' as const,
  WEEKLY: 'weekly' as const,
  MONTHLY: 'monthly' as const
} as const;
