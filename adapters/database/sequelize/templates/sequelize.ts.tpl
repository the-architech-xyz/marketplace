import { Sequelize } from 'sequelize';

// Database configuration
const config = {
  development: {
    username: '<%= context..username %>',
    password: '<%= context..password %>',
    database: '<%= context..databaseName %>_dev',
    host: '<%= context..host %>',
    port: <%= context..port %>,
    dialect: '<%= context..databaseType %>',
    logging: <%= context..logging %>,
    pool: <% if (context..pool) { %>{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }<% } else { %>false<% } %>
  },
  test: {
    username: '<%= context..username %>',
    password: '<%= context..password %>',
    database: '<%= context..databaseName %>_test',
    host: '<%= context..host %>',
    port: <%= context..port %>,
    dialect: '<%= context..databaseType %>',
    logging: false,
    pool: false
  },
  production: {
    username: process.env.DB_USERNAME || '<%= context..username %>',
    password: process.env.DB_PASSWORD || '<%= context..password %>',
    database: process.env.DB_NAME || '<%= context..databaseName %>',
    host: process.env.DB_HOST || '<%= context..host %>',
    port: parseInt(process.env.DB_PORT || '<%= context..port %>'),
    dialect: '<%= context..databaseType %>',
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


