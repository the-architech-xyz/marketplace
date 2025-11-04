/**
 * tRPC Server Client
 * 
 * Server-side tRPC client for data fetching in Server Components.
 * Use this for SSR, Server Components, or API routes.
 */

import { createTRPCProxyClient, httpBatchLink, retryLink } from '@trpc/client';
<% if (module.parameters.transformer === 'superjson') { %>
import superjson from 'superjson';
<% } else if (module.parameters.transformer === 'devalue') { %>
import { parse, stringify } from 'devalue';
<% } %>
import type { AppRouter } from '<%= importPath(paths.trpcRouter) %>';

function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    // Retry logic for server-side requests
    retryLink({
      retries: 2,
      maxDelayMs: 3000,
      backoff: 'exponential',
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      <% if (module.parameters.transformer === 'superjson') { %>
      transformer: superjson,
      <% } else if (module.parameters.transformer === 'devalue') { %>
      transformer: {
        input: { serialize: stringify, deserialize: parse },
        output: { serialize: stringify, deserialize: parse },
      },
      <% } %>
      headers() {
        // Forward cookies and headers for SSR
        return {
          cookie: typeof window === 'undefined' 
            ? (require('next/headers').cookies().toString()) 
            : undefined,
        };
      },
      // Request timeout (5 seconds for server-side)
      fetch: (url, options) => {
        return fetch(url, {
          ...options,
          signal: AbortSignal.timeout(<%= module.parameters.serverTimeout || 5000 %>),
        });
      },
    }),
  ],
});


