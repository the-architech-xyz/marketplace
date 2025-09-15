/**
 * Viem Blockchain Integration Blueprint
 * 
 * Modern Web3 integration using viem for Ethereum blockchain interactions
 * Provides type-safe, performant blockchain utilities with proper error handling
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const web3Blueprint: Blueprint = {
  id: 'web3-base-setup',
  name: 'Viem Base Setup',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['viem', '@tanstack/react-query', 'zod']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@types/node'],
      isDev: true
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/config.ts',
      content: `import { createPublicClient, createWalletClient, http, defineChain, type PublicClient, type WalletClient } from 'viem';
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
export const getCurrentNetwork = (): typeof NETWORKS.mainnet => {
  const chainId = parseInt(process.env.CHAIN_ID || '1');
  const network = Object.values(NETWORKS).find(network => network.id === chainId);
  return network || NETWORKS.mainnet;
};

// Create public client for read operations
export const createPublicClient = (chainId?: number): PublicClient => {
  const chain = chainId ? Object.values(NETWORKS).find(network => network.id === chainId) : getCurrentNetwork();
  if (!chain) {
    throw new Error(\`Unsupported chain ID: \${chainId}\`);
  }
  
  return createPublicClient({
    chain,
    transport: http(chain.rpcUrls.default.http[0], {
      retryCount: 3,
      retryDelay: 1000,
    }),
  });
};

// Create wallet client for write operations
export const createWalletClient = (chainId?: number): WalletClient => {
  const chain = chainId ? Object.values(NETWORKS).find(network => network.id === chainId) : getCurrentNetwork();
  if (!chain) {
    throw new Error(\`Unsupported chain ID: \${chainId}\`);
  }
  
  return createWalletClient({
    chain,
    transport: http(chain.rpcUrls.default.http[0]),
  });
};

// Network validation utility
export const validateNetwork = (config: unknown): NetworkConfig => {
  return NetworkConfigSchema.parse(config);
};

// Get supported networks
export const getSupportedNetworks = () => {
  return Object.values(NETWORKS);
};

// Check if chain is supported
export const isChainSupported = (chainId: number): boolean => {
  return Object.values(NETWORKS).some(network => network.id === chainId);
};`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/core.ts',
      content: `import { 
  createPublicClient, 
  createWalletClient, 
  http, 
  type Address, 
  type Hash, 
  type PublicClient, 
  type WalletClient,
  formatEther,
  parseEther,
  getContract,
  type GetContractReturnType,
  type Abi
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
const AddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
const HashSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);

// Core Web3 utilities class
export class Web3Core {
  private publicClient: PublicClient;
  private walletClient: WalletClient | null = null;
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

  // Initialize wallet client (requires browser environment)
  async initializeWallet(): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Web3Error('Wallet initialization requires browser environment', 'BROWSER_REQUIRED');
    }

    if (!window.ethereum) {
      throw new Web3Error('No Ethereum provider found', 'NO_PROVIDER');
    }

    this.walletClient = createWalletClient({
      chain: NETWORKS[this.currentChain],
      transport: http(),
    });
  }

  // Get account address
  async getAccount(): Promise<Address | null> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet not initialized', 'WALLET_NOT_INITIALIZED');
    }

    try {
      const [account] = await this.walletClient.getAddresses();
      return account || null;
    } catch (error) {
      throw new Web3Error('Failed to get account', 'ACCOUNT_ERROR', error as Error);
    }
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

  // Estimate gas for transaction
  async estimateGas(transaction: {
    to: Address;
    value?: bigint;
    data?: \`0x\${string}\`;
  }): Promise<bigint> {
    try {
      return await this.publicClient.estimateGas(transaction);
    } catch (error) {
      throw new Web3Error('Failed to estimate gas', 'GAS_ESTIMATION_ERROR', error as Error);
    }
  }

  // Send transaction
  async sendTransaction(transaction: {
    to: Address;
    value?: bigint;
    data?: \`0x\${string}\`;
    gas?: bigint;
  }): Promise<Hash> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet not initialized', 'WALLET_NOT_INITIALIZED');
    }

    try {
      const account = await this.getAccount();
      if (!account) {
        throw new Web3Error('No account connected', 'NO_ACCOUNT');
      }

      const hash = await this.walletClient.sendTransaction({
        ...transaction,
        account,
      });

      return hash;
    } catch (error) {
      throw new Web3Error('Failed to send transaction', 'TRANSACTION_ERROR', error as Error);
    }
  }

  // Wait for transaction receipt
  async waitForTransactionReceipt(hash: Hash): Promise<any> {
    try {
      return await this.publicClient.waitForTransactionReceipt({ hash });
    } catch (error) {
      throw new Web3Error('Failed to wait for transaction receipt', 'RECEIPT_ERROR', error as Error);
    }
  }

  // Get contract instance
  getContract<TAbi extends Abi>(address: Address, abi: TAbi): GetContractReturnType<TAbi, PublicClient> {
    return getContract({
      address,
      abi,
      client: this.publicClient,
    });
  }

  // Get wallet contract instance (for write operations)
  getWalletContract<TAbi extends Abi>(address: Address, abi: TAbi): GetContractReturnType<TAbi, WalletClient> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet not initialized', 'WALLET_NOT_INITIALIZED');
    }

    return getContract({
      address,
      abi,
      client: this.walletClient,
    });
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

  // Switch chain
  async switchChain(chainId: number): Promise<void> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Web3Error('Chain switching requires browser environment with provider', 'BROWSER_REQUIRED');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: \`0x\${chainId.toString(16)}\` }],
      });
    } catch (error: any) {
      // If the chain doesn't exist, try to add it
      if (error.code === 4902) {
        await this.addChain(chainId);
      } else {
        throw new Web3Error('Failed to switch chain', 'CHAIN_SWITCH_ERROR', error);
      }
    }
  }

  // Add new chain
  private async addChain(chainId: number): Promise<void> {
    const chain = Object.values(NETWORKS).find(network => network.id === chainId);
    if (!chain) {
      throw new Web3Error(\`Unsupported chain ID: \${chainId}\`, 'UNSUPPORTED_CHAIN');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: \`0x\${chainId.toString(16)}\`,
          chainName: chain.name,
          rpcUrls: chain.rpcUrls.default.http,
          blockExplorerUrls: [chain.blockExplorers.default.url],
          nativeCurrency: chain.nativeCurrency,
        }],
      });
    } catch (error) {
      throw new Web3Error('Failed to add chain', 'CHAIN_ADD_ERROR', error as Error);
    }
  }
}

// Export singleton instance
export const web3Core = new Web3Core();

// Type exports
export type { Address, Hash, PublicClient, WalletClient };
export type { SupportedChain } from './config';`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useWeb3.ts',
      content: `import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { web3Core, Web3Error, type Address, type Hash } from '@/lib/web3/core';
import { NETWORKS, type SupportedChain } from '@/lib/web3/config';

// Web3 state interface
export interface Web3State {
  isConnected: boolean;
  address: Address | null;
  balance: string | null;
  chainId: number | null;
  isLoading: boolean;
  error: string | null;
}

// Hook for Web3 state management
export function useWeb3() {
  const [state, setState] = useState<Web3State>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isLoading: false,
    error: null,
  });

  const queryClient = useQueryClient();

  // Connect wallet
  const connectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await web3Core.initializeWallet();
      const address = await web3Core.getAccount();
      
      if (address) {
        const balance = await web3Core.getBalance(address);
        const chain = web3Core.getCurrentChain();
        
        setState(prev => ({
          ...prev,
          isConnected: true,
          address,
          balance,
          chainId: chain.id,
          isLoading: false,
        }));
      }
    } catch (error) {
      const errorMessage = error instanceof Web3Error ? error.message : 'Failed to connect wallet';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setState({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isLoading: false,
      error: null,
    });
  }, []);

  // Switch chain
  const switchChain = useCallback(async (chainId: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      await web3Core.switchChain(chainId);
      const chain = Object.values(NETWORKS).find(network => network.id === chainId);
      
      if (chain && state.address) {
        const balance = await web3Core.getBalance(state.address);
        setState(prev => ({
          ...prev,
          chainId,
          balance,
          isLoading: false,
        }));
      }
    } catch (error) {
      const errorMessage = error instanceof Web3Error ? error.message : 'Failed to switch chain';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, [state.address]);

  // Refresh balance
  const refreshBalance = useCallback(async () => {
    if (!state.address) return;
    
    try {
      const balance = await web3Core.getBalance(state.address);
      setState(prev => ({ ...prev, balance }));
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  }, [state.address]);

  // Listen for account changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        connectWallet();
      }
    };

    const handleChainChanged = (chainId: string) => {
      const newChainId = parseInt(chainId, 16);
      switchChain(newChainId);
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [connectWallet, disconnectWallet, switchChain]);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    switchChain,
    refreshBalance,
  };
}

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
  });
}

// Hook for sending transactions
export function useSendTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: {
      to: Address;
      value?: bigint;
      data?: \`0x\${string}\`;
      gas?: bigint;
    }) => {
      return await web3Core.sendTransaction(transaction);
    },
    onSuccess: (hash: Hash) => {
      // Invalidate balance queries after successful transaction
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['blockNumber'] });
    },
  });
}

// Hook for waiting for transaction receipt
export function useWaitForTransactionReceipt(hash: Hash | null) {
  return useQuery({
    queryKey: ['transactionReceipt', hash],
    queryFn: async () => {
      if (!hash) return null;
      return await web3Core.waitForTransactionReceipt(hash);
    },
    enabled: !!hash,
    refetchInterval: 2000, // Refetch every 2 seconds
  });
}

// Hook for contract interactions
export function useContract(address: Address | null, abi: any) {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (!address || !abi) {
      setContract(null);
      return;
    }

    try {
      const contractInstance = web3Core.getContract(address, abi);
      setContract(contractInstance);
    } catch (error) {
      console.error('Failed to create contract instance:', error);
      setContract(null);
    }
  }, [address, abi]);

  return contract;
}

// Hook for wallet contract interactions (write operations)
export function useWalletContract(address: Address | null, abi: any) {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (!address || !abi) {
      setContract(null);
      return;
    }

    try {
      const contractInstance = web3Core.getWalletContract(address, abi);
      setContract(contractInstance);
    } catch (error) {
      console.error('Failed to create wallet contract instance:', error);
      setContract(null);
    }
  }, [address, abi]);

  return contract;
}

// Type exports
export type { Web3State, Address, Hash };
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
