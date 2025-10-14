/**
 * Web3 Feature (Shadcn)
 * 
 * Complete Web3 wallet connection and blockchain interaction UI using Shadcn components
 */

export interface FeaturesWeb3ShadcnParams {
  /** Constitutional Architecture features configuration */
  features?: {

    /** Enable wallet connection UI */
    walletConnect?: boolean;

    /** Enable network switching UI */
    networkSwitch?: boolean;

    /** Enable transaction history UI */
    transactionHistory?: boolean;

    /** Enable token balances UI */
    tokenBalances?: boolean;

    /** Enable NFT gallery UI */
    nftGallery?: boolean;

    /** Enable wallet connection UI */
    walletConnection?: boolean;

    /** Enable DeFi integration UI */
    defiIntegration?: boolean;

    /** Enable staking interface UI */
    stakingInterface?: boolean;
  };

  /** UI theme variant */
  theme?: string;
}

export interface FeaturesWeb3ShadcnFeatures {

  /** Enable wallet connection UI */
  walletConnect: boolean;

  /** Enable network switching UI */
  networkSwitch: boolean;

  /** Enable transaction history UI */
  transactionHistory: boolean;

  /** Enable token balances UI */
  tokenBalances: boolean;

  /** Enable NFT gallery UI */
  nftGallery: boolean;

  /** Enable wallet connection UI */
  walletConnection: boolean;

  /** Enable DeFi integration UI */
  defiIntegration: boolean;

  /** Enable staking interface UI */
  stakingInterface: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const FeaturesWeb3ShadcnArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type FeaturesWeb3ShadcnCreates = typeof FeaturesWeb3ShadcnArtifacts.creates[number];
export type FeaturesWeb3ShadcnEnhances = typeof FeaturesWeb3ShadcnArtifacts.enhances[number];
