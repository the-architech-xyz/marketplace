import { Blueprint } from '@thearchitech.xyz/types';

const teamsDashboardFrontendBlueprint: Blueprint = {
  id: 'teams-dashboard-frontend-shadcn',
  name: 'Teams Dashboard Frontend (Shadcn)',
  description: 'Frontend implementation of teams-dashboard using Shadcn/ui components',
  version: '1.0.0',
  actions: [
    // Create main teams dashboard page
    {
      type: 'CREATE_FILE',
      path: 'src/app/teams/page.tsx',
      template: 'templates/teams-page.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/teams/[id]/page.tsx',
      template: 'templates/team-detail-page.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/teams/[id]/settings/page.tsx',
      template: 'templates/team-settings-page.tsx.tpl'
    },

    // Create teams components
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamsList.tsx',
      template: 'templates/TeamsList.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamCard.tsx',
      template: 'templates/TeamCard.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/CreateTeamDialog.tsx',
      template: 'templates/CreateTeamDialog.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/EditTeamDialog.tsx',
      template: 'templates/EditTeamDialog.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamMembersList.tsx',
      template: 'templates/TeamMembersList.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/AddMemberDialog.tsx',
      template: 'templates/AddMemberDialog.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamSettings.tsx',
      template: 'templates/TeamSettings.tsx.tpl'
    },

    // Create sub-feature components
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/invitations/InvitationsList.tsx',
      template: 'templates/InvitationsList.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/invitations/InviteUserDialog.tsx',
      template: 'templates/InviteUserDialog.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/billing/BillingCard.tsx',
      template: 'templates/BillingCard.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/analytics/TeamAnalytics.tsx',
      template: 'templates/TeamAnalytics.tsx.tpl'
    },

    // Create form components
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/forms/CreateTeamForm.tsx',
      template: 'templates/CreateTeamForm.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/forms/EditTeamForm.tsx',
      template: 'templates/EditTeamForm.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/forms/InviteUserForm.tsx',
      template: 'templates/InviteUserForm.tsx.tpl'
    },

    // Create utility components
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamAvatar.tsx',
      template: 'templates/TeamAvatar.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamBadge.tsx',
      template: 'templates/TeamBadge.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/teams/TeamActions.tsx',
      template: 'templates/TeamActions.tsx.tpl'
    }
  ]
};

export default teamsDashboardFrontendBlueprint;
