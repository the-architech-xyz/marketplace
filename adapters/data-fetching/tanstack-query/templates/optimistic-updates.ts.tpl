/**
 * Optimistic Updates Utilities
 * 
 * Helper functions for implementing optimistic updates with TanStack Query
 */

import { QueryClient } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';

// Generic optimistic update function
export function createOptimisticUpdate<TData, TVariables>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  updater: (oldData: TData | undefined, variables: TVariables) => TData
) {
  return (variables: TVariables) => {
    // Cancel outgoing refetches
    queryClient.cancelQueries({ queryKey });
    
    // Snapshot previous value
    const previousData = queryClient.getQueryData<TData>(queryKey);
    
    // Optimistically update
    queryClient.setQueryData(queryKey, (old: TData | undefined) => 
      updater(old, variables)
    );
    
    return { previousData };
  };
}

// Rollback function for optimistic updates
export function createRollback<TData>(
  queryClient: QueryClient,
  queryKey: QueryKey
) {
  return (context: { previousData: TData | undefined } | undefined) => {
    if (context?.previousData !== undefined) {
      queryClient.setQueryData(queryKey, context.previousData);
    }
  };
}

// Add item to list optimistically
export function addToListOptimistically<TItem>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  newItem: TItem
) {
  return createOptimisticUpdate(
    queryClient,
    queryKey,
    (oldData: TItem[] | undefined) => {
      if (!oldData) return [newItem];
      return [...oldData, newItem];
    }
  );
}

// Remove item from list optimistically
export function removeFromListOptimistically<TItem>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  itemId: string | number,
  idField: keyof TItem = 'id' as keyof TItem
) {
  return createOptimisticUpdate(
    queryClient,
    queryKey,
    (oldData: TItem[] | undefined) => {
      if (!oldData) return [];
      return oldData.filter(item => item[idField] !== itemId);
    }
  );
}

// Update item in list optimistically
export function updateInListOptimistically<TItem>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  updatedItem: TItem,
  idField: keyof TItem = 'id' as keyof TItem
) {
  return createOptimisticUpdate(
    queryClient,
    queryKey,
    (oldData: TItem[] | undefined) => {
      if (!oldData) return [updatedItem];
      return oldData.map(item => 
        item[idField] === updatedItem[idField] ? updatedItem : item
      );
    }
  );
}

// Toggle boolean field optimistically
export function toggleBooleanFieldOptimistically<TData>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  field: keyof TData
) {
  return createOptimisticUpdate(
    queryClient,
    queryKey,
    (oldData: TData | undefined) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        [field]: !oldData[field]
      };
    }
  );
}

// Increment number field optimistically
export function incrementNumberFieldOptimistically<TData>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  field: keyof TData,
  amount: number = 1
) {
  return createOptimisticUpdate(
    queryClient,
    queryKey,
    (oldData: TData | undefined) => {
      if (!oldData) return oldData;
      const currentValue = oldData[field];
      const newValue = typeof currentValue === 'number' 
        ? currentValue + amount 
        : amount;
      
      return {
        ...oldData,
        [field]: newValue
      };
    }
  );
}

// Utility for complex optimistic updates
export function createComplexOptimisticUpdate<TData, TVariables>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  updater: (oldData: TData | undefined, variables: TVariables) => TData,
  rollback?: (oldData: TData | undefined, variables: TVariables) => TData
) {
  const optimisticUpdate = createOptimisticUpdate(queryClient, queryKey, updater);
  const rollbackUpdate = rollback 
    ? createOptimisticUpdate(queryClient, queryKey, rollback)
    : createRollback(queryClient, queryKey);

  return {
    onMutate: optimisticUpdate,
    onError: rollbackUpdate,
  };
}
