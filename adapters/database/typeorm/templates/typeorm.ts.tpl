import { DataSource } from 'typeorm';
import 'reflect-metadata';

// Database configuration
const AppDataSource = new DataSource({
  type: '<%= context..databaseType %>',
  url: process.env.DATABASE_URL,
  synchronize: <%= context..synchronize %>,
  logging: <%= context..logging %>,
  entities: [__dirname + '/entities/*.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [__dirname + '/subscribers/*.ts'],
});

// Initialize database connection
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established');
    return AppDataSource;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Get database connection
export const getDataSource = () => {
  if (!AppDataSource.isInitialized) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return AppDataSource;
};

export default AppDataSource;


