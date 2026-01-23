# AWS S3 Image Upload Implementation Guide

## Tổng Quan (Overview)

Hệ thống quản lý xe (Car Management) đã được cấu hình để tải ảnh lên Amazon S3 thay vì Cloudinary. Giải pháp này sử dụng AWS SDK v3 và xác thực IAM Role (không cần access keys cứng trong code).

This Car Management system has been configured to upload images to Amazon S3 instead of Cloudinary. This solution uses AWS SDK v3 with IAM Role authentication (no hardcoded access keys).

---

## Yêu Cầu (Requirements)

### AWS Setup
1. **S3 Bucket**: `vinfast-car-images`
   - Công khai (Public read access) để có thể lấy URL ảnh
   - Enable CORS nếu cần truy cập từ các domain khác

2. **IAM Role** cho EC2:
   - Quyền: `AmazonS3FullAccess` hoặc tùy chỉnh policy
   - Attached đến EC2 instance
   - **Không cần** AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY trong code

### Backend Folder Structure
```
be/
├── config/
│   └── s3.js                 (S3 client configuration)
├── middlewares/
│   └── upload.js             (Multer configuration)
├── services/
│   └── s3.service.js         (S3 upload/delete functions)
├── controllers/
│   └── carController.js      (Updated with S3 integration)
└── routes/
    └── carRoutes.js          (Updated with new upload middleware)
```

---

## Cấu Hình (Configuration)

### 1. config/s3.js

Tạo S3 client với AWS SDK v3. Xác thực được thực hiện tự động thông qua IAM Role của EC2:

```javascript
const { S3Client } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'vinfast-car-images';
const S3_FOLDER = 'cars';
const S3_BASE_URL = `https://${S3_BUCKET_NAME}.s3.amazonaws.com`;
```

**Lưu ý**: 
- AWS SDK v3 tự động sử dụng IAM Role credentials từ EC2 instance metadata
- Không cần set AWS_ACCESS_KEY_ID hay AWS_SECRET_ACCESS_KEY
- Thiết lập AWS_REGION nếu khác 'us-east-1'

### 2. middlewares/upload.js

Multer configuration với memory storage:

```javascript
const multer = require('multer');

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIMES.includes(file.mimetype)) {
      return cb(new Error('Loại file không hợp lệ'));
    }
    cb(null, true);
  },
  limits: { fileSize: MAX_FILE_SIZE }
});
```

**Tính năng**:
- ✅ Xác thực loại file (jpeg, png, webp)
- ✅ Giới hạn kích thước 5MB
- ✅ Lưu vào memory trước khi upload S3

### 3. services/s3.service.js

Các hàm chính:

#### `uploadToS3(file)` - Upload file đơn
```javascript
const url = await uploadToS3(req.files[0]);
// Returns: https://vinfast-car-images.s3.amazonaws.com/cars/1700000000000-filename.jpg
```

#### `uploadMultipleToS3(files)` - Upload nhiều files
```javascript
const urls = await uploadMultipleToS3(req.files);
// Returns: Array of S3 URLs
```

#### `deleteFromS3(imageUrl)` - Xóa 1 file
```javascript
await deleteFromS3('https://vinfast-car-images.s3.amazonaws.com/cars/1700000000000-filename.jpg');
```

#### `deleteMultipleFromS3(imageUrls)` - Xóa nhiều files
```javascript
await deleteMultipleFromS3(car.images);
```

---

## API Endpoints

### POST /api/cars - Tạo xe với ảnh
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Authorization: Bearer {token}" \
  -F "name=Toyota Camry" \
  -F "model=2024" \
  -F "price=950000000" \
  -F "images=@car1.jpg" \
  -F "images=@car2.jpg"
```

**Response**:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Toyota Camry",
  "images": [
    "https://vinfast-car-images.s3.amazonaws.com/cars/1704900000000-car1.jpg",
    "https://vinfast-car-images.s3.amazonaws.com/cars/1704900001000-car2.jpg"
  ],
  ...
}
```

### PUT /api/cars/:id - Cập nhật xe
```bash
curl -X PUT http://localhost:5000/api/cars/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Authorization: Bearer {token}" \
  -F "price=1000000000" \
  -F "images=@new-image.jpg"
```

### DELETE /api/cars/:id - Xóa xe (tự động xóa từ S3)
```bash
curl -X DELETE http://localhost:5000/api/cars/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Authorization: Bearer {token}"
```

---

## Biến Môi Trường (.env)

```env
# AWS Configuration
AWS_REGION=us-east-1
S3_BUCKET_NAME=vinfast-car-images

# Database
MONGODB_URI=mongodb://...

# JWT
JWT_SECRET=your_secret_key

# Other configs...
```

**Ghi chú**: Không cần AWS_ACCESS_KEY_ID hay AWS_SECRET_ACCESS_KEY vì sử dụng IAM Role

---

## Triển Khai (Deployment)

### EC2 Setup

1. **Tạo/Liên kết IAM Role**:
   - Tạo IAM Role với policy `AmazonS3FullAccess`
   - Gán Role đó cho EC2 instance
   - Instance sẽ tự động lấy credentials từ instance metadata

2. **Cài đặt Dependencies**:
   ```bash
   cd be/
   npm install
   # Sẽ cài @aws-sdk/client-s3 @3.408.0
   ```

3. **Docker Configuration**:
   ```dockerfile
   # In Dockerfile
   RUN npm install
   # AWS SDK v3 sẽ tự động sử dụng IAM Role
   ```

### AWS S3 Bucket Configuration

1. **Bucket Permissions** (Bucket Policy):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::vinfast-car-images/*"
       }
     ]
   }
   ```

2. **CORS Configuration** (nếu frontend ở domain khác):
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedOrigins": ["https://yourdomain.com"],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```

---

## Best Practices & Security

### ✅ Best Practices Đã Triển Khai

1. **IAM Role Authentication**
   - Không hardcode credentials
   - Tự động rotate AWS credentials
   - Tuân thủ AWS security guidelines

2. **File Validation**
   - Kiểm tra MIME type
   - Giới hạn kích thước 5MB
   - Whitelist extensions (jpg, jpeg, png, webp)

3. **Error Handling**
   - Try-catch blocks
   - Meaningful error messages (tiếng Việt)
   - Log errors cho debugging

4. **S3 Key Format**
   - Timestamp + originalname để tránh collision
   - Readable filename
   - Organized trong folder `cars/`

5. **Image Cleanup**
   - Auto-delete from S3 khi xóa car
   - Graceful error handling (không fail nếu xóa S3 thất bại)

### 🔐 Security Considerations

- [ ] Enable S3 versioning nếu cần recovery
- [ ] Enable S3 logging để audit
- [ ] Regular backup S3 bucket
- [ ] Monitor IAM role usage
- [ ] Set lifecycle policy để delete old images
- [ ] Enable encryption (server-side or client-side)
- [ ] Restrict public access nếu cần

---

## Troubleshooting

### Problem: "NoCredentialsError"
**Solution**: EC2 instance không có IAM Role hoặc role không có S3 permissions
```bash
# Kiểm tra IAM role
aws sts get-caller-identity --region us-east-1
```

### Problem: "Access Denied"
**Solution**: IAM Role policy không đủ permissions
```bash
# Thêm AmazonS3FullAccess hoặc custom S3 policy
```

### Problem: "The bucket does not allow ACL"
**Solution**: Disable ACL hoặc dùng public bucket policy thay vì ACL
```bash
# Thay vì ACL, dùng bucket policy cho public access
```

### Problem: Images không public
**Solution**: Check bucket policy hoặc ACL settings
```bash
# Verify bucket is public readable
aws s3api get-bucket-policy --bucket vinfast-car-images
```

---

## File Changes Summary

| File | Changes |
|------|---------|
| `config/s3.js` | ✅ Created - S3 client with IAM Role |
| `middlewares/upload.js` | ✅ Created - Multer file validation |
| `services/s3.service.js` | ✅ Updated - Upload/delete functions |
| `controllers/carController.js` | ✅ Updated - Use S3 service |
| `routes/carRoutes.js` | ✅ Updated - Use new upload middleware |
| `package.json` | ✅ Updated - Added @aws-sdk/client-s3 |

---

## References

- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [S3 Documentation](https://docs.aws.amazon.com/s3/)
- [IAM Roles for EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html)

---

## Contact & Support

Cho bất kỳ câu hỏi nào về setup, vui lòng check CloudFormation templates hoặc contact DevOps team.

---

**Phát triển cho:** Cloud Computing Course Demo  
**Ngày:** January 2026  
**Status:** Production Ready ✅
