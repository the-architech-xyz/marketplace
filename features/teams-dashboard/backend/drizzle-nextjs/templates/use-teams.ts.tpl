import { useQuery } from '@tanstack/react-query';
import { teamsApi } from '@/lib/api/teams';
import type { Team, TeamFilters } from '@/types/teams';

export const useTeams = (filters?: TeamFilters) => {
  return useQuery({
    queryKey: ['teams', filters],
    queryFn: () => teamsApi.getTeams(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
