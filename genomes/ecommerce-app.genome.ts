import { Genome } from '@thearchitech.xyz/marketplace';

/**
 * E-commerce Application Template
 * 
 * A complete e-commerce platform with product management, shopping cart, payments, and order tracking.
 * Perfect for building online stores and marketplaces.
 */
const ecommerceAppGenome: Genome = {
  project: {
    name: 'ecommerce-app',
    description: 'Complete e-commerce platform with products, cart, and payments',
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
        components: ['button', 'input', 'card', 'form', 'table', 'dialog', 'dropdown-menu', 'badge', 'carousel'],
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
          sessionManagement: true
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
          sessionStorage: true
        }
      }
    },
    
    {
      id: 'stripe-drizzle-integration',
      params: {
        features: {
          paymentTracking: true,
          orderManagement: true,
          customerManagement: true
        }
      }
    },
    
    {
      id: 'shadcn-zustand-integration',
      params: {
        features: {
          cartManagement: true,
          wishlistState: true,
          toastNotifications: true
        }
      }
    }
  ]
};

export default ecommerceAppGenome;
