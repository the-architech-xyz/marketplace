// A/B Testing utility functions
import type { Variant, TrafficSplit, Experiment } from './types.js';

/**
 * Get variant from cookie value
 */
export function getVariantFromCookie(cookieValue: string | null | undefined): Variant | null {
  if (!cookieValue) return null;
  
  try {
    const parsed = JSON.parse(cookieValue);
    return parsed.variant || cookieValue;
  } catch {
    // If not JSON, assume it's just the variant string
    return cookieValue;
  }
}

/**
 * Set variant cookie value
 */
export function setVariantCookie(experimentId: string, variant: Variant): string {
  return JSON.stringify({
    experimentId,
    variant,
    timestamp: Date.now(),
  });
}

/**
 * Parse variant cookie
 */
export function parseVariantCookie(cookieValue: string): {
  experimentId?: string;
  variant: Variant;
  timestamp?: number;
} | null {
  try {
    const parsed = JSON.parse(cookieValue);
    return {
      experimentId: parsed.experimentId,
      variant: parsed.variant || cookieValue,
      timestamp: parsed.timestamp,
    };
  } catch {
    return {
      variant: cookieValue,
    };
  }
}

/**
 * Validate traffic split (must sum to 1.0)
 */
export function validateTrafficSplit(split: TrafficSplit): {
  valid: boolean;
  total: number;
  error?: string;
} {
  const total = Object.values(split).reduce((sum, value) => sum + value, 0);
  
  if (Math.abs(total - 1.0) > 0.01) {
    return {
      valid: false,
      total,
      error: `Traffic split must sum to 1.0, got ${total}`,
    };
  }

  if (Object.values(split).some((value) => value < 0 || value > 1)) {
    return {
      valid: false,
      total,
      error: 'Traffic split values must be between 0 and 1',
    };
  }

  return {
    valid: true,
    total,
  };
}

/**
 * Check if experiment is active
 */
export function isExperimentActive(experiment: Experiment): boolean {
  if (!experiment.enabled) return false;

  const now = new Date();

  if (experiment.startDate) {
    const startDate = typeof experiment.startDate === 'string' 
      ? new Date(experiment.startDate) 
      : experiment.startDate;
    if (now < startDate) return false;
  }

  if (experiment.endDate) {
    const endDate = typeof experiment.endDate === 'string'
      ? new Date(experiment.endDate)
      : experiment.endDate;
    if (now > endDate) return false;
  }

  return true;
}

/**
 * Get experiment variant by index
 */
export function getVariantByIndex(experiment: Experiment, index: number): Variant | null {
  if (index < 0 || index >= experiment.variants.length) {
    return null;
  }
  return experiment.variants[index];
}

/**
 * Calculate cumulative traffic split
 */
export function calculateCumulativeSplit(split: TrafficSplit): { variant: string; cumulative: number }[] {
  let cumulative = 0;
  return Object.entries(split)
    .map(([variant, value]) => {
      cumulative += value;
      return { variant, cumulative };
    })
    .sort((a, b) => a.cumulative - b.cumulative);
}

/**
 * Generate a deterministic variant from user ID
 */
export function getDeterministicVariant(
  userId: string,
  experimentId: string,
  variants: Variant[],
  trafficSplit: TrafficSplit
): Variant {
  // Create a hash-like value from userId + experimentId
  const hash = userId
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) +
    experimentId
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const normalized = (hash % 10000) / 10000; // 0.0 to 0.9999
  
  const cumulativeSplit = calculateCumulativeSplit(trafficSplit);
  
  for (const { variant, cumulative } of cumulativeSplit) {
    if (normalized < cumulative) {
      return variant;
    }
  }
  
  // Fallback to first variant
  return variants[0];
}






























