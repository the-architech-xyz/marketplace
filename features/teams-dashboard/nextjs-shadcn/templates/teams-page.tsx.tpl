/**
 * Teams Page - SHADCN UI VERSION
 * 
 * Main teams management page
 * CONSUMES: teams-data-integration hooks
 */

import React from 'react';
import { TeamsDashboard } from '@/components/teams/TeamsDashboard';
import { CreateTeamForm } from '@/components/teams/CreateTeamForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

// Import headless teams logic
import { useAuth } from '@/hooks/use-auth';

export default function TeamsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [selectedTeamId, setSelectedTeamId] = React.useState<string | null>(null);
  
  // Use headless auth logic
  const { user } = useAuth();

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const handleCreateSuccess = (teamId: string) => {
    setIsCreateDialogOpen(false);
    setSelectedTeamId(teamId);
  };

  const handleCreateCancel = () => {
    setIsCreateDialogOpen(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view teams.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">
            Manage your teams and collaborate with your team members
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
            </DialogHeader>
            <CreateTeamForm
              onSuccess={handleCreateSuccess}
              onCancel={handleCreateCancel}
            />
          </DialogContent>
        </Dialog>
      </div>

      <TeamsDashboard
        userId={user.id}
        onTeamSelect={handleTeamSelect}
      />
    </div>
  );
}
