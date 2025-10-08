import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

// Mock API functions - replace with actual API calls
const projectApi = {
  getProjects: async (): Promise<Project[]> => {
    // Mock implementation
    return [
      {
        id: '1',
        name: 'Sample Project',
        description: 'A sample project for demonstration',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  },
  
  createProject: async (data: Partial<Project>): Promise<Project> => {
    // Mock implementation
    return {
      id: crypto.randomUUID(),
      name: data.name || 'New Project',
      description: data.description || '',
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },
  
  updateProject: async ({ id, data }: { id: string; data: Partial<Project> }): Promise<Project> => {
    // Mock implementation
    return {
      id,
      name: data.name || 'Updated Project',
      description: data.description || '',
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },
  
  deleteProject: async (id: string): Promise<void> => {
    // Mock implementation
    console.log('Deleting project:', id);
  },
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectApi.getProjects(),
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Project>) => projectApi.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => 
      projectApi.updateProject({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => projectApi.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
