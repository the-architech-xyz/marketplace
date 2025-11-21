/**
 * Synap Capture Hooks - TanStack Query
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { CreateThoughtDataSchema, UpdateThoughtDataSchema } from './schemas';
import type { Thought, CreateThoughtResult } from './types';

// ============================================================================
// QUERY HOOKS
// ============================================================================

export const useThoughts = (
  filters?: {
    status?: string[];
    type?: string[];
    tags?: string[];
    search?: string;
  },
  options?: Omit<UseQueryOptions<Thought[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['synap-thoughts', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status.join(','));
      if (filters?.type) params.append('type', filters.type.join(','));
      if (filters?.tags) params.append('tags', filters.tags.join(','));
      if (filters?.search) params.append('search', filters.search);
      
      const res = await fetch(`/api/thoughts?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch thoughts');
      return res.json();
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    ...options
  });
};

export const useThought = (
  id: string,
  options?: Omit<UseQueryOptions<Thought>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['synap-thought', id],
    queryFn: async () => {
      const res = await fetch(`/api/thoughts/${id}`);
      if (!res.ok) throw new Error('Failed to fetch thought');
      return res.json();
    },
    enabled: !!id,
    ...options
  });
};

// ============================================================================
// MUTATION HOOKS
// ============================================================================

export const useCreateThought = (options?: UseMutationOptions<CreateThoughtResult, Error, any>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: unknown) => {
      const validatedData = CreateThoughtDataSchema.parse(data);
      
      const res = await fetch('/api/thoughts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });
      if (!res.ok) throw new Error('Failed to create thought');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['synap-thoughts'] });
      options?.onSuccess?.(...arguments as any);
    },
    ...options
  });
};

export const useUpdateThought = (options?: UseMutationOptions<Thought, Error, { id: string; data: unknown }>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const validatedData = UpdateThoughtDataSchema.parse(data);
      
      const res = await fetch(`/api/thoughts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });
      if (!res.ok) throw new Error('Failed to update thought');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['synap-thoughts'] });
      queryClient.invalidateQueries({ queryKey: ['synap-thought', data.id] });
      options?.onSuccess?.(...arguments as any);
    },
    ...options
  });
};



