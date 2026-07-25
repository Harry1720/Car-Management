import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/components/Navbar.module.css';
import './assets/css/components/Footer.module.css';
import ProtectedRoute from './components/ProtectedRoute';
import BackToTop from './components/BackToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages
import Home from './pages/user/Home';
import About from './pages/user/About';
import Products from './pages/user/Product';
import Deposit from './pages/user/Deposit';
import Promotion from './pages/user/Promotion';
import Policy from './pages/user/Policy';
import Login from './pages/user/Login';
import ForgotPassword from './pages/user/ForgotPassword';
import ResetPassword from './pages/user/ResetPassword';
import Charging from './pages/user/ChargingStation';
import NotFound from './pages/user/NotFound';
import Profile from './pages/shared/Profile';
import CarLanding from './pages/user/CarLanding';

// // Admin pages
import Dashboard from './pages/admin/Dashboard';
import CarList from './pages/admin/CarList';
import HRPage from './pages/admin/HumanResources';
import CustomerManage from './pages/admin/CustomerManage';
import Transaction from './pages/admin/TransacManage';
import Accounting from './pages/admin/Accounting';
import ConsultationManage from './pages/admin/ConsultationManage';
import CarNumber from './pages/admin/CarNumber';
import AdminLogin from './pages/admin/AdminLogin';
import AdminProfile from './pages/admin/AdminProfile';

function App() {
  return (
    <Router>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
        style={{ zIndex: 999999 }}
      />
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/landing/:modelId" element={<CarLanding />} />
        <Route path="/deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
        <Route path="/promotions" element={<Promotion />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/charging" element={<Charging />} />
        
        {/* Shared Protected route */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        {/* Admin routes - Protected */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/customermanagement" element={<ProtectedRoute requireAdmin={true}><CustomerManage /></ProtectedRoute>} />
        <Route path="/admin/carlist" element={<ProtectedRoute requireAdmin={true}><CarList /></ProtectedRoute>} />
        <Route path="/admin/humanresources" element={<ProtectedRoute requireAdmin={true} strictAdmin={true}><HRPage /></ProtectedRoute>} />
        <Route path="/admin/transaction" element={<ProtectedRoute requireAdmin={true} strictAdmin={true}><Transaction /></ProtectedRoute>} /> 
        <Route path="/admin/accounting" element={<ProtectedRoute requireAdmin={true}><Accounting /></ProtectedRoute>} /> 
        <Route path="/admin/consultations" element={<ProtectedRoute requireAdmin={true}><ConsultationManage /></ProtectedRoute>} /> 
        <Route path="/admin/carnumber" element={<ProtectedRoute requireAdmin={true}><CarNumber /></ProtectedRoute>} /> 
        <Route path="/admin/profile" element={<ProtectedRoute requireAdmin={true}><AdminProfile /></ProtectedRoute>} />
        
        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BackToTop />
    </Router>
  );
}

export default App;