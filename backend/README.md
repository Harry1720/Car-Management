# Car Management System - Backend API

Đây là backend API cho hệ thống quản lý bán xe VinFast.

## Setup hướng dẫn

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình environment

Sao chép `.env.example` thành `.env` và cập nhật các giá trị:

```bash
cp .env.example .env
```

Cập nhật các biến môi trường:

- PORT=5000: Đây là cổng (port) mà server Node.js của bạn sẽ chạy. Bạn có thể giữ nguyên 5000, hoặc đổi thành 3000, 8080 tùy ý (miễn là không bị trùng với ứng dụng khác).

- NODE_ENV=development: Biến này báo cho server biết bạn đang ở môi trường lập trình. Khi nào đưa web lên mạng thực tế (deploy), bạn sẽ đổi nó thành production.

- FRONTEND_URL=http://localhost:5173: Đây là đường dẫn ứng dụng Frontend của bạn khi dev. Khi deploy, đổi thành domain thật của frontend, ví dụ https://your-app.vercel.app. Backend dùng giá trị này để cho phép Frontend gọi API (CORS).

- MONGODB_URI: Đây là đường dẫn để kết nối với cơ sở dữ liệu MongoDB.

- JWT_SECRET: Đây là "chìa khóa" dùng để mã hóa mật khẩu hoặc phiên đăng nhập của người dùng. Bạn phải tự tạo ra nó.

`node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

Sau đó copy kết quả dán vào .env.

- JWT_EXPIRE=7d: Thời gian token hết hạn. 7d là 7 ngày, 1h là 1 giờ. Bạn có thể giữ nguyên.

- CLOUDINARY_CLOUD_NAME: Ở phần phần Product Environment Credentials, Copy giá trị "Cloud Name" dán vào.

- CLOUDINARY_API_KEY: Copy "API Key" dán vào.

- CLOUDINARY_API_SECRET: Bấm hình con mắt để hiện mật khẩu, copy "API Secret" dán vào.

### 3. Khởi động server

**Development mode** (với hot reload):

```bash
npm run dev
```

**Production mode**:

```bash
npm start
```

### 4. Seed data (tùy chọn)

Để thêm dữ liệu mẫu vào database:

```bash
node seeds/seedDatabase.js
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `PUT /api/auth/update` - Cập nhật thông tin user
- `PUT /api/auth/change-password` - Đổi mật khẩu

### Cars

- `GET /api/cars` - Danh sách xe
- `GET /api/cars/:id` - Chi tiết xe
- `GET /api/cars/category/:category` - Xe theo danh mục
- `POST /api/cars` - Thêm xe mới (admin)
- `PUT /api/cars/:id` - Sửa thông tin xe (admin)
- `DELETE /api/cars/:id` - Xóa xe (admin)

### Customers

- `GET /api/customers` - Danh sách khách hàng
- `GET /api/customers/:id` - Chi tiết khách hàng
- `POST /api/customers` - Thêm khách hàng mới
- `PUT /api/customers/:id` - Sửa khách hàng (admin)
- `DELETE /api/customers/:id` - Xóa khách hàng (admin)
- `POST /api/customers/:customerId/cars/:carId` - Thêm xe yêu thích
- `DELETE /api/customers/:customerId/cars/:carId` - Xóa xe yêu thích

### Deposits

- `GET /api/deposits` - Danh sách đặt cọc
- `GET /api/deposits/:id` - Chi tiết đặt cọc
- `POST /api/deposits` - Tạo đặt cọc mới
- `PUT /api/deposits/:id` - Sửa đặt cọc (admin)
- `DELETE /api/deposits/:id` - Xóa đặt cọc (admin)
- `GET /api/deposits/customer/:customerId` - Đặt cọc theo khách hàng

### Transactions

- `GET /api/transactions` - Danh sách giao dịch
- `GET /api/transactions/:id` - Chi tiết giao dịch
- `POST /api/transactions` - Tạo giao dịch mới
- `PUT /api/transactions/:id` - Sửa giao dịch (admin)
- `DELETE /api/transactions/:id` - Xóa giao dịch (admin)
- `PATCH /api/transactions/:id/status` - Cập nhật trạng thái giao dịch (admin)
- `GET /api/transactions/customer/:customerId` - Giao dịch theo khách hàng

### Accounting

- `GET /api/accounting` - Danh sách bản ghi kế toán
- `GET /api/accounting/:id` - Chi tiết bản ghi kế toán
- `POST /api/accounting` - Tạo bản ghi mới
- `PUT /api/accounting/:id` - Sửa bản ghi (admin/accountant)
- `DELETE /api/accounting/:id` - Xóa bản ghi (admin/accountant)
- `GET /api/accounting/month/:month` - Tóm tắt theo tháng
- `GET /api/accounting/stats/all` - Thống kê toàn bộ

### Employees

- `GET /api/employees` - Danh sách nhân viên
- `GET /api/employees/:id` - Chi tiết nhân viên
- `POST /api/employees` - Thêm nhân viên (admin/hr)
- `PUT /api/employees/:id` - Sửa nhân viên (admin/hr)
- `DELETE /api/employees/:id` - Xóa nhân viên (admin/hr)
- `GET /api/employees/department/:department` - Nhân viên theo phòng ban
- `GET /api/employees/position/:position` - Nhân viên theo chức vụ

### Dashboard

- `GET /api/dashboard/stats` - Thống kê tổng quát
- `GET /api/dashboard/revenue/monthly` - Doanh thu theo tháng
- `GET /api/dashboard/cars/top-selling` - Xe bán chạy nhất
- `GET /api/dashboard/deposits/statistics` - Thống kê đặt cọc
- `GET /api/dashboard/transactions/statistics` - Thống kê giao dịch
- `GET /api/dashboard/transactions/recent` - Giao dịch gần đây
- `GET /api/dashboard/inventory/status` - Trạng thái kho hàng

## Database Schema

### Collections:

1. **Users** - Quản lý người dùng
2. **Cars** - Thông tin xe
3. **Customers** - Thông tin khách hàng
4. **Deposits** - Đặt cọc xe
5. **Transactions** - Giao dịch thanh toán
6. **Accounting** - Bản ghi kế toán
7. **Employees** - Thông tin nhân viên

## Docker

Build Docker image:

```bash
docker build -t backend .
```

Chạy container:

```bash
docker run -p 5000:5000 --env-file .env backend
```

## Công nghệ sử dụng

- **Node.js & Express** - Web framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Express-validator** - Input validation

## Testing

Chạy unit tests:

```bash
npm test
```

## Liên hệ

Nếu có câu hỏi, vui lòng liên hệ team development.
