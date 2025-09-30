/**
 * Drizzle Base Blueprint
 * 
 * Sets up Drizzle ORM with minimal configuration
 * Advanced features are available as separate features
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const drizzleBlueprint: Blueprint = {
  id: 'drizzle-base-setup',
  name: 'Drizzle Base Setup',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['drizzle-orm', 'pg']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['drizzle-kit', '@types/pg'],
      isDev: true
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/index.ts',
      template: 'templates/db-index.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/schema.ts',
      template: 'templates/schema.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'drizzle.config.ts',
      template: 'templates/drizzle.config.ts.tpl'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'DATABASE_URL',
      value: 'postgresql://username:password@localhost:5432/{{project.name}}',
      description: 'Database connection string'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'db:generate',
      command: 'drizzle-kit generate'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'db:migrate',
      command: 'drizzle-kit migrate'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'db:studio',
      command: 'drizzle-kit studio'
    }
  ]
};
