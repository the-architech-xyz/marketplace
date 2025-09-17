/**
 * Web3 Shadcn Integration Blueprint
 * 
 * Pre-built Shadcn UI components for Web3 functionality
 */

import { Blueprint } from '@thearchitech.xyz/types';

const web3ShadcnIntegrationBlueprint: Blueprint = {
  id: 'web3-shadcn-integration',
  name: 'Web3 Shadcn Integration',
  description: 'Pre-built Shadcn UI components for Web3 functionality',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@radix-ui/react-dialog@^1.0.5',
        '@radix-ui/react-dropdown-menu@^2.0.6',
        '@radix-ui/react-tabs@^1.0.4',
        '@radix-ui/react-tooltip@^1.0.7',
        '@radix-ui/react-progress@^1.0.3',
        'class-variance-authority@^0.7.0',
        'clsx@^2.0.0',
        'tailwind-merge@^2.0.0',
        'lucide-react@^0.294.0'
      ]
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/ui/WalletButton.tsx',
      content: `import React from 'react';
import { Button } from '../ui/button.js';
import { Badge } from '../ui/badge.js';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.js';
import { useWallet } from '../../../hooks/web3/useWallet.js';
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react';

interface WalletButtonProps {
  className?: string;
  showBalance?: boolean;
  showNetwork?: boolean;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ 
  className,
  showBalance = true,
  showNetwork = true
}) => {
  const { 
    account, 
    isConnected, 
    connect, 
    disconnect, 
    balance, 
    chain,
    isConnecting 
  } = useWallet();

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
    }
  };

  const openExplorer = () => {
    if (account && chain) {
      const explorerUrl = chain.blockExplorers?.default?.url;
      if (explorerUrl) {
        window.open(\`\${explorerUrl}/address/\${account}\`, '_blank');
      }
    }
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={connect} 
        disabled={isConnecting}
        className={className}
      >
        <Wallet className="w-4 h-4 mr-2" />
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <Wallet className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </span>
          {showNetwork && chain && (
            <Badge variant="secondary" className="ml-2">
              {chain.name}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">Address</p>
          <p className="text-xs text-muted-foreground font-mono">
            {account}
          </p>
        </div>
        
        {showBalance && balance && (
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">Balance</p>
            <p className="text-xs text-muted-foreground">
              {balance} {chain?.nativeCurrency?.symbol || 'ETH'}
            </p>
          </div>
        )}
        
        {showNetwork && chain && (
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">Network</p>
            <p className="text-xs text-muted-foreground">
              {chain.name}
            </p>
          </div>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="w-4 h-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={openExplorer}>
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={disconnect} className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/ui/TransactionStatus.tsx',
      content: `import React from 'react';
import { Card, CardContent } from '../ui/card.js';
import { Badge } from '../ui/badge.js';
import { Button } from '../ui/button.js';
import { Progress } from '../ui/progress.js';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  ExternalLink, 
  Copy,
  RefreshCw
} from 'lucide-react';

export interface TransactionStatusProps {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  confirmations?: number;
  maxConfirmations?: number;
  explorerUrl?: string;
  onRefresh?: () => void;
  className?: string;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  hash,
  status,
  confirmations = 0,
  maxConfirmations = 12,
  explorerUrl,
  onRefresh,
  className
}) => {
  const copyHash = () => {
    navigator.clipboard.writeText(hash);
  };

  const openExplorer = () => {
    if (explorerUrl) {
      window.open(\`\${explorerUrl}/tx/\${hash}\`, '_blank');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'failed':
        return 'Failed';
      case 'pending':
      default:
        return 'Pending';
    }
  };

  const getStatusVariant = () => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'pending':
      default:
        return 'secondary';
    }
  };

  const progress = status === 'pending' 
    ? (confirmations / maxConfirmations) * 100 
    : status === 'confirmed' ? 100 : 0;

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium">{getStatusText()}</span>
            <Badge variant={getStatusVariant()}>
              {status === 'pending' ? \`\${confirmations}/\${maxConfirmations}\` : status}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            {onRefresh && status === 'pending' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefresh}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={copyHash}
              className="h-8 w-8 p-0"
            >
              <Copy className="w-4 h-4" />
            </Button>
            
            {explorerUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={openExplorer}
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Transaction Hash</span>
            <span className="font-mono text-xs">{hash.slice(0, 10)}...{hash.slice(-8)}</span>
          </div>
          
          {status === 'pending' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confirmations</span>
                <span>{confirmations}/{maxConfirmations}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/ui/NFTCard.tsx',
      content: `import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card.js';
import { Badge } from '../ui/badge.js';
import { Button } from '../ui/button.js';
import { 
  ExternalLink, 
  Copy, 
  Heart, 
  Share2,
  MoreHorizontal
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.js';
import type { NFTToken } from '../../../lib/web3/nft.js';

interface NFTCardProps {
  nft: NFTToken;
  onTransfer?: (nft: NFTToken) => void;
  onViewDetails?: (nft: NFTToken) => void;
  showActions?: boolean;
  className?: string;
}

export const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  onTransfer,
  onViewDetails,
  showActions = true,
  className
}) => {
  const copyTokenId = () => {
    navigator.clipboard.writeText(nft.tokenId.toString());
  };

  const copyContractAddress = () => {
    navigator.clipboard.writeText(nft.contractAddress);
  };

  const openExplorer = () => {
    // This would need to be implemented based on the chain
    console.log('Open explorer for token:', nft.tokenId);
  };

  return (
    <Card className={\`overflow-hidden group hover:shadow-lg transition-shadow \${className}\`}>
      {/* Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {nft.metadata?.image ? (
          <img
            src={nft.metadata.image}
            alt={nft.metadata.name || \`NFT #\${nft.tokenId}\`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        
        {/* Overlay Actions */}
        {showActions && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            {onViewDetails && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onViewDetails(nft)}
              >
                View Details
              </Button>
            )}
            {onTransfer && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onTransfer(nft)}
              >
                Transfer
              </Button>
            )}
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        {/* Title and Token ID */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">
            {nft.metadata?.name || \`NFT #\${nft.tokenId}\`}
          </h3>
          <Badge variant="outline" className="text-xs">
            #{nft.tokenId.toString()}
          </Badge>
        </div>
        
        {/* Description */}
        {nft.metadata?.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {nft.metadata.description}
          </p>
        )}
        
        {/* Attributes */}
        {nft.metadata?.attributes && nft.metadata.attributes.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Attributes</h4>
            <div className="flex flex-wrap gap-1">
              {nft.metadata.attributes.slice(0, 3).map((attr, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {attr.trait_type}: {attr.value}
                </Badge>
              ))}
              {nft.metadata.attributes.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{nft.metadata.attributes.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyTokenId}
                className="h-8 w-8 p-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={openExplorer}
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={copyTokenId}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Token ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={copyContractAddress}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Contract
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openExplorer}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/ui/TokenSelector.tsx',
      content: `import React, { useState } from 'react';
import { Button } from '../ui/button.js';
import { Input } from '../ui/input.js';
import { Badge } from '../ui/badge.js';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog.js';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command.js';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { useTokenInfo } from '../../../hooks/web3/useDeFi.js';
import type { Address } from 'viem';

interface Token {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

interface TokenSelectorProps {
  selectedToken?: Token;
  onTokenSelect: (token: Token) => void;
  tokens?: Token[];
  className?: string;
  disabled?: boolean;
}

const COMMON_TOKENS: Token[] = [
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18
  },
  {
    address: '0xA0b86a33E6441c8C06DDD4e4c4c0B3C4F8F2E4D6',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18
  }
];

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
  tokens = COMMON_TOKENS,
  className,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
    token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    token.address.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setOpen(false);
    setSearchValue('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={\`justify-between \${className}\`}
          disabled={disabled}
        >
          {selectedToken ? (
            <div className="flex items-center gap-2">
              {selectedToken.logoURI && (
                <img
                  src={selectedToken.logoURI}
                  alt={selectedToken.symbol}
                  className="w-5 h-5 rounded-full"
                />
              )}
              <span>{selectedToken.symbol}</span>
              <Badge variant="secondary" className="text-xs">
                {selectedToken.name}
              </Badge>
            </div>
          ) : (
            <span>Select token...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
          <DialogDescription>
            Choose a token to use for your transaction.
          </DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput
            placeholder="Search tokens..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No tokens found.</CommandEmpty>
            <CommandGroup>
              {filteredTokens.map((token) => (
                <CommandItem
                  key={token.address}
                  value={token.address}
                  onSelect={() => handleTokenSelect(token)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {token.logoURI && (
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-sm text-muted-foreground">
                        {token.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {token.decimals} decimals
                    </div>
                    <div className="text-xs font-mono">
                      {token.address.slice(0, 6)}...{token.address.slice(-4)}
                    </div>
                  </div>
                  {selectedToken?.address === token.address && (
                    <Check className="ml-2 h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/ui/NetworkSwitcher.tsx',
      content: `import React from 'react';
import { Button } from '../ui/button.js';
import { Badge } from '../ui/badge.js';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.js';
import { Check, ChevronDown, Wifi, WifiOff } from 'lucide-react';
import { useWallet } from '../../../hooks/web3/useWallet.js';

interface Network {
  id: number;
  name: string;
  chainId: number;
  rpcUrl: string;
  blockExplorerUrl?: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

const SUPPORTED_NETWORKS: Network[] = [
  {
    id: 1,
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: 'https://eth.llamarpc.com',
    blockExplorerUrl: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  {
    id: 11155111,
    name: 'Sepolia',
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  {
    id: 137,
    name: 'Polygon',
    chainId: 137,
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  }
];

interface NetworkSwitcherProps {
  className?: string;
}

export const NetworkSwitcher: React.FC<NetworkSwitcherProps> = ({ className }) => {
  const { 
    chain, 
    switchChain, 
    isConnected, 
    isConnecting 
  } = useWallet();

  const handleNetworkSwitch = async (network: Network) => {
    if (switchChain) {
      try {
        await switchChain(network.chainId);
      } catch (error) {
        console.error('Failed to switch network:', error);
      }
    }
  };

  if (!isConnected) {
    return (
      <Button variant="outline" disabled className={className}>
        <WifiOff className="w-4 h-4 mr-2" />
        Not Connected
      </Button>
    );
  }

  const currentNetwork = SUPPORTED_NETWORKS.find(n => n.chainId === chain?.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={\`justify-between \${className}\`}>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            <span className="hidden sm:inline">
              {currentNetwork?.name || 'Unknown Network'}
            </span>
            <Badge variant="secondary" className="text-xs">
              {chain?.id}
            </Badge>
          </div>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Switch Network</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {SUPPORTED_NETWORKS.map((network) => (
          <DropdownMenuItem
            key={network.id}
            onClick={() => handleNetworkSwitch(network)}
            disabled={isConnecting}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div>
                <div className="font-medium">{network.name}</div>
                <div className="text-xs text-muted-foreground">
                  {network.nativeCurrency.symbol}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {network.chainId}
              </Badge>
              {currentNetwork?.chainId === network.chainId && (
                <Check className="h-4 w-4" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="text-muted-foreground">
          <div className="text-xs">
            More networks coming soon...
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};`
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/ui/index.ts',
      content: `// Web3 UI Components
export { WalletButton } from './WalletButton.js';
export { TransactionStatus } from './TransactionStatus.js';
export { NFTCard } from './NFTCard.js';
export { TokenSelector } from './TokenSelector.js';
export { NetworkSwitcher } from './NetworkSwitcher.js';

// Re-export types
export type { TransactionStatusProps } from './TransactionStatus.js';
export type { NFTCardProps } from './NFTCard.js';
export type { TokenSelectorProps } from './TokenSelector.js';
export type { NetworkSwitcherProps } from './NetworkSwitcher.js';`
    }
  ]
};

export default web3ShadcnIntegrationBlueprint;
