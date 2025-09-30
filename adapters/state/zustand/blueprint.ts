/**
 * Zustand State Management Blueprint
 * 
 * Sets up Zustand for global state management
 * Creates stores, hooks, and state persistence
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const zustandBlueprint: Blueprint = {
  id: 'zustand-base-setup',
  name: 'Zustand Base Setup',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['zustand']
    },
    {
      type: 'CREATE_FILE',
      path: '{{paths.state_config}}/use-app-store.ts',
      template: 'templates/use-app-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',  
      path: '{{paths.state_config}}/index.ts',
      template: 'templates/index.ts.tpl'
    }
  ]
};
