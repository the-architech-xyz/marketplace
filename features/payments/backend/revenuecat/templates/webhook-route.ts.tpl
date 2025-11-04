/**
 * RevenueCat Webhook Route
 * 
 * Receives webhooks from RevenueCat and syncs subscription data to your
 * standardized payment infrastructure. This enables seamless integration with
 * auth, emailing, and analytics capabilities.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { processRevenueCatWebhook } from '@/lib/revenuecat/webhook-processor';
import { mapRevenueCatUser } from '@/lib/revenuecat/user-mapper';

const WEBHOOK_SECRET = process.env.REVENUECAT_WEBHOOK_SECRET!;

interface RevenueCatWebhookEvent {
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
 * POST handler for RevenueCat webhook events
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-signature');

    // 2. Verify HMAC signature
    if (process.env.NODE_ENV === 'production' && !verifySignature(body, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // 3. Parse webhook payload
    const payload: RevenueCatWebhookEvent = JSON.parse(body);

    // 4. Map RevenueCat user to your auth system
    const userId = await mapRevenueCatUser(payload.event.app_user_id);

    // 5. Process webhook and sync to standardized database
    await processRevenueCatWebhook({
      ...payload.event,
      mappedUserId: userId,
    });

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
 * HEAD handler for health checks
 */
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

