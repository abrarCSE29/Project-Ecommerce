const mongoose = require('mongoose');
const { mongoDbUrl } = require('../secret');

const connectDB = async (options = {}) => {
    try {
        await mongoose.connect(mongoDbUrl,options);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }
};

module.exports = connectDB;