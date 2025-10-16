/**
 * Teams Management Frontend Implementation: Shadcn/ui
 * 
 * Complete teams management system with team creation, member management, and collaboration
 * Uses template-based component generation for maintainability
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/teams-management/frontend/shadcn'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (features.advanced) {
    actions.push(...generateAdvancedActions());
  }
  
  if (features.analytics) {
    actions.push(...generateAnalyticsActions());
  }
  
  if (features.billing) {
    actions.push(...generateBillingActions());
  }
  
  return actions;
}

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'date-fns@^2.30.0',
        'lucide-react@^0.294.0',
        'react-hook-form',
        '@hookform/resolvers'
      ]
    },

    // Core Team Pages (only existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/teams/page.tsx',
      template: 'templates/teams-page.tsx.tpl',
      context: { 
        features: ['core'],
        hasTeamManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Core Team Components (only existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/TeamsList.tsx',
      template: 'templates/TeamsList.tsx.tpl',
      context: { 
        features: ['core'],
        hasTeamManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/CreateTeamForm.tsx',
      template: 'templates/CreateTeamForm.tsx.tpl',
      context: { 
        features: ['core'],
        hasTeamManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/MemberManagement.tsx',
      template: 'templates/MemberManagement.tsx.tpl',
      context: { 
        features: ['core'],
        hasTeamManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/TeamSettings.tsx',
      template: 'templates/TeamSettings.tsx.tpl',
      context: { 
        features: ['core'],
        hasTeamManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/TeamsDashboard.tsx',
      template: 'templates/TeamsDashboard.tsx.tpl',
      context: { 
        features: ['core'],
        hasTeamManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },


  ];
}

function generateAdvancedActions(): BlueprintAction[] {
  return [
    // Note: These templates don't exist yet, so we'll comment them out
    // TODO: Create these templates when advanced team features are implemented
    /*
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}(dashboard)/teams/settings/page.tsx',
      template: 'templates/team-settings-page.tsx.tpl',
      context: { 
        features: ['advanced'],
        hasAdvancedTeams: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
    */
  ];
}

function generateAnalyticsActions(): BlueprintAction[] {
  return [
    // Note: These templates don't exist yet, so we'll comment them out
    // TODO: Create these templates when team analytics features are implemented
    /*
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/TeamMetrics.tsx',
      template: 'templates/TeamMetrics.tsx.tpl',
      context: { 
        features: ['analytics'],
        hasTeamAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
    */
  ];
}

function generateBillingActions(): BlueprintAction[] {
  return [
    // Note: These templates don't exist yet, so we'll comment them out
    // TODO: Create these templates when team billing features are implemented
    /*
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}teams/BillingDashboard.tsx',
      template: 'templates/BillingDashboard.tsx.tpl',
      context: { 
        features: ['billing'],
        hasTeamBilling: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
    */
  ];
}