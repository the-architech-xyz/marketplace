/**
 * Zustand State Management Blueprint
 * 
 * Golden Core state management adapter with Zustand
 * Provides powerful, performant, and minimal boilerplate state management
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const zustandBlueprint: Blueprint = {
  id: 'zustand-golden-core-setup',
  name: 'Zustand Golden Core Setup',
  description: 'Complete Zustand setup with best practices, TypeScript support, and persistence',
  version: '4.4.0',
  actions: [
    // Install Zustand and related packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['zustand']
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['immer'],
      condition: '{{#if module.parameters.immer}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['zustand/middleware'],
      condition: '{{#if module.parameters.middleware}}'
    },
    // Create core store utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}stores/create-store.ts',
      template: 'templates/create-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}stores/store-types.ts',
      template: 'templates/store-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create app store
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}use-app-store.ts',
      template: 'templates/use-app-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create feature stores
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}use-ui-store.ts',
      template: 'templates/use-ui-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}use-auth-store.ts',
      template: 'templates/use-auth-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create persistence utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}stores/persistence.ts',
      template: 'templates/persistence.ts.tpl',
      condition: '{{#if module.parameters.persistence}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},

    // Create middleware utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}stores/middleware.ts',
      template: 'templates/middleware.ts.tpl',
      condition: '{{#if module.parameters.middleware}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},

    // Create store hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-store.ts',
      template: 'templates/use-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create store provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/providers/StoreProvider.tsx',
      template: 'templates/StoreProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create store index
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.stores}}index.ts',
      template: 'templates/index.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }}
  ]
};
