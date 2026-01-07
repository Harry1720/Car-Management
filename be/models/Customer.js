const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  dob: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  identityNumber: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
  },
  carsInterested: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
