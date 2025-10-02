/**
 * Kanban Board Component - SHADCN UI VERSION
 * 
 * Main Kanban board with drag and drop functionality
 * CONSUMES: drizzle-nextjs hooks
 */

import React from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Filter, 
  Search, 
  Users, 
  Calendar,
  BarChart3,
  Settings
} from 'lucide-react';

// Import headless data logic
import { useProjects, useTasks, useCreateTask, useUpdateTask } from '@/hooks/use-projects';
import { useAuth } from '@/hooks/use-auth';

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
  const { user } = useAuth();

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

  const getCompletionPercentage = () => {
    const total = tasks?.length || 0;
    const completed = tasksByStatus.done?.length || 0;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load Kanban board
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
          <h1 className="text-3xl font-bold tracking-tight">{project?.name || 'Kanban Board'}</h1>
          <p className="text-muted-foreground">
            {project?.description || 'Manage your project tasks with a visual board'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTaskCount('in-progress')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTaskCount('done')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getCompletionPercentage()}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Kanban Board */}
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <Card key={column.id} className="min-h-[500px]">
              <CardHeader className={`${column.color} rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
                  <Badge variant="secondary">{getTaskCount(column.id)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <SortableContext
                  items={tasksByStatus[column.id]?.map(task => task.id) || []}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {tasksByStatus[column.id]?.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => onTaskSelect?.(task.id)}
                      >
                        <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                        {task.description && (
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>#{task.id.slice(-4)}</span>
                          {task.assignee && (
                            <span>{task.assignee.name}</span>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-500 hover:text-gray-700"
                      onClick={() => handleCreateTask(column.id)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </SortableContext>
              </CardContent>
            </Card>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
              <h4 className="font-medium text-sm">{activeTask.title}</h4>
              {activeTask.description && (
                <p className="text-xs text-gray-600 mt-1">{activeTask.description}</p>
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
