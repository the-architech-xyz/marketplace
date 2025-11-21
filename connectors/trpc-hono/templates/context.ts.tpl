/**
 * tRPC Context
 * 
 * Creates the context for each tRPC request.
 * Add database, session, user info, etc. here.
 */

<% if (project.structure === 'monorepo') { %>
import { db } from '@repo/database';
<% } else { %>
// import { db } from '@/lib/database';
<% } %>

export async function createContext(opts: { req: Request }) {
  // Add your context logic here
  // Example: Get user session from request headers/cookies
  // const session = await getSessionFromRequest(opts.req);
  
  return {
    // Example: session,
    // Example: db,
    // Example: user: session?.user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

