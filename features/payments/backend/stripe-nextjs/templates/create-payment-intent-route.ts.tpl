import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payment/stripe';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd' } = await request.json();
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
