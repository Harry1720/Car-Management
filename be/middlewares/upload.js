/**
 * Multer Configuration for File Upload
 * Handles multipart/form-data from frontend
 * Validates file types and size before processing
 */

const multer = require('multer');
const path = require('path');

// Allowed MIME types for images
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp'];

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

// Configure storage - use memory storage as we'll upload to S3
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  // Validate MIME type
  if (!ALLOWED_MIMES.includes(file.mimetype)) {
    const error = new Error(
      `Loại file không hợp lệ. Chỉ chấp nhận: jpg, jpeg, png, webp`
    );
    error.statusCode = 400;
    return cb(error);
  }

  // Validate file extension as additional security check
  const ext = path.extname(file.originalname).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    const error = new Error('Phần mở rộng file không hợp lệ');
    error.statusCode = 400;
    return cb(error);
  }

  // File is valid
  cb(null, true);
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

module.exports = upload;
