/**
 * Team Goals Component - SHADCN UI VERSION
 * 
 * Displays and manages team goals
 * CONSUMES: teams-data-integration hooks
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { 
  Target, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

// Import headless teams logic
import { useTeamGoals, useCreateTeamGoal, useUpdateTeamGoal, useDeleteTeamGoal } from '@/features/teams/use-team-goals';

interface TeamGoalsProps {
  teamId: string | null;
  onCreateGoal?: (teamId: string) => void;
  onEditGoal?: (teamId: string, goalId: string) => void;
}

export function TeamGoals({ 
  teamId, 
  onCreateGoal, 
  onEditGoal 
}: TeamGoalsProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Use headless teams logic
  const { data: goals, isLoading, error } = useTeamGoals(teamId || '');
  const createGoal = useCreateTeamGoal();
  const updateGoal = useUpdateTeamGoal();
  const deleteGoal = useDeleteTeamGoal();

  const filteredGoals = goals?.filter(goal => 
    goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    goal.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCreateGoal = () => {
    if (teamId) {
      onCreateGoal?.(teamId);
    }
  };

  const handleEditGoal = (goalId: string) => {
    if (teamId) {
      onEditGoal?.(teamId, goalId);
    }
  };

  const handleToggleComplete = async (goalId: string, isCompleted: boolean) => {
    if (teamId) {
      try {
        await updateGoal.mutateAsync({
          teamId,
          goalId,
          updates: { isCompleted: !isCompleted }
        });
      } catch (error) {
        console.error('Failed to update goal:', error);
      }
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (teamId && window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal.mutateAsync({ teamId, goalId });
      } catch (error) {
        console.error('Failed to delete goal:', error);
      }
    }
  };

  const getStatusIcon = (goal: any) => {
    if (goal.isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (goal.dueDate && new Date(goal.dueDate) < new Date()) {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    } else {
      return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (goal: any) => {
    if (goal.isCompleted) {
      return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
    } else if (goal.dueDate && new Date(goal.dueDate) < new Date()) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else {
      return <Badge variant="secondary">In Progress</Badge>;
    }
  };

  const getProgressPercentage = (goal: any) => {
    if (goal.isCompleted) return 100;
    if (goal.progress) return Math.min(goal.progress, 100);
    return 0;
  };

  if (!teamId) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Select a team to view goals
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Team Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load team goals
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedGoals = goals?.filter(goal => goal.isCompleted).length || 0;
  const totalGoals = goals?.length || 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Team Goals
            </CardTitle>
            <CardDescription>
              {completedGoals} of {totalGoals} goals completed
            </CardDescription>
          </div>
          <Button onClick={handleCreateGoal}>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search goals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Goals List */}
          <div className="space-y-3">
            {filteredGoals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={() => handleToggleComplete(goal.id, goal.isCompleted)}
                      className="mt-1"
                    >
                      {getStatusIcon(goal)}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`font-medium ${goal.isCompleted ? 'line-through text-gray-500' : ''}`}>
                          {goal.title}
                        </h4>
                        {getStatusBadge(goal)}
                      </div>
                      
                      {goal.description && (
                        <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                      )}
                      
                      {/* Progress Bar */}
                      {!goal.isCompleted && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Progress</span>
                            <span>{getProgressPercentage(goal)}%</span>
                          </div>
                          <Progress value={getProgressPercentage(goal)} className="h-2" />
                        </div>
                      )}
                      
                      {/* Due Date */}
                      {goal.dueDate && (
                        <div className="text-xs text-gray-500 mt-2">
                          Due: {new Date(goal.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditGoal(goal.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Goal
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Goal
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredGoals.length === 0 && (
            <div className="text-center py-8">
              <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No goals found' : 'No goals yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Create your first team goal to get started'
                }
              </p>
              {!searchQuery && (
                <Button onClick={handleCreateGoal}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Goal
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
