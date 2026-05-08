const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  depositId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deposit',
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'credit_card', 'check'],
    default: 'bank_transfer',
  },
  description: String,
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
  reference: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

module.exports = mongoose.model('Transaction', transactionSchema);
