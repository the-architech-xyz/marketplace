import { PostHog } from 'posthog-node';
import { POSTHOG_CONFIG, POSTHOG_SERVER_OPTIONS } from './config.js';

// Initialize PostHog for server-side
let posthogClient: PostHog | null = null;

export function getPostHogClient(): PostHog | null {
  if (!POSTHOG_CONFIG.enabled || !POSTHOG_CONFIG.apiKey) {
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(POSTHOG_CONFIG.apiKey, POSTHOG_SERVER_OPTIONS);
  }

  return posthogClient;
}

// Cleanup function for graceful shutdown
export async function closePostHog(): Promise<void> {
  if (posthogClient) {
    await posthogClient.shutdown();
    posthogClient = null;
  }
}

// Ensure cleanup on process exit
if (typeof process !== 'undefined') {
  process.on('SIGTERM', closePostHog);
  process.on('SIGINT', closePostHog);
}

export { PostHog };
export default getPostHogClient;


