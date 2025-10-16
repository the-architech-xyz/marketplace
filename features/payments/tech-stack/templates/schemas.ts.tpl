/**
 * Payments Feature Schemas - Zod Validation Schemas
 * 
 * This file contains all Zod validation schemas for the Payments feature.
 * These schemas provide runtime type checking and validation for all data structures.
 * 
 * Generated from: features/payments/contract.ts
 */

import { z } from 'zod';

// ============================================================================
// ENUM SCHEMAS
// ============================================================================

export const PaymentStatusSchema = z.enum([
  'completed',
  'pending',
  'failed',
  'processing',
  'cancelled',
  'refunded'
]);

export const PaymentMethodSchema = z.enum([
  'card',
  'bank_transfer',
  'paypal',
  'apple_pay',
  'google_pay',
  'crypto',
  'wallet'
]);

export const CurrencySchema = z.enum([
  'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF'
]);

export const SubscriptionStatusSchema = z.enum([
  'active',
  'inactive',
  'cancelled',
  'past_due',
  'unpaid',
  'trialing'
]);

export const InvoiceStatusSchema = z.enum([
  'draft',
  'open',
  'paid',
  'void',
  'uncollectible'
]);

// ============================================================================
// CORE DATA SCHEMAS
// ============================================================================

export const PaymentSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  currency: CurrencySchema,
  status: PaymentStatusSchema,
  method: PaymentMethodSchema,
  customer: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email()
  }),
  description: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  processedAt: z.string().optional(),
  failureReason: z.string().optional(),
  refundedAmount: z.number().nonnegative().optional(),
  refundedAt: z.string().optional()
});

export const PaymentMethodDataSchema = z.object({
  id: z.string(),
  type: PaymentMethodSchema,
  last4: z.string().optional(),
  brand: z.string().optional(),
  expMonth: z.number().min(1).max(12).optional(),
  expYear: z.number().min(2020).optional(),
  isDefault: z.boolean(),
  createdAt: z.string()
});

export const SubscriptionSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  planId: z.string(),
  planName: z.string(),
  status: SubscriptionStatusSchema,
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  cancelAtPeriodEnd: z.boolean(),
  canceledAt: z.string().optional(),
  trialStart: z.string().optional(),
  trialEnd: z.string().optional(),
  amount: z.number().positive(),
  currency: CurrencySchema,
  interval: z.enum(['day', 'week', 'month', 'year']),
  intervalCount: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const InvoiceLineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number().positive(),
  unitAmount: z.number().positive(),
  totalAmount: z.number().positive(),
  taxRate: z.number().min(0).max(1).optional()
});

export const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  subscriptionId: z.string().optional(),
  status: InvoiceStatusSchema,
  amount: z.number().positive(),
  currency: CurrencySchema,
  amountPaid: z.number().nonnegative(),
  amountDue: z.number().nonnegative(),
  subtotal: z.number().positive(),
  tax: z.number().nonnegative().optional(),
  discount: z.number().nonnegative().optional(),
  description: z.string().optional(),
  dueDate: z.string(),
  paidAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lineItems: z.array(InvoiceLineItemSchema)
});

export const PaymentIntentSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  currency: CurrencySchema,
  status: PaymentStatusSchema,
  clientSecret: z.string(),
  customerId: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string()
});

export const RefundSchema = z.object({
  id: z.string(),
  paymentId: z.string(),
  amount: z.number().positive(),
  currency: CurrencySchema,
  status: z.enum(['succeeded', 'pending', 'failed', 'cancelled']),
  reason: z.enum(['duplicate', 'fraudulent', 'requested_by_customer', 'other']),
  createdAt: z.string(),
  processedAt: z.string().optional()
});

// ============================================================================
// INPUT SCHEMAS
// ============================================================================

export const CreatePaymentDataSchema = z.object({
  amount: z.number().positive(),
  currency: CurrencySchema,
  method: PaymentMethodSchema,
  customerId: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  saveCard: z.boolean().optional(),
  returnUrl: z.string().url().optional()
});

export const CreateSubscriptionDataSchema = z.object({
  customerId: z.string(),
  planId: z.string(),
  paymentMethodId: z.string().optional(),
  trialPeriodDays: z.number().positive().optional(),
  metadata: z.record(z.any()).optional()
});

export const CreateInvoiceDataSchema = z.object({
  customerId: z.string(),
  subscriptionId: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  lineItems: z.array(z.object({
    description: z.string(),
    quantity: z.number().positive(),
    unitAmount: z.number().positive(),
    taxRate: z.number().min(0).max(1).optional()
  })),
  taxRate: z.number().min(0).max(1).optional(),
  discount: z.number().nonnegative().optional(),
  metadata: z.record(z.any()).optional()
});

export const UpdatePaymentDataSchema = z.object({
  description: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

export const UpdateSubscriptionDataSchema = z.object({
  planId: z.string().optional(),
  status: SubscriptionStatusSchema.optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
  metadata: z.record(z.any()).optional()
});

// ============================================================================
// ANALYTICS SCHEMAS
// ============================================================================

export const PaymentAnalyticsSchema = z.object({
  totalRevenue: z.number().nonnegative(),
  monthlyRevenue: z.number().nonnegative(),
  totalTransactions: z.number().nonnegative(),
  activeSubscriptions: z.number().nonnegative(),
  revenueGrowth: z.number(),
  transactionGrowth: z.number(),
  subscriptionGrowth: z.number(),
  invoiceGrowth: z.number(),
  averageTransactionValue: z.number().nonnegative(),
  conversionRate: z.number().min(0).max(1),
  churnRate: z.number().min(0).max(1),
  mrr: z.number().nonnegative(),
  arr: z.number().nonnegative()
});

export const PaymentFiltersSchema = z.object({
  status: z.array(PaymentStatusSchema).optional(),
  method: z.array(PaymentMethodSchema).optional(),
  currency: z.array(CurrencySchema).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  amountMin: z.number().nonnegative().optional(),
  amountMax: z.number().nonnegative().optional(),
  customerId: z.string().optional(),
  search: z.string().optional()
});

// ============================================================================
// ERROR SCHEMAS
// ============================================================================

export const PaymentErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  type: z.enum(['card_error', 'invalid_request_error', 'api_error', 'authentication_error']),
  decline_code: z.string().optional(),
  param: z.string().optional()
});

// ============================================================================
// WEBHOOK SCHEMAS
// ============================================================================

export const PaymentWebhookEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.union([PaymentSchema, SubscriptionSchema, InvoiceSchema, RefundSchema])
  }),
  created: z.number(),
  livemode: z.boolean()
});

// ============================================================================
// ORGANIZATION BILLING SCHEMAS
// ============================================================================

export const OrganizationSubscriptionSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  stripeSubscriptionId: z.string(),
  stripeCustomerId: z.string(),
  status: z.enum(['active', 'trialing', 'past_due', 'canceled', 'unpaid']),
  planId: z.string(),
  planName: z.string(),
  planAmount: z.number().positive(),
  planInterval: z.enum(['month', 'year']),
  seatsIncluded: z.number().nonnegative(),
  seatsAdditional: z.number().nonnegative(),
  seatsTotal: z.number().nonnegative(),
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  trialStart: z.string().optional(),
  trialEnd: z.string().optional(),
  cancelAtPeriodEnd: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const SeatInfoSchema = z.object({
  current: z.number().nonnegative(),
  included: z.number().nonnegative(),
  additional: z.number().nonnegative(),
  total: z.number().nonnegative(),
  cost: z.number().nonnegative(),
  pricePerSeat: z.number().nonnegative()
});

export const OrganizationUsageSchema = z.object({
  organizationId: z.string(),
  teamId: z.string().optional(),
  period: z.object({
    start: z.string(),
    end: z.string()
  }),
  metrics: z.record(z.number()),
  costs: z.object({
    base: z.number().nonnegative(),
    seats: z.number().nonnegative(),
    usage: z.number().nonnegative(),
    total: z.number().nonnegative()
  }),
  lastUpdated: z.string()
});

export const TeamUsageSchema = z.object({
  teamId: z.string(),
  organizationId: z.string(),
  period: z.object({
    start: z.string(),
    end: z.string()
  }),
  metrics: z.record(z.number()),
  lastUpdated: z.string()
});

export const BillingInfoSchema = z.object({
  organizationId: z.string(),
  stripeCustomerId: z.string(),
  paymentMethod: z.object({
    type: z.enum(['card', 'bank_account']),
    last4: z.string(),
    brand: z.string().optional(),
    expiryMonth: z.number().min(1).max(12).optional(),
    expiryYear: z.number().min(2020).optional()
  }),
  email: z.string().email(),
  name: z.string(),
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string()
  }).optional(),
  taxId: z.string().optional()
});

// ============================================================================
// ORGANIZATION BILLING INPUT SCHEMAS
// ============================================================================

export const CreateOrgSubscriptionDataSchema = z.object({
  planId: z.string(),
  paymentMethodId: z.string(),
  seats: z.number().positive().optional(),
  trialDays: z.number().positive().optional(),
  metadata: z.record(z.any()).optional()
});

export const UpdateOrgSubscriptionDataSchema = z.object({
  planId: z.string().optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
  metadata: z.record(z.any()).optional()
});

export const UpdateBillingInfoDataSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string()
  }).optional(),
  taxId: z.string().optional()
});

export const TrackUsageDataSchema = z.object({
  metric: z.string(),
  quantity: z.number().nonnegative(),
  teamId: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

// ============================================================================
// FORM SCHEMAS
// ============================================================================

export const PaymentFormDataSchema = z.object({
  amount: z.number().positive(),
  currency: CurrencySchema,
  method: PaymentMethodSchema,
  customerId: z.string().optional(),
  description: z.string().optional(),
  saveCard: z.boolean().optional(),
  returnUrl: z.string().url().optional()
});

export const SubscriptionFormDataSchema = z.object({
  customerId: z.string(),
  planId: z.string(),
  paymentMethodId: z.string().optional(),
  trialPeriodDays: z.number().positive().optional()
});

export const InvoiceFormDataSchema = z.object({
  customerId: z.string(),
  subscriptionId: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  lineItems: z.array(z.object({
    description: z.string(),
    quantity: z.number().positive(),
    unitAmount: z.number().positive(),
    taxRate: z.number().min(0).max(1).optional()
  })),
  taxRate: z.number().min(0).max(1).optional(),
  discount: z.number().nonnegative().optional()
});

// ============================================================================
// UTILITY SCHEMAS
// ============================================================================

export const PaymentListItemSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  currency: CurrencySchema,
  status: PaymentStatusSchema,
  method: PaymentMethodSchema,
  customerName: z.string(),
  customerEmail: z.string().email(),
  description: z.string().optional(),
  createdAt: z.string(),
  processedAt: z.string().optional(),
  failureReason: z.string().optional(),
  refundedAmount: z.number().nonnegative().optional()
});

export const SubscriptionListItemSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  planName: z.string(),
  status: SubscriptionStatusSchema,
  amount: z.number().positive(),
  currency: CurrencySchema,
  interval: z.string(),
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  cancelAtPeriodEnd: z.boolean(),
  trialEnd: z.string().optional(),
  createdAt: z.string()
});

export const InvoiceListItemSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  status: InvoiceStatusSchema,
  amount: z.number().positive(),
  currency: CurrencySchema,
  amountPaid: z.number().nonnegative(),
  amountDue: z.number().nonnegative(),
  dueDate: z.string(),
  paidAt: z.string().optional(),
  createdAt: z.string()
});

export const PaymentMethodListItemSchema = z.object({
  id: z.string(),
  type: PaymentMethodSchema,
  last4: z.string().optional(),
  brand: z.string().optional(),
  expMonth: z.number().min(1).max(12).optional(),
  expYear: z.number().min(2020).optional(),
  isDefault: z.boolean(),
  createdAt: z.string()
});

export const PaymentStatsSchema = z.object({
  totalRevenue: z.number().nonnegative(),
  monthlyRevenue: z.number().nonnegative(),
  totalTransactions: z.number().nonnegative(),
  activeSubscriptions: z.number().nonnegative(),
  revenueGrowth: z.number(),
  transactionGrowth: z.number(),
  subscriptionGrowth: z.number(),
  averageTransactionValue: z.number().nonnegative(),
  conversionRate: z.number().min(0).max(1),
  churnRate: z.number().min(0).max(1),
  mrr: z.number().nonnegative(),
  arr: z.number().nonnegative()
});

export const SubscriptionStatsSchema = z.object({
  totalSubscriptions: z.number().nonnegative(),
  activeSubscriptions: z.number().nonnegative(),
  cancelledSubscriptions: z.number().nonnegative(),
  trialingSubscriptions: z.number().nonnegative(),
  pastDueSubscriptions: z.number().nonnegative(),
  totalRevenue: z.number().nonnegative(),
  monthlyRevenue: z.number().nonnegative(),
  averageRevenuePerUser: z.number().nonnegative(),
  churnRate: z.number().min(0).max(1),
  growthRate: z.number()
});

export const InvoiceStatsSchema = z.object({
  totalInvoices: z.number().nonnegative(),
  paidInvoices: z.number().nonnegative(),
  unpaidInvoices: z.number().nonnegative(),
  overdueInvoices: z.number().nonnegative(),
  totalAmount: z.number().nonnegative(),
  paidAmount: z.number().nonnegative(),
  unpaidAmount: z.number().nonnegative(),
  overdueAmount: z.number().nonnegative(),
  averageInvoiceValue: z.number().nonnegative(),
  collectionRate: z.number().min(0).max(1)
});
