/**
 * Viem Ethereum Integration
 * 
 * Modern, type-safe Web3 integration using viem for Ethereum blockchain interactions
 */

export interface BlockchainWeb3Params {

  /** Supported blockchain networks */
  networks: string[];

  /** Enable WalletConnect support */
  walletConnect?: boolean;

  /** Smart contract addresses */
  contracts?: string[];
}

export interface BlockchainWeb3Features {}

// 🚀 Auto-discovered artifacts
export declare const BlockchainWeb3Artifacts: {
  creates: [
    'src/lib/web3/config.ts',
    'src/lib/web3/core.ts',
    'src/hooks/useWeb3.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['viem@^2.0.0', '@tanstack/react-query@^5.0.0', 'zod@^3.22.0'], isDev: false },
    { packages: ['@types/node@^20.0.0'], isDev: true }
  ],
  envVars: [
    { key: 'CHAIN_ID', value: '1', description: 'Default blockchain chain ID' },
    { key: 'MAINNET_RPC_URL', value: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID', description: 'Ethereum mainnet RPC URL' },
    { key: 'SEPOLIA_RPC_URL', value: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID', description: 'Sepolia testnet RPC URL' },
    { key: 'POLYGON_RPC_URL', value: 'https://polygon-rpc.com', description: 'Polygon network RPC URL' },
    { key: 'ARBITRUM_RPC_URL', value: 'https://arb1.arbitrum.io/rpc', description: 'Arbitrum One RPC URL' }
  ]
};

// Type-safe artifact access
export type BlockchainWeb3Creates = typeof BlockchainWeb3Artifacts.creates[number];
export type BlockchainWeb3Enhances = typeof BlockchainWeb3Artifacts.enhances[number];
