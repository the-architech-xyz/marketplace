import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'web3-nextjs-integration',
  name: 'Web3 Next.js Integration',
  description: 'Modern Web3 integration for Next.js using viem with standardized TanStack Query hooks',
  version: '3.0.0',
  actions: [
    // Install modern Web3 dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['viem', '@tanstack/react-query', 'zod', '@tanstack/react-query-devtools']
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@types/node'],
      isDev: true
    },
    
    // Create standardized Web3 hooks (REVOLUTIONARY!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-web3.ts',
      template: 'templates/use-web3.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-connect.ts',
      template: 'templates/use-connect.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-disconnect.ts',
      template: 'templates/use-disconnect.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-balance.ts',
      template: 'templates/use-balance.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-transaction.ts',
      template: 'templates/use-transaction.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-network.ts',
      template: 'templates/use-network.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create Web3 API service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/web3/api.ts',
      template: 'templates/web3-api.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/web3/types.ts',
      template: 'templates/web3-types.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create modern Web3 configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/web3/config.ts', 
      template: 'templates/config.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create modern Web3 core utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/web3/core.ts',
      template: 'templates/core.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create modern React hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/useWeb3.ts',
      template: 'templates/useWeb3.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create API route for balance
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/web3/balance/route.ts',
      template: 'templates/route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create middleware
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/middleware.ts',
      template: 'templates/middleware.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }}
  ]
};
