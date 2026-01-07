const Car = require('../models/Car');

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    const cars = await Car.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Car.countDocuments(query);

    res.json({
      cars,
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

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Xe không tồn tại' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Create car
exports.createCar = async (req, res) => {
  try {
    const {
      name,
      model,
      price,
      year,
      color,
      description,
      specifications,
      stock,
      category,
      status,
      origin_of_car,
      date_of_import,
      car_sold,
    } = req.body;

    const car = new Car({
      name,
      model,
      price,
      year,
      color,
      description,
      specifications,
      stock,
      category,
      status,
      origin_of_car,
      date_of_import,
      car_sold,
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Update car
exports.updateCar = async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: Date.now() };
    const car = await Car.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return res.status(404).json({ message: 'Xe không tồn tại' });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Delete car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Xe không tồn tại' });
    }
    res.json({ message: 'Xóa xe thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get cars by category
exports.getCarsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const cars = await Car.find({ category });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
