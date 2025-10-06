import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const projectKanbanNextjsShadcnBlueprint: Blueprint = {
  id: 'project-kanban-nextjs-shadcn',
  name: 'Project Kanban Board (Next.js + Shadcn)',
  description: 'Complete project management with Kanban board using Next.js and Shadcn/ui',
  version: '1.0.0',
  actions: [
    // Create main Kanban components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/kanban/KanbanBoard.tsx',
      template: 'templates/KanbanBoard.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/kanban/KanbanColumn.tsx',
      template: 'templates/KanbanColumn.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/kanban/KanbanCard.tsx',
      template: 'templates/KanbanCard.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/kanban/TaskForm.tsx',
      template: 'templates/TaskForm.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/kanban/ProjectSelector.tsx',
      template: 'templates/ProjectSelector.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/kanban/TaskFilters.tsx',
      template: 'templates/TaskFilters.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/kanban/AssigneeSelector.tsx',
      template: 'templates/AssigneeSelector.tsx.tpl',
      condition: '{{#if feature.parameters.features.assignees}}'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/kanban/LabelSelector.tsx',
      template: 'templates/LabelSelector.tsx.tpl',
      condition: '{{#if feature.parameters.features.labels}}'
    },
    // Create Kanban pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/kanban/page.tsx',
      template: 'templates/kanban-page.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/kanban/[projectId]/page.tsx',
      template: 'templates/project-kanban-page.tsx.tpl'
    },
    // Create project-specific utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/kanban/utils.ts',
      template: 'templates/kanban-utils.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/kanban/constants.ts',
      template: 'templates/kanban-constants.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/kanban/types.ts',
      template: 'templates/kanban-types.ts.tpl'
    }
  ]
};

export default projectKanbanNextjsShadcnBlueprint;
