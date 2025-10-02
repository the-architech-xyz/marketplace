import { Genome } from '@thearchitech.xyz/marketplace';

/**
 * SaaS Application Template
 * 
 * A complete SaaS application with authentication, payments, dashboard, and admin panel.
 * Perfect for building subscription-based software products.
 */
const saasAppGenome: Genome = {
  version: '1.0.0',
  project: {
    name: 'saas-app',
    description: 'Complete SaaS application with authentication, payments, and dashboard',
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
        eslint: true},
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
        components: ['button', 'input', 'card', 'form', 'table', 'dialog', 'dropdown-menu']},
      features: {
          accessibility: true,
          theming: true
    }
    },
    
    // === AUTHENTICATION ===
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['email']},
      features: {
          'email-verification': true,
          'password-reset': true,
          'multi-factor': true,
          'session-management': true,
          'admin-panel': true
        }
    },
    
    // === DATABASE ===
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',
        databaseType: 'postgresql'
      },
      features: {
          migrations: true,
          seeding: true,
          studio: true,
          relations: true
        }
    },
    
    // === PAYMENTS ===
    {
      id: 'payment/stripe',
      parameters: {
        currency: 'usd',
        mode: 'test',
        webhooks: true,
        dashboard: true
      },
      features: {
        subscriptions: true,
        'one-time-payments': true,
        marketplace: true,
        invoicing: true
      }
    },
    
    // === STATE MANAGEMENT ===
    {
      id: 'state/zustand',
      parameters: {
        middleware: ['persist']
      },
      features: {
        devtools: true,
        persistence: true
      }
    },
    
    // === TESTING ===
    {
      id: 'testing/vitest',
      parameters: {
        jsx: true,
        environment: 'jsdom'
      },
      features: {
        coverage: true,
        ui: true
      }
    },
    
    // === INTEGRATIONS ===
    {
      id: 'better-auth-drizzle-integration',
      parameters: {
        features: {
          userManagement: true,
          sessionStorage: true,
          accountLinking: true
        }
      }
    },
    
    {
      id: 'stripe-drizzle-integration',
      parameters: {
        features: {
          subscriptionTracking: true,
          paymentHistory: true,
          customerManagement: true
        }
      }
    },
    
    {
      id: 'shadcn-zustand-integration',
      parameters: {
        features: {
          formManagement: true,
          modalState: true,
          toastNotifications: true
        }
      }
    },

    // =============================================================================
    // FEATURE MODULES - SaaS specific features
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
      id: 'features/payment-management/nextjs-shadcn',
      parameters: {
        enabled: true
      }
    },
    {
      id: 'features/email-management/nextjs-shadcn',
      parameters: {
        enabled: true
      }
    }
  ]
};

export default saasAppGenome;
