const Consultation = require('../models/Consultation');

// Create a new consultation (public API)
exports.createConsultation = async (req, res) => {
  try {
    const { fullName, phone, carModel, requestType, note } = req.body;
    
    // Basic validation
    if (!fullName || !phone || !carModel || !requestType) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin bắt buộc (Họ tên, SĐT, Xe, Loại yêu cầu)' });
    }

    const consultation = new Consultation({
      fullName,
      phone,
      carModel,
      requestType,
      note
    });

    await consultation.save();
    res.status(201).json({ message: 'Đăng ký nhận tư vấn thành công!', consultation });
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Get consultations (Admin/Employee API)
exports.getConsultations = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, requestType } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (status) query.status = status;
    if (requestType) query.requestType = requestType;

    const consultations = await Consultation.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Consultation.countDocuments(query);

    res.status(200).json({
      consultations,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Update consultation status (Admin/Employee API)
exports.updateConsultationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'contacted', 'completed', 'canceled'].includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
    }

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!consultation) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu tư vấn' });
    }

    res.status(200).json({ message: 'Cập nhật trạng thái thành công', consultation });
  } catch (error) {
    console.error('Error updating consultation status:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};
