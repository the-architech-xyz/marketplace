'use client'

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
    window.open(\