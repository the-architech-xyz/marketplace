import { QueryClient } from '@tanstack/react-query';

// Default query options
const defaultQueryOptions = {
  queries: {
    staleTime: {{#if context.hasCustomStaleTime}}{{context.staleTime}}{{else}}5 * 60 * 1000{{/if}}, // 5 minutes
    gcTime: {{#if context.hasCustomGcTime}}{{context.gcTime}}{{else}}10 * 60 * 1000{{/if}}, // 10 minutes
    retry: {{#if context.hasCustomRetry}}{{context.retry}}{{else}}3{{/if}},
    refetchOnWindowFocus: {{#if context.hasCustomRefetchOnWindowFocus}}{{context.refetchOnWindowFocus}}{{else}}false{{/if}},
    refetchOnMount: true,
    refetchOnReconnect: true,
  },
  mutations: {
    retry: {{#if context.hasCustomMutationRetry}}{{context.mutationRetry}}{{else}}1{{/if}},
  },
};

// Create query client with default options
export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
});

// Global error handler
queryClient.setMutationDefaults(['error'], {
  onError: (error) => {
    console.error('Mutation error:', error);
    // Add global error handling here (e.g., toast notification)
  },
});

// Global success handler
queryClient.setMutationDefaults(['success'], {
  onSuccess: (data) => {
    console.log('Mutation success:', data);
    // Add global success handling here (e.g., toast notification)
  },
});

export default queryClient;
