// Event tracking utilities
import { Analytics } from './analytics.js';

/**
 * Track custom events with typed properties
 */
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  Analytics.capture(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track page navigation
 */
export function trackPageView(page: string, properties?: Record<string, unknown>) {
  Analytics.capturePageView(page, {
    ...properties,
    page_path: page,
    page_title: typeof document !== 'undefined' ? document.title : undefined,
  });
}

/**
 * Track user actions
 */
export function trackAction(action: string, element?: string, properties?: Record<string, unknown>) {
  trackEvent(`action_${action}`, {
    action,
    element,
    ...properties,
  });
}

/**
 * Track errors
 */
export function trackError(error: Error | string, context?: Record<string, unknown>) {
  const errorMessage = error instanceof Error ? error.message : error;
  const errorStack = error instanceof Error ? error.stack : undefined;

  trackEvent('error', {
    error_message: errorMessage,
    error_stack: errorStack,
    ...context,
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string, success: boolean, properties?: Record<string, unknown>) {
  trackEvent('form_submit', {
    form_name: formName,
    success,
    ...properties,
  });
}

/**
 * Track button clicks
 */
export function trackClick(buttonName: string, properties?: Record<string, unknown>) {
  trackAction('click', buttonName, {
    button_name: buttonName,
    ...properties,
  });
}


