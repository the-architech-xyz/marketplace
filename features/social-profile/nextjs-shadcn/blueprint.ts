import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const userProfileNextjsShadcnBlueprint: Blueprint = {
  id: 'user-profile-nextjs-shadcn',
  name: 'User Profile Management (Next.js + Shadcn)',
  description: 'Complete user profile management system with Next.js and Shadcn/ui',
  version: '1.0.0',
  actions: [
    // Create main profile components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/profile/ProfileDashboard.tsx',
      template: 'templates/ProfileDashboard.tsx.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/profile/ProfileForm.tsx',
      template: 'templates/ProfileForm.tsx.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/profile/AvatarUpload.tsx',
      template: 'templates/AvatarUpload.tsx.tpl',
      condition: '{{#if feature.parameters.features.avatarUpload}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/profile/PreferencesSettings.tsx',
      template: 'templates/PreferencesSettings.tsx.tpl',
      condition: '{{#if feature.parameters.features.preferences}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/profile/SecuritySettings.tsx',
      template: 'templates/SecuritySettings.tsx.tpl',
      condition: '{{#if feature.parameters.features.security}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/profile/NotificationSettings.tsx',
      template: 'templates/NotificationSettings.tsx.tpl',
      condition: '{{#if feature.parameters.features.notifications}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/profile/DataExport.tsx',
      template: 'templates/DataExport.tsx.tpl',
      condition: '{{#if feature.parameters.features.exportData}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      },
    },
    // Create profile pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/profile/page.tsx',
      template: 'templates/profile-page.tsx.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/profile/settings/page.tsx',
      template: 'templates/profile-settings-page.tsx.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/profile/security/page.tsx',
      template: 'templates/profile-security-page.tsx.tpl',
      condition: '{{#if feature.parameters.features.security}}',
      conflictResolution: { 
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    // Create profile-specific utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/profile/utils.ts',
      template: 'templates/profile-utils.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/profile/constants.ts',
      template: 'templates/profile-constants.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/features/profile/types.ts',
      template: 'templates/profile-types.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }}
  ]
};

export default userProfileNextjsShadcnBlueprint;
