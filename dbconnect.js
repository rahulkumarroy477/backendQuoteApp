const mongoose = require('mongoose');

const connectDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = connectDB;
