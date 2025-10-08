/**
 * NFT Management Feature Blueprint
 * 
 * Modern NFT management using viem with type-safe contract interactions
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/marketplace/types';

const nftManagementBlueprint: Blueprint = {
  id: 'web3-nft-management',
  name: 'NFT Management',
  description: 'Modern NFT management using viem with type-safe contract interactions',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['viem@^2.0.0', '@tanstack/react-query@^5.0.0']
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/web3/nft.ts',
      content: `import { 
  type Address, 
  type Hash, 
  type PublicClient, 
  type WalletClient,
  type Abi,
  type GetContractReturnType,
  isAddress
} from 'viem';
import { contractManager, ERC721_ABI, ERC1155_ABI } from './contracts';
import { Web3Error } from './core';

// NFT Metadata interfaces
export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  background_color?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
    display_type?: string;
    max_value?: number;
  }>;
  properties?: Record<string, any>;
}

export interface NFTToken {
  tokenId: bigint;
  owner: Address;
  metadata?: NFTMetadata;
  contractAddress: Address;
  tokenURI?: string;
}

export interface NFTCollection {
  address: Address;
  name: string;
  symbol: string;
  totalSupply?: bigint;
  contractType: 'ERC721' | 'ERC1155';
}

// Mint function ABI for ERC721
const MINT_ABI = [
  {
    "name": "mint",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "tokenURI", "type": "string" }
    ],
    "outputs": [{ "name": "tokenId", "type": "uint256" }]
  }
] as const;

// Mint function ABI for ERC1155
const MINT_BATCH_ABI = [
  {
    "name": "mintBatch",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "ids", "type": "uint256[]" },
      { "name": "amounts", "type": "uint256[]" },
      { "name": "data", "type": "bytes" }
    ],
    "outputs": []
  }
] as const;

// Modern NFT manager using viem
export class NFTManager {
  private publicClient: PublicClient | null = null;
  private walletClient: WalletClient | null = null;

  constructor(options?: { publicClient?: PublicClient; walletClient?: WalletClient }) {
    this.publicClient = options?.publicClient || null;
    this.walletClient = options?.walletClient || null;
  }

  // Set clients
  setClients(publicClient: PublicClient, walletClient?: WalletClient) {
    this.publicClient = publicClient;
    this.walletClient = walletClient || null;
  }

  /**
   * Get NFT metadata from IPFS or HTTP URL
   */
  async getNFTMetadata(tokenURI: string): Promise<NFTMetadata> {
    try {
      // Handle IPFS URLs
      const url = tokenURI.startsWith('ipfs://') 
        ? tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
        : tokenURI;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Web3Error('Failed to fetch NFT metadata', 'METADATA_FETCH_ERROR');
      }
      
      const metadata = await response.json();
      
      // Validate required fields
      if (!metadata.name) {
        throw new Web3Error('Invalid metadata: missing name field', 'INVALID_METADATA');
      }
      
      return metadata as NFTMetadata;
    } catch (error) {
      if (error instanceof Web3Error) throw error;
      throw new Web3Error('Error fetching NFT metadata', 'METADATA_FETCH_ERROR', error as Error);
    }
  }

  /**
   * Get NFT collection information
   */
  async getCollectionInfo(contractAddress: Address): Promise<NFTCollection> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const contract = contractManager.getContract(contractAddress, ERC721_ABI);
      
      const [name, symbol] = await Promise.all([
        contract.read.name(),
        contract.read.symbol()
      ]);

      // Try to get total supply (not all contracts have this)
      let totalSupply: bigint | undefined;
      try {
        totalSupply = await contract.read.totalSupply();
      } catch {
        // Contract doesn't have totalSupply function
        totalSupply = undefined;
      }

      return {
        address: contractAddress,
        name,
        symbol,
        totalSupply,
        contractType: 'ERC721'
      };
    } catch (error) {
      throw new Web3Error('Failed to get collection info', 'CONTRACT_ERROR', error as Error);
    }
  }

  /**
   * Get NFT token information
   */
  async getNFTToken(
    contractAddress: Address, 
    tokenId: bigint, 
    ownerAddress?: Address
  ): Promise<NFTToken> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const contract = contractManager.getContract(contractAddress, ERC721_ABI);
      
      const [owner, tokenURI] = await Promise.all([
        contract.read.ownerOf([tokenId]),
        contract.read.tokenURI([tokenId])
      ]);

            let metadata: NFTMetadata | undefined;
            try {
              metadata = await this.getNFTMetadata(tokenURI);
            } catch (error) {
        console.warn('Failed to fetch metadata for token', tokenId.toString());
            }

      return {
              tokenId,
              owner,
              metadata,
        contractAddress,
        tokenURI
      };
    } catch (error) {
      throw new Web3Error('Failed to get NFT token', 'CONTRACT_ERROR', error as Error);
    }
  }

  /**
   * Get all NFTs owned by an address (simplified version)
   * Note: In production, you'd use an indexing service like The Graph
   */
  async getOwnedNFTs(
    contractAddress: Address, 
    ownerAddress: Address,
    limit: number = 50
  ): Promise<NFTToken[]> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const balance = await contractManager.getERC721Balance(contractAddress, ownerAddress);
      const nfts: NFTToken[] = [];

      // This is a simplified approach - in production, use events or indexing
      const maxTokens = Math.min(Number(balance), limit);
      
      for (let i = 0; i < maxTokens; i++) {
        try {
          const tokenId = BigInt(i);
          const nft = await this.getNFTToken(contractAddress, tokenId, ownerAddress);
          
          if (nft.owner.toLowerCase() === ownerAddress.toLowerCase()) {
            nfts.push(nft);
          }
        } catch (error) {
          // Token might not exist, continue
          continue;
        }
      }

      return nfts;
    } catch (error) {
      throw new Web3Error('Failed to get owned NFTs', 'CONTRACT_ERROR', error as Error);
    }
  }

  /**
   * Transfer ERC721 NFT
   */
  async transferERC721(
    contractAddress: Address,
    from: Address,
    to: Address,
    tokenId: bigint
  ): Promise<Hash> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet client not initialized', 'WALLET_NOT_INITIALIZED');
    }

    try {
      return await contractManager.transferERC721(contractAddress, from, to, tokenId);
    } catch (error) {
      throw new Web3Error('Failed to transfer ERC721 NFT', 'TRANSFER_ERROR', error as Error);
    }
  }

  /**
   * Transfer ERC1155 NFT
   */
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
      return await contractManager.transferERC1155(contractAddress, from, to, tokenId, amount, data);
    } catch (error) {
      throw new Web3Error('Failed to transfer ERC1155 NFT', 'TRANSFER_ERROR', error as Error);
    }
  }

  /**
   * Mint ERC721 NFT (requires contract with mint function)
   */
  async mintERC721(
    contractAddress: Address,
    to: Address,
    tokenURI: string
  ): Promise<Hash> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet client not initialized', 'WALLET_NOT_INITIALIZED');
    }

    try {
      const contract = contractManager.getWalletContract(contractAddress, MINT_ABI);
      const hash = await contract.write.mint([to, tokenURI]);
      return hash;
    } catch (error) {
      throw new Web3Error('Failed to mint ERC721 NFT', 'MINT_ERROR', error as Error);
    }
  }

  /**
   * Mint ERC1155 NFT batch (requires contract with mintBatch function)
   */
  async mintERC1155Batch(
    contractAddress: Address,
    to: Address,
    tokenIds: bigint[],
    amounts: bigint[],
    data: \`0x\${string}\` = '0x'
  ): Promise<Hash> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet client not initialized', 'WALLET_NOT_INITIALIZED');
    }

    try {
      const contract = contractManager.getWalletContract(contractAddress, MINT_BATCH_ABI);
      const hash = await contract.write.mintBatch([to, tokenIds, amounts, data]);
      return hash;
    } catch (error) {
      throw new Web3Error('Failed to mint ERC1155 batch', 'MINT_ERROR', error as Error);
    }
  }

  /**
   * Check if address is valid
   */
  validateAddress(address: string): boolean {
    return isAddress(address);
  }

  /**
   * Get contract type (ERC721 or ERC1155)
   */
  async getContractType(contractAddress: Address): Promise<'ERC721' | 'ERC1155'> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      // Try ERC721 first
      const erc721Contract = contractManager.getContract(contractAddress, ERC721_ABI);
      await erc721Contract.read.name();
      return 'ERC721';
    } catch {
      try {
        // Try ERC1155
        const erc1155Contract = contractManager.getContract(contractAddress, ERC1155_ABI);
        await erc1155Contract.read.uri([0n]);
        return 'ERC1155';
      } catch {
        throw new Web3Error('Contract is not a recognized NFT standard', 'INVALID_CONTRACT');
      }
    }
  }
}

// Global NFT manager instance
export const nftManager = new NFTManager();`
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/web3/useNFT.ts',
      content: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import.*';
import { useWallet } from './useWallet';
import type { Address } from 'viem';

// NFT Collection Hooks
export function useNFTCollection(contractAddress: Address) {
  return useQuery({
    queryKey: ['nft-collection', contractAddress],
    queryFn: async () => {
      return await nftManager.getCollectionInfo(contractAddress);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useNFTToken(contractAddress: Address, tokenId: bigint) {
  return useQuery({
    queryKey: ['nft-token', contractAddress, tokenId],
    queryFn: async () => {
      return await nftManager.getNFTToken(contractAddress, tokenId);
    },
    enabled: !!tokenId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useOwnedNFTs(contractAddress: Address, ownerAddress?: Address, limit: number = 50) {
  const { account } = useWallet();
  const address = ownerAddress || account;

  return useQuery({
    queryKey: ['owned-nfts', contractAddress, address, limit],
    queryFn: async () => {
      if (!address) throw new Error('Owner address required');
      return await nftManager.getOwnedNFTs(contractAddress, address, limit);
    },
    enabled: !!address,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// NFT Transfer Hooks
export function useERC721Transfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      contractAddress, 
      from, 
      to, 
      tokenId 
    }: { 
      contractAddress: Address; 
      from: Address; 
      to: Address; 
      tokenId: bigint; 
    }) => {
      return await nftManager.transferERC721(contractAddress, from, to, tokenId);
    },
    onSuccess: (_, variables) => {
      // Invalidate owned NFTs queries
      queryClient.invalidateQueries({ 
        queryKey: ['owned-nfts', variables.contractAddress] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ['nft-token', variables.contractAddress, variables.tokenId] 
      });
    },
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
      return await nftManager.transferERC1155(contractAddress, from, to, tokenId, amount, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate owned NFTs queries
      queryClient.invalidateQueries({ 
        queryKey: ['owned-nfts', variables.contractAddress] 
      });
    },
  });
}

// NFT Minting Hooks
export function useERC721Mint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      contractAddress, 
      to, 
      tokenURI 
    }: { 
      contractAddress: Address; 
      to: Address; 
      tokenURI: string; 
    }) => {
      return await nftManager.mintERC721(contractAddress, to, tokenURI);
    },
    onSuccess: (_, variables) => {
      // Invalidate owned NFTs queries
      queryClient.invalidateQueries({ 
        queryKey: ['owned-nfts', variables.contractAddress] 
      });
    },
  });
}

export function useERC1155MintBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      contractAddress, 
      to, 
      tokenIds, 
      amounts, 
      data = '0x' 
    }: { 
      contractAddress: Address; 
      to: Address; 
      tokenIds: bigint[]; 
      amounts: bigint[]; 
      data?: \`0x\${string}\`; 
    }) => {
      return await nftManager.mintERC1155Batch(contractAddress, to, tokenIds, amounts, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate owned NFTs queries
      queryClient.invalidateQueries({ 
        queryKey: ['owned-nfts', variables.contractAddress] 
      });
    },
  });
}

// Utility Hooks
export function useNFTManager() {
  return nftManager;
}

export function useContractType(contractAddress: Address) {
  return useQuery({
    queryKey: ['contract-type', contractAddress],
    queryFn: async () => {
      return await nftManager.getContractType(contractAddress);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}`
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/web3/NFTGallery.tsx',
      content: `import React, { useState } from 'react';
import.*';
import { 
  useNFTCollection, 
  useOwnedNFTs, 
  useERC721Transfer, 
  useERC1155Transfer,
  useContractType 
} from '../../hooks/web3/useNFT.js';
import.*';
import.*';
import.*';
import.*';
import.*';
import type { Address } from 'viem';

interface NFTGalleryProps {
  contractAddress: Address;
}

export const NFTGallery: React.FC<NFTGalleryProps> = ({ contractAddress }) => {
  const { account, isConnected } = useWallet();
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('1');
  const [selectedTokenId, setSelectedTokenId] = useState<string>('');

  // Hooks
  const { 
    data: collection, 
    isLoading: collectionLoading, 
    error: collectionError 
  } = useNFTCollection(contractAddress);
  
  const { 
    data: nfts, 
    isLoading: nftsLoading, 
    error: nftsError,
    refetch: refetchNFTs
  } = useOwnedNFTs(contractAddress, account);
  
  const { 
    data: contractType, 
    isLoading: contractTypeLoading 
  } = useContractType(contractAddress);
  
  const erc721Transfer = useERC721Transfer();
  const erc1155Transfer = useERC1155Transfer();

  const handleTransfer = async (tokenId: bigint) => {
    if (!account || !transferTo) return;

    try {
      if (contractType === 'ERC721') {
        await erc721Transfer.mutateAsync({
          contractAddress,
          from: account,
          to: transferTo as Address,
          tokenId
        });
      } else if (contractType === 'ERC1155') {
        await erc1155Transfer.mutateAsync({
          contractAddress,
          from: account,
          to: transferTo as Address,
          tokenId,
          amount: BigInt(transferAmount)
        });
      }
      
      alert('Transfer successful!');
      setTransferTo('');
      setTransferAmount('1');
      setSelectedTokenId('');
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed. Check console for details.');
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>NFT Gallery</CardTitle>
          <CardDescription>
            Please connect your wallet to view NFTs
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>NFT Gallery</CardTitle>
        <CardDescription>
          {collectionLoading ? (
            'Loading collection info...'
          ) : collectionError ? (
            'Failed to load collection info'
          ) : collection ? (
            \`\${collection.name} (\${collection.symbol})\`
          ) : (
            'Unknown Collection'
          )}
        </CardDescription>
        {contractType && (
          <div className="flex gap-2">
            <Badge variant="outline">{contractType}</Badge>
            {collection?.totalSupply && (
              <Badge variant="secondary">
                Total Supply: {collection.totalSupply.toString()}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Transfer Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Transfer NFT</h3>
          <div className="grid grid-cols-1 gap-2">
            <Input
              placeholder="Recipient address"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
            />
            {contractType === 'ERC1155' && (
              <Input
                placeholder="Amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                type="number"
                min="1"
              />
            )}
            <Input
              placeholder="Token ID"
              value={selectedTokenId}
              onChange={(e) => setSelectedTokenId(e.target.value)}
              type="number"
            />
            <Button 
              onClick={() => {
                if (selectedTokenId) {
                  handleTransfer(BigInt(selectedTokenId));
                }
              }}
              disabled={
                !transferTo || 
                !selectedTokenId || 
                erc721Transfer.isPending || 
                erc1155Transfer.isPending
              }
              className="w-full"
            >
              {(erc721Transfer.isPending || erc1155Transfer.isPending) 
                ? 'Transferring...' 
                : 'Transfer NFT'
              }
            </Button>
          </div>
        </div>

        {/* Refresh Button */}
        <Button onClick={() => refetchNFTs()} disabled={nftsLoading} className="w-full">
          {nftsLoading ? 'Loading...' : 'Refresh NFTs'}
        </Button>

        {/* Error Display */}
        {nftsError && (
          <Alert>
            <AlertDescription>
              Error loading NFTs: {nftsError.message}
            </AlertDescription>
          </Alert>
        )}

        {/* NFT Grid */}
        {nfts && nfts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfts.map((nft) => (
              <Card key={nft.tokenId.toString()} className="overflow-hidden">
                {nft.metadata?.image && (
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={nft.metadata.image}
                      alt={nft.metadata.name || \`NFT #\${nft.tokenId}\`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">
                    {nft.metadata?.name || \`NFT #\${nft.tokenId}\`}
                  </h3>
                  {nft.metadata?.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {nft.metadata.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      Token ID: {nft.tokenId.toString()}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {contractType}
                    </Badge>
                  </div>
                  
                  {nft.metadata?.attributes && nft.metadata.attributes.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-2">Attributes</h4>
                      <div className="flex flex-wrap gap-1">
                        {nft.metadata.attributes.slice(0, 3).map((attr, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {attr.trait_type}: {attr.value}
                          </Badge>
                        ))}
                        {nft.metadata.attributes.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{nft.metadata.attributes.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {nfts && nfts.length === 0 && !nftsLoading && (
          <div className="text-center py-8 text-gray-500">
            <p>No NFTs found in this collection.</p>
            <p className="text-sm mt-1">Make sure you own NFTs from this contract.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};`
    }
  ]
};
export default nftManagementBlueprint;

