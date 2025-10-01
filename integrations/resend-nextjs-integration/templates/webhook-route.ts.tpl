import { NextRequest, NextResponse } from 'next/server';
import { handleWebhook } from '@/lib/email/webhooks';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('resend-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing resend-signature header' },
        { status: 400 }
      );
    }

    const result = await handleWebhook(body, signature);

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully',
      event: result.event 
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
