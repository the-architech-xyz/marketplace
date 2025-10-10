/**
 * Better Auth Client Setup
 * 
 * This creates the Better Auth client for frontend consumption.
 * All hooks will import this client to interact with the auth API.
 */

import { createAuthClient } from 'better-auth/react';

// Create the Better Auth client
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
});

// Export the client type for TypeScript
export type AuthClient = typeof authClient;