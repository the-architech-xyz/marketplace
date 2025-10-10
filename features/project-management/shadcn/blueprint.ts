/**
 * Project Management Frontend Implementation: Shadcn/ui
 * 
 * Complete project management system with kanban boards, task management, and team collaboration
 * Uses template-based component generation for maintainability
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('timeTracking')) {
    actions.push(...generateTimeTrackingActions());
  }
  
  if (config.activeFeatures.includes('ganttView')) {
    actions.push(...generateGanttViewActions());
  }
  
  if (config.activeFeatures.includes('projectReporting')) {
    actions.push(...generateProjectReportingActions());
  }
  
  return actions;
}

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-beautiful-dnd',
        '@types/react-beautiful-dnd',
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'date-fns',
        'lucide-react',
        'recharts'
      ]
    },

    // Core project management components (only existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}projects/ProjectBoard.tsx',
      template: 'templates/ProjectBoard.tsx.tpl',
      context: { 
        features: ['core'],
        hasKanbanBoard: true,
        hasTaskCreation: true,
        hasTaskManagement: true,
        hasProjectOrganization: true,
        hasTeamCollaboration: true,
        hasBasicAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Project management pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}projects/page.tsx',
      template: 'templates/projects-page.tsx.tpl',
      context: { 
        features: ['core'],
        hasKanbanBoard: true,
        hasTaskCreation: true,
        hasTaskManagement: true,
        hasProjectOrganization: true,
        hasTeamCollaboration: true,
        hasBasicAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Project management hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}projects/use-projects.ts',
      template: 'templates/use-projects.ts.tpl',
      context: { 
        features: ['core'],
        hasKanbanBoard: true,
        hasTaskCreation: true,
        hasTaskManagement: true,
        hasProjectOrganization: true,
        hasTeamCollaboration: true,
        hasBasicAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

function generateTimeTrackingActions(): BlueprintAction[] {
  return [
    // TODO: Create time tracking templates when feature is implemented
  ];
}

function generateGanttViewActions(): BlueprintAction[] {
  return [
    // TODO: Create Gantt view templates when feature is implemented
  ];
}

function generateProjectReportingActions(): BlueprintAction[] {
  return [
    // TODO: Create project reporting templates when feature is implemented
  ];
}