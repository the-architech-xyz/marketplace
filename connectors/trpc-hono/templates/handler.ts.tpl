/**
 * tRPC Hono Handler
 * 
 * Handles tRPC requests in Hono using fetchRequestHandler.
 * Mount this handler in your Hono app.
 */

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '<%= project.structure === "monorepo" ? "@repo/api/trpc/router" : paths.packages.shared.src ? "${paths.packages.shared.src}/trpc/router" : "@/lib/trpc/router" %>';
import { createContext } from '<%= project.structure === "monorepo" ? "@repo/api/trpc/context" : paths.packages.shared.src ? "${paths.packages.shared.src}/trpc/context" : "@/lib/trpc/context" %>';
<% if (params.transformer === 'superjson') { %>
import superjson from 'superjson';
<% } else if (params.transformer === 'devalue') { %>
import { parse, stringify } from 'devalue';
<% } %>

/**
 * Create a Hono handler function for tRPC
 * 
 * Usage in your Hono app:
 * 
 * import { trpcHandler } from './trpc/handler';
 * app.all('/trpc/*', trpcHandler);
 */
export const trpcHandler = async (req: Request): Promise<Response> => {
  return fetchRequestHandler({
    endpoint: '<%= params.path || "/trpc" %>',
    req,
    router: appRouter,
    createContext: async (opts) => {
      return await createContext({ req: opts.req });
    },
    <% if (params.transformer === 'superjson') { %>
    transformer: superjson,
    <% } else if (params.transformer === 'devalue') { %>
    transformer: {
      input: { serialize: stringify, deserialize: parse },
      output: { serialize: stringify, deserialize: parse },
    },
    <% } %>
  });
};

