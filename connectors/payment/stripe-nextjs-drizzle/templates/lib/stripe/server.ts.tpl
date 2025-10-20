/**
 * Stripe Server Client - Next.js + Drizzle Connector
 * 
 * Re-exports base Stripe client from adapter.
 * The adapter provides the configured Stripe client, we just re-export it here
 * for convenience and to maintain backward compatibility with existing imports.
 * 
 * Organization billing configuration is in ./config.ts
 */

// Import base Stripe client from adapter
import { stripe as baseStripe } from '@/lib/payment/stripe';

// Re-export base Stripe client (same instance, no duplication)
export const stripe = baseStripe;

// Export as default for backward compatibility
export default stripe;
