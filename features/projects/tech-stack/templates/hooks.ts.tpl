/**
 * Projects - TanStack Query Hooks
 * 
 * Direct TanStack Query hooks for Projects feature
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { CreateProjectDataSchema, UpdateProjectDataSchema, GenerateProjectDataSchema } from './schemas';
import type { 
  Project, 
  ProjectResult, 
  GenerateProjectResult, 
  ProjectFilters,
  ProjectGeneration 
} from '@/features/projects/contract';

// ============================================================================
// PROJECT HOOKS
// ============================================================================

/**
 * List projects with filters
 */
export const useProjects = (
  filters?: ProjectFilters,
  options?: Omit<UseQueryOptions<Project[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['projects', 'list', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status.join(','));
      if (filters?.organizationId) params.append('organizationId', filters.organizationId);
      if (filters?.teamId) params.append('teamId', filters.teamId);
      if (filters?.search) params.append('search', filters.search);
      
      const res = await fetch(`/api/projects?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
    staleTime: 30 * 1000, // 30 seconds
    ...options
  });
};

/**
 * Get single project by ID
 */
export const useProject = (
  id: string,
  options?: Omit<UseQueryOptions<Project>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) throw new Error('Failed to fetch project');
      return res.json();
    },
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
    ...options
  });
};

/**
 * Get projects by organization
 */
export const useProjectsByOrganization = (
  organizationId: string,
  options?: Omit<UseQueryOptions<Project[]>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['projects', 'organization', organizationId],
    queryFn: async () => {
      const res = await fetch(`/api/projects?organizationId=${organizationId}`);
      if (!res.ok) throw new Error('Failed to fetch organization projects');
      return res.json();
    },
    enabled: !!organizationId,
    staleTime: 30 * 1000,
    ...options
  });
};

/**
 * Create project
 */
export const useCreateProject = (options?: UseMutationOptions<ProjectResult, Error, any>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const validatedData = CreateProjectDataSchema.parse(data);
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });
      if (!res.ok) throw new Error('Failed to create project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      options?.onSuccess?.(...arguments as any);
    },
    ...options
  });
};

/**
 * Update project
 */
export const useUpdateProject = (options?: UseMutationOptions<ProjectResult, Error, any>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const validatedData = UpdateProjectDataSchema.parse(data);
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });
      if (!res.ok) throw new Error('Failed to update project');
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', variables.id] });
      options?.onSuccess?.(...arguments as any);
    },
    ...options
  });
};

/**
 * Delete project
 */
export const useDeleteProject = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete project');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      options?.onSuccess?.(...arguments as any);
    },
    ...options
  });
};

/**
 * Duplicate project
 */
export const useDuplicateProject = (options?: UseMutationOptions<ProjectResult, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects/${id}/duplicate`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to duplicate project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      options?.onSuccess?.(...arguments as any);
    },
    ...options
  });
};

// ============================================================================
// GENERATION HOOKS
// ============================================================================

/**
 * Generate project
 */
export const useGenerateProject = (options?: UseMutationOptions<GenerateProjectResult, Error, any>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const validatedData = GenerateProjectDataSchema.parse(data);
      const res = await fetch(`/api/projects/${validatedData.projectId}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });
      if (!res.ok) throw new Error('Failed to generate project');
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', variables.projectId, 'generation'] });
      options?.onSuccess?.(...arguments as any);
    },
    ...options
  });
};

/**
 * Get generation status
 */
export const useGenerationStatus = (
  projectId: string,
  options?: Omit<UseQueryOptions<ProjectGeneration>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['projects', projectId, 'generation'],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}/generation/status`);
      if (!res.ok) throw new Error('Failed to fetch generation status');
      return res.json();
    },
    enabled: !!projectId,
    refetchInterval: (data) => {
      // Poll every 2 seconds if status is 'generating'
      return data?.status === 'generating' ? 2000 : false;
    },
    ...options
  });
};

/**
 * Cancel generation
 */
export const useCancelGeneration = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (projectId: string) => {
      const res = await fetch(`/api/projects/${projectId}/generate/cancel`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to cancel generation');
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'generation'] });
      options?.onSuccess?.(...arguments as any);
    },
    ...options
  });
};

