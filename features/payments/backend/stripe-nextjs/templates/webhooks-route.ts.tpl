import { NextRequest } from 'next/server';
import { handleStripeWebhook } from '@/lib/payment/stripe';

export async function POST(request: NextRequest) {
  return handleStripeWebhook(request);
}
