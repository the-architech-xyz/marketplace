/**
 * Type Error Test Genome
 * 
 * A genome with a type error to test validation.
 */

import { Genome } from '@thearchitech.xyz/marketplace/types';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'type-error',
    description: 'A test app with type errors',
    version: '0.1.0',
    framework: 'nextjs',
    path: './type-error'
  },
  modules: [
    // Framework module first (required)
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: 123, // Should be boolean, not number
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
