/**
 * Next.js tRPC API Route Handler
 * 
 * This file handles all tRPC requests for your Next.js app.
 * Works with both single-app and monorepo structures.
 */

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
<% if (project.structure === 'monorepo' && project.monorepo) { %>
import { AppRouter } from '<%= importPath(paths.trpcRouter) %>';
<% } else { %>
import { AppRouter, createTRPCContext } from '<%= importPath(paths.trpcRouter) %>';
<% } %>
<% if (module.parameters.transformer === 'superjson') { %>
import superjson from 'superjson';
<% } else if (module.parameters.transformer === 'devalue') { %>
import { parse, stringify } from 'devalue';
<% } %>

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: AppRouter,
    <% if (project.structure === 'monorepo' && project.monorepo) { %>
    // For monorepo, context is created in the web app
    createContext: async (opts) => {
      // Add your context logic here
      return {
        // Example: session: await getSession(),
        // Example: db: db,
      };
    },
    <% } else { %>
    createContext: createTRPCContext,
    <% } %>
    <% if (module.parameters.transformer === 'superjson') { %>
    transformer: superjson,
    <% } else if (module.parameters.transformer === 'devalue') { %>
    transformer: {
      input: { serialize: stringify, deserialize: parse },
      output: { serialize: stringify, deserialize: parse },
    },
    <% } %>
  });
};

export const GET = handler;
export const POST = handler;

