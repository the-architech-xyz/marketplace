/**
 * DeFi Integration Feature Blueprint
 * 
 * Modern DeFi integration using viem with type-safe contract interactions
 */

import { Blueprint } from '@thearchitech.xyz/types';

const defiIntegrationBlueprint: Blueprint = {
  id: 'web3-defi-integration',
  name: 'DeFi Integration',
  description: 'Modern DeFi integration using viem with type-safe contract interactions',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['viem@^2.0.0', '@tanstack/react-query@^5.0.0', 'zod@^3.22.0']
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/defi.ts',
      content: `import { 
  type Address, 
  type Hash, 
  type PublicClient, 
  type WalletClient,
  type Abi,
  type GetContractReturnType,
  parseUnits,
  formatUnits,
  isAddress,
  getContract
} from 'viem';
import { contractManager, ERC20_ABI } from './contracts.js';
import { Web3Error } from './core.js';
import { z } from 'zod';

// DeFi Token interfaces
export interface TokenInfo {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  price?: number;
  totalSupply?: bigint;
}

export interface SwapQuote {
  inputAmount: string;
  outputAmount: string;
  priceImpact: number;
  minimumReceived: string;
  gasEstimate: bigint;
  route: Address[];
  deadline: number;
}

export interface LiquidityPool {
  address: Address;
  token0: TokenInfo;
  token1: TokenInfo;
  fee: number;
  liquidity: bigint;
  volume24h: bigint;
  tvl: bigint;
}

export interface LendingRate {
  token: Address;
  symbol: string;
  supplyRate: number;
  borrowRate: number;
  utilizationRate: number;
  totalSupply: bigint;
  totalBorrow: bigint;
}

// Uniswap V2 Router ABI
const UNISWAP_V2_ROUTER_ABI = [
  {
    "name": "swapExactTokensForTokens",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "amountIn", "type": "uint256" },
      { "name": "amountOutMin", "type": "uint256" },
      { "name": "path", "type": "address[]" },
      { "name": "to", "type": "address" },
      { "name": "deadline", "type": "uint256" }
    ],
    "outputs": [{ "name": "amounts", "type": "uint256[]" }]
  },
  {
    "name": "getAmountsOut",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      { "name": "amountIn", "type": "uint256" },
      { "name": "path", "type": "address[]" }
    ],
    "outputs": [{ "name": "amounts", "type": "uint256[]" }]
  },
  {
    "name": "WETH",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  }
] as const;

// Uniswap V2 Factory ABI
const UNISWAP_V2_FACTORY_ABI = [
  {
    "name": "getPair",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      { "name": "tokenA", "type": "address" },
      { "name": "tokenB", "type": "address" }
    ],
    "outputs": [{ "name": "pair", "type": "address" }]
  }
] as const;

// Uniswap V2 Pair ABI
const UNISWAP_V2_PAIR_ABI = [
  {
    "name": "getReserves",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      { "name": "_reserve0", "type": "uint112" },
      { "name": "_reserve1", "type": "uint112" },
      { "name": "_blockTimestampLast", "type": "uint32" }
    ]
  },
  {
    "name": "token0",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "name": "token1",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  }
] as const;

// Validation schemas
const TokenInfoSchema = z.object({
  address: z.string().refine(isAddress, "Invalid address"),
  symbol: z.string().min(1),
  name: z.string().min(1),
  decimals: z.number().min(0).max(18),
  price: z.number().positive().optional(),
  totalSupply: z.bigint().optional()
});

const SwapQuoteSchema = z.object({
  inputAmount: z.string(),
  outputAmount: z.string(),
  priceImpact: z.number().min(0).max(100),
  minimumReceived: z.string(),
  gasEstimate: z.bigint(),
  route: z.array(z.string().refine(isAddress)),
  deadline: z.number()
});

// Modern DeFi manager using viem
export class DeFiManager {
  private publicClient: PublicClient | null = null;
  private walletClient: WalletClient | null = null;
  private routerAddress: Address = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Uniswap V2 Router
  private factoryAddress: Address = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'; // Uniswap V2 Factory

  constructor(options?: { 
    publicClient?: PublicClient; 
    walletClient?: WalletClient;
    routerAddress?: Address;
    factoryAddress?: Address;
  }) {
    this.publicClient = options?.publicClient || null;
    this.walletClient = options?.walletClient || null;
    if (options?.routerAddress) this.routerAddress = options.routerAddress;
    if (options?.factoryAddress) this.factoryAddress = options.factoryAddress;
  }

  // Set clients
  setClients(publicClient: PublicClient, walletClient?: WalletClient) {
    this.publicClient = publicClient;
    this.walletClient = walletClient || null;
  }

  /**
   * Get token information with validation
   */
  async getTokenInfo(tokenAddress: Address): Promise<TokenInfo> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const contract = contractManager.getContract(tokenAddress, ERC20_ABI);
      
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        contract.read.name(),
        contract.read.symbol(),
        contract.read.decimals(),
        contract.read.totalSupply().catch(() => 0n) // Some tokens don't have totalSupply
      ]);

      const tokenInfo: TokenInfo = {
        address: tokenAddress,
        name,
        symbol,
        decimals: Number(decimals),
        totalSupply
      };

      // Validate the token info
      return TokenInfoSchema.parse(tokenInfo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Web3Error('Invalid token data', 'INVALID_TOKEN_DATA', error);
      }
      throw new Web3Error('Failed to get token info', 'CONTRACT_ERROR', error as Error);
    }
  }

  /**
   * Get token balance
   */
  async getTokenBalance(tokenAddress: Address, walletAddress: Address): Promise<string> {
    try {
      return await contractManager.getERC20Balance(tokenAddress, walletAddress);
    } catch (error) {
      throw new Web3Error('Failed to get token balance', 'CONTRACT_ERROR', error as Error);
    }
  }

  /**
   * Get swap quote from Uniswap V2
   */
  async getSwapQuote(
    tokenIn: Address,
    tokenOut: Address,
    amountIn: string,
    slippage: number = 0.5
  ): Promise<SwapQuote> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const routerContract = getContract({
        address: this.routerAddress,
        abi: UNISWAP_V2_ROUTER_ABI,
        client: this.publicClient
      });

      // Get token decimals
      const tokenInInfo = await this.getTokenInfo(tokenIn);
      const tokenOutInfo = await this.getTokenInfo(tokenOut);
      
      // Convert amount to wei
      const amountInWei = parseUnits(amountIn, tokenInInfo.decimals);
      const path = [tokenIn, tokenOut];

      // Get amounts out
      const amounts = await routerContract.read.getAmountsOut([amountInWei, path]);
      const amountOut = amounts[1];

      // Calculate minimum received with slippage
      const minimumReceived = (amountOut * BigInt(Math.floor((100 - slippage) * 100))) / 10000n;

      // Calculate price impact (simplified)
      const priceImpact = 0.1; // In production, calculate based on reserves

      // Estimate gas
      const gasEstimate = 150000n;

      // Set deadline (20 minutes from now)
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      const quote: SwapQuote = {
        inputAmount: amountIn,
        outputAmount: formatUnits(amountOut, tokenOutInfo.decimals),
        priceImpact,
        minimumReceived: formatUnits(minimumReceived, tokenOutInfo.decimals),
        gasEstimate,
        route: path,
        deadline
      };

      return SwapQuoteSchema.parse(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Web3Error('Invalid swap quote data', 'INVALID_QUOTE_DATA', error);
      }
      throw new Web3Error('Failed to get swap quote', 'QUOTE_ERROR', error as Error);
    }
  }

  /**
   * Execute token swap
   */
  async executeSwap(
    tokenIn: Address,
    tokenOut: Address,
    amountIn: string,
    recipient: Address,
    slippage: number = 0.5
  ): Promise<Hash> {
    if (!this.walletClient) {
      throw new Web3Error('Wallet client not initialized', 'WALLET_NOT_INITIALIZED');
    }

    try {
      // Get quote first
      const quote = await this.getSwapQuote(tokenIn, tokenOut, amountIn, slippage);
      
      // Get token info
      const tokenInInfo = await this.getTokenInfo(tokenIn);
      const amountInWei = parseUnits(amountIn, tokenInInfo.decimals);
      const minimumReceivedWei = parseUnits(quote.minimumReceived, tokenInInfo.decimals);

      // Get router contract
      const routerContract = getContract({
        address: this.routerAddress,
        abi: UNISWAP_V2_ROUTER_ABI,
        client: this.walletClient
      });

      // Execute swap
      const hash = await routerContract.write.swapExactTokensForTokens([
        amountInWei,
        minimumReceivedWei,
        quote.route,
        recipient,
        BigInt(quote.deadline)
      ]);

      return hash;
    } catch (error) {
      throw new Web3Error('Failed to execute swap', 'SWAP_ERROR', error as Error);
    }
  }

  /**
   * Get liquidity pools from Uniswap V2
   */
  async getLiquidityPools(tokenPairs: Array<[Address, Address]>): Promise<LiquidityPool[]> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const factoryContract = getContract({
        address: this.factoryAddress,
        abi: UNISWAP_V2_FACTORY_ABI,
        client: this.publicClient
      });

      const pools: LiquidityPool[] = [];

      for (const [tokenA, tokenB] of tokenPairs) {
        try {
          // Get pair address
          const pairAddress = await factoryContract.read.getPair([tokenA, tokenB]);
          
          if (pairAddress === '0x0000000000000000000000000000000000000000') {
            continue; // Pair doesn't exist
          }

          // Get pair contract
          const pairContract = getContract({
            address: pairAddress,
            abi: UNISWAP_V2_PAIR_ABI,
            client: this.publicClient
          });

          // Get reserves and token info
          const [reserves, token0Address, token1Address] = await Promise.all([
            pairContract.read.getReserves(),
            pairContract.read.token0(),
            pairContract.read.token1()
          ]);

          const [token0Info, token1Info] = await Promise.all([
            this.getTokenInfo(token0Address),
            this.getTokenInfo(token1Address)
          ]);

          const [reserve0, reserve1] = reserves;
          const liquidity = reserve0 + reserve1; // Simplified liquidity calculation

          pools.push({
            address: pairAddress,
            token0: token0Info,
            token1: token1Info,
            fee: 0.3, // Uniswap V2 standard fee
            liquidity,
            volume24h: 0n, // Would need to query from subgraph
            tvl: liquidity
          });
        } catch (error) {
          console.warn('Failed to get pool info for pair:', tokenA, tokenB);
          continue;
        }
      }

      return pools;
    } catch (error) {
      throw new Web3Error('Failed to get liquidity pools', 'POOL_ERROR', error as Error);
    }
  }

  /**
   * Get lending rates (mock implementation)
   * In production, integrate with Aave, Compound, etc.
   */
  async getLendingRates(tokens: Address[]): Promise<LendingRate[]> {
    try {
      const rates: LendingRate[] = [];

      for (const token of tokens) {
        const tokenInfo = await this.getTokenInfo(token);
        
        // Mock rates - in production, query from lending protocol
        rates.push({
          token,
          symbol: tokenInfo.symbol,
          supplyRate: Math.random() * 5, // 0-5% APY
          borrowRate: Math.random() * 8 + 2, // 2-10% APY
          utilizationRate: Math.random() * 100, // 0-100%
          totalSupply: tokenInfo.totalSupply || 0n,
          totalBorrow: (tokenInfo.totalSupply || 0n) / 2n // Mock borrow amount
        });
      }

      return rates;
    } catch (error) {
      throw new Web3Error('Failed to get lending rates', 'LENDING_ERROR', error as Error);
    }
  }

  /**
   * Get WETH address
   */
  async getWETHAddress(): Promise<Address> {
    if (!this.publicClient) {
      throw new Web3Error('Public client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const routerContract = getContract({
        address: this.routerAddress,
        abi: UNISWAP_V2_ROUTER_ABI,
        client: this.publicClient
      });

      return await routerContract.read.WETH();
    } catch (error) {
      throw new Web3Error('Failed to get WETH address', 'CONTRACT_ERROR', error as Error);
    }
  }

  /**
   * Validate address
   */
  validateAddress(address: string): boolean {
    return isAddress(address);
  }

  /**
   * Format units with proper decimals
   */
  formatUnits(value: bigint, decimals: number): string {
    return formatUnits(value, decimals);
  }

  /**
   * Parse units with proper decimals
   */
  parseUnits(value: string, decimals: number): bigint {
    return parseUnits(value, decimals);
  }
}

// Global DeFi manager instance
export const defiManager = new DeFiManager();`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/web3/useDeFi.ts',
      content: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { defiManager } from '../../lib/web3/defi.js';
import { useWallet } from './useWallet.js';
import type { Address } from 'viem';

// Token Hooks
export function useTokenInfo(tokenAddress: Address) {
  return useQuery({
    queryKey: ['token-info', tokenAddress],
    queryFn: async () => {
      return await defiManager.getTokenInfo(tokenAddress);
    },
    enabled: !!tokenAddress,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTokenBalance(tokenAddress: Address, walletAddress?: Address) {
  const { account } = useWallet();
  const address = walletAddress || account;

  return useQuery({
    queryKey: ['token-balance', tokenAddress, address],
    queryFn: async () => {
      if (!address) throw new Error('Wallet address required');
      return await defiManager.getTokenBalance(tokenAddress, address);
    },
    enabled: !!address,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

// Swap Hooks
export function useSwapQuote(
  tokenIn: Address,
  tokenOut: Address,
  amountIn: string,
  slippage: number = 0.5
) {
  return useQuery({
    queryKey: ['swap-quote', tokenIn, tokenOut, amountIn, slippage],
    queryFn: async () => {
      if (!amountIn || amountIn === '0') throw new Error('Amount required');
      return await defiManager.getSwapQuote(tokenIn, tokenOut, amountIn, slippage);
    },
    enabled: !!tokenIn && !!tokenOut && !!amountIn && amountIn !== '0',
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useExecuteSwap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      tokenIn, 
      tokenOut, 
      amountIn, 
      recipient, 
      slippage = 0.5 
    }: { 
      tokenIn: Address; 
      tokenOut: Address; 
      amountIn: string; 
      recipient: Address; 
      slippage?: number; 
    }) => {
      return await defiManager.executeSwap(tokenIn, tokenOut, amountIn, recipient, slippage);
    },
    onSuccess: () => {
      // Invalidate balance queries
      queryClient.invalidateQueries({ 
        queryKey: ['token-balance'] 
      });
    },
  });
}

// Pool Hooks
export function useLiquidityPools(tokenPairs: Array<[Address, Address]>) {
  return useQuery({
    queryKey: ['liquidity-pools', tokenPairs],
    queryFn: async () => {
      return await defiManager.getLiquidityPools(tokenPairs);
    },
    enabled: tokenPairs.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Lending Hooks
export function useLendingRates(tokens: Address[]) {
  return useQuery({
    queryKey: ['lending-rates', tokens],
    queryFn: async () => {
      return await defiManager.getLendingRates(tokens);
    },
    enabled: tokens.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Utility Hooks
export function useWETHAddress() {
  return useQuery({
    queryKey: ['weth-address'],
    queryFn: async () => {
      return await defiManager.getWETHAddress();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useDeFiManager() {
  return defiManager;
}

export function useAddressValidation() {
  return {
    validateAddress: (address: string) => defiManager.validateAddress(address),
    formatUnits: (value: bigint, decimals: number) => defiManager.formatUnits(value, decimals),
    parseUnits: (value: string, decimals: number) => defiManager.parseUnits(value, decimals),
  };
}`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/DeFiDashboard.tsx',
      content: `import React, { useState } from 'react';
import { useWallet } from '../../hooks/web3/useWallet.js';
import { 
  useTokenInfo, 
  useTokenBalance, 
  useSwapQuote, 
  useExecuteSwap,
  useLiquidityPools,
  useLendingRates,
  useWETHAddress,
  useAddressValidation
} from '../../hooks/web3/useDeFi.js';
import { Button } from '../ui/button.js';
import { Input } from '../ui/input.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.js';
import { Badge } from '../ui/badge.js';
import { Alert, AlertDescription } from '../ui/alert.js';
import type { Address } from 'viem';

// Common token addresses (Ethereum mainnet)
const COMMON_TOKENS = {
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  USDC: '0xA0b86a33E6441c8C06DDD4e4c4c0B3C4F8F2E4D6',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
} as const;

export const DeFiDashboard: React.FC = () => {
  const { account, isConnected } = useWallet();
  const { validateAddress } = useAddressValidation();

  // Swap state
  const [tokenIn, setTokenIn] = useState<Address>(COMMON_TOKENS.WETH);
  const [tokenOut, setTokenOut] = useState<Address>(COMMON_TOKENS.USDC);
  const [amountIn, setAmountIn] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  // Hooks
  const { 
    data: tokenInInfo, 
    isLoading: tokenInLoading, 
    error: tokenInError 
  } = useTokenInfo(tokenIn);
  
  const { 
    data: tokenOutInfo, 
    isLoading: tokenOutLoading, 
    error: tokenOutError 
  } = useTokenInfo(tokenOut);
  
  const { 
    data: tokenInBalance, 
    isLoading: balanceLoading, 
    error: balanceError 
  } = useTokenBalance(tokenIn, account);
  
  const { 
    data: swapQuote, 
    isLoading: quoteLoading, 
    error: quoteError 
  } = useSwapQuote(tokenIn, tokenOut, amountIn, parseFloat(slippage));
  
  const executeSwap = useExecuteSwap();
  
  const { 
    data: pools, 
    isLoading: poolsLoading, 
    error: poolsError 
  } = useLiquidityPools([
    [COMMON_TOKENS.WETH, COMMON_TOKENS.USDC],
    [COMMON_TOKENS.WETH, COMMON_TOKENS.USDT],
    [COMMON_TOKENS.USDC, COMMON_TOKENS.DAI]
  ]);
  
  const { 
    data: lendingRates, 
    isLoading: ratesLoading, 
    error: ratesError 
  } = useLendingRates([
    COMMON_TOKENS.USDC,
    COMMON_TOKENS.USDT,
    COMMON_TOKENS.DAI,
    COMMON_TOKENS.WETH
  ]);
  
  const { 
    data: wethAddress, 
    isLoading: wethLoading 
  } = useWETHAddress();

  const handleSwap = async () => {
    if (!account || !swapQuote) return;

    try {
      await executeSwap.mutateAsync({
        tokenIn,
        tokenOut,
        amountIn,
        recipient: account,
        slippage: parseFloat(slippage)
      });
      
      alert('Swap executed successfully!');
      setAmountIn('');
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed. Check console for details.');
    }
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>DeFi Dashboard</CardTitle>
          <CardDescription>
            Please connect your wallet to access DeFi features
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Token Swap Section */}
      <Card>
        <CardHeader>
          <CardTitle>Token Swap</CardTitle>
          <CardDescription>
            Swap tokens using Uniswap V2
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Token Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Token In</label>
              <div className="space-y-2">
              <Input
                placeholder="Token address"
                value={tokenIn}
                  onChange={(e) => setTokenIn(e.target.value as Address)}
                />
                {tokenInInfo && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{tokenInInfo.symbol}</Badge>
                    <span className="text-sm text-gray-600">{tokenInInfo.name}</span>
                  </div>
                )}
                {tokenInBalance && (
                  <p className="text-sm text-gray-500">
                    Balance: {tokenInBalance} {tokenInInfo?.symbol}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Token Out</label>
              <div className="space-y-2">
              <Input
                placeholder="Token address"
                value={tokenOut}
                  onChange={(e) => setTokenOut(e.target.value as Address)}
                />
                {tokenOutInfo && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{tokenOutInfo.symbol}</Badge>
                    <span className="text-sm text-gray-600">{tokenOutInfo.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Amount and Slippage */}
          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount In</label>
            <Input
              placeholder="Amount to swap"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slippage (%)</label>
              <Input
                placeholder="0.5"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                type="number"
                step="0.1"
                min="0.1"
                max="50"
              />
            </div>
          </div>

          {/* Swap Quote */}
          {quoteLoading && (
            <div className="text-center py-4">
              <p>Getting quote...</p>
            </div>
          )}

          {quoteError && (
            <Alert>
              <AlertDescription>
                Error getting quote: {quoteError.message}
              </AlertDescription>
            </Alert>
          )}

          {swapQuote && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <h3 className="font-semibold">Swap Quote</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Output Amount:</span>
                <span className="font-mono">{swapQuote.outputAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Received:</span>
                <span className="font-mono">{swapQuote.minimumReceived}</span>
              </div>
              <div className="flex justify-between">
                <span>Price Impact:</span>
                <span>{swapQuote.priceImpact}%</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Estimate:</span>
                  <span>{swapQuote.gasEstimate.toString()}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleSwap} 
                disabled={executeSwap.isPending || !amountIn}
                className="w-full"
              >
                {executeSwap.isPending ? 'Swapping...' : 'Execute Swap'}
              </Button>
            </div>
          )}

          {/* Common Tokens */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Common Tokens</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(COMMON_TOKENS).map(([symbol, address]) => (
                <Button
                  key={symbol}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (tokenIn === address) {
                      setTokenOut(address);
                    } else {
                      setTokenIn(address);
                    }
                  }}
                >
                  {symbol}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liquidity Pools */}
      <Card>
        <CardHeader>
          <CardTitle>Liquidity Pools</CardTitle>
          <CardDescription>
            Available Uniswap V2 liquidity pools
          </CardDescription>
        </CardHeader>
        <CardContent>
          {poolsLoading ? (
            <div className="text-center py-4">
              <p>Loading pools...</p>
            </div>
          ) : poolsError ? (
            <Alert>
              <AlertDescription>
                Error loading pools: {poolsError.message}
              </AlertDescription>
            </Alert>
          ) : pools && pools.length > 0 ? (
          <div className="space-y-4">
            {pools.map((pool, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">
                    {pool.token0.symbol} / {pool.token1.symbol}
                  </h3>
                    <Badge variant="outline">{pool.fee}% fee</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">TVL:</span>
                      <span className="ml-2 font-mono">
                        {pool.tvl.toString()}
                      </span>
                    </div>
                  <div>
                    <span className="text-gray-500">Liquidity:</span>
                      <span className="ml-2 font-mono">
                        {pool.liquidity.toString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No pools found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lending Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Lending Rates</CardTitle>
          <CardDescription>
            Current lending and borrowing rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ratesLoading ? (
            <div className="text-center py-4">
              <p>Loading rates...</p>
            </div>
          ) : ratesError ? (
            <Alert>
              <AlertDescription>
                Error loading rates: {ratesError.message}
              </AlertDescription>
            </Alert>
          ) : lendingRates && lendingRates.length > 0 ? (
            <div className="space-y-4">
              {lendingRates.map((rate, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{rate.symbol}</h3>
                    <Badge variant="secondary">
                      {rate.utilizationRate.toFixed(1)}% utilized
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Supply Rate:</span>
                      <span className="ml-2 font-mono text-green-600">
                        {rate.supplyRate.toFixed(2)}% APY
                      </span>
                  </div>
                  <div>
                      <span className="text-gray-500">Borrow Rate:</span>
                      <span className="ml-2 font-mono text-red-600">
                        {rate.borrowRate.toFixed(2)}% APY
                      </span>
                    </div>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No rates available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};`
    }
  ]
};
export default defiIntegrationBlueprint;
