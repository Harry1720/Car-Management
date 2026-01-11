# Hướng dẫn cài đặt Cloudinary

## Bước 1: Cài đặt packages
Chạy lệnh trong thư mục `be`:
```bash
npm install
```

## Bước 2: Tạo tài khoản Cloudinary
1. Truy cập https://cloudinary.com/
2. Đăng ký tài khoản miễn phí
3. Sau khi đăng ký, vào Dashboard để lấy thông tin:
   - Cloud Name
   - API Key
   - API Secret

## Bước 3: Cấu hình .env
Tạo/cập nhật file `.env` trong thư mục `be`:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Bước 4: Restart backend server
```bash
npm run dev
```

## Sử dụng
- Khi thêm/sửa xe, có thể upload tối đa 5 ảnh
- Ảnh sẽ được lưu trên Cloudinary và URL được lưu vào database
- Field name trong form: `images` (multiple files)

## API Endpoint
- POST `/api/cars` - Upload ảnh khi tạo xe mới
- PUT `/api/cars/:id` - Upload ảnh khi cập nhật xe

## Lưu ý
- Ảnh sẽ được resize tự động về 1200x800px
- Chỉ chấp nhận định dạng: jpg, jpeg, png, webp
- Ảnh được lưu trong folder `vinfast-cars` trên Cloudinary
