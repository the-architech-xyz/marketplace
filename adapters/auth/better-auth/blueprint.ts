/**
 * Better Auth Base Blueprint
 * 
 * Sets up Better Auth with minimal configuration (email/password only)
 * Advanced features are available as separate features
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const betterAuthBlueprint: Blueprint = {
  id: 'better-auth-base-setup',
  name: 'Better Auth Base Setup',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['better-auth']
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.auth_config}}/config.ts',
      template: 'templates/config.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.auth_config}}/api.ts',
      template: 'templates/api.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.auth_config}}/client.ts',
      template: 'templates/client.ts.tpl',
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'AUTH_SECRET',
      value: 'your-secret-key-here',
      description: 'Better Auth secret key'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'AUTH_URL',
      value: '{{env.APP_URL}}',
      description: 'Authentication base URL'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'DATABASE_URL',
      value: 'postgresql://username:password@localhost:5432/{{project.name}}',
      description: 'Database connection string (if using Drizzle)'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.auth_config}}/INTEGRATION_GUIDE.md',
      template: 'templates/INTEGRATION_GUIDE.md.tpl',
    }
  ]
};
