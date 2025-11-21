/**
 * Viem Blockchain Integration Blueprint - Minimal Base
 * 
 * Modern Web3 integration using viem for Ethereum blockchain interactions
 * Provides core utilities, configuration, and type-safe foundation
 * Advanced features are available through optional features
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'blockchain/web3'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}web3/core.ts',
      template: 'templates/core.ts.tpl',
      
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.hooks}useWeb3.ts',
      template: 'templates/useWeb3.ts.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'CHAIN_ID',
      value: '1',
      description: 'Default blockchain chain ID'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'MAINNET_RPC_URL',
      value: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
      description: 'Ethereum mainnet RPC URL'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'SEPOLIA_RPC_URL',
      value: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
      description: 'Sepolia testnet RPC URL'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'POLYGON_RPC_URL',
      value: 'https://polygon-rpc.com',
      description: 'Polygon network RPC URL'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'ARBITRUM_RPC_URL',
      value: 'https://arb1.arbitrum.io/rpc',
      description: 'Arbitrum One RPC URL'
    }
  ]
};