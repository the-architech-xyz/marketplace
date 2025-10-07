/**
 * Project Management System Blueprint
 * 
 * Complete project management system with kanban boards, task management, and team collaboration.
 * This is a cohesive business module that provides complete project management functionality.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';

export const projectManagementBlueprint: Blueprint = {
  id: 'project-management-setup',
  name: 'Project Management System',
  description: 'Complete project management with kanban boards, task management, and team collaboration',
  actions: [
    // Install additional dependencies for project management
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4',
        'date-fns@^2.30.0',
        'lucide-react@^0.294.0',
        '@dnd-kit/core@^6.1.0',
        '@dnd-kit/sortable@^8.0.0',
        '@dnd-kit/utilities@^3.2.2'
      ]
    },

    // Create project management types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/projects/types.ts',
      content: `/**
 * Project Management Types
 */

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  status: 'active' | 'archived' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  teamId?: string;
  settings: ProjectSettings;
,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }}

export interface ProjectSettings {
  allowGuestAccess: boolean;
  defaultTaskStatus: TaskStatus;
  enableTimeTracking: boolean;
  enableGanttView: boolean;
  enableReporting: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assigneeId?: string;
  reporterId: string;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  position: number;
  tags: string[];
  metadata: Record<string, any>;
}

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface TaskAttachment {
  id: string;
  taskId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  joinedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export type ProjectRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  completionRate: number;
  averageTaskDuration: number;
  activeMembers: number;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  color: string;
  teamId?: string;
  settings?: Partial<ProjectSettings>;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  color?: string;
  status?: Project['status'];
  settings?: Partial<ProjectSettings>;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority: TaskPriority;
  projectId: string;
  assigneeId?: string;
  dueDate?: Date;
  tags?: string[];
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  dueDate?: Date;
  tags?: string[];
}`
    },

    // Create project management hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/projects/hooks.ts',
      content: `/**
 * Project Management Hooks
 */

import { useQuery, useMutation, useQueryClient ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@tanstack/react-query';
import { useAuth } from '@/lib/auth/use-auth';

// Project queries
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    }
  });
}

export function useProject(projectId: string) {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      const response = await fetch(\`/api/projects/\${projectId}\`);
      if (!response.ok) throw new Error('Failed to fetch project');
      return response.json();
    },
    enabled: !!projectId
  });
}

export function useProjectTasks(projectId: string) {
  return useQuery({
    queryKey: ['projects', projectId, 'tasks'],
    queryFn: async () => {
      const response = await fetch(\`/api/projects/\${projectId}/tasks\`);
      if (!response.ok) throw new Error('Failed to fetch project tasks');
      return response.json();
    },
    enabled: !!projectId
  });
}

export function useProjectMembers(projectId: string) {
  return useQuery({
    queryKey: ['projects', projectId, 'members'],
    queryFn: async () => {
      const response = await fetch(\`/api/projects/\${projectId}/members\`);
      if (!response.ok) throw new Error('Failed to fetch project members');
      return response.json();
    },
    enabled: !!projectId
  });
}

export function useProjectStats(projectId: string) {
  return useQuery({
    queryKey: ['projects', projectId, 'stats'],
    queryFn: async () => {
      const response = await fetch(\`/api/projects/\${projectId}/stats\`);
      if (!response.ok) throw new Error('Failed to fetch project stats');
      return response.json();
    },
    enabled: !!projectId
  });
}

// Task queries
export function useTask(taskId: string) {
  return useQuery({
    queryKey: ['tasks', taskId],
    queryFn: async () => {
      const response = await fetch(\`/api/tasks/\${taskId}\`);
      if (!response.ok) throw new Error('Failed to fetch task');
      return response.json();
    },
    enabled: !!taskId
  });
}

export function useTaskComments(taskId: string) {
  return useQuery({
    queryKey: ['tasks', taskId, 'comments'],
    queryFn: async () => {
      const response = await fetch(\`/api/tasks/\${taskId}/comments\`);
      if (!response.ok) throw new Error('Failed to fetch task comments');
      return response.json();
    },
    enabled: !!taskId
  });
}

// Project mutations
export function useCreateProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: CreateProjectData) => {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create project');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, data }: { projectId: string; data: UpdateProjectData }) => {
      const response = await fetch(\`/api/projects/\${projectId}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update project');
      return response.json();
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const response = await fetch(\`/api/projects/\${projectId}\`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete project');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}

// Task mutations
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskData) => {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create task');
      return response.json();
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks'] });
    }
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, data }: { taskId: string; data: UpdateTaskData }) => {
      const response = await fetch(\`/api/tasks/\${taskId}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update task');
      return response.json();
    },
    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
      // Also invalidate project tasks
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const response = await fetch(\`/api/tasks/\${taskId}\`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete task');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}`
    },

    // Create kanban board component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/projects/KanbanBoard.tsx',
      content: `'use client';

import { useState ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useProjectTasks } from '@/lib/projects/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { CreateTaskDialog } from './CreateTaskDialog';

interface KanbanBoardProps {
  projectId: string;
}

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
  { id: 'review', title: 'Review', color: 'bg-yellow-100' },
  { id: 'done', title: 'Done', color: 'bg-green-100' }
] as const;

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const { data: tasks, isLoading } = useProjectTasks(projectId);
  const [activeTask, setActiveTask] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  const tasksByStatus = tasks?.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, any[]>) || {};

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id as string;

    // TODO: Implement task status update
    console.log('Moving task', taskId, 'to', newStatus);
    
    setActiveTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Kanban Board</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <Card key={column.id} className="min-h-[500px]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {column.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {tasksByStatus[column.id]?.length || 0}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <SortableContext
                  items={tasksByStatus[column.id]?.map(task => task.id) || []}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {tasksByStatus[column.id]?.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </SortableContext>
              </CardContent>
            </Card>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <CreateTaskDialog
        projectId={projectId}
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}`
    },

    // Create task card component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/projects/TaskCard.tsx',
      content: `'use client';

import { useSortable ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    priority: string;
    assigneeId?: string;
    dueDate?: string;
    tags: string[];
  };
}

export function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={\`cursor-grab hover:shadow-md transition-shadow \${isDragging ? 'opacity-50' : ''}\`}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm leading-tight">{task.title}</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>

          {task.description && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <Badge className={\`text-xs \${getPriorityColor(task.priority)}\`}>
              {task.priority}
            </Badge>
            
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(task.dueDate), 'MMM dd')}</span>
              </div>
            )}
          </div>

          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {task.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{task.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {task.assigneeId && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <User className="w-3 h-3" />
              <span>Assigned</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}`
    },

    // Create advanced kanban board (migrated from project-kanban)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/projects/KanbanBoard.tsx',
      content: `'use client';

import React from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, DragOverlay ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Filter, 
  Search, 
  Users, 
  Calendar,
  BarChart3,
  Settings
} from 'lucide-react';
import { useProjects, useTasks, useCreateTask, useUpdateTask } from '@/lib/projects/hooks';
import { useAuth } from '@/lib/auth/hooks';

interface KanbanBoardProps {
  projectId: string;
  onTaskSelect?: (taskId: string) => void;
  onCreateTask?: (columnId: string) => void;
}

export function KanbanBoard({ 
  projectId, 
  onTaskSelect, 
  onCreateTask 
}: KanbanBoardProps) {
  const [activeTask, setActiveTask] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<string>('all');
  
  // Use headless data logic
  const { data: project } = useProjects(projectId);
  const { data: tasks, isLoading, error } = useTasks(projectId);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const { data: user } = useAuth();

  // Define columns
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ];

  // Filter tasks
  const filteredTasks = tasks?.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  // Group tasks by status
  const tasksByStatus = columns.reduce((acc, column) => {
    acc[column.id] = filteredTasks.filter(task => task.status === column.id);
    return acc;
  }, {} as Record<string, any[]>);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks?.find(t => t.id === event.active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;
    
    // Update task status
    updateTask.mutate({
      id: taskId,
      updates: { status: newStatus }
    });

    setActiveTask(null);
  };

  const handleCreateTask = (columnId: string) => {
    onCreateTask?.(columnId);
  };

  const getTaskCount = (status: string) => {
    return tasksByStatus[status]?.length || 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load tasks. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project?.name || 'Project'}</h1>
          <p className="text-muted-foreground">
            {project?.description || 'Manage your project tasks with a kanban board'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Kanban Board */}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Badge variant="secondary">{getTaskCount(column.id)}</Badge>
              </div>
              
              <SortableContext items={tasksByStatus[column.id]?.map(t => t.id) || []} strategy={verticalListSortingStrategy}>
                <div className="space-y-3 min-h-[400px]">
                  {tasksByStatus[column.id]?.map((task) => (
                    <Card 
                      key={task.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onTaskSelect?.(task.id)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{task.title}</CardTitle>
                        {task.description && (
                          <CardDescription className="text-xs">
                            {task.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            {task.assignee && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{task.assignee.name}</span>
                              </div>
                            )}
                            {task.dueDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {task.priority}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button
                    variant="ghost"
                    className="w-full h-12 border-2 border-dashed border-gray-300 hover:border-gray-400"
                    onClick={() => handleCreateTask(column.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
        
        <DragOverlay>
          {activeTask ? (
            <Card className="opacity-90 rotate-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{activeTask.title}</CardTitle>
              </CardHeader>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}`
    },

    // Create project management pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/projects/page.tsx',
      content: `import { ProjectsList ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@/components/projects/ProjectsList';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-8">
      <ProjectsList />
    </div>
  );
}`
    },

    // Create project kanban page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/projects/[id]/kanban/page.tsx',
      content: `import { KanbanBoard ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@/components/projects/KanbanBoard';

interface ProjectKanbanPageProps {
  params: {
    id: string;
  };
}

export default function ProjectKanbanPage({ params }: ProjectKanbanPageProps) {
  return (
    <div className="container mx-auto py-8">
      <KanbanBoard projectId={params.id} />
    </div>
  );
}`
    }
  ]
};
