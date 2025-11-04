/**
 * Pageview Tracking Hook
 * 
 * Automatically tracks page views on route changes in Next.js App Router.
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnalytics } from './use-analytics';

/**
 * Hook to automatically track pageviews on route changes
 * 
 * Usage: Add `<TrackPageviews />` to your root layout
 */
export function usePageviewTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const analytics = useAnalytics();

  useEffect(() => {
    // Track pageview on route change
    if (pathname) {
      const url = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      
      analytics.trackPageView(url, {
        timestamp: new Date().toISOString(),
      });
    }
  }, [pathname, searchParams, analytics]);
}

/**
 * Component to track pageviews (add to root layout)
 */
export function TrackPageviews() {
  usePageviewTracking();
  return null;
}


