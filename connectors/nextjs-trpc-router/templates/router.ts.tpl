/**
 * tRPC Router (Single App)
 * 
 * This is the main tRPC router for your application.
 * Import and use routers from your features here.
 */

import { router } from '@trpc/server';
import { createContext } from '@trpc/server/adapters/standalone';

// Import your feature routers here
// Example: import { authRouter } from './routers/auth';

export const tRPC = router({
  // Add your routers here
  // Example: auth: authRouter,
});

export type AppRouter = typeof tRPC;

// Context creation for Next.js API routes
export async function createTRPCContext(opts: { req: Request; res?: Response }) {
  // Add your context logic here (user session, database, etc.)
  return {
    // Example: session: await getSession(),
    // Example: db: db,
  };
}

