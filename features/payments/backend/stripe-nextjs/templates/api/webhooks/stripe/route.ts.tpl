/**
 * Stripe Webhook API Route
 * 
 * Handles Stripe webhook events for organization billing.
 * This route processes webhook events and updates the database accordingly.
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { processWebhookEvent } from '@/lib/stripe/webhooks';
import { createStripeError, logStripeError } from '@/lib/stripe/errors';

// ============================================================================
// POST /api/webhooks/stripe
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // 1. Get the raw body
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: { code: 'MISSING_SIGNATURE', message: 'Stripe signature is required' } },
        { status: 400 }
      );
    }
    
    // 2. Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json(
        { error: { code: 'INVALID_SIGNATURE', message: 'Invalid webhook signature' } },
        { status: 400 }
      );
    }
    
    // 3. Process the webhook event
    await processWebhookEvent(event);
    
    // 4. Return success response
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing Stripe webhook:', error);
    
    // Log the error for debugging
    logStripeError(createStripeError(error), { 
      webhook: true,
      body: await request.text().catch(() => 'Unable to read body')
    });
    
    // Return error response
    return NextResponse.json(
      { error: { code: 'WEBHOOK_PROCESSING_ERROR', message: 'Failed to process webhook' } },
      { status: 500 }
    );
  }
}

// ============================================================================
// GET /api/webhooks/stripe (for testing)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    // This endpoint can be used for webhook testing
    const { searchParams } = new URL(request.url);
    const test = searchParams.get('test');
    
    if (test === 'ping') {
      return NextResponse.json({ 
        message: 'Stripe webhook endpoint is working',
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json({
      message: 'Stripe webhook endpoint',
      supportedEvents: [
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'invoice.paid',
        'invoice.payment_failed',
        'customer.updated',
      ],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in webhook GET endpoint:', error);
    return NextResponse.json(
      { error: { code: 'ENDPOINT_ERROR', message: 'Failed to process request' } },
      { status: 500 }
    );
  }
}
