import { QueryClient } from '@tanstack/react-query';

// Default query options
const defaultQueryOptions = {
  queries: {
    staleTime: {{#if module.parameters.defaultOptions.queries.staleTime}}{{module.parameters.defaultOptions.queries.staleTime}}{{else}}5 * 60 * 1000{{/if}}, // 5 minutes
    gcTime: {{#if module.parameters.defaultOptions.queries.gcTime}}{{module.parameters.defaultOptions.queries.gcTime}}{{else}}10 * 60 * 1000{{/if}}, // 10 minutes
    retry: {{#if module.parameters.defaultOptions.queries.retry}}{{module.parameters.defaultOptions.queries.retry}}{{else}}3{{/if}},
    refetchOnWindowFocus: {{#if module.parameters.defaultOptions.queries.refetchOnWindowFocus}}{{module.parameters.defaultOptions.queries.refetchOnWindowFocus}}{{else}}false{{/if}},
    refetchOnMount: true,
    refetchOnReconnect: true,
  },
  mutations: {
    retry: {{#if module.parameters.defaultOptions.mutations.retry}}{{module.parameters.defaultOptions.mutations.retry}}{{else}}1{{/if}},
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
