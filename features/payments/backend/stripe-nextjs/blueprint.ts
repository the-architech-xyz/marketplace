/**
 * Payments Backend Implementation: Stripe + Next.js
 * 
 * This implementation provides the backend logic for the payments capability
 * using Stripe and Next.js. It generates API routes and hooks that fulfill
 * the contract defined in the parent feature's contract.ts.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';

export const paymentsStripeNextjsBlueprint: Blueprint = {
  id: 'payments-backend-stripe-nextjs',
  name: 'Payments Backend (Stripe + Next.js)',
  description: 'Backend implementation for payments capability using Stripe and Next.js',
  actions: [
    // Install Stripe SDK
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'stripe@^14.0.0',
        '@stripe/stripe-js@^2.1.11',
        '@tanstack/react-query@^5.0.0'
      ]
    },

    // Create payments service
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/payments/service.ts',
      content: `/**
 * Payments Service - Stripe Implementation
 * 
 * This service provides the backend implementation for the payments capability
 * using Stripe. It implements all the operations defined in the contract.
 */

import Stripe from 'stripe';
import { 
  Payment, 
  PaymentMethod, 
  Customer, 
  Subscription, 
  Plan, 
  Invoice, 
  PaymentIntent,
  CheckoutSession,
  PaymentAnalytics,
  CreatePaymentIntentData,
  CreateCheckoutSessionData,
  CreateCustomerData,
  UpdateCustomerData,
  CreateSubscriptionData,
  UpdateSubscriptionData,
  CreatePlanData,
  UpdatePlanData
} from '../contract';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export class PaymentsService {
  // Payment operations
  async createPaymentIntent(data: CreatePaymentIntentData): Promise<PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount,
        currency: data.currency,
        customer: data.customerId,
        payment_method: data.paymentMethodId,
        description: data.description,
        metadata: data.metadata || {},
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status as any,
        clientSecret: paymentIntent.client_secret!,
        paymentMethod: paymentIntent.payment_method ? await this.mapPaymentMethod(paymentIntent.payment_method as Stripe.PaymentMethod) : undefined,
        customer: paymentIntent.customer ? await this.getCustomer(paymentIntent.customer as string) : undefined,
        description: paymentIntent.description || undefined,
        metadata: paymentIntent.metadata,
        createdAt: new Date(paymentIntent.created * 1000),
        updatedAt: new Date(paymentIntent.created * 1000),
      };
    } catch (error) {
      throw new Error(\`Failed to create payment intent: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async createCheckoutSession(data: CreateCheckoutSessionData): Promise<CheckoutSession> {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price: data.priceId,
            quantity: 1,
          },
        ],
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        customer_email: data.customerEmail,
        metadata: data.metadata || {},
      });

      return {
        id: session.id,
        url: session.url!,
        successUrl: data.successUrl,
        cancelUrl: data.cancelUrl,
        paymentStatus: session.payment_status as any,
        customerEmail: session.customer_email || undefined,
        amountTotal: session.amount_total || undefined,
        currency: session.currency || undefined,
        metadata: session.metadata,
        expiresAt: new Date(session.expires_at! * 1000),
        createdAt: new Date(session.created * 1000),
      };
    } catch (error) {
      throw new Error(\`Failed to create checkout session: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getPayments(filters?: { status?: string; limit?: number; offset?: number }): Promise<Payment[]> {
    try {
      const params: Stripe.PaymentIntentListParams = {
        limit: filters?.limit || 10,
      };
      
      if (filters?.status) {
        // Map our status to Stripe status
        const stripeStatus = this.mapPaymentStatusToStripe(filters.status);
        if (stripeStatus) {
          params.status = stripeStatus;
        }
      }

      const paymentIntents = await stripe.paymentIntents.list(params);
      
      return Promise.all(paymentIntents.data.map(async (pi) => {
        const customer = pi.customer ? await this.getCustomer(pi.customer as string) : undefined;
        const paymentMethod = pi.payment_method ? await this.mapPaymentMethod(pi.payment_method as Stripe.PaymentMethod) : undefined;
        
        return {
          id: pi.id,
          amount: pi.amount,
          currency: pi.currency,
          status: pi.status as any,
          paymentMethod: paymentMethod!,
          customer: customer!,
          description: pi.description || undefined,
          metadata: pi.metadata,
          createdAt: new Date(pi.created * 1000),
          updatedAt: new Date(pi.created * 1000),
          paidAt: pi.status === 'succeeded' ? new Date(pi.created * 1000) : undefined,
        };
      }));
    } catch (error) {
      throw new Error(\`Failed to fetch payments: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getPayment(id: string): Promise<Payment> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(id);
      const customer = paymentIntent.customer ? await this.getCustomer(paymentIntent.customer as string) : undefined;
      const paymentMethod = paymentIntent.payment_method ? await this.mapPaymentMethod(paymentIntent.payment_method as Stripe.PaymentMethod) : undefined;
      
      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status as any,
        paymentMethod: paymentMethod!,
        customer: customer!,
        description: paymentIntent.description || undefined,
        metadata: paymentIntent.metadata,
        createdAt: new Date(paymentIntent.created * 1000),
        updatedAt: new Date(paymentIntent.created * 1000),
        paidAt: paymentIntent.status === 'succeeded' ? new Date(paymentIntent.created * 1000) : undefined,
      };
    } catch (error) {
      throw new Error(\`Failed to fetch payment: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async refundPayment(id: string, amount?: number): Promise<Payment> {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: id,
        amount: amount,
      });

      // Return the updated payment
      return this.getPayment(id);
    } catch (error) {
      throw new Error(\`Failed to refund payment: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Customer operations
  async createCustomer(data: CreateCustomerData): Promise<Customer> {
    try {
      const customer = await stripe.customers.create({
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address ? {
          line1: data.address.line1,
          line2: data.address.line2,
          city: data.address.city,
          state: data.address.state,
          postal_code: data.address.postalCode,
          country: data.address.country,
        } : undefined,
        metadata: data.metadata || {},
      });

      return {
        id: customer.id,
        email: customer.email!,
        name: customer.name || undefined,
        phone: customer.phone || undefined,
        address: customer.address ? {
          line1: customer.address.line1,
          line2: customer.address.line2 || undefined,
          city: customer.address.city,
          state: customer.address.state,
          postalCode: customer.address.postal_code,
          country: customer.address.country,
        } : undefined,
        metadata: customer.metadata,
        createdAt: new Date(customer.created * 1000),
        updatedAt: new Date(customer.created * 1000),
      };
    } catch (error) {
      throw new Error(\`Failed to create customer: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getCustomers(filters?: { limit?: number; offset?: number }): Promise<Customer[]> {
    try {
      const customers = await stripe.customers.list({
        limit: filters?.limit || 10,
      });

      return customers.data.map(customer => ({
        id: customer.id,
        email: customer.email!,
        name: customer.name || undefined,
        phone: customer.phone || undefined,
        address: customer.address ? {
          line1: customer.address.line1,
          line2: customer.address.line2 || undefined,
          city: customer.address.city,
          state: customer.address.state,
          postalCode: customer.address.postal_code,
          country: customer.address.country,
        } : undefined,
        metadata: customer.metadata,
        createdAt: new Date(customer.created * 1000),
        updatedAt: new Date(customer.created * 1000),
      }));
    } catch (error) {
      throw new Error(\`Failed to fetch customers: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getCustomer(id: string): Promise<Customer> {
    try {
      const customer = await stripe.customers.retrieve(id) as Stripe.Customer;
      
      return {
        id: customer.id,
        email: customer.email!,
        name: customer.name || undefined,
        phone: customer.phone || undefined,
        address: customer.address ? {
          line1: customer.address.line1,
          line2: customer.address.line2 || undefined,
          city: customer.address.city,
          state: customer.address.state,
          postalCode: customer.address.postal_code,
          country: customer.address.country,
        } : undefined,
        metadata: customer.metadata,
        createdAt: new Date(customer.created * 1000),
        updatedAt: new Date(customer.created * 1000),
      };
    } catch (error) {
      throw new Error(\`Failed to fetch customer: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async updateCustomer(id: string, data: UpdateCustomerData): Promise<Customer> {
    try {
      const customer = await stripe.customers.update(id, {
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address ? {
          line1: data.address.line1,
          line2: data.address.line2,
          city: data.address.city,
          state: data.address.state,
          postal_code: data.address.postalCode,
          country: data.address.country,
        } : undefined,
        metadata: data.metadata || {},
      });

      return {
        id: customer.id,
        email: customer.email!,
        name: customer.name || undefined,
        phone: customer.phone || undefined,
        address: customer.address ? {
          line1: customer.address.line1,
          line2: customer.address.line2 || undefined,
          city: customer.address.city,
          state: customer.address.state,
          postalCode: customer.address.postal_code,
          country: customer.address.country,
        } : undefined,
        metadata: customer.metadata,
        createdAt: new Date(customer.created * 1000),
        updatedAt: new Date(customer.created * 1000),
      };
    } catch (error) {
      throw new Error(\`Failed to update customer: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Subscription operations
  async createSubscription(data: CreateSubscriptionData): Promise<Subscription> {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: data.customerId,
        items: [{ price: data.planId }],
        trial_period_days: data.trialPeriodDays,
        metadata: data.metadata || {},
      });

      return this.mapSubscription(subscription);
    } catch (error) {
      throw new Error(\`Failed to create subscription: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getSubscriptions(filters?: { status?: string; customerId?: string }): Promise<Subscription[]> {
    try {
      const params: Stripe.SubscriptionListParams = {};
      
      if (filters?.status) {
        params.status = filters.status as Stripe.Subscription.Status;
      }
      
      if (filters?.customerId) {
        params.customer = filters.customerId;
      }

      const subscriptions = await stripe.subscriptions.list(params);
      
      return subscriptions.data.map(sub => this.mapSubscription(sub));
    } catch (error) {
      throw new Error(\`Failed to fetch subscriptions: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getSubscription(id: string): Promise<Subscription> {
    try {
      const subscription = await stripe.subscriptions.retrieve(id);
      return this.mapSubscription(subscription);
    } catch (error) {
      throw new Error(\`Failed to fetch subscription: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async updateSubscription(id: string, data: UpdateSubscriptionData): Promise<Subscription> {
    try {
      const subscription = await stripe.subscriptions.update(id, {
        items: data.planId ? [{ price: data.planId }] : undefined,
        trial_period_days: data.trialPeriodDays,
        metadata: data.metadata || {},
      });

      return this.mapSubscription(subscription);
    } catch (error) {
      throw new Error(\`Failed to update subscription: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async cancelSubscription(id: string): Promise<void> {
    try {
      await stripe.subscriptions.cancel(id);
    } catch (error) {
      throw new Error(\`Failed to cancel subscription: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Plan operations
  async createPlan(data: CreatePlanData): Promise<Plan> {
    try {
      const price = await stripe.prices.create({
        unit_amount: data.amount,
        currency: data.currency,
        recurring: {
          interval: data.interval,
          interval_count: data.intervalCount,
        },
        product_data: {
          name: data.name,
          description: data.description,
        },
        metadata: data.metadata || {},
      });

      return {
        id: price.id,
        name: data.name,
        description: data.description,
        amount: data.amount,
        currency: data.currency,
        interval: data.interval,
        intervalCount: data.intervalCount,
        trialPeriodDays: data.trialPeriodDays,
        active: price.active,
        metadata: price.metadata,
        createdAt: new Date(price.created * 1000),
        updatedAt: new Date(price.created * 1000),
      };
    } catch (error) {
      throw new Error(\`Failed to create plan: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getPlans(filters?: { active?: boolean }): Promise<Plan[]> {
    try {
      const prices = await stripe.prices.list({
        active: filters?.active,
        type: 'recurring',
      });

      return prices.data.map(price => ({
        id: price.id,
        name: price.nickname || 'Unnamed Plan',
        description: undefined,
        amount: price.unit_amount!,
        currency: price.currency,
        interval: price.recurring!.interval as any,
        intervalCount: price.recurring!.interval_count,
        trialPeriodDays: undefined,
        active: price.active,
        metadata: price.metadata,
        createdAt: new Date(price.created * 1000),
        updatedAt: new Date(price.created * 1000),
      }));
    } catch (error) {
      throw new Error(\`Failed to fetch plans: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getPlan(id: string): Promise<Plan> {
    try {
      const price = await stripe.prices.retrieve(id);
      
      return {
        id: price.id,
        name: price.nickname || 'Unnamed Plan',
        description: undefined,
        amount: price.unit_amount!,
        currency: price.currency,
        interval: price.recurring!.interval as any,
        intervalCount: price.recurring!.interval_count,
        trialPeriodDays: undefined,
        active: price.active,
        metadata: price.metadata,
        createdAt: new Date(price.created * 1000),
        updatedAt: new Date(price.created * 1000),
      };
    } catch (error) {
      throw new Error(\`Failed to fetch plan: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async updatePlan(id: string, data: UpdatePlanData): Promise<Plan> {
    try {
      // Note: Stripe prices are immutable, so we create a new one
      const price = await stripe.prices.create({
        unit_amount: data.amount,
        currency: data.currency,
        recurring: {
          interval: data.interval!,
          interval_count: data.intervalCount!,
        },
        product_data: {
          name: data.name!,
          description: data.description,
        },
        metadata: data.metadata || {},
      });

      return {
        id: price.id,
        name: data.name!,
        description: data.description,
        amount: data.amount!,
        currency: data.currency!,
        interval: data.interval!,
        intervalCount: data.intervalCount!,
        trialPeriodDays: data.trialPeriodDays,
        active: price.active,
        metadata: price.metadata,
        createdAt: new Date(price.created * 1000),
        updatedAt: new Date(price.created * 1000),
      };
    } catch (error) {
      throw new Error(\`Failed to update plan: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async deletePlan(id: string): Promise<void> {
    try {
      await stripe.prices.update(id, { active: false });
    } catch (error) {
      throw new Error(\`Failed to delete plan: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Analytics operations
  async getAnalytics(filters?: { startDate?: Date; endDate?: Date }): Promise<PaymentAnalytics> {
    try {
      // This is a simplified implementation
      // In a real app, you'd aggregate data from Stripe events or use Stripe's reporting API
      const subscriptions = await stripe.subscriptions.list({ status: 'active' });
      const customers = await stripe.customers.list({ limit: 100 });
      
      return {
        totalRevenue: 0, // Would need to calculate from payments
        monthlyRecurringRevenue: 0, // Would need to calculate from subscriptions
        activeSubscriptions: subscriptions.data.length,
        churnRate: 0, // Would need historical data
        averageRevenuePerUser: 0, // Would need to calculate
        totalCustomers: customers.data.length,
        conversionRate: 0, // Would need to calculate
        refundRate: 0, // Would need to calculate
      };
    } catch (error) {
      throw new Error(\`Failed to fetch analytics: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Helper methods
  private async mapPaymentMethod(pm: Stripe.PaymentMethod): Promise<PaymentMethod> {
    return {
      id: pm.id,
      type: pm.type as any,
      card: pm.card ? {
        brand: pm.card.brand,
        last4: pm.card.last4,
        expMonth: pm.card.exp_month,
        expYear: pm.card.exp_year,
        funding: pm.card.funding as any,
      } : undefined,
      bankAccount: pm.us_bank_account ? {
        bankName: pm.us_bank_account.bank_name,
        last4: pm.us_bank_account.last4,
        routingNumber: pm.us_bank_account.routing_number,
        accountType: pm.us_bank_account.account_type as any,
      } : undefined,
      isDefault: false, // Would need to check with customer
      createdAt: new Date(pm.created * 1000),
    };
  }

  private mapSubscription(sub: Stripe.Subscription): Subscription {
    return {
      id: sub.id,
      customerId: sub.customer as string,
      status: sub.status as any,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : undefined,
      plan: {
        id: sub.items.data[0]?.price.id || '',
        name: 'Plan', // Would need to fetch from price
        description: undefined,
        amount: sub.items.data[0]?.price.unit_amount || 0,
        currency: sub.items.data[0]?.price.currency || 'usd',
        interval: sub.items.data[0]?.price.recurring?.interval as any || 'month',
        intervalCount: sub.items.data[0]?.price.recurring?.interval_count || 1,
        trialPeriodDays: undefined,
        active: true,
        metadata: {},
        createdAt: new Date(sub.created * 1000),
        updatedAt: new Date(sub.created * 1000),
      },
      items: sub.items.data.map(item => ({
        id: item.id,
        subscriptionId: sub.id,
        planId: item.price.id,
        quantity: item.quantity || 1,
        plan: {
          id: item.price.id,
          name: 'Plan',
          description: undefined,
          amount: item.price.unit_amount || 0,
          currency: item.price.currency,
          interval: item.price.recurring?.interval as any || 'month',
          intervalCount: item.price.recurring?.interval_count || 1,
          trialPeriodDays: undefined,
          active: item.price.active,
          metadata: item.price.metadata,
          createdAt: new Date(item.price.created * 1000),
          updatedAt: new Date(item.price.created * 1000),
        },
        createdAt: new Date(sub.created * 1000),
        updatedAt: new Date(sub.created * 1000),
      })),
      metadata: sub.metadata,
      createdAt: new Date(sub.created * 1000),
      updatedAt: new Date(sub.created * 1000),
    };
  }

  private mapPaymentStatusToStripe(status: string): Stripe.PaymentIntent.Status | null {
    const statusMap: Record<string, Stripe.PaymentIntent.Status> = {
      'pending': 'requires_payment_method',
      'processing': 'processing',
      'succeeded': 'succeeded',
      'failed': 'canceled',
      'canceled': 'canceled',
    };
    return statusMap[status] || null;
  }
}

export const paymentsService = new PaymentsService();`
    },

    // Create API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/payments/payment-intents/route.ts',
      content: `/**
 * Payment Intents API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { paymentsService } from '@/lib/payments/service';
import { CreatePaymentIntentData } from '@/lib/payments/contract';

export async function POST(request: NextRequest) {
  try {
    const data: CreatePaymentIntentData = await request.json();
    const paymentIntent = await paymentsService.createPaymentIntent(data);
    
    return NextResponse.json(paymentIntent);
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}`
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/payments/checkout-sessions/route.ts',
      content: `/**
 * Checkout Sessions API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { paymentsService } from '@/lib/payments/service';
import { CreateCheckoutSessionData } from '@/lib/payments/contract';

export async function POST(request: NextRequest) {
  try {
    const data: CreateCheckoutSessionData = await request.json();
    const session = await paymentsService.createCheckoutSession(data);
    
    return NextResponse.json(session);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}`
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/payments/customers/route.ts',
      content: `/**
 * Customers API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { paymentsService } from '@/lib/payments/service';
import { CreateCustomerData } from '@/lib/payments/contract';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined;
    
    const customers = await paymentsService.getCustomers({ limit, offset });
    
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: CreateCustomerData = await request.json();
    const customer = await paymentsService.createCustomer(data);
    
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create customer' },
      { status: 500 }
    );
  }
}`
    },

    // Create TanStack Query hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/payments/hooks.ts',
      content: `/**
 * Payments Hooks - Stripe + Next.js Implementation
 * 
 * This file provides the TanStack Query hooks that fulfill the contract
 * defined in the parent feature's contract.ts.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Payment, 
  PaymentMethod, 
  Customer, 
  Subscription, 
  Plan, 
  Invoice, 
  PaymentIntent,
  CheckoutSession,
  PaymentAnalytics,
  CreatePaymentIntentData,
  CreateCheckoutSessionData,
  CreateCustomerData,
  UpdateCustomerData,
  CreateSubscriptionData,
  UpdateSubscriptionData,
  CreatePlanData,
  UpdatePlanData,
  UsePaymentsResult,
  UsePaymentResult,
  UsePaymentMethodsResult,
  UsePaymentMethodResult,
  UseCustomersResult,
  UseCustomerResult,
  UseSubscriptionsResult,
  UseSubscriptionResult,
  UsePlansResult,
  UsePlanResult,
  UseInvoicesResult,
  UseInvoiceResult,
  UseAnalyticsResult,
  UseCreatePaymentIntentResult,
  UseCreateCheckoutSessionResult,
  UseCreateCustomerResult,
  UseUpdateCustomerResult,
  UseCreateSubscriptionResult,
  UseUpdateSubscriptionResult,
  UseCancelSubscriptionResult,
  UseCreatePlanResult,
  UseUpdatePlanResult,
  UseDeletePlanResult,
  UseRefundPaymentResult
} from './contract';

// ============================================================================
// PAYMENT HOOKS
// ============================================================================

export function usePayments(filters?: { status?: string; limit?: number; offset?: number }): UsePaymentsResult {
  return useQuery({
    queryKey: ['payments', 'payments', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.offset) params.append('offset', filters.offset.toString());
      
      const response = await fetch(\`/api/payments/payments?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch payments');
      return response.json();
    }
  });
}

export function usePayment(id: string): UsePaymentResult {
  return useQuery({
    queryKey: ['payments', 'payments', id],
    queryFn: async () => {
      const response = await fetch(\`/api/payments/payments/\${id}\`);
      if (!response.ok) throw new Error('Failed to fetch payment');
      return response.json();
    },
    enabled: !!id
  });
}

export function useCreatePaymentIntent(): UseCreatePaymentIntentResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePaymentIntentData) => {
      const response = await fetch('/api/payments/payment-intents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create payment intent');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'payments'] });
    }
  });
}

export function useCreateCheckoutSession(): UseCreateCheckoutSessionResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCheckoutSessionData) => {
      const response = await fetch('/api/payments/checkout-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create checkout session');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'payments'] });
    }
  });
}

export function useRefundPayment(): UseRefundPaymentResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount?: number }) => {
      const response = await fetch(\`/api/payments/payments/\${id}/refund\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      if (!response.ok) throw new Error('Failed to refund payment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'payments'] });
    }
  });
}

// ============================================================================
// CUSTOMER HOOKS
// ============================================================================

export function useCustomers(filters?: { limit?: number; offset?: number }): UseCustomersResult {
  return useQuery({
    queryKey: ['payments', 'customers', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.offset) params.append('offset', filters.offset.toString());
      
      const response = await fetch(\`/api/payments/customers?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      return response.json();
    }
  });
}

export function useCustomer(id: string): UseCustomerResult {
  return useQuery({
    queryKey: ['payments', 'customers', id],
    queryFn: async () => {
      const response = await fetch(\`/api/payments/customers/\${id}\`);
      if (!response.ok) throw new Error('Failed to fetch customer');
      return response.json();
    },
    enabled: !!id
  });
}

export function useCreateCustomer(): UseCreateCustomerResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCustomerData) => {
      const response = await fetch('/api/payments/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create customer');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'customers'] });
    }
  });
}

export function useUpdateCustomer(): UseUpdateCustomerResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCustomerData }) => {
      const response = await fetch(\`/api/payments/customers/\${id}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update customer');
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'customers', id] });
      queryClient.invalidateQueries({ queryKey: ['payments', 'customers'] });
    }
  });
}

// ============================================================================
// SUBSCRIPTION HOOKS
// ============================================================================

export function useSubscriptions(filters?: { status?: string; customerId?: string }): UseSubscriptionsResult {
  return useQuery({
    queryKey: ['payments', 'subscriptions', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.customerId) params.append('customerId', filters.customerId);
      
      const response = await fetch(\`/api/payments/subscriptions?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch subscriptions');
      return response.json();
    }
  });
}

export function useSubscription(id: string): UseSubscriptionResult {
  return useQuery({
    queryKey: ['payments', 'subscriptions', id],
    queryFn: async () => {
      const response = await fetch(\`/api/payments/subscriptions/\${id}\`);
      if (!response.ok) throw new Error('Failed to fetch subscription');
      return response.json();
    },
    enabled: !!id
  });
}

export function useCreateSubscription(): UseCreateSubscriptionResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSubscriptionData) => {
      const response = await fetch('/api/payments/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create subscription');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'subscriptions'] });
    }
  });
}

export function useUpdateSubscription(): UseUpdateSubscriptionResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateSubscriptionData }) => {
      const response = await fetch(\`/api/payments/subscriptions/\${id}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update subscription');
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'subscriptions', id] });
      queryClient.invalidateQueries({ queryKey: ['payments', 'subscriptions'] });
    }
  });
}

export function useCancelSubscription(): UseCancelSubscriptionResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(\`/api/payments/subscriptions/\${id}/cancel\`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to cancel subscription');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'subscriptions'] });
    }
  });
}

// ============================================================================
// PLAN HOOKS
// ============================================================================

export function usePlans(filters?: { active?: boolean }): UsePlansResult {
  return useQuery({
    queryKey: ['payments', 'plans', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.active !== undefined) params.append('active', filters.active.toString());
      
      const response = await fetch(\`/api/payments/plans?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch plans');
      return response.json();
    }
  });
}

export function usePlan(id: string): UsePlanResult {
  return useQuery({
    queryKey: ['payments', 'plans', id],
    queryFn: async () => {
      const response = await fetch(\`/api/payments/plans/\${id}\`);
      if (!response.ok) throw new Error('Failed to fetch plan');
      return response.json();
    },
    enabled: !!id
  });
}

export function useCreatePlan(): UseCreatePlanResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePlanData) => {
      const response = await fetch('/api/payments/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create plan');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'plans'] });
    }
  });
}

export function useUpdatePlan(): UseUpdatePlanResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePlanData }) => {
      const response = await fetch(\`/api/payments/plans/\${id}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update plan');
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'plans', id] });
      queryClient.invalidateQueries({ queryKey: ['payments', 'plans'] });
    }
  });
}

export function useDeletePlan(): UseDeletePlanResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(\`/api/payments/plans/\${id}\`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete plan');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', 'plans'] });
    }
  });
}

// ============================================================================
// INVOICE HOOKS
// ============================================================================

export function useInvoices(filters?: { status?: string; customerId?: string; limit?: number; offset?: number }): UseInvoicesResult {
  return useQuery({
    queryKey: ['payments', 'invoices', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.customerId) params.append('customerId', filters.customerId);
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.offset) params.append('offset', filters.offset.toString());
      
      const response = await fetch(\`/api/payments/invoices?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch invoices');
      return response.json();
    }
  });
}

export function useInvoice(id: string): UseInvoiceResult {
  return useQuery({
    queryKey: ['payments', 'invoices', id],
    queryFn: async () => {
      const response = await fetch(\`/api/payments/invoices/\${id}\`);
      if (!response.ok) throw new Error('Failed to fetch invoice');
      return response.json();
    },
    enabled: !!id
  });
}

// ============================================================================
// ANALYTICS HOOKS
// ============================================================================

export function useAnalytics(filters?: { startDate?: Date; endDate?: Date }): UseAnalyticsResult {
  return useQuery({
    queryKey: ['payments', 'analytics', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.startDate) params.append('startDate', filters.startDate.toISOString());
      if (filters?.endDate) params.append('endDate', filters.endDate.toISOString());
      
      const response = await fetch(\`/api/payments/analytics?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    }
  });
}

export function useCustomerAnalytics(customerId: string): UseQueryResult<PaymentAnalytics, Error> {
  return useQuery({
    queryKey: ['payments', 'analytics', 'customer', customerId],
    queryFn: async () => {
      const response = await fetch(\`/api/payments/analytics/customer/\${customerId}\`);
      if (!response.ok) throw new Error('Failed to fetch customer analytics');
      return response.json();
    },
    enabled: !!customerId
  });
}

export function useSubscriptionAnalytics(subscriptionId: string): UseQueryResult<PaymentAnalytics, Error> {
  return useQuery({
    queryKey: ['payments', 'analytics', 'subscription', subscriptionId],
    queryFn: async () => {
      const response = await fetch(\`/api/payments/analytics/subscription/\${subscriptionId}\`);
      if (!response.ok) throw new Error('Failed to fetch subscription analytics');
      return response.json();
    },
    enabled: !!subscriptionId
  });
}`
    }
  ]
};
