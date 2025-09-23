import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'web3-nextjs-integration',
  name: 'Web3 Next.js Integration',
  description: 'Modern Web3 integration for Next.js using viem with React Query and TypeScript',
  version: '2.0.0',
  actions: [
    // Install modern Web3 dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: ['viem', '@tanstack/react-query', 'zod', '@tanstack/react-query-devtools']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@types/node'],
      isDev: true
    },
    // Create modern Web3 configuration
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/config.ts',
      template: 'integrations/web3-nextjs-integration/templates/config.ts.tpl'
    },
    // Create modern Web3 core utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/core.ts',
      template: 'integrations/web3-nextjs-integration/templates/core.ts.tpl'
    },
    // Create modern React hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useWeb3.ts',
      template: 'integrations/web3-nextjs-integration/templates/useWeb3.ts.tpl'
    },
    // Create API route for balance
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/web3/balance/route.ts',
      template: 'integrations/web3-nextjs-integration/templates/route.ts.tpl'
    },
    // Create middleware
    {
      type: 'CREATE_FILE',
      path: 'src/middleware.ts',
      template: 'integrations/web3-nextjs-integration/templates/middleware.ts.tpl'
    }
  ]
};
