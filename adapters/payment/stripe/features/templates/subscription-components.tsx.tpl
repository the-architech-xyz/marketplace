# Stripe Subscriptions Integration Guide

## Overview

This guide shows how to integrate Stripe Subscriptions with your authentication and database systems.

## Prerequisites

- Stripe account with API keys
- Authentication system (Better Auth, NextAuth, etc.)
- Database for storing subscription data

## Basic Setup

### 1. Environment Variables

\`\`\`bash
# .env.local
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
\`\`\

### 2. Database Schema

Add subscription fields to your user model:

\`\`\`typescript
// User model
interface User {
  id: string;
  email: string;
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: 'active' | 'canceled' | 'past_due';
  subscriptionPlan?: string;
}
\`\`\

## Integration Examples

### With Authentication System

\`\`\`typescript
// Example integration with any authentication system
import { SubscriptionManager } from '@/lib/stripe/subscriptions';

export async function createSubscription(
  userId: string,
  priceId: string,
  trialDays?: number
) {
  try {
    // Get user from your authentication system
    const user = await getUserById(userId);
    if (!user?.stripeCustomerId) {
      throw new Error('No Stripe customer found');
    }

    const subscription = await SubscriptionManager.createSubscription(
      user.stripeCustomerId,
      priceId,
      trialDays
    );

    // Update user in database
    await updateUser(userId, { subscriptionId: subscription.id });

    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}
\`\`\

### With Database (Drizzle/Prisma)

\`\`\`typescript
// src/lib/db/subscriptions.ts
import { db } from './index';
import { users } from './schema';
import { eq } from 'drizzle-orm';

export async function updateUserSubscription(
  userId: string,
  subscriptionData: {
    subscriptionId?: string;
    subscriptionStatus?: string;
    subscriptionPlan?: string;
  }
) {
  return await db
    .update(users)
    .set(subscriptionData)
    .where(eq(users.id, userId));
}
\`\`\

## Webhook Handling

\`\`\`typescript
// Framework-agnostic webhook handler
import { SubscriptionWebhooks } from '@/lib/stripe/subscriptions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function handleStripeWebhook(
  body: string,
  signature: string
) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    throw new Error('Invalid signature');
  }

  switch (event.type) {
    case 'customer.subscription.created':
      SubscriptionWebhooks.handleSubscriptionCreated(event.data.object);
      break;
    case 'customer.subscription.updated':
      SubscriptionWebhooks.handleSubscriptionUpdated(event.data.object);
      break;
    case 'customer.subscription.deleted':
      SubscriptionWebhooks.handleSubscriptionDeleted(event.data.object);
      break;
  }

  return { received: true };
}
\`\`\

## UI Components

### Subscription Plans Component

\`\`\`typescript
// src/components/subscriptions/SubscriptionPlans.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

interface SubscriptionPlansProps {
  plans: SubscriptionPlan[];
  currentPlan?: string;
  onSelectPlan: (planId: string) => void;
  loading?: boolean;
}

export function SubscriptionPlans({ plans, currentPlan, onSelectPlan, loading }: SubscriptionPlansProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card key={plan.id} className={currentPlan === plan.id ? 'ring-2 ring-primary' : ''}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>
              \${(plan.price / 100).toFixed(2)}/\${plan.interval}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => onSelectPlan(plan.id)}
              disabled={loading || currentPlan === plan.id}
              className="w-full"
            >
              {currentPlan === plan.id ? 'Current Plan' : 'Select Plan'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
\`\`\

## Best Practices

1. **Always validate webhooks** with Stripe's signature verification
2. **Store subscription data** in your database for quick access
3. **Handle edge cases** like failed payments and subscription changes
4. **Use Stripe's test mode** during development
5. **Implement proper error handling** for all API calls

## Common Patterns

### Subscription Status Check

\`\`\`typescript
export function hasActiveSubscription(user: User): boolean {
  return user.subscriptionStatus === 'active';
}

export function getSubscriptionPlan(user: User): string | null {
  return user.subscriptionPlan || null;
}
\`\`\

### Access Control

\`\`\`typescript
export function requireSubscription(user: User) {
  if (!hasActiveSubscription(user)) {
    throw new Error('Subscription required');
  }
  return true;
}
\`\`\

    },
    {
      type: 'ADD_ENV_VAR',
      key: 'STRIPE_SECRET_KEY',
      value: 'sk_test_...',
      description: 'Stripe secret key for subscriptions'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'STRIPE_PUBLISHABLE_KEY',
      value: 'pk_test_...',
      description: 'Stripe publishable key for client-side'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'STRIPE_WEBHOOK_SECRET',
      value: 'whsec_...',
      description: 'Stripe webhook secret for verification'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'STRIPE_BASIC_PLAN_PRICE_ID',
      value: 'price_...',
      description: 'Stripe price ID for basic plan (create in Stripe Dashboard)'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'STRIPE_PRO_PLAN_PRICE_ID',
      value: 'price_...',
      description: 'Stripe price ID for pro plan (create in Stripe Dashboard)'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'STRIPE_ENTERPRISE_PLAN_PRICE_ID',
      value: 'price_...',
      description: 'Stripe price ID for enterprise plan (create in Stripe Dashboard)'
    }
  ]
};

export default subscriptionsFeatureBlueprint;
