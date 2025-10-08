import type Stripe from 'stripe';

export type StripeCustomer = Stripe.Customer;
export type StripeSubscription = Stripe.Subscription;
export type StripeInvoice = Stripe.Invoice;
export type StripePaymentIntent = Stripe.PaymentIntent;
export type StripeProduct = Stripe.Product;
export type StripePrice = Stripe.Price;

export interface CreateCustomerParams {
  email: string;
  name?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface CreateSubscriptionParams {
  customer: string;
  items: Array<{
    price: string;
    quantity?: number;
  }>;
  trial_period_days?: number;
  metadata?: Record<string, string>;
}

export interface CreateInvoiceParams {
  customer: string;
  description?: string;
  metadata?: Record<string, string>;
  auto_advance?: boolean;
}

export interface CreatePaymentIntentParams {
  amount: number;
  currency: string;
  customer?: string;
  description?: string;
  metadata?: Record<string, string>;
  automatic_payment_methods?: {
    enabled: boolean;
  };
}

export interface CreateProductParams {
  name: string;
  description?: string;
  images?: string[];
  metadata?: Record<string, string>;
  active?: boolean;
}

export interface CreatePriceParams {
  product: string;
  unit_amount: number;
  currency: string;
  recurring?: {
    interval: 'day' | 'week' | 'month' | 'year';
    interval_count?: number;
  };
  metadata?: Record<string, string>;
}
