import { Blueprint } from '@thearchitech.xyz/types';

const zustandNextjsIntegrationBlueprint: Blueprint = {
  id: 'zustand-nextjs-integration',
  name: 'Zustand Next.js Integration',
  description: 'State management with Zustand for Next.js applications with SSR support and hydration',
  version: '1.0.0',
  actions: [
    // Create Zustand Stores
    {
      type: 'CREATE_FILE',
      path: 'src/stores/auth-store.ts',
      template: 'auth-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/stores/ui-store.ts',
      template: 'ui-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/stores/data-store.ts',
      template: 'data-store.ts.tpl'
    },
    // Create SSR Utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/ssr-store.ts',
      template: 'ssr-store.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/hydration.ts',
      template: 'hydration.ts.tpl'
    },
    // Install Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'zustand',
        'immer',
        'js-cookie'
      ],
      dev: false
    }
  ]
};

export default zustandNextjsIntegrationBlueprint;