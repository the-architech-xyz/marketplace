/**
 * Analytics Hook
 * 
 * High-level analytics tracking hook for common use cases.
 * Wraps PostHog with convenient methods for tracking events, pageviews, and user actions.
 */

'use client';

import { usePostHog } from './use-posthog';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Main analytics hook
 */
export function useAnalytics() {
  const posthog = usePostHog();
  const pathname = usePathname();

  /**
   * Track a custom event
   */
  const track = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    posthog.capture(eventName, {
      ...properties,
      page_path: pathname,
      timestamp: new Date().toISOString(),
    });
  }, [posthog, pathname]);

  /**
   * Track page view
   */
  const trackPageView = useCallback((page?: string, properties?: Record<string, unknown>) => {
    const pagePath = page || pathname || window.location.pathname;
    posthog.capture('$pageview', {
      $current_url: typeof window !== 'undefined' ? window.location.href : pagePath,
      page_path: pagePath,
      ...properties,
    });
  }, [posthog, pathname]);

  /**
   * Track button click
   */
  const trackClick = useCallback((buttonName: string, properties?: Record<string, unknown>) => {
    track('button_click', {
      button_name: buttonName,
      ...properties,
    });
  }, [track]);

  /**
   * Track form submission
   */
  const trackFormSubmit = useCallback((
    formName: string,
    success: boolean,
    properties?: Record<string, unknown>
  ) => {
    track('form_submit', {
      form_name: formName,
      success,
      ...properties,
    });
  }, [track]);

  /**
   * Track error
   */
  const trackError = useCallback((error: Error | string, context?: Record<string, unknown>) => {
    const errorMessage = error instanceof Error ? error.message : error;
    const errorStack = error instanceof Error ? error.stack : undefined;

    track('error', {
      error_message: errorMessage,
      error_stack: errorStack,
      ...context,
    });
  }, [track]);

  /**
   * Track user signup
   */
  const trackSignup = useCallback((userId: string, properties?: Record<string, unknown>) => {
    posthog.identify(userId, properties);
    track('user_signed_up', {
      user_id: userId,
      ...properties,
    });
  }, [posthog, track]);

  /**
   * Track user login
   */
  const trackLogin = useCallback((userId: string, properties?: Record<string, unknown>) => {
    posthog.identify(userId, properties);
    track('user_logged_in', {
      user_id: userId,
      ...properties,
    });
  }, [posthog, track]);

  /**
   * Track user logout
   */
  const trackLogout = useCallback((userId?: string) => {
    track('user_logged_out', {
      user_id: userId,
    });
    posthog.reset();
  }, [posthog, track]);

  /**
   * Identify user
   */
  const identify = useCallback((userId: string, properties?: Record<string, unknown>) => {
    posthog.identify(userId, properties);
  }, [posthog]);

  return {
    track,
    trackPageView,
    trackClick,
    trackFormSubmit,
    trackError,
    trackSignup,
    trackLogin,
    trackLogout,
    identify,
    reset: posthog.reset,
    isReady: posthog.isReady,
  };
}


