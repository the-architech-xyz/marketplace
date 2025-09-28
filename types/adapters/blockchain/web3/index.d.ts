/**
     * Generated TypeScript definitions for Viem Ethereum Integration
     * Generated from: adapters/blockchain/web3/adapter.json
     */

/**
     * Parameters for the Viem Ethereum Integration adapter
     */
export interface Web3BlockchainParams {
  /**
   * Supported blockchain networks
   */
  networks: Array<any>;
  /**
   * Enable WalletConnect support
   */
  walletConnect?: boolean;
  /**
   * Smart contract addresses
   */
  contracts?: Array<any>;
}

/**
     * Features for the Viem Ethereum Integration adapter
     */
export interface Web3BlockchainFeatures {
  /**
   * Deploy and interact with smart contracts
   */
  'smart-contracts'?: boolean;
  /**
   * MetaMask, WalletConnect and other wallet integrations
   */
  'wallet-integration'?: boolean;
  /**
   * Mint, transfer, and manage NFTs
   */
  'nft-management'?: boolean;
  /**
   * DEX, lending, staking and other DeFi protocols
   */
  'defi-integration'?: boolean;
}
