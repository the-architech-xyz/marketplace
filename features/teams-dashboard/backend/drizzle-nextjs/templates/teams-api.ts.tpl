import type { Team, CreateTeamData, UpdateTeamData, TeamFilters } from '@/types/teams';

export const teamsApi = {
  getTeams: async (filters?: TeamFilters): Promise<Team[]> => {
    const response = await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters || {}),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }
    
    return response.json();
  },

  getTeam: async (id: string): Promise<Team> => {
    const response = await fetch(`/api/teams/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch team');
    }
    
    return response.json();
  },

  createTeam: async (data: CreateTeamData): Promise<Team> => {
    const response = await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create team');
    }
    
    return response.json();
  },

  updateTeam: async (id: string, data: UpdateTeamData): Promise<Team> => {
    const response = await fetch(`/api/teams/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update team');
    }
    
    return response.json();
  },

  deleteTeam: async (id: string): Promise<void> => {
    const response = await fetch(`/api/teams/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete team');
    }
  },
};
