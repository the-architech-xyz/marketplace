/**
 * Ultimate App Genome - Minimal Test Version
 * 
 * This is a minimal version to test the genome structure and TypeScript types
 */

import { Genome } from '@thearchitech.xyz/marketplace/types';

const genome: Genome = {
  version: '1.0.0',
  project: {
    name: 'ultimate-app-minimal',
    description: 'Minimal test of the ultimate genome structure',
    version: '0.1.0',
    framework: 'nextjs',
    path: './ultimate-app-minimal'
  },
  modules: [
    // Core framework
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

    // UI with minimal components
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: ['button', 'card', 'input', 'form'],
        theme: 'dark',
        darkMode: true
      },
      features: {
        theming: true,
        accessibility: true
      }
    },

    // Database
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',
        migrations: true,
        studio: true,
        databaseType: 'postgresql'
      },
      features: {
        migrations: true,
        studio: true
      }
    },

    // Auth
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['github', 'email'],
        session: 'jwt',
        csrf: true
      },
      features: {
        'oauth-providers': true,
        'session-management': true
      }
    },

    // Key integrations
    {
      id: 'drizzle-nextjs-integration',
      parameters: {
        connectionPooling: true,
        typeSafety: true
      },
      features: {
        connectionPooling: true,
        typeSafety: true
      }
    },

    {
      id: 'better-auth-drizzle-integration',
      parameters: {
        userSchema: true,
        adapterLogic: true
      },
      features: {
        userSchema: true,
        adapterLogic: true
      }
    }
  ]
};

export default genome;
