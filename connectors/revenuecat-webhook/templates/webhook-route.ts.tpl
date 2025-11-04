/**
 * RevenueCat Webhook API Route
 * 
 * Handles webhook events from RevenueCat with HMAC signature verification.
 * This route processes subscription events and updates user status.
 */

import { NextRequest, NextResponse } from 'next/server';
<% if (project.structure === 'monorepo') { %>
import { handleWebhookEvent, verifyWebhookSignature } from '@repo/api/revenuecat/webhook-handler';
<% } else { %>
import { handleWebhookEvent, verifyWebhookSignature } from '<%= importPath(paths.api) %>/revenuecat/webhook-handler';
<% } %>

/**
 * POST handler for RevenueCat webhook events
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    
    // Verify HMAC signature
    const signature = request.headers.get('x-signature');
    const isValid = verifyWebhookSignature(body, signature);

    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload = JSON.parse(body);

    // Process webhook event
    await handleWebhookEvent(payload);

    return NextResponse.json({ received: true }, { status: 200 });
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

/**
 * GET handler for webhook verification (optional)
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/revenuecat/webhook'
  });
}

