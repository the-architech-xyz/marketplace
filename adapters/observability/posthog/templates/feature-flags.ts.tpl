// Feature flags utilities
import { Analytics } from './analytics.js';

/**
 * Get feature flag value
 */
export function getFeatureFlag(flagKey: string): boolean | string | undefined {
  return Analytics.getFeatureFlag(flagKey);
}

/**
 * Check if feature flag is enabled
 */
export function isFeatureEnabled(flagKey: string): boolean {
  return Analytics.isFeatureEnabled(flagKey);
}

/**
 * Wait for feature flags to load (returns promise)
 */
export async function waitForFeatureFlags(): Promise<void> {
  // This will be implemented by the framework-specific integration
  return Promise.resolve();
}

/**
 * Reload feature flags
 */
export function reloadFeatureFlags() {
  // This will be implemented by the framework-specific integration
  console.log('Feature flags reloaded');
}

/**
 * Get all feature flags
 */
export function getAllFeatureFlags(): Record<string, boolean | string> {
  // This will be implemented by the framework-specific integration
  return {};
}


