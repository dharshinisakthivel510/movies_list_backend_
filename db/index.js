const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected....');
        }
            catch(err){
                console.error('MongoDB connection error:');
                throw (err);
            }
}

module.exports = connectDB;