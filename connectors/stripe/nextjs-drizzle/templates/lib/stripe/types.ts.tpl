/**
 * Stripe Types
 * 
 * TypeScript types for Stripe integration with organization billing.
 * These types define the data structures used throughout the Stripe connector.
 */

import Stripe from 'stripe';

// ============================================================================
// ORGANIZATION BILLING TYPES
// ============================================================================

export interface OrganizationSubscription {
  id: string;
  organizationId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid';
  planId: string;
  planName: string;
  planAmount: number; // in cents
  planInterval: 'month' | 'year';
  seatsIncluded: number;
  seatsAdditional: number;
  seatsTotal: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialStart?: Date;
  trialEnd?: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationCustomer {
  id: string;
  organizationId: string;
  stripeCustomerId: string;
  email: string;
  name: string;
  address?: Stripe.Address;
  taxId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SeatInfo {
  current: number;
  included: number;
  additional: number;
  total: number;
  cost: number; // cost of additional seats in cents
  pricePerSeat: number; // price per additional seat in cents
}

export interface SeatHistory {
  id: string;
  organizationId: string;
  subscriptionId: string;
  previousSeats: number;
  newSeats: number;
  changedBy: string;
  reason: 'member_added' | 'manual_increase' | 'manual_decrease' | 'plan_change';
  createdAt: Date;
}

export interface OrganizationUsage {
  organizationId: string;
  teamId?: string;
  period: {
    start: Date;
    end: Date;
  };
  metrics: {
    apiCalls: number;
    storage: number; // in GB
    computeTime: number; // in hours
    [key: string]: number;
  };
  costs: {
    base: number; // base subscription cost
    seats: number; // additional seats cost
    usage: number; // usage-based costs
    total: number; // total for period
  };
  lastUpdated: Date;
}

export interface BillingInfo {
  organizationId: string;
  stripeCustomerId: string;
  paymentMethod: {
    type: 'card' | 'bank_account';
    last4: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
  };
  email: string;
  name: string;
  address?: Stripe.Address;
  taxId?: string;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface CreateOrgSubscriptionData {
  organizationId: string;
  planId: string;
  paymentMethodId: string;
  seats?: number;
  trialDays?: number;
  metadata?: Record<string, any>;
}

export interface UpdateOrgSubscriptionData {
  planId?: string;
  seats?: number;
  cancelAtPeriodEnd?: boolean;
  metadata?: Record<string, any>;
}

export interface CreateOrgCustomerData {
  organizationId: string;
  email: string;
  name: string;
  address?: Stripe.Address;
  taxId?: string;
}

export interface UpdateSeatsData {
  seats: number;
  reason?: string;
}

export interface TrackUsageData {
  metric: string;
  quantity: number;
  teamId?: string;
  metadata?: Record<string, any>;
}

export interface UpdateBillingInfoData {
  email?: string;
  name?: string;
  address?: Stripe.Address;
  taxId?: string;
}

// ============================================================================
// STRIPE INTEGRATION TYPES
// ============================================================================

export interface StripeSubscriptionWithMetadata extends Stripe.Subscription {
  metadata: {
    organizationId: string;
    planId: string;
    seatsIncluded: string;
    seatsAdditional: string;
  };
}

export interface StripeCustomerWithMetadata extends Stripe.Customer {
  metadata: {
    organizationId: string;
  };
}

export interface StripeInvoiceWithMetadata extends Stripe.Invoice {
  metadata: {
    organizationId: string;
  };
}

// ============================================================================
// PERMISSION TYPES
// ============================================================================

export type BillingPermission = 
  | 'view_subscription'
  | 'create_subscription'
  | 'update_subscription'
  | 'cancel_subscription'
  | 'view_billing_info'
  | 'update_billing_info'
  | 'view_invoices'
  | 'download_invoices'
  | 'manage_seats'
  | 'view_usage'
  | 'track_usage';

export interface PermissionCheck {
  organizationId: string;
  userId: string;
  permission: BillingPermission;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface StripeError extends Error {
  code: string;
  type: 'card_error' | 'invalid_request_error' | 'api_error' | 'authentication_error';
  decline_code?: string;
  param?: string;
}

export interface BillingError extends Error {
  code: string;
  type: 'permission_error' | 'validation_error' | 'business_error' | 'system_error';
  organizationId?: string;
  userId?: string;
}

// ============================================================================
// WEBHOOK TYPES
// ============================================================================

export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
  livemode: boolean;
}

export interface WebhookHandler {
  eventType: string;
  handler: (event: WebhookEvent) => Promise<void>;
}
