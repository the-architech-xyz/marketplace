// User identification and tracking
import { Analytics } from './analytics.js';

/**
 * Identify a user with PostHog
 */
export function identifyUser(
  userId: string,
  properties?: {
    email?: string;
    name?: string;
    username?: string;
    [key: string]: unknown;
  }
) {
  Analytics.identify(userId, {
    ...properties,
    identified_at: new Date().toISOString(),
  });
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, unknown>) {
  Analytics.setPersonProperties({
    ...properties,
    updated_at: new Date().toISOString(),
  });
}

/**
 * Update user email
 */
export function updateUserEmail(userId: string, email: string) {
  identifyUser(userId, { email });
}

/**
 * Reset user identification (on logout)
 */
export function resetUser() {
  Analytics.reset();
}

/**
 * Set user properties on current user
 */
export function setUserProperty(key: string, value: unknown) {
  setUserProperties({ [key]: value });
}

/**
 * Track user signup
 */
export function trackSignup(userId: string, properties?: Record<string, unknown>) {
  identifyUser(userId, properties);
  Analytics.capture('user_signed_up', {
    user_id: userId,
    ...properties,
  });
}

/**
 * Track user login
 */
export function trackLogin(userId: string, properties?: Record<string, unknown>) {
  identifyUser(userId, properties);
  Analytics.capture('user_logged_in', {
    user_id: userId,
    ...properties,
  });
}

/**
 * Track user logout
 */
export function trackLogout(userId?: string) {
  Analytics.capture('user_logged_out', {
    user_id: userId,
  });
  resetUser();
}


