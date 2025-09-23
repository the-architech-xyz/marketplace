import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Subscription Plan Interface
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

// Subscription Management Utilities
export class SubscriptionManager {
  static async createSubscription(
    customerId: string,
    priceId: string,
    trialDays?: number
  ) {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: trialDays,
      expand: ['latest_invoice.payment_intent'],
    });

    return subscription;
  }

  static async updateSubscription(
    subscriptionId: string,
    newPriceId: string,
    prorationBehavior: 'create_prorations' | 'none' = '{{#if module.parameters.proration}}create_prorations{{else}}none{{/if}}'
  ) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: newPriceId,
      }],
      proration_behavior: prorationBehavior,
    });

    return updatedSubscription;
  }

  static async cancelSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return subscription;
  }

  static async createBillingPortalSession(customerId: string, returnUrl?: string) {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || process.env.APP_URL + '/dashboard/billing',
    });

    return session;
  }

  static async getSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price', 'customer'],
    });

    return subscription;
  }

  static async listSubscriptions(customerId: string) {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
      expand: ['data.items.data.price'],
    });

    return subscriptions;
  }

  static async pauseSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      pause_collection: {
        behavior: 'void',
      },
    });

    return subscription;
  }

  static async resumeSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      pause_collection: null,
    });

    return subscription;
  }
}

// Webhook Utilities
export class SubscriptionWebhooks {
  static handleSubscriptionCreated(subscription: Stripe.Subscription) {
    // Handle subscription created event
    console.log('Subscription created:', subscription.id);
    // Add your business logic here
  }

  static handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    // Handle subscription updated event
    console.log('Subscription updated:', subscription.id);
    // Add your business logic here
  }

  static handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    // Handle subscription deleted event
    console.log('Subscription deleted:', subscription.id);
    // Add your business logic here
  }
}
    },
    {
