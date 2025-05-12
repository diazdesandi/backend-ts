import { pino } from 'pino';

// Create a basic logger with default settings
const logger = pino({
  level: 'info',
});

// Function to configure logger with environment-specific settings
export function configureLogger(nodeEnv: string): void {
  const isDevelopment = nodeEnv !== 'production';
  
  // Update logger options
  const loggerOptions = {
    level: isDevelopment ? 'debug' : 'info',
    transport: isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  };
  
  // Apply new options
  Object.assign(logger, pino(loggerOptions));
}

export default logger; 