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

export interface PaymentMethod {
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

export interface PaymentWebhookEvent {
  id: string;
  type: string;
  data: {
    object: Payment | Subscription | Invoice | Refund;
  };
  created: number;
  livemode: boolean;
}

export interface PaymentError {
  code: string;
  message: string;
  type: 'card_error' | 'invalid_request_error' | 'api_error' | 'authentication_error';
  decline_code?: string;
  param?: string;
}
