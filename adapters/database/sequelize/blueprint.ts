/**
 * Sequelize ORM Blueprint
 * 
 * Sets up Sequelize ORM with basic configuration
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const sequelizeBlueprint: Blueprint = {
  id: 'sequelize-base-setup',
  name: 'Sequelize Base Setup',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['sequelize', '${context..databaseType}']
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['sequelize-cli', '@types/sequelize'],
      isDev: true
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.database_config}/sequelize.ts',
      template: 'templates/sequelize.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.database_config}/index.ts',
      template: 'templates/index.ts.tpl',
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.sequelizerc',
      template: 'templates/.sequelizerc.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'DB_HOST',
      value: '${context..host}',
      description: 'Database host'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'DB_PORT',
      value: '${context..port}',
      description: 'Database port'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'DB_USERNAME',
      value: '${context..username}',
      description: 'Database username'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'DB_PASSWORD',
      value: '${context..password}',
      description: 'Database password'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'DB_NAME',
      value: '${context..databaseName}',
      description: 'Database name'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'DB_LOGGING',
      value: '${context..logging}',
      description: 'Sequelize logging'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'DB_POOL',
      value: '${context..pool}',
      description: 'Sequelize connection pool'
    }
  ]
};
