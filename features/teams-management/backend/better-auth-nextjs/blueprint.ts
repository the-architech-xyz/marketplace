/**
 * Teams Management Backend: Better Auth NextJS Integration
 * 
 * Provides backend functionality for team management using Better Auth
 * Handles team creation, member management, permissions, and team settings
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const teamsManagementBackendBlueprint: Blueprint = {
  id: 'teams-management-backend-better-auth',
  name: 'Teams Management Backend (Better Auth)',
  description: 'Backend functionality for team management with Better Auth integration',
  actions: [
    // Install team management dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'zod@^3.22.4',
        'date-fns@^2.30.0'
      ]
    },

    // Create team management types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/teams/types.ts',
      template: 'templates/types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create team management API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/route.ts',
      template: 'templates/api-teams-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/[id]/route.ts',
      template: 'templates/api-teams-id-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/[id]/members/route.ts',
      template: 'templates/api-teams-members-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/teams/[id]/settings/route.ts',
      template: 'templates/api-teams-settings-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create team management services
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/teams/services.ts',
      template: 'templates/services.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create team management hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/teams/hooks.ts',
      template: 'templates/hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};

export default teamsManagementBackendBlueprint;
