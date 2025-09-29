/**
 * Minimal Test Genome
 * 
 * A minimal but complete genome for testing parameter validation.
 */

import { Genome } from '@thearchitech.xyz/marketplace/types';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'min-test',
    description: 'A minimal test app',
    version: '0.1.0',
    framework: 'nextjs',
    path: './min-test'
  },
  modules: [
    // Framework module first (required)
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        appRouter: true,
        srcDir: true,
        importAlias: '@/*'
      }
    },
    
    // UI module
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: ['button', 'card'],
        theme: 'dark',
        darkMode: true
      }
    }
  ]
};

export default genome;
