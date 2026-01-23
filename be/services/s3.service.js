/**
 * AWS S3 Upload Service
 * Handles image upload and deletion operations on S3
 * Follows AWS best practices with IAM Role authentication
 */

const {
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { s3Client, S3_BUCKET_NAME, S3_FOLDER, S3_BASE_URL } = require('../config/s3');

/**
 * Upload a single file to S3
 * @param {Object} file - Multer file object containing buffer and metadata
 * @returns {Promise<string>} Public S3 URL of the uploaded image
 * @throws {Error} If upload fails
 */
const uploadToS3 = async (file) => {
  if (!file) {
    throw new Error('Không có file được cung cấp');
  }

  // Generate unique filename
  // Format: cars/1700000000000-original-name.jpg
  const timestamp = Date.now();
  const originalName = file.originalname
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-\.]/g, '');

  const s3Key = `${S3_FOLDER}/${timestamp}-${originalName}`;

  try {
    // Create S3 PutObject command
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: s3Key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Return public URL
    const publicUrl = `${S3_BASE_URL}/${s3Key}`;
    return publicUrl;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error(`Lỗi tải ảnh lên S3: ${error.message}`);
  }
};

/**
 * Upload multiple files to S3
 * @param {Array} files - Array of Multer file objects
 * @returns {Promise<Array>} Array of public S3 URLs
 * @throws {Error} If any upload fails
 */
const uploadMultipleToS3 = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }

  try {
    const uploadPromises = files.map(file => uploadToS3(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Multiple File Upload Error:', error);
    throw new Error(`Lỗi tải nhiều ảnh: ${error.message}`);
  }
};

/**
 * Delete a file from S3 using its public URL
 * @param {string} imageUrl - Public S3 URL of the image
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails
 */
const deleteFromS3 = async (imageUrl) => {
  if (!imageUrl) {
    return;
  }

  try {
    // Extract S3 key from URL
    // URL format: https://vinfast-car-images.s3.amazonaws.com/cars/1700000000000-name.jpg
    const s3Key = imageUrl.replace(
      `${S3_BASE_URL}/`,
      ''
    );

    // Create DeleteObject command
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: s3Key,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    console.log(`Đã xóa file S3: ${s3Key}`);
  } catch (error) {
    console.error('S3 Delete Error:', error);
    // Don't throw - log the error but don't fail the car deletion
    console.warn(`Cảnh báo: Lỗi xóa ảnh từ S3: ${error.message}`);
  }
};

/**
 * Delete multiple files from S3
 * @param {Array<string>} imageUrls - Array of public S3 URLs
 * @returns {Promise<void>}
 */
const deleteMultipleFromS3 = async (imageUrls) => {
  if (!imageUrls || imageUrls.length === 0) {
    return;
  }

  try {
    const deletePromises = imageUrls
      .filter(url => url) // Filter out empty URLs
      .map(url => deleteFromS3(url));

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Multiple File Deletion Error:', error);
    // Don't throw - log but don't fail the operation
    console.warn(`Cảnh báo: Lỗi xóa nhiều ảnh: ${error.message}`);
  }
};

module.exports = {
  uploadToS3,
  uploadMultipleToS3,
  deleteFromS3,
  deleteMultipleFromS3,
};
