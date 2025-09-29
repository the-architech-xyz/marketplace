/**
 * Invalid Test Genome
 * 
 * A genome with an invalid parameter to test validation.
 */

import { Genome } from '@thearchitech.xyz/marketplace';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'invalid-test',
    description: 'A test app with invalid parameters',
    version: '0.1.0',
    framework: 'nextjs',
    path: './invalid-test'
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
    
    // UI module with invalid component name
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: ['button', 'button', 'card']
    }
    }
  ]
};

export default genome;
