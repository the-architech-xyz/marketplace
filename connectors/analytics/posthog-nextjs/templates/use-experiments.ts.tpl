/**
 * Experiments Hook
 * 
 * React hook for A/B testing and experiments with PostHog.
 */

'use client';

import { usePostHog } from './use-posthog';
import { useEffect, useState, useCallback } from 'react';

/**
 * Hook to get experiment variant
 */
export function useExperiment(experimentKey: string): string | undefined {
  const posthog = usePostHog();
  const [variant, setVariant] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (posthog.isReady) {
      // Get variant from feature flag (PostHog experiments are feature flags)
      const flag = posthog.getFeatureFlag(`experiment-${experimentKey}`);
      
      if (flag && typeof flag === 'string') {
        setVariant(flag);
      } else if (flag === true) {
        setVariant('variant');
      }

      // Listen for feature flag updates
      const unsubscribe = posthog.posthog?.onFeatureFlags(() => {
        const newFlag = posthog.getFeatureFlag(`experiment-${experimentKey}`);
        if (newFlag && typeof newFlag === 'string') {
          setVariant(newFlag);
        }
      });

      return () => {
        unsubscribe?.();
      };
    }
  }, [posthog, experimentKey]);

  return variant;
}

/**
 * Hook to check if user is in experiment variant
 */
export function useIsInVariant(experimentKey: string, variant: string): boolean {
  const currentVariant = useExperiment(experimentKey);
  return currentVariant === variant;
}

/**
 * Hook to track experiment exposure
 */
export function useTrackExperiment() {
  const posthog = usePostHog();

  const trackExposure = useCallback((
    experimentKey: string,
    variant: string,
    properties?: Record<string, unknown>
  ) => {
    posthog.capture('$experiment_exposed', {
      experiment_key: experimentKey,
      variant,
      ...properties,
    });
  }, [posthog]);

  return trackExposure;
}

/**
 * Hook to get experiment variant with default fallback
 */
export function useExperimentVariant(experimentKey: string, defaultValue: string): string {
  const variant = useExperiment(experimentKey);
  return variant || defaultValue;
}


