const Employee = require('../models/Employee');
const User = require('../models/User');
const crypto = require('crypto');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, department, position } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.status = status;
    if (department) query.department = department;
    if (position) query.position = position;

    const employees = await Employee.find(query)
      .populate('accountId')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Employee.countDocuments(query);

    res.json({
      employees,
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

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('accountId');
    if (!employee) {
      return res.status(404).json({ message: 'Nhân viên không tồn tại' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      position,
      department,
      hireDate,
      salary,
      address,
      dob,
      identityNumber,
      // Also accept frontend field names
      employee_name,
      employee_email,
      employee_phone_no,
      role_title,
      employee_address,
      employee_birthday,
      employee_citizenid,
    } = req.body;

    // Map and validate required fields
    const finalName = name || employee_name;
    const finalEmail = email || employee_email;
    const finalPosition = position || role_title || 'salesman'; // default position
    const finalIdentityNumber = identityNumber || employee_citizenid;
    const finalPhone = phone || employee_phone_no;
    const finalAddress = address || employee_address;
    const finalDob = dob || employee_birthday;

    // Validate required fields
    if (!finalName) {
      return res.status(400).json({ message: 'Tên nhân viên là bắt buộc' });
    }
    if (!finalEmail) {
      return res.status(400).json({ message: 'Email là bắt buộc' });
    }

    // Check if user already exists
    let user = await User.findOne({ email: finalEmail });
    if (user) {
       return res.status(400).json({ message: 'Email đã được sử dụng cho tài khoản khác' });
    }

    // Generate unique password
    const rawPassword = crypto.randomBytes(4).toString('hex');
    
    user = new User({
      email: finalEmail,
      password: rawPassword,
      role: 'employee'
    });
    await user.save();

    const employeeData = {
      accountId: user._id,
      name: finalName,
      email: finalEmail,
      phone: finalPhone,
      position: finalPosition,
      department: department || 'sales',
      hireDate: hireDate || new Date(),
      salary: salary || 0,
      address: finalAddress ? { street: finalAddress } : undefined,
      dob: finalDob,
      identityNumber: finalIdentityNumber,
    };

    const employee = new Employee(employeeData);
    await employee.save();
    
    res.status(201).json({ ...employee.toObject(), defaultPassword: rawPassword });
  } catch (err) {
    console.error('Employee creation error:', err);
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    // Map frontend field names to backend field names
    const finalAddress = req.body.address || req.body.employee_address;
    const mappedUpdates = {
      name: req.body.name || req.body.employee_name,
      email: req.body.email || req.body.employee_email,
      phone: req.body.phone || req.body.employee_phone_no,
      position: req.body.position || req.body.role_title,
      address: finalAddress ? { street: finalAddress } : undefined,
      dob: req.body.dob || req.body.employee_birthday,
      identityNumber: req.body.identityNumber || req.body.employee_citizenid,
      department: req.body.department,
      hireDate: req.body.hireDate,
      salary: req.body.salary,
      accountId: req.body.accountId,
      updatedAt: Date.now()
    };

    const employee = await Employee.findByIdAndUpdate(req.params.id, mappedUpdates, {
      new: true,
      runValidators: true,
    }).populate('accountId');

    if (!employee) {
      return res.status(404).json({ message: 'Nhân viên không tồn tại' });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Nhân viên không tồn tại' });
    }
    res.json({ message: 'Xóa nhân viên thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get employees by department
exports.getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    const employees = await Employee.find({ department }).populate('accountId');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Get employees by position
exports.getEmployeesByPosition = async (req, res) => {
  try {
    const { position } = req.params;
    const employees = await Employee.find({ position }).populate('accountId');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
