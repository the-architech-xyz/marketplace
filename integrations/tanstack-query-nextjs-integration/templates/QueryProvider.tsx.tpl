'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createQueryClient } from '@/lib/query-client';
import { QueryErrorBoundary } from '@/components/QueryErrorBoundary';

interface QueryProviderProps {
  children: React.ReactNode;
  client?: QueryClient;
}

export function QueryProvider({ children, client }: QueryProviderProps) {
  // Use provided client or create a new one
  const queryClient = client || createQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorBoundary>
        {children}
      </QueryErrorBoundary>
      
      {/* React Query DevTools - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          position="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

// Hook to access QueryClient
export function useQueryClient() {
  const { useQueryClient: useQueryClientHook } = require('@tanstack/react-query');
  return useQueryClientHook();
}
