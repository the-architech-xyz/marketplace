import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * PostHog Middleware
 * 
 * Optional middleware for server-side pageview tracking.
 * Add to your Next.js middleware.ts file:
 * 
 * export { posthogMiddleware as middleware } from '@/middleware/posthog';
 */

export function posthogMiddleware(request: NextRequest) {
  // PostHog primarily works client-side, but you can add
  // server-side tracking here if needed using posthog-node
  
  // For now, just pass through
  return NextResponse.next();
}

// Export default for Next.js middleware
export default posthogMiddleware;


