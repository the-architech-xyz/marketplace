/**
 * Web3 Shadcn Integration
 * 
 * Beautiful Web3 UI components using Shadcn/ui with modern viem integration for wallet management, transaction display, and blockchain interactions
 */

export interface Web3ShadcnIntegrationParams {

  /** Modern Web3 library with type safety and performance */
  viemIntegration: boolean;

  /** Beautiful wallet management UI components with Shadcn/ui */
  walletComponents: boolean;

  /** Transaction display and management components */
  transactionComponents: boolean;

  /** Network switching and display components */
  networkComponents: boolean;

  /** Balance display and management components */
  balanceComponents: boolean;

  /** Complete Web3 dashboard with all components */
  dashboardComponents: boolean;

  /** Data fetching, caching, and synchronization for Web3 data */
  reactQuery: boolean;

  /** Full TypeScript support with strict type checking */
  typeScript: boolean;

  /** WCAG AA compliant components with proper ARIA labels */
  accessibility: boolean;

  /** Dark mode and custom theme support */
  theming: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const Web3ShadcnIntegrationArtifacts: {
  creates: [
    'src/components/web3/WalletCard.tsx',
    'src/components/web3/TransactionCard.tsx',
    'src/components/web3/NetworkSwitcher.tsx',
    'src/components/web3/BalanceCard.tsx',
    'src/components/web3/Web3Dashboard.tsx',
    'src/providers/Web3Provider.tsx'
  ],
  enhances: [
    { path: 'src/hooks/useWeb3.ts' }
  ],
  installs: [
    { packages: ['viem', '@tanstack/react-query', 'wagmi', 'lucide-react'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type Web3ShadcnIntegrationCreates = typeof Web3ShadcnIntegrationArtifacts.creates[number];
export type Web3ShadcnIntegrationEnhances = typeof Web3ShadcnIntegrationArtifacts.enhances[number];
