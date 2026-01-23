/**
 * AWS S3 Configuration
 * Uses IAM Role attached to EC2 instance for authentication
 * NO hardcoded credentials in code - follows AWS best practices
 */

const { S3Client } = require('@aws-sdk/client-s3');

// Initialize S3 client
// The AWS SDK v3 automatically uses IAM Role credentials from EC2 instance metadata
// No need for AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY environment variables
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

// S3 Bucket configuration
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'vinfast-car-images';
const S3_FOLDER = 'cars'; // Folder in S3 bucket
const S3_BASE_URL = `https://${S3_BUCKET_NAME}.s3.amazonaws.com`;

module.exports = {
  s3Client,
  S3_BUCKET_NAME,
  S3_FOLDER,
  S3_BASE_URL,
};
