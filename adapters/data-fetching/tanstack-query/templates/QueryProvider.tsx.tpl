import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {{#if module.parameters.devtools}}
      <ReactQueryDevtools 
        initialIsOpen={false}
        position="bottom-right"
        buttonPosition="bottom-right"
      />
      {{/if}}
    </QueryClientProvider>
  );
}

export default QueryProvider;
