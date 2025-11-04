// A/B testing and experiments utilities
import { Analytics } from './analytics.js';

/**
 * Get experiment variant
 */
export function getExperimentVariant(experimentKey: string): string | undefined {
  return Analytics.getExperimentVariant(experimentKey);
}

/**
 * Check if user is in experiment variant
 */
export function isInVariant(experimentKey: string, variant: string): boolean {
  const userVariant = getExperimentVariant(experimentKey);
  return userVariant === variant;
}

/**
 * Track experiment exposure
 */
export function trackExperimentExposure(
  experimentKey: string,
  variant: string,
  properties?: Record<string, unknown>
) {
  Analytics.capture('$experiment_exposed', {
    experiment_key: experimentKey,
    variant,
    ...properties,
  });
}

/**
 * Get experiment variant or default
 */
export function getVariantOrDefault(experimentKey: string, defaultValue: string): string {
  return getExperimentVariant(experimentKey) || defaultValue;
}


