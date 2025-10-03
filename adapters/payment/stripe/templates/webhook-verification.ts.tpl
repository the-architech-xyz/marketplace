/**
 * Stripe Webhook Verification
 * 
 * Production-ready webhook signature verification for Stripe
 * Provides secure webhook handling with proper signature validation
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

/**
 * Webhook signature verification result
 */
interface WebhookVerificationResult {
  isValid: boolean;
  event?: Stripe.Event;
  error?: string;
}

/**
 * Verify Stripe webhook signature
 * 
 * @param request - Next.js request object
 * @param webhookSecret - Stripe webhook secret
 * @returns Verification result with event or error
 */
export async function verifyStripeWebhook(
  request: NextRequest,
  webhookSecret: string
): Promise<WebhookVerificationResult> {
  try {
    // Get the raw body
    const body = await request.text();
    
    // Get the signature from headers
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      return {
        isValid: false,
        error: 'Missing stripe-signature header'
      };
    }

    // Verify the signature
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Unknown error';
      return {
        isValid: false,
        error: `Webhook signature verification failed: ${error}`
      };
    }

    return {
      isValid: true,
      event
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      isValid: false,
      error: `Webhook verification failed: ${errorMessage}`
    };
  }
}

/**
 * Enhanced webhook verification with additional security checks
 * 
 * @param request - Next.js request object
 * @param webhookSecret - Stripe webhook secret
 * @param options - Additional verification options
 * @returns Verification result with event or error
 */
export async function verifyStripeWebhookEnhanced(
  request: NextRequest,
  webhookSecret: string,
  options: {
    allowedEvents?: string[];
    maxAge?: number; // Maximum age in seconds
    requireHttps?: boolean;
  } = {}
): Promise<WebhookVerificationResult> {
  try {
    // Basic verification first
    const basicResult = await verifyStripeWebhook(request, webhookSecret);
    
    if (!basicResult.isValid || !basicResult.event) {
      return basicResult;
    }

    const event = basicResult.event;

    // Check if event type is allowed
    if (options.allowedEvents && !options.allowedEvents.includes(event.type)) {
      return {
        isValid: false,
        error: `Event type '${event.type}' is not allowed`
      };
    }

    // Check event age (if maxAge is specified)
    if (options.maxAge) {
      const eventAge = Date.now() - (event.created * 1000);
      if (eventAge > options.maxAge * 1000) {
        return {
          isValid: false,
          error: `Event is too old: ${eventAge}ms > ${options.maxAge * 1000}ms`
        };
      }
    }

    // Check if HTTPS is required
    if (options.requireHttps && request.url.startsWith('http://')) {
      return {
        isValid: false,
        error: 'HTTPS is required for webhook verification'
      };
    }

    return {
      isValid: true,
      event
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      isValid: false,
      error: `Enhanced webhook verification failed: ${errorMessage}`
    };
  }
}

/**
 * Webhook handler with automatic signature verification
 * 
 * @param request - Next.js request object
 * @param handler - Function to handle the verified event
 * @param options - Verification options
 * @returns Next.js response
 */
export async function handleStripeWebhook(
  request: NextRequest,
  handler: (event: Stripe.Event) => Promise<NextResponse>,
  options: {
    webhookSecret?: string;
    allowedEvents?: string[];
    maxAge?: number;
    requireHttps?: boolean;
  } = {}
): Promise<NextResponse> {
  try {
    const webhookSecret = options.webhookSecret || process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify the webhook
    const verification = await verifyStripeWebhookEnhanced(
      request,
      webhookSecret,
      {
        allowedEvents: options.allowedEvents,
        maxAge: options.maxAge,
        requireHttps: options.requireHttps
      }
    );

    if (!verification.isValid || !verification.event) {
      return NextResponse.json(
        { error: verification.error || 'Webhook verification failed' },
        { status: 400 }
      );
    }

    // Handle the verified event
    return await handler(verification.event);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Webhook handling failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}

/**
 * Webhook event type guards
 * Type-safe event handling for common Stripe events
 */
export const StripeEventGuards = {
  isPaymentIntentSucceeded: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.PaymentIntent } } => {
    return event.type === 'payment_intent.succeeded';
  },

  isPaymentIntentPaymentFailed: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.PaymentIntent } } => {
    return event.type === 'payment_intent.payment_failed';
  },

  isCustomerSubscriptionCreated: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.Subscription } } => {
    return event.type === 'customer.subscription.created';
  },

  isCustomerSubscriptionUpdated: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.Subscription } } => {
    return event.type === 'customer.subscription.updated';
  },

  isCustomerSubscriptionDeleted: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.Subscription } } => {
    return event.type === 'customer.subscription.deleted';
  },

  isInvoicePaymentSucceeded: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.Invoice } } => {
    return event.type === 'invoice.payment_succeeded';
  },

  isInvoicePaymentFailed: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.Invoice } } => {
    return event.type === 'invoice.payment_failed';
  },

  isCheckoutSessionCompleted: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.Checkout.Session } } => {
    return event.type === 'checkout.session.completed';
  },

  isCustomerCreated: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.Customer } } => {
    return event.type === 'customer.created';
  },

  isCustomerUpdated: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.Customer } } => {
    return event.type === 'customer.updated';
  },

  isCustomerDeleted: (event: Stripe.Event): event is Stripe.Event & { data: { object: Stripe.Customer } } => {
    return event.type === 'customer.deleted';
  },
};

/**
 * Webhook event logger
 * Provides structured logging for webhook events
 */
export class WebhookEventLogger {
  private static logEvent(event: Stripe.Event, level: 'info' | 'warn' | 'error' = 'info') {
    const logData = {
      eventId: event.id,
      eventType: event.type,
      created: new Date(event.created * 1000).toISOString(),
      livemode: event.livemode,
      apiVersion: event.api_version,
    };

    switch (level) {
      case 'info':
        console.log('Stripe Webhook Event:', logData);
        break;
      case 'warn':
        console.warn('Stripe Webhook Event (Warning):', logData);
        break;
      case 'error':
        console.error('Stripe Webhook Event (Error):', logData);
        break;
    }
  }

  static logSuccess(event: Stripe.Event) {
    this.logEvent(event, 'info');
  }

  static logWarning(event: Stripe.Event, message: string) {
    this.logEvent(event, 'warn');
    console.warn(`Webhook Warning: ${message}`);
  }

  static logError(event: Stripe.Event, error: Error) {
    this.logEvent(event, 'error');
    console.error(`Webhook Error: ${error.message}`, error);
  }
}

/**
 * Webhook rate limiting
 * Basic rate limiting for webhook endpoints
 */
export class WebhookRateLimiter {
  private static requests = new Map<string, { count: number; resetTime: number }>();
  private static readonly WINDOW_MS = 60 * 1000; // 1 minute
  private static readonly MAX_REQUESTS = 100; // Max requests per window

  static isRateLimited(ip: string): boolean {
    const now = Date.now();
    const key = `webhook:${ip}`;
    const current = this.requests.get(key);

    if (!current || now > current.resetTime) {
      this.requests.set(key, { count: 1, resetTime: now + this.WINDOW_MS });
      return false;
    }

    if (current.count >= this.MAX_REQUESTS) {
      return true;
    }

    current.count++;
    return false;
  }

  static getRemainingRequests(ip: string): number {
    const key = `webhook:${ip}`;
    const current = this.requests.get(key);
    
    if (!current) {
      return this.MAX_REQUESTS;
    }

    return Math.max(0, this.MAX_REQUESTS - current.count);
  }
}

/**
 * Webhook security utilities
 * Additional security measures for webhook handling
 */
export class WebhookSecurity {
  /**
   * Validate webhook IP address against Stripe's IP ranges
   * Note: This is a simplified version. In production, you should use
   * Stripe's official IP ranges and update them regularly.
   */
  static async validateStripeIP(ip: string): Promise<boolean> {
    // In production, you should fetch and cache Stripe's IP ranges
    // For now, we'll do basic validation
    const stripeIPs = [
      '54.187.174.169',
      '54.187.205.235',
      '54.187.216.72',
      '54.241.31.99',
      '54.241.31.102',
      '54.241.34.107',
    ];

    return stripeIPs.includes(ip);
  }

  /**
   * Sanitize webhook data for logging
   * Remove sensitive information before logging
   */
  static sanitizeEventData(event: Stripe.Event): Partial<Stripe.Event> {
    const sanitized = { ...event };
    
    // Remove sensitive data
    if (sanitized.data?.object) {
      const obj = sanitized.data.object as any;
      
      // Remove sensitive fields
      delete obj.client_secret;
      delete obj.secret;
      delete obj.private_key;
      
      // Mask sensitive strings
      if (obj.email) {
        obj.email = obj.email.replace(/(.{2}).*(@.*)/, '$1***$2');
      }
      
      if (obj.phone) {
        obj.phone = obj.phone.replace(/(.{3}).*(.{3})/, '$1***$2');
      }
    }

    return sanitized;
  }
}
