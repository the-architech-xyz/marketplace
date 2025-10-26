/**
 * Better Auth Client
 * 
 * Framework-agnostic Better Auth client configuration.
 * Works with Next.js, Remix, Expo, etc.
 */

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000',
});

export default authClient;
