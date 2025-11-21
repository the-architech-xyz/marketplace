/**
 * Web3 Frontend Implementation: Shadcn/ui
 * 
 * Web3 wallet connection and basic blockchain interaction
 * Uses template-based component generation for maintainability
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/web3/shadcn'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (features.transactionHistory) {
    actions.push(...generateTransactionHistoryActions());
  }
  
  if (features.nftGallery) {
    actions.push(...generateNFTGalleryActions());
  }
  
  if (features.defiIntegration) {
    actions.push(...generateDeFiIntegrationActions());
  }
  
  if (features.stakingInterface) {
    actions.push(...generateStakingInterfaceActions());
  }
  
  return actions;
}

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'wagmi@^1.4.0',
        '@rainbow-me/rainbowkit@^1.3.0',
        '@tanstack/react-query@^5.0.0',
        'ethers@^6.0.0',
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4',
        'date-fns@^2.30.0',
        'lucide-react@^0.294.0'
      ]
    },

    // Core Web3 components (only existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}web3/WalletConnection.tsx',
      template: 'templates/WalletConnection.tsx.tpl',
      context: { 
        features: ['core'],
        hasWalletConnection: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}web3/WalletConnect.tsx',
      template: 'templates/WalletConnect.tsx.tpl',
      context: { 
        features: ['core'],
        hasWalletConnection: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

function generateTransactionHistoryActions(): BlueprintAction[] {
  return [
    // TODO: Create transaction history templates when feature is implemented
  ];
}

function generateNFTGalleryActions(): BlueprintAction[] {
  return [
    // TODO: Create NFT gallery templates when feature is implemented
  ];
}

function generateDeFiIntegrationActions(): BlueprintAction[] {
  return [
    // TODO: Create DeFi integration templates when feature is implemented
  ];
}

function generateStakingInterfaceActions(): BlueprintAction[] {
  return [
    // TODO: Create staking interface templates when feature is implemented
  ];
}