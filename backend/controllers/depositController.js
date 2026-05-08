const Deposit = require('../models/Deposit');

// Get all deposits
exports.getAllDeposits = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.status = status;

    const deposits = await Deposit.find(query)
      .populate('customerId')
      .populate('carId')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Deposit.countDocuments(query);

    res.json({
      deposits,
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

// Get deposit by ID
exports.getDepositById = async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id)
      .populate('customerId')
      .populate('carId');
    if (!deposit) {
      return res.status(404).json({ message: 'Đặt cọc không tồn tại' });
    }
    res.json(deposit);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Create deposit
exports.createDeposit = async (req, res) => {
  try {
    const {
      customerId,
      carId,
      depositAmount,
      totalPrice,
      expectedDeliveryDate,
      notes,
    } = req.body;

    const remainingBalance = totalPrice - depositAmount;

    const deposit = new Deposit({
      customerId,
      carId,
      depositAmount,
      totalPrice,
      remainingBalance,
      expectedDeliveryDate,
      notes,
    });

    await deposit.save();
    res.status(201).json({ deposit });
  } catch (err) {
    console.error('Error creating deposit:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Update deposit
exports.updateDeposit = async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: Date.now() };
    
    // Recalculate remainingBalance if needed
    if (updates.depositAmount && updates.totalPrice) {
      updates.remainingBalance = updates.totalPrice - updates.depositAmount;
    }

    const deposit = await Deposit.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate('customerId').populate('carId');

    if (!deposit) {
      return res.status(404).json({ message: 'Đặt cọc không tồn tại' });
    }

    res.json(deposit);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Delete deposit
exports.deleteDeposit = async (req, res) => {
  try {
    const deposit = await Deposit.findByIdAndDelete(req.params.id);
    if (!deposit) {
      return res.status(404).json({ message: 'Đặt cọc không tồn tại' });
    }
    res.json({ message: 'Xóa đặt cọc thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get deposits by customer
exports.getDepositsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const deposits = await Deposit.find({ customerId })
      .populate('carId');
    res.json(deposits);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
