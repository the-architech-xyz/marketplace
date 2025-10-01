import { Blueprint } from '@thearchitech.xyz/types';

const web3ShadcnIntegrationBlueprint: Blueprint = {
  id: 'web3-shadcn-integration',
  name: 'Web3 Shadcn Integration',
  description: 'Beautiful Web3 UI components using Shadcn/ui with modern viem integration for wallet management, transaction display, and blockchain interactions',
  version: '2.0.0',
  actions: [
    // Create Web3 UI Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/WalletCard.tsx',
      template: 'templates/WalletCard.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/TransactionCard.tsx',
      template: 'templates/TransactionCard.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/NetworkSwitcher.tsx',
      template: 'templates/NetworkSwitcher.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/BalanceCard.tsx',
      template: 'templates/BalanceCard.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/Web3Dashboard.tsx',
      template: 'templates/Web3Dashboard.tsx.tpl'
    },
    // Install Web3 Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'viem',
        '@tanstack/react-query',
        'wagmi',
        'lucide-react'
      ],
      isDev: false
    },
    // Add Web3 Hooks
    {
      type: 'ENHANCE_FILE',
      path: 'src/hooks/useWeb3.ts',
      modifier: 'ts-module-enhancer',
      params: {
        importsToAdd: [
          { name: 'useAccount', from: 'wagmi', type: 'import' },
          { name: 'useConnect', from: 'wagmi', type: 'import' },
          { name: 'useDisconnect', from: 'wagmi', type: 'import' },
          { name: 'useNetwork', from: 'wagmi', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `export const useWeb3 = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  return {
    address,
    isConnected,
    chainId: chain?.id,
    connect,
    disconnect,
    connectors
  };
};

export const useBlockNumber = () => {
  const { data: blockNumber } = useBlockNumber();
  return { data: blockNumber };
};`
          }
        ]
      }
    },
    // Add Web3 Provider Setup
    {
      type: 'CREATE_FILE',
      path: 'src/providers/Web3Provider.tsx',
      template: 'templates/Web3Provider.tsx.tpl'
    }
  ]
};

export default web3ShadcnIntegrationBlueprint;