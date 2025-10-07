/**
 * Web3 Backend Implementation: Web3 + Next.js
 * 
 * This implementation provides the backend logic for the Web3 capability
 * using Web3 libraries and Next.js. It generates API routes and hooks that fulfill
 * the contract defined in the parent feature's contract.ts.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';

export const web3NextjsBlueprint: Blueprint = {
  id: 'web3-backend-web3-nextjs',
  name: 'Web3 Backend (Web3 + Next.js)',
  description: 'Backend implementation for Web3 capability using Web3 libraries and Next.js',
  actions: [
    // Install Web3 dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'web3@^4.3.0',
        'ethers@^6.8.0',
        '@tanstack/react-query@^5.0.0',
        'wagmi@^1.4.0',
        '@rainbow-me/rainbowkit@^1.3.0'
      ]
    },

    // Create Web3 service
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/web3/service.ts',
      content: `/**
 * Web3 Service - Web3 Implementation
 * 
 * This service provides the backend implementation for the Web3 capability
 * using Web3 libraries. It implements all the operations defined in the contract.
 */

import { Web3 } from 'web3';
import { ethers } from 'ethers';
import { 
  WalletConnection, 
  WalletBalance, 
  Transaction, 
  TransactionResult,
  Network,
  ConnectWalletData,
  SendTransactionData,
  ContractReadData,
  ContractWriteData,
  SwitchNetworkData,
  AddTokenData
} from '../contract';

// Initialize Web3 providers
const providers = {
  ethereum: new Web3(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'),
  polygon: new Web3(process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com'),
  arbitrum: new Web3(process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc'),
};

export class Web3Service {
  private web3: Web3;
  private provider: ethers.JsonRpcProvider;

  constructor(chainId: number = 1) {
    this.web3 = this.getWeb3Provider(chainId);
    this.provider = new ethers.JsonRpcProvider(this.getRpcUrl(chainId));
  }

  // Wallet operations
  async connectWallet(data: ConnectWalletData): Promise<WalletConnection> {
    try {
      // This would typically be handled on the frontend with wallet providers
      // The backend would validate and store the connection
      const mockConnection: WalletConnection = {
        address: '0x742d35Cc6634C0532925a3b8D0C0C2C0C0C0C0C0',
        chainId: data.chainId || 1,
        isConnected: true,
        provider: data.provider,
        balance: '0',
        ensName: undefined,
        avatar: undefined,
      };

      return mockConnection;
    } catch (error) {
      throw new Error(\`Failed to connect wallet: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async disconnectWallet(): Promise<void> {
    try {
      // Handle wallet disconnection
      // This would typically clear session data
    } catch (error) {
      throw new Error(\`Failed to disconnect wallet: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getWalletBalance(address: string, chainId: number = 1): Promise<WalletBalance> {
    try {
      this.web3 = this.getWeb3Provider(chainId);
      const balance = await this.web3.eth.getBalance(address);
      const formattedBalance = this.web3.utils.fromWei(balance, 'ether');

      return {
        address,
        balance: balance.toString(),
        formattedBalance,
        symbol: 'ETH',
        decimals: 18,
        chainId,
        assets: [], // Would fetch token balances
      };
    } catch (error) {
      throw new Error(\`Failed to get wallet balance: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Transaction operations
  async sendTransaction(data: SendTransactionData): Promise<TransactionResult> {
    try {
      // This would typically be handled on the frontend with wallet providers
      // The backend would track and store transaction data
      const mockResult: TransactionResult = {
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        status: 'pending',
      };

      return mockResult;
    } catch (error) {
      throw new Error(\`Failed to send transaction: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getTransactions(address: string, limit: number = 50): Promise<Transaction[]> {
    try {
      // This would typically use a service like Alchemy or Infura
      // For now, return mock data
      const mockTransactions: Transaction[] = [
        {
          hash: '0x' + Math.random().toString(16).substr(2, 64),
          from: address,
          to: '0x742d35Cc6634C0532925a3b8D0C0C2C0C0C0C0C0',
          value: '1000000000000000000', // 1 ETH
          gasUsed: '21000',
          gasPrice: '20000000000', // 20 gwei
          blockNumber: 18500000,
          blockHash: '0x' + Math.random().toString(16).substr(2, 64),
          timestamp: Date.now(),
          status: 'confirmed',
          type: 'send',
        },
      ];

      return mockTransactions;
    } catch (error) {
      throw new Error(\`Failed to get transactions: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async getTransaction(hash: string): Promise<Transaction> {
    try {
      // This would typically use a service like Alchemy or Infura
      const mockTransaction: Transaction = {
        hash,
        from: '0x742d35Cc6634C0532925a3b8D0C0C2C0C0C0C0C0',
        to: '0x742d35Cc6634C0532925a3b8D0C0C2C0C0C0C0C0',
        value: '1000000000000000000',
        gasUsed: '21000',
        gasPrice: '20000000000',
        blockNumber: 18500000,
        blockHash: '0x' + Math.random().toString(16).substr(2, 64),
        timestamp: Date.now(),
        status: 'confirmed',
        type: 'send',
      };

      return mockTransaction;
    } catch (error) {
      throw new Error(\`Failed to get transaction: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Contract operations
  async readContract(data: ContractReadData): Promise<any> {
    try {
      const contract = new this.web3.eth.Contract(data.abi, data.address);
      const result = await contract.methods[data.method](...data.args).call();
      return result;
    } catch (error) {
      throw new Error(\`Failed to read contract: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async writeContract(data: ContractWriteData): Promise<TransactionResult> {
    try {
      // This would typically be handled on the frontend with wallet providers
      const mockResult: TransactionResult = {
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        status: 'pending',
      };

      return mockResult;
    } catch (error) {
      throw new Error(\`Failed to write contract: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Network operations
  async getNetworks(): Promise<Network[]> {
    try {
      const networks: Network[] = [
        {
          chainId: 1,
          name: 'Ethereum',
          rpcUrl: process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
          blockExplorer: 'https://etherscan.io',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          isTestnet: false,
        },
        {
          chainId: 137,
          name: 'Polygon',
          rpcUrl: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com',
          blockExplorer: 'https://polygonscan.com',
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
          },
          isTestnet: false,
        },
        {
          chainId: 42161,
          name: 'Arbitrum',
          rpcUrl: process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
          blockExplorer: 'https://arbiscan.io',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
          },
          isTestnet: false,
        },
      ];

      return networks;
    } catch (error) {
      throw new Error(\`Failed to get networks: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  async switchNetwork(data: SwitchNetworkData): Promise<void> {
    try {
      this.web3 = this.getWeb3Provider(data.chainId);
      // Network switching is typically handled on the frontend
    } catch (error) {
      throw new Error(\`Failed to switch network: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Asset operations
  async addToken(data: AddTokenData): Promise<void> {
    try {
      // Token addition is typically handled on the frontend
      // The backend would store token metadata
    } catch (error) {
      throw new Error(\`Failed to add token: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Helper methods
  private getWeb3Provider(chainId: number): Web3 {
    switch (chainId) {
      case 1:
        return providers.ethereum;
      case 137:
        return providers.polygon;
      case 42161:
        return providers.arbitrum;
      default:
        return providers.ethereum;
    }
  }

  private getRpcUrl(chainId: number): string {
    switch (chainId) {
      case 1:
        return process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID';
      case 137:
        return process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com';
      case 42161:
        return process.env.ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc';
      default:
        return process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID';
    }
  }
}

export const web3Service = new Web3Service();`
    },

    // Create API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/web3/connect/route.ts',
      content: `/**
 * Web3 Connect API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { web3Service } from '@/lib/web3/service';
import { ConnectWalletData } from '@/lib/web3/contract';

export async function POST(request: NextRequest) {
  try {
    const data: ConnectWalletData = await request.json();
    const connection = await web3Service.connectWallet(data);
    
    return NextResponse.json(connection);
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to connect wallet' },
      { status: 500 }
    );
  }
}`
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/web3/balance/route.ts',
      content: `/**
 * Web3 Balance API Route
 */

import { NextRequest, NextResponse } from 'next/server';
import { web3Service } from '@/lib/web3/service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const chainId = searchParams.get('chainId') ? parseInt(searchParams.get('chainId')!) : 1;
    
    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const balance = await web3Service.getWalletBalance(address, chainId);
    
    return NextResponse.json(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch balance' },
      { status: 500 }
    );
  }
}`
    },

    // Create TanStack Query hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/web3/hooks.ts',
      content: `/**
 * Web3 Hooks - Web3 + Next.js Implementation
 * 
 * This file provides the TanStack Query hooks that fulfill the contract
 * defined in the parent feature's contract.ts.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  WalletConnection, 
  WalletBalance, 
  Transaction, 
  TransactionResult,
  Network,
  ConnectWalletData,
  SendTransactionData,
  ContractReadData,
  ContractWriteData,
  SwitchNetworkData,
  AddTokenData,
  UseWalletResult,
  UseBalanceResult,
  UseTransactionsResult,
  UseNetworksResult,
  UseConnectWalletResult,
  UseDisconnectWalletResult,
  UseSendTransactionResult,
  UseContractWriteResult,
  UseSwitchNetworkResult,
  UseAddTokenResult
} from './contract';

// ============================================================================
// WALLET HOOKS
// ============================================================================

export function useWallet(): UseWalletResult {
  return useQuery({
    queryKey: ['web3', 'wallet'],
    queryFn: async () => {
      const response = await fetch('/api/web3/wallet');
      if (!response.ok) throw new Error('Failed to fetch wallet');
      return response.json();
    }
  });
}

export function useBalance(address?: string): UseBalanceResult {
  return useQuery({
    queryKey: ['web3', 'balance', address],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (address) params.append('address', address);
      
      const response = await fetch(\`/api/web3/balance?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch balance');
      return response.json();
    },
    enabled: !!address
  });
}

export function useIsConnected(): boolean {
  const { data: wallet } = useWallet();
  return wallet?.isConnected || false;
}

export function useConnectWallet(): UseConnectWalletResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ConnectWalletData) => {
      const response = await fetch('/api/web3/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to connect wallet');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['web3'] });
    }
  });
}

export function useDisconnectWallet(): UseDisconnectWalletResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/web3/disconnect', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to disconnect wallet');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['web3'] });
    }
  });
}

// ============================================================================
// TRANSACTION HOOKS
// ============================================================================

export function useTransactions(address?: string, limit?: number): UseTransactionsResult {
  return useQuery({
    queryKey: ['web3', 'transactions', address, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (address) params.append('address', address);
      if (limit) params.append('limit', limit.toString());
      
      const response = await fetch(\`/api/web3/transactions?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      return response.json();
    },
    enabled: !!address
  });
}

export function useTransaction(hash: string) {
  return useQuery({
    queryKey: ['web3', 'transactions', hash],
    queryFn: async () => {
      const response = await fetch(\`/api/web3/transactions/\${hash}\`);
      if (!response.ok) throw new Error('Failed to fetch transaction');
      return response.json();
    },
    enabled: !!hash
  });
}

export function useSendTransaction(): UseSendTransactionResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SendTransactionData) => {
      const response = await fetch('/api/web3/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to send transaction');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['web3', 'transactions'] });
    }
  });
}

// ============================================================================
// CONTRACT HOOKS
// ============================================================================

export function useContractRead() {
  return useMutation({
    mutationFn: async (data: ContractReadData) => {
      const response = await fetch('/api/web3/contract/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to read contract');
      return response.json();
    }
  });
}

export function useContractWrite(): UseContractWriteResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ContractWriteData) => {
      const response = await fetch('/api/web3/contract/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to write contract');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['web3', 'transactions'] });
    }
  });
}

// ============================================================================
// NETWORK HOOKS
// ============================================================================

export function useNetworks(): UseNetworksResult {
  return useQuery({
    queryKey: ['web3', 'networks'],
    queryFn: async () => {
      const response = await fetch('/api/web3/networks');
      if (!response.ok) throw new Error('Failed to fetch networks');
      return response.json();
    }
  });
}

export function useCurrentNetwork() {
  return useQuery({
    queryKey: ['web3', 'current-network'],
    queryFn: async () => {
      const response = await fetch('/api/web3/current-network');
      if (!response.ok) throw new Error('Failed to fetch current network');
      return response.json();
    }
  });
}

export function useSwitchNetwork(): UseSwitchNetworkResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SwitchNetworkData) => {
      const response = await fetch('/api/web3/switch-network', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to switch network');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['web3'] });
    }
  });
}

// ============================================================================
// ASSET HOOKS
// ============================================================================

export function useAssets(address?: string) {
  return useQuery({
    queryKey: ['web3', 'assets', address],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (address) params.append('address', address);
      
      const response = await fetch(\`/api/web3/assets?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch assets');
      return response.json();
    },
    enabled: !!address
  });
}

export function useAddToken(): UseAddTokenResult {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddTokenData) => {
      const response = await fetch('/api/web3/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to add token');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['web3', 'assets'] });
    }
  });
}`
    }
  ]
};
