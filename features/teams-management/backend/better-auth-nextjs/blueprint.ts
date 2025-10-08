import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const blueprint: Blueprint = {
  id: 'teams-management-backend-better-auth-nextjs',
  name: 'Teams Capability (Better Auth + NextJS)',
  description: 'Complete teams management backend with Better Auth and NextJS, providing ITeamsService.',
  version: '2.0.0',
  actions: [
    // Create the main TeamsService that implements ITeamsService
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}services/TeamsService.ts',
      template: 'templates/TeamsService.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create teams API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/teams/route.ts',
      template: 'templates/api-teams-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/teams/[id]/route.ts',
      template: 'templates/api-team-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/teams/[id]/members/route.ts',
      template: 'templates/api-members-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/teams/[id]/invites/route.ts',
      template: 'templates/api-invites-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/teams/[id]/analytics/route.ts',
      template: 'templates/api-analytics-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};

export default blueprint;