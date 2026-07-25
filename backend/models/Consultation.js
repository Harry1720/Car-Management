const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  carModel: { type: String, required: true }, // VD: VF 8, VF Wild
  requestType: { 
    type: String, 
    enum: ['test_drive', 'promotion', 'general'], 
    required: true,
    default: 'general'
  },
  note: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'completed', 'canceled'], 
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
