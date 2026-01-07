const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-management';
    
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB kết nối thành công');
    return mongoose.connection;
  } catch (err) {
    console.error('Lỗi kết nối MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
