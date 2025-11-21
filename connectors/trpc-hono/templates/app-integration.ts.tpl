/**
 * tRPC Integration for Hono App
 * 
 * Add this code to your Hono app.ts to mount tRPC:
 * 
 * import { trpcHandler } from './trpc/handler';
 * app.all('/trpc/*', async (c) => {
 *   return await trpcHandler(c.req.raw);
 * });
 */

