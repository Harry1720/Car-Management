# VinFast Car Management System

## 1. Giới thiệu

Đây là hệ thống quản lý cửa hàng kinh doanh, mua bán và cho thuê xe ô tô điện Vinfast. Ứng dụng cung cấp giải pháp chuyển đổi số giúp số hóa các quy trình từ quản lý kho xe, quản lý thông tin khách hàng, cho đến theo dõi đơn hàng và doanh thu. Hệ thống được phân quyền với 3 vai trò chính (Admin, Nhân viên, Khách hàng) và giao diện tối ưu, dễ sử dụng.

## 2. Các tính năng chính

- Hệ thống quản trị của nhân viên & quản trị viên độc lập với hệ thống của khách hàng.

- **Dành cho Khách hàng (User)**:
  - Đăng ký tài khoản, đăng nhập, quên mật khẩu, thay đổi thông tin cá nhân & mật khẩu.
  - Xem danh sách xe, tìm kiếm và lọc xe theo các tiêu chí (hãng, giá, loại xe...).
  - Theo dõi các dòng xe yêu thích.
  - Xem chi tiết thông số xe, hình ảnh.
  - Đặt cọc xe thông qua VNPay, trạng thái đơn hàng tự động cập nhật khi thanh toán thành công.
  - Theo dõi lịch sử giao dịch và đơn hàng cá nhân.
  - Tìm hiểu các thông tin, chính sách, ưu đãi của cửa hàng.
- **Dành cho Nhân viên (Employee)**:
  - Quản lý & cập nhật trạng thái các đơn hàng.
  - Quản lý các yêu cầu tư vấn của khách hàng.
  - Quản lý thông tin khách hàng.
  - Xem danh sách xe quản lý và tồn kho.
  - Cập nhật một số thông tin cá nhân và mật khẩu.
  - Thống kê & Báo cáo: Xem số lượng xe bán, đơn hàng... qua các biểu đồ trực quan.
- **Dành cho Quản trị viên (Admin)**:
  - Quản lý kho xe: Thêm, sửa, xóa, cập nhật thông tin xe (Giá bán, thông số kỹ thuật, màu sắc, số lượng & trạng thái tồn kho, bài viết giới thiệu...).
  - Quản lý đơn hàng và doanh thu.
  - Quản lý thông tin và các yêu cầu tư vấn của khách hàng.
  - Quản lý nhân sự.
  - Thống kê & Báo cáo: Xem doanh thu, số lượng xe bán, đơn hàng... qua các biểu đồ trực quan.

## 3. Công nghệ sử dụng

- **Frontend**: ReactJS, Vite, CSS.
- **Backend**: Node.js, Express.js.
- **Cơ sở dữ liệu**: MongoDB (Mongoose).
- **Xác thực & Phân quyền**: JSON Web Tokens (JWT).

## 4. Cấu trúc thư mục

Dự án được chia thành hai phần chính `frontend` và `backend`:

```text
Car-Management/
├── backend/              # Mã nguồn máy chủ Node.js & Express
│   ├── controllers/      # Chứa logic xử lý của các API
│   ├── models/           # Định nghĩa cấu trúc dữ liệu MongoDB (Mongoose Schemas)
│   ├── routes/           # Định nghĩa các API endpoints
│   ├── middlewares/      # Các hàm trung gian (VD: Xác thực JWT, Xử lý upload ảnh)
│   ├── config/           # Cấu hình kết nối DB, thông số hệ thống
│   └── server.js         # File khởi chạy server Backend
│
└── frontend/             # Mã nguồn giao diện người dùng ReactJS
    ├── src/
    │   ├── assets/       # Chứa CSS, hình ảnh, icon tĩnh
    │   ├── components/   # Các UI components dùng chung
    │   ├── pages/        # Các trang chính của ứng dụng (Admin, Employee, User)
    │   ├── App.jsx       # Cấu hình Routing tổng thể của Frontend
    │   └── main.jsx      # Điểm entry point khởi chạy React
    ├── package.json      # Danh sách dependencies của Frontend
    └── vite.config.js    # File cấu hình Vite
```

## 5. Hướng dẫn cài đặt và chạy nội bộ (Local)

### Yêu cầu môi trường

- Node.js (phiên bản khuyến nghị: 18.x trở lên)
- MongoDB

### Cài đặt Backend

1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Tạo file `.env` ở thư mục `backend` (có thể copy từ `.env.example` nếu có) và cấu hình các biến môi trường sau:

   ```env
   # Cấu hình Server
   PORT=5000
   NODE_ENV=development

   # Cấu hình Database
   MONGODB_URI=mongodb://localhost:27017/car-management

   # Cấu hình JWT (Secret key dùng để mã hoá Token)
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d

   # Cấu hình Cloudinary (Để upload ảnh)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Cấu hình CORS
   FRONTEND_URL=http://localhost:5173

   # Cấu hình EmailJS (Gửi email)
   EMAILJS_SERVICE_ID=id-cua-ban
   EMAILJS_TEMPLATE_ID=id-cua-ban
   EMAILJS_PUBLIC_KEY=key-cua-ban
   EMAILJS_PRIVATE_KEY=key-cua-ban

   # Cấu hình VNPay (Thanh toán)
   VNP_TMN_CODE=Mã_Website_Của_Bạn
   VNP_HASH_SECRET=Chuỗi_Bí_Mật_Của_Bạn
   VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
   VNP_RETURN_URL=http://localhost:5173/deposit/success
   ```

4. Chạy server phát triển:
   ```bash
   npm run dev
   ```

### Cài đặt Frontend

1. Mở một terminal mới và di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Tạo file `.env` ở thư mục `frontend` và cấu hình biến môi trường kết nối đến Backend:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Khởi chạy ứng dụng:
   ```bash
   npm run dev
   ```

## 6. Liên kết truy cập (Deploy Links)

- Frontend được deploy tại Vercel.
- Backend được deploy tại Render.

- **Link dự án deploy:** [https://harryvfcarsale.vercel.app](https://harryvfcarsale.vercel.app/).
- **Link quản trị:** [https://harryvfcarsale.vercel.app/admin](https://harryvfcarsale.vercel.app/admin).

- **_Tham khảo giao diện cũ (Dữ liệu tĩnh):_** [https://carharrycoder.netlify.app](https://carharrycoder.netlify.app/).

## 7. Tài khoản dùng thử (Test Accounts)

Vui lòng sử dụng các tài khoản dưới đây để trải nghiệm các phân quyền khác nhau trong hệ thống. Lưu ý không đổi mật khẩu các tài khoản này:

### Quản trị viên (Admin)

- **Email**: `admin@vfdemo.com`
- **Mật khẩu**: `admin123`

### Nhân viên (Employee)

- **Email**: `nvv01@vfdemo.com`
- **Mật khẩu**: `Vf@0128789799`

### Khách hàng (User)

- **Email**: `nvtest@email.com`
- **Mật khẩu**: `nvtest@1234`

   *Hoặc tạo tài khoản mới tại phần Đăng ký và sử dụng chính tài khoản đó để Đăng nhập.*

## 8. Tài khoản test thanh toán VNPAY

- **Ngân hàng**: NCB
- **Số thẻ**: 9704198526191432198
- **Tên chủ thẻ**: NGUYEN VAN A
- **Ngày phát hành**: 07/15
- **Mật khẩu OTP**: 123456

## 9. Hướng dẫn xử lý lỗi thường gặp (Troubleshooting)

Dưới đây là một số lỗi phổ biến trong quá trình cài đặt/chạy dự án và cách khắc phục:

1. **Lỗi `Port is already in use` (Cổng đã được sử dụng)**
   - **Nguyên nhân**: Đã có một tiến trình khác đang chạy ở port của backend hoặc frontend (ví dụ cổng 3000, 5000, 5173).
   - **Cách giải quyết**: Tắt tiến trình cũ hoặc thay đổi port chạy ứng dụng trong biến môi trường `.env`.

2. **Lỗi không kết nối được Database (MongoDB)**
   - **Nguyên nhân**: Chuỗi kết nối MongoDB trong file `.env` không đúng, hoặc IP của bạn chưa được cấp quyền truy cập trên MongoDB Atlas (nếu dùng cloud).
   - **Cách giải quyết**: Kiểm tra lại chuỗi `MONGO_URI`. Đăng nhập vào MongoDB Atlas > Network Access > Thêm IP hiện tại của bạn (`Add current IP address`).

3. **Lỗi CORS (Cross-Origin Resource Sharing) khi gọi API**
   - **Nguyên nhân**: Frontend gọi đến API Backend nhưng chưa được Backend cấp quyền truy cập qua cấu hình CORS.
   - **Cách giải quyết**: Ở file gốc của backend (như `server.js` hoặc `app.js`), hãy kiểm tra lại cấu hình middleware `cors()`. Đảm bảo URL của frontend đã được thêm vào danh sách cho phép (origins).

4. **Lỗi thiếu Dependencies (Module not found)**
   - **Nguyên nhân**: Chưa cài đặt hoặc cài đặt lỗi các thư viện `npm`.
   - **Cách giải quyết**: Chạy lệnh `npm cache clean --force` sau đó xóa thư mục `node_modules` cùng file `package-lock.json`, rồi chạy lại `npm install` ở thư mục bị lỗi.

5. **Gợi ý chung khi có lỗi không rõ nguyên nhân:**
   - Đọc kỹ thông báo lỗi hiển thị trên Terminal.
   - Xem log ở tab Console hoặc tab Network trong Developer Tools (F12) trên trình duyệt để biết chi tiết request nào bị từ chối.
