require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Car = require('../models/Car');
const User = require('../models/User');
const Customer = require('../models/Customer');

const seedDatabase = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-management';
    
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB kết nối thành công');

    // Clear existing data
    await Car.deleteMany({});
    await User.deleteMany({});
    await Customer.deleteMany({});

    // Seed users
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });

    const salesman = new User({
      name: 'Salesman',
      email: 'salesman@example.com',
      password: 'salesman123',
      role: 'employee',
    });

    await adminUser.save();
    await salesman.save();

    // Seed cars
    const cars = [
      {
        name: 'VinFast VF 3',
        model: 'VF3',
        price: 300000000,
        year: 2024,
        color: 'Trắng',
        category: 'sedan',
        stock: 10,
        specifications: {
          engine: '1.0L Turbo',
          fuelType: 'Xăng',
          transmission: 'Tự động',
          seats: 5,
          fuelConsumption: '7.5L/100km',
        },
        status: 'available',
      },
      {
        name: 'VinFast VF 5',
        model: 'VF5',
        price: 400000000,
        year: 2024,
        color: 'Đen',
        category: 'suv',
        stock: 8,
        specifications: {
          engine: '1.5L Turbo',
          fuelType: 'Xăng',
          transmission: 'Tự động',
          seats: 5,
          fuelConsumption: '8.5L/100km',
        },
        status: 'available',
      },
      {
        name: 'VinFast VF 6',
        model: 'VF6',
        price: 500000000,
        year: 2024,
        color: 'Xám',
        category: 'suv',
        stock: 6,
        specifications: {
          engine: '2.0L Turbo',
          fuelType: 'Xăng',
          transmission: 'Tự động',
          seats: 5,
          fuelConsumption: '9.5L/100km',
        },
        status: 'available',
      },
      {
        name: 'VinFast VF 7',
        model: 'VF7',
        price: 600000000,
        year: 2024,
        color: 'Đỏ',
        category: 'suv',
        stock: 5,
        specifications: {
          engine: '2.0L Turbo',
          fuelType: 'Xăng/Điện',
          transmission: 'Tự động',
          seats: 7,
          fuelConsumption: '10.5L/100km',
        },
        status: 'available',
      },
      {
        name: 'VinFast VF 8',
        model: 'VF8',
        price: 700000000,
        year: 2024,
        color: 'Bạc',
        category: 'suv',
        stock: 4,
        specifications: {
          engine: '2.5L Turbo',
          fuelType: 'Xăng',
          transmission: 'Tự động',
          seats: 7,
          fuelConsumption: '11L/100km',
        },
        status: 'available',
      },
    ];

    await Car.insertMany(cars);

    // Seed customers
    const customers = [
      {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0912345678',
        address: {
          street: '123 Đường Lê Lợi',
          city: 'Hà Nội',
          state: 'Hà Nội',
          country: 'Việt Nam',
        },
        gender: 'male',
        identityNumber: '123456789',
        status: 'active',
      },
      {
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        phone: '0987654321',
        address: {
          street: '456 Đường Nguyễn Huệ',
          city: 'TP. Hồ Chí Minh',
          state: 'TP. Hồ Chí Minh',
          country: 'Việt Nam',
        },
        gender: 'female',
        identityNumber: '987654321',
        status: 'active',
      },
    ];

    await Customer.insertMany(customers);

    console.log('Seed data đã được thêm thành công');
    process.exit(0);
  } catch (err) {
    console.error('Lỗi:', err.message);
    process.exit(1);
  }
};

seedDatabase();
