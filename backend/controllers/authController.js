const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Tạo JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Kiểm tra email tồn tại
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Tạo user mới
    user = new User({
      name,
      email,
      password,
      phone,
      role: role || 'user',
    });

    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email và password
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp email và password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc password không đúng' });
    }

    // Kiểm tra password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc password không đúng' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password cũ không đúng' });
    }

    user.password = newPassword;
    user.updatedAt = Date.now();
    await user.save();

    res.json({ message: 'Đổi password thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
