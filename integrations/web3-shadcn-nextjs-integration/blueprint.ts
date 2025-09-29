import { Blueprint } from '@thearchitech.xyz/types';

const web3ShadcnNextjsIntegrationBlueprint: Blueprint = {
  id: 'web3-shadcn-nextjs-integration',
  name: 'Web3 Shadcn Next.js Integration',
  description: 'Complete Web3 stack with Next.js and Shadcn/ui for modern blockchain applications',
  version: '1.0.0',
  actions: [
    // Create Web3 Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/WalletCard.tsx',
      template: 'WalletCard.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/TransactionCard.tsx',
      template: 'TransactionCard.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/NetworkSwitcher.tsx',
      template: 'NetworkSwitcher.tsx.tpl'
    },
    // Create Next.js API Routes
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/web3/balance/route.ts',
      template: 'balance-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/web3/transaction/route.ts',
      template: 'transaction-route.ts.tpl'
    },
    // Install Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'viem',
        'wagmi',
        '@tanstack/react-query',
        'lucide-react'
      ],
    }
  ]
};

export default web3ShadcnNextjsIntegrationBlueprint;