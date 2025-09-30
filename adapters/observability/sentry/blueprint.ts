/**
 * Sentry Error Monitoring Blueprint
 * 
 * Sets up framework-agnostic Sentry integration for error monitoring and performance tracking
 * Creates Sentry configuration, error boundaries, and monitoring utilities that work with any framework
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const sentryBlueprint: Blueprint = {
  id: 'sentry-observability-setup',
  name: 'Sentry Error Monitoring Setup',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@sentry/browser', '@sentry/node']
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/sentry/client.ts',
      template: 'templates/client.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/sentry/server.ts',
      template: 'templates/server.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/sentry/config.ts',
      template: 'templates/config.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/sentry/performance.ts',
      template: 'templates/performance.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/sentry/analytics.ts',
      template: 'templates/analytics.ts.tpl'
    },  
    {
      type: 'ADD_ENV_VAR',
      key: 'SENTRY_DSN',
      value: 'https://...',
      description: 'Sentry DSN for server-side error reporting'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'SENTRY_DSN',
      value: 'https://...',
      description: 'Sentry DSN for client-side error reporting'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'SENTRY_ORG',
      value: 'your-org',
      description: 'Sentry organization slug'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'SENTRY_PROJECT',
      value: 'your-project',
      description: 'Sentry project slug'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'SENTRY_RELEASE',
      value: '1.0.0',
      description: 'Sentry release version'
    }
  ]
};