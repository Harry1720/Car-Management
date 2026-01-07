const Transaction = require('../models/Transaction');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, paymentMethod } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod;

    const transactions = await Transaction.find(query)
      .populate('depositId')
      .populate('customerId')
      .populate('createdBy')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
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

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('depositId')
      .populate('customerId')
      .populate('createdBy');
    if (!transaction) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Create transaction
exports.createTransaction = async (req, res) => {
  try {
    const {
      depositId,
      customerId,
      amount,
      paymentMethod,
      description,
      reference,
    } = req.body;

    const transaction = new Transaction({
      depositId,
      customerId,
      amount,
      paymentMethod,
      description,
      reference,
      createdBy: req.user.id,
      status: 'pending',
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: Date.now() };
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).populate('depositId').populate('customerId').populate('createdBy');

    if (!transaction) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }
    res.json({ message: 'Xóa giao dịch thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get transactions by customer
exports.getTransactionsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const transactions = await Transaction.find({ customerId })
      .populate('depositId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Update transaction status
exports.updateTransactionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate('depositId').populate('customerId');

    if (!transaction) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
