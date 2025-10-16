/**
 * WEB3 / DAPP STARTER
 * 
 * A complete Web3 application with wallet connection, blockchain interaction,
 * and decentralized identity. Perfect for DeFi, NFT platforms, or DAO tools.
 * 
 * Stack: Next.js + Web3 + Blockchain + Shadcn UI
 * Pattern: Decentralized-first with optional centralized features
 * Use Case: DeFi platforms, NFT marketplaces, DAO dashboards, Web3 social
 */

import { defineGenome } from '@thearchitech.xyz/marketplace/types';

export default defineGenome({
  version: '1.0.0',
  project: {
    name: 'web3-dapp',
    framework: 'nextjs',
    path: './web3-app',
    description: 'Web3 dApp with wallet connect, blockchain integration, and decentralized identity',
  },
  
  modules: [
    // ============================================================================
    // FOUNDATION
    // ============================================================================

    // Framework
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        appRouter: true,
        srcDir: true,
        importAlias: '@',
      },
    },

    // UI
    {
      id: 'ui/shadcn-ui',
      parameters: {
        theme: 'default',
        components: [
          'button', 'card', 'dialog', 'dropdown-menu',
          'tabs', 'table', 'badge', 'avatar',
          'sonner', 'alert'
        ],
      },
    },

    // State Management (for blockchain state)
    {
      id: 'state/zustand',
      parameters: {
        persistence: true,      // Persist wallet connection
        devtools: true,
        immer: true,
      },
    },

    // ============================================================================
    // WEB3 CAPABILITIES
    // ============================================================================

    // Web3 Integration
    {
      id: 'blockchain/web3',
      parameters: {
        networks: ['ethereum', 'polygon', 'optimism', 'base'],
        features: {
          walletConnect: true,    // Connect wallet (MetaMask, Rainbow, etc.)
          smartContracts: true,   // Interact with contracts
          transactions: true,     // Send transactions
          events: true,           // Listen to blockchain events
          ens: true,              // ENS name resolution
        },
      },
    },

    // Web3 Features
    {
      id: 'features/web3/shadcn',
      parameters: {
        features: {
          walletConnect: true,
          networkSwitch: true,
          transactionHistory: true,
          tokenBalances: true,
          nftGallery: true,
        },
      },
    },


    // ============================================================================
    // OPTIONAL: CENTRALIZED FEATURES (FOR HYBRID dAPP)
    // ============================================================================

    // Database (for off-chain data, caching)
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',
        databaseType: 'postgresql',
        features: {
          migrations: true,
          relations: true,
        },
      },
    },

    // Data Fetching (for blockchain indexing)
    {
      id: 'data-fetching/tanstack-query',
      parameters: {
        devtools: true,
        suspense: true,
      },
    },

    // Optional: Centralized Auth (for hybrid apps)
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['email'],
        session: 'jwt',
        csrf: true,
      },
    },

    // ============================================================================
    // DEVELOPER EXPERIENCE
    // ============================================================================

    // Monitoring (blockchain errors can be tricky)
    {
      id: 'observability/sentry',
      parameters: {
        features: {
          errorTracking: true,
          performance: true,
        },
      },
    },

    // Testing (for smart contract interactions)
    {
      id: 'testing/vitest',
      parameters: {
        features: {
          unitTests: true,
          e2e: true,         // Test wallet connections
        },
      },
    },

    // Quality
    {
      id: 'quality/prettier',
      parameters: {
        tailwind: true,
      },
    },
  ],
});

