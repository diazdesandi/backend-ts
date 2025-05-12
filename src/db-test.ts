import 'reflect-metadata';
import { AppDataSource } from './config/db';
import { env } from './config/env';
import logger from './config/logger';

// Log the database connection settings
logger.info('Attempting to connect to database with settings:', {
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.POSTGRES_DB,
  username: env.POSTGRES_USER,
  // Don't log the actual password for security reasons
  password: '***'
});

// Try to initialize the database connection
AppDataSource.initialize()
  .then(() => {
    logger.info('✅ Database connected successfully');
    // Perform a simple query to verify connection
    return AppDataSource.query('SELECT 1 as result');
  })
  .then((result) => {
    logger.info('✅ Query executed successfully:', result);
    AppDataSource.destroy();
  })
  .catch((error) => {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
  }); 