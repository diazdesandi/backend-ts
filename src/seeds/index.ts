// src/seeds/index.ts
import { AppDataSource } from '@/config/db';
import { User, Todo } from '@/entities';
import bcrypt from 'bcryptjs';
import { logger } from '@/config';


// Load environment variables


async function seed() {
  let dataSource: typeof AppDataSource | null = null;
  
  try {
    // Initialize the database connection
    dataSource = await AppDataSource.initialize();
    logger.info('Connected to database');

    // Clear existing data in the correct order
    await clearExistingData(dataSource);
    logger.info('Cleared existing data');

    // Create sample users
    const users = await createUsers(dataSource);
    logger.info('Created sample users');

    // Create sample todos
    await createTodos(dataSource, users);
    logger.info('Created sample todos');

    logger.info('Seeding completed successfully');
  } catch (error) {
    logger.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
    }
  }
}

async function clearExistingData(dataSource: typeof AppDataSource) {
  const queryRunner = dataSource.createQueryRunner();
  
  try {
    // Start a transaction
    await queryRunner.startTransaction();
    
    // Disable foreign key checks
    await queryRunner.query('SET CONSTRAINTS ALL DEFERRED');
    
    // Clear both tables
    await queryRunner.query('TRUNCATE TABLE todos CASCADE');
    await queryRunner.query('TRUNCATE TABLE users CASCADE');
    
    // Re-enable foreign key checks
    await queryRunner.query('SET CONSTRAINTS ALL IMMEDIATE');
    
    // Commit the transaction
    await queryRunner.commitTransaction();
  } catch (error) {
    // Rollback in case of error
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    // Release the query runner
    await queryRunner.release();
  }
}

async function createUsers(dataSource: typeof AppDataSource): Promise<User[]> {
  const userRepository = dataSource.getRepository(User);

  const users = [
    {
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'John Doe',
    },
    {
      email: 'jane.smith@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Jane Smith',
    },
    {
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
    },
  ];

  return await userRepository.save(users);
}

async function createTodos(dataSource: typeof AppDataSource, users: User[]): Promise<void> {
  const todoRepository = dataSource.getRepository(Todo);

  const todos = [
    {
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the API endpoints',
      completed: false,
      user: users[0],
    },
    {
      title: 'Implement user authentication',
      description: 'Add JWT authentication to the API',
      completed: true,
      user: users[0],
    },
    {
      title: 'Set up CI/CD pipeline',
      description: 'Configure GitHub Actions for automated deployment',
      completed: false,
      user: users[1],
    },
    {
      title: 'Write unit tests',
      description: 'Add Jest tests for all API endpoints',
      completed: false,
      user: users[1],
    },
    {
      title: 'Review security measures',
      description: 'Audit and update security configurations',
      completed: true,
      user: users[2],
    },
  ];

  await todoRepository.save(todos);
}

// Run the seed function
seed().catch((error) => {
  logger.error('Fatal error during seeding:', error);
  process.exit(1);
});