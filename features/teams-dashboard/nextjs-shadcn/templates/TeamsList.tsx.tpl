/**
 * Teams List Component - SHADCN UI VERSION
 * 
 * Displays a list of teams with search and filtering capabilities
 * CONSUMES: teams-data-integration hooks
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Users, Target, Calendar } from 'lucide-react';

// Import headless teams logic
import { useTeams, useTeamSearch } from '@/features/teams/use-teams';

interface TeamsListProps {
  onTeamSelect?: (teamId: string) => void;
  onCreateTeam?: () => void;
  selectedTeamId?: string | null;
}

export function TeamsList({ onTeamSelect, onCreateTeam, selectedTeamId }: TeamsListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Use headless teams logic
  const { data: teams, isLoading, error } = useTeams();
  const { data: searchResults, isLoading: isSearching } = useTeamSearch(searchQuery);
  
  const displayTeams = searchQuery ? searchResults : teams;
  
  const handleTeamClick = (teamId: string) => {
    onTeamSelect?.(teamId);
  };
  
  const handleCreateClick = () => {
    onCreateTeam?.();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
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
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleCreateClick}>
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>

      {/* Teams Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayTeams?.map((team) => (
          <Card 
            key={team.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTeamId === team.id ? 'ring-2 ring-primary shadow-md' : ''
            }`}
            onClick={() => handleTeamClick(team.id)}
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
              <div className="space-y-3">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {team.memberCount || 0} members
                  </div>
                  <div className="flex items-center">
                    <Target className="mr-1 h-4 w-4" />
                    {team.goalCount || 0} goals
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  Created {new Date(team.createdAt).toLocaleDateString()}
                </div>
                
                {team.owner && (
                  <div className="text-xs text-muted-foreground">
                    Owner: {team.owner.name || team.owner.email}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {(!displayTeams || displayTeams.length === 0) && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No teams found' : 'No teams yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Get started by creating your first team'
                }
              </p>
              {!searchQuery && (
                <Button onClick={handleCreateClick}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Team
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
