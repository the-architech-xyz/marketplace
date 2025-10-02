import { useMutation, useQueryClient, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';

// Standard mutation hook with enhanced error handling
export function useStandardMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables> {
  return useMutation({
    mutationFn,
    ...options,
  });
}

// Mutation with automatic query invalidation
export function useMutationWithInvalidation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  invalidateKeys: QueryKey[],
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables> {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalidate specified queries
      invalidateKeys.forEach(key => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      
      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

// Optimistic mutation hook
export function useOptimisticMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  optimisticUpdate: (variables: TVariables) => { queryKey: QueryKey; updater: (oldData: any) => any },
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables> {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      const { queryKey, updater } = optimisticUpdate(variables);
      
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });
      
      // Snapshot previous value
      const previousData = queryClient.getQueryData(queryKey);
      
      // Optimistically update
      queryClient.setQueryData(queryKey, updater);
      
      return { previousData, queryKey };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousData && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
      
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      // Always refetch after error or success
      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
      
      options?.onSettled?.(data, error, variables, context);
    },
    ...options,
  });
}

// Mutation with retry logic
export function useRobustMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
): UseMutationResult<TData, TError, TVariables> {
  return useMutation({
    mutationFn,
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error instanceof Error && 'status' in error && 
          typeof error.status === 'number' && error.status >= 400 && error.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
}

// Utility hook for mutation state
export function useMutationState() {
  const queryClient = useQueryClient();
  
  return {
    isMutating: (mutationKey?: string) => {
      return queryClient.isMutating(mutationKey ? { mutationKey } : undefined);
    },
    getMutationState: (mutationKey: string) => {
      return queryClient.getMutationState({ mutationKey });
    },
    resetMutations: () => {
      return queryClient.resetQueries();
    },
  };
}
