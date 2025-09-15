import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'web3-shadcn-nextjs-integration',
  name: 'Web3 Shadcn Next.js Integration',
  description: 'Ultimate Web3 integration combining viem, Shadcn/ui, and Next.js with modern features and performance optimizations',
  version: '1.0.0',
  actions: [
    // Install all required dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'viem',
        '@tanstack/react-query',
        '@tanstack/react-query-devtools',
        'zod',
        'lucide-react',
        'next-themes',
        'next-seo',
        'next-sitemap',
        'sharp',
        '@next/bundle-analyzer'
      ]
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@types/node'],
      isDev: true
    },
    // Create Next.js Web3 Provider
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/NextWeb3Provider.tsx',
      content: `'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { useWeb3 } from '@/hooks/useWeb3'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

interface NextWeb3ProviderProps {
  children: React.ReactNode
}

export function NextWeb3Provider({ children }: NextWeb3ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

// Web3 Context Hook
export function useWeb3Context() {
  return useWeb3()
}`
    },
    // Create Web3 Page component
    {
      type: 'CREATE_FILE',
      path: 'src/components/web3/Web3Page.tsx',
      content: `'use client'

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
}`
    },
    // Create Next.js page
    {
      type: 'CREATE_FILE',
      path: 'src/app/web3/page.tsx',
      content: `import { Web3Page } from '@/components/web3/Web3Page'

export default function Web3DashboardPage() {
  return <Web3Page />
}`
    },
    // Create additional API routes
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/web3/transaction/route.ts',
      content: `import { NextRequest, NextResponse } from 'next/server'
import { web3Core } from '@/lib/web3/core'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, value, data, gas } = body

    if (!to) {
      return NextResponse.json({ error: 'Recipient address is required' }, { status: 400 })
    }

    const transaction = {
      to: to as \`0x\${string}\`,
      value: value ? BigInt(value) : undefined,
      data: data as \`0x\${string}\` | undefined,
      gas: gas ? BigInt(gas) : undefined,
    }

    const hash = await web3Core.sendTransaction(transaction)
    
    return NextResponse.json({ 
      hash,
      status: 'pending',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Transaction API error:', error)
    return NextResponse.json(
      { error: 'Failed to send transaction' }, 
      { status: 500 }
    )
  }
}`
    },
    // Create enhanced middleware
    {
      type: 'CREATE_FILE',
      path: 'src/middleware.ts',
      content: `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add security headers for Web3 applications
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // HSTS for HTTPS
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  // CSP for Web3 security
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.ethereum.org; connect-src 'self' https://*.infura.io https://*.alchemy.com wss://*.ethereum.org; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:;"
  )
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}`
    },
    // Create Next.js configuration enhancement
    {
      type: 'ENHANCE_FILE',
      path: 'next.config.js',
      modifier: 'js-config-merger',
      params: {
        exportName: 'module.exports',
        propertiesToMerge: {
          experimental: {
            optimizePackageImports: ['viem', '@tanstack/react-query', 'lucide-react'],
            turbo: {
              rules: {
                '*.svg': {
                  loaders: ['@svgr/webpack'],
                  as: '*.js',
                },
              },
            },
          },
          images: {
            domains: ['etherscan.io', 'polygonscan.com', 'arbiscan.io'],
            formats: ['image/webp', 'image/avif'],
          },
          headers: async () => [
            {
              source: '/api/web3/:path*',
              headers: [
                { key: 'Access-Control-Allow-Origin', value: '*' },
                { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
                { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
              ],
            },
          ],
        },
        mergeStrategy: 'deep'
      }
    },
    // Create TypeScript configuration enhancement
    {
      type: 'ENHANCE_FILE',
      path: 'tsconfig.json',
      modifier: 'json-object-merger',
      params: {
        path: ['compilerOptions'],
        propertiesToMerge: {
          types: ['viem', '@tanstack/react-query'],
          paths: {
            '@/*': ['./src/*'],
            '@/components/*': ['./src/components/*'],
            '@/lib/*': ['./src/lib/*'],
            '@/hooks/*': ['./src/hooks/*'],
          }
        },
        mergeStrategy: 'deep'
      }
    }
  ]
};
