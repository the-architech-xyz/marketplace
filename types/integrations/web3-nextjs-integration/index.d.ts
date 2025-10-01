/**
 * Web3 Next.js Integration
 * 
 * Modern Web3 integration for Next.js using viem with React Query, TypeScript, and Next.js optimizations
 */

export interface Web3NextjsIntegrationParams {

  /** Modern Web3 library with type safety and performance */
  viemIntegration: boolean;

  /** Data fetching, caching, and synchronization for Web3 data */
  reactQuery: boolean;

  /** Full TypeScript support with strict type checking */
  typeScript: boolean;

  /** Connect to various Web3 wallets (MetaMask, WalletConnect, etc.) */
  walletConnection: boolean;

  /** Smart contract interaction with type safety */
  smartContracts: boolean;

  /** Transaction management and status tracking */
  transactions: boolean;

  /** Switch between different blockchain networks */
  networkSwitching: boolean;

  /** Next.js API routes for Web3 operations */
  apiRoutes: boolean;

  /** Web3 security middleware for Next.js */
  middleware: boolean;

  /** Comprehensive error handling with custom error classes */
  errorHandling: boolean;

  /** Zod schema validation for Web3 data */
  validation: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const Web3NextjsIntegrationArtifacts: {
  creates: [
    'src/lib/web3/config.ts',
    'src/lib/web3/core.ts',
    'src/hooks/useWeb3.ts',
    'src/app/api/web3/balance/route.ts',
    'src/middleware.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['viem', '@tanstack/react-query', 'zod', '@tanstack/react-query-devtools'], isDev: false },
    { packages: ['@types/node'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type Web3NextjsIntegrationCreates = typeof Web3NextjsIntegrationArtifacts.creates[number];
export type Web3NextjsIntegrationEnhances = typeof Web3NextjsIntegrationArtifacts.enhances[number];
