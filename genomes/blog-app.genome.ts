import { Genome } from '@thearchitech.xyz/marketplace/types';

/**
 * Blog Application Template
 * 
 * A modern blog platform with content management, SEO optimization, and social features.
 * Perfect for building personal blogs, company blogs, or content sites.
 */
const blogAppGenome: Genome = {
  project: {
    name: 'blog-app',
    description: 'Modern blog platform with CMS and SEO optimization',
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
        components: ['button', 'input', 'card', 'form', 'table', 'dialog', 'badge', 'avatar'],
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
    
    // === CONTENT MANAGEMENT ===
    {
      id: 'content/next-intl',
      params: {
        features: {
          routing: true,
          dynamicImports: true,
          seoOptimization: true
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

export default blogAppGenome;
