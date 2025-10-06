import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const teamsDashboardShadcnBlueprint: Blueprint = {
  id: 'teams-dashboard-shadcn',
  name: 'Teams Dashboard Shadcn Integration',
  description: 'Technical bridge connecting teams data and Shadcn/ui - configures teams utilities and styling',
  version: '2.0.0',
  actions: [
    // Configure Tailwind for teams components
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'tailwind.config.js',
      modifier: 'js-export-wrapper',
      params: {
        wrapperFunction: 'withTeamsConfig',
        wrapperImport: {
          name: 'withTeamsConfig',
          from: './lib/teams/tailwind-config',
          isDefault: false
        },
        wrapperOptions: {
          teamsStyles: true,
          teamsUtilities: true
        }
      }
    },
    // Create teams-specific Tailwind configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/teams/tailwind-config.ts',
      template: 'templates/tailwind-config.ts.tpl'
    },
    // Create teams utility functions
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/teams/utils.ts',
      template: 'templates/teams-utils.ts.tpl'
    },
    // Create teams component utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/teams/component-utils.ts',
      template: 'templates/component-utils.ts.tpl'
    },
    // Create teams styling constants
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/teams/styles.ts',
      template: 'templates/teams-styles.ts.tpl'
    }
  ]
};

export default teamsDashboardShadcnBlueprint;