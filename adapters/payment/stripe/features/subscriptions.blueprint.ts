/**
 * Stripe Subscriptions Feature Blueprint
 * 
 * Adds subscription management capabilities to an existing Stripe setup
 * This feature can be added to projects that already have Stripe configured
 */

import { Blueprint } from '@thearchitech.xyz/types';

const subscriptionsFeatureBlueprint: Blueprint = {
  id: 'stripe-subscriptions-feature',
  name: 'Stripe Subscriptions Feature',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'src/lib/stripe/subscriptions.ts',
      template: 'templates/subscriptions.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useSubscription.ts', 
      template: 'templates/subscription-hooks.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/subscription/SubscriptionManager.tsx',
      template: 'templates/subscription-components.tsx.tpl'
    }
  ]
};

export default subscriptionsFeatureBlueprint;