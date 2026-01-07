const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
  },
  color: {
    type: String,
  },
  // Thêm các trường mới cho FE
  origin_of_car: {
    type: String,
    default: '',
  },
  date_of_import: {
    type: String,
    default: '',
  },
  car_sold: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  specifications: {
    engine: String,
    fuelType: String,
    transmission: String,
    seats: Number,
    fuelConsumption: String,
  },
  images: [String],
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ['sedan', 'suv', 'coupe', 'hatchback', 'van'],
  },
  status: {
    type: String,
    enum: ['available', 'unavailable', 'discontinued'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Car', carSchema);
