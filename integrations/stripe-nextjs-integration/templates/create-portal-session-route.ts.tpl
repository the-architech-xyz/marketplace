import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payment/stripe';

export async function POST(request: NextRequest) {
  try {
    const { customerId } = await request.json();
    
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.APP_URL + '/dashboard',
    });
    
    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}
