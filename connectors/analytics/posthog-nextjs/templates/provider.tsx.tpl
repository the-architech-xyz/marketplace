'use client';

import { PostHogProvider as PostHogProviderReact } from 'posthog-js/react';
import posthog from 'posthog-js';
import { useEffect } from 'react';
import { POSTHOG_CONFIG, POSTHOG_CLIENT_OPTIONS } from '@/lib/analytics/posthog/config';

/**
 * PostHog Provider for Next.js App Router
 * 
 * Wraps your app with PostHog analytics provider.
 * Initialize PostHog client-side only (prevents SSR issues).
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog only on client-side
    if (typeof window !== 'undefined' && POSTHOG_CONFIG.enabled && POSTHOG_CONFIG.apiKey) {
      if (!posthog.__loaded) {
        posthog.init(POSTHOG_CONFIG.apiKey, POSTHOG_CLIENT_OPTIONS);
      }
    }
  }, []);

  if (!POSTHOG_CONFIG.enabled || !POSTHOG_CONFIG.apiKey) {
    // Return children without provider if PostHog is disabled
    return <>{children}</>;
  }

  return (
    <PostHogProviderReact client={posthog}>
      {children}
    </PostHogProviderReact>
  );
}

