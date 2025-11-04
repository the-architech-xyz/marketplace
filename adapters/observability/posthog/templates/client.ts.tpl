import posthog from 'posthog-js';
import { POSTHOG_CONFIG, POSTHOG_CLIENT_OPTIONS } from './config.js';

// Initialize PostHog for client-side
// This should only run in the browser
if (typeof window !== 'undefined' && POSTHOG_CONFIG.enabled && POSTHOG_CONFIG.apiKey) {
  posthog.init(POSTHOG_CONFIG.apiKey, POSTHOG_CLIENT_OPTIONS);
}

export { posthog };
export default posthog;


