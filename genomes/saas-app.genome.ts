import { Genome } from '@thearchitech.xyz/marketplace/types';

/**
 * SaaS Application Template
 * 
 * A complete SaaS application with authentication, payments, dashboard, and admin panel.
 * Perfect for building subscription-based software products.
 */
const saasAppGenome: Genome = {
  project: {
    name: 'saas-app',
    description: 'Complete SaaS application with authentication, payments, and dashboard',
    version: '1.0.0',
    author: 'The Architech Team',
    license: 'MIT'
  },
  modules: [
    // === CORE FRAMEWORK ===
    {
      id: 'framework/nextjs',
      params: {
        appRouter: true,
        typescript: true,
        tailwind: true,
        eslint: true,
        features: {
          apiRoutes: true,
          middleware: true,
          performance: true,
          security: true,
          seo: true,
          serverActions: true,
          ssrOptimization: true
        }
      }
    },
    
    // === UI FRAMEWORK ===
    {
      id: 'ui/shadcn-ui',
      params: {
        components: ['button', 'input', 'card', 'form', 'table', 'dialog', 'dropdown-menu'],
        features: {
          accessibility: true,
          theming: true,
          advancedComponents: true
        }
      }
    },
    
    // === AUTHENTICATION ===
    {
      id: 'auth/better-auth',
      params: {
        providers: ['email', 'google', 'github'],
        features: {
          emailVerification: true,
          passwordReset: true,
          multiFactor: true,
          sessionManagement: true,
          adminPanel: true
        }
      }
    },
    
    // === DATABASE ===
    {
      id: 'database/drizzle',
      params: {
        provider: 'postgresql',
        features: {
          migrations: true,
          seeding: true,
          studio: true,
          relations: true
        }
      }
    },
    
    // === PAYMENTS ===
    {
      id: 'payment/stripe',
      params: {
        features: {
          subscriptions: true,
          oneTimePayments: true,
          webhooks: true,
          customerPortal: true
        }
      }
    },
    
    // === STATE MANAGEMENT ===
    {
      id: 'state/zustand',
      params: {
        features: {
          devtools: true,
          persistence: true
        }
      }
    },
    
    // === TESTING ===
    {
      id: 'testing/vitest',
      params: {
        features: {
          coverage: true,
          ui: true
        }
      }
    },
    
    // === INTEGRATIONS ===
    {
      id: 'better-auth-drizzle-integration',
      params: {
        features: {
          userManagement: true,
          sessionStorage: true,
          accountLinking: true
        }
      }
    },
    
    {
      id: 'stripe-drizzle-integration',
      params: {
        features: {
          subscriptionTracking: true,
          paymentHistory: true,
          customerManagement: true
        }
      }
    },
    
    {
      id: 'shadcn-zustand-integration',
      params: {
        features: {
          formManagement: true,
          modalState: true,
          toastNotifications: true
        }
      }
    }
  ]
};

export default saasAppGenome;
