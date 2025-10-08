import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'feature:project-management/shadcn',
  name: 'Project Management Feature (Shadcn)',
  description: 'Complete project management UI using Shadcn components',
  version: '1.0.0',
  actions: [
    // Create project board component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}projects/ProjectBoard.tsx',
      template: 'templates/ProjectBoard.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create project hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}hooks/use-projects.ts',
      template: 'templates/use-projects.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create project management page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}projects/page.tsx',
      template: 'templates/projects-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};