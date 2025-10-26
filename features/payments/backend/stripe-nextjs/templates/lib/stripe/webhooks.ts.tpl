/**
 * Stripe Webhook Handlers
 * 
 * Handles Stripe webhook events for organization billing.
 * This service processes webhook events and updates the database accordingly.
 */

import { stripe } from './server';
import { WebhookEvent, WebhookHandler } from './types';
import { 
  createStripeError, 
  logStripeError 
} from './errors';

// ============================================================================
// WEBHOOK EVENT HANDLERS
// ============================================================================

/**
 * Handle customer subscription created event
 */
async function handleCustomerSubscriptionCreated(event: WebhookEvent): Promise<void> {
  try {
    const subscription = event.data.object as any;
    const organizationId = subscription.metadata?.organizationId;
    
    if (!organizationId) {
      console.warn('Subscription created without organizationId in metadata');
      return;
    }
    
    // Update subscription in database
    await updateSubscriptionFromStripe(organizationId, subscription);
    
    console.log(`Subscription created for organization ${organizationId}: ${subscription.id}`);
  } catch (error) {
    logStripeError(createStripeError(error), { eventType: 'customer.subscription.created' });
    throw error;
  }
}

/**
 * Handle customer subscription updated event
 */
async function handleCustomerSubscriptionUpdated(event: WebhookEvent): Promise<void> {
  try {
    const subscription = event.data.object as any;
    const organizationId = subscription.metadata?.organizationId;
    
    if (!organizationId) {
      console.warn('Subscription updated without organizationId in metadata');
      return;
    }
    
    // Update subscription in database
    await updateSubscriptionFromStripe(organizationId, subscription);
    
    // Handle seat changes if applicable
    if (subscription.metadata?.seatsIncluded || subscription.metadata?.seatsAdditional) {
      await handleSeatChange(organizationId, subscription);
    }
    
    console.log(`Subscription updated for organization ${organizationId}: ${subscription.id}`);
  } catch (error) {
    logStripeError(createStripeError(error), { eventType: 'customer.subscription.updated' });
    throw error;
  }
}

/**
 * Handle customer subscription deleted event
 */
async function handleCustomerSubscriptionDeleted(event: WebhookEvent): Promise<void> {
  try {
    const subscription = event.data.object as any;
    const organizationId = subscription.metadata?.organizationId;
    
    if (!organizationId) {
      console.warn('Subscription deleted without organizationId in metadata');
      return;
    }
    
    // Update subscription status in database
    await updateSubscriptionStatus(organizationId, 'canceled');
    
    // Notify organization admins
    await notifySubscriptionCanceled(organizationId, subscription);
    
    console.log(`Subscription canceled for organization ${organizationId}: ${subscription.id}`);
  } catch (error) {
    logStripeError(createStripeError(error), { eventType: 'customer.subscription.deleted' });
    throw error;
  }
}

/**
 * Handle invoice paid event
 */
async function handleInvoicePaid(event: WebhookEvent): Promise<void> {
  try {
    const invoice = event.data.object as any;
    const organizationId = invoice.metadata?.organizationId;
    
    if (!organizationId) {
      console.warn('Invoice paid without organizationId in metadata');
      return;
    }
    
    // Update invoice status in database
    await updateInvoiceStatus(organizationId, invoice.id, 'paid');
    
    // Update subscription status if needed
    if (invoice.subscription) {
      await updateSubscriptionStatus(organizationId, 'active');
    }
    
    // Notify organization admins
    await notifyPaymentSuccess(organizationId, invoice);
    
    console.log(`Invoice paid for organization ${organizationId}: ${invoice.id}`);
  } catch (error) {
    logStripeError(createStripeError(error), { eventType: 'invoice.paid' });
    throw error;
  }
}

/**
 * Handle invoice payment failed event
 */
async function handleInvoicePaymentFailed(event: WebhookEvent): Promise<void> {
  try {
    const invoice = event.data.object as any;
    const organizationId = invoice.metadata?.organizationId;
    
    if (!organizationId) {
      console.warn('Invoice payment failed without organizationId in metadata');
      return;
    }
    
    // Update subscription status
    await updateSubscriptionStatus(organizationId, 'past_due');
    
    // Notify organization admins
    await notifyPaymentFailed(organizationId, invoice);
    
    console.log(`Invoice payment failed for organization ${organizationId}: ${invoice.id}`);
  } catch (error) {
    logStripeError(createStripeError(error), { eventType: 'invoice.payment_failed' });
    throw error;
  }
}

/**
 * Handle customer updated event
 */
async function handleCustomerUpdated(event: WebhookEvent): Promise<void> {
  try {
    const customer = event.data.object as any;
    const organizationId = customer.metadata?.organizationId;
    
    if (!organizationId) {
      console.warn('Customer updated without organizationId in metadata');
      return;
    }
    
    // Update customer in database
    await updateCustomerFromStripe(organizationId, customer);
    
    console.log(`Customer updated for organization ${organizationId}: ${customer.id}`);
  } catch (error) {
    logStripeError(createStripeError(error), { eventType: 'customer.updated' });
    throw error;
  }
}

// ============================================================================
// WEBHOOK HANDLER REGISTRY
// ============================================================================

const webhookHandlers: Record<string, WebhookHandler> = {
  'customer.subscription.created': {
    eventType: 'customer.subscription.created',
    handler: handleCustomerSubscriptionCreated,
  },
  'customer.subscription.updated': {
    eventType: 'customer.subscription.updated',
    handler: handleCustomerSubscriptionUpdated,
  },
  'customer.subscription.deleted': {
    eventType: 'customer.subscription.deleted',
    handler: handleCustomerSubscriptionDeleted,
  },
  'invoice.paid': {
    eventType: 'invoice.paid',
    handler: handleInvoicePaid,
  },
  'invoice.payment_failed': {
    eventType: 'invoice.payment_failed',
    handler: handleInvoicePaymentFailed,
  },
  'customer.updated': {
    eventType: 'customer.updated',
    handler: handleCustomerUpdated,
  },
};

/**
 * Process Stripe webhook event
 */
/**
 * PHASE 1 ENHANCEMENT: Enhanced webhook processing with logging and error handling
 */
export async function processWebhookEvent(event: WebhookEvent): Promise<void> {
  const startTime = Date.now();
  
  try {
    // Log webhook received
    console.log(`[Stripe Webhook] Processing ${event.type} (ID: ${event.id})`);
    
    const handler = webhookHandlers[event.type];
    
    if (!handler) {
      console.warn(`[Stripe Webhook] No handler for event type: ${event.type}`);
      // Log unhandled event for monitoring
      await logWebhookEvent(event, 'unhandled');
      return;
    }
    
    // Process webhook
    await handler.handler(event);
    
    // Calculate processing time
    const duration = Date.now() - startTime;
    
    // Log successful processing
    console.log(`[Stripe Webhook] Successfully processed ${event.type} in ${duration}ms`);
    await logWebhookEvent(event, 'success', undefined, duration);
    
  } catch (error) {
    // Calculate processing time
    const duration = Date.now() - startTime;
    
    // Log detailed error
    console.error(`[Stripe Webhook] Error processing ${event.type}:`, error);
    logStripeError(createStripeError(error), { 
      eventId: event.id,
      eventType: event.type,
      duration 
    });
    
    // Log failed event
    await logWebhookEvent(event, 'failed', error, duration);
    
    // Re-throw to trigger Stripe retry
    throw error;
  }
}

// ============================================================================
// WEBHOOK EVENT LOGGING (PHASE 1 ENHANCEMENT)
// ============================================================================

/**
 * Log webhook events for debugging and monitoring
 */
async function logWebhookEvent(
  event: WebhookEvent,
  status: 'success' | 'failed' | 'unhandled',
  error?: unknown,
  duration?: number
): Promise<void> {
  try {
    // TODO: Save to database for monitoring
    // await db.insert(webhookLogs).values({
    //   eventId: event.id,
    //   eventType: event.type,
    //   status,
    //   error: error ? String(error) : null,
    //   duration,
    //   timestamp: new Date(),
    //   payload: JSON.stringify(event),
    // });
    
    // For now, just log to console
    console.log(`[Webhook Log] ${event.type} - ${status}${duration ? ` (${duration}ms)` : ''}`);
  } catch (logError) {
    // Don't throw if logging fails
    console.error('[Webhook Log] Failed to log event:', logError);
  }
}

/**
 * Get supported webhook event types
 */
export function getSupportedEventTypes(): string[] {
  return Object.keys(webhookHandlers);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function updateSubscriptionFromStripe(organizationId: string, subscription: any): Promise<void> {
  // TODO: Implement database update
  // await db.update(organizationSubscriptions)
  //   .set({
  //     status: subscription.status,
  //     currentPeriodStart: new Date(subscription.current_period_start * 1000),
  //     currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  //     cancelAtPeriodEnd: subscription.cancel_at_period_end,
  //     updatedAt: new Date(),
  //   })
  //   .where(eq(organizationSubscriptions.organizationId, organizationId));
  
  console.log('Subscription updated from Stripe:', { organizationId, subscriptionId: subscription.id });
}

async function updateSubscriptionStatus(organizationId: string, status: string): Promise<void> {
  // TODO: Implement database update
  // await db.update(organizationSubscriptions)
  //   .set({ status, updatedAt: new Date() })
  //   .where(eq(organizationSubscriptions.organizationId, organizationId));
  
  console.log('Subscription status updated:', { organizationId, status });
}

async function handleSeatChange(organizationId: string, subscription: any): Promise<void> {
  // TODO: Implement seat change handling
  // This would update seat counts and record history
  console.log('Seat change handled:', { organizationId, subscriptionId: subscription.id });
}

async function updateInvoiceStatus(organizationId: string, invoiceId: string, status: string): Promise<void> {
  // TODO: Implement database update
  // await db.update(organizationInvoices)
  //   .set({ status, updatedAt: new Date() })
  //   .where(eq(organizationInvoices.organizationId, organizationId))
  //   .where(eq(organizationInvoices.stripeInvoiceId, invoiceId));
  
  console.log('Invoice status updated:', { organizationId, invoiceId, status });
}

async function updateCustomerFromStripe(organizationId: string, customer: any): Promise<void> {
  // TODO: Implement database update
  // await db.update(organizationStripeCustomers)
  //   .set({
  //     email: customer.email,
  //     name: customer.name,
  //     address: customer.address,
  //     taxId: customer.tax_id,
  //     updatedAt: new Date(),
  //   })
  //   .where(eq(organizationStripeCustomers.organizationId, organizationId));
  
  console.log('Customer updated from Stripe:', { organizationId, customerId: customer.id });
}

async function notifySubscriptionCanceled(organizationId: string, subscription: any): Promise<void> {
  // TODO: Implement notification system
  // This would send emails to organization admins
  console.log('Subscription canceled notification:', { organizationId, subscriptionId: subscription.id });
}

async function notifyPaymentSuccess(organizationId: string, invoice: any): Promise<void> {
  // TODO: Implement notification system
  // This would send payment confirmation emails
  console.log('Payment success notification:', { organizationId, invoiceId: invoice.id });
}

async function notifyPaymentFailed(organizationId: string, invoice: any): Promise<void> {
  // TODO: Implement notification system
  // This would send payment failure emails
  console.log('Payment failed notification:', { organizationId, invoiceId: invoice.id });
}
