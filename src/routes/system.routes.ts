import os from "os";
import { Router } from "express";
import pkg from "@/../package.json"; // asegúrate de la ruta
import { AppDataSource } from "@/config/db";
import logger from "@/config/logger";
const router = Router();

// Health check endpoint
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check the health of the API
 *     tags: [System]
 *     description: Provides the current operational status of the API, including timestamp and uptime.
 *     responses:
 *       200:
 *         description: API is healthy and operational.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The operational status of the API.
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: The current server timestamp in ISO 8601 format.
 *                   example: "2023-10-27T10:00:00.000Z"
 *                 uptime:
 *                   type: number
 *                   description: The uptime of the server process in seconds.
 *                   example: 12345.67
 *       503:
 *         description: API is unhealthy or unavailable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The operational status of the API.
 *                   example: unhealthy
 *                 error:
 *                   type: string
 *                   description: A message indicating the reason for the unhealthy status.
 *                   example: "Database connection lost"
 */
router.get("/health", (_, res) => {
  try {
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    // It's good practice to log the actual error for server-side debugging.
    logger.error('Health check failed:', error);

    // Determine the error message
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during the health check.";

    res.status(503).json({
      status: "unhealthy",
      error: errorMessage,
    });
  }
});

/**
 * @swagger
 * /api/version:
 *   get:
 *     summary: Get the version of the API
 *     tags: [System]
 *     description: Get the version of the API
 *     responses:
 *       200:
 *         description: The version of the API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 version:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dependencies:
 *                   type: object
 *                 devDependencies:
 *                   type: object
 */
router.get("/version", (_, res) => {
  try {
    // Assuming 'pkg' is defined and imported in the scope above this selection,
    // typically from a line like: import pkg from '../../package.json';
    res.status(200).json({
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      dependencies: pkg.dependencies,
      devDependencies: pkg.devDependencies,
    });
  } catch (error) {
    logger.error('Failed to retrieve package version information:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while fetching package information.";

    res.status(500).json({
      message: "Failed to retrieve package version information.",
      error: errorMessage,
    });
  }
});

/**
 * @swagger
 * /api/readiness:
 *   get:
 *     summary: Check if the application is ready to handle requests
 *     tags: [System]
 *     description: Checks database connectivity to determine if the application is ready
 *     responses:
 *       200:
 *         description: The application is ready to handle requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ready
 *       503:
 *         description: The application is not ready to handle requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: unready
 *                 details:
 *                   type: string
 *                   example: Database connection is not established
 */
router.get("/readiness", async (_, res) => {
  try {
    // Check if connection is established and ready
    if (!AppDataSource.isInitialized) {
      throw new Error('Database connection is not established');
    }
    
    // Test the connection with a simple query
    await AppDataSource.query('SELECT 1');
    
    res.status(200).json({
      status: "ready",
    });
  } catch (error) {
    logger.error('Readiness check failed:', error);
    
    res.status(503).json({
      status: "unready",
      details: error instanceof Error ? error.message : 'Unknown database error'
    });
  }
});

router.get("/info", (req, res) => {
  res.json({
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus().length,
    memory: {
      free: os.freemem(),
      total: os.totalmem(),
    },
    uptime: os.uptime(),
  });
});

export { router as systemRouter };
