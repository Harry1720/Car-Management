const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình storage cho multer với Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vinfast-cars', // Tên folder trên Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }], // Resize ảnh
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
