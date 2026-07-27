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

// Cancel deposit
exports.cancelDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancelReason } = req.body;

    const deposit = await Deposit.findById(id).populate('carId');
    if (!deposit) {
      return res.status(404).json({ message: 'Đặt cọc không tồn tại' });
    }

    if (deposit.status === 'completed' || deposit.status === 'cancelled') {
      return res.status(400).json({ message: `Không thể hủy đơn hàng đang ở trạng thái ${deposit.status}` });
    }

    // 1. Update deposit status
    deposit.status = 'cancelled';
    if (cancelReason) {
      deposit.cancelReason = cancelReason;
    }
    await deposit.save();

    // 2. Restore car inventory
    const Car = require('../models/Car');
    if (deposit.carId) {
      await Car.findByIdAndUpdate(deposit.carId._id, {
        $inc: { stock: 1, car_sold: -1 }
      });
    }

    // 3. Handle offsetting transaction and accounting if paidAmount > 0
    const Transaction = require('../models/Transaction');
    const completedTransactions = await Transaction.find({ depositId: id, status: 'completed', isDeleted: false });
    const totalPaid = completedTransactions.reduce((sum, tx) => sum + tx.amount, 0);

    if (totalPaid > 0) {
      // Create offsetting negative transaction
      const refundTransaction = new Transaction({
        depositId: id,
        customerId: deposit.customerId,
        amount: -totalPaid,
        paymentMethod: 'bank_transfer', // Defaulting to bank_transfer for refund
        description: `Hoàn tiền cọc do hủy đơn hàng #${id.toString().slice(-6)}`,
        status: 'completed',
        createdBy: req.user?.id
      });
      await refundTransaction.save();

      // Create expense accounting record
      const Accounting = require('../models/Accounting');
      const currentDate = new Date();
      const month = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
      
      const refundAccounting = new Accounting({
        type: 'expense',
        category: 'refund',
        amount: totalPaid, // Accounting amounts for expense are positive typically, or they are just expenses. Wait, in Accounting, type 'expense' denotes it's an outflow. The amount is usually positive.
        description: `Chi hoàn tiền cọc cho đơn hàng #${id.toString().slice(-6)} do hủy đơn`,
        transactionId: refundTransaction._id,
        customerId: deposit.customerId,
        carId: deposit.carId?._id,
        month: month,
        accountingDate: currentDate,
      });
      await refundAccounting.save();
    }

    res.json({ message: 'Hủy đơn hàng thành công' });
  } catch (err) {
    console.error('Error cancelling deposit:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
