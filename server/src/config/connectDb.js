import logger from "#utils/logger"
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL;
        logger.info("Connecting to MongoDB...");
        const dbInstance = await mongoose.connect(MONGO_URL, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
        });
        logger.info(`Database is connected successfully to ${dbInstance.connection.host}`)
        return { connected: true }
    } catch (error) {
        console.error("DATABASE CONNECTION ERROR:", error.message);
        process.exit(1);
    }
}

export default connectDb;
