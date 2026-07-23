const User = require('../models/User');
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

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
      email,
      password,
      role: role || 'user',
    });
    await user.save();

    if (user.role === 'user') {
      let customer = await Customer.findOne({ email });
      if (customer) {
        customer.accountId = user._id;
        if (!customer.name && name) customer.name = name;
        if (!customer.phone && phone) customer.phone = phone;
        await customer.save();
      } else {
        customer = new Customer({
          accountId: user._id,
          email,
          name: name || 'Khách hàng mới',
          phone: phone || '',
        });
        await customer.save();
      }
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: name,
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

    const { portal } = req.body;
    if (portal === 'user' && user.role !== 'user') {
      return res.status(403).json({ message: 'Tài khoản quản trị không thể đăng nhập vào trang khách hàng' });
    }
    if (portal === 'admin' && user.role === 'user') {
      return res.status(403).json({ message: 'Khách hàng không thể đăng nhập vào hệ thống quản trị' });
    }

    const token = generateToken(user._id, user.role);

    let profile = null;
    if (user.role === 'user') {
      profile = await Customer.findOne({ accountId: user._id });
    } else {
      profile = await Employee.findOne({ accountId: user._id });
    }

    res.json({
      token,
      user: {
        id: user._id,
        name: profile ? profile.name : '',
        email: user.email,
        role: user.role,
        avatar: profile ? profile.avatar : '',
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
    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });
    
    let profile = null;
    if (user.role === 'user') {
      profile = await Customer.findOne({ accountId: user._id });
    } else {
      profile = await Employee.findOne({ accountId: user._id });
    }

    const userData = {
      ...user.toObject(),
      ...(profile ? profile.toObject() : {}),
      id: user._id,
      _id: user._id,
    };
    delete userData.password;

    res.json(userData);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });
    
    const updateData = { updatedAt: Date.now() };
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (req.file) updateData.avatar = req.file.path;

    let updatedProfile;
    if (user.role === 'user') {
      updatedProfile = await Customer.findOneAndUpdate(
        { accountId: user._id },
        updateData,
        { new: true, runValidators: true }
      );
    } else {
      updatedProfile = await Employee.findOneAndUpdate(
        { accountId: user._id },
        updateData,
        { new: true, runValidators: true }
      );
    }

    const userData = {
      ...user.toObject(),
      ...(updatedProfile ? updatedProfile.toObject() : {}),
      id: user._id,
      _id: user._id,
    };
    delete userData.password;

    res.json(userData);
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

// Quên mật khẩu
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng với email này' });
    }

    // Tạo token reset
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token và set vào user
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set thời gian hết hạn (15 phút)
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Tạo url reset
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

    const message = `Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu khôi phục mật khẩu.\n\nVui lòng click vào đường link bên dưới để đặt lại mật khẩu:\n\n${resetUrl}\n\nLưu ý: Link chỉ có hiệu lực trong 15 phút. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Khôi phục mật khẩu - VinFast Car Management',
        message,
      });

      res.status(200).json({ message: 'Email đã được gửi thành công' });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      console.error('Error sending email:', err);
      return res.status(500).json({ message: 'Không thể gửi email. Vui lòng thử lại sau.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Hash token từ param để so sánh
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    // Cập nhật mật khẩu mới (pre-save hook sẽ tự hash)
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.updatedAt = Date.now();

    await user.save();

    res.status(200).json({ message: 'Đổi mật khẩu thành công. Bạn có thể đăng nhập bằng mật khẩu mới.' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
