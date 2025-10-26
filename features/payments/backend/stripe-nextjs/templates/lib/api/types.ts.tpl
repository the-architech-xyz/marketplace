/**
 * API Types and Contracts
 * 
 * TypeScript types for the Stripe connector API endpoints.
 * These types define the request/response shapes for all API routes.
 */

// ============================================================================
// ORGANIZATION SUBSCRIPTION API TYPES
// ============================================================================

export interface CreateOrgSubscriptionRequest {
  planId: string;
  paymentMethodId: string;
  seats?: number;
  trialDays?: number;
  metadata?: Record<string, any>;
}

export interface CreateOrgSubscriptionResponse {
  id: string;
  organizationId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid';
  planId: string;
  planName: string;
  planAmount: number;
  planInterval: 'month' | 'year';
  seatsIncluded: number;
  seatsAdditional: number;
  seatsTotal: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialStart?: string;
  trialEnd?: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrgSubscriptionRequest {
  planId?: string;
  cancelAtPeriodEnd?: boolean;
  metadata?: Record<string, any>;
}

export interface UpdateOrgSubscriptionResponse extends CreateOrgSubscriptionResponse {}

export interface GetOrgSubscriptionResponse extends CreateOrgSubscriptionResponse {}

// ============================================================================
// ORGANIZATION SEATS API TYPES
// ============================================================================

export interface GetOrgSeatsResponse {
  current: number;
  included: number;
  additional: number;
  total: number;
  cost: number;
  pricePerSeat: number;
}

export interface UpdateOrgSeatsRequest {
  seats: number;
  reason?: string;
}

export interface UpdateOrgSeatsResponse extends GetOrgSeatsResponse {}

export interface GetOrgSeatHistoryResponse {
  id: string;
  organizationId: string;
  subscriptionId: string;
  previousSeats: number;
  newSeats: number;
  changedBy: string;
  reason: 'member_added' | 'manual_increase' | 'manual_decrease' | 'plan_change';
  createdAt: string;
}

export interface GetOrgSeatHistoryRequest {
  limit?: number;
  offset?: number;
}

// ============================================================================
// ORGANIZATION BILLING INFO API TYPES
// ============================================================================

export interface GetOrgBillingInfoResponse {
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
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  taxId?: string;
}

export interface UpdateOrgBillingInfoRequest {
  email?: string;
  name?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  taxId?: string;
}

export interface UpdateOrgBillingInfoResponse extends GetOrgBillingInfoResponse {}

// ============================================================================
// ORGANIZATION INVOICES API TYPES
// ============================================================================

export interface GetOrgInvoicesResponse {
  id: string;
  organizationId: string;
  stripeInvoiceId: string;
  stripeSubscriptionId?: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  amount: number;
  amountPaid: number;
  amountDue: number;
  subtotal: number;
  tax?: number;
  discount?: number;
  currency: string;
  description?: string;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  lineItems: InvoiceLineItem[];
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
  taxRate?: number;
}

export interface GetOrgInvoicesRequest {
  limit?: number;
  offset?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// ============================================================================
// ORGANIZATION USAGE API TYPES
// ============================================================================

export interface GetOrgUsageResponse {
  organizationId: string;
  teamId?: string;
  period: {
    start: string;
    end: string;
  };
  metrics: {
    apiCalls: number;
    storage: number;
    computeTime: number;
    [key: string]: number;
  };
  costs: {
    base: number;
    seats: number;
    usage: number;
    total: number;
  };
  lastUpdated: string;
}

export interface TrackUsageRequest {
  metric: string;
  quantity: number;
  teamId?: string;
  metadata?: Record<string, any>;
}

export interface TrackUsageResponse {
  success: boolean;
  usageId: string;
}

// ============================================================================
// ERROR RESPONSE TYPES
// ============================================================================

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    type: 'validation_error' | 'permission_error' | 'business_error' | 'system_error';
    organizationId?: string;
    userId?: string;
    details?: Record<string, any>;
  };
}

// ============================================================================
// SUCCESS RESPONSE TYPES
// ============================================================================

export interface ApiSuccessResponse<T = any> {
  data: T;
  message?: string;
  timestamp: string;
}

// ============================================================================
// PAGINATION TYPES
// ============================================================================

export interface PaginationRequest {
  limit?: number;
  offset?: number;
}

export interface PaginationResponse {
  data: any[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };
}

// ============================================================================
// WEBHOOK TYPES
// ============================================================================

export interface WebhookResponse {
  received: boolean;
  eventId?: string;
  eventType?: string;
}

// ============================================================================
// API ENDPOINT TYPES
// ============================================================================

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requestType?: any;
  responseType?: any;
  errorTypes?: string[];
}

// ============================================================================
// API CONTRACT DEFINITION
// ============================================================================

export const API_CONTRACT: Record<string, ApiEndpoint> = {
  // Organization Subscriptions
  'GET /api/organizations/{orgId}/subscriptions': {
    method: 'GET',
    path: '/api/organizations/{orgId}/subscriptions',
    description: 'Get organization subscription',
    responseType: 'GetOrgSubscriptionResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'SUBSCRIPTION_NOT_FOUND'],
  },
  'POST /api/organizations/{orgId}/subscriptions': {
    method: 'POST',
    path: '/api/organizations/{orgId}/subscriptions',
    description: 'Create organization subscription',
    requestType: 'CreateOrgSubscriptionRequest',
    responseType: 'CreateOrgSubscriptionResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'VALIDATION_ERROR'],
  },
  'PUT /api/organizations/{orgId}/subscriptions': {
    method: 'PUT',
    path: '/api/organizations/{orgId}/subscriptions',
    description: 'Update organization subscription',
    requestType: 'UpdateOrgSubscriptionRequest',
    responseType: 'UpdateOrgSubscriptionResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'VALIDATION_ERROR'],
  },
  'DELETE /api/organizations/{orgId}/subscriptions': {
    method: 'DELETE',
    path: '/api/organizations/{orgId}/subscriptions',
    description: 'Cancel organization subscription',
    responseType: 'UpdateOrgSubscriptionResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'VALIDATION_ERROR'],
  },
  
  // Organization Seats
  'GET /api/organizations/{orgId}/seats': {
    method: 'GET',
    path: '/api/organizations/{orgId}/seats',
    description: 'Get organization seat information',
    responseType: 'GetOrgSeatsResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'SEATS_NOT_FOUND'],
  },
  'PUT /api/organizations/{orgId}/seats': {
    method: 'PUT',
    path: '/api/organizations/{orgId}/seats',
    description: 'Update organization seats',
    requestType: 'UpdateOrgSeatsRequest',
    responseType: 'UpdateOrgSeatsResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'VALIDATION_ERROR', 'BUSINESS_ERROR'],
  },
  'GET /api/organizations/{orgId}/seats/history': {
    method: 'GET',
    path: '/api/organizations/{orgId}/seats/history',
    description: 'Get organization seat history',
    requestType: 'GetOrgSeatHistoryRequest',
    responseType: 'GetOrgSeatHistoryResponse[]',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED'],
  },
  
  // Organization Billing Info
  'GET /api/organizations/{orgId}/billing': {
    method: 'GET',
    path: '/api/organizations/{orgId}/billing',
    description: 'Get organization billing information',
    responseType: 'GetOrgBillingInfoResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'BILLING_INFO_NOT_FOUND'],
  },
  'PUT /api/organizations/{orgId}/billing': {
    method: 'PUT',
    path: '/api/organizations/{orgId}/billing',
    description: 'Update organization billing information',
    requestType: 'UpdateOrgBillingInfoRequest',
    responseType: 'UpdateOrgBillingInfoResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'VALIDATION_ERROR'],
  },
  
  // Organization Invoices
  'GET /api/organizations/{orgId}/invoices': {
    method: 'GET',
    path: '/api/organizations/{orgId}/invoices',
    description: 'Get organization invoices',
    requestType: 'GetOrgInvoicesRequest',
    responseType: 'GetOrgInvoicesResponse[]',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED'],
  },
  
  // Organization Usage
  'GET /api/organizations/{orgId}/usage': {
    method: 'GET',
    path: '/api/organizations/{orgId}/usage',
    description: 'Get organization usage',
    responseType: 'GetOrgUsageResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED'],
  },
  'POST /api/organizations/{orgId}/usage': {
    method: 'POST',
    path: '/api/organizations/{orgId}/usage',
    description: 'Track organization usage',
    requestType: 'TrackUsageRequest',
    responseType: 'TrackUsageResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'VALIDATION_ERROR'],
  },
  
  // Team Usage
  'GET /api/organizations/{orgId}/teams/{teamId}/usage': {
    method: 'GET',
    path: '/api/organizations/{orgId}/teams/{teamId}/usage',
    description: 'Get team usage',
    responseType: 'GetOrgUsageResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED'],
  },
  'POST /api/organizations/{orgId}/teams/{teamId}/usage': {
    method: 'POST',
    path: '/api/organizations/{orgId}/teams/{teamId}/usage',
    description: 'Track team usage',
    requestType: 'TrackUsageRequest',
    responseType: 'TrackUsageResponse',
    errorTypes: ['UNAUTHORIZED', 'PERMISSION_DENIED', 'VALIDATION_ERROR'],
  },
  
  // Webhooks
  'POST /api/webhooks/stripe': {
    method: 'POST',
    path: '/api/webhooks/stripe',
    description: 'Handle Stripe webhook events',
    responseType: 'WebhookResponse',
    errorTypes: ['MISSING_SIGNATURE', 'INVALID_SIGNATURE', 'WEBHOOK_PROCESSING_ERROR'],
  },
};
