import { Genome } from '@thearchitech.xyz/marketplace';

/**
 * Blog Application Template
 * 
 * A modern blog platform with content management, SEO optimization, and social features.
 * Perfect for building personal blogs, company blogs, or content sites.
 */
const blogAppGenome: Genome = {
  version: '1.0.0',
  project: {
    name: 'blog-app',
    description: 'Modern blog platform with CMS and SEO optimization',
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
        components: ['button', 'input', 'card', 'form', 'table', 'dialog', 'badge', 'avatar']},
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
    
    // === CONTENT MANAGEMENT ===
    {
      id: 'content/next-intl',
      parameters: {
        locales: ['en', 'fr'],
        defaultLocale: 'en'
      },
      features: {
        routing: true,
        'dynamic-imports': true,
        'seo-optimization': true
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
      id: 'core/forms',
      parameters: {
        zod: true,
        reactHookForm: true,
        resolvers: true,
        accessibility: true,
        devtools: true
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

    // =============================================================================
    // FEATURE MODULES - Blog-specific features
    // =============================================================================
    {
      id: 'features/user-profile/nextjs-shadcn',
      parameters: {
        theme: 'default',
        features: {
          avatarUpload: true,
          preferences: true,
          security: true,
          notifications: true,
          exportData: false
        }
      }
    },
    {
      id: 'features/email-management/nextjs-shadcn',
      parameters: {
        theme: 'default',
        features: {
          composer: true,
          templates: true,
          analytics: true,
          settings: true
        }
      }
    }
  ]
};

export default blogAppGenome;
