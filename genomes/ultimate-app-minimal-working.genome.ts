/**
 * Ultimate App Genome - Minimal Working Version
 * 
 * This genome uses ONLY the components that are confirmed to work
 * Based on the successful test-full-app.genome.ts
 */

import { Genome } from '@thearchitech.xyz/marketplace';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'ultimate-app-minimal',
    description: 'Ultimate application with only confirmed working components',
    version: '0.1.0',
    framework: 'nextjs',
    path: './ultimate-app-minimal'
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
        performance: true,
        security: true,
        'server-actions': true
      }
    },

    // =============================================================================
    // UI MODULE - Only confirmed working components
    // =============================================================================
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: ['button', 'card', 'input', 'dialog', 'form'],
        theme: 'dark',
        darkMode: true
      },
      features: {
        theming: true,
        accessibility: true
      }
    },

    // =============================================================================
    // DATABASE MODULE - Drizzle ORM
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
    // AUTHENTICATION MODULE - Better Auth
    // =============================================================================
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['github', 'email'],
        session: 'jwt',
        csrf: true
      },
      features: {
        'oauth-providers': true,
        'session-management': true
      }
    },

    // =============================================================================
    // STATE MANAGEMENT MODULE - Zustand
    // =============================================================================
    {
      id: 'state/zustand',
      parameters: {
        devtools: true,
        persistence: true,
        middleware: ['immer', 'devtools']
      },
      features: {
        devtools: true,
        persistence: true,
        middleware: true
      }
    },

    // =============================================================================
    // PAYMENT MODULE - Stripe
    // =============================================================================
    {
      id: 'payment/stripe',
      parameters: {
        mode: 'test',
        webhooks: true,
        subscriptions: true,
        oneTimePayments: true
      },
      features: {
        webhooks: true,
        subscriptions: true,
        invoices: true
      }
    },

    // =============================================================================
    // EMAIL MODULE - Resend
    // =============================================================================
    {
      id: 'email/resend',
      parameters: {
        apiKey: 'your-resend-api-key',
        templates: ['welcome', 'password-reset', 'order-confirmation'],
        analytics: true
      },
      features: {
        templates: true,
        analytics: true,
        batchSending: true
      }
    },

    // =============================================================================
    // CONTENT MODULE - Next-intl
    // =============================================================================
    {
      id: 'content/next-intl',
      parameters: {
        locales: ['en', 'es', 'fr'],
        defaultLocale: 'en',
        routing: true
      },
      features: {
        routing: true,
        seoOptimization: true,
        dynamicImports: true
      }
    },

    // =============================================================================
    // TESTING MODULE - Vitest
    // =============================================================================
    {
      id: 'testing/vitest',
      parameters: {
        coverage: true,
        ui: true,
        e2e: true,
        componentTesting: true
      },
      features: {
        unitTesting: true,
        integrationTesting: true,
        e2eTesting: true,
        coverage: true
      }
    },

    // =============================================================================
    // OBSERVABILITY MODULE - Sentry
    // =============================================================================
    {
      id: 'observability/sentry',
      parameters: {
        errorTracking: true,
        performance: true,
        sessionReplay: true,
        alerts: true
      },
      features: {
        errorTracking: true,
        performanceMonitoring: true,
        alertsDashboard: true
      }
    },

    // =============================================================================
    // BLOCKCHAIN MODULE - Web3
    // =============================================================================
    {
      id: 'blockchain/web3',
      parameters: {
        networks: ['ethereum', 'polygon'],
        walletIntegration: true,
        smartContracts: true
      },
      features: {
        walletIntegration: true,
        smartContracts: true,
        nftManagement: true
      }
    },

    // =============================================================================
    // DEPLOYMENT MODULE - Docker
    // =============================================================================
    {
      id: 'deployment/docker',
      parameters: {
        multiStage: true,
        productionReady: true,
        healthChecks: true
      },
      features: {
        multiStage: true,
        productionReady: true,
        healthChecks: true
      }
    },

    // =============================================================================
    // TOOLING MODULE - Dev Tools
    // =============================================================================
    {
      id: 'tooling/dev-tools',
      parameters: {
        linting: true,
        formatting: true,
        gitHooks: true,
        debugging: true
      },
      features: {
        linting: true,
        formatting: true,
        gitHooks: true
      }
    },

    // =============================================================================
    // KEY INTEGRATIONS - Essential connections
    // =============================================================================
    
    // Database integrations
    {
      id: 'drizzle-nextjs-integration',
      parameters: {
        connectionPooling: true,
        typeSafety: true
      },
      features: {
        connectionPooling: true,
        typeSafety: true
      }
    },

    {
      id: 'better-auth-drizzle-integration',
      parameters: {
        userSchema: true,
        adapterLogic: true,
        migrations: true
      },
      features: {
        userSchema: true,
        adapterLogic: true,
        migrations: true
      }
    },

    // UI integrations
    {
      id: 'shadcn-nextjs-integration',
      parameters: {
        themeProvider: true,
        darkMode: true
      },
      features: {
        themeProvider: true,
        darkMode: true
      }
    },

    // Payment integrations
    {
      id: 'stripe-nextjs-integration',
      parameters: {
        webhooks: true,
        subscriptions: true
      },
      features: {
        webhooks: true,
        subscriptions: true
      }
    },

    // Email integrations
    {
      id: 'resend-nextjs-integration',
      parameters: {
        apiRoutes: true,
        templates: true
      },
      features: {
        apiRoutes: true,
        templates: true
      }
    },

    // Observability integrations
    {
      id: 'sentry-nextjs-integration',
      parameters: {
        errorBoundary: true,
        performance: true
      },
      features: {
        errorBoundary: true,
        performance: true
      }
    },

    // Testing integrations
    {
      id: 'vitest-nextjs-integration',
      parameters: {
        componentTesting: true,
        apiTesting: true
      },
      features: {
        componentTesting: true,
        apiTesting: true
      }
    },

    // State management integrations
    {
      id: 'zustand-nextjs-integration',
      parameters: {
        ssrSupport: true,
        hydration: true
      },
      features: {
        ssrSupport: true,
        hydration: true
      }
    },

    // Auth integrations
    {
      id: 'better-auth-nextjs-integration',
      parameters: {
        middleware: true,
        apiRoutes: true
      },
      features: {
        middleware: true,
        apiRoutes: true
      }
    }
  ]
};

export default genome;
