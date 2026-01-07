// Ví dụ cách sử dụng API services trong React component

// 1. Import service
// import { authService } from '../services/authService';
// import { carService } from '../services/carService';
// import { customerService } from '../services/customerService';
// import { depositService } from '../services/depositService';
// import { dashboardService } from '../services/dashboardService';

// ============================================
// AUTHENTICATION SERVICE EXAMPLES
// ============================================

// Đăng nhập
// const handleLogin = async () => {
//   try {
//     const result = await authService.login('admin@example.com', 'admin123');
//     console.log('Token:', result.token);
//     console.log('User:', result.user);
//     // Token tự động lưu vào localStorage và gửi kèm mọi request
//   } catch (error) {
//     console.error('Login failed:', error.message);
//   }
// };

// Lấy thông tin user hiện tại
// const handleGetUser = async () => {
//   try {
//     const user = await authService.getCurrentUser();
//     console.log('Current user:', user);
//   } catch (error) {
//     console.error('Get user failed:', error.message);
//   }
// };

// Đăng xuất
// const handleLogout = () => {
//   authService.logout();
//   // Chuyển hướng tới login page
// };

// ============================================
// CAR SERVICE EXAMPLES
// ============================================

// Lấy danh sách xe
// const handleGetCars = async () => {
//   try {
//     const data = await carService.getAllCars(1, 10, 'suv', 'available');
//     console.log('Cars:', data.cars);
//     console.log('Pagination:', data.pagination);
//   } catch (error) {
//     console.error('Get cars failed:', error.message);
//   }
// };

// Lấy chi tiết xe
// const handleGetCar = async (carId) => {
//   try {
//     const car = await carService.getCarById(carId);
//     console.log('Car details:', car);
//   } catch (error) {
//     console.error('Get car failed:', error.message);
//   }
// };

// Tạo xe mới (admin only)
// const handleCreateCar = async () => {
//   try {
//     const newCar = await carService.createCar({
//       name: 'VinFast VF9',
//       model: 'VF9',
//       price: 1200000000,
//       year: 2025,
//       color: 'Trắng',
//       category: 'suv',
//       stock: 5,
//       specifications: {
//         engine: '3.0L Turbo',
//         fuelType: 'Xăng',
//         transmission: 'Tự động',
//         seats: 7,
//         fuelConsumption: '12L/100km',
//       },
//     });
//     console.log('Car created:', newCar);
//   } catch (error) {
//     console.error('Create car failed:', error.message);
//   }
// };

// ============================================
// CUSTOMER SERVICE EXAMPLES
// ============================================

// Lấy danh sách khách hàng
// const handleGetCustomers = async () => {
//   try {
//     const data = await customerService.getAllCustomers(1, 10);
//     console.log('Customers:', data.customers);
//   } catch (error) {
//     console.error('Get customers failed:', error.message);
//   }
// };

// Tạo khách hàng mới
// const handleCreateCustomer = async () => {
//   try {
//     const newCustomer = await customerService.createCustomer({
//       name: 'Nguyễn Văn B',
//       email: 'nguyenvanb@example.com',
//       phone: '0912345678',
//       address: {
//         street: '123 Đường ABC',
//         city: 'Hà Nội',
//         state: 'Hà Nội',
//         country: 'Việt Nam',
//       },
//       gender: 'male',
//       identityNumber: '123456789',
//     });
//     console.log('Customer created:', newCustomer);
//   } catch (error) {
//     console.error('Create customer failed:', error.message);
//   }
// };

// ============================================
// DEPOSIT SERVICE EXAMPLES
// ============================================

// Tạo đặt cọc mới
// const handleCreateDeposit = async () => {
//   try {
//     const newDeposit = await depositService.createDeposit({
//       customerId: 'customer_id_here',
//       carId: 'car_id_here',
//       depositAmount: 50000000,
//       totalPrice: 300000000,
//       expectedDeliveryDate: new Date(2026, 2, 15),
//       notes: 'Ghi chú đặt cọc',
//     });
//     console.log('Deposit created:', newDeposit);
//   } catch (error) {
//     console.error('Create deposit failed:', error.message);
//   }
// };

// ============================================
// DASHBOARD SERVICE EXAMPLES
// ============================================

// Lấy thống kê tổng quát
// const handleGetStats = async () => {
//   try {
//     const stats = await dashboardService.getDashboardStats();
//     console.log('Dashboard stats:', stats);
//     // {
//     //   totalCars: 5,
//     //   totalCustomers: 2,
//     //   totalEmployees: 0,
//     //   totalDeposits: 0,
//     //   pendingDeposits: 0,
//     //   totalRevenue: 0,
//     //   totalExpenses: 0,
//     //   netProfit: 0
//     // }
//   } catch (error) {
//     console.error('Get stats failed:', error.message);
//   }
// };

// Lấy doanh thu theo tháng (dành cho biểu đồ)
// const handleGetMonthlyRevenue = async () => {
//   try {
//     const monthlyData = await dashboardService.getMonthlyRevenue();
//     console.log('Monthly revenue:', monthlyData);
//     // Data dùng cho Chart.js
//   } catch (error) {
//     console.error('Get monthly revenue failed:', error.message);
//   }
// };

// ============================================
// USAGE IN REACT COMPONENT (useEffect + useState)
// ============================================

// import { useState, useEffect } from 'react';
// import { carService } from '../services/carService';

// export default function CarList() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         setLoading(true);
//         const data = await carService.getAllCars(1, 10);
//         setCars(data.cars);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {cars.map((car) => (
//         <div key={car._id}>
//           <h3>{car.name}</h3>
//           <p>Price: {car.price.toLocaleString()} VND</p>
//         </div>
//       ))}
//     </div>
//   );
// }

export const apiExamples = {
  comment: 'Uncomment các ví dụ trên để test trong component của bạn',
};
