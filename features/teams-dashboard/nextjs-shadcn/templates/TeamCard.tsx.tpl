/**
 * Team Card Component - SHADCN UI VERSION
 * 
 * Individual team card with key metrics and actions
 * CONSUMES: teams-data-integration hooks
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Users, 
  Target, 
  Calendar, 
  MoreVertical, 
  Settings, 
  Trash2, 
  Edit,
  BarChart3,
  Activity
} from 'lucide-react';

// Import headless teams logic
import { useTeam, useDeleteTeam } from '@/features/teams/use-teams';

interface TeamCardProps {
  teamId: string;
  onEdit?: (teamId: string) => void;
  onSettings?: (teamId: string) => void;
  onAnalytics?: (teamId: string) => void;
  onActivity?: (teamId: string) => void;
  onSelect?: (teamId: string) => void;
  isSelected?: boolean;
  className?: string;
}

export function TeamCard({ 
  teamId, 
  onEdit, 
  onSettings, 
  onAnalytics, 
  onActivity, 
  onSelect,
  isSelected = false,
  className = ''
}: TeamCardProps) {
  // Use headless teams logic
  const { data: team, isLoading, error } = useTeam(teamId);
  const deleteTeam = useDeleteTeam();

  const handleCardClick = () => {
    onSelect?.(teamId);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(teamId);
  };

  const handleSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSettings?.(teamId);
  };

  const handleAnalytics = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAnalytics?.(teamId);
  };

  const handleActivity = (e: React.MouseEvent) => {
    e.stopPropagation();
    onActivity?.(teamId);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await deleteTeam.mutateAsync(teamId);
      } catch (error) {
        console.error('Failed to delete team:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <Card className={`animate-pulse ${className}`}>
        <CardHeader>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </CardHeader>
        <CardContent>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </CardContent>
      </Card>
    );
  }

  if (error || !team) {
    return (
      <Card className={`border-red-200 ${className}`}>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load team
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary shadow-md' : ''
      } ${className}`}
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{team.name}</CardTitle>
            <CardDescription className="mt-1">{team.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={team.isActive ? 'default' : 'secondary'}>
              {team.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Team
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAnalytics}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleActivity}>
                  <Activity className="mr-2 h-4 w-4" />
                  Activity
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Team
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{team.memberCount || 0}</div>
                <div className="text-xs text-muted-foreground">Members</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{team.goalCount || 0}</div>
                <div className="text-xs text-muted-foreground">Goals</div>
              </div>
            </div>
          </div>

          {/* Team Stats */}
          {team.stats && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Health Score</span>
                <span className="font-medium">{team.stats.healthScore || 0}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completed Goals</span>
                <span className="font-medium">{team.stats.completedGoals || 0}</span>
              </div>
            </div>
          )}

          {/* Created Date */}
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            Created {new Date(team.createdAt).toLocaleDateString()}
          </div>

          {/* Owner */}
          {team.owner && (
            <div className="text-xs text-muted-foreground">
              Owner: {team.owner.name || team.owner.email}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
