/**
 * Better Auth Client - Next.js Connector
 * 
 * Re-exports base Better Auth client from adapter.
 * The adapter provides the configured client, we just re-export for convenience.
 */

// Import base client from adapter
import { authClient as baseAuthClient } from '@/lib/auth/better-auth-client';

// Re-export for convenience
export const authClient = baseAuthClient;

// Re-export common methods
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

