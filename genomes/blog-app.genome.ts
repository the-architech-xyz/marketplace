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
    // FEATURE MODULES - Blog-specific features
    // =============================================================================
    {
      id: 'features/user-profile/nextjs-shadcn',
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

export default blogAppGenome;
