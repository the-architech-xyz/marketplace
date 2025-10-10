import { defineGenome } from '@thearchitech.xyz/types';
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
const simpleAppGenome = defineGenome({
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
          'sonner', 'sheet', 'tabs', 'accordion', 'alert-dialog', 'checkbox',
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
    
    
    // === TESTING ===
    {
      id: 'testing/vitest',
      parameters: {
        framework: 'vitest',
        coverage: true,
        ui: true,
        typescript: true
      }
    },
    
    // === DEPLOYMENT ===
    {
      id: 'deployment/docker',
      parameters: {
        multiStage: true,
        productionReady: true
      }
    },
    
    // === AUTHENTICATION ===
    {
      id: 'features/auth/frontend/shadcn',
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
    
    // === CONNECTORS ===
    {
      id: 'connectors/docker-drizzle',
      parameters: {
        postgresService: true,
        migrationService: true,
        backupService: false,
        monitoringService: false,
        seedData: false,
        sslSupport: false,
        replication: false,
        clustering: false,
        performanceTuning: true,
        securityHardening: true,
        volumeManagement: true,
        networking: true
      }
    },
    
    {
      id: 'connectors/better-auth-github',
      parameters: {
        enabled: true
      }
    },
    
    {
      id: 'connectors/tanstack-query-nextjs',
      parameters: {
        devtools: true,
        ssr: true,
        hydration: true,
        prefetching: true,
        errorBoundary: true
      }
    },
    
    {
      id: 'connectors/zustand-nextjs',
      parameters: {
        persistence: true,
        devtools: true,
        ssr: true
      }
    },
    
    {
      id: 'connectors/rhf-zod-shadcn',
      parameters: {
        formComponents: true,
        validation: true,
        accessibility: true
      }
    },
    
    {
      id: 'connectors/vitest-nextjs',
      parameters: {
        testing: true,
        coverage: true,
        mocking: true
      }
    },
    
    // === FEATURES ===
    {
      id: 'features/auth/frontend/shadcn',
      parameters: {
        backend: 'better-auth-nextjs',
        frontend: 'shadcn',
        features: {
          loginForm: true,
          signupForm: true,
          passwordReset: true,
          profileManagement: true,
          userSettings: true,
          sessionManagement: true,
          oauthGoogle: false,
          oauthGithub: false,
          mfa: false,
          socialLogin: false
        }
      }
    },
    
    // === WELCOME FEATURE ===
    {
      id: 'features/architech-welcome/shadcn',
      parameters: {
        theme: 'default',
        features: {
          welcomePage: true,
          documentationLinks: true,
          capabilitiesShowcase: true,
          quickStart: true
        }
      }
    }
  ]
});

export default simpleAppGenome;
