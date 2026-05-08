const mongoose = require('mongoose');
const Car = require('./models/Car');
require('dotenv').config();

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.ggfyofy.mongodb.net/car-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB kết nối thành công'))
.catch(err => console.log('Lỗi kết nối MongoDB:', err));

// Dữ liệu xe mẫu
const sampleCars = [
  {
    name: "VinFast VF8",
    model: "VINVF8B",
    price: 1089000000,
    year: 2023,
    color: "Xanh dương",
    stock: 15,
    car_sold: 8,
    origin_of_car: "Việt Nam",
    date_of_import: "2024-01-15",
    specifications: {
      engine: "100 kW",
      transmission: "Tự động",
      fuelType: "Điện",
      fuelConsumption: "~326,4 km"
    }
  },
  {
    name: "VinFast VF9",
    model: "VINVF9BL",
    price: 1491000000,
    year: 2023,
    color: "Đen",
    stock: 12,
    car_sold: 5,
    origin_of_car: "Việt Nam",
    date_of_import: "2024-02-01",
    specifications: {
      engine: "150 kW",
      transmission: "Tự động",
      fuelType: "Điện",
      fuelConsumption: "~400 km"
    }
  },
  {
    name: "VinFast VF5",
    model: "VINVF5B",
    price: 458000000,
    year: 2023,
    color: "Xanh dương",
    stock: 20,
    car_sold: 15,
    origin_of_car: "Việt Nam",
    date_of_import: "2024-03-10",
    specifications: {
      engine: "70 kW",
      transmission: "Tự động",
      fuelType: "Điện",
      fuelConsumption: "~250 km"
    }
  }
];

// Hàm seed dữ liệu
const seedCars = async () => {
  try {
    // Xóa dữ liệu cũ
    await Car.deleteMany({});
    console.log('Đã xóa dữ liệu cũ');

    // Thêm dữ liệu mới
    const createdCars = await Car.insertMany(sampleCars);
    console.log(`Đã tạo ${createdCars.length} chiếc xe`);
    
    // Hiển thị thông tin
    createdCars.forEach(car => {
      console.log(`\n✅ Xe: ${car.name} (${car.model})`);
      console.log(`   Giá: ${car.price.toLocaleString()} VNĐ`);
      console.log(`   Specs:`);
      console.log(`   - Engine: ${car.specifications?.engine}`);
      console.log(`   - Transmission: ${car.specifications?.transmission}`);
      console.log(`   - Fuel Type: ${car.specifications?.fuelType}`);
      console.log(`   - Range: ${car.specifications?.fuelConsumption}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  }
};

seedCars();
