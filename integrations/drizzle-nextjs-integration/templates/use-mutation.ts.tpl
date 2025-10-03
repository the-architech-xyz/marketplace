import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api/{{module.parameters.apiService || 'api'}}';

/**
 * Generic TanStack Query mutation hook
 * 
 * @param mutationFn - Function that performs the mutation
 * @param options - Additional mutation options
 * @returns Mutation result with mutate, isLoading, error states
 */
export function useMutation<TData = unknown, TError = Error, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch queries after successful mutation
      queryClient.invalidateQueries();
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('Mutation failed:', error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}

/**
 * Generic hook for creating a new item
 */
export function useCreateMutation<TData = unknown, TError = Error, TVariables = unknown>(
  resource: string,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
  return useMutation<TData, TError, TVariables>(
    (data: TVariables) => api.post(resource, data),
    {
      onSuccess: () => {
        // Invalidate the list query to refresh data
        queryClient.invalidateQueries([resource, 'list']);
      },
      ...options,
    }
  );
}

/**
 * Generic hook for updating an existing item
 */
export function useUpdateMutation<TData = unknown, TError = Error, TVariables = unknown>(
  resource: string,
  options?: Omit<UseMutationOptions<TData, TError, TVariables & { id: string | number }>, 'mutationFn'>
) {
  return useMutation<TData, TError, TVariables & { id: string | number }>(
    ({ id, ...data }) => api.put(`${resource}/${id}`, data),
    {
      onSuccess: (data, variables) => {
        // Invalidate both the specific item and list queries
        queryClient.invalidateQueries([resource, variables.id]);
        queryClient.invalidateQueries([resource, 'list']);
      },
      ...options,
    }
  );
}

/**
 * Generic hook for deleting an item
 */
export function useDeleteMutation<TData = unknown, TError = Error>(
  resource: string,
  options?: Omit<UseMutationOptions<TData, TError, string | number>, 'mutationFn'>
) {
  return useMutation<TData, TError, string | number>(
    (id) => api.delete(`${resource}/${id}`),
    {
      onSuccess: (data, id) => {
        // Invalidate both the specific item and list queries
        queryClient.invalidateQueries([resource, id]);
        queryClient.invalidateQueries([resource, 'list']);
      },
      ...options,
    }
  );
}

/**
 * Generic hook for optimistic updates
 */
export function useOptimisticMutation<TData = unknown, TError = Error, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onMutate?: (variables: TVariables) => Promise<any>;
    onError?: (error: TError, variables: TVariables, context: any) => void;
    onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: any) => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries();

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(['optimistic']);

      // Optimistically update to the new value
      queryClient.setQueryData(['optimistic'], variables);

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (error, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(['optimistic'], context?.previousData);
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      // Always refetch after error or success
      queryClient.invalidateQueries(['optimistic']);
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
