/**
 * tRPC Router
 * 
 * Main router for tRPC endpoints.
 * Import and combine feature routers here.
 */

import { router } from '../init';
import { createContext } from './context';

// Import your feature routers here
// Example: import { authRouter } from './routers/auth';

export const appRouter = router({
  // Add your routers here
  // Example: auth: authRouter,
});

export type AppRouter = typeof appRouter;

