// Variant assignment logic
import type { Experiment, Variant } from './types.js';
import { AB_TESTING_CONFIG } from './config.js';
import { getDeterministicVariant, isExperimentActive } from './utils.js';
import { calculateCumulativeSplit } from './utils.js';

/**
 * Assign variant randomly based on traffic split
 */
export function assignVariantRandom(experiment: Experiment): Variant {
  if (!isExperimentActive(experiment)) {
    return experiment.variants[0]; // Default to first variant if inactive
  }

  const random = Math.random();
  const cumulativeSplit = calculateCumulativeSplit(experiment.trafficSplit);

  for (const { variant, cumulative } of cumulativeSplit) {
    if (random < cumulative) {
      return variant;
    }
  }

  // Fallback to first variant
  return experiment.variants[0];
}

/**
 * Assign variant deterministically based on user ID
 */
export function assignVariantDeterministic(
  experiment: Experiment,
  userId: string
): Variant {
  if (!isExperimentActive(experiment)) {
    return experiment.variants[0];
  }

  return getDeterministicVariant(
    userId,
    experiment.id,
    experiment.variants,
    experiment.trafficSplit
  );
}

/**
 * Assign variant based on session ID (fallback if no user ID)
 */
export function assignVariantBySession(
  experiment: Experiment,
  sessionId: string
): Variant {
  if (!isExperimentActive(experiment)) {
    return experiment.variants[0];
  }

  // Use session ID as deterministic seed
  return getDeterministicVariant(
    sessionId,
    experiment.id,
    experiment.variants,
    experiment.trafficSplit
  );
}

/**
 * Get variant from override query parameter (if allowed)
 */
export function getVariantFromOverride(
  experiment: Experiment,
  queryParam: string | null | undefined
): Variant | null {
  if (!experiment.allowOverride || !queryParam) {
    return null;
  }

  // Check if override value is a valid variant
  if (experiment.variants.includes(queryParam)) {
    return queryParam;
  }

  return null;
}

/**
 * Main variant assignment function
 * Tries multiple methods in order: override > cookie > deterministic > random
 */
export function assignVariant(
  experiment: Experiment,
  options: {
    userId?: string;
    sessionId?: string;
    cookieVariant?: Variant | null;
    overrideVariant?: string | null;
  }
): Variant {
  // 1. Check override (if allowed)
  if (options.overrideVariant) {
    const override = getVariantFromOverride(experiment, options.overrideVariant);
    if (override) {
      return override;
    }
  }

  // 2. Check cookie (if sticky)
  if (experiment.sticky && options.cookieVariant) {
    if (experiment.variants.includes(options.cookieVariant)) {
      return options.cookieVariant;
    }
  }

  // 3. Use deterministic assignment if user ID available
  if (options.userId) {
    return assignVariantDeterministic(experiment, options.userId);
  }

  // 4. Use session-based assignment if session ID available
  if (options.sessionId) {
    return assignVariantBySession(experiment, options.sessionId);
  }

  // 5. Fallback to random assignment
  return assignVariantRandom(experiment);
}




