import { Sequelize } from 'sequelize';

// Database configuration
const config = {
  development: {
    username: '{{module.parameters.username}}',
    password: '{{module.parameters.password}}',
    database: '{{module.parameters.databaseName}}_dev',
    host: '{{module.parameters.host}}',
    port: {{module.parameters.port}},
    dialect: '{{module.parameters.databaseType}}',
    logging: {{module.parameters.logging}},
    pool: {{#if module.parameters.pool}}{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }{{else}}false{{/if}}
  },
  test: {
    username: '{{module.parameters.username}}',
    password: '{{module.parameters.password}}',
    database: '{{module.parameters.databaseName}}_test',
    host: '{{module.parameters.host}}',
    port: {{module.parameters.port}},
    dialect: '{{module.parameters.databaseType}}',
    logging: false,
    pool: false
  },
  production: {
    username: process.env.DB_USERNAME || '{{module.parameters.username}}',
    password: process.env.DB_PASSWORD || '{{module.parameters.password}}',
    database: process.env.DB_NAME || '{{module.parameters.databaseName}}',
    host: process.env.DB_HOST || '{{module.parameters.host}}',
    port: parseInt(process.env.DB_PORT || '{{module.parameters.port}}'),
    dialect: '{{module.parameters.databaseType}}',
    logging: false,
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000
    }
  }
};

// Create Sequelize instance
const sequelize = new Sequelize(
  config[process.env.NODE_ENV as keyof typeof config] || config.development
);

export { sequelize, config };
export default sequelize;


