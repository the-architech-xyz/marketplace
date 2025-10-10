/**
 * Better Auth API Route
 * 
 * This single route handles ALL authentication endpoints automatically.
 * Better Auth creates 50+ routes based on your configuration and plugins.
 * 
 * Routes created automatically:
 * - /api/auth/sign-in/email
 * - /api/auth/sign-up/email
 * - /api/auth/sign-out
 * - /api/auth/session
 * - /api/auth/two-factor/enable
 * - /api/auth/two-factor/verify
 * - /api/auth/organization/create
 * - ... and many more
 */

import { auth } from '@/lib/auth/config';
import { toNextJsHandler } from 'better-auth/next-js';

// ✅ This ONE line creates ALL routes automatically
export const { GET, POST } = toNextJsHandler(auth);