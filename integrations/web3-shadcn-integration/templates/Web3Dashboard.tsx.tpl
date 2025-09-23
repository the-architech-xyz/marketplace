'use client'

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
                 chainId === 42161 ? 'Arbitrum One' : \