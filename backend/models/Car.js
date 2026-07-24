const mongoose = require('mongoose');

const colorVariantSchema = new mongoose.Schema({
  colorName: { type: String, required: true },
  colorHex: { type: String, required: true },
  image: { type: String },
  stock: { type: Number, default: 0, min: [0, 'Số lượng tồn kho không thể âm'] },
  sold: { type: Number, default: 0, min: [0, 'Số lượng đã bán không thể âm'] }
});

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
    required: [true, 'Giá xe là bắt buộc'],
    min: [0, 'Giá xe phải lớn hơn 0'],
  },
  year: {
    type: Number,
    min: [2000, 'Năm sản xuất phải từ 2000 trở lên'],
    max: [new Date().getFullYear() + 1, 'Năm sản xuất không hợp lệ'],
  },
  // Thêm các trường mới cho FE
  origin_of_car: {
    type: String,
    default: '',
  },
  date_of_import: {
    type: Date,
  },

  description: {
    type: String,
  },
  specifications: {
    motorPower: String,
    energyConsumption: String,
    seats: Number,
    range: String,
    batteryCapacity: String,
    acceleration: String,
  },
  variants: [colorVariantSchema],
  category: {
    type: String,
    enum: ['sedan', 'suv', 'coupe', 'hatchback', 'van'],
  },
  status: {
    type: String,
    enum: ['available', 'unavailable', 'discontinued'],
    default: 'available',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  articleContent: {
    type: String,
    default: '',
  },
  deletedAt: {
    type: Date,
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
