const mongoose = require('mongoose');

const accountingSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['deposit', 'sale', 'service', 'maintenance', 'salary', 'utilities', 'other'],
  },
  description: String,
  month: {
    type: String,
    required: true, // Format: "2026-01"
  },
  accountingDate: {
    type: Date,
    default: Date.now,
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isDeleted: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model('Accounting', accountingSchema);
