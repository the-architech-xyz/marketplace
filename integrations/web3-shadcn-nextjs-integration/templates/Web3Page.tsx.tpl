'use client'

import React from 'react'
import { Metadata } from 'next'
import { Web3Dashboard } from './Web3Dashboard'
import { NextWeb3Provider } from './NextWeb3Provider'
import { SEO } from '@/components/nextjs/seo'

interface Web3PageProps {
  className?: string
}

export function Web3Page({ className }: Web3PageProps) {
  return (
    <NextWeb3Provider>
      <SEO
        title="Web3 Dashboard"
        description="Complete Web3 dashboard with wallet management, transactions, and blockchain interactions"
        keywords={['web3', 'blockchain', 'ethereum', 'wallet', 'crypto']}
        openGraph={{
          title: 'Web3 Dashboard',
          description: 'Complete Web3 dashboard with wallet management, transactions, and blockchain interactions',
          type: 'website',
        }}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Web3Dashboard className={className} />
        </div>
      </div>
    </NextWeb3Provider>
  )
}

// Metadata for Next.js
export const metadata: Metadata = {
  title: 'Web3 Dashboard',
  description: 'Complete Web3 dashboard with wallet management, transactions, and blockchain interactions',
  keywords: ['web3', 'blockchain', 'ethereum', 'wallet', 'crypto'],
  openGraph: {
    title: 'Web3 Dashboard',
    description: 'Complete Web3 dashboard with wallet management, transactions, and blockchain interactions',
    type: 'website',
  },
}