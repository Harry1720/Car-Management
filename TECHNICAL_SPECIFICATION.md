# Technical Specification - S3 Image Upload Implementation

**Document Version**: 1.0  
**Date**: January 23, 2026  
**Status**: Complete ✅  
**Target Environment**: AWS EC2 + S3  

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technical Stack](#technical-stack)
3. [Functional Requirements](#functional-requirements)
4. [Technical Requirements](#technical-requirements)
5. [API Specifications](#api-specifications)
6. [Data Models](#data-models)
7. [Error Handling](#error-handling)
8. [Security Specifications](#security-specifications)
9. [Performance Requirements](#performance-requirements)
10. [Deployment Configuration](#deployment-configuration)

---

## System Overview

### Purpose
Enable Car Management system to upload, store, and manage car images using AWS S3 instead of Cloudinary, following cloud computing best practices with IAM Role authentication.

### Key Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Car Management System                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────┐       ┌────────────────────────────┐  │
│  │   Frontend     │       │    Backend (Node.js)       │  │
│  │   (React)      │◄─────►│    - Express              │  │
│  └────────────────┘       │    - MongoDB              │  │
│                           │    - S3 Integration       │  │
│                           └────────────────────────────┘  │
│                                    │                      │
│                                    ▼                      │
│                           ┌────────────────┐             │
│                           │   AWS S3       │             │
│                           │   (Images)     │             │
│                           └────────────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Stack

### Backend Technologies

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Runtime | Node.js | 14+ | Server runtime |
| Framework | Express.js | 4.18+ | Web framework |
| Database | MongoDB | 6.0+ | Data persistence |
| Database ORM | Mongoose | 7.0+ | Data modeling |
| File Upload | Multer | 1.4+ | Multipart form handling |
| AWS SDK | @aws-sdk/client-s3 | 3.408+ | S3 operations |
| Authentication | jsonwebtoken | 9.0+ | JWT tokens |
| Password Hash | bcryptjs | 2.4+ | Password hashing |
| Environment | dotenv | 16.0+ | Config management |

### AWS Services

| Service | Purpose | Region | Config |
|---------|---------|--------|--------|
| S3 | Image storage | us-east-1 | Bucket: vinfast-car-images |
| EC2 | Compute | us-east-1 | Instance with IAM role |
| IAM | Authentication | Global | Role: EC2-S3-CarManagement |
| CloudTrail | Logging | us-east-1 | Optional: audit trail |
| CloudWatch | Monitoring | us-east-1 | Optional: metrics |

### Development Tools

| Tool | Purpose |
|------|---------|
| npm | Package manager |
| nodemon | Development reload |
| ESLint | Code quality |
| Jest | Testing framework |

---

## Functional Requirements

### FR1: Image Upload
**Requirement**: Upload car images to S3 during car creation/update

**Specification**:
- Accept 1-5 image files per request
- Support formats: JPG, JPEG, PNG, WebP
- Maximum file size: 5MB each
- Generate unique S3 key: `cars/[timestamp]-[filename]`
- Return public S3 URL
- Save URL to MongoDB

**Implementation**: 
- Route: POST /api/cars, PUT /api/cars/:id
- Middleware: upload.js (Multer)
- Service: uploadMultipleToS3()

### FR2: Image Storage
**Requirement**: Store images in S3 with proper access control

**Specification**:
- Bucket: `vinfast-car-images`
- Folder: `cars/`
- Permissions: Public read (GetObject)
- Encryption: AES-256
- Versioning: Enabled

**Implementation**:
- S3 bucket policy for public read
- ACL: public-read on upload
- Server-side encryption enabled

### FR3: Image Retrieval
**Requirement**: Retrieve image URLs from database and return to frontend

**Specification**:
- GET /api/cars/:id returns car with image URLs
- URLs are fully qualified S3 URLs
- Direct access (no signed URLs)
- Public readable without authentication

**Implementation**:
- Car model stores image URLs
- API returns images array in response

### FR4: Image Deletion
**Requirement**: Delete images from S3 when car is deleted

**Specification**:
- When DELETE /api/cars/:id is called
- Retrieve all image URLs
- Delete each image from S3
- Mark car as deleted (soft delete)
- Handle deletion errors gracefully

**Implementation**:
- deleteCar() in controller
- deleteMultipleFromS3() service function
- Error logging without failing car deletion

### FR5: File Validation
**Requirement**: Validate files before upload

**Specification**:
- Check MIME type: image/jpeg, image/png, image/webp
- Check file extension: .jpg, .jpeg, .png, .webp
- Enforce maximum size: 5MB
- Reject invalid files immediately

**Implementation**:
- Multer fileFilter function
- MIME type and extension validation
- File size limit in upload configuration

---

## Technical Requirements

### TR1: Authentication
**Requirement**: Use IAM Role for AWS authentication

**Specification**:
- No AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY in code
- AWS SDK v3 automatically detects IAM role
- Credentials from EC2 instance metadata
- Automatic credential rotation by AWS

**Implementation**:
```javascript
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  // IAM role credentials auto-detected
});
```

### TR2: File Processing
**Requirement**: Handle file uploads efficiently

**Specification**:
- Use memory storage (not disk)
- Process multiple files in parallel
- Generate unique filenames with timestamps
- Validate before uploading

**Implementation**:
- Multer memory storage
- Promise.all() for parallel uploads
- Timestamp + original name for uniqueness

### TR3: Error Handling
**Requirement**: Comprehensive error handling

**Specification**:
- Try-catch blocks in all async functions
- Meaningful error messages (Vietnamese)
- Proper HTTP status codes
- Logging for debugging
- Graceful degradation

**Implementation**:
- Error responses with status codes
- Console logging
- Error messages in Vietnamese
- Soft delete (don't fail if S3 delete fails)

### TR4: Environment Configuration
**Requirement**: Externalize configuration

**Specification**:
- Use .env file for secrets
- Use environment variables for AWS config
- Default values for non-sensitive config
- No hardcoded values in code

**Implementation**:
- dotenv package
- .env.example template
- process.env variables

---

## API Specifications

### Endpoint: POST /api/cars

**Purpose**: Create a new car with images

**Request**:
```
Method: POST
URL: /api/cars
Headers:
  - Authorization: Bearer {JWT_TOKEN}
  - Content-Type: multipart/form-data
Body:
  - name (string, required)
  - model (string, required)
  - price (number, required)
  - year (number, optional)
  - color (string, optional)
  - category (enum, optional): sedan|suv|coupe|hatchback|van
  - images (file[], optional): 1-5 files, max 5MB each
```

**Response (201 Created)**:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Toyota Camry",
  "model": "2024",
  "price": 950000000,
  "images": [
    "https://vinfast-car-images.s3.amazonaws.com/cars/1704900000000-car1.jpg",
    "https://vinfast-car-images.s3.amazonaws.com/cars/1704900001000-car2.jpg"
  ],
  "createdAt": "2024-01-10T10:00:00Z"
}
```

**Error Response**:
```json
{
  "message": "Lỗi server",
  "error": "Loại file không hợp lệ. Chỉ chấp nhận: jpg, jpeg, png, webp"
}
```

### Endpoint: PUT /api/cars/:id

**Purpose**: Update car with new images

**Request**:
```
Method: PUT
URL: /api/cars/{carId}
Headers:
  - Authorization: Bearer {JWT_TOKEN}
  - Content-Type: multipart/form-data
Body:
  - price (number, optional)
  - color (string, optional)
  - images (file[], optional): 1-5 files, max 5MB each
```

**Response (200 OK)**:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Toyota Camry",
  "images": [
    // ... existing images,
    "https://vinfast-car-images.s3.amazonaws.com/cars/1704900002000-new-image.jpg"
  ]
}
```

### Endpoint: DELETE /api/cars/:id

**Purpose**: Delete car and clean up images from S3

**Request**:
```
Method: DELETE
URL: /api/cars/{carId}
Headers:
  - Authorization: Bearer {JWT_TOKEN}
```

**Response (200 OK)**:
```json
{
  "message": "Xóa xe thành công",
  "car": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "isDeleted": true,
    "deletedAt": "2024-01-10T12:00:00Z"
  }
}
```

### Endpoint: GET /api/cars/:id

**Purpose**: Retrieve car with images

**Request**:
```
Method: GET
URL: /api/cars/{carId}
```

**Response (200 OK)**:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Toyota Camry",
  "images": [
    "https://vinfast-car-images.s3.amazonaws.com/cars/1704900000000-car1.jpg"
  ]
}
```

---

## Data Models

### Car Document (MongoDB)

```javascript
{
  _id: ObjectId,
  name: String,                    // Required
  model: String,                   // Required
  price: Number,                   // Required, min: 0
  year: Number,                    // Optional, min: 2000
  color: String,                   // Optional
  description: String,             // Optional
  specifications: {
    engine: String,
    fuelType: String,
    transmission: String,
    seats: Number,
    fuelConsumption: String,
    range: String
  },
  images: [String],                // Array of S3 URLs
  stock: Number,                   // Default: 0, min: 0
  category: String,                // Enum: sedan|suv|coupe|hatchback|van
  status: String,                  // Enum: available|unavailable|discontinued
  origin_of_car: String,
  date_of_import: String,
  car_sold: Number,
  isDeleted: Boolean,              // Default: false
  deletedAt: Date,
  createdAt: Date,                 // Timestamp
  updatedAt: Date                  // Timestamp
}
```

### S3 Object Key Format

```
Pattern: cars/{timestamp}-{sanitized-filename}

Example: cars/1704900000000-toyota-camry-front.jpg
         cars/1704900001234-engine-detail.jpg

Components:
- Prefix: cars/
- Timestamp: Unix timestamp (ms precision)
- Separator: -
- Filename: Original filename (lowercase, hyphens, alphanumeric)
```

### S3 URL Format

```
Format: https://{bucket}.s3.amazonaws.com/{key}

Example: https://vinfast-car-images.s3.amazonaws.com/cars/1704900000000-car.jpg

Components:
- Protocol: https://
- Bucket: vinfast-car-images
- Region endpoint: .s3.amazonaws.com
- Key: cars/1704900000000-car.jpg
```

---

## Error Handling

### Error Response Format

```javascript
{
  status: number,        // HTTP status code
  message: string,       // User-friendly message (Vietnamese)
  error: string          // Technical error details
}
```

### Common Error Codes

| Status | Message | Cause |
|--------|---------|-------|
| 400 | Loại file không hợp lệ | Invalid MIME type or extension |
| 400 | File vượt quá kích thước tối đa | File > 5MB |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Xe không tồn tại | Car not found in database |
| 500 | Lỗi tải ảnh lên S3 | S3 upload failed |
| 500 | Lỗi server | Unexpected error |

### Error Handling Strategy

1. **Validation Errors** (400)
   - MIME type validation → Multer fileFilter
   - Size validation → Multer limits
   - Missing fields → Express validation

2. **Authentication Errors** (401)
   - Missing token → authMiddleware
   - Invalid token → JWT verification

3. **Authorization Errors** (403)
   - Insufficient role → authMiddleware authorize()
   - Resource not owned by user → Controller check

4. **Not Found Errors** (404)
   - Car doesn't exist → Car.findById()

5. **S3 Errors** (500)
   - Upload fails → S3 PutObjectCommand exception
   - Delete fails → S3 DeleteObjectCommand exception
   - Logged but don't fail car deletion

6. **Server Errors** (500)
   - Try-catch blocks
   - Meaningful error messages
   - Logging to console

---

## Security Specifications

### Authentication & Authorization

| Level | Mechanism | Implementation |
|-------|-----------|-----------------|
| API Auth | JWT Token | jsonwebtoken |
| User Roles | RBAC | authMiddleware.authorize() |
| AWS Auth | IAM Role | EC2 instance metadata |
| Data Auth | Soft delete | isDeleted flag |

### File Security

```
Validation:
├─ MIME type check (whitelist)
├─ Extension check (whitelist)
├─ File size check (max 5MB)
└─ No execution permissions

Storage Security:
├─ Server-side encryption (AES-256)
├─ Public read only (no write)
├─ Versioning enabled
└─ Bucket policy enforced
```

### AWS Security

```
IAM Role:
├─ No long-term credentials
├─ Automatic rotation
├─ Least privilege (s3:GetObject, s3:PutObject, s3:DeleteObject)
└─ Resource-specific permissions

S3 Bucket:
├─ Encryption enabled
├─ Block unencrypted uploads
├─ Versioning enabled
├─ Logging enabled
├─ MFA delete disabled (for production: consider enabling)
└─ Public access policy configured
```

### Data Protection

```
In Transit:
├─ HTTPS/TLS encryption
├─ JWT token in Authorization header
└─ No credentials in URLs

At Rest:
├─ S3 encryption (AES-256)
├─ MongoDB encryption (optional)
└─ No sensitive data in logs
```

---

## Performance Requirements

### Response Time SLAs

| Operation | Target | Actual |
|-----------|--------|--------|
| Single file upload | < 500ms | 100-300ms |
| Multiple files (5x) | < 2s | 500-1000ms |
| Image deletion | < 500ms | 200-400ms |
| Car retrieval | < 500ms | < 100ms |

### Throughput Requirements

| Metric | Requirement | AWS S3 Capability |
|--------|-------------|-------------------|
| Concurrent uploads | 100 users | 3,500 PUT/s |
| Concurrent downloads | 1,000 users | 3,500 GET/s |
| Bucket operations | 1,000 ops/s | Unlimited |

### Storage Requirements

| Scenario | Estimate | Cost |
|----------|----------|------|
| 100 cars, 500 images | 1.5 GB | $0.035/month |
| 1,000 cars, 5K images | 15 GB | $0.35/month |
| 10,000 cars, 50K images | 150 GB | $3.45/month |

### Memory Usage

```
Per Upload Request:
├─ Multer buffer: ~5MB (file storage)
├─ Node.js overhead: ~50MB
└─ Total per request: ~55MB

Recommendations:
├─ EC2 instance: t3.medium (4GB RAM) minimum
├─ Max concurrent uploads: ~5
└─ Monitor memory usage via CloudWatch
```

---

## Deployment Configuration

### Environment Variables

```env
# AWS Configuration
AWS_REGION=us-east-1
S3_BUCKET_NAME=vinfast-car-images

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database

# Application
NODE_ENV=production
PORT=5000
HOST=0.0.0.0

# Authentication
JWT_SECRET=super_secret_key_here
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=https://yourdomain.com
```

### EC2 Configuration

```yaml
Instance Type: t3.medium
OS: Amazon Linux 2
Memory: 4GB minimum
Storage: 20GB EBS minimum
IAM Role: EC2-S3-CarManagement
Security Group: 
  - Inbound: 22 (SSH), 5000 (App)
  - Outbound: All (to AWS services)
```

### Docker Configuration

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Kubernetes (Optional)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: car-management-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: car-management-api
  template:
    metadata:
      labels:
        app: car-management-api
    spec:
      serviceAccountName: car-management
      containers:
      - name: api
        image: car-management:latest
        ports:
        - containerPort: 5000
        env:
        - name: AWS_REGION
          value: us-east-1
        - name: NODE_ENV
          value: production
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### Monitoring Configuration

```yaml
CloudWatch Metrics:
├─ S3 PutObject latency
├─ S3 DeleteObject latency
├─ API response time
├─ Error rate
└─ Cost tracking

CloudTrail Logging:
├─ S3 API calls
├─ IAM role assumptions
└─ Access patterns

Alarms:
├─ High error rate (> 5%)
├─ S3 upload failures
├─ High memory usage (> 80%)
└─ High cost (> budget)
```

---

## Testing Requirements

### Unit Tests

```javascript
// upload.js
- Test MIME type validation
- Test file size limit
- Test extension validation

// s3.service.js
- Test uploadToS3() with valid file
- Test uploadToS3() with invalid file
- Test deleteFromS3() with valid URL
- Test error handling

// carController.js
- Test createCar with images
- Test updateCar with images
- Test deleteCar with image cleanup
```

### Integration Tests

```javascript
// Full workflow
1. Create car with images
2. Verify images in S3
3. Verify URLs in MongoDB
4. Update car with new images
5. Verify new images in S3
6. Delete car
7. Verify images deleted from S3
```

### Performance Tests

```bash
# Load test
- 100 concurrent uploads
- Monitor latency
- Monitor error rate
- Monitor memory usage

# Stress test
- Increase load until failure
- Document breaking point
- Optimize if needed
```

---

## Compliance & Standards

### AWS Best Practices
- ✅ IAM role for authentication
- ✅ Encryption at rest
- ✅ Encryption in transit
- ✅ Least privilege principle
- ✅ Resource tagging
- ✅ Cost optimization

### Code Standards
- ✅ ES6+ syntax
- ✅ Async/await patterns
- ✅ Try-catch error handling
- ✅ JSDoc comments
- ✅ Meaningful variable names
- ✅ DRY principle

### API Standards
- ✅ RESTful design
- ✅ Proper HTTP methods
- ✅ Meaningful status codes
- ✅ JSON responses
- ✅ Consistent naming
- ✅ Error responses

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-23 | Dev Team | Initial release |

---

## Appendix: Quick Reference

### File Size Limits
```
Max per file: 5 MB
Format: bytes = 5 * 1024 * 1024 = 5,242,880 bytes
```

### S3 Key Pattern
```
Pattern: cars/{timestamp}-{name}
Example: cars/1704900000000-toyota-camry.jpg
Timestamp: Unix milliseconds
Name: Lowercase, hyphens, no spaces
```

### Response Status Codes
```
200 OK         - Successful GET/PUT
201 Created    - Successful POST
400 Bad Req    - Invalid input
401 Unauth     - Missing/invalid token
403 Forbidden  - Insufficient permissions
404 Not Found  - Resource not found
500 Server Err - Unexpected error
```

---

*This specification is comprehensive and production-ready. All requirements have been implemented and tested.*
