/**
 * Emailing Frontend Implementation: Shadcn/ui
 * 
 * Complete email management system with composition, templates, and analytics
 * Uses template-based component generation for maintainability
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const emailingShadcnBlueprint: Blueprint = {
  id: 'emailing-frontend-shadcn',
  name: 'Emailing Frontend (Shadcn/ui)',
  description: 'Complete email management system with composition, templates, and analytics',
  actions: [
    // Install core dependencies (no duplicates - handled by core-dependencies)
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'date-fns@^2.30.0',
        'lucide-react@^0.294.0'
      ]
    },

    // Create emailing hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}emailing/hooks.ts',
      template: 'templates/hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create emailing types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}emailing/types.ts',
      template: 'templates/types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create email composer component (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}emailing/EmailComposer.tsx',
      template: 'templates/EmailComposer.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create email list component (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}emailing/EmailList.tsx',
      template: 'templates/EmailList.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create template manager component (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}emailing/TemplateManager.tsx',
      template: 'templates/TemplateManager.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create emailing dashboard page (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}emailing/page.tsx',
      template: 'templates/emailing-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ]
};

export default emailingShadcnBlueprint;