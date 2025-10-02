/**
 * Web3 Types
 * 
 * TypeScript types for Web3 integration
 * Provides type safety for all blockchain operations
 */

// Configuration Types
export interface Web3Config {
  rpcUrl: string;
  chainId: number;
  networkName: string;
  blockExplorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  supportedWallets: string[];
  features: string[];
}

export interface Web3Status {
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;
  walletType?: string;
  chainId?: number;
  account?: string;
  error?: string;
}

export interface WalletInfo {
  address: string;
  chainId: number;
  walletType: string;
  balance: string;
  ensName?: string;
  avatar?: string;
  isConnected: boolean;
  connectedAt: string;
}

// Connection Types
export interface ConnectOptions {
  chainId?: number;
  autoConnect?: boolean;
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

// Balance Types
export interface Balance {
  address: string;
  balance: string;
  formatted: string;
  symbol: string;
  decimals: number;
  chainId: number;
  timestamp: string;
}

export interface TokenBalance {
  address: string;
  tokenAddress: string;
  balance: string;
  formatted: string;
  symbol: string;
  name: string;
  decimals: number;
  price?: number;
  value?: number;
  chainId: number;
  timestamp: string;
}

export interface BalanceFilter {
  tokens?: string[];
  minValue?: number;
  maxValue?: number;
  includeZero?: boolean;
}

// Transaction Types
export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  chainId: number;
  data?: string;
  nonce: number;
}

export interface TransactionOptions {
  to: string;
  value?: string;
  data?: string;
  gasLimit?: string;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  nonce?: number;
}

// Network Types
export interface Network {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  isTestnet: boolean;
  isSupported: boolean;
}

// Token Types
export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  chainId: number;
  isNative: boolean;
  price?: number;
  marketCap?: number;
  volume24h?: number;
  change24h?: number;
}

// API Response Types
export interface Web3ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface Web3PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  success: boolean;
  message?: string;
}

// Query Key Types
export interface Web3QueryKeys {
  all: () => string[];
  config: () => string[];
  status: () => string[];
  wallet: () => string[];
  networks: () => string[];
  tokens: () => string[];
  transactions: (address?: string) => string[];
  balance: (address?: string) => string[];
  tokenBalance: (address?: string, tokenAddress?: string) => string[];
  tokenBalances: (address?: string, filters?: BalanceFilter) => string[];
  balanceHistory: (address?: string, timeRange?: string) => string[];
  balanceSummary: (address?: string) => string[];
  portfolioValue: (address?: string) => string[];
  portfolioPerformance: (address?: string, timeRange?: string) => string[];
  balanceAlerts: (address?: string) => string[];
  balanceInsights: (address?: string) => string[];
  balanceTrends: (address?: string, timeRange?: string) => string[];
  walletInstalled: (walletType: string) => string[];
  availableWallets: () => string[];
  connectionStatus: () => string[];
}
