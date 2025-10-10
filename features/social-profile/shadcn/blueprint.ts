/**
 * Social Profile Frontend Implementation: Shadcn/ui
 * 
 * Complete social profile management system with user profiles, settings, and preferences
 * Uses template-based component generation for maintainability
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('socialConnections')) {
    actions.push(...generateSocialConnectionsActions());
  }
  
  if (config.activeFeatures.includes('activityFeeds')) {
    actions.push(...generateActivityFeedsActions());
  }
  
  if (config.activeFeatures.includes('notifications')) {
    actions.push(...generateNotificationsActions());
  }
  
  if (config.activeFeatures.includes('privacyControls')) {
    actions.push(...generatePrivacyControlsActions());
  }
  
  if (config.activeFeatures.includes('socialSettings')) {
    actions.push(...generateSocialSettingsActions());
  }
  
  if (config.activeFeatures.includes('avatarUpload')) {
    actions.push(...generateAvatarUploadActions());
  }
  
  if (config.activeFeatures.includes('blocking')) {
    actions.push(...generateBlockingActions());
  }
  
  if (config.activeFeatures.includes('reporting')) {
    actions.push(...generateReportingActions());
  }
  
  return actions;
}

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'date-fns',
        'lucide-react',
        'recharts',
        'react-dropzone',
        'file-type'
      ]
    },

    // Core profile components (only existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}profile/ProfileDashboard.tsx',
      template: 'templates/ProfileDashboard.tsx.tpl',
      context: { 
        features: ['core'],
        hasProfileManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}profile/ProfileForm.tsx',
      template: 'templates/ProfileForm.tsx.tpl',
      context: { 
        features: ['core'],
        hasProfileManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}profile/AvatarUpload.tsx',
      template: 'templates/AvatarUpload.tsx.tpl',
      context: { 
        features: ['core'],
        hasProfileManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Profile pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}profile/page.tsx',
      template: 'templates/profile-page.tsx.tpl',
      context: { 
        features: ['core'],
        hasProfileManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}profile/settings/page.tsx',
      template: 'templates/profile-settings-page.tsx.tpl',
      context: { 
        features: ['core'],
        hasProfileManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}profile/security/page.tsx',
      template: 'templates/profile-security-page.tsx.tpl',
      context: { 
        features: ['core'],
        hasProfileManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Profile utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}profile/profile-types.ts',
      template: 'templates/profile-types.ts.tpl',
      context: { 
        features: ['core'],
        hasProfileManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}profile/profile-utils.ts',
      template: 'templates/profile-utils.ts.tpl',
      context: { 
        features: ['core'],
        hasProfileManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}profile/profile-constants.ts',
      template: 'templates/profile-constants.ts.tpl',
      context: { 
        features: ['core'],
        hasProfileManagement: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

function generateSocialConnectionsActions(): BlueprintAction[] {
  return [
    // TODO: Create social connections templates when feature is implemented
  ];
}

function generateActivityFeedsActions(): BlueprintAction[] {
  return [
    // TODO: Create activity feeds templates when feature is implemented
  ];
}

function generateNotificationsActions(): BlueprintAction[] {
  return [
    // TODO: Create notifications templates when feature is implemented
  ];
}

function generatePrivacyControlsActions(): BlueprintAction[] {
  return [
    // TODO: Create privacy controls templates when feature is implemented
  ];
}

function generateSocialSettingsActions(): BlueprintAction[] {
  return [
    // TODO: Create social settings templates when feature is implemented
  ];
}

function generateAvatarUploadActions(): BlueprintAction[] {
  return [
    // Avatar upload is already included in core actions
  ];
}

function generateBlockingActions(): BlueprintAction[] {
  return [
    // TODO: Create blocking templates when feature is implemented
  ];
}

function generateReportingActions(): BlueprintAction[] {
  return [
    // TODO: Create reporting templates when feature is implemented
  ];
}