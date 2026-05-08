const Car = require('../models/Car');

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status } = req.query;
    const skip = (page - 1) * limit;

    let query = { isDeleted: false };
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

    // Lấy ảnh từ Cloudinary nếu có upload
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path);
    }
    
    // Parse specifications nếu là string JSON
    let parsedSpecifications = specifications;
    if (typeof specifications === 'string') {
      try {
        parsedSpecifications = JSON.parse(specifications);
      } catch (e) {
        parsedSpecifications = {};
      }
    }

    const car = new Car({
      name,
      model,
      price,
      year,
      color,
      description,
      specifications: parsedSpecifications,
      stock,
      category,
      status,
      origin_of_car,
      date_of_import,
      car_sold,
      images,
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
    console.log('=== UPDATE CAR ===');
    console.log('Car ID:', req.params.id);
    console.log('Body:', req.body);
    console.log('Files:', req.files);
    
    const updates = { ...req.body, updatedAt: Date.now() };
    
    // Parse specifications nếu là string JSON
    if (updates.specifications && typeof updates.specifications === 'string') {
      try {
        updates.specifications = JSON.parse(updates.specifications);
      } catch (e) {
        console.log('Error parsing specifications:', e);
      }
    }
    
    // Nếu có upload ảnh mới, thêm vào
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      // Lấy ảnh cũ nếu có
      const oldCar = await Car.findById(req.params.id);
      updates.images = [...(oldCar.images || []), ...newImages];
    }
    
    const car = await Car.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return res.status(404).json({ message: 'Xe không tồn tại' });
    }

    console.log('Car updated successfully:', car._id);
    res.json(car);
  } catch (err) {
    console.error('Error updating car:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Delete car (soft delete)
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { 
        isDeleted: true,
        deletedAt: new Date(),
        status: 'discontinued'
      },
      { new: true }
    );
    if (!car) {
      return res.status(404).json({ message: 'Xe không tồn tại' });
    }
    res.json({ message: 'Xóa xe thành công', car });
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
