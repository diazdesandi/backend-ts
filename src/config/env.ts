import { z } from "zod";
import dotenv from "dotenv";
import logger, { configureLogger } from "./logger";
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string(),

  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DB_PORT: z.coerce.number(),
  DB_HOST: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  logger.error('❌ Invalid environment variables:', _env.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = _env.data;

// Configure logger with environment settings after env is initialized
configureLogger(env.NODE_ENV);