/**
 * tRPC Client
 * 
 * Vanilla tRPC client for server-side or direct usage.
 * React hooks are in react.tsx
 */

import { createTRPCProxyClient, httpBatchLink, loggerLink, retryLink } from '@trpc/client';
<% if (module.parameters.transformer === 'superjson') { %>
import superjson from 'superjson';
<% } else if (module.parameters.transformer === 'devalue') { %>
import { parse, stringify } from 'devalue';
<% } %>
import type { AppRouter } from '<%= importPath(paths.trpcRouter) %>';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser should use relative path
    return '';
  }
  
  if (process.env.VERCEL_URL) {
    // SSR on Vercel
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // SSR on localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    <% if (process.env.NODE_ENV === 'development') { %>
    // Development logging
    loggerLink({
      enabled: () => process.env.NODE_ENV === 'development',
      colorMode: 'ansi' as const,
    }),
    <% } %>
    // Retry logic with exponential backoff
    retryLink({
      retries: 3,
      maxDelayMs: 5000,
      backoff: 'exponential',
    }),
    // Batch HTTP requests
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
      // Request timeout (10 seconds)
      fetch: (url, options) => {
        return fetch(url, {
          ...options,
          signal: AbortSignal.timeout(<%= module.parameters.requestTimeout || 10000 %>),
        });
      },
    }),
  ],
});


