export const web3Utils = {
  formatAddress: (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },

  formatBalance: (balance: string, decimals: number = 18) => {
    const num = parseFloat(balance) / Math.pow(10, decimals);
    return num.toFixed(4);
  },

  formatTokenAmount: (amount: string, symbol: string, decimals: number = 18) => {
    const num = parseFloat(amount) / Math.pow(10, decimals);
    return `${num.toFixed(4)} ${symbol}`;
  },

  getNetworkName: (chainId: number) => {
    const networks: Record<number, string> = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon',
      80001: 'Mumbai Testnet',
      56: 'BSC',
      97: 'BSC Testnet',
    };
    return networks[chainId] || `Chain ${chainId}`;
  },

  getNetworkColor: (chainId: number) => {
    const colors: Record<number, string> = {
      1: 'text-blue-600 bg-blue-50',
      5: 'text-yellow-600 bg-yellow-50',
      11155111: 'text-purple-600 bg-purple-50',
      137: 'text-purple-600 bg-purple-50',
      80001: 'text-pink-600 bg-pink-50',
      56: 'text-yellow-600 bg-yellow-50',
      97: 'text-orange-600 bg-orange-50',
    };
    return colors[chainId] || 'text-gray-600 bg-gray-50';
  },

  getTransactionStatusColor: (status: string) => {
    const statusColors: Record<string, string> = {
      pending: 'text-yellow-600 bg-yellow-50',
      confirmed: 'text-green-600 bg-green-50',
      failed: 'text-red-600 bg-red-50',
      cancelled: 'text-gray-600 bg-gray-50',
    };
    return statusColors[status] || 'text-gray-600 bg-gray-50';
  },
};

export const web3Components = {
  card: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
  header: 'text-lg font-semibold text-gray-900 mb-4',
  content: 'text-gray-600 mb-4',
  button: 'inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors',
  status: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  address: 'font-mono text-sm bg-gray-100 px-2 py-1 rounded',
};
