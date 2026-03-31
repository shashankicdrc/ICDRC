import logger from "#utils/logger"
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL;
        if (!MONGO_URL) {
            logger.error("MONGO_URL environment variable is not set!");
            process.exit(1);
        }
        const dbInstance = await mongoose.connect(MONGO_URL);
        logger.info(`MongoDB Connected to ${dbInstance.connection.host}`);
        return { connected: true }
    } catch (error) {
        logger.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;
