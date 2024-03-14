const dotenv = require('dotenv');

dotenv.config();

// database connection function
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const MONGO_URL = process.env.MONGO_URL;

// function to connect with DB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log(`Database Running ${mongoose.connection.host}`);
    } catch (error) {
        console.log(error)
    }
};

// const connectDB = async (MONGO_URL, options = {}) => {
//     try {
//         const defaultOptions = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             bufferCommands: false, // Disable command buffering
//             // Add other options here as needed
//         };

//         const connectionOptions = { ...defaultOptions, ...options };

//         await mongoose.connect(MONGO_URL, connectionOptions);
//         console.log(`Database running at ${mongoose.connection.host}`);
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//     }
// };

module.exports = connectDB;
