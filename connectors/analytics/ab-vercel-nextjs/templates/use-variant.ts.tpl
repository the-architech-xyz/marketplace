/**
 * useVariant Hook
 * 
 * Simplified hook for accessing variant directly.
 * Alternative to useExperiment for simpler use cases.
 */

'use client';

import { useExperiment } from './use-experiment';
import type { Variant } from '@/lib/ab-testing/types';

/**
 * Get variant for an experiment (shorthand)
 */
export function useVariant(experimentId: string): Variant | null {
  const { variant } = useExperiment(experimentId);
  return variant;
}

/**
 * Check if variant matches
 */
export function useIsVariant(experimentId: string, targetVariant: Variant): boolean {
  const variant = useVariant(experimentId);
  return variant === targetVariant;
}




