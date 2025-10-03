/**
 * Stripe Webhook Route
 * 
 * Production-ready webhook endpoint with signature verification
 * Handles all Stripe webhook events securely
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  handleStripeWebhook, 
  StripeEventGuards, 
  WebhookEventLogger,
  WebhookRateLimiter,
  WebhookSecurity 
} from '@/lib/payment/webhook-verification';
import { stripe } from '@/lib/payment/stripe';

/**
 * Handle Stripe webhook events
 * 
 * This endpoint processes all Stripe webhook events with proper
 * signature verification and rate limiting.
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limiting
    if (WebhookRateLimiter.isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Handle the webhook with verification
    return await handleStripeWebhook(
      request,
      async (event) => {
        // Log the event
        WebhookEventLogger.logSuccess(event);

        // Handle different event types
        try {
          if (StripeEventGuards.isPaymentIntentSucceeded(event)) {
            await handlePaymentIntentSucceeded(event.data.object);
          } else if (StripeEventGuards.isPaymentIntentPaymentFailed(event)) {
            await handlePaymentIntentFailed(event.data.object);
          } else if (StripeEventGuards.isCustomerSubscriptionCreated(event)) {
            await handleSubscriptionCreated(event.data.object);
          } else if (StripeEventGuards.isCustomerSubscriptionUpdated(event)) {
            await handleSubscriptionUpdated(event.data.object);
          } else if (StripeEventGuards.isCustomerSubscriptionDeleted(event)) {
            await handleSubscriptionDeleted(event.data.object);
          } else if (StripeEventGuards.isInvoicePaymentSucceeded(event)) {
            await handleInvoicePaymentSucceeded(event.data.object);
          } else if (StripeEventGuards.isInvoicePaymentFailed(event)) {
            await handleInvoicePaymentFailed(event.data.object);
          } else if (StripeEventGuards.isCheckoutSessionCompleted(event)) {
            await handleCheckoutSessionCompleted(event.data.object);
          } else if (StripeEventGuards.isCustomerCreated(event)) {
            await handleCustomerCreated(event.data.object);
          } else if (StripeEventGuards.isCustomerUpdated(event)) {
            await handleCustomerUpdated(event.data.object);
          } else if (StripeEventGuards.isCustomerDeleted(event)) {
            await handleCustomerDeleted(event.data.object);
          } else {
            // Log unhandled event types
            WebhookEventLogger.logWarning(event, `Unhandled event type: ${event.type}`);
          }

          return NextResponse.json({ received: true });
        } catch (error) {
          WebhookEventLogger.logError(event, error as Error);
          return NextResponse.json(
            { error: 'Event processing failed' },
            { status: 500 }
          );
        }
      },
      {
        allowedEvents: [
          'payment_intent.succeeded',
          'payment_intent.payment_failed',
          'customer.subscription.created',
          'customer.subscription.updated',
          'customer.subscription.deleted',
          'invoice.payment_succeeded',
          'invoice.payment_failed',
          'checkout.session.completed',
          'customer.created',
          'customer.updated',
          'customer.deleted',
        ],
        maxAge: 300, // 5 minutes
        requireHttps: process.env.NODE_ENV === 'production'
      }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(paymentIntent: any) {
  console.log('Payment succeeded:', paymentIntent.id);
  
  // TODO: Update your database with successful payment
  // Example:
  // await updatePaymentStatus(paymentIntent.id, 'succeeded');
  // await sendPaymentConfirmationEmail(paymentIntent.customer);
}

/**
 * Handle failed payment intent
 */
async function handlePaymentIntentFailed(paymentIntent: any) {
  console.log('Payment failed:', paymentIntent.id);
  
  // TODO: Update your database with failed payment
  // Example:
  // await updatePaymentStatus(paymentIntent.id, 'failed');
  // await sendPaymentFailureEmail(paymentIntent.customer);
}

/**
 * Handle subscription created
 */
async function handleSubscriptionCreated(subscription: any) {
  console.log('Subscription created:', subscription.id);
  
  // TODO: Update your database with new subscription
  // Example:
  // await createSubscription(subscription);
  // await sendWelcomeEmail(subscription.customer);
}

/**
 * Handle subscription updated
 */
async function handleSubscriptionUpdated(subscription: any) {
  console.log('Subscription updated:', subscription.id);
  
  // TODO: Update your database with subscription changes
  // Example:
  // await updateSubscription(subscription);
}

/**
 * Handle subscription deleted
 */
async function handleSubscriptionDeleted(subscription: any) {
  console.log('Subscription deleted:', subscription.id);
  
  // TODO: Update your database with subscription cancellation
  // Example:
  // await cancelSubscription(subscription.id);
  // await sendCancellationEmail(subscription.customer);
}

/**
 * Handle successful invoice payment
 */
async function handleInvoicePaymentSucceeded(invoice: any) {
  console.log('Invoice payment succeeded:', invoice.id);
  
  // TODO: Update your database with successful invoice payment
  // Example:
  // await updateInvoiceStatus(invoice.id, 'paid');
}

/**
 * Handle failed invoice payment
 */
async function handleInvoicePaymentFailed(invoice: any) {
  console.log('Invoice payment failed:', invoice.id);
  
  // TODO: Update your database with failed invoice payment
  // Example:
  // await updateInvoiceStatus(invoice.id, 'failed');
  // await sendPaymentFailureEmail(invoice.customer);
}

/**
 * Handle checkout session completed
 */
async function handleCheckoutSessionCompleted(session: any) {
  console.log('Checkout session completed:', session.id);
  
  // TODO: Update your database with completed checkout
  // Example:
  // await createOrder(session);
  // await sendOrderConfirmationEmail(session.customer);
}

/**
 * Handle customer created
 */
async function handleCustomerCreated(customer: any) {
  console.log('Customer created:', customer.id);
  
  // TODO: Update your database with new customer
  // Example:
  // await createCustomer(customer);
}

/**
 * Handle customer updated
 */
async function handleCustomerUpdated(customer: any) {
  console.log('Customer updated:', customer.id);
  
  // TODO: Update your database with customer changes
  // Example:
  // await updateCustomer(customer);
}

/**
 * Handle customer deleted
 */
async function handleCustomerDeleted(customer: any) {
  console.log('Customer deleted:', customer.id);
  
  // TODO: Update your database with customer deletion
  // Example:
  // await deleteCustomer(customer.id);
}

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
}
