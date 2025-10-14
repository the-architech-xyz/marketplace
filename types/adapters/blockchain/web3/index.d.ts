/**
 * Viem Ethereum Integration
 * 
 * Modern, type-safe Web3 integration using viem for Ethereum blockchain interactions
 */

export interface BlockchainWeb3Params {

  /** Supported blockchain networks */
  networks?: string[];

  /** Enable WalletConnect support */
  walletConnect?: boolean;

  /** Smart contract addresses */
  contracts?: string[];
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable wallet connection */
    walletConnect?: boolean;

    /** Enable smart contract interactions */
    smartContracts?: boolean;

    /** Enable transaction management */
    transactions?: boolean;

    /** Enable blockchain event listening */
    events?: boolean;

    /** Enable ENS name resolution */
    ens?: boolean;

    /** Enable NFT functionality */
    nft?: boolean;
  };
}

export interface BlockchainWeb3Features {

  /** Enable wallet connection */
  walletConnect: boolean;

  /** Enable smart contract interactions */
  smartContracts: boolean;

  /** Enable transaction management */
  transactions: boolean;

  /** Enable blockchain event listening */
  events: boolean;

  /** Enable ENS name resolution */
  ens: boolean;

  /** Enable NFT functionality */
  nft: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const BlockchainWeb3Artifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type BlockchainWeb3Creates = typeof BlockchainWeb3Artifacts.creates[number];
export type BlockchainWeb3Enhances = typeof BlockchainWeb3Artifacts.enhances[number];
