/**
 * Teams Dashboard Component - SHADCN UI VERSION
 * 
 * This component uses the headless teams logic and renders with Shadcn/ui
 * SAME BUSINESS LOGIC, DIFFERENT UI LIBRARY!
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Users, Settings, BarChart3, Target, Activity } from 'lucide-react';

// Import headless teams logic (NO UI DEPENDENCIES!)
import { useTeams, useCreateTeam, useTeamStats } from '@/features/teams/use-teams';
import { useTeamMembers } from '@/features/teams/use-team-members';
import { useTeamGoals } from '@/features/teams/use-team-goals';
import { useTeamActivity } from '@/features/teams/use-team-activity';

interface TeamsDashboardProps {
  userId: string;
  onTeamSelect?: (teamId: string) => void;
}

export function TeamsDashboard({ userId, onTeamSelect }: TeamsDashboardProps) {
  // Use headless teams logic (SAME ACROSS ALL UI LIBRARIES!)
  const { data: teams, isLoading: teamsLoading, error: teamsError } = useTeams();
  const { data: userTeams, isLoading: userTeamsLoading } = useUserTeams(userId);
  const createTeam = useCreateTeam();
  const { data: teamStats } = useTeamStats(selectedTeamId);

  const [selectedTeamId, setSelectedTeamId] = React.useState<string | null>(null);

  // Handle team selection
  const handleTeamSelect = (teamId: string) => {
    setSelectedTeamId(teamId);
    onTeamSelect?.(teamId);
  };

  // Handle create team
  const handleCreateTeam = async (teamData: any) => {
    try {
      await createTeam.mutateAsync(teamData);
    } catch (error) {
      console.error('Failed to create team:', error);
    }
  };

  if (teamsLoading || userTeamsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (teamsError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load teams. Please try again.
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
          <h1 className="text-3xl font-bold tracking-tight">Teams Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your teams and collaborate with your team members
          </p>
        </div>
        <Button onClick={() => handleCreateTeam({ name: 'New Team' })}>
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      {/* Teams Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {userTeams?.length || 0} teams you're in
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamStats?.activeMembers || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all teams
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamStats?.completedGoals || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              This quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Health</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamStats?.healthScore || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average across teams
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="teams" className="space-y-4">
        <TabsList>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teams?.map((team) => (
              <Card 
                key={team.id} 
                className={`cursor-pointer transition-colors hover:bg-accent ${
                  selectedTeamId === team.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTeamSelect(team.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <Badge variant={team.isActive ? 'default' : 'secondary'}>
                      {team.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <CardDescription>{team.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {team.memberCount} members
                    </div>
                    <div className="flex items-center">
                      <Target className="mr-1 h-4 w-4" />
                      {team.goalCount} goals
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members">
          <TeamMembers teamId={selectedTeamId} />
        </TabsContent>

        <TabsContent value="goals">
          <TeamGoals teamId={selectedTeamId} />
        </TabsContent>

        <TabsContent value="activity">
          <TeamActivity teamId={selectedTeamId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
