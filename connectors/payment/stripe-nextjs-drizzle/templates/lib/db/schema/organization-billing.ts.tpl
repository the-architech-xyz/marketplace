/**
 * Organization Billing Database Schema
 * 
 * Drizzle schema for organization billing with Stripe integration.
 * This schema supports organization-level subscriptions, seat management, and usage tracking.
 */

import { pgTable, text, timestamp, integer, boolean, jsonb, decimal } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// ============================================================================
// ORGANIZATION STRIPE CUSTOMERS
// ============================================================================

export const organizationStripeCustomers = pgTable('organization_stripe_customers', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  stripeCustomerId: text('stripe_customer_id').notNull().unique(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  address: jsonb('address'), // Stripe.Address
  taxId: text('tax_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// ORGANIZATION SUBSCRIPTIONS
// ============================================================================

export const organizationSubscriptions = pgTable('organization_subscriptions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id').notNull(),
  status: text('status').notNull(), // active, trialing, past_due, canceled, unpaid
  planId: text('plan_id').notNull(), // starter, pro, enterprise
  planName: text('plan_name').notNull(),
  planAmount: integer('plan_amount').notNull(), // in cents
  planInterval: text('plan_interval').notNull(), // month, year
  seatsIncluded: integer('seats_included').notNull().default(5),
  seatsAdditional: integer('seats_additional').notNull().default(0),
  seatsTotal: integer('seats_total').notNull(),
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  trialStart: timestamp('trial_start'),
  trialEnd: timestamp('trial_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  canceledAt: timestamp('canceled_at'),
  metadata: jsonb('metadata'), // Additional metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// SEAT HISTORY (AUDIT TRAIL)
// ============================================================================

export const organizationSeatHistory = pgTable('organization_seat_history', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  subscriptionId: text('subscription_id').notNull(), // References organization_subscriptions.id
  previousSeats: integer('previous_seats').notNull(),
  newSeats: integer('new_seats').notNull(),
  changedBy: text('changed_by').notNull(), // References users.id
  reason: text('reason').notNull(), // member_added, manual_increase, manual_decrease, plan_change
  metadata: jsonb('metadata'), // Additional context
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================================
// ORGANIZATION USAGE TRACKING
// ============================================================================

export const organizationUsage = pgTable('organization_usage', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  teamId: text('team_id'), // References teams.id (optional for org-level usage)
  metric: text('metric').notNull(), // api_calls, storage, compute_time, etc.
  quantity: integer('quantity').notNull(),
  period: text('period').notNull(), // 2025-01 format
  stripeUsageRecordId: text('stripe_usage_record_id'), // Stripe usage record ID
  metadata: jsonb('metadata'), // Additional usage context
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================================
// ORGANIZATION BILLING INFO
// ============================================================================

export const organizationBillingInfo = pgTable('organization_billing_info', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull().unique(), // References organizations.id
  stripeCustomerId: text('stripe_customer_id').notNull(),
  paymentMethodId: text('payment_method_id'), // Stripe payment method ID
  paymentMethodType: text('payment_method_type'), // card, bank_account
  paymentMethodLast4: text('payment_method_last4'),
  paymentMethodBrand: text('payment_method_brand'), // visa, mastercard, etc.
  paymentMethodExpiryMonth: integer('payment_method_expiry_month'),
  paymentMethodExpiryYear: integer('payment_method_expiry_year'),
  billingEmail: text('billing_email').notNull(),
  billingName: text('billing_name').notNull(),
  billingAddress: jsonb('billing_address'), // Stripe.Address
  taxId: text('tax_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// ORGANIZATION INVOICES
// ============================================================================

export const organizationInvoices = pgTable('organization_invoices', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  stripeInvoiceId: text('stripe_invoice_id').notNull().unique(),
  stripeSubscriptionId: text('stripe_subscription_id'), // References organization_subscriptions.stripe_subscription_id
  status: text('status').notNull(), // draft, open, paid, void, uncollectible
  amount: integer('amount').notNull(), // in cents
  amountPaid: integer('amount_paid').notNull().default(0),
  amountDue: integer('amount_due').notNull(),
  subtotal: integer('subtotal').notNull(),
  tax: integer('tax').default(0),
  discount: integer('discount').default(0),
  currency: text('currency').notNull().default('usd'),
  description: text('description'),
  dueDate: timestamp('due_date').notNull(),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// ORGANIZATION INVOICE LINE ITEMS
// ============================================================================

export const organizationInvoiceLineItems = pgTable('organization_invoice_line_items', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  invoiceId: text('invoice_id').notNull(), // References organization_invoices.id
  stripeLineItemId: text('stripe_line_item_id'), // Stripe line item ID
  description: text('description').notNull(),
  quantity: integer('quantity').notNull().default(1),
  unitAmount: integer('unit_amount').notNull(), // in cents
  totalAmount: integer('total_amount').notNull(), // in cents
  taxRate: decimal('tax_rate', { precision: 5, scale: 4 }), // 0.0000 to 1.0000
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================================
// ORGANIZATION PAYMENT METHODS
// ============================================================================

export const organizationPaymentMethods = pgTable('organization_payment_methods', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  stripePaymentMethodId: text('stripe_payment_method_id').notNull().unique(),
  type: text('type').notNull(), // card, bank_account
  last4: text('last4'),
  brand: text('brand'), // visa, mastercard, etc.
  expMonth: integer('exp_month'),
  expYear: integer('exp_year'),
  isDefault: boolean('is_default').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// ORGANIZATION REFUNDS
// ============================================================================

export const organizationRefunds = pgTable('organization_refunds', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  stripeRefundId: text('stripe_refund_id').notNull().unique(),
  stripePaymentIntentId: text('stripe_payment_intent_id').notNull(),
  amount: integer('amount').notNull(), // in cents
  currency: text('currency').notNull().default('usd'),
  status: text('status').notNull(), // succeeded, pending, failed, canceled
  reason: text('reason').notNull(), // duplicate, fraudulent, requested_by_customer, other
  description: text('description'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  processedAt: timestamp('processed_at'),
});

// ============================================================================
// INDEXES (for performance)
// ============================================================================

// Organization subscriptions indexes
export const organizationSubscriptionsIndexes = {
  organizationId: organizationSubscriptions.organizationId,
  stripeSubscriptionId: organizationSubscriptions.stripeSubscriptionId,
  status: organizationSubscriptions.status,
};

// Organization usage indexes
export const organizationUsageIndexes = {
  organizationId: organizationUsage.organizationId,
  teamId: organizationUsage.teamId,
  period: organizationUsage.period,
  metric: organizationUsage.metric,
};

// Seat history indexes
export const organizationSeatHistoryIndexes = {
  organizationId: organizationSeatHistory.organizationId,
  subscriptionId: organizationSeatHistory.subscriptionId,
  changedBy: organizationSeatHistory.changedBy,
};

// Invoice indexes
export const organizationInvoicesIndexes = {
  organizationId: organizationInvoices.organizationId,
  stripeInvoiceId: organizationInvoices.stripeInvoiceId,
  status: organizationInvoices.status,
};
