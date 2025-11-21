/**
 * Queue Definition Helper
 * 
 * Helper functions for defining queue types and job schemas
 */

import { JobOptions } from 'bullmq';

/**
 * Job options with retry configuration
 */
export interface RetryJobOptions extends JobOptions {
  attempts?: number;
  backoff?: {
    type: 'fixed' | 'exponential';
    delay: number;
  };
}

/**
 * Create job options with retry
 */
export function createRetryOptions(
  attempts: number = 3,
  delay: number = 1000
): RetryJobOptions {
  return {
    attempts,
    backoff: {
      type: 'exponential',
      delay,
    },
  };
}

/**
 * Create job options with priority
 */
export function createPriorityOptions(priority: number): JobOptions {
  return {
    priority,
  };
}

/**
 * Create job options with delay
 */
export function createDelayedOptions(delayMs: number): JobOptions {
  return {
    delay: delayMs,
  };
}

