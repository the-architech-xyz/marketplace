import { Blueprint } from '@thearchitech.xyz/types';

const sentryDrizzleNextjsIntegrationBlueprint: Blueprint = {
  id: 'sentry-drizzle-nextjs-integration',
  name: 'Sentry Drizzle Next.js Integration',
  description: 'Complete error monitoring with Sentry, database integration with Drizzle, and Next.js for full-stack error tracking',
  version: '1.0.0',
  actions: [
    // Create Sentry Configuration
    {
      type: 'CREATE_FILE',
      path: 'src/lib/sentry.ts',
      template: 'templates/sentry.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/sentry-drizzle.ts',
      template: 'templates/sentry-drizzle.ts.tpl'
    },
    // Create Error Monitoring Components
    {
      type: 'CREATE_FILE',
      path: 'src/components/errors/ErrorBoundary.tsx',
      template: 'templates/ErrorBoundary.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/errors/ErrorFallback.tsx',
      template: 'templates/ErrorFallback.tsx.tpl'
    },
    // Install Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@sentry/nextjs',
        '@sentry/profiling-node',
        'drizzle-orm'
      ],
    },
    // Add Environment Variables
    {
      type: 'ADD_ENV_VAR',
      key: 'SENTRY_DSN',
      value: '',
      description: 'Sentry DSN for error tracking'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'SENTRY_ORG',
      value: '',
      description: 'Sentry organization slug'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'SENTRY_PROJECT',
      value: '',
      description: 'Sentry project slug'
    }
  ]
};

export default sentryDrizzleNextjsIntegrationBlueprint;