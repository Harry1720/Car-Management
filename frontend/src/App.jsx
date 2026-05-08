import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/components/Navbar.module.css';
import './assets/css/components/Footer.module.css';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Home from './pages/user/Home';
import About from './pages/user/About';
import Products from './pages/user/Product';
import Deposit from './pages/user/Deposit';
import Promotion from './pages/user/Promotion';
import Policy from './pages/user/Policy';
import Login from './pages/user/Login';
import Charging from './pages/user/ChargingStation';

// // Admin pages
import Dashboard from './pages/admin/Dashboard';
import CarList from './pages/admin/CarList';
import HRPage from './pages/admin/HumanResources';
import CustomerManage from './pages/admin/CustomerManage';
import Transaction from './pages/admin/TransacManage';
import Accounting from './pages/admin/Accounting';
import CarNumber from './pages/admin/CarNumber';

function App() {
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/charging" element={<Charging />} />
        <Route path="/products" element={<Products />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/promotions" element={<Promotion />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin routes - Protected */}
         <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
         <Route path="/admin/customermanagement" element={<ProtectedRoute><CustomerManage /></ProtectedRoute>} />
        <Route path="/admin/carlist" element={<ProtectedRoute><CarList /></ProtectedRoute>} />
        <Route path="/admin/humanresources" element={<ProtectedRoute><HRPage /></ProtectedRoute>} />
        <Route path="/admin/transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>} /> 
        <Route path="/admin/accounting" element={<ProtectedRoute><Accounting /></ProtectedRoute>} /> 
        <Route path="/admin/carnumber" element={<ProtectedRoute><CarNumber /></ProtectedRoute>} /> 
      </Routes>
    </Router>
  );
}

export default App;