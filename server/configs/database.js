// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => 
{
    try
    {
        // Connect to the MongoDB database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    }
    catch (err)
    {
        console.error('MongoDB connection error:', err.message);
        // Exit the process with an error code
        process.exit(1);
    }
};

module.exports = connectDB;