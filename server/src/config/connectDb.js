import logger from "#utils/logger"
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL;
        const dbInstance = await mongoose.connect(MONGO_URL)
        logger.info(`MongoDB Connected`)
        //logger.info(`Database is connected successfully to ${dbInstance.connection.host}`)
        return { connected: true }
    } catch (error) {
        logger.error(error.message)
    }
}

export default connectDb;
