/**
 * MODERN BLOG / CMS STARTER
 * 
 * A complete, production-ready blogging platform with internationalization,
 * SEO optimization, and a beautiful content management interface.
 * 
 * Stack: Next.js + Drizzle + Resend + i18n + Shadcn UI
 * Pattern: Content-first architecture with author workflow
 * Use Case: Tech blogs, documentation sites, content publishers
 */

import { defineGenome } from '@thearchitech.xyz/marketplace/types';

export default defineGenome({ 
  version: '1.0.0',
  project: {
    name: 'modern-blog-cms',
    framework: 'nextjs',
    path: './blog-app',
    description: 'Modern blog platform with CMS, i18n, and email notifications',
  },
  
  modules: [
    // Core Framework
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        appRouter: true,
        srcDir: true,
        importAlias: '@',
        features: {
          seo: true,           // Meta tags, OpenGraph, sitemaps
          imageOptimization: true,
          mdx: true,           // Markdown support for blog posts
        },
      },
    },

    // Database for Content Storage
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',        // Database service provider
        databaseType: 'postgresql',  // Database type
        features: {
          migrations: true,
          relations: true,       // Posts → Authors → Comments
          seeding: true,         // Sample blog posts
        },
      },
    },

    // UI Foundation
    {
      id: 'ui/shadcn-ui',
      parameters: {
        theme: 'default',
        components: [
          'button', 'card', 'input', 'textarea', 'label',
          'badge', 'avatar', 'separator', 'dialog', 
          'dropdown-menu', 'table', 'pagination'
        ],
      },
    },

    // Internationalization
    {
      id: 'content/next-intl',
      parameters: {
        locales: ['en', 'fr', 'es', 'de'],
        defaultLocale: 'en',
        features: {
          routing: true,         // /en/blog, /fr/blog
          dateFormatting: true,
          numberFormatting: true,
        },
      },
    },

    // Email Notifications (for subscribers)
    {
      id: 'email/resend',
      parameters: {
        features: {
          templates: true,         // Newsletter templates
          analytics: true,         // Track open rates
        },
      },
    },

    {
      id: 'features/emailing/backend/resend-nextjs',
    },

    {
      id: 'features/emailing/frontend/shadcn',
      parameters: {
        features: {
          templates: true,       // Email template editor
          campaigns: true,       // Newsletter campaigns
          analytics: true,       // Email performance
        },
      },
    },

    // Simple Auth (for authors/editors)
    {
      id: 'auth/better-auth',
      parameters: {
        emailPassword: true,
      },
    },

    {
      id: 'connectors/auth/better-auth-nextjs',
      parameters: {},
    },

    {
      id: 'features/auth/tech-stack',
      parameters: {},
    },

    {
      id: 'features/auth/frontend/shadcn',
      parameters: {
        features: {
          signIn: true,
          signUp: true,
          passwordReset: true,
          profile: true,
        },
      },
    },

    // Golden Core: Essential tech stack
    {
      id: 'core/golden-stack',
      parameters: {
        zustand: {
          persistence: true,     // Save drafts
          devtools: true,
          immer: true,
        },
        vitest: {
          coverage: true,
        },
        eslint: {
          strict: true,
        },
        prettier: {
          tailwind: true,
        },
      },
    },

    // Monitoring (optional but recommended)
    {
      id: 'observability/sentry',
      parameters: {
        features: {
          errorTracking: true,
          performance: true,
        },
      },
    },

    {
      id: 'features/monitoring/shadcn',
      parameters: {
        features: {
          performance: true,
          errors: true,
        },
      },
    },
  ],
});

