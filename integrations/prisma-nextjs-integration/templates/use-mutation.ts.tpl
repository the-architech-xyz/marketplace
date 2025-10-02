/**
 * Generic Mutation Hooks
 * 
 * Generic TanStack Query mutation hooks for any entity
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';

// Generic create mutation
export function useGenericCreate<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // Call custom onSuccess
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      console.error('Create mutation failed:', error);
      options?.onError?.(error, variables);
    },
  });
}

// Generic update mutation
export function useGenericUpdate<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // Call custom onSuccess
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      console.error('Update mutation failed:', error);
      options?.onError?.(error, variables);
    },
  });
}

// Generic delete mutation
export function useGenericDelete<TVariables>(
  mutationFn: (variables: TVariables) => Promise<void>,
  options?: {
    onSuccess?: (variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: (_, variables) => {
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // Call custom onSuccess
      options?.onSuccess?.(variables);
    },
    onError: (error, variables) => {
      console.error('Delete mutation failed:', error);
      options?.onError?.(error, variables);
    },
  });
}

// Generic bulk operation mutation
export function useGenericBulkOperation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<void>,
  options?: {
    onSuccess?: (variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: (_, variables) => {
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // Call custom onSuccess
      options?.onSuccess?.(variables);
    },
    onError: (error, variables) => {
      console.error('Bulk operation failed:', error);
      options?.onError?.(error, variables);
    },
  });
}
