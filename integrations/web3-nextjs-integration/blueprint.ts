import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'web3-nextjs-integration',
  name: 'Web3 Next.js Integration',
  description: 'Modern Web3 integration for Next.js using viem with standardized TanStack Query hooks',
  version: '3.0.0',
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
    
    // Create standardized Web3 hooks (REVOLUTIONARY!)
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-web3.ts',
      template: 'templates/use-web3.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-connect.ts',
      template: 'templates/use-connect.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-disconnect.ts',
      template: 'templates/use-disconnect.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-balance.ts',
      template: 'templates/use-balance.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-transaction.ts',
      template: 'templates/use-transaction.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-network.ts',
      template: 'templates/use-network.ts.tpl'
    },
    // Create Web3 API service layer
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/api.ts',
      template: 'templates/web3-api.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/types.ts',
      template: 'templates/web3-types.ts.tpl'
    },
    // Create modern Web3 configuration
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/config.ts', 
      template: 'templates/config.ts.tpl'
    },
    // Create modern Web3 core utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/core.ts',
      template: 'templates/core.ts.tpl'
    },
    // Create modern React hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useWeb3.ts',
      template: 'templates/useWeb3.ts.tpl'
    },
    // Create API route for balance
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/web3/balance/route.ts',
      template: 'templates/route.ts.tpl'
    },
    // Create middleware
    {
      type: 'CREATE_FILE',
      path: 'src/middleware.ts',
      template: 'templates/middleware.ts.tpl'
    }
  ]
};
