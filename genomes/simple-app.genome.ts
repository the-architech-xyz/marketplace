import { Genome } from '@thearchitech.xyz/marketplace';

/**
 * Simple App Genome
 * 
 * A minimal, production-ready application with just the essentials.
 * Perfect for testing and simple projects.
 * 
 * Features:
 * - Next.js with TypeScript
 * - Shadcn/UI components
 * - Basic authentication
 * - Database with Drizzle
 * - State management with Zustand
 * - Form handling with React Hook Form + Zod
 * - Data fetching with TanStack Query
 */
const simpleAppGenome: Genome = {
  version: '1.0.0',
  project: {
    name: 'simple-app',
    description: 'A minimal, production-ready application with essential features',
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
          'button', 'input', 'card', 'form', 'table', 'dialog', 'badge', 'avatar',
          'toast', 'sheet', 'tabs', 'accordion', 'alert-dialog', 'checkbox',
          'collapsible', 'context-menu', 'hover-card', 'menubar', 'navigation-menu',
          'popover', 'progress', 'radio-group', 'scroll-area', 'slider', 'toggle'
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
        providers: ['email'],
        session: 'jwt',
        csrf: true,
        rateLimit: true
      },
      features: {
        'email-verification': true,
        'password-reset': true,
        'session-management': true
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
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
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
    
    // === INTEGRATIONS ===
    {
      id: 'integrations/drizzle-nextjs-integration',
      parameters: {
        apiRoutes: true,
        middleware: true,
        queries: true,
        transactions: true,
        migrations: true,
        seeding: false,
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
      id: 'integrations/vitest-nextjs-integration',
      parameters: {
        testing: true,
        coverage: true,
        mocking: true
      }
    }
  ]
};

export default simpleAppGenome;
