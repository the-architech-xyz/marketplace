/**
 * tRPC Router (Monorepo)
 * 
 * This is the main tRPC router for your shared API package.
 * Import and use routers from your features here.
 * 
 * This file lives in packages/api/src/router.ts
 */

import { router } from '@trpc/server';

// Import your feature routers here
// These will come from your feature tech-stack overrides
// Example: import { authRouter } from './routers/auth';

export const tRPC = router({
  // Add your routers here
  // Example: auth: authRouter,
  // Example: payments: paymentsRouter,
  // Example: teams: teamsRouter,
});

export type AppRouter = typeof tRPC;

