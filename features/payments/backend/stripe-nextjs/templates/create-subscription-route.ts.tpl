import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payment/stripe';

export async function POST(request: NextRequest) {
  try {
    const { priceId, customerId } = await request.json();
    
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });
    
    return NextResponse.json({ 
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret 
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}
