const mongoose = require('mongoose');

// MongoDB Localhost Connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/myDatabase');  // Use local MongoDB URI
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
