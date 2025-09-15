import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'web3-shadcn-integration',
  name: 'Web3 Shadcn Integration',
  description: 'Beautiful Web3 UI components using Shadcn/ui with modern viem integration',
  version: '2.0.0',
  actions: [
    // Install modern Web3 dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: ['viem', '@tanstack/react-query', 'zod', 'lucide-react']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@types/node'],
      isDev: true
    },
    // Create modern Web3 UI components
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/WalletCard.tsx',
      content: `'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink, RefreshCw, Wallet } from 'lucide-react'
import { useWeb3, type Address } from '@/hooks/useWeb3'
import { cn } from '@/lib/utils'

interface WalletCardProps {
  className?: string
}

export function WalletCard({ className }: WalletCardProps) {
  const { address, balance, chainId, isConnected, connectWallet, disconnectWallet, refreshBalance, isLoading } = useWeb3()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  const openExplorer = () => {
    if (!address || !chainId) return
    
    const explorerUrls: Record<number, string> = {
      1: 'https://etherscan.io',
      11155111: 'https://sepolia.etherscan.io',
      137: 'https://polygonscan.com',
      42161: 'https://arbiscan.io',
    }
    
    const explorerUrl = explorerUrls[chainId] || 'https://etherscan.io'
    window.open(\`\${explorerUrl}/address/\${address}\`, '_blank')
  }

  if (!isConnected) {
    return (
      <Card className={cn('w-full max-w-md', className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Connect your wallet to view your balance and manage your assets.
          </p>
          <Button onClick={connectWallet} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect Wallet'
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('w-full max-w-md', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet
          </CardTitle>
          <Badge variant="secondary">
            {chainId === 1 ? 'Ethereum' : 
             chainId === 11155111 ? 'Sepolia' :
             chainId === 137 ? 'Polygon' :
             chainId === 42161 ? 'Arbitrum' : 'Unknown'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">
                {balance ? \`\${balance} ETH\` : 'Loading...'}
              </span>
              <Button variant="ghost" size="sm" onClick={refreshBalance}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={openExplorer} className="flex-1">
            <ExternalLink className="mr-2 h-4 w-4" />
            Explorer
          </Button>
          <Button variant="destructive" size="sm" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}`
    },
    // Create Transaction Card component
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/TransactionCard.tsx',
      content: `'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TransactionCardProps {
  hash: string
  status: 'pending' | 'success' | 'failed'
  from: string
  to: string
  value?: string
  gasUsed?: string
  gasPrice?: string
  timestamp?: string
  className?: string
}

export function TransactionCard({
  hash,
  status,
  from,
  to,
  value,
  gasUsed,
  gasPrice,
  timestamp,
  className
}: TransactionCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Loader2 className="h-4 w-4 animate-spin" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const openExplorer = () => {
    // This would need to be dynamic based on the current network
    const explorerUrl = 'https://etherscan.io'
    window.open(\`\${explorerUrl}/tx/\${hash}\`, '_blank')
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono text-sm">
            {hash.slice(0, 10)}...{hash.slice(-8)}
          </CardTitle>
          <Badge className={getStatusColor()}>
            {getStatusIcon()}
            <span className="ml-1 capitalize">{status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-sm font-mono">
              {from.slice(0, 6)}...{from.slice(-4)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">To</span>
            <span className="text-sm font-mono">
              {to.slice(0, 6)}...{to.slice(-4)}
            </span>
          </div>
          {value && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Value</span>
              <span className="text-sm font-mono">{value} ETH</span>
            </div>
          )}
          {gasUsed && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Gas Used</span>
              <span className="text-sm font-mono">{gasUsed}</span>
            </div>
          )}
          {gasPrice && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Gas Price</span>
              <span className="text-sm font-mono">{gasPrice} Gwei</span>
            </div>
          )}
          {timestamp && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="text-sm">{new Date(timestamp).toLocaleString()}</span>
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={openExplorer} className="w-full">
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </Button>
      </CardContent>
    </Card>
  )
}`
    },
    // Create Network Switcher component
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/NetworkSwitcher.tsx',
      content: `'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Wifi, WifiOff } from 'lucide-react'
import { useWeb3 } from '@/hooks/useWeb3'
import { cn } from '@/lib/utils'

const NETWORKS = [
  { id: 1, name: 'Ethereum', symbol: 'ETH' },
  { id: 11155111, name: 'Sepolia', symbol: 'ETH' },
  { id: 137, name: 'Polygon', symbol: 'MATIC' },
  { id: 42161, name: 'Arbitrum', symbol: 'ETH' },
]

interface NetworkSwitcherProps {
  className?: string
}

export function NetworkSwitcher({ className }: NetworkSwitcherProps) {
  const { chainId, switchChain, isLoading } = useWeb3()

  const currentNetwork = NETWORKS.find(network => network.id === chainId)

  const handleNetworkSwitch = async (networkId: number) => {
    try {
      await switchChain(networkId)
    } catch (error) {
      console.error('Failed to switch network:', error)
    }
  }

  if (!chainId) {
    return (
      <Button variant="outline" disabled className={cn('gap-2', className)}>
        <WifiOff className="h-4 w-4" />
        No Network
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn('gap-2', className)}>
          <Wifi className="h-4 w-4" />
          {currentNetwork?.name || 'Unknown Network'}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {NETWORKS.map((network) => (
          <DropdownMenuItem
            key={network.id}
            onClick={() => handleNetworkSwitch(network.id)}
            disabled={isLoading || network.id === chainId}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>{network.name}</span>
              <Badge variant="secondary" className="text-xs">
                {network.symbol}
              </Badge>
            </div>
            {network.id === chainId && (
              <Badge variant="default" className="text-xs">
                Current
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`
    },
    // Create Balance Card component
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/BalanceCard.tsx',
      content: `'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, TrendingUp, DollarSign } from 'lucide-react'
import { useWeb3, useBalance, useGasPrice } from '@/hooks/useWeb3'
import { cn } from '@/lib/utils'

interface BalanceCardProps {
  className?: string
}

export function BalanceCard({ className }: BalanceCardProps) {
  const { address, isConnected } = useWeb3()
  const { data: balance, isLoading: balanceLoading, refetch: refetchBalance } = useBalance(address)
  const { data: gasPrice, isLoading: gasLoading } = useGasPrice()

  if (!isConnected) {
    return (
      <Card className={cn('w-full', className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Connect your wallet to view your balance.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Balance
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetchBalance()}
            disabled={balanceLoading}
          >
            <RefreshCw className={cn('h-4 w-4', balanceLoading && 'animate-spin')} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">ETH Balance</span>
            <span className="text-2xl font-bold">
              {balanceLoading ? (
                <div className="h-8 w-20 bg-muted animate-pulse rounded" />
              ) : (
                \`\${balance || '0.000000'} ETH\`
              )}
            </span>
          </div>
          {gasPrice && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Gas Price</span>
              <span className="text-sm font-mono">
                {gasLoading ? (
                  <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                ) : (
                  \`\${gasPrice} Gwei\`
                )}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Live data from blockchain</span>
        </div>
      </CardContent>
    </Card>
  )
}`
    },
    // Create Web3 Dashboard component
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/Web3Dashboard.tsx',
      content: `'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WalletCard } from './WalletCard'
import { BalanceCard } from './BalanceCard'
import { NetworkSwitcher } from './NetworkSwitcher'
import { useWeb3, useBlockNumber } from '@/hooks/useWeb3'
import { cn } from '@/lib/utils'

interface Web3DashboardProps {
  className?: string
}

export function Web3Dashboard({ className }: Web3DashboardProps) {
  const { isConnected, chainId } = useWeb3()
  const { data: blockNumber } = useBlockNumber()

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Web3 Dashboard</h2>
        <NetworkSwitcher />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WalletCard />
        <BalanceCard />
      </div>
      
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Network Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Network</span>
              <span className="text-sm font-mono">
                {chainId === 1 ? 'Ethereum Mainnet' :
                 chainId === 11155111 ? 'Sepolia Testnet' :
                 chainId === 137 ? 'Polygon' :
                 chainId === 42161 ? 'Arbitrum One' : \`Chain ID: \${chainId}\`}
              </span>
            </div>
            {blockNumber && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Latest Block</span>
                <span className="text-sm font-mono">{blockNumber.toLocaleString()}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}`
    }
  ]
};