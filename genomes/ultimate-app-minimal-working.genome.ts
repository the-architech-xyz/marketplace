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
        components: ['button', 'card', 'input', 'dialog', 'form']
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
        providers: ['email'],
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
        middleware: ['persist']
      },
      features: {
        devtools: true,
        persistence: true
      }
    },

    // =============================================================================
    // PAYMENT MODULE - Stripe
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
    // EMAIL MODULE - Resend
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
    // CONTENT MODULE - Next-intl
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
    // TESTING MODULE - Vitest
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
    // OBSERVABILITY MODULE - Sentry
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
    // BLOCKCHAIN MODULE - Web3
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
        'nft-management': true
      }
    },

    // =============================================================================
    // DEPLOYMENT MODULE - Docker
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
    // TOOLING MODULE - Dev Tools
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
        themeProvider: true
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
        'api-routes': true,
        templates: true
      },
      features: {
        'api-routes': true,
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
        'api-routes': true
      },
      features: {
        middleware: true,
        'api-routes': true
      }
    }
  ]
};

export default genome;
