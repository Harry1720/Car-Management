# Backend S3 Image Upload Implementation - Quick Reference

## Overview
This backend now supports uploading car images directly to AWS S3 bucket instead of Cloudinary. Implementation follows AWS best practices with:
- ✅ IAM Role authentication (no hardcoded credentials)
- ✅ File type and size validation
- ✅ Automatic image cleanup on car deletion
- ✅ Production-ready error handling

## Quick Start

### 1. Install Dependencies
```bash
npm install
# Installs @aws-sdk/client-s3 and other packages
```

### 2. Set Environment Variables
```bash
# .env file
AWS_REGION=us-east-1
S3_BUCKET_NAME=vinfast-car-images
MONGODB_URI=...
JWT_SECRET=...
```

### 3. Configure AWS
- Create S3 bucket: `vinfast-car-images`
- Attach IAM Role to EC2 with S3 permissions
- See AWS_SETUP_GUIDE.md for detailed steps

### 4. Run Backend
```bash
npm run dev      # Development mode
npm start        # Production mode
```

## File Structure

```
be/
├── config/
│   └── s3.js                 ← S3 client configuration
├── middlewares/
│   └── upload.js             ← Multer file validation
├── services/
│   └── s3.service.js         ← S3 operations (upload/delete)
├── controllers/
│   └── carController.js      ← Updated for S3 integration
└── routes/
    └── carRoutes.js          ← Uses new upload middleware
```

## Key Functions

### Upload Single File
```javascript
const { uploadToS3 } = require('../services/s3.service');

const url = await uploadToS3(file);
// Returns: https://vinfast-car-images.s3.amazonaws.com/cars/1700000000000-filename.jpg
```

### Upload Multiple Files
```javascript
const { uploadMultipleToS3 } = require('../services/s3.service');

const urls = await uploadMultipleToS3(req.files);
// Returns: Array of S3 URLs
```

### Delete Image
```javascript
const { deleteFromS3 } = require('../services/s3.service');

await deleteFromS3('https://vinfast-car-images.s3.amazonaws.com/cars/...');
```

## API Examples

### Create Car with Images
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Authorization: Bearer {token}" \
  -F "name=Toyota Camry" \
  -F "model=2024" \
  -F "price=950000000" \
  -F "images=@car1.jpg" \
  -F "images=@car2.jpg"
```

### Response
```json
{
  "_id": "...",
  "name": "Toyota Camry",
  "images": [
    "https://vinfast-car-images.s3.amazonaws.com/cars/1704900000000-car1.jpg",
    "https://vinfast-car-images.s3.amazonaws.com/cars/1704900001000-car2.jpg"
  ]
}
```

## Validations

### File Type Validation
- ✅ Allowed: jpg, jpeg, png, webp
- ❌ Blocked: gif, bmp, pdf, etc.

### File Size Limit
- Maximum: 5MB per file
- Multiple files: up to 5 files per upload

### Multer Configuration
- Memory storage for efficient processing
- File extension whitelist
- MIME type verification

## Error Handling

### Common Error Responses

**Invalid File Type**
```json
{
  "message": "Lỗi server",
  "error": "Loại file không hợp lệ. Chỉ chấp nhận: jpg, jpeg, png, webp"
}
```

**File Too Large**
```json
{
  "message": "Lỗi server",
  "error": "File exceeds maximum file size of 5MB"
}
```

**S3 Upload Failed**
```json
{
  "message": "Lỗi server",
  "error": "Lỗi tải ảnh lên S3: [AWS error details]"
}
```

## Features

### Automatic Cleanup
- When deleting a car, all images are automatically deleted from S3
- Prevents orphaned files in bucket
- Graceful error handling (doesn't fail car deletion if S3 delete fails)

### Unique Filenames
- Format: `cars/[timestamp]-[original-name]`
- Prevents filename collisions
- Easy to trace upload time

### Public URLs
- Images are publicly readable
- Direct S3 URLs returned to frontend
- No need for signed URLs

## Configuration Details

### S3 Bucket Settings
```
- Bucket: vinfast-car-images
- Region: us-east-1
- Folder: cars/
- ACL: Public Read
- Encryption: AES-256
- Versioning: Enabled (optional)
```

### IAM Role Requirements
```
Actions needed:
- s3:GetObject
- s3:PutObject
- s3:DeleteObject
- s3:ListBucket

Resource:
- arn:aws:s3:::vinfast-car-images
- arn:aws:s3:::vinfast-car-images/*
```

## Testing

### Test Upload via cURL
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Authorization: Bearer eyJ..." \
  -F "name=Test Car" \
  -F "model=2024" \
  -F "price=1000000" \
  -F "category=sedan" \
  -F "images=@test.jpg"
```

### Test via Postman
1. Create new POST request to `http://localhost:5000/api/cars`
2. Add Authorization header with Bearer token
3. Go to Body → form-data
4. Add fields:
   - name: Test Car
   - model: 2024
   - images: (select file)
5. Send

### Verify Image in S3
```bash
# List uploaded files
aws s3 ls s3://vinfast-car-images/cars/ --region us-east-1

# Check file size
aws s3 ls s3://vinfast-car-images/cars/[filename] --region us-east-1

# Download for testing
aws s3 cp s3://vinfast-car-images/cars/[filename] ./test.jpg --region us-east-1
```

## Troubleshooting

### "NoCredentialsError"
- EC2 instance doesn't have IAM role attached
- Run: `aws ec2 associate-iam-instance-profile --iam-instance-profile Name=EC2-S3-CarManagement-Profile --instance-id i-xxx`

### "Access Denied"
- IAM role missing S3 permissions
- Attach policy with s3:*, s3:GetObject, s3:PutObject, s3:DeleteObject

### Images Not Uploading
- Check file size (must be < 5MB)
- Check file type (only jpg, jpeg, png, webp)
- Check console logs for detailed error

### Can't Access Uploaded Image URL
- Verify bucket policy allows public read
- Check image ACL is set to public-read
- Test with: `curl https://vinfast-car-images.s3.amazonaws.com/cars/[filename]`

## Security Notes

### ✅ Implemented
- No hardcoded AWS credentials
- IAM Role based authentication
- File type & size validation
- S3 bucket encryption
- Public access only for images
- Automatic cleanup on deletion

### 🔐 Recommended
- Enable bucket versioning for recovery
- Enable logging to CloudTrail
- Set lifecycle policies for old images
- Monitor S3 access via CloudWatch
- Restrict IAM role to specific bucket

## Performance

### Upload Speed
- Direct S3 upload from EC2 ~ 100-500 ms per file
- Multiple files in parallel ~ 200-1000 ms total
- Depends on file size and network

### Storage Cost
- S3 Standard: ~$0.023 per GB/month
- Example: 1000 car images (avg 3MB each) = 3GB = ~$0.07/month

## Next Steps

1. Deploy to AWS EC2
2. Attach IAM role to instance
3. Create S3 bucket and configure policies
4. Test upload with sample images
5. Monitor CloudWatch metrics
6. Set up S3 lifecycle policies

## Documentation

- **AWS_SETUP_GUIDE.md** - Detailed AWS configuration steps
- **S3_IMPLEMENTATION.md** - Implementation details and architecture
- **package.json** - Dependencies list
- **/.env.example** - Environment variables reference

## Support

For issues or questions:
1. Check error messages in server logs
2. Verify AWS credentials in CloudTrail
3. Confirm IAM role is attached to EC2
4. Review AWS_SETUP_GUIDE.md for configuration steps

---

**Implementation Status**: ✅ Complete  
**Production Ready**: ✅ Yes  
**Last Updated**: January 2026
