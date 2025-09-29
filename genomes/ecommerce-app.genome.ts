import { Genome } from '@thearchitech.xyz/marketplace';

/**
 * E-commerce Application Template
 * 
 * A complete e-commerce platform with product management, shopping cart, payments, and order tracking.
 * Perfect for building online stores and marketplaces.
 */
const ecommerceAppGenome: Genome = {
  version: '1.0.0',
  project: {
    name: 'ecommerce-app',
    description: 'Complete e-commerce platform with products, cart, and payments',
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
        components: ['button', 'input', 'card', 'form', 'table', 'dialog', 'dropdown-menu', 'badge', 'carousel']},
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
          'session-management': true
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
        'one-time-payments': true,
        subscriptions: true,
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
          sessionStorage: true
        }
      }
    },
    
    {
      id: 'stripe-drizzle-integration',
      parameters: {
        features: {
          paymentTracking: true,
          orderManagement: true,
          customerManagement: true
        }
      }
    },
    
    {
      id: 'shadcn-zustand-integration',
      parameters: {
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
