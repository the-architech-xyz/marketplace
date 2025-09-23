'use client'

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
}