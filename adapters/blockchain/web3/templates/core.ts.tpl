import { 
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
export type { SupportedChain } from './config';
    },
