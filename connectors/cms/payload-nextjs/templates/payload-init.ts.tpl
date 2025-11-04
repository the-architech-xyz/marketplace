import { getPayload } from 'payload';
import config from '@/payload.config';

/**
 * Initialize Payload instance
 * 
 * This helper function initializes Payload and returns the instance.
 * Use this in server components and API routes.
 * 
 * Example:
 * ```tsx
 * const payload = await initPayload();
 * const pages = await payload.find({ collection: 'pages' });
 * ```
 */
export async function initPayload() {
  const payload = await getPayload({ config });
  return payload;
}

/**
 * Re-export getPayload for convenience
 */
export { getPayload };

