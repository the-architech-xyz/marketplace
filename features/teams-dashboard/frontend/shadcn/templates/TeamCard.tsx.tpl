'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Users, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Team } from '@/types/teams';
import Link from 'next/link';

interface TeamCardProps {
  team: Team;
}

export const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{team.name}</CardTitle>
            {team.description && (
              <CardDescription>{team.description}</CardDescription>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/teams/${team.id}`}>
                  <Users className="mr-2 h-4 w-4" />
                  View Team
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/teams/${team.id}/settings`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant={team.isActive ? 'default' : 'secondary'}>
              {team.isActive ? 'Active' : 'Inactive'}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {team.slug}
            </span>
          </div>
          <Button asChild size="sm">
            <Link href={`/teams/${team.id}`}>
              View Team
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
