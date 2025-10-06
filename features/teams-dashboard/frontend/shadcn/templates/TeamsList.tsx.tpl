'use client';

import { useTeams } from '@/hooks/teams/use-teams';
import { TeamCard } from './TeamCard';
import { CreateTeamDialog } from './CreateTeamDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const TeamsList = () => {
  const { data: teams, isLoading, error } = useTeams();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading teams...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-destructive">Failed to load teams</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Teams</h1>
        <CreateTeamDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Team
          </Button>
        </CreateTeamDialog>
      </div>

      {teams && teams.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-lg font-semibold">No teams yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first team.
          </p>
          <CreateTeamDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </CreateTeamDialog>
        </div>
      )}
    </div>
  );
};
