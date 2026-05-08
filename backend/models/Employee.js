const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  position: {
    type: String,
    default: 'Nhân viên',
  },
  department: {
    type: String,
    enum: ['sales', 'service', 'finance', 'hr', 'administration'],
    default: 'sales',
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: Number,
    default: 0,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  dob: Date,
  identityNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave', 'terminated'],
    default: 'active',
  },  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
