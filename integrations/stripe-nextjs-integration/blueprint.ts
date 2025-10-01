import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'stripe-nextjs-integration',
  name: 'Stripe Next.js Integration',
  description: 'Complete Next.js integration for Stripe',
  version: '2.0.0',
  actions: [
    // PURE MODIFIER: Enhance the Stripe config with Next.js specific features
    {
      type: 'ENHANCE_FILE',
      path: 'src/lib/payment/stripe.ts',
      modifier: 'ts-module-enhancer',
      params: {
        importsToAdd: [
          { name: 'NextRequest', from: 'next/server', type: 'import' },
          { name: 'NextResponse', from: 'next/server', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Next.js specific Stripe configuration
export const NEXTJS_STRIPE_CONFIG = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  webhookEndpoint: '/api/stripe/webhooks',
  successUrl: process.env.APP_URL + '/payment/success',
  cancelUrl: process.env.APP_URL + '/payment/cancel',
  currency: 'usd',
  mode: 'payment' as const,
};

// Next.js webhook handler
export const handleStripeWebhook = async (request: NextRequest) => {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id);
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
};`
          }
        ]
      }
    },
    
    // PURE MODIFIER: Enhance the Stripe client with Next.js specific features
    {
      type: 'ENHANCE_FILE',
      path: 'src/lib/payment/client.ts',
      modifier: 'ts-module-enhancer',
      params: {
        importsToAdd: [
          { name: 'loadStripe', from: '@stripe/stripe-js', type: 'import' },
          { name: 'NEXTJS_STRIPE_CONFIG', from: './stripe', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Next.js specific Stripe client
export const getStripeClient = () => {
  return loadStripe(NEXTJS_STRIPE_CONFIG.publishableKey);
};

// Next.js specific payment methods
export const createPaymentIntent = async (amount: number, currency = 'usd') => {
  const response = await fetch('/api/stripe/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency }),
  });
  
  return response.json();
};

export const createSubscription = async (priceId: string, customerId?: string, email?: string) => {
  const response = await fetch('/api/stripe/create-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, customerId, email }),
  });
  
  return response.json();
};

export const createPortalSession = async (customerId: string) => {
  const response = await fetch('/api/stripe/create-portal-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId }),
  });
  
  return response.json();
};`
          }
        ]
      }
    },
    
    // Create Next.js API route for webhooks
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/stripe/webhooks/route.ts',
      template: 'templates/webhooks-route.ts.tpl'
    },
    
    // Create Next.js API route for payment intents
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/stripe/create-payment-intent/route.ts',
      template: 'templates/create-payment-intent-route.ts.tpl'
    },
    
    // Create Next.js API route for subscriptions
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/stripe/create-subscription/route.ts',
      template: 'templates/create-subscription-route.ts.tpl'
    },
    
    // Create Next.js API route for customer portal
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/stripe/create-portal-session/route.ts',
      template: 'templates/create-portal-session-route.ts.tpl'
    }
  ]
};