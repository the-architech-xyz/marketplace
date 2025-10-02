/**
 * Teams Dashboard Component - MATERIAL-UI VERSION
 * 
 * This component uses the SAME headless teams logic but renders with Material-UI
 * SAME BUSINESS LOGIC, DIFFERENT UI LIBRARY!
 */

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  Tabs,
  Tab,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  BarChart as BarChartIcon,
  Flag as FlagIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';

// Import headless teams logic (SAME AS SHADCN VERSION!)
import { useTeams, useCreateTeam, useTeamStats } from '@/features/teams/use-teams';
import { useTeamMembers } from '@/features/teams/use-team-members';
import { useTeamGoals } from '@/features/teams/use-team-goals';
import { useTeamActivity } from '@/features/teams/use-team-activity';

interface TeamsDashboardProps {
  userId: string;
  onTeamSelect?: (teamId: string) => void;
}

export function TeamsDashboard({ userId, onTeamSelect }: TeamsDashboardProps) {
  // Use headless teams logic (IDENTICAL TO SHADCN VERSION!)
  const { data: teams, isLoading: teamsLoading, error: teamsError } = useTeams();
  const { data: userTeams, isLoading: userTeamsLoading } = useUserTeams(userId);
  const createTeam = useCreateTeam();
  const { data: teamStats } = useTeamStats(selectedTeamId);

  const [selectedTeamId, setSelectedTeamId] = React.useState<string | null>(null);
  const [tabValue, setTabValue] = React.useState(0);

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

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (teamsLoading || userTeamsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={256}>
        <CircularProgress />
      </Box>
    );
  }

  if (teamsError) {
    return (
      <Alert severity="error">
        Failed to load teams. Please try again.
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Teams Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your teams and collaborate with your team members
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleCreateTeam({ name: 'New Team' })}
        >
          Create Team
        </Button>
      </Box>

      {/* Teams Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total Teams
                  </Typography>
                  <Typography variant="h4">
                    {teams?.length || 0}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {userTeams?.length || 0} teams you're in
                  </Typography>
                </Box>
                <PeopleIcon color="action" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Active Members
                  </Typography>
                  <Typography variant="h4">
                    {teamStats?.activeMembers || 0}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Across all teams
                  </Typography>
                </Box>
                <PeopleIcon color="action" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Completed Goals
                  </Typography>
                  <Typography variant="h4">
                    {teamStats?.completedGoals || 0}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    This quarter
                  </Typography>
                </Box>
                <FlagIcon color="action" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Team Health
                  </Typography>
                  <Typography variant="h4">
                    {teamStats?.healthScore || 0}%
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Average across teams
                  </Typography>
                </Box>
                <BarChartIcon color="action" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Paper sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="teams dashboard tabs">
          <Tab label="Teams" />
          <Tab label="Members" />
          <Tab label="Goals" />
          <Tab label="Activity" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              {teams?.map((team) => (
                <Grid item xs={12} sm={6} md={4} key={team.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3
                      },
                      ...(selectedTeamId === team.id && {
                        border: 2,
                        borderColor: 'primary.main'
                      })
                    }}
                    onClick={() => handleTeamSelect(team.id)}
                  >
                    <CardHeader
                      title={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6">{team.name}</Typography>
                          <Chip
                            label={team.isActive ? 'Active' : 'Inactive'}
                            color={team.isActive ? 'primary' : 'default'}
                            size="small"
                          />
                        </Box>
                      }
                      subheader={team.description}
                    />
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={1}>
                          <PeopleIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {team.memberCount} members
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <FlagIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {team.goalCount} goals
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 1 && (
            <TeamMembers teamId={selectedTeamId} />
          )}

          {tabValue === 2 && (
            <TeamGoals teamId={selectedTeamId} />
          )}

          {tabValue === 3 && (
            <TeamActivity teamId={selectedTeamId} />
          )}
        </Box>
      </Paper>
    </Box>
  );
}
