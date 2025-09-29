/**
 * Ultimate App Genome - Safe Version
 * 
 * This genome uses only components and features that are confirmed to work
 * Based on the successful test-full-app.genome.ts
 */

import { Genome } from '@thearchitech.xyz/marketplace/types';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'ultimate-app-safe',
    description: 'Ultimate application with confirmed working components and features',
    version: '0.1.0',
    framework: 'nextjs',
    path: './ultimate-app-safe'
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
        'server-actions': true,
        middleware: true,
        seo: true
      }
    },

    // =============================================================================
    // UI MODULES - Safe components only
    // =============================================================================
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: [
          // Only components confirmed to work from test-full-app.genome.ts
          'button', 'card', 'input', 'dialog', 'form'
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
    // DATABASE MODULE - Drizzle ORM
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
    // AUTHENTICATION MODULE - Better Auth
    // =============================================================================
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['github', 'google', 'email'],
        session: 'jwt',
        csrf: true,
        rateLimit: true,
        emailVerification: true,
        passwordReset: true
      },
      features: {
        'oauth-providers': true,
        'session-management': true,
        'email-verification': true,
        'password-reset': true,
        'admin-panel': true
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

    {
      id: 'shadcn-zustand-integration',
      parameters: {
        stateManagement: true,
        persistence: true
      },
      features: {
        stateManagement: true,
        persistence: true
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

    {
      id: 'stripe-drizzle-integration',
      parameters: {
        customerManagement: true,
        subscriptionTracking: true
      },
      features: {
        customerManagement: true,
        subscriptionTracking: true
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
