import { Genome } from '@thearchitech.xyz/marketplace';

/**
 * Web3 Dashboard Genome
 * 
 * A comprehensive Web3 application with wallet integration, DeFi features, and blockchain data visualization.
 * Perfect for Web3 developers, DeFi enthusiasts, Blockchain entrepreneurs, and NFT creators.
 * 
 * Features:
 * - Wallet connection and management
 * - DeFi protocol integration
 * - NFT management and display
 * - Smart contract interaction
 * - Blockchain data visualization
 * - Token management
 * - Transaction history
 * - Portfolio tracking
 * - Gas optimization
 * - Multi-chain support
 */
const web3DashboardGenome: Genome = {
  version: '1.0.0',
  project: {
    name: 'web3-dashboard',
    description: 'A comprehensive Web3 application with DeFi features and blockchain integration',
    version: '1.0.0',
    framework: 'nextjs'
  },
  modules: [
    // === CORE FRAMEWORK ===
    {
      id: 'framework/nextjs',
      parameters: {
        appRouter: true,
        typescript: true,
        tailwind: true,
        eslint: true,
        srcDir: true,
        importAlias: '@/'
      },
      features: {
        'api-routes': true,
        middleware: true,
        performance: true,
        security: true,
        seo: true,
        'server-actions': true
      }
    },
    
    // === UI FRAMEWORK ===
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: [
          'button', 'input', 'card', 'form', 'table', 'dialog', 'dropdown-menu',
          'badge', 'avatar', 'toast', 'sheet', 'tabs', 'accordion', 'carousel',
          'calendar', 'date-picker', 'alert-dialog', 'checkbox', 'collapsible',
          'context-menu', 'hover-card', 'menubar', 'navigation-menu', 'popover',
          'progress', 'radio-group', 'scroll-area', 'slider', 'toggle', 'toggle-group'
        ]
      },
      features: {
        accessibility: true,
        theming: true
      }
    },
    
    // === DATABASE ===
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',
        databaseType: 'postgresql',
        migrations: true,
        studio: true
      },
      features: {
        migrations: true,
        seeding: true,
        studio: true,
        relations: true
      }
    },
    
    // === AUTHENTICATION ===
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['email', 'google', 'github'],
        session: 'jwt',
        csrf: true,
        rateLimit: true
      },
      features: {
        'oauth-providers': true,
        'email-verification': true,
        'password-reset': true,
        'session-management': true
      }
    },
    
    // === BLOCKCHAIN INTEGRATION ===
    {
      id: 'blockchain/web3',
      parameters: {
        networks: ['ethereum', 'polygon', 'arbitrum'],
        walletConnect: true,
        infuraKey: 'your-infura-key'
      },
      features: {
        'wallet-integration': true,
        'smart-contracts': true,
        'defi-integration': true,
        'nft-management': true
      }
    },
    
    // === GOLDEN CORE ADAPTERS ===
    {
      id: 'data-fetching/tanstack-query',
      parameters: {
        devtools: true,
        suspense: false,
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // 30 seconds for blockchain data
            gcTime: 5 * 60 * 1000,
            retry: 3,
            refetchOnWindowFocus: false
          }
        }
      },
      features: {
        core: true,
        infinite: true,
        optimistic: true,
        offline: true
      }
    },
    
    {
      id: 'state/zustand',
      parameters: {
        persistence: true,
        devtools: true,
        immer: true,
        middleware: ['persist', 'devtools']
      },
      features: {
        persistence: true,
        devtools: true
      }
    },
    
    {
      id: 'core/forms',
      parameters: {
        zod: true,
        reactHookForm: true,
        resolvers: true,
        accessibility: true,
        devtools: true
      }
    },
    
    // === TESTING & QUALITY ===
    {
      id: 'testing/vitest',
      parameters: {
        jsx: true,
        environment: 'jsdom',
        coverage: true
      },
      features: {
        coverage: true,
        ui: true
      }
    },
    
    {
      id: 'quality/eslint',
      parameters: {
        typescript: true,
        react: true,
        accessibility: true
      }
    },
    
    {
      id: 'quality/prettier',
      parameters: {
        typescript: true,
        tailwind: true
      }
    },
    
    // === OBSERVABILITY ===
    {
      id: 'observability/sentry',
      parameters: {
        dsn: 'https://...@sentry.io/...',
        environment: 'development'
      },
      features: {
        errorTracking: true,
        performance: true,
        releases: true
      }
    },
    
    // === INTEGRATORS ===
    {
      id: 'integrations/drizzle-nextjs-integration',
      parameters: {
        apiRoutes: true,
        middleware: true,
        queries: true,
        transactions: true,
        migrations: true,
        seeding: true,
        validators: true,
        adminPanel: false,
        healthChecks: true,
        connectionPooling: true
      }
    },
    
    {
      id: 'integrations/better-auth-nextjs-integration',
      parameters: {
        apiRoutes: true,
        middleware: true,
        uiComponents: 'shadcn',
        adminPanel: false,
        emailVerification: true,
        mfa: false,
        passwordReset: true
      }
    },
    
    {
      id: 'integrations/web3-nextjs-integration',
      parameters: {
        walletConnection: true,
        smartContracts: true,
        defiProtocols: true,
        nftManagement: true
      }
    },
    
    {
      id: 'integrations/web3-shadcn-integration',
      parameters: {
        walletUI: true,
        nftComponents: true,
        defiComponents: true,
        blockchainData: true
      }
    },
    
    {
      id: 'integrations/tanstack-query-nextjs-integration',
      parameters: {
        devtools: true,
        ssr: true,
        hydration: true,
        prefetching: true,
        errorBoundary: true
      }
    },
    
    {
      id: 'integrations/zustand-nextjs-integration',
      parameters: {
        persistence: true,
        devtools: true,
        ssr: true
      }
    },
    
    {
      id: 'integrations/rhf-zod-shadcn-integration',
      parameters: {
        formComponents: true,
        validation: true,
        accessibility: true
      }
    },
    
    {
      id: 'integrations/sentry-nextjs-integration',
      parameters: {
        errorTracking: true,
        performance: true,
        releases: true
      }
    },
    
    {
      id: 'integrations/vitest-nextjs-integration',
      parameters: {
        testing: true,
        coverage: true,
        mocking: true
      }
    },
    
    // === FEATURES ===
    {
      id: 'features/auth-ui/shadcn',
      parameters: {
        theme: 'default',
        features: {
          loginForm: true,
          registerForm: true,
          userMenu: true,
          authProvider: true
        }
      }
    },
    
    {
      id: 'features/user-profile/nextjs-shadcn',
      parameters: {
        theme: 'default',
        features: {
          avatarUpload: true,
          preferences: true,
          security: true,
          notifications: true,
          exportData: true
        }
      }
    },
    
    {
      id: 'features/web3-dashboard/nextjs-shadcn',
      parameters: {
        theme: 'default',
        features: {
          walletConnection: true,
          portfolioTracking: true,
          transactionHistory: true,
          defiProtocols: true,
          nftGallery: true,
          tokenManagement: true,
          gasOptimization: true,
          multiChainSupport: true
        }
      }
    },
    
    {
      id: 'features/graph-visualizer/react-flow',
      parameters: {
        features: {
          nodeEditor: true,
          workflowBuilder: true,
          dataVisualization: true,
          interactiveGraphs: true
        }
      }
    }
  ]
};

export default web3DashboardGenome;
