/**
 * Ultimate App Genome - The Complete Architech Experience
 * 
 * This genome demonstrates the full power of The Architech by including:
 * - All available modules with their complete feature sets
 * - All relevant integrations for seamless module communication
 * - Production-ready configuration with all features enabled
 * - TypeScript type safety for configuration validation
 */

import { Genome } from '@thearchitech.xyz/marketplace/types';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'ultimate-app',
    description: 'The ultimate application showcasing all The Architech capabilities with complete feature sets and integrations',
    version: '0.1.0',
    framework: 'nextjs',
    path: './ultimate-app'
  },
  modules: [
    // =============================================================================
    // CORE FRAMEWORK MODULE
    // =============================================================================
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        appRouter: true,
        srcDir: true,
        importAlias: '@/*'
    },
      features: {
        'api-routes': true,
        performance: true,
        security: true,
        'server-actions': true,
        middleware: true,
        seo: true
      }
    },

    // =============================================================================
    // UI MODULES - Complete UI ecosystem
    // =============================================================================
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: [
          // Only basic components that are guaranteed to work
          'button', 'card', 'input'
        ]
    },
      features: {
        theming: true,
        accessibility: true
      }
    },

    {
      id: 'ui/forms',
      parameters: {
        zod: true,
        reactHookForm: true,
        resolvers: true
      },
      features: {}
    },

    {
      id: 'ui/tailwind',
      parameters: {
        typography: true,
        forms: true,
        aspectRatio: true
    },
      features: {}
    },

    // =============================================================================
    // DATABASE MODULE - Drizzle ORM with full features
    // =============================================================================
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',
        migrations: true,
        studio: true,
        databaseType: 'postgresql'
      },
      features: {
        migrations: true,
        studio: true
    }
    },

    // =============================================================================
    // AUTHENTICATION MODULE - Better Auth with all providers and features
    // =============================================================================
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['email'],
        session: 'jwt',
        csrf: true,
        rateLimit: true
    },
      features: {
        'oauth-providers': true,
        'session-management': true,
        'email-verification': true,
        'password-reset': true,
        'multi-factor': true,
        'admin-panel': true
      }
    },

    // =============================================================================
    // STATE MANAGEMENT MODULE - Zustand with all features
    // =============================================================================
    {
      id: 'state/zustand',
      parameters: {
        devtools: true,
        persistence: true,
        middleware: ['persist']
      },
      features: {
        devtools: true,
        persistence: true
    }
    },

    // =============================================================================
    // PAYMENT MODULE - Stripe with all payment features
    // =============================================================================
    {
      id: 'payment/stripe',
      parameters: {
        mode: 'test',
        webhooks: true
    },
      features: {
        'one-time-payments': true,
        subscriptions: true,
        invoicing: true
      }
    },

    // =============================================================================
    // EMAIL MODULE - Resend with all email features
    // =============================================================================
    {
      id: 'email/resend',
      parameters: {
        apiKey: 'your-resend-api-key',
        fromEmail: 'noreply@yourdomain.com',
        analytics: true
      },
      features: {
        templates: true,
        analytics: true,
        'batch-sending': true
      }
    },

    // =============================================================================
    // CONTENT MODULE - Next-intl for internationalization
    // =============================================================================
    {
      id: 'content/next-intl',
      parameters: {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
        routing: true
      },
      features: {
        routing: true,
        'seo-optimization': true,
        'dynamic-imports': true
      }
    },

    // =============================================================================
    // TESTING MODULE - Vitest with comprehensive testing
    // =============================================================================
    {
      id: 'testing/vitest',
      parameters: {
        coverage: true,
        ui: true,
        jsx: true,
        environment: 'jsdom'
      },
      features: {
        coverage: true,
        ui: true
      }
    },

    // =============================================================================
    // OBSERVABILITY MODULE - Sentry with full monitoring
    // =============================================================================
    {
      id: 'observability/sentry',
      parameters: {
        dsn: 'https://your-dsn@sentry.io/your-project',
        environment: 'development',
        performance: true
      },
      features: {
        'error-tracking': true,
        'performance-monitoring': true,
        'alerts-dashboard': true
      }
    },

    // =============================================================================
    // BLOCKCHAIN MODULE - Web3 with all blockchain features
    // =============================================================================
    {
      id: 'blockchain/web3',
      parameters: {
        networks: ['mainnet', 'polygon', 'arbitrum'],
        walletConnect: true
      },
      features: {
        'wallet-integration': true,
        'smart-contracts': true,
        'nft-management': true,
        'defi-integration': true
    }
    },

    // =============================================================================
    // DEPLOYMENT MODULE - Docker with production features
    // =============================================================================
    {
      id: 'deployment/docker',
      parameters: {
        nodeVersion: '18',
        optimization: true,
        healthCheck: true
      },
      features: {
        'multi-stage': true,
        'production-ready': true
      }
    },

    // =============================================================================
    // TOOLING MODULE - Development tools
    // =============================================================================
    {
      id: 'tooling/dev-tools',
      parameters: {
        prettier: true,
        husky: true,
        lintStaged: true,
        commitlint: true,
        eslint: true
      },
      features: {}
    },

    // =============================================================================
    // INTEGRATIONS - Seamless module communication
    // =============================================================================
    
    // Database integrations
    {
      id: 'integrations/drizzle-nextjs-integration',
      parameters: {
        connectionPooling: true,
        queryOptimization: true,
        typeSafety: true
      },
      features: {
        connectionPooling: true,
        queryOptimization: true,
        typeSafety: true,
        migrations: true
      }
    },

    {
      id: 'integrations/better-auth-drizzle-integration',
      parameters: {
        userSchema: true,
        adapterLogic: true,
        migrations: true,
        indexes: true,
        seedData: false
      },
      features: {
        userSchema: true,
        adapterLogic: true,
        migrations: true,
        indexes: true,
        seedData: false
      }
    },

    // UI integrations
    {
      id: 'integrations/shadcn-nextjs-integration',
      parameters: {
        themeProvider: true,
        darkMode: true,
        responsive: true
      },
      features: {
        themeProvider: true,
        darkMode: true,
        responsive: true,
        accessibility: true
      }
    },

    {
      id: 'integrations/shadcn-zustand-integration',
      parameters: {
        stateManagement: true,
        persistence: true,
        devtools: true
      },
      features: {
        stateManagement: true,
        persistence: true,
        devtools: true,
        subscriptions: true
      }
    },

    // Payment integrations
    {
      id: 'integrations/stripe-nextjs-integration',
      parameters: {
        webhooks: true,
        subscriptions: true,
        checkout: true
      },
      features: {
        webhooks: true,
        subscriptions: true,
        checkout: true,
        invoices: true
      }
    },

    {
      id: 'integrations/stripe-drizzle-integration',
      parameters: {
        customerManagement: true,
        subscriptionTracking: true,
        paymentHistory: true
      },
      features: {
        customerManagement: true,
        subscriptionTracking: true,
        paymentHistory: true,
        analytics: true
      }
    },

    {
      id: 'integrations/stripe-shadcn-integration',
      parameters: {
        uiComponents: true,
        checkoutForm: true,
        subscriptionManagement: true
      },
      features: {
        uiComponents: true,
        checkoutForm: true,
        subscriptionManagement: true,
        paymentMethods: true
      }
    },

    // Email integrations
    {
      id: 'integrations/resend-nextjs-integration',
      parameters: {
        'api-routes': true,
        templates: true,
        webhooks: true
      },
      features: {
        'api-routes': true,
        templates: true,
        webhooks: true,
        analytics: true
      }
    },

    {
      id: 'integrations/resend-shadcn-integration',
      parameters: {
        emailForms: true,
        templates: true,
        preview: true
      },
      features: {
        emailForms: true,
        templates: true,
        preview: true,
        customization: true
      }
    },

    // Observability integrations
    {
      id: 'integrations/sentry-nextjs-integration',
      parameters: {
        errorBoundary: true,
        performance: true,
        sessionReplay: true
      },
      features: {
        errorBoundary: true,
        performance: true,
        sessionReplay: true,
        profiling: true
      }
    },

    {
      id: 'integrations/sentry-drizzle-nextjs-integration',
      parameters: {
        databaseMonitoring: true,
        queryTracking: true,
        performanceMetrics: true
      },
      features: {
        databaseMonitoring: true,
        queryTracking: true,
        performanceMetrics: true,
        alerting: true
      }
    },

    // Testing integrations
    {
      id: 'integrations/vitest-nextjs-integration',
      parameters: {
        componentTesting: true,
        apiTesting: true,
        e2eTesting: true
      },
      features: {
        componentTesting: true,
        apiTesting: true,
        e2eTesting: true,
        visualRegression: true
      }
    },

    {
      id: 'integrations/vitest-zustand-integration',
      parameters: {
        stateTesting: true,
        mockStores: true,
        integrationTesting: true
      },
      features: {
        stateTesting: true,
        mockStores: true,
        integrationTesting: true,
        persistenceTesting: true
      }
    },

    // Blockchain integrations
    {
      id: 'integrations/web3-nextjs-integration',
      parameters: {
        walletConnection: true,
        contractInteraction: true,
        transactionHandling: true
      },
      features: {
        walletConnection: true,
        contractInteraction: true,
        transactionHandling: true,
        gasEstimation: true
      }
    },

    {
      id: 'integrations/web3-shadcn-integration',
      parameters: {
        walletUI: true,
        transactionUI: true,
        nftUI: true
      },
      features: {
        walletUI: true,
        transactionUI: true,
        nftUI: true,
        defiUI: true
      }
    },

    {
      id: 'integrations/web3-shadcn-nextjs-integration',
      parameters: {
        fullStackWeb3: true,
        walletManagement: true,
        contractManagement: true
      },
      features: {
        fullStackWeb3: true,
        walletManagement: true,
        contractManagement: true,
        nftManagement: true
      }
    },

    // State management integrations
    {
      id: 'integrations/zustand-nextjs-integration',
      parameters: {
        ssrSupport: true,
        hydration: true,
        middleware: true
      },
      features: {
        ssrSupport: true,
        hydration: true,
        middleware: true,
        persistence: true
      }
    },

    // Deployment integrations
    {
      id: 'integrations/docker-nextjs-integration',
      parameters: {
        nextjsOptimization: true,
        staticGeneration: true,
        caching: true
      },
      features: {
        nextjsOptimization: true,
        staticGeneration: true,
        caching: true,
        security: true
      }
    },

    {
      id: 'integrations/docker-drizzle-integration',
      parameters: {
        databaseContainer: true,
        migrations: true,
        seeding: true
      },
      features: {
        databaseContainer: true,
        migrations: true,
        seeding: true,
        monitoring: true
      }
    },

    // Auth integrations
    {
      id: 'integrations/better-auth-nextjs-integration',
      parameters: {
        middleware: true,
        'api-routes': true,
        'session-management': true
      },
      features: {
        middleware: true,
        'api-routes': true,
        'session-management': true,
        csrfProtection: true
      }
    },

    // =============================================================================
    // FEATURE MODULES - Complete business capabilities
    // =============================================================================
    {
      id: 'features/teams-dashboard/nextjs-shadcn',
      parameters: {
        enabled: true
      }
    },
    {
      id: 'features/user-profile/nextjs-shadcn',
      parameters: {
        enabled: true
      }
    },
    {
      id: 'features/project-kanban/nextjs-shadcn',
      parameters: {
        enabled: true
      }
    },
    {
      id: 'features/email-management/nextjs-shadcn',
      parameters: {
        enabled: true
      }
    },
    {
      id: 'features/payment-management/nextjs-shadcn',
      parameters: {
        enabled: true
      }
    },
    {
      id: 'features/web3-dashboard/nextjs-shadcn',
      parameters: {
        enabled: true
      }
    }
  ]
};

export default genome;
