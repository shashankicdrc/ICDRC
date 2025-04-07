/**
 * Connection options for BullMQ, used to connect to a Redis server.
 * In production, connects to "redis"; otherwise, connects to "localhost".
 *
 * @type {{ host: string, port: number }}
 */
const connector = {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
};

/**
 * Default configuration for removing completed or failed jobs in BullMQ.
 *
 * @type {{ removeOnComplete: { age: number }, removeOnFail: { age: number } }}
 */
const defaultRemoveConfig = {
    removeOnComplete: {
        age: 3600, // Remove completed jobs after 1 hour
    },
    removeOnFail: {
        age: 24 * 3600, // Remove failed jobs after 24 hours
    },
};

export { connector, defaultRemoveConfig };
