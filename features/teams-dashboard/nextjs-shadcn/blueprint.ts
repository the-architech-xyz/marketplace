import { Blueprint } from '@thearchitech.xyz/types';

const teamsDashboardNextjsShadcnBlueprint: Blueprint = {
  id: 'teams-dashboard-nextjs-shadcn',
  name: 'Teams Dashboard (Next.js + Shadcn)',
  description: 'Complete teams management dashboard with Next.js and Shadcn/ui',
  version: '1.0.0',
  actions: [
    // Create main teams dashboard component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamsDashboard.tsx',
      template: 'templates/TeamsDashboard.tsx.tpl'
    },
    // Create teams list component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamsList.tsx',
      template: 'templates/TeamsList.tsx.tpl'
    },
    // Create team card component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamCard.tsx',
      template: 'templates/TeamCard.tsx.tpl'
    },
    // Create team form component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/CreateTeamForm.tsx',
      template: 'templates/CreateTeamForm.tsx.tpl'
    },
    // Create team settings component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamSettings.tsx',
      template: 'templates/TeamSettings.tsx.tpl'
    },
    // Create team members component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamMembers.tsx',
      template: 'templates/TeamMembers.tsx.tpl'
    },
    // Create team invitations component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamInvitations.tsx',
      template: 'templates/TeamInvitations.tsx.tpl'
    },
    // Create team analytics component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamAnalytics.tsx',
      template: 'templates/TeamAnalytics.tsx.tpl',
      condition: '{{#if feature.parameters.features.analytics}}'
    },
    // Create team goals component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamGoals.tsx',
      template: 'templates/TeamGoals.tsx.tpl',
      condition: '{{#if feature.parameters.features.goals}}'
    },
    // Create team activity component
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamActivity.tsx',
      template: 'templates/TeamActivity.tsx.tpl'
    },
    // Create teams page
    {
      type: 'CREATE_FILE',
      path: 'src/app/teams/page.tsx',
      template: 'templates/teams-page.tsx.tpl'
    },
    // Create team detail page
    {
      type: 'CREATE_FILE',
      path: 'src/app/teams/[id]/page.tsx',
      template: 'templates/team-detail-page.tsx.tpl'
    },
    // Create team settings page
    {
      type: 'CREATE_FILE',
      path: 'src/app/teams/[id]/settings/page.tsx',
      template: 'templates/team-settings-page.tsx.tpl'
    },
    // Create feature-specific utilities
    {
      type: 'CREATE_FILE',
      path: 'src/features/teams/utils.ts',
      template: 'templates/teams-utils.ts.tpl'
    },
    // Create feature-specific constants
    {
      type: 'CREATE_FILE',
      path: 'src/features/teams/constants.ts',
      template: 'templates/teams-constants.ts.tpl'
    },
    // Create feature-specific types
    {
      type: 'CREATE_FILE',
      path: 'src/features/teams/types.ts',
      template: 'templates/teams-types.ts.tpl'
    }
  ]
};

export default teamsDashboardNextjsShadcnBlueprint;
