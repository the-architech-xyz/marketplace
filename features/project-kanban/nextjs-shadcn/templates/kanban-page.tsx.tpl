/**
 * Kanban Page - SHADCN UI VERSION
 * 
 * Main Kanban board page
 * CONSUMES: drizzle-nextjs hooks
 */

import React from 'react';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { ProjectSelector } from '@/components/kanban/ProjectSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FolderOpen } from 'lucide-react';

// Import headless data logic
import { useProjects } from '@/hooks/use-projects';
import { useAuth } from '@/hooks/use-auth';

export default function KanbanPage() {
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);
  
  // Use headless data logic
  const { data: projects, isLoading } = useProjects();
  const { user, isAuthenticated } = useAuth();

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleTaskSelect = (taskId: string) => {
    // Handle task selection (could open a modal or navigate to task detail)
    console.log('Selected task:', taskId);
  };

  const handleCreateTask = (columnId: string) => {
    // Handle task creation (could open a modal or navigate to create task)
    console.log('Create task in column:', columnId);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view the Kanban board.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-muted-foreground">
            Manage your projects and tasks with a visual board
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {!selectedProjectId ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderOpen className="mr-2 h-5 w-5" />
                Select a Project
              </CardTitle>
              <CardDescription>
                Choose a project to view its Kanban board
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectSelector
                projects={projects || []}
                onProjectSelect={handleProjectSelect}
              />
            </CardContent>
          </Card>

          {projects && projects.length === 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <FolderOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No projects yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Create your first project to get started with the Kanban board
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <KanbanBoard
          projectId={selectedProjectId}
          onTaskSelect={handleTaskSelect}
          onCreateTask={handleCreateTask}
        />
      )}
    </div>
  );
}
