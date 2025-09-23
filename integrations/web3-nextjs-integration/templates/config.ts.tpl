import { createPublicClient, createWalletClient, http, type PublicClient, type WalletClient, type Address, type Hash, type Chain } from 'viem';
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
      throw new Web3Error(\