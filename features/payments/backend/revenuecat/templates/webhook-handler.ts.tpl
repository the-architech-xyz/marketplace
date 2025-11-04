/**
 * RevenueCat Webhook Handler
 * 
 * Handles webhook events from RevenueCat for subscription management.
 * Implements HMAC signature verification for security.
 */

import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const REVENUECAT_SECRET_KEY = process.env.REVENUECAT_SECRET_KEY!;
const WEBHOOK_SECRET = process.env.REVENUECAT_WEBHOOK_SECRET;

interface WebhookPayload {
  event: {
    id: string;
    type: string;
    app_user_id: string;
    product_id?: string;
    expiration_at_ms?: number;
    purchased_at_ms?: number;
    is_trial_period?: boolean;
    period_type?: 'NORMAL' | 'TRIAL' | 'INTRO';
    store?: 'APP_STORE' | 'PLAY_STORE' | 'STRIPE';
  };
}

/**
 * Verify HMAC signature of webhook request
 */
function verifySignature(payload: string, signature: string | null): boolean {
  if (!WEBHOOK_SECRET || !signature) {
    console.warn('Webhook secret or signature missing');
    return false;
  }

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

/**
 * Process webhook event
 */
async function processWebhookEvent(payload: WebhookPayload) {
  const { event } = payload;
  
  console.log(`Processing RevenueCat webhook: ${event.type}`, {
    eventId: event.id,
    userId: event.app_user_id,
    productId: event.product_id,
  });

  try {
    // TODO: Implement your business logic here
    // Examples:
    // - Update user subscription status in database
    // - Grant/revoke access to premium features
    // - Send confirmation emails
    // - Update analytics

    switch (event.type) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'UNCANCEL':
        // Grant access to premium features
        await grantPremiumAccess(event.app_user_id, event.product_id);
        break;

      case 'CANCELLATION':
      case 'EXPIRATION':
        // Revoke access to premium features
        await revokePremiumAccess(event.app_user_id);
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
 * Grant premium access to user
 */
async function grantPremiumAccess(userId: string, productId?: string) {
  // TODO: Implement your business logic
  console.log(`Granting premium access to user: ${userId}`);
}

/**
 * Revoke premium access from user
 */
async function revokePremiumAccess(userId: string) {
  // TODO: Implement your business logic
  console.log(`Revoking premium access from user: ${userId}`);
}

/**
 * Next.js API route handler for RevenueCat webhooks
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body and signature
    const body = await request.text();
    const signature = request.headers.get('x-signature');

    // Verify HMAC signature
    if (process.env.NODE_ENV === 'production' && !verifySignature(body, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload: WebhookPayload = JSON.parse(body);

    // Process webhook event
    await processWebhookEvent(payload);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle HEAD requests for webhook health checks
 */
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

