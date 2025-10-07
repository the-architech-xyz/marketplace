/**
 * Teams Management System Blueprint
 * 
 * Complete team management system with creation, member management, settings, and dashboard.
 * This is a cohesive business module that provides complete team management functionality.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';

export const teamsManagementBlueprint: Blueprint = {
  id: 'teams-management-setup',
  name: 'Teams Management System',
  description: 'Complete team management with creation, members, settings, and dashboard',
  actions: [
    // Install additional dependencies for team management
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4',
        'date-fns@^2.30.0',
        'lucide-react@^0.294.0'
      ]
    },

    // Create team management types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/teams/types.ts',
      content: `/**
 * Teams Management Types
 */

export interface Team {
  id: string;
  name: string;
  description?: string;
  slug: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  settings: TeamSettings;
,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: TeamRole;
  joinedAt: Date;
  invitedBy?: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

export interface TeamSettings {
  allowInvites: boolean;
  requireApproval: boolean;
  defaultRole: TeamRole;
  maxMembers?: number;
  privacy: 'public' | 'private';
}

export type TeamRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface TeamInvitation {
  id: string;
  teamId: string;
  email: string;
  role: TeamRole;
  invitedBy: string;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  token: string;
}

export interface CreateTeamData {
  name: string;
  description?: string;
  slug: string;
  settings?: Partial<TeamSettings>;
}

export interface UpdateTeamData {
  name?: string;
  description?: string;
  settings?: Partial<TeamSettings>;
}

export interface InviteMemberData {
  email: string;
  role: TeamRole;
}

export interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  pendingInvitations: number;
  recentActivity: number;
}`
    },

    // Create team management hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/teams/hooks.ts',
      content: `/**
 * Teams Management Hooks
 */

import { useQuery, useMutation, useQueryClient ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@tanstack/react-query';
import { useAuth } from '@/lib/auth/use-auth';

// Team queries
export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const response = await fetch('/api/teams');
      if (!response.ok) throw new Error('Failed to fetch teams');
      return response.json();
    }
  });
}

export function useTeam(teamId: string) {
  return useQuery({
    queryKey: ['teams', teamId],
    queryFn: async () => {
      const response = await fetch(\`/api/teams/\${teamId}\`);
      if (!response.ok) throw new Error('Failed to fetch team');
      return response.json();
    },
    enabled: !!teamId
  });
}

export function useTeamMembers(teamId: string) {
  return useQuery({
    queryKey: ['teams', teamId, 'members'],
    queryFn: async () => {
      const response = await fetch(\`/api/teams/\${teamId}/members\`);
      if (!response.ok) throw new Error('Failed to fetch team members');
      return response.json();
    },
    enabled: !!teamId
  });
}

export function useTeamInvitations(teamId: string) {
  return useQuery({
    queryKey: ['teams', teamId, 'invitations'],
    queryFn: async () => {
      const response = await fetch(\`/api/teams/\${teamId}/invitations\`);
      if (!response.ok) throw new Error('Failed to fetch team invitations');
      return response.json();
    },
    enabled: !!teamId
  });
}

// Team mutations
export function useCreateTeam() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: CreateTeamData) => {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create team');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    }
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ teamId, data }: { teamId: string; data: UpdateTeamData }) => {
      const response = await fetch(\`/api/teams/\${teamId}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update team');
      return response.json();
    },
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: ['teams', teamId] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    }
  });
}

export function useInviteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ teamId, data }: { teamId: string; data: InviteMemberData }) => {
      const response = await fetch(\`/api/teams/\${teamId}/invitations\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to invite member');
      return response.json();
    },
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: ['teams', teamId, 'invitations'] });
    }
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ teamId, memberId }: { teamId: string; memberId: string }) => {
      const response = await fetch(\`/api/teams/\${teamId}/members/\${memberId}\`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to remove member');
    },
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: ['teams', teamId, 'members'] });
    }
  });
}`
    },

    // Create team management API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/route.ts',
      content: `/**
 * Teams API Routes
 */

import { NextRequest, NextResponse ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Implement team fetching logic
    const teams = [];
    
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, slug, settings } = body;

    // TODO: Implement team creation logic
    const team = {
      id: 'temp-id',
      name,
      description,
      slug,
      settings: settings || {},
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: session.user.id
    };
    
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}`
    },

    // Create team management components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/teams/TeamsList.tsx',
      content: `'use client';

import { useTeams ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@/lib/teams/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Settings, Calendar } from 'lucide-react';
import Link from 'next/link';

export function TeamsList() {
  const { data: teams, isLoading, error } = useTeams();

  if (isLoading) {
    return <div>Loading teams...</div>;
  }

  if (error) {
    return <div>Error loading teams: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Teams</h2>
        <Button asChild>
          <Link href="/teams/new">Create Team</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams?.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{team.name}</CardTitle>
                <Badge variant="outline">{team.settings.privacy}</Badge>
              </div>
              <CardDescription>{team.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{team.memberCount || 0} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(team.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button asChild variant="outline" size="sm">
                  <Link href={\`/teams/\${team.id}\`}>View</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={\`/teams/\${team.id}/settings\`}>
                    <Settings className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}`
    },

    // Create team creation form
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/teams/CreateTeamForm.tsx',
      content: `'use client';

import { useState ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTeam } from '@/lib/teams/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const createTeamSchema = z.object({
  name: z.string().min(1, 'Team name is required').max(50, 'Team name must be less than 50 characters'),
  description: z.string().max(200, 'Description must be less than 200 characters').optional(),
  slug: z.string()
    .min(1, 'Team slug is required')
    .max(30, 'Team slug must be less than 30 characters')
    .regex(/^[a-z0-9-]+$/, 'Team slug can only contain lowercase letters, numbers, and hyphens')
});

type CreateTeamFormData = z.infer<typeof createTeamSchema>;

export function CreateTeamForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createTeam = useCreateTeam();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamSchema)
  });

  const watchedName = watch('name');

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue('name', name);
    setValue('slug', generateSlug(name));
  };

  const onSubmit = async (data: CreateTeamFormData) => {
    setIsSubmitting(true);
    try {
      await createTeam.mutateAsync(data);
      // TODO: Redirect to team page or show success message
    } catch (error) {
      console.error('Error creating team:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Team</CardTitle>
        <CardDescription>
          Set up a new team to collaborate with your colleagues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name</Label>
            <Input
              id="name"
              {...register('name')}
              onChange={handleNameChange}
              placeholder="Enter team name"
            />
            {errors.name && (
              <Alert>
                <AlertDescription>{errors.name.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Team Slug</Label>
            <Input
              id="slug"
              {...register('slug')}
              placeholder="team-slug"
            />
            <p className="text-sm text-gray-600">
              This will be used in your team's URL: /teams/team-slug
            </p>
            {errors.slug && (
              <Alert>
                <AlertDescription>{errors.slug.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your team's purpose"
              rows={3}
            />
            {errors.description && (
              <Alert>
                <AlertDescription>{errors.description.message}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Team
            </Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}`
    },

    // Create advanced teams dashboard (migrated from teams-dashboard)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/teams/TeamsDashboard.tsx',
      content: `'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Users, Settings, BarChart3, Target, Activity } from 'lucide-react';
import { useTeams, useCreateTeam } from '@/lib/teams/hooks';
import { useAuth } from '@/lib/auth/hooks';

interface TeamsDashboardProps {
  userId: string;
  onTeamSelect?: (teamId: string) => void;
}

export function TeamsDashboard({ userId, onTeamSelect }: TeamsDashboardProps) {
  const { data: teams, isLoading: teamsLoading, error: teamsError } = useTeams();
  const createTeam = useCreateTeam();
  const { data: user } = useAuth();

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

  if (teamsLoading) {
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
        <Button onClick={() => handleCreateTeam({ name: 'New Team', slug: 'new-team' })}>
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
              {teams?.filter(t => t.ownerId === userId)?.length || 0} teams you own
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
              {teams?.reduce((acc, team) => acc + (team.memberCount || 0), 0) || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all teams
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Health</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
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
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teams?.map((team) => (
              <Card 
                key={team.id} 
                className={\`cursor-pointer transition-colors hover:bg-accent ${
                  selectedTeamId === team.id ? 'ring-2 ring-primary' : ''
                }\`}
                onClick={() => handleTeamSelect(team.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <Badge variant={team.settings?.privacy === 'public' ? 'default' : 'secondary'}>
                      {team.settings?.privacy || 'private'}
                    </Badge>
                  </div>
                  <CardDescription>{team.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {team.memberCount || 0} members
                    </div>
                    <div className="flex items-center">
                      <Target className="mr-1 h-4 w-4" />
                      0 goals
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members">
          <div className="text-center py-8">
            <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team Members</h3>
            <p className="text-gray-600">Select a team to view its members</p>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="text-center py-8">
            <Activity className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team Activity</h3>
            <p className="text-gray-600">Select a team to view its activity</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}`
    },

    // Create teams management page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/teams/page.tsx',
      content: `import { TeamsDashboard ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@/components/teams/TeamsDashboard';
import { useAuth } from '@/lib/auth/hooks';

export default function TeamsPage() {
  const { data: user } = useAuth();
  
  return (
    <div className="container mx-auto py-8">
      <TeamsDashboard userId={user?.id || ''} />
    </div>
  );
}`
    },

    // Create team creation page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/teams/new/page.tsx',
      content: `import { CreateTeamForm ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }} from '@/components/teams/CreateTeamForm';

export default function CreateTeamPage() {
  return (
    <div className="container mx-auto py-8">
      <CreateTeamForm />
    </div>
  );
}`
    }
  ]
};
