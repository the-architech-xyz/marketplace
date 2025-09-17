/**
 * Smart Contracts Feature Blueprint
 * 
 * Modern smart contract integration using viem with type-safe contract interactions
 */

import { Blueprint } from '@thearchitech.xyz/types';

const smartContractsBlueprint: Blueprint = {
  id: 'web3-smart-contracts',
  name: 'Smart Contracts Integration',
  description: 'Modern smart contract integration using viem with type-safe contract interactions',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['viem@^2.0.0', '@tanstack/react-query@^5.0.0']
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/contracts.ts',
      content: `import { 
  getContract, 
  type Address, 
  type Hash, 
  type PublicClient, 
  type WalletClient,
  type Abi,
  type GetContractReturnType,
  parseUnits,
  formatUnits,
  isAddress
} from 'viem';
import { Web3Error } from './core.js';

// Type-safe contract ABIs
export const ERC20_ABI = [
  {
        "name": "balanceOf",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "account", "type": "address" }],
    "outputs": [{ "name": "balance", "type": "uint256" }]
  },
  {
    "name": "transfer",
    "type": "function",
    "stateMutability": "nonpayable",
        "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" }
        ],
    "outputs": [{ "name": "success", "type": "bool" }]
      },
      {
    "name": "name",
    "type": "function",
    "stateMutability": "view",
        "inputs": [],
    "outputs": [{ "name": "name", "type": "string" }]
      },
      {
    "name": "symbol",
    "type": "function",
    "stateMutability": "view",
        "inputs": [],
    "outputs": [{ "name": "symbol", "type": "string" }]
      },
      {
    "name": "decimals",
    "type": "function",
    "stateMutability": "view",
        "inputs": [],
    "outputs": [{ "name": "decimals", "type": "uint8" }]
  },
  {
    "name": "totalSupply",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "totalSupply", "type": "uint256" }]
  }
] as const;

export const ERC721_ABI = [
  {
        "name": "ownerOf",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "tokenId", "type": "uint256" }],
    "outputs": [{ "name": "owner", "type": "address" }]
  },
  {
        "name": "balanceOf",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "owner", "type": "address" }],
    "outputs": [{ "name": "balance", "type": "uint256" }]
  },
  {
    "name": "transferFrom",
    "type": "function",
    "stateMutability": "nonpayable",
        "inputs": [
      { "name": "from", "type": "address" },
      { "name": "to", "type": "address" },
      { "name": "tokenId", "type": "uint256" }
        ],
    "outputs": []
      },
      {
        "name": "tokenURI",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "tokenId", "type": "uint256" }],
    "outputs": [{ "name": "uri", "type": "string" }]
  },
  {
    "name": "name",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "name", "type": "string" }]
  },
  {
    "name": "symbol",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "symbol", "type": "string" }]
  }
] as const;

export const ERC1155_ABI = [
  {
    "name": "balanceOf",
    "type": "function",
    "stateMutability": "view",
        "inputs": [
      { "name": "account", "type": "address" },
      { "name": "id", "type": "uint256" }
        ],
    "outputs": [{ "name": "balance", "type": "uint256" }]
      },
      {
    "name": "safeTransferFrom",
    "type": "function",
    "stateMutability": "nonpayable",
        "inputs": [
      { "name": "from", "type": "address" },
      { "name": "to", "type": "address" },
      { "name": "id", "type": "uint256" },
      { "name": "amount", "type": "uint256" },
      { "name": "data", "type": "bytes" }
    ],
    "outputs": []
  },
  {
    "name": "uri",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "id", "type": "uint256" }],
    "outputs": [{ "name": "uri", "type": "string" }]
  }
] as const;

// Contract types
export type ERC20Contract = GetContractReturnType<typeof ERC20_ABI, PublicClient>;
export type ERC721Contract = GetContractReturnType<typeof ERC721_ABI, PublicClient>;
export type ERC1155Contract = GetContractReturnType<typeof ERC1155_ABI, PublicClient>;

// Contract interaction options
export interface ContractOptions {
  publicClient?: PublicClient;
  walletClient?: WalletClient;
}

// Modern contract manager using viem
export class ContractManager {
  private publicClient: PublicClient | null = null;
  private walletClient: WalletClient | null = null;

  constructor(options?: ContractOptions) {
    this.publicClient = options?.publicClient || null;
    this.walletClient = options?.walletClient || null;
  }

  // Set clients
  setClients(publicClient: PublicClient, walletClient?: WalletClient) {
    this.publicClient = publicClient;
    this.walletClient = walletClient || null;
  }

  // Get contract instance
  getContract<TAbi extends Abi>(address: Address, abi: TAbi): GetContractReturnType<TAbi, PublicClient> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }
    return getContract({ address, abi, client: this.publicClient });
  }

  // Get wallet contract instance
  getWalletContract<TAbi extends Abi>(address: Address, abi: TAbi): GetContractReturnType<TAbi, WalletClient> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet client not initialized', 'WALLET_NOT_INITIALIZED');
    }
    return getContract({ address, abi, client: this.walletClient });
  }

  // ERC20 Contract Methods
  async getERC20Balance(tokenAddress: Address, walletAddress: Address): Promise<string> {
    try {
      const contract = this.getContract(tokenAddress, ERC20_ABI);
      const balance = await contract.read.balanceOf([walletAddress]);
      return balance.toString();
    } catch (error) {
      throw new Web3Error('Failed to get ERC20 balance', 'CONTRACT_ERROR', error as Error);
    }
  }

  async getERC20Info(tokenAddress: Address): Promise<{ name: string; symbol: string; decimals: number; totalSupply: string }> {
    try {
      const contract = this.getContract(tokenAddress, ERC20_ABI);
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        contract.read.name(),
        contract.read.symbol(),
        contract.read.decimals(),
        contract.read.totalSupply()
      ]);
      
      return {
        name,
        symbol,
        decimals: Number(decimals),
        totalSupply: totalSupply.toString()
      };
    } catch (error) {
      throw new Web3Error('Failed to get ERC20 info', 'CONTRACT_ERROR', error as Error);
    }
  }

  async transferERC20(
    tokenAddress: Address,
    to: Address,
    amount: string,
    decimals: number = 18
  ): Promise<Hash> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet client not initialized', 'WALLET_NOT_INITIALIZED');
    }

    try {
      const contract = this.getWalletContract(tokenAddress, ERC20_ABI);
      const amountWei = parseUnits(amount, decimals);
      
      const hash = await contract.write.transfer([to, amountWei]);
      return hash;
    } catch (error) {
      throw new Web3Error('Failed to transfer ERC20 tokens', 'TRANSFER_ERROR', error as Error);
    }
  }

  // ERC721 Contract Methods
  async getERC721Owner(nftAddress: Address, tokenId: bigint): Promise<Address> {
    try {
      const contract = this.getContract(nftAddress, ERC721_ABI);
      const owner = await contract.read.ownerOf([tokenId]);
      return owner;
    } catch (error) {
      throw new Web3Error('Failed to get ERC721 owner', 'CONTRACT_ERROR', error as Error);
    }
  }

  async getERC721Balance(nftAddress: Address, walletAddress: Address): Promise<number> {
    try {
      const contract = this.getContract(nftAddress, ERC721_ABI);
      const balance = await contract.read.balanceOf([walletAddress]);
      return Number(balance);
    } catch (error) {
      throw new Web3Error('Failed to get ERC721 balance', 'CONTRACT_ERROR', error as Error);
    }
  }

  async getERC721TokenURI(nftAddress: Address, tokenId: bigint): Promise<string> {
    try {
      const contract = this.getContract(nftAddress, ERC721_ABI);
      const uri = await contract.read.tokenURI([tokenId]);
      return uri;
    } catch (error) {
      throw new Web3Error('Failed to get ERC721 token URI', 'CONTRACT_ERROR', error as Error);
    }
  }

  async getERC721Info(nftAddress: Address): Promise<{ name: string; symbol: string }> {
    try {
      const contract = this.getContract(nftAddress, ERC721_ABI);
      const [name, symbol] = await Promise.all([
        contract.read.name(),
        contract.read.symbol()
      ]);
      
      return { name, symbol };
    } catch (error) {
      throw new Web3Error('Failed to get ERC721 info', 'CONTRACT_ERROR', error as Error);
    }
  }

  async transferERC721(
    nftAddress: Address,
    from: Address,
    to: Address,
    tokenId: bigint
  ): Promise<Hash> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet client not initialized', 'WALLET_NOT_INITIALIZED');
    }

    try {
      const contract = this.getWalletContract(nftAddress, ERC721_ABI);
      const hash = await contract.write.transferFrom([from, to, tokenId]);
      return hash;
    } catch (error) {
      throw new Web3Error('Failed to transfer ERC721 token', 'TRANSFER_ERROR', error as Error);
    }
  }

  // ERC1155 Contract Methods
  async getERC1155Balance(
    contractAddress: Address,
    walletAddress: Address,
    tokenId: bigint
  ): Promise<number> {
    try {
      const contract = this.getContract(contractAddress, ERC1155_ABI);
      const balance = await contract.read.balanceOf([walletAddress, tokenId]);
      return Number(balance);
    } catch (error) {
      throw new Web3Error('Failed to get ERC1155 balance', 'CONTRACT_ERROR', error as Error);
    }
  }

  async getERC1155URI(contractAddress: Address, tokenId: bigint): Promise<string> {
    try {
      const contract = this.getContract(contractAddress, ERC1155_ABI);
      const uri = await contract.read.uri([tokenId]);
      return uri;
    } catch (error) {
      throw new Web3Error('Failed to get ERC1155 URI', 'CONTRACT_ERROR', error as Error);
    }
  }

  async transferERC1155(
    contractAddress: Address,
    from: Address,
    to: Address,
    tokenId: bigint,
    amount: bigint,
    data: \`0x\${string}\` = '0x'
  ): Promise<Hash> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet client not initialized', 'WALLET_NOT_INITIALIZED');
    }

    try {
      const contract = this.getWalletContract(contractAddress, ERC1155_ABI);
      const hash = await contract.write.safeTransferFrom([from, to, tokenId, amount, data]);
      return hash;
    } catch (error) {
      throw new Web3Error('Failed to transfer ERC1155 token', 'TRANSFER_ERROR', error as Error);
    }
  }

  // Utility methods
  formatUnits(value: bigint, decimals: number): string {
    return formatUnits(value, decimals);
  }

  parseUnits(value: string, decimals: number): bigint {
    return parseUnits(value, decimals);
  }

  validateAddress(address: string): boolean {
    return isAddress(address);
  }

  // Get contract instance for custom ABI
  getCustomContract<TAbi extends Abi>(address: Address, abi: TAbi): GetContractReturnType<TAbi, PublicClient> {
    return this.getContract(address, abi);
  }

  getCustomWalletContract<TAbi extends Abi>(address: Address, abi: TAbi): GetContractReturnType<TAbi, WalletClient> {
    return this.getWalletContract(address, abi);
  }
}

// Global contract manager instance
export const contractManager = new ContractManager();`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/web3/useContracts.ts',
      content: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contractManager } from '../../lib/web3/contracts.js';
import { useWallet } from './useWallet.js';
import type { Address } from 'viem';

// ERC20 Hooks
export function useERC20Balance(tokenAddress: Address, walletAddress?: Address) {
  const { account } = useWallet();
  const address = walletAddress || account;

  return useQuery({
    queryKey: ['erc20-balance', tokenAddress, address],
    queryFn: async () => {
      if (!address) throw new Error('Wallet address required');
      return await contractManager.getERC20Balance(tokenAddress, address);
    },
    enabled: !!address,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

export function useERC20Info(tokenAddress: Address) {
  return useQuery({
    queryKey: ['erc20-info', tokenAddress],
    queryFn: async () => {
      return await contractManager.getERC20Info(tokenAddress);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useERC20Transfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      tokenAddress, 
      to, 
      amount, 
      decimals = 18 
    }: { 
      tokenAddress: Address; 
      to: Address; 
      amount: string; 
      decimals?: number; 
    }) => {
      return await contractManager.transferERC20(tokenAddress, to, amount, decimals);
    },
    onSuccess: (_, variables) => {
      // Invalidate balance queries for this token
      queryClient.invalidateQueries({ 
        queryKey: ['erc20-balance', variables.tokenAddress] 
      });
    },
  });
}

// ERC721 Hooks
export function useERC721Balance(nftAddress: Address, walletAddress?: Address) {
  const { account } = useWallet();
  const address = walletAddress || account;

  return useQuery({
    queryKey: ['erc721-balance', nftAddress, address],
    queryFn: async () => {
      if (!address) throw new Error('Wallet address required');
      return await contractManager.getERC721Balance(nftAddress, address);
    },
    enabled: !!address,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

export function useERC721Info(nftAddress: Address) {
  return useQuery({
    queryKey: ['erc721-info', nftAddress],
    queryFn: async () => {
      return await contractManager.getERC721Info(nftAddress);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useERC721Owner(nftAddress: Address, tokenId: bigint) {
  return useQuery({
    queryKey: ['erc721-owner', nftAddress, tokenId],
    queryFn: async () => {
      return await contractManager.getERC721Owner(nftAddress, tokenId);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useERC721TokenURI(nftAddress: Address, tokenId: bigint) {
  return useQuery({
    queryKey: ['erc721-token-uri', nftAddress, tokenId],
    queryFn: async () => {
      return await contractManager.getERC721TokenURI(nftAddress, tokenId);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useERC721Transfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      nftAddress, 
      from, 
      to, 
      tokenId 
    }: { 
      nftAddress: Address; 
      from: Address; 
      to: Address; 
      tokenId: bigint; 
    }) => {
      return await contractManager.transferERC721(nftAddress, from, to, tokenId);
    },
    onSuccess: (_, variables) => {
      // Invalidate balance and owner queries
      queryClient.invalidateQueries({ 
        queryKey: ['erc721-balance', variables.nftAddress] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['erc721-owner', variables.nftAddress, variables.tokenId] 
      });
    },
  });
}

// ERC1155 Hooks
export function useERC1155Balance(
  contractAddress: Address, 
  walletAddress: Address, 
  tokenId: bigint
) {
  return useQuery({
    queryKey: ['erc1155-balance', contractAddress, walletAddress, tokenId],
    queryFn: async () => {
      return await contractManager.getERC1155Balance(contractAddress, walletAddress, tokenId);
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

export function useERC1155URI(contractAddress: Address, tokenId: bigint) {
  return useQuery({
    queryKey: ['erc1155-uri', contractAddress, tokenId],
    queryFn: async () => {
      return await contractManager.getERC1155URI(contractAddress, tokenId);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useERC1155Transfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      contractAddress, 
      from, 
      to, 
      tokenId, 
      amount, 
      data = '0x' 
    }: { 
      contractAddress: Address; 
      from: Address; 
      to: Address; 
      tokenId: bigint; 
      amount: bigint; 
      data?: \`0x\${string}\`; 
    }) => {
      return await contractManager.transferERC1155(contractAddress, from, to, tokenId, amount, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate balance queries for this token
      queryClient.invalidateQueries({ 
        queryKey: ['erc1155-balance', variables.contractAddress, variables.from, variables.tokenId] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['erc1155-balance', variables.contractAddress, variables.to, variables.tokenId] 
      });
    },
  });
}

// Utility Hooks
export function useContractManager() {
  return contractManager;
}

export function useAddressValidation() {
  return {
    validateAddress: (address: string) => contractManager.validateAddress(address),
    formatUnits: (value: bigint, decimals: number) => contractManager.formatUnits(value, decimals),
    parseUnits: (value: string, decimals: number) => contractManager.parseUnits(value, decimals),
  };
}`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/ContractInteraction.tsx',
      content: `import React, { useState } from 'react';
import { useWallet } from '../../hooks/web3/useWallet.js';
import { 
  useERC20Balance, 
  useERC20Info, 
  useERC20Transfer,
  useERC721Balance,
  useERC721Info,
  useERC721Owner,
  useERC721Transfer,
  useERC1155Balance,
  useERC1155Transfer,
  useAddressValidation
} from '../../hooks/web3/useContracts.js';
import { Button } from '../ui/button.js';
import { Input } from '../ui/input.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.js';
import { Badge } from '../ui/badge.js';
import { Alert, AlertDescription } from '../ui/alert.js';
import type { Address } from 'viem';

interface ContractInteractionProps {
  contractAddress: Address;
  contractType: 'erc20' | 'erc721' | 'erc1155';
}

export const ContractInteraction: React.FC<ContractInteractionProps> = ({
  contractAddress,
  contractType
}) => {
  const { account, isConnected } = useWallet();
  const { validateAddress } = useAddressValidation();

  // ERC20 specific state
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [decimals, setDecimals] = useState('18');

  // ERC721/ERC1155 specific state
  const [tokenId, setTokenId] = useState('');
  const [transferFrom, setTransferFrom] = useState('');
  const [transferToNFT, setTransferToNFT] = useState('');
  const [transferAmount1155, setTransferAmount1155] = useState('');

  // ERC20 Hooks
  const { 
    data: erc20Balance, 
    isLoading: erc20BalanceLoading, 
    error: erc20BalanceError 
  } = useERC20Balance(contractAddress, account);
  
  const { 
    data: erc20Info, 
    isLoading: erc20InfoLoading, 
    error: erc20InfoError 
  } = useERC20Info(contractAddress);
  
  const erc20Transfer = useERC20Transfer();

  // ERC721 Hooks
  const { 
    data: erc721Balance, 
    isLoading: erc721BalanceLoading, 
    error: erc721BalanceError 
  } = useERC721Balance(contractAddress, account);
  
  const { 
    data: erc721Info, 
    isLoading: erc721InfoLoading, 
    error: erc721InfoError 
  } = useERC721Info(contractAddress);
  
  const { 
    data: erc721Owner, 
    isLoading: erc721OwnerLoading, 
    error: erc721OwnerError 
  } = useERC721Owner(contractAddress, tokenId ? BigInt(tokenId) : 0n);
  
  const erc721Transfer = useERC721Transfer();

  // ERC1155 Hooks
  const { 
    data: erc1155Balance, 
    isLoading: erc1155BalanceLoading, 
    error: erc1155BalanceError 
  } = useERC1155Balance(contractAddress, account || '0x0', tokenId ? BigInt(tokenId) : 0n);
  
  const erc1155Transfer = useERC1155Transfer();

  const handleERC20Transfer = async () => {
    if (!account || !transferTo || !transferAmount) return;
    
    if (!validateAddress(transferTo)) {
      alert('Invalid recipient address');
      return;
    }

    try {
      await erc20Transfer.mutateAsync({
        tokenAddress: contractAddress,
        to: transferTo as Address,
        amount: transferAmount,
        decimals: parseInt(decimals)
      });
      alert('Transfer successful!');
      setTransferTo('');
      setTransferAmount('');
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed. Check console for details.');
    }
  };

  const handleERC721Transfer = async () => {
    if (!account || !transferFrom || !transferToNFT || !tokenId) return;
    
    if (!validateAddress(transferFrom) || !validateAddress(transferToNFT)) {
      alert('Invalid address');
      return;
    }

    try {
      await erc721Transfer.mutateAsync({
        nftAddress: contractAddress,
        from: transferFrom as Address,
        to: transferToNFT as Address,
        tokenId: BigInt(tokenId)
      });
      alert('Transfer successful!');
      setTransferFrom('');
      setTransferToNFT('');
      setTokenId('');
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed. Check console for details.');
    }
  };

  const handleERC1155Transfer = async () => {
    if (!account || !transferFrom || !transferToNFT || !tokenId || !transferAmount1155) return;
    
    if (!validateAddress(transferFrom) || !validateAddress(transferToNFT)) {
      alert('Invalid address');
      return;
    }

    try {
      await erc1155Transfer.mutateAsync({
        contractAddress: contractAddress,
        from: transferFrom as Address,
        to: transferToNFT as Address,
        tokenId: BigInt(tokenId),
        amount: BigInt(transferAmount1155)
      });
      alert('Transfer successful!');
      setTransferFrom('');
      setTransferToNFT('');
      setTokenId('');
      setTransferAmount1155('');
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed. Check console for details.');
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contract Interaction</CardTitle>
          <CardDescription>
            Please connect your wallet to interact with contracts
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Interaction</CardTitle>
        <CardDescription>
          Interact with {contractType.toUpperCase()} contract: {contractAddress.slice(0, 10)}...
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {contractType === 'erc20' && (
          <div className="space-y-4">
            {/* Token Info */}
            {erc20Info && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Token Information</h3>
                <div className="flex gap-2">
                  <Badge variant="outline">{erc20Info.name}</Badge>
                  <Badge variant="outline">{erc20Info.symbol}</Badge>
                  <Badge variant="outline">{erc20Info.decimals} decimals</Badge>
                </div>
              </div>
            )}

            {/* Balance */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Your Balance</h3>
              {erc20BalanceLoading ? (
                <p>Loading balance...</p>
              ) : erc20BalanceError ? (
                <Alert>
                  <AlertDescription>
                    Error loading balance: {erc20BalanceError.message}
                  </AlertDescription>
                </Alert>
              ) : (
                <p className="text-2xl font-bold">{erc20Balance} tokens</p>
              )}
            </div>
            
            {/* Transfer */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Transfer Tokens</h3>
              <div className="grid grid-cols-1 gap-2">
              <Input
                placeholder="Recipient address"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
              />
                <div className="flex gap-2">
              <Input
                placeholder="Amount to transfer"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                    type="number"
                  />
                  <Input
                    placeholder="Decimals"
                    value={decimals}
                    onChange={(e) => setDecimals(e.target.value)}
                    type="number"
                    className="w-24"
                  />
                </div>
                <Button 
                  onClick={handleERC20Transfer} 
                  disabled={erc20Transfer.isPending || !transferTo || !transferAmount}
                  className="w-full"
                >
                  {erc20Transfer.isPending ? 'Transferring...' : 'Transfer Tokens'}
              </Button>
              </div>
            </div>
          </div>
        )}

        {contractType === 'erc721' && (
          <div className="space-y-4">
            {/* NFT Info */}
            {erc721Info && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">NFT Collection</h3>
                <div className="flex gap-2">
                  <Badge variant="outline">{erc721Info.name}</Badge>
                  <Badge variant="outline">{erc721Info.symbol}</Badge>
                </div>
              </div>
            )}

            {/* Balance */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Your NFT Balance</h3>
              {erc721BalanceLoading ? (
                <p>Loading balance...</p>
              ) : erc721BalanceError ? (
                <Alert>
                  <AlertDescription>
                    Error loading balance: {erc721BalanceError.message}
                  </AlertDescription>
                </Alert>
              ) : (
                <p className="text-2xl font-bold">{erc721Balance} NFTs</p>
              )}
            </div>
            
            {/* Token Owner */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Check Token Owner</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Token ID"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  type="number"
                />
              </div>
              {tokenId && (
                <div>
                  {erc721OwnerLoading ? (
                    <p>Loading owner...</p>
                  ) : erc721OwnerError ? (
                    <Alert>
                      <AlertDescription>
                        Error loading owner: {erc721OwnerError.message}
                      </AlertDescription>
                    </Alert>
                  ) : erc721Owner ? (
                    <p>Owner: {erc721Owner}</p>
                  ) : null}
                </div>
              )}
            </div>
            
            {/* Transfer */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Transfer NFT</h3>
              <div className="grid grid-cols-1 gap-2">
                <Input
                  placeholder="From address"
                  value={transferFrom}
                  onChange={(e) => setTransferFrom(e.target.value)}
                />
                <Input
                  placeholder="To address"
                  value={transferToNFT}
                  onChange={(e) => setTransferToNFT(e.target.value)}
                />
              <Input
                placeholder="Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                  type="number"
                />
                <Button 
                  onClick={handleERC721Transfer} 
                  disabled={erc721Transfer.isPending || !transferFrom || !transferToNFT || !tokenId}
                  className="w-full"
                >
                  {erc721Transfer.isPending ? 'Transferring...' : 'Transfer NFT'}
              </Button>
              </div>
            </div>
          </div>
        )}

        {contractType === 'erc1155' && (
          <div className="space-y-4">
            {/* Balance */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Your Token Balance</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Token ID"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  type="number"
                />
              </div>
              {tokenId && (
                <div>
                  {erc1155BalanceLoading ? (
                    <p>Loading balance...</p>
                  ) : erc1155BalanceError ? (
                    <Alert>
                      <AlertDescription>
                        Error loading balance: {erc1155BalanceError.message}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <p className="text-2xl font-bold">{erc1155Balance} tokens</p>
                  )}
                </div>
              )}
            </div>
            
            {/* Transfer */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Transfer Tokens</h3>
              <div className="grid grid-cols-1 gap-2">
                <Input
                  placeholder="From address"
                  value={transferFrom}
                  onChange={(e) => setTransferFrom(e.target.value)}
                />
                <Input
                  placeholder="To address"
                  value={transferToNFT}
                  onChange={(e) => setTransferToNFT(e.target.value)}
                />
              <Input
                placeholder="Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                  type="number"
                />
                <Input
                  placeholder="Amount"
                  value={transferAmount1155}
                  onChange={(e) => setTransferAmount1155(e.target.value)}
                  type="number"
                />
                <Button 
                  onClick={handleERC1155Transfer} 
                  disabled={erc1155Transfer.isPending || !transferFrom || !transferToNFT || !tokenId || !transferAmount1155}
                  className="w-full"
                >
                  {erc1155Transfer.isPending ? 'Transferring...' : 'Transfer Tokens'}
              </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};`
    }
  ]
};
export default smartContractsBlueprint;
