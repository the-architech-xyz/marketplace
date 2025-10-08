/**
 * Teams Management Frontend: Shadcn/ui
 * 
 * Complete team management UI with creation, member management, settings, and dashboard
 * Uses template-based component generation for maintainability
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const teamsManagementFrontendBlueprint: Blueprint = {
  id: 'teams-management-frontend-shadcn',
  name: 'Teams Management Frontend (Shadcn/ui)',
  description: 'Complete team management UI with creation, member management, settings, and dashboard',
  actions: [
    // Install core dependencies (no duplicates - handled by core-dependencies)
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'date-fns@^2.30.0',
        'lucide-react@^0.294.0'
      ]
    },

    // Create team management types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}teams/types.ts',
      template: 'templates/types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create team management hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}teams/hooks.ts',
      template: 'templates/hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create teams list component (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/TeamsList.tsx',
      template: 'templates/TeamsList.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create team creation form (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/CreateTeamForm.tsx',
      template: 'templates/CreateTeamForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create team settings component (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/TeamSettings.tsx',
      template: 'templates/TeamSettings.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create member management component (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/MemberManagement.tsx',
      template: 'templates/MemberManagement.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create teams dashboard (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/TeamsDashboard.tsx',
      template: 'templates/TeamsDashboard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create teams management page (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}teams/page.tsx',
      template: 'templates/teams-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ]
};

export default teamsManagementFrontendBlueprint;
