/**
 * Payments Database Schema (Provider-Agnostic)
 * 
 * This schema supports payments from ANY provider (Stripe, Paddle, custom API, etc.)
 * The schema represents the PAYMENTS FEATURE, not a specific payment provider.
 * 
 * Key Design Principles:
 * - All tables use generic naming (payment_*, not stripe_*)
 * - Provider identification via `paymentProvider` field
 * - Provider-specific IDs stored in `provider*Id` fields
 * - Works with Stripe, Paddle, LemonSqueezy, custom backends, etc.
 */

import { pgTable, text, timestamp, integer, boolean, jsonb, decimal } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// ============================================================================
// PAYMENT CUSTOMERS
// ============================================================================

/**
 * Payment Customers Table
 * 
 * Stores billing customer information for any payment provider.
 * Each organization has one customer record per payment provider.
 */
export const paymentCustomers = pgTable('payment_customers', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  
  // Provider identification
  paymentProvider: text('payment_provider').notNull(), // 'stripe', 'paddle', 'custom', etc.
  providerCustomerId: text('provider_customer_id').notNull(), // Provider's customer ID
  
  // Customer details
  email: text('email').notNull(),
  name: text('name').notNull(),
  address: jsonb('address'), // Billing address (provider-agnostic format)
  taxId: text('tax_id'), // Tax identification number
  
  // Metadata
  metadata: jsonb('metadata'), // Additional provider-specific data
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// PAYMENT SUBSCRIPTIONS
// ============================================================================

/**
 * Payment Subscriptions Table
 * 
 * Stores subscription information for any payment provider.
 * Works with Stripe subscriptions, Paddle subscriptions, custom billing, etc.
 */
export const paymentSubscriptions = pgTable('payment_subscriptions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  customerId: text('customer_id').notNull(), // References payment_customers.id
  
  // Provider identification
  paymentProvider: text('payment_provider').notNull(), // 'stripe', 'paddle', 'custom', etc.
  providerSubscriptionId: text('provider_subscription_id').notNull(), // Provider's subscription ID
  
  // Subscription status
  status: text('status').notNull(), // 'active', 'trialing', 'past_due', 'canceled', 'unpaid'
  
  // Plan details
  planId: text('plan_id').notNull(), // 'starter', 'pro', 'enterprise'
  planName: text('plan_name').notNull(),
  planAmount: integer('plan_amount').notNull(), // in cents
  planInterval: text('plan_interval').notNull(), // 'month', 'year'
  currency: text('currency').notNull().default('usd'),
  
  // Seat management
  seatsIncluded: integer('seats_included').notNull().default(5),
  seatsAdditional: integer('seats_additional').notNull().default(0),
  seatsTotal: integer('seats_total').notNull(),
  
  // Billing periods
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  trialStart: timestamp('trial_start'),
  trialEnd: timestamp('trial_end'),
  
  // Cancellation
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  canceledAt: timestamp('canceled_at'),
  
  // Metadata
  metadata: jsonb('metadata'), // Additional provider-specific data
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// SEAT HISTORY (AUDIT TRAIL)
// ============================================================================

/**
 * Seat History Table
 * 
 * Tracks changes to seat allocations over time.
 * Provider-agnostic audit trail.
 */
export const seatHistory = pgTable('seat_history', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  subscriptionId: text('subscription_id').notNull(), // References payment_subscriptions.id
  previousSeats: integer('previous_seats').notNull(),
  newSeats: integer('new_seats').notNull(),
  changedBy: text('changed_by').notNull(), // References users.id
  reason: text('reason').notNull(), // 'member_added', 'manual_increase', 'manual_decrease', 'plan_change'
  metadata: jsonb('metadata'), // Additional context
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================================
// USAGE TRACKING
// ============================================================================

/**
 * Usage Tracking Table
 * 
 * Tracks usage metrics for metered billing (API calls, storage, compute, etc.)
 * Works with any provider's usage-based billing system.
 */
export const usageTracking = pgTable('usage_tracking', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  teamId: text('team_id'), // References teams.id (optional for org-level usage)
  subscriptionId: text('subscription_id'), // References payment_subscriptions.id (if linked to subscription)
  
  // Usage details
  metric: text('metric').notNull(), // 'api_calls', 'storage', 'compute_time', etc.
  quantity: integer('quantity').notNull(),
  period: text('period').notNull(), // '2025-01' format (YYYY-MM)
  
  // Provider reference (if reported to provider)
  paymentProvider: text('payment_provider'), // 'stripe', 'paddle', null if not reported
  providerUsageRecordId: text('provider_usage_record_id'), // Provider's usage record ID
  reportedAt: timestamp('reported_at'), // When usage was reported to provider
  
  // Metadata
  metadata: jsonb('metadata'), // Additional usage context
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================================
// BILLING INFO
// ============================================================================

/**
 * Billing Info Table
 * 
 * Stores organization-level billing information.
 * Consolidated view of payment details.
 */
export const billingInfo = pgTable('billing_info', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull().unique(), // References organizations.id
  
  // Provider identification
  paymentProvider: text('payment_provider').notNull(),
  providerCustomerId: text('provider_customer_id').notNull(),
  
  // Payment method details
  paymentMethodId: text('payment_method_id'), // Provider's payment method ID
  paymentMethodType: text('payment_method_type'), // 'card', 'bank_account'
  paymentMethodLast4: text('payment_method_last4'),
  paymentMethodBrand: text('payment_method_brand'), // 'visa', 'mastercard', etc.
  paymentMethodExpiryMonth: integer('payment_method_expiry_month'),
  paymentMethodExpiryYear: integer('payment_method_expiry_year'),
  
  // Billing contact
  billingEmail: text('billing_email').notNull(),
  billingName: text('billing_name').notNull(),
  billingAddress: jsonb('billing_address'), // Address object
  taxId: text('tax_id'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// INVOICES
// ============================================================================

/**
 * Invoices Table
 * 
 * Stores invoice records from any payment provider.
 */
export const invoices = pgTable('invoices', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  subscriptionId: text('subscription_id'), // References payment_subscriptions.id
  
  // Provider identification
  paymentProvider: text('payment_provider').notNull(),
  providerInvoiceId: text('provider_invoice_id').notNull(), // Provider's invoice ID
  
  // Invoice status
  status: text('status').notNull(), // 'draft', 'open', 'paid', 'void', 'uncollectible'
  
  // Amounts (in cents)
  amount: integer('amount').notNull(),
  amountPaid: integer('amount_paid').notNull().default(0),
  amountDue: integer('amount_due').notNull(),
  subtotal: integer('subtotal').notNull(),
  tax: integer('tax').default(0),
  discount: integer('discount').default(0),
  currency: text('currency').notNull().default('usd'),
  
  // Invoice details
  description: text('description'),
  invoiceNumber: text('invoice_number'), // Human-readable invoice number
  dueDate: timestamp('due_date').notNull(),
  paidAt: timestamp('paid_at'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// INVOICE LINE ITEMS
// ============================================================================

/**
 * Invoice Line Items Table
 * 
 * Stores individual line items for invoices.
 */
export const invoiceLineItems = pgTable('invoice_line_items', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  invoiceId: text('invoice_id').notNull(), // References invoices.id
  
  // Provider identification (optional)
  providerLineItemId: text('provider_line_item_id'), // Provider's line item ID
  
  // Line item details
  description: text('description').notNull(),
  quantity: integer('quantity').notNull().default(1),
  unitAmount: integer('unit_amount').notNull(), // in cents
  totalAmount: integer('total_amount').notNull(), // in cents
  taxRate: decimal('tax_rate', { precision: 5, scale: 4 }), // 0.0000 to 1.0000
  
  // Metadata
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ============================================================================
// PAYMENT METHODS
// ============================================================================

/**
 * Payment Methods Table
 * 
 * Stores saved payment methods for organizations.
 */
export const paymentMethods = pgTable('payment_methods', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  
  // Provider identification
  paymentProvider: text('payment_provider').notNull(),
  providerPaymentMethodId: text('provider_payment_method_id').notNull(), // Provider's payment method ID
  
  // Payment method details
  type: text('type').notNull(), // 'card', 'bank_account'
  last4: text('last4'),
  brand: text('brand'), // 'visa', 'mastercard', etc.
  expMonth: integer('exp_month'),
  expYear: integer('exp_year'),
  isDefault: boolean('is_default').notNull().default(false),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ============================================================================
// REFUNDS
// ============================================================================

/**
 * Refunds Table
 * 
 * Tracks refunds issued through any payment provider.
 */
export const refunds = pgTable('refunds', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  
  // Provider identification
  paymentProvider: text('payment_provider').notNull(),
  providerRefundId: text('provider_refund_id').notNull(), // Provider's refund ID
  providerPaymentIntentId: text('provider_payment_intent_id').notNull(), // Provider's payment intent ID
  
  // Refund details
  amount: integer('amount').notNull(), // in cents
  currency: text('currency').notNull().default('usd'),
  status: text('status').notNull(), // 'succeeded', 'pending', 'failed', 'canceled'
  reason: text('reason').notNull(), // 'duplicate', 'fraudulent', 'requested_by_customer', 'other'
  description: text('description'),
  
  // Metadata
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  processedAt: timestamp('processed_at'),
});

// ============================================================================
// TRANSACTIONS
// ============================================================================

/**
 * Transactions Table
 * 
 * Stores all payment transactions (successful and failed).
 * Provides a unified audit trail across all payment providers.
 */
export const transactions = pgTable('transactions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').notNull(), // References organizations.id
  subscriptionId: text('subscription_id'), // References payment_subscriptions.id (if subscription payment)
  invoiceId: text('invoice_id'), // References invoices.id (if linked to invoice)
  
  // Provider identification
  paymentProvider: text('payment_provider').notNull(),
  providerTransactionId: text('provider_transaction_id').notNull(), // Provider's transaction ID
  providerPaymentIntentId: text('provider_payment_intent_id'), // Provider's payment intent ID
  
  // Transaction details
  amount: integer('amount').notNull(), // in cents
  currency: text('currency').notNull().default('usd'),
  status: text('status').notNull(), // 'succeeded', 'failed', 'pending', 'canceled'
  type: text('type').notNull(), // 'subscription', 'one_time', 'refund', 'adjustment'
  description: text('description'),
  
  // Failure details
  failureCode: text('failure_code'),
  failureMessage: text('failure_message'),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  processedAt: timestamp('processed_at'),
});

// ============================================================================
// INDEXES (for performance)
// ============================================================================

// Payment customers indexes
export const paymentCustomersIndexes = {
  organizationId: paymentCustomers.organizationId,
  paymentProvider: paymentCustomers.paymentProvider,
  providerCustomerId: paymentCustomers.providerCustomerId,
};

// Payment subscriptions indexes
export const paymentSubscriptionsIndexes = {
  organizationId: paymentSubscriptions.organizationId,
  customerId: paymentSubscriptions.customerId,
  paymentProvider: paymentSubscriptions.paymentProvider,
  providerSubscriptionId: paymentSubscriptions.providerSubscriptionId,
  status: paymentSubscriptions.status,
};

// Usage tracking indexes
export const usageTrackingIndexes = {
  organizationId: usageTracking.organizationId,
  teamId: usageTracking.teamId,
  subscriptionId: usageTracking.subscriptionId,
  period: usageTracking.period,
  metric: usageTracking.metric,
};

// Seat history indexes
export const seatHistoryIndexes = {
  organizationId: seatHistory.organizationId,
  subscriptionId: seatHistory.subscriptionId,
  changedBy: seatHistory.changedBy,
};

// Invoice indexes
export const invoicesIndexes = {
  organizationId: invoices.organizationId,
  subscriptionId: invoices.subscriptionId,
  paymentProvider: invoices.paymentProvider,
  providerInvoiceId: invoices.providerInvoiceId,
  status: invoices.status,
};

// Transaction indexes
export const transactionsIndexes = {
  organizationId: transactions.organizationId,
  subscriptionId: transactions.subscriptionId,
  invoiceId: transactions.invoiceId,
  paymentProvider: transactions.paymentProvider,
  status: transactions.status,
  type: transactions.type,
};
