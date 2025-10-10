/**
 * Payment Feature Contract - Cohesive Business Hook Services
 * 
 * This is the single source of truth for the Payment feature.
 * All backend implementations must implement the IPaymentService interface.
 * All frontend implementations must consume the IPaymentService interface.
 * 
 * The contract defines cohesive business services, not individual hooks.
 */

// Note: TanStack Query types are imported by the implementing service, not the contract

// ============================================================================
// CORE TYPES
// ============================================================================

export type PaymentStatus = 
  | 'completed' 
  | 'pending' 
  | 'failed' 
  | 'processing' 
  | 'cancelled' 
  | 'refunded';

export type PaymentMethod = 
  | 'card' 
  | 'bank_transfer' 
  | 'paypal' 
  | 'apple_pay' 
  | 'google_pay' 
  | 'crypto' 
  | 'wallet';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'CHF';

export type SubscriptionStatus = 
  | 'active' 
  | 'inactive' 
  | 'cancelled' 
  | 'past_due' 
  | 'unpaid' 
  | 'trialing';

export type InvoiceStatus = 
  | 'draft' 
  | 'open' 
  | 'paid' 
  | 'void' 
  | 'uncollectible';

// ============================================================================
// DATA TYPES
// ============================================================================

export interface Payment {
  id: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  method: PaymentMethod;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  description?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  failureReason?: string;
  refundedAmount?: number;
  refundedAt?: string;
}

export interface PaymentMethodData {
  id: string;
  type: PaymentMethod;
  last4?: string;
  brand?: string;
  expMonth?: number;
  expYear?: number;
  isDefault: boolean;
  createdAt: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  planName: string;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  trialStart?: string;
  trialEnd?: string;
  amount: number;
  currency: Currency;
  interval: 'day' | 'week' | 'month' | 'year';
  intervalCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  customerId: string;
  subscriptionId?: string;
  status: InvoiceStatus;
  amount: number;
  currency: Currency;
  amountPaid: number;
  amountDue: number;
  subtotal: number;
  tax?: number;
  discount?: number;
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

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  clientSecret: string;
  customerId?: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Refund {
  id: string;
  paymentId: string;
  amount: number;
  currency: Currency;
  status: 'succeeded' | 'pending' | 'failed' | 'cancelled';
  reason: 'duplicate' | 'fraudulent' | 'requested_by_customer' | 'other';
  createdAt: string;
  processedAt?: string;
}

// ============================================================================
// INPUT TYPES
// ============================================================================

export interface CreatePaymentData {
  amount: number;
  currency: Currency;
  method: PaymentMethod;
  customerId?: string;
  description?: string;
  metadata?: Record<string, any>;
  saveCard?: boolean;
  returnUrl?: string;
}

export interface CreateSubscriptionData {
  customerId: string;
  planId: string;
  paymentMethodId?: string;
  trialPeriodDays?: number;
  metadata?: Record<string, any>;
}

export interface CreateInvoiceData {
  customerId: string;
  subscriptionId?: string;
  description?: string;
  dueDate?: string;
  lineItems: Omit<InvoiceLineItem, 'id' | 'totalAmount'>[];
  taxRate?: number;
  discount?: number;
  metadata?: Record<string, any>;
}

export interface UpdatePaymentData {
  description?: string;
  metadata?: Record<string, any>;
}

export interface UpdateSubscriptionData {
  planId?: string;
  status?: SubscriptionStatus;
  cancelAtPeriodEnd?: boolean;
  metadata?: Record<string, any>;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface PaymentAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalTransactions: number;
  activeSubscriptions: number;
  revenueGrowth: number;
  transactionGrowth: number;
  subscriptionGrowth: number;
  invoiceGrowth: number;
  averageTransactionValue: number;
  conversionRate: number;
  churnRate: number;
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
}

export interface PaymentFilters {
  status?: PaymentStatus[];
  method?: PaymentMethod[];
  currency?: Currency[];
  dateFrom?: string;
  dateTo?: string;
  amountMin?: number;
  amountMax?: number;
  customerId?: string;
  search?: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface PaymentError {
  code: string;
  message: string;
  type: 'card_error' | 'invalid_request_error' | 'api_error' | 'authentication_error';
  decline_code?: string;
  param?: string;
}

// ============================================================================
// WEBHOOK TYPES
// ============================================================================

export interface PaymentWebhookEvent {
  id: string;
  type: string;
  data: {
    object: Payment | Subscription | Invoice | Refund;
  };
  created: number;
  livemode: boolean;
}

// ============================================================================
// COHESIVE BUSINESS HOOK SERVICES
// ============================================================================

/**
 * Payment Service Contract - Cohesive Business Hook Services
 * 
 * This interface defines cohesive business services that group related functionality.
 * Each service method returns an object containing all related queries and mutations.
 * 
 * Backend implementations must provide this service.
 * Frontend implementations must consume this service.
 */
export interface IPaymentService {
  /**
   * Payment Management Service
   * Provides all payment-related operations in a cohesive interface
   */
  usePayments: () => {
    // Query operations
    list: any; // UseQueryResult<Payment[], Error>
    get: (id: string) => any; // UseQueryResult<Payment, Error>
    
    // Mutation operations
    create: any; // UseMutationResult<Payment, Error, CreatePaymentData>
    update: any; // UseMutationResult<Payment, Error, { id: string; data: UpdatePaymentData }>
    delete: any; // UseMutationResult<void, Error, string>
    refund: any; // UseMutationResult<Refund, Error, { paymentId: string; amount?: number }>
  };

  /**
   * Subscription Management Service
   * Provides all subscription-related operations in a cohesive interface
   */
  useSubscriptions: () => {
    // Query operations
    list: any; // UseQueryResult<Subscription[], Error>
    get: (id: string) => any; // UseQueryResult<Subscription, Error>
    
    // Mutation operations
    create: any; // UseMutationResult<Subscription, Error, CreateSubscriptionData>
    update: any; // UseMutationResult<Subscription, Error, { id: string; data: UpdateSubscriptionData }>
    cancel: any; // UseMutationResult<Subscription, Error, string>
  };

  /**
   * Invoice Management Service
   * Provides all invoice-related operations in a cohesive interface
   */
  useInvoices: () => {
    // Query operations
    list: any; // UseQueryResult<Invoice[], Error>
    get: (id: string) => any; // UseQueryResult<Invoice, Error>
    
    // Mutation operations
    create: any; // UseMutationResult<Invoice, Error, CreateInvoiceData>
    update: any; // UseMutationResult<Invoice, Error, { id: string; data: any }>
  };

  /**
   * Payment Method Management Service
   * Provides all payment method-related operations in a cohesive interface
   */
  usePaymentMethods: () => {
    // Query operations
    list: any; // UseQueryResult<PaymentMethodData[], Error>
    
    // Mutation operations
    create: any; // UseMutationResult<PaymentMethodData, Error, any>
    update: any; // UseMutationResult<PaymentMethodData, Error, { id: string; data: any }>
    delete: any; // UseMutationResult<void, Error, string>
  };

  /**
   * Checkout Service
   * Provides payment session and checkout operations
   */
  useCheckout: () => {
    // Mutation operations
    createSession: any; // UseMutationResult<PaymentIntent, Error, CreatePaymentData>
    createPortalSession: any; // UseMutationResult<{ url: string }, Error, string>
  };

  /**
   * Analytics Service
   * Provides payment analytics and reporting
   */
  useAnalytics: () => {
    // Query operations
    getAnalytics: any; // UseQueryResult<PaymentAnalytics, Error>
  };
}