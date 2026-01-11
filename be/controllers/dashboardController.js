const Car = require('../models/Car');
const Deposit = require('../models/Deposit');
const Transaction = require('../models/Transaction');
const Accounting = require('../models/Accounting');
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Total cars
    const totalCars = await Car.countDocuments();

    // Total customers
    const totalCustomers = await Customer.countDocuments();

    // Total employees
    const totalEmployees = await Employee.countDocuments();

    // Total deposits
    const totalDeposits = await Deposit.countDocuments();

    // Total revenue (income from transactions)
    const totalRevenue = await Accounting.aggregate([
      { $match: { type: 'income', isDeleted: false } },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Total expenses
    const totalExpenses = await Accounting.aggregate([
      { $match: { type: 'expense', isDeleted: false } },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Pending deposits
    const pendingDeposits = await Deposit.countDocuments({ status: 'pending' });

    res.json({
      totalCars,
      totalCustomers,
      totalEmployees,
      totalDeposits,
      pendingDeposits,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
      netProfit: (totalRevenue[0]?.total || 0) - (totalExpenses[0]?.total || 0),
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get monthly revenue
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const monthlyData = await Accounting.aggregate([
      { $match: { type: 'income', isDeleted: false } },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(monthlyData);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get top selling cars
exports.getTopSellingCars = async (req, res) => {
  try {
    const topCars = await Deposit.aggregate([
      {
        $group: {
          _id: '$carId',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'cars',
          localField: '_id',
          foreignField: '_id',
          as: 'carDetails',
        },
      },
    ]);

    res.json(topCars);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get deposit statistics
exports.getDepositStatistics = async (req, res) => {
  try {
    const stats = await Deposit.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$depositAmount' },
        },
      },
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get transaction statistics
exports.getTransactionStatistics = async (req, res) => {
  try {
    const { date } = req.query;
    let startDate, endDate;
    
    if (date) {
      // Nếu có ngày cụ thể, lấy dữ liệu cho ngày đó
      startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
    } else {
      // Mặc định lấy ngày hôm nay
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
    }
    
    // Lấy số lượng giao dịch theo giờ
    const hourlyData = await Transaction.aggregate([
      {
        $match: {
          transactionDate: {
            $gte: startDate,
            $lte: endDate
          },
          status: 'completed'
        }
      },
      {
        $project: {
          hour: { $hour: '$transactionDate' }
        }
      },
      {
        $group: {
          _id: '$hour',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Tạo mảng 24 giờ với giá trị 0
    const hourlyStats = Array(9).fill(0);
    const timeSlots = [0, 3, 6, 9, 12, 15, 18, 21, 24];
    
    // Fill data vào các khung giờ tương ứng
    hourlyData.forEach(item => {
      const hour = item._id;
      // Tìm khung giờ gần nhất
      for (let i = 0; i < timeSlots.length - 1; i++) {
        if (hour >= timeSlots[i] && hour < timeSlots[i + 1]) {
          hourlyStats[i] += item.count;
          break;
        }
      }
    });
    
    res.json({
      hourlyData: hourlyStats,
      date: startDate.toISOString().split('T')[0]
    });
  } catch (err) {
    console.error('Error getting transaction statistics:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get recent transactions
exports.getRecentTransactions = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const transactions = await Transaction.find()
      .populate('customerId', 'name email')
      .populate('depositId', 'carId')
      .sort({ transactionDate: -1 })
      .limit(parseInt(limit));

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get car inventory status
exports.getCarInventoryStatus = async (req, res) => {
  try {
    const inventory = await Car.aggregate([
      {
        $group: {
          _id: '$category',
          totalCars: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          avgPrice: { $avg: '$price' },
        },
      },
    ]);

    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
