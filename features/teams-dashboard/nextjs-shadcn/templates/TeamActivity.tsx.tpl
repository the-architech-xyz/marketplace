/**
 * Team Activity Component - SHADCN UI VERSION
 * 
 * Displays team activity feed
 * CONSUMES: teams-data-integration hooks
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Activity, 
  UserPlus, 
  UserMinus, 
  Target, 
  MessageSquare, 
  FileText,
  Calendar,
  Clock
} from 'lucide-react';

// Import headless teams logic
import { useTeamActivity } from '@/features/teams/use-team-activity';

interface TeamActivityProps {
  teamId: string | null;
}

export function TeamActivity({ teamId }: TeamActivityProps) {
  // Use headless teams logic
  const { data: activities, isLoading, error } = useTeamActivity(teamId || '');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'member_added':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'member_removed':
        return <UserMinus className="h-4 w-4 text-red-500" />;
      case 'goal_created':
        return <Target className="h-4 w-4 text-blue-500" />;
      case 'goal_completed':
        return <Target className="h-4 w-4 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'file_uploaded':
        return <FileText className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'member_added':
        return 'bg-green-100 text-green-800';
      case 'member_removed':
        return 'bg-red-100 text-red-800';
      case 'goal_created':
        return 'bg-blue-100 text-blue-800';
      case 'goal_completed':
        return 'bg-green-100 text-green-800';
      case 'message':
        return 'bg-purple-100 text-purple-800';
      case 'file_uploaded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatActivityMessage = (activity: any) => {
    switch (activity.type) {
      case 'member_added':
        return `${activity.user.name} joined the team`;
      case 'member_removed':
        return `${activity.user.name} left the team`;
      case 'goal_created':
        return `${activity.user.name} created a new goal: "${activity.data.goalTitle}"`;
      case 'goal_completed':
        return `${activity.user.name} completed goal: "${activity.data.goalTitle}"`;
      case 'message':
        return `${activity.user.name} posted a message`;
      case 'file_uploaded':
        return `${activity.user.name} uploaded a file: "${activity.data.fileName}"`;
      default:
        return activity.message || 'Unknown activity';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityTime.toLocaleDateString();
  };

  if (!teamId) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Select a team to view activity
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
            <Activity className="mr-2 h-5 w-5" />
            Team Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
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
            Failed to load team activity
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Team Activity
        </CardTitle>
        <CardDescription>
          Recent activity and updates from your team
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {activities && activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>
                      {activity.user.name?.charAt(0) || activity.user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium">
                        {activity.user.name || 'Unknown User'}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getActivityColor(activity.type)}`}
                      >
                        {activity.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1">
                      {formatActivityMessage(activity)}
                    </p>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(activity.timestamp)}</span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Activity className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No activity yet
              </h3>
              <p className="text-gray-500">
                Team activity will appear here as members interact and collaborate
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
