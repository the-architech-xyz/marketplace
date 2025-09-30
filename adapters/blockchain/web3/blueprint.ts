/**
 * Viem Blockchain Integration Blueprint - Minimal Base
 * 
 * Modern Web3 integration using viem for Ethereum blockchain interactions
 * Provides core utilities, configuration, and type-safe foundation
 * Advanced features are available through optional features
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const web3Blueprint: Blueprint = {
  id: 'web3-base-setup',
  name: 'Viem Base Setup',
  description: 'Core Web3 utilities and configuration using viem',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['viem@^2.0.0', '@tanstack/react-query@^5.0.0', 'zod@^3.22.0']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@types/node@^20.0.0'],
      isDev: true
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/config.ts',
      template: 'templates/config.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/core.ts',
      template: 'templates/core.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/useWeb3.ts',
      template: 'templates/useWeb3.ts.tpl'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'CHAIN_ID',
      value: '1',
      description: 'Default blockchain chain ID'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'MAINNET_RPC_URL',
      value: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
      description: 'Ethereum mainnet RPC URL'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'SEPOLIA_RPC_URL',
      value: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
      description: 'Sepolia testnet RPC URL'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'POLYGON_RPC_URL',
      value: 'https://polygon-rpc.com',
      description: 'Polygon network RPC URL'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'ARBITRUM_RPC_URL',
      value: 'https://arb1.arbitrum.io/rpc',
      description: 'Arbitrum One RPC URL'
    }
  ]
};