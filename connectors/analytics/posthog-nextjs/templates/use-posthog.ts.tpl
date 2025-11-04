/**
 * Main PostHog Hook
 * 
 * Provides access to PostHog client instance with type safety.
 * Wraps the posthog-js/react hook for Next.js compatibility.
 */

'use client';

import { usePostHog as usePostHogReact } from 'posthog-js/react';
import { useCallback } from 'react';
import posthog from '@/lib/analytics/posthog/client';

/**
 * Main PostHog hook
 * Returns PostHog client instance and helper methods
 */
export function usePostHog() {
  const posthogClient = usePostHogReact();

  /**
   * Capture an event
   */
  const capture = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    if (posthogClient) {
      posthogClient.capture(eventName, properties);
    } else if (typeof window !== 'undefined' && posthog) {
      posthog.capture(eventName, properties);
    }
  }, [posthogClient]);

  /**
   * Identify a user
   */
  const identify = useCallback((userId: string, properties?: Record<string, unknown>) => {
    if (posthogClient) {
      posthogClient.identify(userId, properties);
    } else if (typeof window !== 'undefined' && posthog) {
      posthog.identify(userId, properties);
    }
  }, [posthogClient]);

  /**
   * Reset user (on logout)
   */
  const reset = useCallback(() => {
    if (posthogClient) {
      posthogClient.reset();
    } else if (typeof window !== 'undefined' && posthog) {
      posthog.reset();
    }
  }, [posthogClient]);

  /**
   * Get feature flag value
   */
  const getFeatureFlag = useCallback((flagKey: string): boolean | string | undefined => {
    if (posthogClient) {
      return posthogClient.getFeatureFlag(flagKey);
    } else if (typeof window !== 'undefined' && posthog) {
      return posthog.getFeatureFlag(flagKey);
    }
    return undefined;
  }, [posthogClient]);

  /**
   * Check if feature flag is enabled
   */
  const isFeatureEnabled = useCallback((flagKey: string): boolean => {
    const flag = getFeatureFlag(flagKey);
    return flag === true || flag === 'true' || flag === 'enabled';
  }, [getFeatureFlag]);

  /**
   * Reload feature flags
   */
  const reloadFeatureFlags = useCallback(() => {
    if (posthogClient) {
      posthogClient.reloadFeatureFlags();
    } else if (typeof window !== 'undefined' && posthog) {
      posthog.reloadFeatureFlags();
    }
  }, [posthogClient]);

  return {
    // Raw client (use with caution)
    posthog: posthogClient || (typeof window !== 'undefined' ? posthog : null),
    
    // Event tracking
    capture,
    
    // User identification
    identify,
    reset,
    
    // Feature flags
    getFeatureFlag,
    isFeatureEnabled,
    reloadFeatureFlags,
    
    // Utility
    isReady: !!posthogClient || (typeof window !== 'undefined' && !!posthog),
  };
}


