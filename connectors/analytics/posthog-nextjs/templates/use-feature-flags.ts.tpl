/**
 * Feature Flags Hook
 * 
 * React hook for managing and checking PostHog feature flags.
 */

'use client';

import { usePostHog } from './use-posthog';
import { useEffect, useState, useCallback } from 'react';

/**
 * Hook to get a feature flag value
 */
export function useFeatureFlag(flagKey: string): boolean | string | undefined {
  const posthog = usePostHog();
  const [flag, setFlag] = useState<boolean | string | undefined>(undefined);

  useEffect(() => {
    if (posthog.isReady) {
      const value = posthog.getFeatureFlag(flagKey);
      setFlag(value);

      // Listen for feature flag updates
      const unsubscribe = posthog.posthog?.onFeatureFlags(() => {
        const newValue = posthog.getFeatureFlag(flagKey);
        setFlag(newValue);
      });

      return () => {
        unsubscribe?.();
      };
    }
  }, [posthog, flagKey]);

  return flag;
}

/**
 * Hook to check if a feature flag is enabled
 */
export function useFeatureEnabled(flagKey: string): boolean {
  const flag = useFeatureFlag(flagKey);
  return flag === true || flag === 'true' || flag === 'enabled';
}

/**
 * Hook to get all feature flags
 */
export function useFeatureFlags(): Record<string, boolean | string> {
  const posthog = usePostHog();
  const [flags, setFlags] = useState<Record<string, boolean | string>>({});

  useEffect(() => {
    if (posthog.isReady && posthog.posthog) {
      const allFlags = posthog.posthog.getAllFlags();
      setFlags(allFlags);

      // Listen for feature flag updates
      const unsubscribe = posthog.posthog.onFeatureFlags(() => {
        const newFlags = posthog.posthog?.getAllFlags() || {};
        setFlags(newFlags);
      });

      return () => {
        unsubscribe?.();
      };
    }
  }, [posthog]);

  const reload = useCallback(() => {
    posthog.reloadFeatureFlags();
  }, [posthog]);

  return {
    ...flags,
    reload,
  };
}


