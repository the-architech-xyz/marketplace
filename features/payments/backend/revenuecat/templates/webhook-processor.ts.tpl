/**
 * RevenueCat Webhook Processor
 * 
 * Processes RevenueCat webhook events and syncs subscription data to your
 * standardized payment_subscriptions table. This enables the subscription data
 * to work seamlessly with all your standardized hooks, auth, and emailing.
 */

import { db } from '@/lib/database/client';
import { paymentSubscriptions } from '@/lib/database/schema';
import { createId } from '@paralleldrive/cuid2';

interface ProcessedWebhookEvent {
  id: string;
  type: string;
  app_user_id: string;
  product_id?: string;
  expiration_at_ms?: number;
  purchased_at_ms?: number;
  is_trial_period?: boolean;
  period_type?: 'NORMAL' | 'TRIAL' | 'INTRO';
  store?: 'APP_STORE' | 'PLAY_STORE' | 'STRIPE';
  mappedUserId: string;
}

/**
 * Process RevenueCat webhook and sync to standardized database
 * 
 * This function syncs RevenueCat subscription data to the same
 * payment_subscriptions table used by Stripe, enabling unified data access.
 */
export async function processRevenueCatWebhook(event: ProcessedWebhookEvent) {
  console.log(`Processing RevenueCat webhook: ${event.type}`, {
    eventId: event.id,
    userId: event.app_user_id,
    productId: event.product_id,
  });

  try {
    // Get organization ID from user (you'll need to implement this based on your auth system)
    const organizationId = await getOrganizationIdForUser(event.mappedUserId);

    switch (event.type) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'UNCANCEL':
        await handleSubscriptionActive(event, organizationId);
        break;

      case 'CANCELLATION':
      case 'EXPIRATION':
        await handleSubscriptionInactive(event, organizationId);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error processing webhook event:', error);
    throw error;
  }
}

/**
 * Handle active subscription events
 */
async function handleSubscriptionActive(
  event: ProcessedWebhookEvent,
  organizationId: string
) {
  // Check if subscription already exists
  const existing = await db.query.paymentSubscriptions.findFirst({
    where: (subscriptions, { eq, and }) =>
      and(
        eq(subscriptions.organizationId, organizationId),
        eq(subscriptions.paymentProvider, 'revenuecat')
      ),
    orderBy: (subscriptions, { desc }) => [desc(subscriptions.createdAt)],
  });

  const now = new Date();
  const expirationDate = event.expiration_at_ms
    ? new Date(event.expiration_at_ms)
    : null;
  const purchaseDate = event.purchased_at_ms
    ? new Date(event.purchased_at_ms)
    : now;

  // Determine subscription status
  const isTrialing = event.is_trial_period || event.period_type === 'TRIAL';
  const status = isTrialing ? 'trialing' : 'active';

  if (existing) {
    // Update existing subscription
    await db
      .update(paymentSubscriptions)
      .set({
        status,
        currentPeriodStart: purchaseDate,
        currentPeriodEnd: expirationDate || purchaseDate,
        updatedAt: now,
      })
      .where(
        eq(paymentSubscriptions.id, existing.id)
      );
  } else {
    // Create new subscription
    await db.insert(paymentSubscriptions).values({
      id: createId(),
      organizationId,
      customerId: createId(), // You may need to create/update customer record
      paymentProvider: 'revenuecat',
      providerSubscriptionId: event.id,
      status,
      planId: event.product_id || 'premium',
      planName: event.product_id || 'Premium Plan',
      planAmount: 0, // RevenueCat handles pricing
      planInterval: 'month',
      currency: 'usd',
      seatsIncluded: 5,
      seatsAdditional: 0,
      seatsTotal: 5,
      currentPeriodStart: purchaseDate,
      currentPeriodEnd: expirationDate || purchaseDate,
      trialStart: isTrialing ? purchaseDate : null,
      trialEnd: isTrialing ? expirationDate : null,
      cancelAtPeriodEnd: false,
      metadata: {
        productId: event.product_id,
        store: event.store,
      },
      createdAt: now,
      updatedAt: now,
    });
  }

  // Trigger auth sync (standardized!)
  await syncUserPremiumStatus(organizationId, true);

  // Trigger email notification (standardized!)
  await sendSubscriptionEmail(organizationId, 'activated');
}

/**
 * Handle inactive subscription events
 */
async function handleSubscriptionInactive(
  event: ProcessedWebhookEvent,
  organizationId: string
) {
  // Find subscription
  const subscription = await db.query.paymentSubscriptions.findFirst({
    where: (subscriptions, { eq, and }) =>
      and(
        eq(subscriptions.organizationId, organizationId),
        eq(subscriptions.paymentProvider, 'revenuecat')
      ),
  });

  if (subscription) {
    // Update subscription status
    await db
      .update(paymentSubscriptions)
      .set({
        status: 'canceled',
        canceledAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(paymentSubscriptions.id, subscription.id));
  }

  // Trigger auth sync (standardized!)
  await syncUserPremiumStatus(organizationId, false);

  // Trigger email notification (standardized!)
  await sendSubscriptionEmail(organizationId, 'canceled');
}

/**
 * Get organization ID for a user
 */
async function getOrganizationIdForUser(userId: string): Promise<string> {
  // TODO: Implement based on your auth system
  // Example:
  // const user = await getUserById(userId);
  // return user.organizationId;
  
  return userId; // Placeholder
}

/**
 * Sync user premium status with auth system
 */
async function syncUserPremiumStatus(organizationId: string, hasPremium: boolean) {
  // TODO: Implement auth integration
  // Example:
  // await authService.updateUserSubscriptionStatus(organizationId, { hasPremium });
  console.log(`Syncing premium status: ${organizationId} = ${hasPremium}`);
}

/**
 * Send subscription email notification
 */
async function sendSubscriptionEmail(organizationId: string, status: 'activated' | 'canceled') {
  // TODO: Implement email integration
  // Example:
  // await emailService.send({
  //   to: user.email,
  //   template: `subscription-${status}`,
  //   variables: { organizationId },
  // });
  console.log(`Sending subscription email: ${status} for ${organizationId}`);
}

