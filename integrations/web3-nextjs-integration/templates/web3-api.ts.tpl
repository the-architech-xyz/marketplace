/**
 * Web3 API Service
 * 
 * Standardized API service for Web3 integration
 * Provides consistent interface for all blockchain operations
 */

import type { 
  Web3Config, 
  Web3Status, 
  WalletInfo,
  ConnectOptions,
  Balance,
  TokenBalance,
  BalanceFilter,
  Transaction,
  TransactionOptions,
  Network,
  Token
} from './types';

const WEB3_API_BASE = process.env.NEXT_PUBLIC_WEB3_API_BASE || '/api/web3';

class Web3ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${WEB3_API_BASE}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Web3 API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Configuration API
  async getConfig(): Promise<Web3Config> {
    return this.request<Web3Config>('/config');
  }

  async getStatus(): Promise<Web3Status> {
    return this.request<Web3Status>('/status');
  }

  async getWalletInfo(): Promise<WalletInfo | null> {
    return this.request<WalletInfo | null>('/wallet');
  }

  // Connection API
  async connectWallet(options?: ConnectOptions): Promise<WalletInfo> {
    return this.request<WalletInfo>('/connect', {
      method: 'POST',
      body: JSON.stringify(options || {}),
    });
  }

  async connectWithWallet(walletType: string, options?: ConnectOptions): Promise<WalletInfo> {
    return this.request<WalletInfo>('/connect', {
      method: 'POST',
      body: JSON.stringify({ walletType, ...options }),
    });
  }

  async disconnectWallet(): Promise<void> {
    await this.request<void>('/disconnect', {
      method: 'POST',
    });
  }

  async switchNetwork(chainId: number): Promise<void> {
    await this.request<void>('/network/switch', {
      method: 'POST',
      body: JSON.stringify({ chainId }),
    });
  }

  async addNetwork(network: Network): Promise<void> {
    await this.request<void>('/network/add', {
      method: 'POST',
      body: JSON.stringify(network),
    });
  }

  async requestPermissions(permissions: string[]): Promise<void> {
    await this.request<void>('/permissions', {
      method: 'POST',
      body: JSON.stringify({ permissions }),
    });
  }

  async isWalletInstalled(walletType: string): Promise<boolean> {
    return this.request<boolean>(`/wallet/installed/${walletType}`);
  }

  async getAvailableWallets(): Promise<string[]> {
    return this.request<string[]>('/wallets');
  }

  async getConnectionStatus(): Promise<{ isConnected: boolean; walletType?: string }> {
    return this.request<{ isConnected: boolean; walletType?: string }>('/connection-status');
  }

  // Balance API
  async getBalance(address?: string): Promise<Balance> {
    const params = address ? `?address=${address}` : '';
    return this.request<Balance>(`/balance${params}`);
  }

  async getTokenBalance(address?: string, tokenAddress?: string): Promise<TokenBalance> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (tokenAddress) params.append('token', tokenAddress);
    
    return this.request<TokenBalance>(`/balance/token?${params}`);
  }

  async getTokenBalances(address?: string, filters?: BalanceFilter): Promise<TokenBalance[]> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (filters?.tokens) params.append('tokens', filters.tokens.join(','));
    if (filters?.minValue) params.append('minValue', filters.minValue.toString());
    
    return this.request<TokenBalance[]>(`/balance/tokens?${params}`);
  }

  async getBalanceHistory(address?: string, timeRange?: string): Promise<Balance[]> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<Balance[]>(`/balance/history?${params}`);
  }

  async getBalanceSummary(address?: string): Promise<any> {
    const params = address ? `?address=${address}` : '';
    return this.request<any>(`/balance/summary${params}`);
  }

  async getPortfolioValue(address?: string): Promise<number> {
    const params = address ? `?address=${address}` : '';
    return this.request<number>(`/portfolio/value${params}`);
  }

  async getPortfolioPerformance(address?: string, timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/portfolio/performance?${params}`);
  }

  async getBalanceAlerts(address?: string): Promise<any[]> {
    const params = address ? `?address=${address}` : '';
    return this.request<any[]>(`/balance/alerts${params}`);
  }

  async createBalanceAlert(alert: any): Promise<any> {
    return this.request<any>('/balance/alerts', {
      method: 'POST',
      body: JSON.stringify(alert),
    });
  }

  async getBalanceInsights(address?: string): Promise<any> {
    const params = address ? `?address=${address}` : '';
    return this.request<any>(`/balance/insights${params}`);
  }

  async getBalanceTrends(address?: string, timeRange?: string): Promise<any> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<any>(`/balance/trends?${params}`);
  }

  // Transaction API
  async getTransactions(address?: string, filters?: any): Promise<Transaction[]> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());
    if (filters?.type) params.append('type', filters.type);
    
    return this.request<Transaction[]>(`/transactions?${params}`);
  }

  async getTransaction(hash: string): Promise<Transaction> {
    return this.request<Transaction>(`/transactions/${hash}`);
  }

  async sendTransaction(transaction: TransactionOptions): Promise<Transaction> {
    return this.request<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  async estimateGas(transaction: Partial<TransactionOptions>): Promise<bigint> {
    return this.request<bigint>('/transactions/estimate-gas', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  async getTransactionStatus(hash: string): Promise<{ status: string; confirmations: number }> {
    return this.request<{ status: string; confirmations: number }>(`/transactions/${hash}/status`);
  }

  async getTransactionHistory(address?: string, timeRange?: string): Promise<Transaction[]> {
    const params = new URLSearchParams();
    if (address) params.append('address', address);
    if (timeRange) params.append('timeRange', timeRange);
    
    return this.request<Transaction[]>(`/transactions/history?${params}`);
  }

  // Network API
  async getNetworks(): Promise<Network[]> {
    return this.request<Network[]>('/networks');
  }

  async getCurrentNetwork(): Promise<Network> {
    return this.request<Network>('/network/current');
  }

  async getNetworkInfo(chainId: number): Promise<Network> {
    return this.request<Network>(`/network/${chainId}`);
  }

  // Token API
  async getTokens(): Promise<Token[]> {
    return this.request<Token[]>('/tokens');
  }

  async getTokenInfo(address: string): Promise<Token> {
    return this.request<Token>(`/tokens/${address}`);
  }

  async searchTokens(query: string): Promise<Token[]> {
    return this.request<Token[]>(`/tokens/search?q=${encodeURIComponent(query)}`);
  }

  async getTokenPrice(address: string): Promise<number> {
    return this.request<number>(`/tokens/${address}/price`);
  }

  async getTokenPrices(addresses: string[]): Promise<Record<string, number>> {
    return this.request<Record<string, number>>('/tokens/prices', {
      method: 'POST',
      body: JSON.stringify({ addresses }),
    });
  }
}

export const web3Api = new Web3ApiService();
