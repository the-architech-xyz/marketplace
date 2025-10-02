/**
 * Team Members Component - SHADCN UI VERSION
 * 
 * Displays and manages team members
 * CONSUMES: teams-data-integration hooks
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  UserPlus, 
  UserMinus, 
  Crown,
  Shield,
  User
} from 'lucide-react';

// Import headless teams logic
import { useTeamMembers, useTeam } from '@/features/teams/use-team-members';

interface TeamMembersProps {
  teamId: string | null;
  onInviteMember?: (teamId: string) => void;
  onRemoveMember?: (teamId: string, userId: string) => void;
  onUpdateRole?: (teamId: string, userId: string, role: string) => void;
}

export function TeamMembers({ 
  teamId, 
  onInviteMember, 
  onRemoveMember, 
  onUpdateRole 
}: TeamMembersProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Use headless teams logic
  const { data: team } = useTeam(teamId || '');
  const { data: members, isLoading, error } = useTeamMembers(teamId || '');

  const filteredMembers = members?.filter(member => 
    member.user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleInviteMember = () => {
    if (teamId) {
      onInviteMember?.(teamId);
    }
  };

  const handleRemoveMember = (userId: string) => {
    if (teamId) {
      onRemoveMember?.(teamId, userId);
    }
  };

  const handleUpdateRole = (userId: string, role: string) => {
    if (teamId) {
      onUpdateRole?.(teamId, userId, role);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'default';
      case 'admin':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (!teamId) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Select a team to view members
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
            <Users className="mr-2 h-5 w-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
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
            Failed to load team members
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Team Members
            </CardTitle>
            <CardDescription>
              {members?.length || 0} members in {team?.name}
            </CardDescription>
          </div>
          <Button onClick={handleInviteMember}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Members List */}
          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={member.user.avatar} />
                    <AvatarFallback>
                      {member.user.name?.charAt(0) || member.user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {member.user.name || 'Unknown User'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {member.user.email}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={getRoleBadgeVariant(member.role)}>
                    <div className="flex items-center space-x-1">
                      {getRoleIcon(member.role)}
                      <span className="capitalize">{member.role}</span>
                    </div>
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleUpdateRole(member.user.id, 'admin')}
                        disabled={member.role === 'admin'}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Make Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUpdateRole(member.user.id, 'member')}
                        disabled={member.role === 'member'}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Make Member
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleRemoveMember(member.user.id)}
                        className="text-red-600 focus:text-red-600"
                        disabled={member.role === 'owner'}
                      >
                        <UserMinus className="mr-2 h-4 w-4" />
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'No members found' : 'No members yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? 'Try adjusting your search terms'
                  : 'Invite team members to get started'
                }
              </p>
              {!searchQuery && (
                <Button onClick={handleInviteMember}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Members
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
