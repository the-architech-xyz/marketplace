/**
 * Zustand State Management Blueprint
 * 
 * Golden Core state management adapter with Zustand
 * Provides powerful, performant, and minimal boilerplate state management
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const zustandBlueprint: Blueprint = {
  id: 'zustand-golden-core-setup',
  name: 'Zustand Golden Core Setup',
  description: 'Complete Zustand setup with best practices, TypeScript support, and persistence',
  version: '4.4.0',
  actions: [
    // Install Zustand and related packages
    {
      type: 'INSTALL_PACKAGES',
      packages: ['zustand']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['immer'],
      condition: '{{#if module.parameters.immer}}'
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['zustand/middleware'],
      condition: '{{#if module.parameters.middleware}}'
    },
    // Create core store utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/stores/create-store.ts',
      template: 'templates/create-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/stores/store-types.ts',
      template: 'templates/store-types.ts.tpl'
    },
    // Create app store
    {
      type: 'CREATE_FILE',
      path: 'src/stores/use-app-store.ts',
      template: 'templates/use-app-store.ts.tpl'
    },
    // Create feature stores
    {
      type: 'CREATE_FILE',
      path: 'src/stores/use-ui-store.ts',
      template: 'templates/use-ui-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/stores/use-auth-store.ts',
      template: 'templates/use-auth-store.ts.tpl'
    },
    // Create persistence utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/stores/persistence.ts',
      template: 'templates/persistence.ts.tpl',
      condition: '{{#if module.parameters.persistence}}'
    },
    // Create middleware utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/stores/middleware.ts',
      template: 'templates/middleware.ts.tpl',
      condition: '{{#if module.parameters.middleware}}'
    },
    // Create store hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-store.ts',
      template: 'templates/use-store.ts.tpl'
    },
    // Create store provider
    {
      type: 'CREATE_FILE',
      path: 'src/providers/StoreProvider.tsx',
      template: 'templates/StoreProvider.tsx.tpl'
    },
    // Create store index
    {
      type: 'CREATE_FILE',
      path: 'src/stores/index.ts',
      template: 'templates/index.ts.tpl'
    }
  ]
};
