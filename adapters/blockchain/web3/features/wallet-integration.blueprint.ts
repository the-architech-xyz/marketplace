/**
 * Wallet Integration Feature Blueprint
 * 
 * Modern wallet integration using viem with MetaMask, WalletConnect, and other wallets
 */

import { Blueprint } from '@thearchitech.xyz/types';

const walletIntegrationBlueprint: Blueprint = {
  id: 'web3-wallet-integration',
  name: 'Wallet Integration',
  description: 'Modern wallet integration using viem with comprehensive wallet support',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@walletconnect/modal@^2.0.0', '@walletconnect/ethereum-provider@^2.0.0', 'wagmi@^2.0.0', 'viem@^2.0.0']
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/wallet.ts',
      content: `import { 
  createWalletClient, 
  createPublicClient, 
  http, 
  type Address, 
  type Hash, 
  type WalletClient, 
  type PublicClient,
  formatEther,
  parseEther,
  getAddress,
  isAddress
} from 'viem';
import { NETWORKS, getCurrentNetwork, type SupportedChain } from './config.js';
import { Web3Error } from './core.js';

// Wallet state interface
export interface WalletState {
  address: Address | null;
  balance: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

// Wallet connection options
export interface WalletConnectionOptions {
  chainId?: number;
  autoConnect?: boolean;
}

// Modern wallet manager using viem
export class WalletManager {
  private walletClient: WalletClient | null = null;
  private publicClient: PublicClient | null = null;
  private walletState: WalletState = {
    address: null,
    balance: null,
    chainId: null,
    isConnected: false,
    isConnecting: false,
    error: null
  };
  private listeners: Set<(state: WalletState) => void> = new Set();

  constructor() {
    this.initializeClients();
    this.setupEventListeners();
  }

  private initializeClients() {
    const chain = getCurrentNetwork();
    this.publicClient = createPublicClient({
      chain,
      transport: http(chain.rpcUrls.default.http[0], {
        retryCount: 3,
        retryDelay: 1000,
      }),
    });
  }

  private setupEventListeners() {
    if (typeof window === 'undefined' || !window.ethereum) return;

    // Listen for account changes
    window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
    
    // Listen for chain changes
    window.ethereum.on('chainChanged', this.handleChainChanged.bind(this));
    
    // Listen for disconnect
    window.ethereum.on('disconnect', this.handleDisconnect.bind(this));
  }

  // Connect wallet with modern viem approach
  async connectWallet(options: WalletConnectionOptions = {}): Promise<WalletState> {
    if (typeof window === 'undefined') {
      throw new Web3Error('Wallet connection requires browser environment', 'BROWSER_REQUIRED');
    }

    if (!window.ethereum) {
      throw new Web3Error('No Ethereum provider found. Please install MetaMask or another Web3 wallet.', 'NO_PROVIDER');
    }

    this.updateState({ isConnecting: true, error: null });

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Web3Error('No accounts found', 'NO_ACCOUNTS');
      }

      const address = getAddress(accounts[0]);
      
      // Create wallet client
      const chain = options.chainId ? 
        Object.values(NETWORKS).find(network => network.id === options.chainId) : 
        getCurrentNetwork();
      
      if (!chain) {
        throw new Web3Error(\`Unsupported chain ID: \${options.chainId}\`, 'UNSUPPORTED_CHAIN');
      }

      this.walletClient = createWalletClient({
        chain,
        transport: http(),
      });

      // Get current chain ID
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      // Get balance
      const balance = await this.getBalance(address);

      this.updateState({
        address,
        balance,
        chainId: parseInt(chainId, 16),
        isConnected: true,
        isConnecting: false,
        error: null
      });

      return this.walletState;
    } catch (error) {
      const errorMessage = error instanceof Web3Error ? error.message : 'Failed to connect wallet';
      this.updateState({
        isConnecting: false,
        error: errorMessage
      });
      throw error;
    }
  }

  // Disconnect wallet
  async disconnectWallet(): Promise<void> {
    this.walletClient = null;
    this.updateState({
      address: null,
      balance: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      error: null
    });
  }

  // Switch network
  async switchNetwork(chainId: number): Promise<void> {
    if (!window.ethereum) {
      throw new Web3Error('No Ethereum provider found', 'NO_PROVIDER');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: \`0x\${chainId.toString(16)}\` }]
      });
    } catch (error: any) {
      // If the chain doesn't exist, try to add it
      if (error.code === 4902) {
        await this.addNetwork(chainId);
      } else {
        throw new Web3Error('Failed to switch network', 'NETWORK_SWITCH_ERROR', error);
      }
    }
  }

  // Add new network
  private async addNetwork(chainId: number): Promise<void> {
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
      throw new Web3Error('Failed to add network', 'NETWORK_ADD_ERROR', error as Error);
    }
  }

  // Get balance
  async getBalance(address: Address): Promise<string> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const balance = await this.publicClient.getBalance({ address });
      return formatEther(balance);
    } catch (error) {
      throw new Web3Error('Failed to get balance', 'BALANCE_ERROR', error as Error);
    }
  }

  // Update balance
  async updateBalance(): Promise<void> {
    if (!this.walletState.address) return;

    try {
      const balance = await this.getBalance(this.walletState.address);
      this.updateState({ balance });
    } catch (error) {
      console.error('Failed to update balance:', error);
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
      throw new Web3Error('Wallet not connected', 'WALLET_NOT_CONNECTED');
    }

    try {
      const hash = await this.walletClient.sendTransaction(transaction);
      return hash;
    } catch (error) {
      throw new Web3Error('Failed to send transaction', 'TRANSACTION_ERROR', error as Error);
    }
  }

  // Event handlers
  private handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      this.disconnectWallet();
    } else {
      const address = getAddress(accounts[0]);
      this.updateState({ address });
      this.updateBalance();
    }
  };

  private handleChainChanged = (chainId: string) => {
    const newChainId = parseInt(chainId, 16);
    this.updateState({ chainId: newChainId });
    this.updateBalance();
  };

  private handleDisconnect = () => {
    this.disconnectWallet();
  };

  // State management
  private updateState(updates: Partial<WalletState>) {
    this.walletState = { ...this.walletState, ...updates };
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.walletState));
  }

  // Subscribe to state changes
  subscribe(listener: (state: WalletState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Get current state
  getWalletState(): WalletState {
    return { ...this.walletState };
  }

  // Get wallet client
  getWalletClient(): WalletClient | null {
    return this.walletClient;
  }

  // Get public client
  getPublicClient(): PublicClient | null {
    return this.publicClient;
  }

  // Utility methods
  formatEther(value: bigint): string {
    return formatEther(value);
  }

  parseEther(value: string): bigint {
    return parseEther(value);
  }

  validateAddress(address: string): boolean {
    return isAddress(address);
  }
}

// Global wallet manager instance
export const walletManager = new WalletManager();`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/web3/useWallet.ts',
      content: `import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { walletManager, WalletState, WalletConnectionOptions } from '../../lib/web3/wallet.js';
import { Web3Error } from '../../lib/web3/core.js';

// Modern wallet hook with React Query integration
export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>(walletManager.getWalletState());
  const queryClient = useQueryClient();

  // Subscribe to wallet state changes
  useEffect(() => {
    const unsubscribe = walletManager.subscribe((newState) => {
      setWalletState(newState);
    });

    return unsubscribe;
  }, []);

  // Connect wallet mutation
  const connectMutation = useMutation({
    mutationFn: async (options?: WalletConnectionOptions) => {
      return await walletManager.connectWallet(options);
    },
    onSuccess: () => {
      // Invalidate balance queries after successful connection
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });

  // Disconnect wallet mutation
  const disconnectMutation = useMutation({
    mutationFn: async () => {
      return await walletManager.disconnectWallet();
    },
    onSuccess: () => {
      // Invalidate all Web3 queries after disconnection
      queryClient.invalidateQueries({ queryKey: ['balance'] });
      queryClient.invalidateQueries({ queryKey: ['blockNumber'] });
    },
  });

  // Switch network mutation
  const switchNetworkMutation = useMutation({
    mutationFn: async (chainId: number) => {
      return await walletManager.switchNetwork(chainId);
    },
    onSuccess: () => {
      // Invalidate balance queries after network switch
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });

  // Connect wallet
  const connect = useCallback(async (options?: WalletConnectionOptions) => {
    try {
      await connectMutation.mutateAsync(options);
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to connect wallet:', error);
    }
  }, [connectMutation]);

  // Disconnect wallet
  const disconnect = useCallback(async () => {
    try {
      await disconnectMutation.mutateAsync();
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to disconnect wallet:', error);
    }
  }, [disconnectMutation]);

  // Switch network
  const switchNetwork = useCallback(async (chainId: number) => {
    try {
      await switchNetworkMutation.mutateAsync(chainId);
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to switch network:', error);
    }
  }, [switchNetworkMutation]);

  // Update balance
  const updateBalance = useCallback(async () => {
    try {
      await walletManager.updateBalance();
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
  }, []);

  // Send transaction
  const sendTransaction = useCallback(async (transaction: {
    to: string;
    value?: bigint;
    data?: \`0x\${string}\`;
    gas?: bigint;
  }) => {
    try {
      return await walletManager.sendTransaction(transaction);
    } catch (error) {
      throw new Web3Error('Failed to send transaction', 'TRANSACTION_ERROR', error as Error);
    }
  }, []);

  return {
    ...walletState,
    isLoading: connectMutation.isPending || disconnectMutation.isPending || switchNetworkMutation.isPending,
    error: walletState.error || connectMutation.error?.message || disconnectMutation.error?.message || switchNetworkMutation.error?.message,
    connect,
    disconnect,
    switchNetwork,
    updateBalance,
    sendTransaction,
    // Mutation states for advanced usage
    connectMutation,
    disconnectMutation,
    switchNetworkMutation,
  };
};

// Hook for wallet connection with options
export const useWalletConnection = (options?: WalletConnectionOptions) => {
  const wallet = useWallet();
  
  const connectWithOptions = useCallback(async () => {
    await wallet.connect(options);
  }, [wallet, options]);

  return {
    ...wallet,
    connect: connectWithOptions,
  };
};

// Hook for wallet transactions
export const useWalletTransaction = () => {
  const wallet = useWallet();
  
  const sendTransactionMutation = useMutation({
    mutationFn: async (transaction: {
      to: string;
      value?: bigint;
      data?: \`0x\${string}\`;
      gas?: bigint;
    }) => {
      return await walletManager.sendTransaction(transaction);
    },
    onSuccess: () => {
      // Invalidate balance queries after successful transaction
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });

  const sendTransaction = useCallback(async (transaction: {
    to: string;
    value?: bigint;
    data?: \`0x\${string}\`;
    gas?: bigint;
  }) => {
    try {
      return await sendTransactionMutation.mutateAsync(transaction);
    } catch (error) {
      throw error;
    }
  }, [sendTransactionMutation]);

  return {
    ...wallet,
    sendTransaction,
    sendTransactionMutation,
  };
};`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/WalletConnect.tsx',
      content: `import React from 'react';
import { useWallet } from '../../hooks/web3/useWallet.js';
import { Button } from '../ui/button.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.js';
import { Badge } from '../ui/badge.js';
import { Alert, AlertDescription } from '../ui/alert.js';

export const WalletConnect: React.FC = () => {
  const { 
    address, 
    balance, 
    chainId, 
    isConnected, 
    isConnecting,
    error, 
    connect, 
    disconnect, 
    updateBalance,
    switchNetwork
  } = useWallet();

  const formatAddress = (addr: string) => {
    return \`\${addr.slice(0, 6)}...\${addr.slice(-4)}\`;
  };

  const formatBalance = (bal: string) => {
    return parseFloat(bal).toFixed(4);
  };

  const getChainName = (chainId: number) => {
    const chains: Record<number, string> = {
      1: 'Ethereum',
      11155111: 'Sepolia',
      137: 'Polygon',
      42161: 'Arbitrum'
    };
    return chains[chainId] || \`Chain \${chainId}\`;
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>
            Connect your Web3 wallet to interact with the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          <Button 
            onClick={() => connect()} 
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Wallet Connected
          <Badge variant="secondary">Connected</Badge>
        </CardTitle>
        <CardDescription>
          Your wallet is connected and ready to use
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Address:</span>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {formatAddress(address!)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Balance:</span>
            <span className="text-sm font-semibold">
              {formatBalance(balance!)} ETH
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Network:</span>
            <Badge variant="outline">
              {getChainName(chainId!)}
            </Badge>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={updateBalance} 
            variant="outline" 
            size="sm"
            className="flex-1"
            disabled={isConnecting}
          >
            Refresh
          </Button>
          <Button 
            onClick={() => switchNetwork(137)} 
            variant="outline" 
            size="sm"
            className="flex-1"
            disabled={isConnecting}
          >
            Switch to Polygon
          </Button>
          <Button 
            onClick={disconnect} 
            variant="destructive" 
            size="sm"
            className="flex-1"
            disabled={isConnecting}
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};`
    }
  ]
};
export default walletIntegrationBlueprint;
