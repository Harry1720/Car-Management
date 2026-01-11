const Accounting = require('../models/Accounting');

// Get all accounting records
exports.getAllAccounting = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, month } = req.query;
    const skip = (page - 1) * limit;

    let query = { isDeleted: false };
    if (type) query.type = type;
    if (category) query.category = category;
    if (month) query.month = month;

    const records = await Accounting.find(query)
      .populate('transactionId')
      .populate('customerId')
      .populate('carId')
      .populate('recordedBy')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ accountingDate: -1 });

    const total = await Accounting.countDocuments(query);

    res.json({
      records,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get accounting record by ID
exports.getAccountingById = async (req, res) => {
  try {
    const record = await Accounting.findById(req.params.id)
      .populate('transactionId')
      .populate('customerId')
      .populate('carId')
      .populate('recordedBy');
    if (!record) {
      return res.status(404).json({ message: 'Bản ghi kế toán không tồn tại' });
    }
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Create accounting record
exports.createAccounting = async (req, res) => {
  try {
    const {
      transactionId,
      customerId,
      carId,
      type,
      amount,
      category,
      description,
      month,
    } = req.body;

    const record = new Accounting({
      transactionId,
      customerId,
      carId,
      type,
      amount,
      category,
      description,
      month: month || new Date().toISOString().slice(0, 7),
      recordedBy: req.user.id,
    });

    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Update accounting record
exports.updateAccounting = async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: Date.now() };
    const record = await Accounting.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate('transactionId').populate('customerId').populate('carId').populate('recordedBy');

    if (!record) {
      return res.status(404).json({ message: 'Bản ghi kế toán không tồn tại' });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Delete accounting record
exports.deleteAccounting = async (req, res) => {
  try {
    const record = await Accounting.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Bản ghi kế toán không tồn tại' });
    }
    res.json({ message: 'Xóa bản ghi kế toán thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get accounting summary by month
exports.getAccountingSummaryByMonth = async (req, res) => {
  try {
    const { month } = req.params;

    const summary = await Accounting.aggregate([
      { $match: { month } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const records = await Accounting.find({ month, isDeleted: false })
      .populate('transactionId')
      .populate('customerId')
      .populate('carId');

    res.json({
      month,
      summary,
      records,
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get accounting statistics
exports.getAccountingStatistics = async (req, res) => {
  try {
    const incomeStats = await Accounting.aggregate([
      { $match: { type: 'income', isDeleted: false } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const expenseStats = await Accounting.aggregate([
      { $match: { type: 'expense', isDeleted: false } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const monthlyStats = await Accounting.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            month: '$month',
            type: '$type',
          },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.month': 1 } },
    ]);

    res.json({
      incomeStats,
      expenseStats,
      monthlyStats,
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
