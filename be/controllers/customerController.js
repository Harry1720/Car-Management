const Customer = require('../models/Customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.status = status;

    const customers = await Customer.find(query)
      .populate('carsInterested')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Customer.countDocuments(query);

    res.json({
      customers,
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

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('carsInterested');
    if (!customer) {
      return res.status(404).json({ message: 'Khách hàng không tồn tại' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      dob,
      gender,
      identityNumber,
      carsInterested,
    } = req.body;

    const customer = new Customer({
      name,
      email,
      phone,
      address,
      dob,
      gender,
      identityNumber,
      carsInterested,
    });

    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: Date.now() };
    const customer = await Customer.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate('carsInterested');

    if (!customer) {
      return res.status(404).json({ message: 'Khách hàng không tồn tại' });
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Khách hàng không tồn tại' });
    }
    res.json({ message: 'Xóa khách hàng thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Add car to interested list
exports.addCarInterest = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { carId } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Khách hàng không tồn tại' });
    }

    if (!customer.carsInterested.includes(carId)) {
      customer.carsInterested.push(carId);
      await customer.save();
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Remove car from interested list
exports.removeCarInterest = async (req, res) => {
  try {
    const { customerId, carId } = req.params;

    const customer = await Customer.findByIdAndUpdate(
      customerId,
      { $pull: { carsInterested: carId } },
      { new: true }
    ).populate('carsInterested');

    if (!customer) {
      return res.status(404).json({ message: 'Khách hàng không tồn tại' });
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
