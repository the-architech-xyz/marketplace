/**
 * Ultimate App Genome - The Complete Architech Experience
 * 
 * This genome demonstrates the full power of The Architech by including:
 * - All available modules with their complete feature sets
 * - All relevant integrations for seamless module communication
 * - Production-ready configuration with all features enabled
 * - TypeScript type safety for configuration validation
 */

import { Genome } from '@thearchitech.xyz/marketplace';

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
        ],
        theme: 'dark',
        darkMode: true
      },
      features: {
        theming: true,
        accessibility: true
      }
    },

    {
      id: 'ui/forms',
      parameters: {
        validation: 'zod',
        components: ['form', 'input', 'select', 'checkbox', 'radio-group', 'textarea'],
        errorHandling: true
      },
      features: {
        validation: true,
        errorHandling: true,
        accessibility: true
      }
    },

    {
      id: 'ui/tailwind',
      parameters: {
        config: 'extended',
        plugins: ['typography', 'forms', 'aspect-ratio'],
        darkMode: 'class'
      },
      features: {
        responsive: true,
        darkMode: true,
        animations: true
      }
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
        databaseType: 'postgresql',
        relations: true,
        seeding: true
      },
      features: {
        migrations: true,
        studio: true,
        relations: true,
        seeding: true,
        queryOptimization: true
      }
    },

    // =============================================================================
    // AUTHENTICATION MODULE - Better Auth with all providers and features
    // =============================================================================
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['github', 'google', 'discord', 'twitter', 'email'],
        session: 'jwt',
        csrf: true,
        rateLimit: true,
        emailVerification: true,
        passwordReset: true,
        multiFactor: true
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
        middleware: ['immer', 'devtools', 'subscribeWithSelector']
      },
      features: {
        devtools: true,
        persistence: true,
        middleware: true,
        subscriptions: true
      }
    },

    // =============================================================================
    // PAYMENT MODULE - Stripe with all payment features
    // =============================================================================
    {
      id: 'payment/stripe',
      parameters: {
        mode: 'test',
        webhooks: true,
        subscriptions: true,
        oneTimePayments: true,
        marketplace: true,
        connect: true
      },
      features: {
        webhooks: true,
        subscriptions: true,
        invoices: true,
        marketplace: true,
        connect: true,
        taxCalculation: true
      }
    },

    // =============================================================================
    // EMAIL MODULE - Resend with all email features
    // =============================================================================
    {
      id: 'email/resend',
      parameters: {
        apiKey: 'your-resend-api-key',
        templates: [
          'welcome', 'password-reset', 'order-confirmation', 'invoice',
          'newsletter', 'notification', 'verification', 'marketing'
        ],
        analytics: true,
        batchSending: true
      },
      features: {
        templates: true,
        analytics: true,
        batchSending: true,
        scheduling: true,
        tracking: true
      }
    },

    // =============================================================================
    // CONTENT MODULE - Next-intl for internationalization
    // =============================================================================
    {
      id: 'content/next-intl',
      parameters: {
        locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh'],
        defaultLocale: 'en',
        routing: true,
        timezone: true
      },
      features: {
        routing: true,
        seoOptimization: true,
        dynamicImports: true,
        timezone: true,
        currency: true
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
        e2e: true,
        componentTesting: true,
        mockServiceWorker: true
      },
      features: {
        unitTesting: true,
        integrationTesting: true,
        e2eTesting: true,
        coverage: true,
        mocking: true,
        visualRegression: true
      }
    },

    // =============================================================================
    // OBSERVABILITY MODULE - Sentry with full monitoring
    // =============================================================================
    {
      id: 'observability/sentry',
      parameters: {
        errorTracking: true,
        performance: true,
        sessionReplay: true,
        alerts: true,
        profiling: true
      },
      features: {
        errorTracking: true,
        performanceMonitoring: true,
        alertsDashboard: true,
        sessionReplay: true,
        profiling: true,
        releaseTracking: true
      }
    },

    // =============================================================================
    // BLOCKCHAIN MODULE - Web3 with all blockchain features
    // =============================================================================
    {
      id: 'blockchain/web3',
      parameters: {
        networks: ['ethereum', 'polygon', 'arbitrum', 'optimism', 'base'],
        walletIntegration: true,
        smartContracts: true,
        nftSupport: true,
        defiSupport: true
      },
      features: {
        walletIntegration: true,
        smartContracts: true,
        nftManagement: true,
        defiIntegration: true,
        crossChain: true,
        gasOptimization: true
      }
    },

    // =============================================================================
    // DEPLOYMENT MODULE - Docker with production features
    // =============================================================================
    {
      id: 'deployment/docker',
      parameters: {
        multiStage: true,
        productionReady: true,
        healthChecks: true,
        securityScanning: true,
        optimization: true
      },
      features: {
        multiStage: true,
        productionReady: true,
        healthChecks: true,
        securityScanning: true,
        optimization: true,
        monitoring: true
      }
    },

    // =============================================================================
    // TOOLING MODULE - Development tools
    // =============================================================================
    {
      id: 'tooling/dev-tools',
      parameters: {
        linting: true,
        formatting: true,
        gitHooks: true,
        debugging: true,
        profiling: true
      },
      features: {
        linting: true,
        formatting: true,
        gitHooks: true,
        debugging: true,
        profiling: true,
        codeGeneration: true
      }
    },

    // =============================================================================
    // INTEGRATIONS - Seamless module communication
    // =============================================================================
    
    // Database integrations
    {
      id: 'drizzle-nextjs-integration',
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
      id: 'better-auth-drizzle-integration',
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
      id: 'shadcn-nextjs-integration',
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
      id: 'shadcn-zustand-integration',
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
      id: 'stripe-nextjs-integration',
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
      id: 'stripe-drizzle-integration',
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
      id: 'stripe-shadcn-integration',
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
      id: 'resend-nextjs-integration',
      parameters: {
        apiRoutes: true,
        templates: true,
        webhooks: true
      },
      features: {
        apiRoutes: true,
        templates: true,
        webhooks: true,
        analytics: true
      }
    },

    {
      id: 'resend-shadcn-integration',
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
      id: 'sentry-nextjs-integration',
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
      id: 'sentry-drizzle-nextjs-integration',
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
      id: 'vitest-nextjs-integration',
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
      id: 'vitest-zustand-integration',
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
      id: 'web3-nextjs-integration',
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
      id: 'web3-shadcn-integration',
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
      id: 'web3-shadcn-nextjs-integration',
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
      id: 'zustand-nextjs-integration',
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
      id: 'docker-nextjs-integration',
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
      id: 'docker-drizzle-integration',
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
      id: 'better-auth-nextjs-integration',
      parameters: {
        middleware: true,
        apiRoutes: true,
        sessionManagement: true
      },
      features: {
        middleware: true,
        apiRoutes: true,
        sessionManagement: true,
        csrfProtection: true
      }
    }
  ]
};

export default genome;
