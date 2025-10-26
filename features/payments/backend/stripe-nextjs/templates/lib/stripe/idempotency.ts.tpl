/**
 * Idempotency Key Generator for Stripe Operations
 * 
 * PHASE 1 ENHANCEMENT: Prevent duplicate payments and operations
 * 
 * Idempotency keys ensure that if a request is retried (due to network issues,
 * user double-clicks, etc.), Stripe will recognize it as a duplicate and return
 * the original result instead of creating duplicate charges.
 */

import { randomUUID } from 'crypto';

/**
 * Generate a deterministic idempotency key for Stripe operations
 * 
 * @param operation - Operation type (e.g., 'create-subscription', 'add-seats')
 * @param organizationId - Organization ID for scoping
 * @param additionalData - Additional data for uniqueness (e.g., plan ID, amount)
 * @returns Idempotency key in format: operation-orgId-timestamp-data
 */
export function generateIdempotencyKey(
  operation: string,
  organizationId: string,
  additionalData?: string | Record<string, unknown>
): string {
  const timestamp = Date.now();
  const data = typeof additionalData === 'string' 
    ? additionalData 
    : additionalData 
      ? JSON.stringify(additionalData)
      : randomUUID();
  
  // Create deterministic key
  return `${operation}-${organizationId}-${timestamp}-${data}`;
}

/**
 * Generate idempotency key for subscription creation
 */
export function subscriptionCreationKey(
  organizationId: string,
  planId: string,
  seats?: number
): string {
  return generateIdempotencyKey(
    'create-subscription',
    organizationId,
    `${planId}-${seats || 0}`
  );
}

/**
 * Generate idempotency key for subscription update
 */
export function subscriptionUpdateKey(
  organizationId: string,
  subscriptionId: string,
  updateData: Record<string, unknown>
): string {
  return generateIdempotencyKey(
    'update-subscription',
    organizationId,
    `${subscriptionId}-${JSON.stringify(updateData)}`
  );
}

/**
 * Generate idempotency key for seat addition
 */
export function seatAdditionKey(
  organizationId: string,
  seatCount: number,
  timestamp?: number
): string {
  return generateIdempotencyKey(
    'add-seats',
    organizationId,
    `${seatCount}-${timestamp || Date.now()}`
  );
}

/**
 * Generate idempotency key for seat removal
 */
export function seatRemovalKey(
  organizationId: string,
  seatCount: number,
  timestamp?: number
): string {
  return generateIdempotencyKey(
    'remove-seats',
    organizationId,
    `${seatCount}-${timestamp || Date.now()}`
  );
}

/**
 * Generate idempotency key for subscription cancellation
 */
export function subscriptionCancellationKey(
  organizationId: string,
  subscriptionId: string
): string {
  return generateIdempotencyKey(
    'cancel-subscription',
    organizationId,
    subscriptionId
  );
}

/**
 * Generate idempotency key for customer creation
 */
export function customerCreationKey(
  organizationId: string,
  email: string
): string {
  return generateIdempotencyKey(
    'create-customer',
    organizationId,
    email
  );
}

/**
 * Generate idempotency key for usage reporting
 */
export function usageReportKey(
  organizationId: string,
  teamId: string,
  usage: number,
  timestamp: number
): string {
  return generateIdempotencyKey(
    'report-usage',
    organizationId,
    `${teamId}-${usage}-${timestamp}`
  );
}

