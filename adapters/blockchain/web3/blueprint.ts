/**
 * Viem Blockchain Integration Blueprint - Minimal Base
 * 
 * Modern Web3 integration using viem for Ethereum blockchain interactions
 * Provides core utilities, configuration, and type-safe foundation
 * Advanced features are available through optional features
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const web3Blueprint: Blueprint = {
  id: 'web3-base-setup',
  name: 'Viem Base Setup',
  description: 'Core Web3 utilities and configuration using viem',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['viem@^2.0.0', '@tanstack/react-query@^5.0.0', 'zod@^3.22.0']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@types/node@^20.0.0'],
      isDev: true
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/config.ts',
      content: `import { defineChain, type Chain } from 'viem';
import { z } from 'zod';

// Network configuration schema for validation
const NetworkConfigSchema = z.object({
  id: z.number(),
  name: z.string(),
  rpcUrl: z.string().url(),
  blockExplorer: z.string().url(),
  nativeCurrency: z.object({
    name: z.string(),
    symbol: z.string(),
    decimals: z.number(),
  }),
});

export type NetworkConfig = z.infer<typeof NetworkConfigSchema>;

// Supported networks configuration
export const NETWORKS = {
  mainnet: defineChain({
    id: 1,
    name: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: [process.env.MAINNET_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'] },
      public: { http: ['https://cloudflare-eth.com'] },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://etherscan.io' },
    },
  }),
  sepolia: defineChain({
    id: 11155111,
    name: 'Sepolia',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: [process.env.SEPOLIA_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID'] },
      public: { http: ['https://rpc.sepolia.org'] },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
    },
    testnet: true,
  }),
  polygon: defineChain({
    id: 137,
    name: 'Polygon',
    nativeCurrency: { name: 'Polygon', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
      default: { http: [process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com'] },
      public: { http: ['https://polygon-rpc.com'] },
    },
    blockExplorers: {
      default: { name: 'PolygonScan', url: 'https://polygonscan.com' },
    },
  }),
  arbitrum: defineChain({
    id: 42161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: [process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc'] },
      public: { http: ['https://arb1.arbitrum.io/rpc'] },
    },
    blockExplorers: {
      default: { name: 'Arbiscan', url: 'https://arbiscan.io' },
    },
  }),
} as const;

export type SupportedChain = keyof typeof NETWORKS;

// Get current network configuration
export const getCurrentNetwork = (): Chain => {
  const chainId = parseInt(process.env.CHAIN_ID || '1');
  const network = Object.values(NETWORKS).find(network => network.id === chainId);
  return network || NETWORKS.mainnet;
};

// Network validation utility
export const validateNetwork = (config: unknown): NetworkConfig => {
  return NetworkConfigSchema.parse(config);
};

// Get supported networks
export const getSupportedNetworks = (): Chain[] => {
  return Object.values(NETWORKS);
};

// Check if chain is supported
export const isChainSupported = (chainId: number): boolean => {
  return Object.values(NETWORKS).some(network => network.id === chainId);
};

// Get network by chain ID
export const getNetworkByChainId = (chainId: number): Chain | undefined => {
  return Object.values(NETWORKS).find(network => network.id === chainId);
};`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/core.ts',
      content: `import { 
  createPublicClient, 
  http, 
  type Address, 
  type Hash, 
  type PublicClient,
  formatEther,
  parseEther,
  isAddress,
  isHex
} from 'viem';
import { z } from 'zod';
import { NETWORKS, getCurrentNetwork, type SupportedChain } from './config';

// Error handling with custom error types
export class Web3Error extends Error {
  constructor(
    message: string,
    public code: string,
    public cause?: Error
  ) {
    super(message);
    this.name = 'Web3Error';
  }
}

// Validation schemas
const AddressSchema = z.string().refine(isAddress, 'Invalid Ethereum address');
const HashSchema = z.string().refine(isHex, 'Invalid hex string');

// Core Web3 utilities class - Minimal base implementation
export class Web3Core {
  private publicClient: PublicClient;
  private currentChain: SupportedChain;

  constructor(chainId?: number) {
    const chain = chainId ? Object.values(NETWORKS).find(network => network.id === chainId) : getCurrentNetwork();
    if (!chain) {
      throw new Web3Error(\`Unsupported chain ID: \${chainId}\`, 'UNSUPPORTED_CHAIN');
    }
    
    this.currentChain = Object.keys(NETWORKS).find(key => NETWORKS[key as SupportedChain].id === chain.id) as SupportedChain;
    this.publicClient = createPublicClient({
      chain,
      transport: http(chain.rpcUrls.default.http[0], {
        retryCount: 3,
        retryDelay: 1000,
      }),
    });
  }

  // Get balance
  async getBalance(address: Address): Promise<string> {
    try {
      const balance = await this.publicClient.getBalance({ address });
      return formatEther(balance);
    } catch (error) {
      throw new Web3Error('Failed to get balance', 'BALANCE_ERROR', error as Error);
    }
  }

  // Get block number
  async getBlockNumber(): Promise<bigint> {
    try {
      return await this.publicClient.getBlockNumber();
    } catch (error) {
      throw new Web3Error('Failed to get block number', 'BLOCK_ERROR', error as Error);
    }
  }

  // Get gas price
  async getGasPrice(): Promise<bigint> {
    try {
      return await this.publicClient.getGasPrice();
    } catch (error) {
      throw new Web3Error('Failed to get gas price', 'GAS_ERROR', error as Error);
    }
  }

  // Get block by number
  async getBlock(blockNumber: bigint) {
    try {
      return await this.publicClient.getBlock({ blockNumber });
    } catch (error) {
      throw new Web3Error('Failed to get block', 'BLOCK_ERROR', error as Error);
    }
  }

  // Get transaction by hash
  async getTransaction(hash: Hash) {
    try {
      return await this.publicClient.getTransaction({ hash });
    } catch (error) {
      throw new Web3Error('Failed to get transaction', 'TRANSACTION_ERROR', error as Error);
    }
  }

  // Utility functions
  formatEther(value: bigint): string {
    return formatEther(value);
  }

  parseEther(value: string): bigint {
    return parseEther(value);
  }

  // Validate address
  validateAddress(address: string): boolean {
    return AddressSchema.safeParse(address).success;
  }

  // Validate hash
  validateHash(hash: string): boolean {
    return HashSchema.safeParse(hash).success;
  }

  // Get current chain info
  getCurrentChain() {
    return NETWORKS[this.currentChain];
  }

  // Get public client for advanced operations
  getPublicClient(): PublicClient {
    return this.publicClient;
  }
}

// Export singleton instance
export const web3Core = new Web3Core();

// Type exports
export type { Address, Hash, PublicClient };
export type { SupportedChain } from './config';`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useWeb3.ts',
      content: `import { useQuery } from '@tanstack/react-query';
import { web3Core, Web3Error, type Address, type Hash } from '@/lib/web3/core';
import { NETWORKS, type SupportedChain } from '@/lib/web3/config';

// Hook for balance query
export function useBalance(address: Address | null) {
  return useQuery({
    queryKey: ['balance', address],
    queryFn: async () => {
      if (!address) return null;
      return await web3Core.getBalance(address);
    },
    enabled: !!address,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    retryDelay: 1000,
  });
}

// Hook for block number query
export function useBlockNumber() {
  return useQuery({
    queryKey: ['blockNumber'],
    queryFn: async () => {
      return await web3Core.getBlockNumber();
    },
    refetchInterval: 12000, // Refetch every 12 seconds
    retry: 3,
    retryDelay: 1000,
  });
}

// Hook for gas price query
export function useGasPrice() {
  return useQuery({
    queryKey: ['gasPrice'],
    queryFn: async () => {
      return await web3Core.getGasPrice();
    },
    refetchInterval: 60000, // Refetch every minute
    retry: 3,
    retryDelay: 1000,
  });
}

// Hook for block query
export function useBlock(blockNumber: bigint | null) {
  return useQuery({
    queryKey: ['block', blockNumber],
    queryFn: async () => {
      if (!blockNumber) return null;
      return await web3Core.getBlock(blockNumber);
    },
    enabled: !!blockNumber,
    retry: 3,
    retryDelay: 1000,
  });
}

// Hook for transaction query
export function useTransaction(hash: Hash | null) {
  return useQuery({
    queryKey: ['transaction', hash],
    queryFn: async () => {
      if (!hash) return null;
      return await web3Core.getTransaction(hash);
    },
    enabled: !!hash,
    retry: 3,
    retryDelay: 1000,
  });
}

// Hook for current chain info
export function useCurrentChain() {
  return useQuery({
    queryKey: ['currentChain'],
    queryFn: async () => {
      return web3Core.getCurrentChain();
    },
    staleTime: Infinity, // Chain info doesn't change during session
  });
}

// Hook for supported networks
export function useSupportedNetworks() {
  return useQuery({
    queryKey: ['supportedNetworks'],
    queryFn: async () => {
      return NETWORKS;
    },
    staleTime: Infinity, // Networks don't change
  });
}

// Type exports
export type { Address, Hash };
export type { SupportedChain } from '@/lib/web3/config';`
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'CHAIN_ID',
      value: '1',
      description: 'Default chain ID (1 for Ethereum mainnet)'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'MAINNET_RPC_URL',
      value: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
      description: 'Ethereum mainnet RPC URL'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'SEPOLIA_RPC_URL',
      value: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
      description: 'Ethereum Sepolia testnet RPC URL'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'POLYGON_RPC_URL',
      value: 'https://polygon-rpc.com',
      description: 'Polygon network RPC URL'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'ARBITRUM_RPC_URL',
      value: 'https://arb1.arbitrum.io/rpc',
      description: 'Arbitrum One RPC URL'
    }
  ]
};
