/**
 * Sequelize ORM Blueprint
 * 
 * Sets up Sequelize ORM with basic configuration
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const sequelizeBlueprint: Blueprint = {
  id: 'sequelize-base-setup',
  name: 'Sequelize Base Setup',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['sequelize', '{{module.parameters.databaseType}}']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['sequelize-cli', '@types/sequelize'],
      isDev: true
    },
    {
      type: 'CREATE_FILE',
      path: '{{paths.database_config}}/sequelize.ts',
      template: 'templates/sequelize.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: '{{paths.database_config}}/index.ts',
      template: 'templates/index.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: '.sequelizerc',
      template: 'templates/.sequelizerc.tpl'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'DB_HOST',
      value: '{{module.parameters.host}}',
      description: 'Database host'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'DB_PORT',
      value: '{{module.parameters.port}}',
      description: 'Database port'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'DB_USERNAME',
      value: '{{module.parameters.username}}',
      description: 'Database username'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'DB_PASSWORD',
      value: '{{module.parameters.password}}',
      description: 'Database password'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'DB_NAME',
      value: '{{module.parameters.databaseName}}',
      description: 'Database name'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'DB_LOGGING',
      value: '{{module.parameters.logging}}',
      description: 'Sequelize logging'
    },
    {
      type: 'ADD_ENV_VAR',
      key: 'DB_POOL',
      value: '{{module.parameters.pool}}',
      description: 'Sequelize connection pool'
    }
  ]
};
