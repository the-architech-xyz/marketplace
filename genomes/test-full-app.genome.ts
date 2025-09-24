/**
 * Test Full App Genome
 * 
 * This genome demonstrates a complete application with type-safety.
 * Used for testing the full generation pipeline and schema validation.
 */

import { Genome } from '@thearchitech.xyz/marketplace';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'test-full-app',
    description: 'A complete application for testing The Architech pipeline',
    version: '0.1.0',
    framework: 'nextjs',
    path: './test-full-app'
  },
  modules: [
    // Framework module
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        appRouter: true,
        srcDir: true,
        importAlias: '@/*'
      },
      features: {
        performance: true,
        security: true,
        'server-actions': true
      }
    },
    
    // UI module
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: ['button', 'card', 'input', 'dialog', 'form'],
        theme: 'dark',
        darkMode: true
      },
      features: {
        theming: true,
        accessibility: true
      }
    },
    
    // Database module
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',
        migrations: true,
        studio: true,
        databaseType: 'postgresql'
      }
    },

    // Authentication module
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['github', 'google'],
        session: 'jwt',
        csrf: true,
        rateLimit: true
      }
    },

    // Observability
    {
      id: 'observability/sentry',
      parameters: {
        errorTracking: true,
        performance: true,
        sessionReplay: false
      }
    }
  ]
};

export default genome;
