'use client'

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
                \