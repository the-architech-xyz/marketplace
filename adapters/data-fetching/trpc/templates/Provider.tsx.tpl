/**
 * tRPC Provider
 * 
 * Wraps your app with TRPCProvider + QueryClientProvider.
 * This enables tRPC hooks throughout your application.
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
<% if (module.parameters.transformer === 'superjson') { %>
import superjson from 'superjson';
<% } else if (module.parameters.transformer === 'devalue') { %>
import { parse, stringify } from 'devalue';
<% } %>
import { useState } from 'react';
import { trpc } from './react';

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

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000, // 5 seconds
            <% if (module.parameters.abortOnUnmount) { %>
            refetchOnWindowFocus: false,
            <% } %>
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
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
          <% if (module.parameters.batchingEnabled) { %>
          // Enable request batching
          maxURLLength: 2083,
          <% } %>
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}


