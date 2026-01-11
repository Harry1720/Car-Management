const Transaction = require('../models/Transaction');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, paymentMethod } = req.query;
    const skip = (page - 1) * limit;

    let query = { isDeleted: false };
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
    console.log('Creating transaction with data:', req.body);
    const {
      depositId,
      customerId,
      amount,
      paymentMethod,
      description,
      reference,
      carId,
    } = req.body;

    // Kiểm tra deposit
    const Deposit = require('../models/Deposit');
    const deposit = await Deposit.findById(depositId);
    if (!deposit) {
      console.log('Deposit not found:', depositId);
      return res.status(404).json({ message: 'Đặt cọc không tồn tại' });
    }
    console.log('Deposit found:', deposit);

    // Kiểm tra xe còn hàng không
    const Car = require('../models/Car');
    const carIdToFind = deposit.carId || carId;
    console.log('Looking for car with ID:', carIdToFind);
    const car = await Car.findById(carIdToFind);
    if (!car) {
      console.log('Car not found with ID:', carIdToFind);
      return res.status(404).json({ message: 'Xe không tồn tại' });
    }
    console.log('Car found:', car.model, car.name);
    
    if (car.stock <= 0) {
      return res.status(400).json({ message: 'Xe đã hết hàng' });
    }

    // Tạo transaction
    const transaction = new Transaction({
      depositId,
      customerId,
      amount,
      paymentMethod,
      description,
      reference,
      createdBy: req.user?.id,
      status: 'completed',
    });

    await transaction.save();

    // Giảm số lượng xe trong kho
    car.stock -= 1;
    car.car_sold = (car.car_sold || 0) + 1;
    await car.save();

    // Cập nhật trạng thái deposit
    deposit.status = 'completed';
    await deposit.save();

    // Cập nhật doanh thu vào Accounting
    const Accounting = require('../models/Accounting');
    const currentDate = new Date();
    const month = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    
    const accounting = new Accounting({
      type: 'income',
      category: 'sale', // Sửa từ 'sales' thành 'sale'
      amount: amount,
      description: `Doanh thu từ bán xe ${car.name} - ${car.model}`,
      transactionId: transaction._id,
      customerId: customerId,
      carId: car._id,
      month: month, // Thêm month theo format yêu cầu
      accountingDate: new Date(),
    });
    await accounting.save();

    // Cập nhật số giao dịch của khách hàng
    const Customer = require('../models/Customer');
    const customer = await Customer.findById(customerId);
    if (customer) {
      customer.number_transaction = (customer.number_transaction || 0) + 1;
      await customer.save();
    }

    res.status(201).json({
      message: 'Tạo giao dịch thành công',
      transaction,
      car: {
        id: car._id,
        name: car.name,
        stockRemaining: car.stock,
        totalSold: car.car_sold
      }
    });
  } catch (err) {
    console.error('Error creating transaction:', err);
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
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction || transaction.isDeleted) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }
    
    // Soft delete: đánh dấu isDeleted = true thay vì xóa hẳn
    transaction.isDeleted = true;
    transaction.deletedAt = new Date();
    await transaction.save();
    
    // Soft delete các bản ghi Accounting liên quan
    const Accounting = require('../models/Accounting');
    await Accounting.updateMany(
      { transactionId: req.params.id },
      { 
        $set: { 
          isDeleted: true,
          deletedAt: new Date()
        }
      }
    );
    
    res.json({ message: 'Xóa giao dịch thành công' });
  } catch (err) {
    console.error('Error deleting transaction:', err);
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
