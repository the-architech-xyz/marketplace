/**
 * Vitest Testing Blueprint
 * 
 * Sets up Vitest testing framework with coverage
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const vitestBlueprint: Blueprint = {
  id: 'vitest-base-setup',
  name: 'Vitest Base Setup',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['vitest', '@vitejs/plugin-react', 'jsdom', '@testing-library/react', '@testing-library/jest-dom', '@testing-library/user-event', '@types/react', '@types/react-dom'],
      isDev: true
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.config.ts',
      template: 'templates/vitest.config.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/setup/setup.ts',
      template: 'templates/setup.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/setup/utils.tsx',
      template: 'templates/utils.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/example.test.tsx',
      template: 'templates/example.test.tsx.tpl'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'test',
      command: 'vitest'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'test:run',
      command: 'vitest run'
    }
  ]
};
