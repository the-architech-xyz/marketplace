/**
 * Email Webhooks API Route
 * 
 * Handles email delivery webhooks from Resend
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Process webhook event
    const eventType = payload.type;
    
    switch (eventType) {
      case 'email.delivered':
        console.log('Email delivered:', payload.data);
        break;
      
      case 'email.bounced':
        console.log('Email bounced:', payload.data);
        break;
      
      case 'email.complained':
        console.log('Email complained:', payload.data);
        break;
      
      default:
        console.log('Unknown event type:', eventType);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
