const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  depositAmount: {
    type: Number,
    required: [true, 'Số tiền đặt cọc là bắt buộc'],
    min: [0, 'Số tiền đặt cọc phải lớn hơn 0'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Tổng giá là bắt buộc'],
    min: [0, 'Tổng giá phải lớn hơn 0'],
  },
  remainingBalance: {
    type: Number,
    required: [true, 'Số tiền còn lại là bắt buộc'],
    min: [0, 'Số tiền còn lại không thể âm'],
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: [0, 'Số tiền giảm không thể âm'],
  },
  discountNote: String,
  depositDate: {
    type: Date,
    default: Date.now,
  },
  expectedDeliveryDate: Date,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Deposit', depositSchema);
