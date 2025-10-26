/**
 * Organization Billing Service (Stripe Implementation)
 * 
 * Server-side business logic for organization billing operations.
 * Uses provider-agnostic database schema from features/payments/database/drizzle/
 */

import { stripe } from '../stripe/server';
import { stripeConfig } from '../stripe/config';
import { db } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { 
  paymentCustomers, 
  paymentSubscriptions, 
  billingInfo,
  invoices,
  seatHistory 
} from '@/lib/db/schema/payments';
import { 
  OrganizationSubscription, 
  OrganizationCustomer, 
  CreateOrgSubscriptionData, 
  UpdateOrgSubscriptionData,
  BillingInfo as BillingInfoType,
  CreateOrgCustomerData,
  UpdateBillingInfoData
} from '../stripe/types';
import { 
  createStripeError, 
  createBusinessError, 
  createValidationError,
  logStripeError 
} from '../stripe/errors';
import { requireBillingPermission } from './permissions';
import { 
  customerCreationKey, 
  subscriptionCreationKey, 
  subscriptionUpdateKey, 
  subscriptionCancellationKey 
} from '../stripe/idempotency';

// ============================================================================
// CONSTANTS
// ============================================================================

const PAYMENT_PROVIDER = 'stripe' as const;

// ============================================================================
// ORGANIZATION CUSTOMER MANAGEMENT
// ============================================================================

/**
 * Create or get organization Stripe customer
 */
export async function createOrGetOrganizationCustomer(
  data: CreateOrgCustomerData
): Promise<OrganizationCustomer> {
  try {
    // Check if customer already exists
    const existingCustomer = await getOrganizationCustomer(data.organizationId);
    if (existingCustomer) {
      return existingCustomer;
    }
    
    // Create Stripe customer
    const stripeCustomer = await stripe.customers.create(
      {
        email: data.email,
        name: data.name,
        address: data.address,
        
        // PHASE 1 ENHANCEMENT: Enable automatic tax ID collection
        tax_id_data: data.taxId ? [{
          type: 'eu_vat' as const, // TODO: Make this configurable based on region
          value: data.taxId,
        }] : undefined,
        
        metadata: {
          organizationId: data.organizationId,
        },
      },
      {
        // PHASE 1 ENHANCEMENT: Idempotency key to prevent duplicate customers
        idempotencyKey: customerCreationKey(data.organizationId, data.email),
      }
    );
    
    // Save to provider-agnostic database
    const [customer] = await db.insert(paymentCustomers).values({
      organizationId: data.organizationId,
      paymentProvider: PAYMENT_PROVIDER,
      providerCustomerId: stripeCustomer.id,
      email: data.email,
      name: data.name,
      address: data.address as any,
      taxId: data.taxId,
      metadata: {},
    }).returning();
    
    return {
      id: customer.id,
      organizationId: customer.organizationId,
      stripeCustomerId: customer.providerCustomerId,
      email: customer.email,
      name: customer.name,
      address: customer.address as any,
      taxId: customer.taxId ?? undefined,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId: data.organizationId });
    throw createStripeError(error);
  }
}

/**
 * Get organization Stripe customer
 */
export async function getOrganizationCustomer(
  organizationId: string
): Promise<OrganizationCustomer | null> {
  const customer = await db.query.paymentCustomers.findFirst({
    where: and(
      eq(paymentCustomers.organizationId, organizationId),
      eq(paymentCustomers.paymentProvider, PAYMENT_PROVIDER)
    )
  });
  
  if (!customer) return null;
  
  return {
    id: customer.id,
    organizationId: customer.organizationId,
    stripeCustomerId: customer.providerCustomerId,
    email: customer.email,
    name: customer.name,
    address: customer.address as any,
    taxId: customer.taxId ?? undefined,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  };
}

// ============================================================================
// ORGANIZATION SUBSCRIPTION MANAGEMENT
// ============================================================================

/**
 * Create organization subscription
 */
export async function createOrganizationSubscription(
  data: CreateOrgSubscriptionData
): Promise<OrganizationSubscription> {
  try {
    // Verify permissions
    await requireBillingPermission(data.userId, data.organizationId, 'manage');
    
    // Get or create customer
    const customer = await createOrGetOrganizationCustomer({
      organizationId: data.organizationId,
      email: data.email,
      name: data.name,
      address: data.address,
      taxId: data.taxId,
    });
    
    // Create Stripe subscription
    const stripeSubscription = await stripe.subscriptions.create(
      {
        customer: customer.stripeCustomerId,
        items: [
          {
            price: data.priceId,
            quantity: data.seats,
          },
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        trial_period_days: data.trialDays,
        
        // PHASE 1 ENHANCEMENT: Enable automatic tax calculation
        automatic_tax: { enabled: true },
        
        metadata: {
          organizationId: data.organizationId,
          planId: data.planId,
        },
      },
      {
        // PHASE 1 ENHANCEMENT: Idempotency key
        idempotencyKey: subscriptionCreationKey(
          data.organizationId, 
          data.planId, 
          data.seats
        ),
      }
    );
    
    // Save to provider-agnostic database
    const [subscription] = await db.insert(paymentSubscriptions).values({
      organizationId: data.organizationId,
      customerId: customer.id,
      paymentProvider: PAYMENT_PROVIDER,
      providerSubscriptionId: stripeSubscription.id,
      status: stripeSubscription.status,
      planId: data.planId,
      planName: data.planName,
      planAmount: data.planAmount,
      planInterval: data.planInterval,
      currency: stripeSubscription.currency,
      seatsIncluded: data.seatsIncluded,
      seatsAdditional: Math.max(0, data.seats - data.seatsIncluded),
      seatsTotal: data.seats,
      currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
      currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      trialStart: stripeSubscription.trial_start ? new Date(stripeSubscription.trial_start * 1000) : null,
      trialEnd: stripeSubscription.trial_end ? new Date(stripeSubscription.trial_end * 1000) : null,
      cancelAtPeriodEnd: false,
      canceledAt: null,
      metadata: {},
    }).returning();
    
    return {
      id: subscription.id,
      organizationId: subscription.organizationId,
      stripeSubscriptionId: subscription.providerSubscriptionId,
      stripeCustomerId: customer.stripeCustomerId,
      status: subscription.status,
      planId: subscription.planId,
      planName: subscription.planName,
      planAmount: subscription.planAmount,
      planInterval: subscription.planInterval as 'month' | 'year',
      seatsIncluded: subscription.seatsIncluded,
      seatsAdditional: subscription.seatsAdditional,
      seatsTotal: subscription.seatsTotal,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
      trialStart: subscription.trialStart ?? undefined,
      trialEnd: subscription.trialEnd ?? undefined,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      canceledAt: subscription.canceledAt ?? undefined,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId: data.organizationId });
    throw createStripeError(error);
  }
}

/**
 * Get organization subscription
 */
export async function getOrganizationSubscription(
  organizationId: string
): Promise<OrganizationSubscription | null> {
  const subscription = await db.query.paymentSubscriptions.findFirst({
    where: and(
      eq(paymentSubscriptions.organizationId, organizationId),
      eq(paymentSubscriptions.paymentProvider, PAYMENT_PROVIDER)
    ),
    with: {
      customer: true,
    }
  });
  
  if (!subscription) return null;
  
  return {
    id: subscription.id,
    organizationId: subscription.organizationId,
    stripeSubscriptionId: subscription.providerSubscriptionId,
    stripeCustomerId: subscription.customerId,
    status: subscription.status,
    planId: subscription.planId,
    planName: subscription.planName,
    planAmount: subscription.planAmount,
    planInterval: subscription.planInterval as 'month' | 'year',
    seatsIncluded: subscription.seatsIncluded,
    seatsAdditional: subscription.seatsAdditional,
    seatsTotal: subscription.seatsTotal,
    currentPeriodStart: subscription.currentPeriodStart,
    currentPeriodEnd: subscription.currentPeriodEnd,
    trialStart: subscription.trialStart ?? undefined,
    trialEnd: subscription.trialEnd ?? undefined,
    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    canceledAt: subscription.canceledAt ?? undefined,
    createdAt: subscription.createdAt,
    updatedAt: subscription.updatedAt,
  };
}

/**
 * Update organization subscription
 */
export async function updateOrganizationSubscription(
  organizationId: string,
  userId: string,
  data: UpdateOrgSubscriptionData
): Promise<OrganizationSubscription> {
  try {
    // Verify permissions
    await requireBillingPermission(userId, organizationId, 'manage');
    
    // Get current subscription
    const subscription = await getOrganizationSubscription(organizationId);
    if (!subscription) {
      throw createBusinessError('Subscription not found');
    }
    
    // Prepare Stripe update data
    const updateData: any = {};
    
    if (data.priceId) {
      updateData.items = [{
        id: subscription.stripeSubscriptionId,
        price: data.priceId,
        quantity: data.seats,
      }];
    }
    
    if (data.cancelAtPeriodEnd !== undefined) {
      updateData.cancel_at_period_end = data.cancelAtPeriodEnd;
    }
    
    // Update Stripe subscription
    const stripeSubscription = await stripe.subscriptions.update(
      subscription.stripeSubscriptionId,
      updateData,
      {
        // PHASE 1 ENHANCEMENT: Idempotency key
        idempotencyKey: subscriptionUpdateKey(
          organizationId,
          subscription.stripeSubscriptionId,
          updateData
        ),
      }
    );
    
    // Update provider-agnostic database
    const [updatedSubscription] = await db.update(paymentSubscriptions)
      .set({
        status: stripeSubscription.status,
        planId: data.planId ?? subscription.planId,
        planName: data.planName ?? subscription.planName,
        planAmount: data.planAmount ?? subscription.planAmount,
        planInterval: data.planInterval ?? subscription.planInterval,
        seatsTotal: data.seats ?? subscription.seatsTotal,
        seatsAdditional: data.seats ? Math.max(0, data.seats - subscription.seatsIncluded) : subscription.seatsAdditional,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd ?? subscription.cancelAtPeriodEnd,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        updatedAt: new Date(),
      })
      .where(and(
        eq(paymentSubscriptions.organizationId, organizationId),
        eq(paymentSubscriptions.paymentProvider, PAYMENT_PROVIDER)
      ))
      .returning();
    
    // Record seat change
    if (data.seats && data.seats !== subscription.seatsTotal) {
      await db.insert(seatHistory).values({
        organizationId,
        subscriptionId: subscription.id,
        previousSeats: subscription.seatsTotal,
        newSeats: data.seats,
        changedBy: userId,
        reason: 'manual_increase',
        metadata: {},
      });
    }
    
    return {
      id: updatedSubscription.id,
      organizationId: updatedSubscription.organizationId,
      stripeSubscriptionId: updatedSubscription.providerSubscriptionId,
      stripeCustomerId: subscription.stripeCustomerId,
      status: updatedSubscription.status,
      planId: updatedSubscription.planId,
      planName: updatedSubscription.planName,
      planAmount: updatedSubscription.planAmount,
      planInterval: updatedSubscription.planInterval as 'month' | 'year',
      seatsIncluded: updatedSubscription.seatsIncluded,
      seatsAdditional: updatedSubscription.seatsAdditional,
      seatsTotal: updatedSubscription.seatsTotal,
      currentPeriodStart: updatedSubscription.currentPeriodStart,
      currentPeriodEnd: updatedSubscription.currentPeriodEnd,
      trialStart: updatedSubscription.trialStart ?? undefined,
      trialEnd: updatedSubscription.trialEnd ?? undefined,
      cancelAtPeriodEnd: updatedSubscription.cancelAtPeriodEnd,
      canceledAt: updatedSubscription.canceledAt ?? undefined,
      createdAt: updatedSubscription.createdAt,
      updatedAt: updatedSubscription.updatedAt,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

/**
 * Cancel organization subscription
 */
export async function cancelOrganizationSubscription(
  organizationId: string,
  userId: string,
  cancelAtPeriodEnd: boolean = true
): Promise<OrganizationSubscription> {
  try {
    // Verify permissions
    await requireBillingPermission(userId, organizationId, 'manage');
    
    // Get current subscription
    const subscription = await getOrganizationSubscription(organizationId);
    if (!subscription) {
      throw createBusinessError('Subscription not found');
    }
    
    // Update Stripe subscription
    const stripeSubscription = await stripe.subscriptions.update(
      subscription.stripeSubscriptionId,
      { cancel_at_period_end: cancelAtPeriodEnd },
      {
        // PHASE 1 ENHANCEMENT: Idempotency key
        idempotencyKey: subscriptionCancellationKey(
          organizationId,
          subscription.stripeSubscriptionId
        ),
      }
    );
    
    // Update provider-agnostic database
    const [updatedSubscription] = await db.update(paymentSubscriptions)
      .set({
        cancelAtPeriodEnd,
        canceledAt: cancelAtPeriodEnd ? null : new Date(),
        status: stripeSubscription.status,
        updatedAt: new Date(),
      })
      .where(and(
        eq(paymentSubscriptions.organizationId, organizationId),
        eq(paymentSubscriptions.paymentProvider, PAYMENT_PROVIDER)
      ))
      .returning();
    
    return {
      id: updatedSubscription.id,
      organizationId: updatedSubscription.organizationId,
      stripeSubscriptionId: updatedSubscription.providerSubscriptionId,
      stripeCustomerId: subscription.stripeCustomerId,
      status: updatedSubscription.status,
      planId: updatedSubscription.planId,
      planName: updatedSubscription.planName,
      planAmount: updatedSubscription.planAmount,
      planInterval: updatedSubscription.planInterval as 'month' | 'year',
      seatsIncluded: updatedSubscription.seatsIncluded,
      seatsAdditional: updatedSubscription.seatsAdditional,
      seatsTotal: updatedSubscription.seatsTotal,
      currentPeriodStart: updatedSubscription.currentPeriodStart,
      currentPeriodEnd: updatedSubscription.currentPeriodEnd,
      trialStart: updatedSubscription.trialStart ?? undefined,
      trialEnd: updatedSubscription.trialEnd ?? undefined,
      cancelAtPeriodEnd: updatedSubscription.cancelAtPeriodEnd,
      canceledAt: updatedSubscription.canceledAt ?? undefined,
      createdAt: updatedSubscription.createdAt,
      updatedAt: updatedSubscription.updatedAt,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

// ============================================================================
// BILLING PORTAL
// ============================================================================

/**
 * Create Stripe Billing Portal session (PHASE 1 ENHANCEMENT)
 */
export async function createOrganizationBillingPortalSession(
  organizationId: string,
  userId: string
): Promise<string> {
  try {
    // Verify permissions
    await requireBillingPermission(userId, organizationId, 'view');
    
    // Get customer
    const customer = await getOrganizationCustomer(organizationId);
    if (!customer) {
      throw createBusinessError('Customer not found');
    }
    
    // Create Billing Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${process.env.APP_URL}/org/${organizationId}/settings/billing`,
    });
    
    return session.url;
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

// ============================================================================
// INVOICES
// ============================================================================

/**
 * Get organization invoices
 */
export async function getOrganizationInvoices(
  organizationId: string,
  userId: string
): Promise<any[]> {
  try {
    // Verify permissions
    await requireBillingPermission(userId, organizationId, 'view');
    
    // Get from provider-agnostic database
    const dbInvoices = await db.query.invoices.findMany({
      where: and(
        eq(invoices.organizationId, organizationId),
        eq(invoices.paymentProvider, PAYMENT_PROVIDER)
      ),
      orderBy: (invoices, { desc }) => [desc(invoices.createdAt)],
    });
    
    return dbInvoices.map(invoice => ({
      id: invoice.id,
      organizationId: invoice.organizationId,
      stripeInvoiceId: invoice.providerInvoiceId,
      status: invoice.status,
      amount: invoice.amount,
      amountPaid: invoice.amountPaid,
      amountDue: invoice.amountDue,
      currency: invoice.currency,
      invoiceNumber: invoice.invoiceNumber,
      dueDate: invoice.dueDate,
      paidAt: invoice.paidAt,
      createdAt: invoice.createdAt,
    }));
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

// ============================================================================
// BILLING INFO
// ============================================================================

/**
 * Get organization billing info
 */
export async function getOrganizationBillingInfo(
  organizationId: string,
  userId: string
): Promise<BillingInfoType | null> {
  try {
    // Verify permissions
    await requireBillingPermission(userId, organizationId, 'view');
    
    // Get from provider-agnostic database
    const info = await db.query.billingInfo.findFirst({
      where: and(
        eq(billingInfo.organizationId, organizationId),
        eq(billingInfo.paymentProvider, PAYMENT_PROVIDER)
      )
    });
    
    if (!info) return null;
    
    return {
      id: info.id,
      organizationId: info.organizationId,
      stripeCustomerId: info.providerCustomerId,
      paymentMethodType: info.paymentMethodType ?? undefined,
      paymentMethodLast4: info.paymentMethodLast4 ?? undefined,
      paymentMethodBrand: info.paymentMethodBrand ?? undefined,
      paymentMethodExpiryMonth: info.paymentMethodExpiryMonth ?? undefined,
      paymentMethodExpiryYear: info.paymentMethodExpiryYear ?? undefined,
      billingEmail: info.billingEmail,
      billingName: info.billingName,
      billingAddress: info.billingAddress as any,
      taxId: info.taxId ?? undefined,
      createdAt: info.createdAt,
      updatedAt: info.updatedAt,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

/**
 * Update organization billing info
 */
export async function updateOrganizationBillingInfo(
  organizationId: string,
  userId: string,
  data: UpdateBillingInfoData
): Promise<BillingInfoType> {
  try {
    // Verify permissions
    await requireBillingPermission(userId, organizationId, 'manage');
    
    // Get customer
    const customer = await getOrganizationCustomer(organizationId);
    if (!customer) {
      throw createBusinessError('Customer not found');
    }
    
    // Update Stripe customer
    if (data.email || data.name || data.address || data.taxId) {
      await stripe.customers.update(customer.stripeCustomerId, {
      email: data.email,
      name: data.name,
      address: data.address,
        // Update tax ID if provided
      });
    }
    
    // Update provider-agnostic database
    const [updatedInfo] = await db.update(billingInfo)
      .set({
        billingEmail: data.email ?? undefined,
        billingName: data.name ?? undefined,
        billingAddress: data.address as any,
        taxId: data.taxId ?? undefined,
        updatedAt: new Date(),
      })
      .where(and(
        eq(billingInfo.organizationId, organizationId),
        eq(billingInfo.paymentProvider, PAYMENT_PROVIDER)
      ))
      .returning();
    
    return {
      id: updatedInfo.id,
      organizationId: updatedInfo.organizationId,
      stripeCustomerId: updatedInfo.providerCustomerId,
      paymentMethodType: updatedInfo.paymentMethodType ?? undefined,
      paymentMethodLast4: updatedInfo.paymentMethodLast4 ?? undefined,
      paymentMethodBrand: updatedInfo.paymentMethodBrand ?? undefined,
      paymentMethodExpiryMonth: updatedInfo.paymentMethodExpiryMonth ?? undefined,
      paymentMethodExpiryYear: updatedInfo.paymentMethodExpiryYear ?? undefined,
      billingEmail: updatedInfo.billingEmail,
      billingName: updatedInfo.billingName,
      billingAddress: updatedInfo.billingAddress as any,
      taxId: updatedInfo.taxId ?? undefined,
      createdAt: updatedInfo.createdAt,
      updatedAt: updatedInfo.updatedAt,
    };
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

// ============================================================================
// COHESIVE SERVICE OBJECT (Required for contract validation)
// ============================================================================

export const OrganizationBillingService = {
  // Customer management
  createCustomer: createOrganizationCustomer,
  getCustomer: getOrganizationCustomer,
  updateCustomer: updateOrganizationCustomer,
  deleteCustomer: deleteOrganizationCustomer,
  
  // Subscription management
  createSubscription: createOrganizationSubscription,
  getSubscription: getOrganizationSubscription,
  updateSubscription: updateOrganizationSubscription,
  cancelSubscription: cancelOrganizationSubscription,
  
  // Billing info management
  getBillingInfo: getOrganizationBillingInfo,
  updateBillingInfo: updateOrganizationBillingInfo,
  
  // Utility methods
  list: async (organizationId: string) => {
    const customer = await getOrganizationCustomer(organizationId);
    const subscription = customer ? await getOrganizationSubscription(organizationId) : null;
    const billingInfo = customer ? await getOrganizationBillingInfo(organizationId) : null;
    
    return {
      customer,
      subscription,
      billingInfo
    };
  },
  
  create: async (data: CreateOrgCustomerData) => {
    return createOrganizationCustomer(data.organizationId, data.email);
  },
  
  update: async (organizationId: string, data: UpdateOrgSubscriptionData) => {
    return updateOrganizationSubscription(organizationId, data);
  },
  
  delete: async (organizationId: string) => {
    return deleteOrganizationCustomer(organizationId);
  }
};

export default OrganizationBillingService;
