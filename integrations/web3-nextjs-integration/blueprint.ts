import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'web3-nextjs-integration',
  name: 'Web3 Next.js Integration',
  description: 'Modern Web3 integration for Next.js using viem with React Query and TypeScript',
  version: '2.0.0',
  actions: [
    // Install modern Web3 dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: ['viem', '@tanstack/react-query', 'zod', '@tanstack/react-query-devtools']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@types/node'],
      isDev: true
    },
    // Create modern Web3 configuration
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

// Validate network configuration
export const validateNetworkConfig = (config: unknown): NetworkConfig => {
  return NetworkConfigSchema.parse(config);
};

// Get supported chains
export const getSupportedChains = (): Array<{ id: number; name: string; symbol: string }> => {
  return Object.values(NETWORKS).map(network => ({
    id: network.id,
    name: network.name,
    symbol: network.nativeCurrency.symbol,
  }));
};`
    },
    // Create modern Web3 core utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/core.ts',
      content: `import { createPublicClient, createWalletClient, http, type PublicClient, type WalletClient, type Address, type Hash, type Chain } from 'viem';
import { NETWORKS, getCurrentNetwork, type SupportedChain } from './config';
import { z } from 'zod';

// Address validation schema
const AddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
const HashSchema = z.string().regex(/^0x[a-fA-F0-9]{64}$/);

// Custom error class for Web3 operations
export class Web3Error extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'Web3Error';
  }
}

// Web3 core class for blockchain interactions
export class Web3Core {
  private publicClient: PublicClient;
  private walletClient: WalletClient | null = null;
  private currentChain: Chain;

  constructor(chainId?: number) {
    this.currentChain = chainId ? Object.values(NETWORKS).find(network => network.id === chainId) || getCurrentNetwork() : getCurrentNetwork();
    this.publicClient = createPublicClient(this.currentChain.id);
  }

  // Initialize wallet connection
  async initializeWallet(): Promise<void> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Web3Error('No Web3 provider found. Please install MetaMask or another Web3 wallet.');
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      this.walletClient = createWalletClient(this.currentChain.id);
    } catch (error) {
      throw new Web3Error(\`Failed to connect wallet: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Get current account address
  async getAccount(): Promise<Address | null> {
    if (!this.walletClient) return null;
    
    try {
      const [account] = await this.walletClient.getAddresses();
      return account || null;
    } catch (error) {
      throw new Web3Error(\`Failed to get account: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Get account balance
  async getBalance(address: Address): Promise<string> {
    try {
      const balance = await this.publicClient.getBalance({ address });
      return (Number(balance) / 1e18).toFixed(6);
    } catch (error) {
      throw new Web3Error(\`Failed to get balance: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Get current chain
  getCurrentChain(): Chain {
    return this.currentChain;
  }

  // Switch to different chain
  async switchChain(chainId: number): Promise<void> {
    if (!window.ethereum) {
      throw new Web3Error('No Web3 provider found');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: \`0x\${chainId.toString(16)}\` }],
      });
      
      this.currentChain = Object.values(NETWORKS).find(network => network.id === chainId) || this.currentChain;
      this.publicClient = createPublicClient(chainId);
      this.walletClient = createWalletClient(chainId);
    } catch (error) {
      throw new Web3Error(\`Failed to switch chain: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Get block number
  async getBlockNumber(): Promise<number> {
    try {
      return await this.publicClient.getBlockNumber();
    } catch (error) {
      throw new Web3Error(\`Failed to get block number: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Get gas price
  async getGasPrice(): Promise<string> {
    try {
      const gasPrice = await this.publicClient.getGasPrice();
      return (Number(gasPrice) / 1e9).toFixed(2); // Convert to Gwei
      } catch (error) {
      throw new Web3Error(\`Failed to get gas price: \${error instanceof Error ? error.message : 'Unknown error'}\`);
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
      throw new Web3Error('Wallet not connected');
    }

    try {
      const hash = await this.walletClient.sendTransaction(transaction);
      return hash;
      } catch (error) {
      throw new Web3Error(\`Failed to send transaction: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Wait for transaction receipt
  async waitForTransactionReceipt(hash: Hash): Promise<any> {
    try {
      return await this.publicClient.waitForTransactionReceipt({ hash });
      } catch (error) {
      throw new Web3Error(\`Failed to wait for transaction receipt: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Get contract instance
  getContract(address: Address, abi: any) {
    return {
      address,
      abi,
      read: this.publicClient.readContract,
      write: this.walletClient?.writeContract,
    };
  }

  // Get wallet contract instance
  getWalletContract(address: Address, abi: any) {
    if (!this.walletClient) {
      throw new Web3Error('Wallet not connected');
    }
    
    return {
      address,
      abi,
      read: this.publicClient.readContract,
      write: this.walletClient.writeContract,
    };
  }
}

// Export singleton instance
export const web3Core = new Web3Core();

// Export types
export type { Address, Hash, Chain };
export type { SupportedChain } from './config';`
    },
    // Create modern React hooks
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
    // Create Next.js API routes
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/web3/balance/route.ts',
      content: `import { NextRequest, NextResponse } from 'next/server';
import { web3Core } from '@/lib/web3/core';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const balance = await web3Core.getBalance(address as \`0x\${string}\`);
    
    return NextResponse.json({ 
    address, 
      balance,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Balance API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance' }, 
      { status: 500 }
    );
  }
}`
    },
    // Create Next.js middleware for Web3
    {
      type: 'CREATE_FILE',
      path: 'src/middleware.ts',
      content: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add security headers for Web3 applications
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Add CSP for Web3 security
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.ethereum.org; connect-src 'self' https://*.infura.io https://*.alchemy.com wss://*.ethereum.org; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:;"
  );
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};`
    }
  ]
};