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
      description,
      specifications,
      variants,
      category,
      status,
      origin_of_car,
      date_of_import,
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

    // Parse variants nếu là string JSON
    let parsedVariants = variants;
    if (typeof variants === 'string') {
      try {
        parsedVariants = JSON.parse(variants);
      } catch (e) {
        parsedVariants = [];
      }
    }
    
    // Map uploaded files to variants based on fileIndex
    if (Array.isArray(parsedVariants)) {
      parsedVariants.forEach(v => {
        if (v.fileIndex !== undefined && v.fileIndex !== null) {
          const fileIndex = parseInt(v.fileIndex);
          if (req.files && req.files[fileIndex]) {
            v.image = req.files[fileIndex].path;
          }
        }
      });
    }

    let finalArticleContent = req.body.articleContent;
    if (finalArticleContent && finalArticleContent.includes('data:image/')) {
      const { cloudinary } = require('../config/cloudinary');
      const matches = [...finalArticleContent.matchAll(/src="(data:image\/[^;]+;base64,[^"]+)"/g)];
      for (const m of matches) {
        try {
          const uploadRes = await cloudinary.uploader.upload(m[1], {
            folder: 'vinfast-cars-articles'
          });
          finalArticleContent = finalArticleContent.replace(m[1], uploadRes.secure_url);
        } catch (err) {
          console.error('Lỗi upload ảnh base64 trong articleContent:', err);
        }
      }
    }

    const car = new Car({
      name,
      model,
      price,
      year,
      description,
      specifications: parsedSpecifications,
      variants: parsedVariants,
      category,
      status,
      origin_of_car,
      date_of_import,
      articleContent: finalArticleContent,
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
    
    // Parse variants nếu là string JSON
    if (updates.variants && typeof updates.variants === 'string') {
      try {
        updates.variants = JSON.parse(updates.variants);
        // Map uploaded files to variants based on fileIndex
        if (Array.isArray(updates.variants)) {
          updates.variants.forEach(v => {
            if (v.fileIndex !== undefined && v.fileIndex !== null) {
              const fileIndex = parseInt(v.fileIndex);
              if (req.files && req.files[fileIndex]) {
                v.image = req.files[fileIndex].path;
              }
            }
          });
        }
      } catch (e) {
        console.log('Error parsing variants:', e);
      }
    }
    
    // Xử lý ảnh base64 trong bài viết (tránh lỗi BSON > 16MB)
    if (updates.articleContent && updates.articleContent.includes('data:image/')) {
      const { cloudinary } = require('../config/cloudinary');
      const matches = [...updates.articleContent.matchAll(/src="(data:image\/[^;]+;base64,[^"]+)"/g)];
      for (const m of matches) {
        try {
          const uploadRes = await cloudinary.uploader.upload(m[1], {
            folder: 'vinfast-cars-articles'
          });
          updates.articleContent = updates.articleContent.replace(m[1], uploadRes.secure_url);
        } catch (err) {
          console.error('Lỗi upload ảnh base64 trong articleContent:', err);
        }
      }
    }

    // Bỏ qua xử lý ảnh các field cấp root
    delete updates.images;
    delete updates.color;
    delete updates.stock;
    delete updates.car_sold;
    
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
