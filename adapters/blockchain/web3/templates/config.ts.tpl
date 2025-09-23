import { defineChain, type Chain } from 'viem';
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
};
    },
