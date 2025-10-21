/**
 * Organization Billing Service
 * 
 * Server-side business logic for organization billing operations.
 * This service handles Stripe integration for organization-level subscriptions.
 */

import { stripe } from '../stripe/server';
import { stripeConfig } from '../stripe/config';
import { 
  OrganizationSubscription, 
  OrganizationCustomer, 
  CreateOrgSubscriptionData, 
  UpdateOrgSubscriptionData,
  BillingInfo,
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
    const stripeCustomer = await stripe.customers.create({
      email: data.email,
      name: data.name,
      address: data.address,
      tax_id: data.taxId,
      metadata: {
        organizationId: data.organizationId,
      },
    });
    
    // Save to database
    const customer = await saveOrganizationCustomer({
      organizationId: data.organizationId,
      stripeCustomerId: stripeCustomer.id,
      email: data.email,
      name: data.name,
      address: data.address,
      taxId: data.taxId,
    });
    
    return customer;
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
  // TODO: Implement database query
  // const customer = await db.query.organizationStripeCustomers.findFirst({
  //   where: eq(organizationStripeCustomers.organizationId, organizationId)
  // });
  
  // For now, return null (not found)
  return null;
}

/**
 * Update organization Stripe customer
 */
export async function updateOrganizationCustomer(
  organizationId: string,
  data: UpdateBillingInfoData
): Promise<OrganizationCustomer> {
  try {
    const customer = await getOrganizationCustomer(organizationId);
    if (!customer) {
      throw createValidationError('Organization customer not found', organizationId);
    }
    
    // Update Stripe customer
    const stripeCustomer = await stripe.customers.update(customer.stripeCustomerId, {
      email: data.email,
      name: data.name,
      address: data.address,
      tax_id: data.taxId,
    });
    
    // Update database
    const updatedCustomer = await updateOrganizationCustomerInDb(organizationId, {
      email: data.email || customer.email,
      name: data.name || customer.name,
      address: data.address || customer.address,
      taxId: data.taxId || customer.taxId,
    });
    
    return updatedCustomer;
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
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
    // Get or create organization customer
    const customer = await createOrGetOrganizationCustomer({
      organizationId: data.organizationId,
      email: '', // This should come from organization data
      name: '', // This should come from organization data
    });
    
    // Get plan configuration
    const plan = stripeConfig.plans[data.planId as keyof typeof stripeConfig.plans];
    if (!plan) {
      throw createValidationError(`Invalid plan ID: ${data.planId}`, data.organizationId);
    }
    
    // Create Stripe subscription
    const stripeSubscription = await stripe.subscriptions.create({
      customer: customer.stripeCustomerId,
      items: [
        {
          price: plan.id,
          quantity: 1,
        },
        // Add additional seats if specified
        ...(data.seats && data.seats > plan.seats ? [{
          price: stripeConfig.additionalSeatPrice.id,
          quantity: data.seats - plan.seats,
        }] : []),
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: data.trialDays,
      metadata: {
        organizationId: data.organizationId,
        planId: data.planId,
        seatsIncluded: plan.seats.toString(),
        seatsAdditional: Math.max(0, (data.seats || plan.seats) - plan.seats).toString(),
      },
    });
    
    // Save to database
    const subscription = await saveOrganizationSubscription({
      organizationId: data.organizationId,
      stripeSubscriptionId: stripeSubscription.id,
      stripeCustomerId: customer.stripeCustomerId,
      status: stripeSubscription.status as any,
      planId: data.planId,
      planName: plan.name || data.planId,
      planAmount: plan.amount,
      planInterval: 'month', // TODO: Make this configurable
      seatsIncluded: plan.seats,
      seatsAdditional: Math.max(0, (data.seats || plan.seats) - plan.seats),
      seatsTotal: data.seats || plan.seats,
      currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
      currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      trialStart: stripeSubscription.trial_start ? new Date(stripeSubscription.trial_start * 1000) : undefined,
      trialEnd: stripeSubscription.trial_end ? new Date(stripeSubscription.trial_end * 1000) : undefined,
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
    });
    
    return subscription;
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
  // TODO: Implement database query
  // const subscription = await db.query.organizationSubscriptions.findFirst({
  //   where: eq(organizationSubscriptions.organizationId, organizationId)
  // });
  
  // For now, return null (not found)
  return null;
}

/**
 * Update organization subscription
 */
export async function updateOrganizationSubscription(
  organizationId: string,
  data: UpdateOrgSubscriptionData
): Promise<OrganizationSubscription> {
  try {
    const subscription = await getOrganizationSubscription(organizationId);
    if (!subscription) {
      throw createValidationError('Organization subscription not found', organizationId);
    }
    
    // Update Stripe subscription
    const updateData: any = {};
    
    if (data.planId) {
      const plan = stripeConfig.plans[data.planId as keyof typeof stripeConfig.plans];
      if (!plan) {
        throw createValidationError(`Invalid plan ID: ${data.planId}`, organizationId);
      }
      
      updateData.items = [
        {
          id: subscription.stripeSubscriptionId, // This should be the subscription item ID
          price: plan.id,
          quantity: 1,
        },
      ];
    }
    
    if (data.cancelAtPeriodEnd !== undefined) {
      updateData.cancel_at_period_end = data.cancelAtPeriodEnd;
    }
    
    if (data.metadata) {
      updateData.metadata = {
        ...subscription.metadata,
        ...data.metadata,
      };
    }
    
    const stripeSubscription = await stripe.subscriptions.update(
      subscription.stripeSubscriptionId,
      updateData
    );
    
    // Update database
    const updatedSubscription = await updateOrganizationSubscriptionInDb(organizationId, {
      status: stripeSubscription.status as any,
      planId: data.planId || subscription.planId,
      planName: data.planId ? stripeConfig.plans[data.planId as keyof typeof stripeConfig.plans]?.name || data.planId : subscription.planName,
      cancelAtPeriodEnd: data.cancelAtPeriodEnd !== undefined ? data.cancelAtPeriodEnd : subscription.cancelAtPeriodEnd,
      metadata: data.metadata ? { ...subscription.metadata, ...data.metadata } : subscription.metadata,
    });
    
    return updatedSubscription;
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
  cancelAtPeriodEnd: boolean = true
): Promise<OrganizationSubscription> {
  try {
    const subscription = await getOrganizationSubscription(organizationId);
    if (!subscription) {
      throw createValidationError('Organization subscription not found', organizationId);
    }
    
    // Cancel Stripe subscription
    const stripeSubscription = await stripe.subscriptions.update(
      subscription.stripeSubscriptionId,
      {
        cancel_at_period_end: cancelAtPeriodEnd,
      }
    );
    
    // Update database
    const updatedSubscription = await updateOrganizationSubscriptionInDb(organizationId, {
      status: stripeSubscription.status as any,
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      canceledAt: !cancelAtPeriodEnd ? new Date() : undefined,
    });
    
    return updatedSubscription;
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

// ============================================================================
// BILLING INFO MANAGEMENT
// ============================================================================

/**
 * Get organization billing info
 */
export async function getOrganizationBillingInfo(
  organizationId: string
): Promise<BillingInfo | null> {
  // TODO: Implement database query
  // const billingInfo = await db.query.organizationBillingInfo.findFirst({
  //   where: eq(organizationBillingInfo.organizationId, organizationId)
  // });
  
  // For now, return null (not found)
  return null;
}

/**
 * Update organization billing info
 */
export async function updateOrganizationBillingInfo(
  organizationId: string,
  data: UpdateBillingInfoData
): Promise<BillingInfo> {
  try {
    const customer = await getOrganizationCustomer(organizationId);
    if (!customer) {
      throw createValidationError('Organization customer not found', organizationId);
    }
    
    // Update Stripe customer
    const stripeCustomer = await stripe.customers.update(customer.stripeCustomerId, {
      email: data.email,
      name: data.name,
      address: data.address,
      tax_id: data.taxId,
    });
    
    // Update database
    const updatedBillingInfo = await updateOrganizationBillingInfoInDb(organizationId, {
      billingEmail: data.email || customer.email,
      billingName: data.name || customer.name,
      billingAddress: data.address || customer.address,
      taxId: data.taxId || customer.taxId,
    });
    
    return updatedBillingInfo;
  } catch (error) {
    logStripeError(createStripeError(error), { organizationId });
    throw createStripeError(error);
  }
}

// ============================================================================
// DATABASE OPERATIONS (PLACEHOLDERS)
// ============================================================================

async function saveOrganizationCustomer(data: any): Promise<OrganizationCustomer> {
  // TODO: Implement database save operation
  // const [customer] = await db.insert(organizationStripeCustomers).values(data).returning();
  // return customer;
  
  // Mock implementation
  return {
    id: 'mock-id',
    organizationId: data.organizationId,
    stripeCustomerId: data.stripeCustomerId,
    email: data.email,
    name: data.name,
    address: data.address,
    taxId: data.taxId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function updateOrganizationCustomerInDb(organizationId: string, data: any): Promise<OrganizationCustomer> {
  // TODO: Implement database update operation
  // const [customer] = await db.update(organizationStripeCustomers)
  //   .set(data)
  //   .where(eq(organizationStripeCustomers.organizationId, organizationId))
  //   .returning();
  // return customer;
  
  // Mock implementation
  return {
    id: 'mock-id',
    organizationId,
    stripeCustomerId: 'mock-stripe-id',
    email: data.email,
    name: data.name,
    address: data.address,
    taxId: data.taxId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function saveOrganizationSubscription(data: any): Promise<OrganizationSubscription> {
  // TODO: Implement database save operation
  // const [subscription] = await db.insert(organizationSubscriptions).values(data).returning();
  // return subscription;
  
  // Mock implementation
  return {
    id: 'mock-id',
    organizationId: data.organizationId,
    stripeSubscriptionId: data.stripeSubscriptionId,
    stripeCustomerId: data.stripeCustomerId,
    status: data.status,
    planId: data.planId,
    planName: data.planName,
    planAmount: data.planAmount,
    planInterval: data.planInterval,
    seatsIncluded: data.seatsIncluded,
    seatsAdditional: data.seatsAdditional,
    seatsTotal: data.seatsTotal,
    currentPeriodStart: data.currentPeriodStart,
    currentPeriodEnd: data.currentPeriodEnd,
    trialStart: data.trialStart,
    trialEnd: data.trialEnd,
    cancelAtPeriodEnd: data.cancelAtPeriodEnd,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function updateOrganizationSubscriptionInDb(organizationId: string, data: any): Promise<OrganizationSubscription> {
  // TODO: Implement database update operation
  // const [subscription] = await db.update(organizationSubscriptions)
  //   .set(data)
  //   .where(eq(organizationSubscriptions.organizationId, organizationId))
  //   .returning();
  // return subscription;
  
  // Mock implementation
  return {
    id: 'mock-id',
    organizationId,
    stripeSubscriptionId: 'mock-stripe-id',
    stripeCustomerId: 'mock-customer-id',
    status: data.status || 'active',
    planId: data.planId || 'starter',
    planName: data.planName || 'Starter Plan',
    planAmount: 2900,
    planInterval: 'month',
    seatsIncluded: 5,
    seatsAdditional: 0,
    seatsTotal: 5,
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    cancelAtPeriodEnd: data.cancelAtPeriodEnd || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function updateOrganizationBillingInfoInDb(organizationId: string, data: any): Promise<BillingInfo> {
  // TODO: Implement database update operation
  // const [billingInfo] = await db.update(organizationBillingInfo)
  //   .set(data)
  //   .where(eq(organizationBillingInfo.organizationId, organizationId))
  //   .returning();
  // return billingInfo;
  
  // Mock implementation
  return {
    organizationId,
    stripeCustomerId: 'mock-customer-id',
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025,
    },
    email: data.billingEmail,
    name: data.billingName,
    address: data.billingAddress,
    taxId: data.taxId,
  };
}
