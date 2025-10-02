/**
 * Teams Data Hooks - HEADLESS INTEGRATOR
 * 
 * Pure data layer hooks for teams management
 * NO UI DEPENDENCIES - Only data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { teamsApi } from '@/lib/api/teams';
import type { Team, CreateTeamData, UpdateTeamData, TeamsError } from '@/types/teams';

// Get all teams
export function useTeams() {
  return useQuery({
    queryKey: queryKeys.teams.all(),
    queryFn: () => teamsApi.getTeams(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get team by ID
export function useTeam(teamId: string) {
  return useQuery({
    queryKey: queryKeys.teams.one(teamId),
    queryFn: () => teamsApi.getTeam(teamId),
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get user's teams
export function useUserTeams(userId: string) {
  return useQuery({
    queryKey: queryKeys.teams.userTeams(userId),
    queryFn: () => teamsApi.getUserTeams(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create team
export function useCreateTeam() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTeamData) => teamsApi.createTeam(data),
    onSuccess: (team: Team) => {
      // Invalidate teams queries
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.userTeams(team.ownerId) });
      
      // Add the new team to cache
      queryClient.setQueryData(queryKeys.teams.one(team.id), team);
    },
    onError: (error: TeamsError) => {
      console.error('Create team failed:', error);
    },
  });
}

// Update team
export function useUpdateTeam() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ teamId, data }: { teamId: string; data: UpdateTeamData }) => 
      teamsApi.updateTeam(teamId, data),
    onSuccess: (team: Team) => {
      // Update team in cache
      queryClient.setQueryData(queryKeys.teams.one(team.id), team);
      
      // Invalidate teams list
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all() });
    },
    onError: (error: TeamsError) => {
      console.error('Update team failed:', error);
    },
  });
}

// Delete team
export function useDeleteTeam() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (teamId: string) => teamsApi.deleteTeam(teamId),
    onSuccess: (_, teamId) => {
      // Remove team from cache
      queryClient.removeQueries({ queryKey: queryKeys.teams.one(teamId) });
      
      // Invalidate teams list
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all() });
    },
    onError: (error: TeamsError) => {
      console.error('Delete team failed:', error);
    },
  });
}

// Search teams
export function useTeamSearch(query: string) {
  return useQuery({
    queryKey: queryKeys.teams.search(query),
    queryFn: () => teamsApi.searchTeams(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
